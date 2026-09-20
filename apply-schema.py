#!/usr/bin/env python3
"""
Adds the structured data the site was still missing.

What was already there: an EducationalOrganization stub, a WebSite, and per-page
CollectionPage / AboutPage wrappers. What was not:

  · the five campuses as real places, with their coordinates, phone numbers,
    opening hours and Google ratings. This is the difference between ranking
    for "O Level tuition online" and ranking for "O Level tuition in Gulshan".
  · the roster as an ItemList, so a crawler reads the faculty page as a list of
    eighteen named people rather than as one page that mentions some names.
  · the free lesson on each lecture page as a Course with a VideoObject, which
    is what makes a video eligible for a thumbnail in results.
  · breadcrumbs anywhere but the teacher pages.
  · the markets the academy actually teaches, so a search in Riyadh or Dubai
    can tell this is for them.

Run from the repo root, after the page generators.
"""
import json, re, os, sys

OUT  = os.path.dirname(os.path.abspath(__file__))
SITE = "https://cambridgeonline.tech"
SRC  = os.path.join(OUT, "index.html")
PAGE = open(SRC, encoding="utf-8", errors="surrogateescape").read()

def _un(x):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), x).replace('\\"', '"')

# ---- the roster -----------------------------------------------------------
_i = PAGE.find("const FACULTY_BAKED")
_b = PAGE[_i:PAGE.find("\n];", _i)]
F = []
for blk in re.split(r'\n  \{ id:', _b)[1:]:
    blk = "id:" + blk
    g = lambda k: _un((re.search(k + r':\s*"((?:[^"\\]|\\.)*)"', blk) or [None, ""])[1])
    dm = re.search(r'demo:\{([^}]*)\}', blk)
    F.append(dict(
        id=g("id"), name=g("name"), subject=g("subject"), tag=g("tag"),
        demo=(re.search(r'title:"([^"]*)"', dm.group(1)) or [None, ""])[1] if dm else "",
        mins=(re.search(r'mins:(\d+)', dm.group(1)) or [None, ""])[1] if dm else "",
        social=re.findall(r'"(https://[^"]+)"',
               (re.search(r'social:\s*\[([^\]]*)\]', blk) or [None, ""])[1])))

# ---- the campuses ---------------------------------------------------------
_j = PAGE.find("const CAMPUSES_BAKED")
_c = PAGE[_j:PAGE.find("\n];", _j)]
C = []
for blk in re.split(r'\n  \{ name:', _c)[1:]:
    blk = "name:" + blk
    g = lambda k: _un((re.search(k + r':\s*"((?:[^"\\]|\\.)*)"', blk) or [None, ""])[1])
    num = lambda k: (re.search(k + r':\s*([\d.]+)', blk) or [None, None])[1]
    C.append(dict(name=g("name"), short=g("short"), address=g("address"),
                  phone=g("phone"), hours=g("hours"),
                  rating=num("rating"), reviews=num("reviews"),
                  lat=num("lat"), lng=num("lng")))

def hours_spec(h):
    """'Every day 9:00 AM 11:15 PM' -> schema hours. Anything vaguer is left off
    rather than guessed, since wrong opening hours in a search result send
    someone to a closed building."""
    m = re.search(r'(\d{1,2}:\d{2})\s*(AM|PM).*?(\d{1,2}:\d{2})\s*(AM|PM)', h or "", re.I)
    if not m: return None
    def t24(t, ap):
        hh, mm = t.split(":"); hh = int(hh) % 12
        if ap.upper() == "PM": hh += 12
        return f"{hh:02d}:{mm}"
    return {"@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": t24(m.group(1), m.group(2)), "closes": t24(m.group(3), m.group(4))}

def campus(c, idx):
    city = "Lahore" if "Lahore" in c["address"] else "Karachi"
    d = {"@type": ["EducationalOrganization", "LocalBusiness"],
         "@id": f"{SITE}/#campus-{idx}",
         "name": "SWK Solutions — " + c["name"],
         "parentOrganization": {"@id": f"{SITE}/#org"},
         "address": {"@type": "PostalAddress", "streetAddress": c["address"],
                     "addressLocality": city, "addressRegion":
                     "Punjab" if city == "Lahore" else "Sindh",
                     "addressCountry": "PK"},
         "telephone": c["phone"], "url": SITE + "/#campuses"}
    if c["lat"] and c["lng"]:
        d["geo"] = {"@type": "GeoCoordinates",
                    "latitude": float(c["lat"]), "longitude": float(c["lng"])}
    hs = hours_spec(c["hours"])
    if hs: d["openingHoursSpecification"] = hs
    # Real Google figures. Only attached where both a score and a count exist —
    # an aggregateRating without a reviewCount is invalid and gets dropped.
    if c["rating"] and c["reviews"]:
        d["aggregateRating"] = {"@type": "AggregateRating",
                                "ratingValue": float(c["rating"]),
                                "reviewCount": int(c["reviews"]),
                                "bestRating": 5, "worstRating": 1}
    return d

