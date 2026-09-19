# Muhammad Hashir — Portfolio

A one-page portfolio built around a scroll-controlled sunset video, with a
pull-down "full portfolio" dashboard in a liquid glass style.

Live: https://hashir.nexlyr.solutions
Repo: https://github.com/hashirykw/HASHIR-PORTFOLIO

---

## 1. What is in the folder

Every file sits in the **main folder** of the repo. No sub-folders.

| File | What it does |
|---|---|
| `index.html` | The whole site: layout, styles and code |
| `web-development.html`, `graphic-design.html`, `video-editing.html`, `social-media-marketing.html`, `about.html` | Standalone pages, one per service plus a bio page. Each is self-contained and serves at a clean address like `/web-development` |
| `config.js` | **The only file you edit**: projects, experience, certificates, video settings, Supabase |
| `hero-hd.mp4` | Background video for laptops and desktops (1920×1080) |
| `hero-mobile.mp4` | Vertical background video for phones (720×1280) |
| `hero-poster.webp`, `hero-poster-mobile.webp` | First frame, shown instantly while the video loads |
| `sheet-bg.webp` | Blurred background of the pull-down portfolio |
| `hashir-cutout.webp` | Your photo with the background removed (sharpened) |
| `avatar.webp` | Square head crop used for the avatar in the portfolio header |
| `reel-1..4.mp4`, `reel-1..4.webp` | Your video edits and their first frames |
| `design-1..4.webp`, `design-1..4-t.webp` | Design work, full size and thumbnail |
| `nexlyr-mark.png` | Nexlyr bars logo (top-left and sidebar) |
| `nexlyr-wordmark.png` | "NEXLYR" wordmark used by the preloader |
| `favicon.ico`, `favicon.png` | Browser tab icons |
| `apple-touch-icon.png` | iPhone / iPad home-screen icon |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `site.webmanifest` | Android home-screen icons and app info |
| `lenis.min.js` | Smooth scrolling (Lenis, MIT licence), bundled so it always loads |
| `logo-*.webp`, `logo-infinimind.svg` | Project and company logos |
| `font-grotesk-*.woff2` | Display font (Space Grotesk) for headings and numbers |
| `font-*.woff2` | The rest of the fonts (Archivo, Poppins for body text), bundled so they always load |
| `vercel.json` | Caching rules for Vercel (optional but recommended) |
| `robots.txt`, `sitemap.xml` | Tell Google what to index |
| `README.md` | This file |

---

## 2. Put it online (first time)

1. Open **github.com/hashirykw/HASHIR-PORTFOLIO**.
2. Click **Add file → Upload files**.
3. Drag **all the files** from this folder into the page.
   GitHub's web uploader accepts files up to 25 MB, so the videos fit.
4. Click **Commit changes**.
5. Vercel is already connected to this repo, so the site updates by itself
   in about a minute. Open the live link and press **Ctrl + Shift + R**.

**New Vercel project instead?** vercel.com → **Add New → Project** →
import the repo → Framework preset **Other** → **Deploy**.

### Clean up old files

These belong to earlier versions and are no longer used. You can delete them
from the repo:

`drive-hd.mp4`, `drive-mobile.mp4`, `drive-poster.webp`, `drift-loop.mp4`,
`drift-poster.webp`, `portrait.webp`, `city_drive.py`,
`HASHIR @ NEXLYR SOLUTIONS.jpeg`, `HASHIR NEXLYR SOLUTIONS.jpeg`, `Logo.png`

---

## 3. Edit your content (`config.js`)

Open `config.js` on GitHub → pencil icon → edit → **Commit changes**.

### The Work tabs

`group` decides which tab a project appears in:

- `group:'live'` — Live sites
- `group:'software'` — Software (Apexify, Lotus Enterprise, AlphaEdge, YKW Calculator, Lotus User Guide)
- `group:'demo'` — Demos

### Add a video edit

Put the file next to the others and add it to `reels` in `config.js`:

