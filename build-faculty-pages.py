#!/usr/bin/env python3
"""
Regenerates every teacher page, the sitemap, and the "Our teachers" lists.

Run it from the repo root after you change the faculty:

    python3 build-faculty-pages.py

Everything it needs is read out of index.html — the teacher records, the
subject accent colours, the header and the footer — so nothing here can drift
from the live site, and there is no second copy of the data to keep in step.

TO ADD A TEACHER
  1. Add the record to FACULTY_BAKED in index.html (copy an existing one).
  2. Drop the portrait in as <id>.webp, 1000x625, same plinth as the others.
  3. Run this script.
  4. Upload the changed files. Adding one teacher changes the sibling cards on
     everyone else in the same group, so re-upload all the teacher pages, not
     just the new one.
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
_i = PAGE.find("const FACULTY_BAKED")
if _i < 0: sys.exit("FACULTY_BAKED not found in index.html")
_body = PAGE[_i:PAGE.find("\n];", _i)]

F = []
for blk in re.split(r'\n  \{ id:', _body)[1:]:
    blk = "id:" + blk
    g = lambda k: _unescape_js((re.search(k + r':\s*"((?:[^"\\]|\\.)*)"', blk) or [None, ""])[1])
    arr = lambda k: [_unescape_js(v) for v in re.findall(
        r'"((?:[^"\\]|\\.)*)"', (re.search(k + r':\s*\[(.*?)\]', blk, re.S) or [None, ""])[1])]
    rec = dict(id=g("id"), name=g("name"), subject=g("subject"), group=g("group"),
               tag=g("tag"), bio=g("bio"), levels=arr("levels"),
               distinctions=arr("distinctions"), star=bool(re.search(r'star:\s*true', blk)),
               nophoto=bool(re.search(r'nophoto:\s*true', blk)))
    dm = re.search(r'demo:\{([^}]*)\}', blk)
    if dm:
        rec["demo"] = {"title": (re.search(r'title:"([^"]*)"', dm.group(1)) or [None, ""])[1],
                       "mins":  (re.search(r'mins:(\d+)',     dm.group(1)) or [None, ""])[1],
                       "code":  (re.search(r'code:"([^"]*)"',  dm.group(1)) or [None, ""])[1]}
    F.append(rec)
if not F: sys.exit("parsed 0 teachers — has FACULTY_BAKED's shape changed?")

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
HEAD = re.search(r'(<header.*?</header>)', PAGE, re.S).group(1)
FOOT = re.search(r'(<footer.*?</footer>)', PAGE, re.S).group(1)
HEAD = HEAD.replace('src="mark-128.webp"', 'src="/mark-128.webp"')
HEAD = HEAD.replace('href="#faculty" class="on"', 'href="/faculty" class="on"')
HEAD = HEAD.replace('href="#campuses"', 'href="/#campuses"')
HEAD = re.sub(r'href="#([a-z]+)"', r'href="/#\1"', HEAD)
FOOT = re.sub(r'(src|href)="(?!https?:|/|#|mailto:|tel:)', r'\1="/', FOOT)

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

HEAD = open('/home/claude/_header.html', encoding='utf-8').read()
FOOT = open('/home/claude/_footer.html', encoding='utf-8').read()
# the teacher pages live one level down, so root-relative the asset paths
HEAD = HEAD.replace('src="mark-128.webp"', 'src="/mark-128.webp"')
HEAD = HEAD.replace('href="#faculty" class="on"', 'href="/faculty" class="on"')
HEAD = HEAD.replace('href="#campuses"', 'href="/#campuses"')
FOOT = re.sub(r'(src|href)="(?!https?:|/|#|mailto:|tel:)', r'\1="/', FOOT)

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


    title = f"{n} — {subj} Teacher | Cambridge Online (SWK Solutions)"
    desc = (f"{n} teaches {subj} at Cambridge Online, the online academy of SWK Solutions. "
            f"{levels_line(t)}"
            + (f" · {codestr}." if codes else ".")
            + f" {t['tag']}. Live classes and recorded lectures.")[:300]

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
    d = t.get('demo')
    if d and d.get('title'):
        demo = (f'<a class="btn btn--liquid" href="/lecture?t={t["id"]}">'
                f'<svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg>'
                f'<span class="btn__lq">Watch the free lecture — {esc(d["title"])}</span></a>')

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

/* The sibling row uses .fac and .facgrid straight from site.css. The only
   thing needed here is that a .fac rendered as a link doesn't inherit the
   underline and colour a bare <a> would carry. */
.facgrid .fac{{text-decoration:none;color:inherit}}

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
    </div>
  </div>
</main>
{FOOT}
<script>
/* Just the burger. The teacher pages do not need the rest of the site's script. */
(function(){{
  var b=document.querySelector('.burger');
  if(!b) return;
  b.addEventListener('click',function(){{
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

# ---- sitemap --------------------------------------------------------------
urls = [(SITE + "/", "1.0"), (SITE + "/about", "0.8"),
        (SITE + "/faculty", "0.9"), (SITE + "/lecture", "0.6")]
urls += [(f"{SITE}/teacher-{t['id']}", "0.8") for t in F]
open(f"{OUT}/sitemap.xml", "w").write(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f"  <url><loc>{u}</loc><priority>{p}</priority></url>\n" for u, p in urls)
    + "</urlset>\n")
print(f"sitemap.xml    {len(urls)} urls")

open(f"{OUT}/robots.txt", "w").write(
    "User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n" % SITE)
print("robots.txt     written")

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
