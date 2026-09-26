#!/usr/bin/env python3
"""
Builds one lecture page per teacher: /lecture-<id> instead of /lecture?t=<id>.

A query string is a poor URL for a page you want indexed and shared — Google
treats ?t= as a parameter on one page rather than as eighteen pages, and it
reads badly in a WhatsApp message. Each teacher gets a real file.

The page markup, CSS and JS are identical across all eighteen; only the baked
teacher id and the head metadata differ. CSS and JS live in lecture.css and
lecture.js so the eighteen files stay small.

Run from the repo root after changing the faculty or lecture.html:

    python3 build-lecture-pages.py
"""
import json, os, re, sys, html

SITE = "https://cambridgeonline.tech"
OUT  = os.path.dirname(os.path.abspath(__file__))

for f in ("index.html", "_lecture.tpl"):
    if not os.path.exists(os.path.join(OUT, f)):
        sys.exit(f"{f} not found. Run this from the repo root.")

PAGE = open(os.path.join(OUT, "index.html"), encoding="utf-8", errors="surrogateescape").read()
TPL  = open(os.path.join(OUT, "_lecture.tpl"), encoding="utf-8", errors="surrogateescape").read()

# The template opens with a note to whoever edits it. That note is for this
# repository, not for a reader or a crawler, and it was being copied verbatim
# into the top of all eighteen published pages — above the doctype.
TPL = re.sub(r'^\s*<!--.*?-->\s*', '', TPL, count=1, flags=re.S)

def esc(x): return html.escape(x or "", quote=True)
def _un(x):
    if not isinstance(x, str): return x
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), x).replace('\\"', '"')

# ---- the roster ------------------------------------------------------------
# Supabase first, the baked array only if that fails. This has to match
# build-faculty-pages.py exactly: if the two read different sources, a teacher
# gets a profile page and no lesson page, or the reverse, and nothing says so.

def _baked_roster():
    i = PAGE.find("const FACULTY_BAKED")
    if i < 0: return []
    body = PAGE[i:PAGE.find("\n];", i)]
    out = []
    for blk in re.split(r'\n  \{ id:', body)[1:]:
        blk = "id:" + blk
        g = lambda k: _un((re.search(k + r':\s*"((?:[^"\\]|\\.)*)"', blk) or [None, ""])[1])
        rec = dict(id=g("id"), name=g("name"), subject=g("subject"), tag=g("tag"))
        dm = re.search(r'demo:\{([^}]*)\}', blk)
        rec["demo"] = {"title": (re.search(r'title:"([^"]*)"', dm.group(1)) or [None, ""])[1],
                       "mins":  (re.search(r'mins:(\d+)',     dm.group(1)) or [None, ""])[1],
                       "code":  (re.search(r'code:"([^"]*)"',  dm.group(1)) or [None, ""])[1]} if dm else None
        out.append(rec)
    return out


def _live_roster():
    cfg = os.path.join(OUT, "config.js")
    if not os.path.exists(cfg): return []
    src = open(cfg, encoding="utf-8", errors="surrogateescape").read()
    u = re.search(r'url:\s*"([^"]+)"', src)
    k = re.search(r'anonKey:\s*"([^"]+)"', src)
    if not u or not k: return []
    import urllib.request
    q = u.group(1).rstrip("/") + "/rest/v1/faculty?select=*&active=eq.true&order=sort,name"
    req = urllib.request.Request(q, headers={"apikey": k.group(1),
                                             "Authorization": "Bearer " + k.group(1)})
    with urllib.request.urlopen(req, timeout=20) as r:
        rows = json.loads(r.read().decode("utf-8"))
    out = []
    for t in rows:
        if not (t.get("slug") and t.get("name")): continue
        rec = dict(id=t["slug"], name=t["name"],
                   subject=t.get("subject") or "", tag=t.get("tag") or "")
        rec["demo"] = ({"title": t.get("demo_title") or "",
                        "mins": str(t.get("demo_mins") or ""),
                        "code": t.get("demo_code") or ""}
                       if t.get("demo_enabled") else None)
        out.append(rec)
    return out


try:
    F = _live_roster()
    SOURCE = "Supabase"
except Exception as e:
    print("  ! could not reach Supabase (%s) — falling back to FACULTY_BAKED" % e)
    F, SOURCE = [], "fallback"
if not F:
    F, SOURCE = _baked_roster(), "FACULTY_BAKED (fallback)"
if not F: sys.exit("no teachers from either source — refusing to publish")
print("  roster: %d, from %s" % (len(F), SOURCE))

written = 0
for t in F:
    d = t.get("demo") or {}
    url = f"{SITE}/lecture-{t['id']}"
    # Two pages carry each teacher — the profile and this. If both lead on the
    # teacher's name they compete for the same query and Google often ranks
    # neither well. So the profile owns the name and this owns the lesson:
    # the title leads with the topic and the level, not the person.
    lvl = "O Level & A Level"
    title = (f"{d.get('title')} — free {t['subject']} lesson | Cambridge Online"
             if d.get("title") else f"Free {t['subject']} lesson | Cambridge Online")
    desc = (f"A complete {t['subject']} lesson, free to watch end to end — no form, no deposit"
            + (f". {d['title']}, {d['mins']} minutes, taught by {t['name']}." if d.get("title")
               else f", taught by {t['name']}.")
            + " The notes and past-paper questions that come with the course are listed too.")

    img = (f"{SITE}/{t['id']}.webp"
           if os.path.exists(os.path.join(OUT, t["id"] + ".webp")) else f"{SITE}/og-card.png")

    p = TPL
    # the id the page reads instead of the query string
    p = p.replace("<head>", '<head>\n<script>window.CO_LECTURE_ID="%s";</script>' % t["id"], 1)
    # per-teacher head metadata; the JS still rewrites the title at runtime for
    # the query-string route, which is harmless — this is what a crawler reads
    p = re.sub(r'<title>.*?</title>', f'<title>{esc(title)}</title>', p, count=1, flags=re.S)
    p = re.sub(r'<meta name="description" content="[^"]*">',
               f'<meta name="description" content="{esc(desc)}">', p, count=1)
    p = re.sub(r'<link rel="canonical" href="[^"]*">',
               f'<link rel="canonical" href="{url}">', p, count=1)
    p = re.sub(r'<meta property="og:url" content="[^"]*">',
               f'<meta property="og:url" content="{url}">', p, count=1)
    for k in ("og:title", "twitter:title"):
        p = re.sub(rf'<meta (property|name)="{k}" content="[^"]*">',
                   f'<meta {"property" if k.startswith("og") else "name"}="{k}" content="{esc(title)}">',
                   p, count=1)
    for k in ("og:description", "twitter:description"):
        p = re.sub(rf'<meta (property|name)="{k}" content="[^"]*">',
                   f'<meta {"property" if k.startswith("og") else "name"}="{k}" content="{esc(desc)}">',
                   p, count=1)
    for k in ("og:image", "twitter:image"):
        p = re.sub(rf'<meta (property|name)="{k}" content="[^"]*">',
                   f'<meta {"property" if k.startswith("og") else "name"}="{k}" content="{img}">',
                   p, count=1)

    open(os.path.join(OUT, f"lecture-{t['id']}.html"), "w",
         encoding="utf-8", errors="surrogateescape").write(p)
    written += 1

print(f"wrote {written} lecture pages")
print("Remember to point the CTAs at /lecture-<id> and add them to sitemap.xml")