```js
{ src:'reel-5.mp4', poster:'reel-5.webp', title:'What it is', client:'Client name',
  note:'One line about the edit.' },
```

Clips play silently on the page and with sound when tapped. Keep them
vertical, about 480×854, and under roughly 2 MB each. Send new ones over and
they can be compressed for you.

### Add a design

```js
{ src:'design-5.webp', thumb:'design-5-t.webp', title:'What it is', client:'Client name',
  note:'One line about it.' },
```

`thumb` is a small version for the grid; `src` opens full size.

### Add a project

Copy one block inside `projects: [ ... ]` and change it:

```js
{ group:'live', logo:'logo-myproject.webp', type:'Client site', name:'My Project',
  description:'One sentence about what it is.',
  url:'myproject.com', link:'https://myproject.com' },
```

- `group:'live'` shows it in the **Live** tab. `group:'demo'` puts it in **Demos**.
- `logo` is an image file you upload next to the others. Leave it out to use
  an icon instead: `icon:'code'` (also `pen`, `film`, `megaphone`, `users`,
  `chart`, `bag`, `book`, `paw`).
- `logoBg:'light'` puts a dark logo on a light tile so it stays visible.
- `logoBg:'dark'` puts a bright logo on a black tile (Apexify uses this).
- Leave out `link` and `url` if the project has no live site.

### Add a role

```js
{ role:'Head of Design', company:'Company name', is_current:false, icon:'pen',
  description:'What you did there.' },
```

`is_current:true` shows an orange **Now** badge. The first three roles also
appear on the glass panel over the video.

### Add certificates

The Certifications card stays hidden until this list has something in it:

```js
certificates: [
  { name:'Google UX Design', org:'Google / Coursera', year:'2025' },
  { name:'Meta Social Media Marketing', org:'Meta', year:'2024', done:false }
]
```

`done:false` shows "in progress".

### Things you normally leave alone

- `video.intro`: seconds of the climb that play by themselves (default 2).
- `video.idleRate`: speed while nobody scrolls (0.45 = a bit under half speed).
- `video.scrollRate`: top speed while scrolling.
- `video.loopFrom`: where the video restarts (0 = from the beginning).

---

## 4. Contact form (optional, needs Supabase)

Until Supabase is connected, the form tells visitors to use nexlyr.solutions.
To receive messages:

1. **supabase.com** → your project → **Project Settings → Data API** →
   copy the **Project URL**.
2. In `config.js`, replace `https://YOUR-PROJECT.supabase.co` with it.
   The key starting `sb_publishable_` is already filled in; only the Project URL is missing.
3. Supabase → **SQL Editor** → run `supabase-schema.sql` from the admin (backend) repo. It creates the `projects`, `experience`,
   `certificates` and `messages` tables with safe permissions.
4. Supabase → **Authentication → Sign In / Providers** → turn off
   **Allow new users to sign up**, then add yourself under **Users**.

Messages then appear in the admin panel's **Inbox** (`/admin`, if you
uploaded the admin folder).

**Note:** once Supabase has projects in it, the site shows those instead of
the list in `config.js`. Projects marked **featured** in the admin go in the
Live tab; the rest go in Demos. Admin projects show an icon instead of a logo.

---

## 5. How the site behaves

- **Preloader:** the five Nexlyr bars fill up while the video loads.
- **Video:** never stops on its own. The opening plays at normal speed, then the
  view drifts slowly (`idleRate`) and speeds up while someone scrolls
  (`scrollRate`). At the end it fades and loops.
- **Pause button** (bottom right): pauses the video and the auto glide.
  Tap again to continue. The video also pauses while the tab is hidden.
- **Auto view:** a second after the opening, the page glides through the
  panels on its own, without stopping. Any scroll, tap or key press hands
  control back; after 5 idle seconds it carries on.
- **Smooth scrolling:** wheel scrolling is eased by Lenis. Touch scrolling
  stays native on phones.
