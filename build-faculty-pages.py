#!/usr/bin/env python3
"""
Regenerates every teacher page, the sitemap, and the "Our teachers" lists.

Run it from the repo root after you change the faculty:

    python3 build-faculty-pages.py

Everything it needs is read out of index.html — the teacher records, the
subject accent colours, the header and the footer — so nothing here can drift
from the live site, and there is no second copy of the data to keep in step.

WHERE THE TEACHERS COME FROM

Supabase, not this repo. The control room is the record; index.html's
FACULTY_BAKED is only the first-paint fallback and is used here only if the
fetch fails, so a bad network on a deploy can never publish an empty faculty.

That was the whole problem this fixes. The site listed teachers live from the
database while these pages were generated from the baked array, so adding a
teacher in the panel gave them a listing and nothing else — no page, no schema,
no sharing card, no sitemap line — and removing one left their page indexed on
the domain with nothing linking to it.

TO ADD A TEACHER
  1. Add them in the control room.
  2. Upload their portrait as <slug>.webp, 1000x625, same plinth as the others.
  3. Press Publish. Vercel runs this script and the pages appear.

TO REMOVE ONE
  Switch them off, or delete them, in the control room, then press Publish.
  Their page is replaced by a stub that tells search engines it has gone and
  sends a reader to the faculty list.
"""
import json, os, re, html, sys

SITE = "https://cambridgeonline.tech"
OUT  = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(OUT, "index.html")

if not os.path.exists(SRC):
    sys.exit("index.html not found. Run this from the repo root.")
PAGE = open(SRC, encoding="utf-8", errors="surrogateescape").read()

def _unescape_js(x):
    """The records are JavaScript, so unicode escapes arrive literally."""
    if not isinstance(x, str): return x
    x = re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), x)
    return x.replace('\\"', '"').replace("\\'", "'")

# ---- the faculty records --------------------------------------------------
# Read from Supabase, with the baked array as the fallback. The credentials
# come out of config.js rather than being repeated here: one copy, and it is
# the same one the website itself uses, so the two cannot drift.

def _baked():
    i = PAGE.find("const FACULTY_BAKED")
    if i < 0: return []
    body = PAGE[i:PAGE.find("\n];", i)]
    out = []
    for blk in re.split(r'\n  \{ id:', body)[1:]:
        blk = "id:" + blk
        g = lambda k: _unescape_js((re.search(k + r':\s*"((?:[^"\\]|\\.)*)"', blk) or [None, ""])[1])
        arr = lambda k: [_unescape_js(v) for v in re.findall(
            r'"((?:[^"\\]|\\.)*)"', (re.search(k + r':\s*\[(.*?)\]', blk, re.S) or [None, ""])[1])]
        rec = dict(id=g("id"), name=g("name"), subject=g("subject"), group=g("group"),
                   tag=g("tag"), bio=g("bio"), levels=arr("levels"),
                   distinctions=arr("distinctions"), star=bool(re.search(r'star:\s*true', blk)),
                   nophoto=bool(re.search(r'nophoto:\s*true', blk)),
                   social=[u for u in re.findall(r'"(https://[^"]+)"',
                            (re.search(r'social:\s*\[([^\]]*)\]', blk) or [None, ""])[1])])
        dm = re.search(r'demo:\{([^}]*)\}', blk)
        if dm:
            rec["demo"] = {"title": (re.search(r'title:"([^"]*)"', dm.group(1)) or [None, ""])[1],
                           "mins":  (re.search(r'mins:(\d+)',     dm.group(1)) or [None, ""])[1],
                           "code":  (re.search(r'code:"([^"]*)"',  dm.group(1)) or [None, ""])[1]}
        out.append(rec)
    return out


def _creds():
    cfg = os.path.join(OUT, "config.js")
    if not os.path.exists(cfg): return None, None
    src = open(cfg, encoding="utf-8", errors="surrogateescape").read()
    u = re.search(r'url:\s*"([^"]+)"', src)
    k = re.search(r'anonKey:\s*"([^"]+)"', src)
    return (u.group(1) if u else None), (k.group(1) if k else None)


def _live():
    """Every teacher the control room says is live, in the site's own order."""
    url, key = _creds()
    if not url or not key: return []
    import urllib.request
    q = (url.rstrip("/") + "/rest/v1/faculty"
         "?select=*&active=eq.true&order=sort,name")
    req = urllib.request.Request(q, headers={"apikey": key,
                                             "Authorization": "Bearer " + key})
    with urllib.request.urlopen(req, timeout=20) as r:
        rows = json.loads(r.read().decode("utf-8"))

    out = []
    for t in rows:
        rec = dict(
            id=t.get("slug") or "", name=t.get("name") or "",
            subject=t.get("subject") or "", group=t.get("group_name") or "",
            tag=t.get("tag") or "", bio=t.get("bio") or "",
            levels=t.get("levels") or [], distinctions=t.get("distinctions") or [],
            star=bool(t.get("star")),
            # No portrait uploaded yet: the page draws the plinth rather than a
            # broken image, which is what `nophoto` has always meant here.
            nophoto=not (t.get("photo_url") or "").strip(),
            social=t.get("social") or [],
            # The search-listing overrides. Empty is normal and means "work it
            # out from the name and subject", which is what the page already did.
            seo_title=t.get("seo_title") or "",
            seo_description=t.get("seo_description") or "",
            og_image=t.get("og_image") or "",
            noindex=bool(t.get("noindex")),
            teaching_now=t.get("teaching_now") or "",
        )
        if t.get("demo_enabled"):
            rec["demo"] = {"title": t.get("demo_title") or "",
                           "mins": str(t.get("demo_mins") or ""),
                           "code": t.get("demo_code") or ""}
        if rec["id"] and rec["name"]:
            out.append(rec)
    return out


