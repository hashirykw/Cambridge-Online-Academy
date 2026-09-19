# Cambridge Online

The online academy of **SWK Solutions** — O Level, IGCSE and A Level tuition
taught live from Karachi by the same eighteen teachers who teach across SWK's
five campuses.

Live: https://cambridgeonline.tech
Repo: https://github.com/hashirykw/Cambridge-Online-Academy

---

## 1 · What is in the folder

Everything sits in the **main folder**. No sub-folders — Vercel serves the
files flat and `cleanUrls` turns `teacher-waqas-khan.html` into
`/teacher-waqas-khan`.

### Pages

| File | What it is |
|---|---|
| `index.html` | The homepage. Hero, the four streams, the faculty roster, results, reviews, FAQ, campuses, admissions form. Carries its own CSS and JS inline. |
| `about.html` | The SWK Solutions story, the results record, the FAQ. |
| `faculty.html` | The full eighteen-teacher roster. |
| `teacher-<id>.html` | One profile per teacher. **Generated** — see §3. |
| `lecture-<id>.html` | One free lesson page per teacher. **Generated** — see §3. |
| `lecture.html` | The template those eighteen are built from. With no teacher baked in it renders the first starred teacher's lesson, so it carries `noindex` and is kept out of the sitemap. |
| `404.html` | Shown for any address that is not here. Vercel picks it up by name. |

### Shared files

| File | What it does |
|---|---|
| `config.js` | **The file that ties the site to its backend.** Supabase URL and publishable key, the cache, the shape the tables are translated into, the enquiry form's POST, and the WhatsApp / phone / promo ribbon that apply to every page. |
| `site.css` | The stylesheet the teacher pages load. `index`, `about` and `faculty` inline the same rules. |
| `lecture.css`, `lecture.js` | The lecture pages' stylesheet and script. |
| `vercel.json` | Clean URLs, cache headers, security headers. |
| `robots.txt`, `sitemap.xml` | `sitemap.xml` is **generated** — do not hand-edit it. |

### Images

| File | What it is |
|---|---|
| `<id>.webp` | Teacher portraits, 1000×625. One per teacher, named for their id. |
| `og-<id>.jpg` | Share cards, 1200×630. **Generated** — see §3. What WhatsApp and Facebook show when a teacher or lecture link is sent. |
| `og-card.png` | The site-wide share card, for the homepage and anything without its own. |
| `crest-*.webp`, `mark-128.webp`, `logo.png`, `swk.png` | The crest at several sizes, the favicon, the wordmark, the SWK badge. |
| `review-0N.mp4` / `review-0N.webp` | Student review clips and their first frames. The clips are only fetched when someone points at a card. |
| `founder.webp`, `founder-room.webp`, `hero-crowd.webp`, `_plinth.webp`, `brocade2-*.png` | Section art. |

---

## 2 · Changing the content

**Most content is not in these files.** The faculty, campuses, syllabus,
reviews, FAQ, ads, streams and promo ribbon all come from **Supabase**, and the
site redraws itself when they change — no deploy needed.

`config.js` §1 holds the project URL and the publishable key. The key is meant
to be public; row-level security is what protects the data. **Never put the
service_role key in this file.**

Each page also carries a *baked* copy of the data (`FACULTY_BAKED`,
`CAMPUSES_BAKED`, `FAQ_BAKED` …). That is what a first-ever visitor sees for
the moment before the live copy lands, what a crawler reads, and what shows if
the backend is unreachable. **If you add or rename a teacher, update
`FACULTY_BAKED` in `index.html` as well** — it is the single source of truth
all three builders read.

### Two contact numbers, on purpose

The site carries two admissions lines. The WhatsApp button opens a sheet with
both rather than picking one, and the footer lists both. `config.js` matches
and replaces each one separately — set `whatsapp` / `whatsapp_2` and `phone` /
`phone_2` in `settings.contact` to move either without flattening the pair.

---

## 3 · The three builders

Run them from the repo root, in this order, after changing `FACULTY_BAKED`,
a portrait, or the shared header/footer in `index.html`.

```bash
python3 build-og-cards.py        # og-<id>.jpg   — needs Pillow
python3 build-lecture-pages.py   # lecture-<id>.html
python3 build-faculty-pages.py   # teacher-<id>.html, sitemap.xml, robots.txt
```

| Script | Reads | Writes |
|---|---|---|
| `build-og-cards.py` | `FACULTY_BAKED`, the portraits | `og-<id>.jpg` ×18 |
| `build-lecture-pages.py` | `FACULTY_BAKED`, `_lecture.tpl` | `lecture-<id>.html` ×18 |
| `build-faculty-pages.py` | `FACULTY_BAKED`, the header/footer in `index.html` | `teacher-<id>.html` ×18, `sitemap.xml`, `robots.txt` |

`build-faculty-pages.py` runs last because it writes the sitemap and only picks
the lecture pages up once they are on disk.

`_lecture.tpl` is a copy of `lecture.html` without that file's `noindex`. If you
edit `lecture.html`, copy it over `_lecture.tpl` before rebuilding.

**A teacher with no portrait:** set `nophoto:true` on their record in
`FACULTY_BAKED`. The builders then draw the slot instead of reaching for a file
that is not there, and the share card falls back to the crest. Without it, they
will warn you that a portrait is missing.

---

## 4 · Putting it online

Vercel is connected to this repo — pushing to `main` deploys in about a minute.
Open the live link and hard-refresh (**Ctrl + Shift + R**).

To upload through GitHub instead: **Add file → Upload files**, drag the changed
files in, **Commit changes**.

New Vercel project: vercel.com → **Add New → Project** → import the repo →
framework preset **Other** → **Deploy**.

---

## 5 · Things worth knowing before you edit

- **`sitemap.xml` is generated.** Hand edits are overwritten on the next build.
- **Nothing is `Disallow`ed in `robots.txt`, deliberately.** A page blocked
  there can never be read, so a `noindex` tag on it would never be seen.
  `lecture.html` is kept out of the index by its meta tag, not by robots.
- **Share images must be JPEG or PNG, never WebP.** WhatsApp and Facebook are
  unreliable with WebP, and WhatsApp is the channel these links travel on.
- **The mobile menu** lives in `.mob`, is opened by `.burger`, and is driven by
  `body.nav-open` — the class the stylesheet actually defines.
- **The campus list is a dialog, not a section.** `#campuses` in a URL opens it
  on arrival; `/#campuses=Bahadurabad` opens it with that plate lit.
- **The Content-Security-Policy in `vercel.json` is report-only.** It breaks
  nothing as it stands. Watch the browser console for a while, then rename the
  header to `Content-Security-Policy` to enforce it.
- **The Instagram icon was removed** — it was `href="#"` with a `TODO` on every
  page. To put it back, add an `<a>` beside the Facebook one in the header,
  mobile menu and footer of `index.html`, then rebuild.

---

## 6 · Credits

Built by [Nexlyr](https://nexlyr.solutions/) for SWK Solutions.