- **Contact:** the contact card and the dashboard header link to WhatsApp
  (opens a chat with a ready-made first message), Instagram, nexlyr.solutions
  and GitHub. All four are set in `config.js` under `contact`.
- **Getting to the media fast:** the four craft tiles over the video open the
  portfolio straight at the matching section (video editing → Video edits,
  design and social → Design, web development → Selected work). Inside the
  portfolio, the "What I work on" rows do the same, the hero card has a
  "Watch the reels" button, and the sidebar has film and pen icons.
  Video edits and Design sit above Selected work.
- **Pull-down portfolio:** drag the bar under the top dock, tap it, press
  Enter on it, or use the Portfolio button. Close it by pushing the bottom
  bar up, pressing **Esc**, or the arrow in the sidebar.
- **Phones:** vertical video, bottom dock, safe-area spacing for the notch,
  and a compact header in landscape. Can be added to the home screen.
- **Reduced motion:** visitors who turn off animations get a still video
  (with a play button), no auto view and no smooth-scroll easing.

## 6. Being found on Google (SEO)

The site is set up to rank for **Muhammad Hashir**, **M. Hashir**,
**hashirykw** and **Muhammad Hashir Waseem**. It has the page title,
description, Open Graph and Twitter cards, and a Person + WebSite
structured-data block naming you, Nexlyr, InfiniMind, Karachi, your skills
and your GitHub and Instagram links.

**What is in place:** page title and description, canonical, Open Graph and
Twitter cards, Person, WebSite, ProfessionalService (Nexlyr), VideoObject for
each reel and an ItemList of your work in structured data, `robots.txt`,
`sitemap.xml`, and a plain text version of the whole portfolio inside
`<noscript>` so crawlers and link previews read your content even without
JavaScript.

**The address appears in four files.** Everything currently points at
`https://hashir.nexlyr.solutions`. When your real domain is live
(for example `https://hashir.nexlyr.solutions`), replace that address in:

1. `index.html`: the `canonical` link, the `og:` and `twitter:` image and url
   tags, and the structured-data block near the top.
2. `robots.txt`: the Sitemap line.
3. `sitemap.xml`: the `<loc>` and image `<loc>`.
4. The second structured-data block (ProfessionalService and the videos) uses
   the address too. Search for the old address in `index.html` and
   replace every hit.

Check your work afterwards at **search.google.com/test/rich-results**: paste
the address and it should list Person, ProfessionalService and VideoObject.

**Then do this once, or Google may take months to find you:**

1. Go to **search.google.com/search-console** and add your address as a
   property (choose **URL prefix**).
2. Verify it with the **HTML tag** method: Google gives you a
   `<meta name="google-site-verification" ...>` line. Paste it into
   `index.html` just under the `<title>` line and upload.
3. In Search Console, open **Sitemaps** and submit `sitemap.xml`.
4. Open **URL Inspection**, paste your address and click
   **Request indexing**.
5. Link to the site from places Google already crawls: your Instagram bio,
   your GitHub profile README, and nexlyr.solutions. Those links matter more
   than anything on the page itself.

Searches for your name usually start showing the site within one to three
weeks. Instagram and LinkedIn profiles often outrank a new site at first;
that evens out as the site gains links and visits.

## 7. Replacing the video later

Send the new clip (ideally the original file through Google Drive, not
WhatsApp, which lowers the quality) and it will be prepared the same way:
AI-upscaled, encoded for smooth scrubbing, and cut into a desktop and a
vertical phone version. Then upload the new `hero-hd.mp4` and
`hero-mobile.mp4` and update `video.length` in `config.js`.

Scrubbing only stays smooth if the video has a keyframe every few frames.
For reference, the current files were encoded with:

```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -tune film -crf 23 \
  -g 5 -keyint_min 5 -sc_threshold 0 -bf 0 -pix_fmt yuv420p \
  -movflags +faststart -an hero-hd.mp4
```