try:
    F = _live()
    SOURCE = "Supabase"
except Exception as e:
    print("  ! could not reach Supabase (%s) — falling back to FACULTY_BAKED" % e)
    F, SOURCE = [], "fallback"

if not F:
    F = _baked()
    SOURCE = "FACULTY_BAKED (fallback)"

if not F:
    sys.exit("no teachers from either source — refusing to publish an empty faculty")

print("  teachers: %d, from %s" % (len(F), SOURCE))

# ---- the subject accents the faculty grid uses ----------------------------
_j = PAGE.find("const SUBJECTS_BAKED")
ACC = dict(re.findall(r'"([^"]+)":\s*\{\s*key:"[^"]*",\s*accent:"(#[0-9A-Fa-f]{6})"',
                      PAGE[_j:PAGE.find("};", _j)])) if _j >= 0 else {}
def accent(subject): return ACC.get(subject, "#E3B55D")

# The subject glyphs the faculty grid draws, taken from the same GLYPHS table
# so a sibling card carries the identical mark rather than an approximation.
_g = PAGE.find("var GLYPHS")
_gsrc = PAGE[_g:PAGE.find("\n  };", _g)] if _g >= 0 else ""
GLYPHS = {}
for _m in re.finditer(r'\n    ([A-Za-z]+):\s*((?:\s*\x27[^\x27]*\x27\s*\+?)+)', _gsrc):
    GLYPHS[_m.group(1)] = "".join(re.findall(r"\x27([^\x27]*)\x27", _m.group(2)))
_fb = re.search(r'GLYPH_FALLBACK\s*=\s*((?:\s*\x27[^\x27]*\x27\s*\+?)+)', PAGE)
GLYPH_FALLBACK = "".join(re.findall(r"\x27([^\x27]*)\x27", _fb.group(1))) if _fb else ""

ARROW = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"'
         ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
         '<path d="M5 12h13M13 6l6 6-6 6"/></svg>')

def route_of(t):
    """Same rule the grid's plate uses, so the two never disagree."""
    s_ = " ".join(t.get("levels") or []).lower()
    o = bool(re.search(r"o level|igcse", s_))
    a = bool(re.search(r"\ba level|as level|edexcel", s_))
    if o and a: return "O & A Level"
    if a: return "A Level"
    if o: return "O Level & IGCSE"
    return (t.get("levels") or [""])[0]

def glyph(subject):
    """Same lookup the grid uses: first word of the subject."""
    key = re.split(r"[\s&]+", str(subject or ""))[0]
    return GLYPHS.get(key, GLYPH_FALLBACK)

# ---- header and footer, lifted from the live page -------------------------
# The floating shell — Enrol, the light/dark dock, WhatsApp. It sits between
# the footer and the dialogs on index.html; every page carries it and these
# pages were the only ones that did not.
_tail = PAGE[PAGE.find("</footer>") + 9:PAGE.find("</body>")]
_a = _tail.find('<a class="btn btn--liquid fenrol')
_b = _tail.find('<div class="hdlg"')
FURNITURE = _tail[_a:_b].rstrip() if _a >= 0 and _b > _a else ""
FURNITURE = FURNITURE.replace('href="#contact"', 'href="/#contact"')
# The sound button stays. It shares the co-sound key with the rest of the
# site, so muting here holds when the visitor reaches the index.

def esc(s): return html.escape(s or "", quote=True)

def has_photo(t):
    """A teacher may have no portrait because none has been taken yet, or
    because they would rather not have one published. Either way the card
    must not reach for a file that is not there. Set nophoto:true on the
    record for a deliberate choice, so a later photo drop can't undo it."""
    if t.get("nophoto"): return False
    return os.path.exists(os.path.join(OUT, t["id"] + ".webp"))

def portrait_svg(acc, label=True):
    """The drawn slot the faculty grid falls back to — line art in the
    subject's accent on the brocade plinth, so a card without a photograph
    still reads as one of the set. The PHOTO caption is dropped when the
    absence is a decision rather than a gap waiting to be filled."""
    cap = (f'<text x="200" y="236" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"'
           f' font-size="9.5" letter-spacing="4.2" fill="{acc}" fill-opacity=".5">PHOTO</text>'
           if label else "")
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" '
      'preserveAspectRatio="xMidYMid meet" role="presentation" class="tp__drawn">'
      '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">'
      f'<stop offset="0" stop-color="{acc}" stop-opacity=".14"/>'
      f'<stop offset="1" stop-color="{acc}" stop-opacity=".02"/></linearGradient>'
      '<pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse">'
      f'<path d="M24 0H0v24" fill="none" stroke="{acc}" stroke-width=".6" stroke-opacity=".22"/>'
      '</pattern></defs>'
      '<rect width="400" height="250" fill="url(#g)"/><rect width="400" height="250" fill="url(#p)"/>'
      f'<g fill="none" stroke="{acc}" stroke-opacity=".5" stroke-width="2.6" stroke-linecap="round">'
      '<circle cx="200" cy="98" r="35"/><path d="M141 202c0-33 26-52 59-52s59 19 59 52"/></g>'
      + cap + '</svg>')

