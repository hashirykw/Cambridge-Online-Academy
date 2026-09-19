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
# The template's own note to whoever opens it — not something to ship on
# eighteen pages.
TPL  = re.sub(r'^<!-- _lecture\.tpl.*?-->\n', '', TPL, flags=re.S)

def esc(x): return html.escape(x or "", quote=True)
def _un(x):
    if not isinstance(x, str): return x
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), x).replace('\\"', '"')

# ---- the roster, read from index.html so there is one source of truth ----
_i = PAGE.find("const FACULTY_BAKED")
_body = PAGE[_i:PAGE.find("\n];", _i)]
F = []
for blk in re.split(r'\n  \{ id:', _body)[1:]:
    blk = "id:" + blk
    g = lambda k: _un((re.search(k + r':\s*"((?:[^"\\]|\\.)*)"', blk) or [None, ""])[1])
    rec = dict(id=g("id"), name=g("name"), subject=g("subject"), tag=g("tag"))
    dm = re.search(r'demo:\{([^}]*)\}', blk)
    rec["demo"] = {"title": (re.search(r'title:"([^"]*)"', dm.group(1)) or [None, ""])[1],
                   "mins":  (re.search(r'mins:(\d+)',     dm.group(1)) or [None, ""])[1],
                   "code":  (re.search(r'code:"([^"]*)"',  dm.group(1)) or [None, ""])[1]} if dm else None
    F.append(rec)
if not F: sys.exit("parsed 0 teachers")

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

    # WhatsApp and Facebook are unreliable with WebP and WhatsApp is the
    # channel these links travel on, so the share image is the JPEG card from
    # build-og-cards.py — never the portrait itself.
    img = (f"{SITE}/og-{t['id']}.jpg"
           if os.path.exists(os.path.join(OUT, f"og-{t['id']}.jpg")) else f"{SITE}/og-card.png")

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

    # The alt text and the type travel with the image, or every page keeps
    # describing the homepage card.
    alt = esc(f"{t['name']} \u2014 {t['subject']} at Cambridge Online")
    for k in ("og:image:alt", "twitter:image:alt"):
        p = re.sub(rf'<meta (property|name)="{k}" content="[^"]*">',
                   f'<meta {"property" if k.startswith("og") else "name"}="{k}" content="{alt}">',
                   p, count=1)
    p = re.sub(r'<meta property="og:image:type" content="[^"]*">',
               '<meta property="og:image:type" content="%s">'
               % ("image/jpeg" if img.endswith(".jpg") else "image/png"), p, count=1)

    # The breadcrumb the page shows, and the lesson itself. No contentUrl is
    # claimed: the file lives in the backend, and a VideoObject without one is
    # worse than no VideoObject at all.
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Faculty", "item": SITE + "/faculty"},
            {"@type": "ListItem", "position": 3, "name": t["name"],
             "item": f"{SITE}/teacher-{t['id']}"},
            {"@type": "ListItem", "position": 4,
             "name": d.get("title") or f"Introduction to {t['subject']}", "item": url}]}
    lesson = {"@context": "https://schema.org", "@type": "LearningResource",
        "@id": url + "#lesson",
        "name": d.get("title") or f"Introduction to {t['subject']}",
        "url": url, "learningResourceType": "Lecture", "isAccessibleForFree": True,
        "educationalLevel": "O Level, IGCSE and A Level", "inLanguage": ["en", "ur"],
        "teaches": t["subject"],
        "author": {"@id": f"{SITE}/teacher-{t['id']}#person", "@type": "Person",
                   "name": t["name"]},
        "isPartOf": {"@id": f"{SITE}/teacher-{t['id']}#course"},
        "provider": {"@id": SITE + "/#org", "@type": "EducationalOrganization",
                     "name": "Cambridge Online"}}
    if d.get("mins"):
        lesson["timeRequired"] = f"PT{d['mins']}M"
    graph = "".join('<script type="application/ld+json">'
                    + json.dumps(o, ensure_ascii=False, separators=(",", ":"))
                    + "</script>\n" for o in (crumbs, lesson))
    p = p.replace('<link rel="stylesheet" href="/lecture.css">',
                  graph + '<link rel="stylesheet" href="/lecture.css">', 1)

    open(os.path.join(OUT, f"lecture-{t['id']}.html"), "w",
         encoding="utf-8", errors="surrogateescape").write(p)
    written += 1

print(f"wrote {written} lecture pages")
print("Now run build-faculty-pages.py — it writes the sitemap, and it picks the")
print("lecture pages up only once they exist on disk.")