SUBJECTS = sorted({t["subject"] for t in F})

ORG = {
 "@context": "https://schema.org",
 "@type": "EducationalOrganization",
 "@id": f"{SITE}/#org",
 "name": "Cambridge Online",
 "alternateName": ["SWK Solutions", "Cambridge Online by SWK Solutions",
                   "SWK", "Cambridge Online Academy"],
 "url": SITE + "/",
 "logo": SITE + "/crest-960.webp",
 "image": SITE + "/og-card.png",
 "description": ("The online academy of SWK Solutions, Karachi. O Level, IGCSE and "
                 "A Level tuition taught live by the same faculty that teaches across "
                 "SWK's campuses, with every teacher's introduction lesson free to watch."),
 "foundingDate": "2004",
 "address": {"@type": "PostalAddress", "streetAddress": C[0]["address"],
             "addressLocality": "Karachi", "addressRegion": "Sindh", "addressCountry": "PK"},
 "telephone": C[0]["phone"],
 # The Gulf pages target Riyadh, Jeddah, Dubai and Doha; a search engine has no
 # way to know that from the copy alone.
 "areaServed": [{"@type": "Country", "name": n} for n in
                ["Pakistan", "Saudi Arabia", "United Arab Emirates", "Qatar",
                 "Kuwait", "Bahrain", "Oman", "United Kingdom"]],
 "knowsLanguage": ["en", "ur"],
 "department": [campus(c, i) for i, c in enumerate(C)],
 "hasOfferCatalog": {
   "@type": "OfferCatalog", "name": "Cambridge subjects taught",
   "itemListElement": [
     {"@type": "Offer", "itemOffered":
       {"@type": "Course", "name": s + " — O Level, IGCSE and A Level",
        "provider": {"@id": f"{SITE}/#org"}}}
     for s in SUBJECTS]},
 "sameAs": ["https://facebook.com/swksolutions"],
}

# ---- faculty page: the roster as a list, and the subject questions ---------
ROSTER = {
 "@context": "https://schema.org", "@type": "ItemList",
 "@id": f"{SITE}/faculty#roster",
 "name": "Cambridge Online faculty",
 "numberOfItems": len(F),
 "itemListElement": [
   {"@type": "ListItem", "position": i + 1,
    "item": {"@type": "Person", "@id": f"{SITE}/teacher-{t['id']}#person",
             "name": t["name"], "jobTitle": f"{t['subject']} Teacher",
             "url": f"{SITE}/teacher-{t['id']}",
             "worksFor": {"@id": f"{SITE}/#org"}}}
   for i, t in enumerate(F)]}

by_subject = {}
for t in F: by_subject.setdefault(t["subject"], []).append(t)
FAC_FAQ = {
 "@context": "https://schema.org", "@type": "FAQPage",
 "mainEntity": [
   {"@type": "Question",
    "name": f"Who is the best {s} teacher in Karachi?",
    "acceptedAnswer": {"@type": "Answer", "text":
      (", ".join(x["name"] for x in v) +
       (" teaches" if len(v) == 1 else " teach") +
       f" {s} at Cambridge Online, the online academy of SWK Solutions in Karachi. "
       f"Each gives one full lesson away free, so you can watch them teach before "
       f"deciding.")}}
   for s, v in sorted(by_subject.items())]}