# The header and footer are cut out of index.html, the same way every other
# shared thing in this script is.
#
# They used to be read from /home/claude/_header.html and _footer.html —
# absolute paths, on a machine that is not this one, for files that are not in
# the repository. The script could not have run from a clean checkout, which
# means it only ever worked in whatever scratch directory it was written in.
# Building on Vercel would have failed on this line.
def _cut(open_tag, close_tag, what):
    i = PAGE.find(open_tag)
    j = PAGE.find(close_tag, i)
    if i < 0 or j < 0:
        sys.exit("could not find the %s in index.html — has its markup changed?" % what)
    return PAGE[i:j + len(close_tag)]

HEAD = _cut('<header class="hdr">', '</header>', "site header")
FOOT = _cut('<footer class="foot wrap">', '</footer>', "site footer")
# The header is cut straight out of the home page, where every nav link is an
# in-page anchor and Home is the current section. On a teacher page neither is
# true: "#campuses" would scroll this page looking for a section that is not
# here, and Home would be marked as where the reader is.
HEAD = HEAD.replace(' class="on"', '')                      # nothing is current yet
# The home page links to the faculty page by path already, so match both the
# anchor it used to be and the path it is now — otherwise the teacher pages
# quietly lose the "you are here" mark on the one item that should carry it.
HEAD = HEAD.replace('href="#faculty"', 'href="/faculty"')
HEAD = HEAD.replace('href="/faculty"', 'href="/faculty" class="on"', 1)
# Anchors become links back to the home page; assets become root-relative.
# Left alone: absolute URLs, already-root paths, mail and phone.
HEAD = re.sub(r'(src|href)="(?!https?:|//|/|mailto:|tel:)', r'\1="/', HEAD)
HEAD = HEAD.replace('href="/#faculty"', 'href="/faculty"')
# Same treatment for the footer, and for the same reason. The old rule left
# bare "#" anchors alone, so a teacher page's footer offered links to
# #streams and #reviews — sections that live on the home page and not on this
# one, so those links did nothing at all.
FOOT = FOOT.replace('href="#faculty"', 'href="/faculty"')
FOOT = re.sub(r'(src|href)="(?!https?:|//|/|mailto:|tel:)', r'\1="/', FOOT)

# The floating shell — Enrol, the light/dark dock, WhatsApp. It sits between
# the footer and the dialogs on index.html; every page carries it and these
# pages were the only ones that did not.
_tail = PAGE[PAGE.find("</footer>") + 9:PAGE.find("</body>")]
_a = _tail.find('<a class="btn btn--liquid fenrol')
_b = _tail.find('<div class="hdlg"')
FURNITURE = _tail[_a:_b].rstrip() if _a >= 0 and _b > _a else ""
FURNITURE = FURNITURE.replace('href="#contact"', 'href="/#contact"')
# The sound button stays. It shares the co-sound key with the rest of the
# site, so muting here holds when the visitor reaches the index.

# Honorific drives the pronoun; the data has no gender field and guessing one
# would be worse than reading the title the academy already uses.
def pron(name):
    return ("she", "her", "Her") if name.startswith("Miss") or name.startswith("Ms") else ("he", "his", "His")

def codes_of(t):
    c = (t.get('demo') or {}).get('code', '')
    return [x.strip() for x in c.split('/') if x.strip()]

def short(name):
    """Sir Waqas Khan -> Waqas Khan. Used for the name-only keyword variants."""
    return re.sub(r'^(Sir|Miss|Ms|Mr|Mrs)\s+', '', name)

def levels_line(t):
    return " · ".join(t['levels'])