---

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| Old version still showing | Press **Ctrl + Shift + R**, or wait a minute for Vercel |
| Video does not move when scrolling | Check `hero-hd.mp4` and `hero-mobile.mp4` are in the main folder with exactly those names |
| A logo is missing | The file name in `config.js` must match the uploaded file exactly, including `logo-` |
| Browser tab shows the old icon | Close the tab and open the site again; browsers cache icons |
| Form says "not connected yet" | Supabase URL in `config.js` is still the placeholder (section 4) |
| Opening `index.html` from your computer | Works, but the video loads best from the live site |


---

## Update — September 2026

**The background video.** Both hero clips were re-encoded from 25 to 50 frames
per second with motion interpolation and a light sharpen pass, so the slow
drift no longer judders. The playback speed is now written to the video in
0.1 steps instead of every frame — each write costs the decoder a resync, and
that was most of the stutter. Speeds live in `config.js` under `video`:
`idleRate` (0.62) is the speed when nobody scrolls, `scrollRate` (1.85) is the
top speed while scrolling. The glass panels sitting over the video also blur
less than before, which is what the browser spends most of its time on.

**Chess.** The pieces are drawn as cut glass with a cyan rim and a reflection
on the floor, matching the Nexlyr posts. There are six of them
(`#c-pawn`, `#c-king`, `#c-queen`, `#c-knight`, `#c-rook`, `#c-bishop`) and
they are placed with the `.piece` rules in the stylesheet. To move one, change
its block there; to use a different piece, change the `href` in the matching
`<span class="piece">`.

**Search (SEO).** Paste your Search Console code into this line in
`index.html`, near the top:

```html
<meta name="google-site-verification" content="PASTE-YOUR-SEARCH-CONSOLE-CODE-HERE">
```

Then add the site in Google Search Console and submit
`https://hashir.nexlyr.solutions/sitemap.xml`. The page now carries
Person, WebSite, ProfilePage, Service and FAQ structured data, keyword-rich
titles and descriptions for both name searches and service searches, image and
video entries in the sitemap, and a crawlable text version of the whole
portfolio inside `<noscript>`. If you move the site to your own domain, do a
find-and-replace of `hashir.nexlyr.solutions` across `index.html`,
`sitemap.xml` and `robots.txt`.

### Second update — same day

- **Locked bars.** The Portfolio header and the left sidebar are `position:sticky`
  and stay on screen while the portfolio scrolls. (A later rule had been
  resetting them to `relative`, which is why they scrolled away before.) Section
  jumps now leave room for them — see `stickyGap()` in the script.
- **Chess stands on the floor.** Every piece is sized from one `--h` variable and
  offset so its base line lands on the surface it sits on, with a pool of light
  under it and its reflection below. Nothing hovers in mid-air.
- **More of it.** The full six-piece set closes the portfolio as a lit board
  (`.chess-strip`), and there is a pawn on the InfiniMind card.
- **Phone layout.** The panels over the video are no longer shrunken desktop
  panels: they are shorter, capped at 48% of the screen, and the four crafts
  read as a tap list instead of a 2×2 grid. Pieces that had no room on a phone
  are hidden there.

### Third update — borders and the airborne chess

- **The misaligned card edge.** Two rules were writing to the same `::before`
  element on the panels over the video: the glass edge (`.lg::before`) and the
  panel number (`.panel[data-no]::before`). The number's offset moved the whole
  border with it, which is why the edge sat 14px inside the card and the number
  never appeared. The number is now its own `<span class="pno">`, and the edge
  lines up with the card. The same collision was leaving a stray corner bracket
  on every tile instead of a border — those ticks are gone and the tiles have
  real edges.
- **Tiles line up.** A `<button>` centres its content by default, so a tile with
  a two-line label pushed its icon down relative to its neighbour. Tiles are now
  flex columns starting at the top, so icons align across a row.
- **No chess in mid-air.** The pieces that stood beside the panels over the
  skyline had nothing to stand on, so they are gone. Chess now only appears where
  there is a real surface: inside the portfolio cards and on the lit board that
  closes the page.

### SEO pass two