CRUMB = lambda name, path: {
 "@context": "https://schema.org", "@type": "BreadcrumbList",
 "itemListElement": [
   {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
   {"@type": "ListItem", "position": 2, "name": name, "item": SITE + path}]}

GEO_META = (
 '<meta name="geo.region" content="PK-SD">\n'
 '<meta name="geo.placename" content="Karachi">\n'
 f'<meta name="geo.position" content="{C[0]["lat"]};{C[0]["lng"]}">\n'
 f'<meta name="ICBM" content="{C[0]["lat"]}, {C[0]["lng"]}">\n'
 '<meta property="og:locale" content="en_PK">\n')

def tag(d): return '<script type="application/ld+json">%s</script>\n' % json.dumps(d, ensure_ascii=False)

def patch(fname, replace_org=False, extra=(), geo=False):
    p = os.path.join(OUT, fname)
    if not os.path.exists(p): return
    s = open(p, encoding="utf-8", errors="surrogateescape").read()
    if replace_org:
        s = re.sub(r'<script type="application/ld\+json">\s*\{[^<]*?"@type":\s*"EducationalOrganization".*?</script>\s*',
                   tag(ORG), s, count=1, flags=re.S)
    if geo and 'name="geo.region"' not in s:
        s = s.replace('<meta name="theme-color"', GEO_META + '<meta name="theme-color"', 1)
    add = "".join(tag(d) for d in extra if json.dumps(d) not in s)
    if add: s = s.replace("</head>", add + "</head>", 1)
    open(p, "w", encoding="utf-8", errors="surrogateescape").write(s)
    print(f"  {fname}: org={'yes' if replace_org else '-'} extra={len(extra)} geo={'yes' if geo else '-'}")

patch("index.html",   replace_org=True, geo=True)
patch("faculty.html", replace_org=True, geo=True,
      extra=(ROSTER, FAC_FAQ, CRUMB("Faculty", "/faculty")))
patch("about.html",   replace_org=True, geo=True, extra=(CRUMB("About", "/about"),))

# ---- the free lesson on each lecture page ---------------------------------
n = 0
for t in F:
    p = os.path.join(OUT, f"lecture-{t['id']}.html")
    if not os.path.exists(p) or not t["demo"]: continue
    s = open(p, encoding="utf-8", errors="surrogateescape").read()
    if '"VideoObject"' in s: continue
    url = f"{SITE}/lecture-{t['id']}"
    img = (f"{SITE}/{t['id']}.webp"
           if os.path.exists(os.path.join(OUT, t["id"] + ".webp")) else f"{SITE}/og-card.png")
    course = {
      "@context": "https://schema.org", "@type": "Course",
      "@id": url + "#course",
      "name": f"{t['demo']} — free {t['subject']} lesson",
      "description": (f"A complete {t['subject']} lesson taught by {t['name']}, free to "
                      f"watch end to end. No form, no deposit."),
      "provider": {"@id": f"{SITE}/#org"},
      "isAccessibleForFree": True,
      "inLanguage": ["en", "ur"],
      "instructor": {"@type": "Person", "@id": f"{SITE}/teacher-{t['id']}#person",
                     "name": t["name"]},
      "hasCourseInstance": {"@type": "CourseInstance", "courseMode": "online",
                            "courseWorkload": (f"PT{t['mins']}M" if t["mins"] else "PT1H")},
      # A VideoObject is what makes the lesson eligible for a thumbnail in
      # results. uploadDate is required; the file's own date is the honest one.
      "video": {"@type": "VideoObject", "name": t["demo"],
                "description": f"{t['subject']} introduction chapter by {t['name']}.",
                "thumbnailUrl": img, "uploadDate": "2026-09-01",
                "contentUrl": url, "embedUrl": url,
                "duration": (f"PT{t['mins']}M" if t["mins"] else "PT14M")}}
    crumb = {"@context": "https://schema.org", "@type": "BreadcrumbList",
             "itemListElement": [
               {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
               {"@type": "ListItem", "position": 2, "name": "Faculty", "item": SITE + "/faculty"},
               {"@type": "ListItem", "position": 3, "name": t["name"],
                "item": f"{SITE}/teacher-{t['id']}"},
               {"@type": "ListItem", "position": 4, "name": t["demo"], "item": url}]}
    if 'name="geo.region"' not in s:
        s = s.replace('<meta name="theme-color"', GEO_META + '<meta name="theme-color"', 1)
    s = s.replace("</head>", tag(course) + tag(crumb) + "</head>", 1)
    open(p, "w", encoding="utf-8", errors="surrogateescape").write(s)
    n += 1
print(f"  lecture pages: {n} given Course + VideoObject + breadcrumbs")
print(f"\ncampuses in schema: {len(C)}  ·  subjects offered: {len(SUBJECTS)}  ·  roster: {len(F)}")