def page(t, siblings):
    n, sn = t['name'], short(t['name'])
    subj, grp = t['subject'], t['group']
    codes = codes_of(t)
    he, his, His = pron(n)
    url = f"{SITE}/teacher-{t['id']}"
    codestr = ", ".join(codes)

    acc = accent(subj)
    shot_img = has_photo(t)
    # a share card beats a broken image when there is no portrait
    og_img = f"{SITE}/{t['id']}.webp" if shot_img else f"{SITE}/og-card.png"
    shot = (f'<img src="/{t["id"]}.webp" width="1000" height="625" fetchpriority="high"'
            f' alt="{esc(n)}, {esc(subj)} teacher at Cambridge Online">'
            if shot_img else portrait_svg(acc, label=not t.get("nophoto")))


    # Two queries matter for a teacher page: the name, and "best <subject>
    # teacher in Karachi". The name owns the title's front; the subject and
    # the city follow it, so one page can answer both without reading as a
    # keyword list.
    title = f"{n} — {subj} Teacher in Karachi | Cambridge Online"
    lead = (t['distinctions'][0] + ". ") if t['distinctions'] else ""
    desc = (f"{n} teaches {subj} ({levels_line(t)}"
            + (f", {codestr}" if codes else "") + ") at Cambridge Online, "
            f"the online academy of SWK Solutions, Karachi. {lead}"
            f"Watch a full lesson free before you enrol.").replace("{lead}", lead)[:300]

    person = {
        "@context": "https://schema.org", "@type": "Person",
        "@id": f"{url}#person", "name": n,
        "alternateName": [sn, f"{sn} {subj}", f"{sn} teacher"],
        "jobTitle": f"{subj} Teacher",
        "url": url,
        **({"image": f"{SITE}/{t['id']}.webp"} if shot_img else {}),
        "description": t['bio'],
        "knowsAbout": [subj] + [f"Cambridge {c}" for c in codes] + t['levels'],
        "worksFor": {"@type": "EducationalOrganization", "@id": f"{SITE}/#org",
                     "name": "Cambridge Online", "alternateName": "SWK Solutions"},
        "homeLocation": {"@type": "Place", "address": {
            "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK"}}
    }
    if t['distinctions']:
        person["award"] = t['distinctions']
    # sameAs is how a search engine ties this page to the accounts already
    # carrying the teacher's name — the strongest entity signal available
    # short of a Wikipedia entry.
    if t.get('social'):
        person["sameAs"] = t['social']

    course = {
        "@context": "https://schema.org", "@type": "Course",
        "@id": f"{url}#course",
        "name": f"{subj} — {levels_line(t)}",
        "description": f"Cambridge {subj} taught by {n} at Cambridge Online."
                       + (f" Syllabus {codestr}." if codes else ""),
        "provider": {"@type": "EducationalOrganization", "@id": f"{SITE}/#org",
                     "name": "Cambridge Online"},
        "instructor": {"@id": f"{url}#person"},
        "inLanguage": ["en", "ur"],
        "hasCourseInstance": {
            "@type": "CourseInstance", "courseMode": "online",
            "instructor": {"@id": f"{url}#person"}}
    }

    # The literal questions a student types. An FAQPage is also what the
    # answer engines lift verbatim, so the phrasing is the query, not a
    # paraphrase of it.
    q1 = f"Who is the best {subj} teacher in Karachi?"
    a1 = (f"{n} teaches {subj} at Cambridge Online, the online academy of SWK "
          f"Solutions in Karachi"
          + (f". {t['distinctions'][0]}" if t['distinctions'] else "")
          + f". {t['tag']}. Every Cambridge Online teacher gives one full lesson away "
            f"free, so you can watch {his} teaching before deciding.")
    q2 = f"Where can I find an online {subj} tutor for {levels_line(t)}?"
    a2 = (f"Cambridge Online teaches {subj}"
          + (f" for Cambridge syllabus {codestr}" if codes else "")
          + f" live online, with every session recorded. Students in Pakistan, "
            f"the Gulf and further afield follow the same course as the Karachi "
            f"campuses. {sn} is the {subj} teacher on this route.")
    faq = {"@context": "https://schema.org", "@type": "FAQPage",
           "mainEntity": [
             {"@type": "Question", "name": q1,
              "acceptedAnswer": {"@type": "Answer", "text": a1}},
             {"@type": "Question", "name": q2,
              "acceptedAnswer": {"@type": "Answer", "text": a2}}]}

    crumbs = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Faculty", "item": SITE + "/faculty"},
            {"@type": "ListItem", "position": 3, "name": n, "item": url}]
    }

    chips = "".join(f'<li>{esc(l)}</li>' for l in t['levels']) + \
            "".join(f'<li class="is-code">{esc(c)}</li>' for c in codes)
    def sib(x):
        """The faculty card itself, not an imitation of it.

        site.css is already loaded here, and the .fac styles carry no
        JavaScript-dependent state, so the sibling row can use the real
        classes — the chamfered HUD shape, the hatch, the shoulder glyph,
        the gilt edge on a distinction card. Two differences only: it is an
        <a> to the teacher's page rather than a <button> that opens a
        dialog, and data-reveal is dropped, since that attribute belongs to
        the grid's own scroll animation."""
        a = accent(x['subject'])
        dist = bool(x.get('star'))
        xcode = ((x.get('demo') or {}).get('code') or (x['levels'] or [""])[0])
        xcode = re.sub(r'\s+', ' ', xcode)
        shot = (f'<img src="/{x["id"]}.webp" alt="" loading="lazy" decoding="async"'
                f' data-portrait="{a}">' if has_photo(x)
                else portrait_svg(a, label=not x.get("nophoto")))
        star = '<span class="fac__star">\u2605 Distinction</span>' if dist else ''
        return (
          f'<a class="fac{" fac--dist" if dist else ""}" style="--acc:{a}"'
          f' href="/teacher-{x["id"]}"'
          f' aria-label="{esc(x["subject"])}, taught by {esc(x["name"])} \u2014 open profile">'
            '<span class="fac__pane">'
              '<span class="fac__top">'
                '<span class="fac__marks">'
                  '<span class="fac__hatch"></span>'
                  f'{star}'
                  f'<svg class="fac__glyph" viewBox="0 0 54 54" fill="none" stroke="currentColor"'
                  f' stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"'
                  f' aria-hidden="true">{glyph(x["subject"])}</svg>'
                '</span>'
                f'<span class="fac__subj">{esc(x["subject"])}</span>'
                f'<span class="fac__code"><i></i>{esc(xcode)}</span>'
              '</span>'
              f'<span class="fac__shot{"" if has_photo(x) else " is-ph"}">{shot}</span>'
              '<span class="fac__b">'
                f'<span class="fac__name">{esc(x["name"])}</span>'
                f'<span class="fac__tag">{esc(x.get("tag",""))}</span>'
                f'<span class="fac__more">Open profile{ARROW}</span>'
              '</span>'
            '</span>'
            f'<span class="fac__plate"><i></i><span>{esc(route_of(x))}</span></span>'
            + ('<span class="fac__gilt" aria-hidden="true"></span>' if dist else '')
          + '</a>')
    sibs = "".join(sib(x) for x in siblings)
    demo = ""
    hero_demo = ""
    d = t.get('demo')
    if d and d.get('title'):
        demo = (f'<a class="btn btn--liquid" href="/lecture-{t["id"]}">'
                f'<svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg>'
                f'<span class="btn__lq">Watch a free lesson — {esc(d["title"])}</span></a>')
        # the hero has less room, so it carries the short label
        hero_demo = (f'<a class="btn btn--liquid" href="/lecture-{t["id"]}">'
                     f'<svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg>'
                     f'<span class="btn__lq">See free lecture</span></a>')

    return f"""<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#F4F2ED">
<meta property="og:type" content="profile">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og_img}">
<meta property="og:site_name" content="Cambridge Online">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{og_img}">
<link rel="icon" href="/mark-128.webp">
<link rel="apple-touch-icon" href="/mark-128.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@200;300;400;500;600&family=Italiana&family=JetBrains+Mono:wght@400;500;700&display=swap">
<link rel="stylesheet" href="/site.css">
<script src="/config.js"></script>
<script type="application/ld+json">{json.dumps(person, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(course, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(crumbs, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(faq, ensure_ascii=False)}</script>
<style>
/* The page borrows the site's own furniture — .wrap, .sec, .head, .eyebrow,
   .cpane — so headings, rhythm and panes inherit from site.css rather than
   being redefined here. What follows is only what those don't cover. */
.tp{{width:min(100% - 44px,var(--wrap));margin-inline:auto;padding-top:calc(var(--hdr) + 34px);padding-bottom:20px}}
.tp__crumb{{font-family:var(--mono);font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--text-3);margin:0 0 26px}}
.tp__crumb a{{color:var(--text-3);text-decoration:none;transition:color .25s var(--ease)}}
.tp__crumb a:hover{{color:var(--gold-text)}}

/* ---- hero ------------------------------------------------------------- */
.tp__top{{display:grid;grid-template-columns:minmax(0,46fr) minmax(0,54fr);
  gap:clamp(26px,4vw,64px);align-items:center}}
.tp__shot{{position:relative;isolation:isolate;margin:0;border-radius:var(--r);overflow:hidden;
  border:1px solid var(--line);background:var(--panel);box-shadow:var(--clear-shadow)}}
.tp__shot::before{{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  border-radius:inherit;padding:1px;
  background:linear-gradient(155deg,var(--clear-rim),var(--clear-rim-lo) 58%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude}}
.tp__shot img,.tp__shot .tp__drawn{{display:block;width:100%;height:auto}}
/* No portrait. The drawn slot sits on the same brocade the photographs were
   shot against, so a card without a photograph still reads as one of the set
   rather than as a broken image. */
.tp__shot.is-ph{{aspect-ratio:1000/625;background:
  radial-gradient(120% 96% at 50% 0%,color-mix(in srgb,var(--acc) 10%,transparent),transparent 72%),
  url("/_plinth.webp") center/cover}}
.tp__shot.is-ph .tp__drawn{{height:100%}}
.tp__sib-shot.is-ph{{background:
  radial-gradient(120% 96% at 50% 0%,color-mix(in srgb,var(--acc) 10%,transparent),transparent 72%),
  url("/_plinth.webp") center/cover}}
.tp__sib-shot .tp__drawn{{display:block;width:100%;height:100%}}
.tp h1{{font-family:var(--display);font-size:clamp(2.1rem,4.7vw,3.5rem);line-height:1.02;
  letter-spacing:-.012em;margin:0 0 .22em;text-wrap:balance}}
.tp__sub{{font-family:var(--display);font-size:clamp(1.05rem,2.05vw,1.45rem);line-height:1.3;
  color:var(--gold-text);margin:0 0 20px}}
.tp__bio{{font-size:1.02rem;line-height:1.76;color:var(--text-2);max-width:56ch;margin:0}}
.tp__heroacts{{display:flex;flex-wrap:wrap;gap:12px;margin-top:clamp(22px,2.6vw,30px)}}

/* Chips in the same idiom as the level pickers elsewhere on the site:
   mono, caps, a lit top edge. */
.tp__chips{{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 24px;padding:0;list-style:none}}
.tp__chips li{{padding:8px 13px;border-radius:9px;border:1px solid var(--edge);
  background:rgba(255,255,255,.34);box-shadow:inset 0 1px 0 rgba(255,255,255,.6);
  font-family:var(--mono);font-size:.6rem;letter-spacing:.13em;text-transform:uppercase;
  color:var(--text-1)}}
.tp__chips li.is-code{{color:var(--gold-text);border-color:rgba(176,130,31,.32)}}

/* ---- the course, as a spec sheet rather than a row of bullet boxes ----- */
.tp__spec{{margin:0;border-top:1px solid var(--line)}}
.tp__spec > div{{display:grid;grid-template-columns:minmax(120px,190px) 1fr;gap:clamp(14px,2.4vw,40px);
  padding:17px 2px;border-bottom:1px solid var(--line);align-items:baseline}}
.tp__spec dt{{font-family:var(--mono);font-size:.6rem;letter-spacing:.19em;text-transform:uppercase;
  color:var(--gold-text)}}
.tp__spec dd{{margin:0;color:var(--text-1);font-size:1rem;line-height:1.5}}

/* The sibling row uses .fac and .facgrid straight from site.css. Two
   corrections on top: a .fac rendered as a link should not inherit the
   underline a bare <a> carries, and the last row must not stretch.
   .row > * is flex:1, so a row holding three cards grew each to the 376px
   cap while a full row of four sat at 305px — the cards ended 44px taller
   and every name in that row sat lower than the names above it. Holding
   the basis stops the grow, so the grid reads as columns. */
.facgrid .fac{{text-decoration:none;color:inherit;flex:0 1 var(--cw,300px)}}

/* ---- admissions pane. Gold rim marks the offer, as it does elsewhere. -- */
.tp__cta{{margin:clamp(30px,4vw,56px) 0 clamp(60px,7vw,100px);
  padding:clamp(30px,4vw,52px) clamp(22px,3vw,44px);
  border-radius:var(--r);border:1px solid rgba(176,130,31,.3);
  background:var(--panel);text-align:center}}
.tp__cta .eyebrow{{justify-content:center}}
.tp__cta h2{{margin:0 0 14px}}
.tp__cta p{{color:var(--text-2);max-width:54ch;margin:0 auto 24px;line-height:1.7}}
.tp__acts{{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}}

@media (max-width:880px){{
  .tp__top{{grid-template-columns:1fr;gap:26px}}
  .tp__spec > div{{grid-template-columns:1fr;gap:5px;padding:15px 2px}}
}}
</style>
</head>
<body>
{HEAD}
<main class="tp">
  <p class="tp__crumb"><a href="/">Home</a> · <a href="/faculty">Faculty</a> · {esc(n)}</p>

  <div class="tp__top">
    <figure class="tp__shot{'' if shot_img else ' is-ph'}" style="--acc:{acc}">{shot}</figure>
    <div class="tp__intro">
      <p class="eyebrow">{esc(grp)}</p>
      <h1>{esc(n)}</h1>
      <p class="tp__sub">{esc(subj)} — {esc(levels_line(t))}</p>
      <ul class="tp__chips">{chips}</ul>
      <p class="tp__bio">{esc(t['bio'])}</p>
      <!-- In the hero, under the bio. Someone arriving from a name search
           has read three lines and decided; making them scroll past the
           whole course table to find an action loses them. -->
      <div class="tp__heroacts">
        {hero_demo}
        <a class="btn btn--liquid btn--liquid-clear" href="/faculty"><svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg><span class="btn__lq">See full faculty</span></a>
      </div>
    </div>
  </div>

  <section class="sec">
    <div class="head"><p class="eyebrow">The course</p>
      <h2>What {esc(sn)} teaches</h2></div>
    <dl class="tp__spec">
      <div><dt>Subject</dt><dd>{esc(subj)}</dd></div>
      <div><dt>Levels</dt><dd>{esc(levels_line(t))}</dd></div>
      {'<div><dt>Syllabus</dt><dd>' + " · ".join(esc(c) for c in codes) + '</dd></div>' if codes else ''}
      <div><dt>Format</dt><dd>Live online classes, every session recorded</dd></div>
      <div><dt>Materials</dt><dd>Past papers and mark schemes, indexed by topic</dd></div>
    </dl>
  </section>

  <section class="sec">
    <div class="head"><p class="eyebrow">Same faculty group</p>
      <h2>Also in {esc(grp)}</h2></div>
    <div class="row facgrid">{sibs}</div>
  </section>

  <div class="tp__cta cpane cpane--gilt">
    <p class="eyebrow">Admissions</p>
    <h2>Study {esc(subj)} with {esc(sn)}</h2>
    <p>Classes run live and are recorded, so students in Pakistan, the Gulf and further
       afield can follow the same course at their own hours.</p>
    <div class="tp__acts">
      {demo}
      <a class="btn btn--liquid" href="/#contact"><svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg><span class="btn__lq">Enrol now</span></a>
      <!-- A teacher page is a landing page: most arrivals come from a name
           search and have never seen the roster. Without this the only way
           onward is the nav. -->
      <a class="btn btn--liquid btn--liquid-clear" href="/faculty"><svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg><span class="btn__lq">See the full faculty at Cambridge Online</span></a>
    </div>
  </div>
</main>
{FOOT}
{FURNITURE}
<script>
/* The shell's controls. The main site drives these from a 285 KB bundle these
   pages have no reason to load, so this is the same behaviour written small:
   the same localStorage key, the same theme-color swap, the same storage
   listener, so a theme chosen here holds when the visitor moves to the index
   and a change in another tab follows here. */
(function(){{
  var D=document.documentElement;
  function applyTheme(mode){{
    D.setAttribute("data-theme",mode);
    var m=document.querySelector('meta[name="theme-color"]');
    if(m) m.setAttribute("content", mode==="dark" ? "#0C0304" : "#F6F1E6");
    [].forEach.call(document.querySelectorAll("[data-theme-btn]"),function(b){{
      b.setAttribute("aria-label", mode==="dark" ? "Switch to light mode" : "Switch to dark mode");
    }});
    try{{ localStorage.setItem("co-theme",mode); }}catch(e){{}}
  }}
  var saved=null; try{{ saved=localStorage.getItem("co-theme"); }}catch(e){{}}
  applyTheme(saved==="dark" ? "dark" : "light");
  window.addEventListener("storage",function(e){{
    if(e.key==="co-theme"&&(e.newValue==="light"||e.newValue==="dark")) applyTheme(e.newValue);
  }});

  document.addEventListener("click",function(e){{
    var t=e.target.closest ? e.target : null;
    if(!t) return;
    if(t.closest("[data-theme-btn]")){{
      applyTheme(D.getAttribute("data-theme")==="dark" ? "light" : "dark"); tap(); return;
    }}
    if(t.closest("[data-sound-btn]")){{
      var now=!sndOn();
      try{{ localStorage.setItem(SND_KEY, now?"on":"off"); }}catch(e){{}}
      paintSnd(); if(now) tap(); return;
    }}
    /* WhatsApp sheet. Two numbers, so the button opens a list rather than
       quietly picking one. */
    var wa=t.closest("[data-wa]"), pop=document.getElementById("wapop");
    if(wa&&pop){{
      var open=wa.getAttribute("aria-expanded")==="true";
      wa.setAttribute("aria-expanded",String(!open));
      pop.setAttribute("aria-hidden",String(open));
      pop.classList.toggle("is-on",!open);
      return;
    }}
    if(pop&&!t.closest("#wapop")){{
      pop.setAttribute("aria-hidden","true"); pop.classList.remove("is-on");
      var b2=document.querySelector("[data-wa]"); if(b2) b2.setAttribute("aria-expanded","false");
    }}
  }});
  document.addEventListener("keydown",function(e){{
    if(e.key!=="Escape") return;
    var pop=document.getElementById("wapop"); if(!pop) return;
    pop.setAttribute("aria-hidden","true"); pop.classList.remove("is-on");
    var b2=document.querySelector("[data-wa]"); if(b2) b2.setAttribute("aria-expanded","false");
  }});

  /* The dock is opacity:0 until body carries `ready` — that is how the site
     stages its entrance. These pages never set it, which is why the toggle
     was in the DOM but invisible. is-live then swaps the slow entrance curve
     for the quick one, exactly as the main script does at 1.5s. */
  requestAnimationFrame(function(){{ document.body.classList.add("ready"); }});
  setTimeout(function(){{
    var d=document.querySelector(".dock"); if(d) d.classList.add("is-live");
  }}, 1500);

  /* Sound. There is no audio on these pages beyond the tap, but the button
     writes the same co-sound key the rest of the site reads, so muting here
     holds when the visitor moves on. */
  var SND_KEY="co-sound", actx=null;
  function sndOn(){{
    try{{ return localStorage.getItem(SND_KEY)!=="off"; }}catch(e){{ return true; }}
  }}
  function paintSnd(){{
    var on=sndOn();
    [].forEach.call(document.querySelectorAll("[data-sound-btn]"),function(b){{
      b.setAttribute("aria-pressed",String(on));
      b.setAttribute("aria-label",on?"Mute sound":"Unmute sound");
    }});
  }}
  function tap(){{
    if(!sndOn()) return;
    try{{
      var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      actx=actx||new AC();
      var o=actx.createOscillator(), g=actx.createGain();
      o.type="sine"; o.frequency.value=880;
      g.gain.setValueAtTime(.0001,actx.currentTime);
      g.gain.exponentialRampToValueAtTime(.05,actx.currentTime+.008);
      g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.13);
      o.connect(g); g.connect(actx.destination);
      o.start(); o.stop(actx.currentTime+.14);
    }}catch(e){{}}
  }}
  paintSnd();

  /* The dock sits bottom-left and the footer's crest sits there too, so on a
     short page they collide. The site solves this with is-yield; here the
     footer entering view is the trigger. */
  if("IntersectionObserver" in window){{
    var foot=document.querySelector("footer"), dock=document.querySelector(".dock");
    if(foot&&dock){{
      new IntersectionObserver(function(en){{
        dock.classList.toggle("is-yield", en[0].isIntersecting);
      }},{{rootMargin:"0px 0px -40px 0px"}}).observe(foot);
    }}
  }}

  var b=document.querySelector('.burger');
  if(b) b.addEventListener('click',function(){{
    var on=b.getAttribute('aria-expanded')==='true';
    b.setAttribute('aria-expanded',String(!on));
    document.body.classList.toggle('mob-on',!on);
  }});
}})();
</script>
</body>
</html>
"""