- **The content is real HTML now.** The projects, experience, video edits and
  designs used to be built by JavaScript from `config.js`, so a crawler had to
  render the page to see any of it. That same markup is now written into
  `index.html` up front, and the script still replaces it on load (identically,
  or with your Supabase data when that is connected). If you change `config.js`,
  the page still updates — the pre-rendered copy is only what search engines and
  the first paint see. To refresh it after big content changes, ask for a
  re-render.
- **An About section** with plain-language copy: who you are, what you build, the
  two ventures, and the numbers. This is the text Google quotes.
- **A proper share card.** `og-card.jpg` (1200×630) is what now appears when the
  link is posted anywhere, instead of a video still.
- **Deep links.** `…/#about`, `#work`, `#reels`, `#design`, `#route`, `#contact`
  and `#services` open the portfolio on that section, and the address bar keeps
  up, so any section can be shared or ranked on its own.
- **More structured data**: occupation, offers, and a site-navigation list, on top
  of the Person, Service, FAQ and video entries already there.
- **Identity links.** The Instagram, GitHub and nexlyr.solutions links carry
  `rel="me"`, which is how search engines tie the profiles to one person.

### Domain move → hashir.nexlyr.solutions

Every address in `index.html`, `sitemap.xml` and `robots.txt` now points at
**https://hashir.nexlyr.solutions**. Alongside it:

- **`vercel.json` redirects the old Vercel address** to the new domain with a
  permanent (301) redirect, so the two addresses don't compete in search and any
  ranking the old one has passes over. Point the subdomain at this Vercel project
  in **Project → Settings → Domains**, and add `hashir` as a CNAME to
  `cname.vercel-dns.com` wherever nexlyr.solutions' DNS lives.
- **Verify the new address in Search Console** (it counts as a separate property)
  and submit `https://hashir.nexlyr.solutions/sitemap.xml`.
- `vercel.json` also sets sensible caching — a year for fonts and scripts, a week
  for media, no cache for the page itself so edits appear immediately — and the
  usual security headers.

### While the domain was moving

- **The video is held back only when it should be.** If the visitor has Data
  Saver switched on, is on a 2G connection, or has reduced motion enabled, the
  page starts on the poster frame instead of pulling 13 MB down. It is held back,
  not disabled: the play button is always there and loads the video on demand.
  Everyone else gets it playing automatically as before. (A first version of this
  also counted "3G" and hid the button — on a laptop with Windows animation
  effects turned off that meant no video and no way to start it. Fixed.)
- **Only the poster that will actually be used is preloaded.** Phones were
  downloading the desktop poster as well as their own; now each preload carries a
  `media` condition.
- **`site.webmanifest`** carries the real name, description and the site's dark
  theme colour instead of the old palette.

### Clean links and the service pages

**No file names in the address.** `vercel.json` sets `cleanUrls`, so
`web-development.html` is served at **`/web-development`** and the `.html`
version redirects to it. Nothing on the site links to a `.html` file.

**Section paths.** `/services`, `/reels`, `/design`, `/work`, `/experience` and
`/contact` are rewritten to `index.html`, and the script reads the path and opens
the portfolio on that section. Opening a section from inside the site updates the
address to match, and closing the portfolio puts it back to `/`. Old `#hash`
links still work, so nothing you have shared before breaks.

**Five real pages.** `/web-development`, `/graphic-design`, `/video-editing`,
`/social-media-marketing` and `/about` are genuine pages with their own title,
description, canonical, H1, copy, FAQ and structured data — that is what lets
Google rank you for a service rather than only for your name. They link into the
portfolio, the portfolio links back out to them from the About card, and all five
are in `sitemap.xml`.

To edit one, open its `.html` file — each is self-contained, like `index.html`.
If you add another service page, copy an existing one and add it to
`sitemap.xml` and to the links in the About card.

---


---

## The backend

The database and the admin panel live in a separate repository. The site works
on its own: everything it shows comes from `config.js` until Supabase is
connected, and the key in `config.js` is the publishable one, meant to be public.