# Flat files at the repo root; cleanUrls turns teacher-<slug>.html into
# /teacher-<slug>. No folder, no rewrite, nothing to configure.
for t in F:
    # Everyone in the group, not a truncated six — otherwise a new hire lands
    # at the end of the array and quietly never appears on anyone's page.
    sibs = [s for s in F if s['group'] == t['group'] and s['id'] != t['id']]
    open(f"{OUT}/teacher-{t['id']}.html", 'w', encoding='utf-8').write(page(t, sibs))
print("wrote", len(F), "teacher pages")

# ---- teachers who have gone -----------------------------------------------
# Writing the current teachers was only ever half the job. A teacher removed
# in the control room vanished from the listing while their page stayed on the
# domain: indexed, linked to from outside, and now orphaned. Left alone it
# either keeps ranking for a teacher who no longer works here, or turns into a
# 404 the day somebody deletes the file by hand.
#
# So every teacher-*.html that no longer has a record is replaced by a stub
# that says so plainly: noindex so it drops out of the results, a canonical to
# the faculty list so any accumulated authority points somewhere useful, and a
# redirect for anyone who follows an old link.
#
# A 301 would be better and is deliberately not used. Vercel reads vercel.json
# before the build runs, so redirects generated here would never be applied,
# and a redirect rule that silently does nothing is worse than a stub that
# visibly works. If the list ever grows long enough to matter, the right fix
# is redirect entries in vercel.json rather than a cleverer build.
import glob
_live_ids = {t["id"] for t in F}
_gone = []
for _f in glob.glob(os.path.join(OUT, "teacher-*.html")):
    _slug = os.path.basename(_f)[len("teacher-"):-len(".html")]
    if _slug in _live_ids:
        continue
    open(_f, "w", encoding="utf-8").write(
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
        '<meta charset="utf-8">\n'
        '<meta name="robots" content="noindex,follow">\n'
        f'<link rel="canonical" href="{SITE}/faculty">\n'
        f'<meta http-equiv="refresh" content="0; url={SITE}/faculty">\n'
        '<title>This teacher is no longer listed — Cambridge Online</title>\n'
        '</head>\n<body>\n'
        '<p>This teacher is no longer listed. '
        f'<a href="{SITE}/faculty">See the current faculty</a>.</p>\n'
        '</body>\n</html>\n')
    _gone.append(_slug)

    # The lecture page goes the same way, or it outlives the teacher it belongs to.
    _lec = os.path.join(OUT, "lecture-%s.html" % _slug)
    if os.path.exists(_lec):
        open(_lec, "w", encoding="utf-8").write(
            '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
            '<meta charset="utf-8">\n'
            '<meta name="robots" content="noindex,follow">\n'
            f'<link rel="canonical" href="{SITE}/faculty">\n'
            f'<meta http-equiv="refresh" content="0; url={SITE}/faculty">\n'
            '<title>This lesson is no longer listed — Cambridge Online</title>\n'
            '</head>\n<body>\n'
            '<p>This lesson is no longer listed. '
            f'<a href="{SITE}/faculty">See the current faculty</a>.</p>\n'
            '</body>\n</html>\n')

if _gone:
    print("  retired: " + ", ".join(sorted(_gone)))

# ---- sitemap --------------------------------------------------------------
# Both page families, with the hints the hand-written version carried. An
# earlier version of this script listed only the teacher pages, so each run
# quietly deleted the eighteen lecture URLs from the sitemap.
import datetime
_today = datetime.date.today().isoformat()
rows = [(SITE + "/", "weekly", "1.0"),
        (SITE + "/faculty", "weekly", "0.9"),
        (SITE + "/about", "monthly", "0.8")]
rows += [(f"{SITE}/teacher-{t['id']}", "monthly", "0.8") for t in F]
rows += [(f"{SITE}/lecture-{t['id']}", "monthly", "0.7") for t in F]
open(f"{OUT}/sitemap.xml", "w").write(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f'  <url><loc>{u}</loc><lastmod>{_today}</lastmod>'
              f'<changefreq>{c}</changefreq><priority>{p_}</priority></url>\n'
              for u, c, p_ in rows)
    + "</urlset>\n")
print(f"sitemap.xml    {len(rows)} urls")

# ---- make the faculty cards themselves the links ---------------------------
# The "Our teachers" list has gone: the faculty page is the roster, and a
# duplicate list of the same names underneath it was redundant for a reader
# and diluted for a crawler. But the cards are <button>s that open a dialog,
# and Google cannot follow those — so the cards get an href. Each one now
# links to that teacher's page, which is a stronger signal than the list ever
# was, because the link sits on the card a reader would click anyway.
CARD_HOOK = """
  /* Each card is also a link to the teacher's own page. The dialog still
     opens on click; the href is what a crawler follows, and what a
     middle-click or "open in new tab" gets. */
  (function () {
    function linkify(root) {
      var cards = (root || document).querySelectorAll(".fac[data-id]:not([data-linked])");
      for (var i = 0; i < cards.length; i++) {
        var c = cards[i], id = c.getAttribute("data-id");
        if (!id) continue;
        c.setAttribute("data-linked", "1");
        var a = document.createElement("a");
        a.className = "fac__permalink";
        a.href = "/teacher-" + id;
        a.tabIndex = -1;
        a.setAttribute("aria-hidden", "true");
        c.appendChild(a);
      }
    }
    linkify();
    if ("MutationObserver" in window) {
      new MutationObserver(function (m) {
        for (var i = 0; i < m.length; i++) if (m[i].addedNodes.length) { linkify(); break; }
      }).observe(document.body, { childList: true, subtree: true });
    }
  })();
"""
CARD_CSS = """
/* The permalink sits under the card's own content, so the dialog still opens
   on a normal click while the href stays crawlable and middle-clickable. */
.fac__permalink{position:absolute;inset:0;z-index:1;opacity:0;font-size:0}
"""

items_removed = 0
for f in ("index.html", "about.html", "faculty.html"):
    path = os.path.join(OUT, f)
    if not os.path.exists(path): continue
    doc = open(path, encoding="utf-8", errors="surrogateescape").read()
    before = doc
    # pull the redundant list and the styles that served only it
    doc = re.sub(r'\n<!-- Crawlable index of the teacher pages.*?</nav>\n', '\n', doc, flags=re.S)
    doc = re.sub(r'\n/\* ---- crawlable faculty index -+ \*/\n(?:\.facidx[^\n]*\n)+', '\n', doc)
    if "fac__permalink" not in doc:
        doc = doc.replace("</style>", CARD_CSS + "</style>", 1)
        doc = doc.replace("</body>", "<script>" + CARD_HOOK + "</script>\n</body>", 1)
    if doc != before:
        open(path, "w", encoding="utf-8", errors="surrogateescape").write(doc)
        items_removed += 1
        print(f"  ~ {f}: teacher list removed, cards linked")
    else:
        print(f"  = {f}: already done")

# ---- anything obviously missing -------------------------------------------
declined = [t["id"] for t in F if t.get("nophoto")]
gaps = [t["id"] for t in F
        if not t.get("nophoto") and not os.path.exists(os.path.join(OUT, t["id"] + ".webp"))]
if declined:
    print("\nNo portrait by choice: " + ", ".join(declined) + " (drawn slot, nothing to do)")
if gaps:
    print("\nPORTRAIT MISSING: " + ", ".join(gaps))
    print("Add <id>.webp at 1000x625, or set nophoto:true if they'd rather not have one.")
print("\nDone. Upload every teacher-*.html, sitemap.xml, and any page above marked ~")
