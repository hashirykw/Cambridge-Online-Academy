/* ══════════════════════════════════════════════════════════════════════════
   CAMBRIDGE ONLINE — config.js
   The one file that ties the website to its backend.

   Loaded in <head>, before the page's own script, so the data is already in
   place by the time the page builds itself.

   How it stays fast: the last known good copy is kept in localStorage and
   handed over synchronously, so the page never waits on the network to draw
   itself. The fresh copy is fetched in the background; if anything has
   changed since, the affected sections are redrawn in place. A first-ever
   visitor gets the values baked into index.html, then the live ones a moment
   later. Offline, the page still works.

   No build step, no SDK — plain fetch against Supabase's REST endpoint.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── 1 · YOUR KEYS ────────────────────────────────────────────────────────
     Supabase → Project Settings → API. The anon key is meant to be public:
     row-level security is what protects the data, not the secrecy of this
     string. Never put the service_role key here. */
  var CONFIG = {
    url:     "https://pjfrqsfegwyhbrdzxgdh.supabase.co",
    anonKey: "sb_publishable_fCZ7v0zDdkJo4KEZ0maNuw_MrKIkOuF",

    cacheMinutes: 10,      /* how long a cached copy is served before refetch */
    debug: false           /* true prints what was loaded, to the console */
  };

  window.CO_CONFIG = CONFIG;

  var REST = CONFIG.url.replace(/\/+$/, "") + "/rest/v1/";
  var HEAD = { apikey: CONFIG.anonKey, Authorization: "Bearer " + CONFIG.anonKey };
  var KEY  = "co-data-v1";

  function log() { if (CONFIG.debug) console.log.apply(console, ["[CO]"].concat([].slice.call(arguments))); }

  /* ── 2 · THE CACHE ─────────────────────────────────────────────────────── */
  function readCache() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var box = JSON.parse(raw);
      if (!box || !box.at || !box.data) return null;
      return box;
    } catch (e) { return null; }
  }
  function writeCache(data) {
    try { localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data: data })); }
    catch (e) { /* private mode, or full. Not worth failing over. */ }
  }

  var cached = readCache();
  if (cached) {
    window.CO_DATA = cached.data;
    log("served from cache,", Math.round((Date.now() - cached.at) / 1000) + "s old");
  }

  /* ── 3 · SHAPING WHAT COMES BACK ───────────────────────────────────────────
     The tables are normalised for the backend; the page wants the shapes it
     already had. Everything is translated here so index.html keeps reading
     the same properties it always did. */
  function shape(raw) {
    var out = {};

    out.SUBJECTS = {};
    (raw.subjects || []).forEach(function (s) {
      out.SUBJECTS[s.name] = { key: s.key, accent: s.accent };
    });

    out.GROUPS = (raw.groups || []).map(function (g) { return g.name; });

    out.FACULTY = (raw.faculty || []).map(function (t) {
      var f = {
        id: t.slug, name: t.name, subject: t.subject, group: t.group_name,
        levels: t.levels || [], star: !!t.star, tag: t.tag || "",
        bio: t.bio || "", distinctions: t.distinctions || [],
        /* How many distinctions this teacher has produced. The site was
           carrying this as a hand-written map in the page, which is why one
           teacher showed a number and seventeen showed a dash. Add a
           distinction_count column to the faculty table and each teacher
           carries their own. Left null where the column is empty, which still
           prints a dash — a dash for "not counted" is honest; a zero is not. */
        distCount: (t.distinction_count === 0 || t.distinction_count)
                     ? t.distinction_count : null,
        photo: t.photo_url || "", specs: t.specs || [],
        note: t.contact_note || "",
        /* Which batch they are taking right now, as opposed to `group`, which
           is the subject family they belong to and does not change. This is
           the line that dates fastest on the whole page, which is exactly why
           it has to come from the control room rather than from the markup.
           Empty is normal and prints nothing — better silence than a stale
           "O Level 2025, Morning" left up all year. */
        teachingNow: t.teaching_now || "",
        teachingNote: t.teaching_note || ""
      };
      /* A teacher not offering a lesson gets no demo at all, rather than an
         empty one — the card then stops advertising something that is not
         there instead of opening a blank player. */
      if (t.demo_enabled && t.demo_title) {
        f.demo = { title: t.demo_title, mins: t.demo_mins || 14,
                   code: t.demo_code || "", url: t.demo_url || "" };
      }
      return f;
    });

    out.CAMPUSES = (raw.campuses || []).map(function (c) {
      return {
        name: c.name, short: c.short || c.name, address: c.address,
        phone: c.phone, whatsapp: c.whatsapp || "", email: c.email || "",
        hours: c.hours, rating: c.rating, reviews: c.reviews,
        lat: c.lat, lng: c.lng, flagship: !!c.flagship
      };
    });

    out.SYLLABUS = {};
    (raw.syllabus || []).forEach(function (r) {
      /* [title, minutes, free, video]. A row is free only when the backend
         says so; the introduction chapter on the teacher's row is free
         already, so nothing here needs setting for the normal case. */
      (out.SYLLABUS[r.subject_key] = out.SYLLABUS[r.subject_key] || [])
        .push([r.title, r.mins, !!r.free, r.video_url || ""]);
    });

    /* A review may carry a clip. The shape kept only name, meta, stars and
       body, so any video column on the row was thrown away here before the
       page ever saw it — a review could never have had a video from the
       backend, however it was entered. Both naming conventions are accepted
       so the column can be called whichever of the two it ends up being. */
    out.REVIEWS = (raw.reviews || []).map(function (r) {
      var o = { name: r.name, meta: r.meta, stars: r.stars, text: r.body };
      var v = r.video_url || r.videoUrl || r.video || r.clip_url || "";
      var p = r.poster_url || r.posterUrl || r.poster || "";
      if (v) {
        /* A YouTube or Vimeo link is passed as an id; anything else is
           treated as a file the site hosts itself. */
        if (/youtu/.test(v))      o.youtube = v;
        else if (/vimeo/.test(v)) o.vimeo = v;
        else                      o.videoSrc = v;
      }
      if (p) o.poster = p;
      if (r.distinction || r.is_distinction) o.dist = true;
      return o;
    });

    out.FAQ = (raw.faqs || []).map(function (f) {
      return { c: f.category, q: f.question, a: f.answer };
    });

    out.STOCK = (raw.ads || []).map(function (a) {
      return { k: a.kicker, acc: a.accent, h: a.heading, p: a.body,
               cta: a.cta_label, href: a.href, ic: a.icon,
               ext: !!a.external, notice: !!a.notice };
    });

    out.STREAMS = (raw.streams || []).map(function (s) {
      return { title: s.title, code: s.code, blurb: s.blurb,
               subjects: s.subjects || [], chip: s.chip, icon: s.icon };
    });

    /* Eagle's Cast. The deck was built with its ten episodes written into the
       page, so the control room's Eagle's Cast screen had nothing to list.
       Reading them from here makes that screen the place an episode is added,
       removed or reordered.

       focus is where the speaker's face sits in the cover, as [x%, y%]. A card
       is portrait and a cover is wide, so without it the crop lands on
       whatever happens to be in the middle of the frame — usually the
       microphone. A missing title falls back to the episode number rather than
       to an invented one. */
    out.EPISODES = (raw.episodes || []).map(function (e, i) {
      var n = String(e.number || (i + 1));
      if (n.length < 2) n = "0" + n;
      var secs = e.seconds || 0;
      var rt = secs < 60
        ? secs + " sec"
        : (secs % 60 ? Math.floor(secs / 60) + " min " + (secs % 60) + " sec"
                     : Math.floor(secs / 60) + " min");
      return {
        t: e.title || ("Episode " + n),
        m: e.guests || rt,
        set: e.set_name || "SWK Chronicles",
        poster: e.poster_url || "",
        src: e.video_url || "",
        focus: [e.focal_x == null ? 50 : e.focal_x,
                e.focal_y == null ? 42 : e.focal_y]
      };
    }).filter(function (e) { return e.src; });

    /* Popups, keyed so the page can ask for one by name rather than hunting
       through a list. Every banner, ribbon and dialog used to be written into
       the page with its dates computed in JavaScript, so moving an entry
       deadline meant editing and redeploying a file.

       The window is applied here rather than in the page: a popup that has not
       started or has already ended simply is not handed over, so nothing on
       the page has to remember to check. `active` is the switch; starts_at and
       ends_at are the schedule; either can be left empty. */
    out.POPUPS = {};
    var nowMs = Date.now();
    (raw.popups || []).forEach(function (p) {
      /* Every row is handed over, switched off ones included, with `live`
         saying whether it should show right now.

         Filtering them out here looked tidier and was wrong: the page could
         then not tell "no row was ever created" from "the row is switched
         off", and it has to. A missing cookie row means nobody has configured
         one yet and the built-in bar should stand; a row switched off means
         the academy decided against it. Silently dropping a consent notice
         because a table is empty is not a default worth having. */
      out.POPUPS[p.key] = {
        key: p.key, kind: p.kind,
        title: p.title || "", body: p.body || "",
        cta: p.cta_label || "", href: p.cta_href || "",
        accent: p.accent || "", icon: p.icon || "",
        dismissible: p.dismissible !== false,
        repeatAfter: p.repeat_after == null ? null : +p.repeat_after,
        pages: p.pages || [],
        countdownTo: p.countdown_to || null,
        priority: p.priority || 0,
        live: !!p.active
                && !(p.starts_at && new Date(p.starts_at).getTime() > nowMs)
                && !(p.ends_at   && new Date(p.ends_at).getTime()   < nowMs)
      };
    });

    out.SETTINGS = {};
    (raw.settings || []).forEach(function (r) { out.SETTINGS[r.key] = r.value || {}; });

    /* Discounts. Previously this took the first row and handed it over as
       PROMO, which no page ever read — the whole screen wrote to a key nothing
       consumed. Each row carries its own `placement`, so the panel has always
       decided where an offer belongs; the page just never asked.

         ribbon  a bar across the top of the page
         notice  takes over the admissions modal
         ad      joins the corner card rotation
         hero    a line under the hero headline

       The window is applied here. A discount with no dates runs until it is
       switched off; one with dates runs between them and then stops on its
       own, which is the point of scheduling it rather than remembering to. */
    out.PROMOS = (raw.promos || []).filter(function (r) {
      if (!r.active) return false;
      if (r.starts_at && new Date(r.starts_at).getTime() > nowMs) return false;
      if (r.ends_at   && new Date(r.ends_at).getTime()   < nowMs) return false;
      return true;
    }).map(function (r) {
      return {
        id: r.id, kicker: r.kicker || "", headline: r.headline || "",
        body: r.body || "", code: r.code || "",
        percent: r.percent == null ? null : +r.percent,
        theme: r.theme || "gold",
        placement: r.placement || "ribbon",
        cta: r.cta_label || "", href: r.cta_href || "#contact",
        sort: r.sort || 0
      };
    }).sort(function (a, b) { return a.sort - b.sort; });

    /* One per placement: two ribbons at once is not a design, it is a bug. */
    out.PROMO_AT = {};
    out.PROMOS.forEach(function (r) {
      if (!out.PROMO_AT[r.placement]) out.PROMO_AT[r.placement] = r;
    });

    out.PROMO = out.PROMOS[0] || null;

    return out;
  }

  /* ── 4 · FETCHING ──────────────────────────────────────────────────────── */
  function get(path) {
    return fetch(REST + path, { headers: HEAD })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
  }

  function fetchAll() {
    return Promise.all([
      get("subjects?select=*&active=eq.true&order=sort"),
      get("groups?select=*&active=eq.true&order=sort"),
      get("faculty?select=*&active=eq.true&order=sort,name"),
      get("campuses?select=*&active=eq.true&order=sort"),
      get("syllabus?select=*&active=eq.true&order=subject_key,sort"),
      get("reviews?select=*&active=eq.true&order=sort"),
      get("faqs?select=*&active=eq.true&order=sort"),
      get("ads?select=*&active=eq.true&order=sort"),
      get("streams?select=*&active=eq.true&order=sort"),
      get("episodes?select=*&active=eq.true&order=sort,number"),
      get("popups?select=*&order=priority.desc"),
      get("settings?select=*"),
      /* Just the active ones, ordered. The date window used to be two `or=`
         parameters on this URL, which is a query with the same key twice —
         one of the two is dropped, and which one is not something to rely on.
         The window is applied in shape() instead, where it is one readable
         condition and where the row can still be handed over with a flag
         rather than silently vanishing. */
      get("promos?select=*&active=eq.true&order=sort")
    ]).then(function (r) {
      return shape({
        subjects: r[0], groups: r[1], faculty: r[2], campuses: r[3],
        syllabus: r[4], reviews: r[5], faqs: r[6], ads: r[7],
        streams: r[8], episodes: r[9], popups: r[10], settings: r[11], promos: r[12]
      });
    });
  }

  /* Only refetch when the cache has gone stale, so a visitor clicking through
     five pages does not pull the whole catalogue five times. */
  var fresh = cached && (Date.now() - cached.at) < CONFIG.cacheMinutes * 60000;

  window.CO_READY = (fresh ? Promise.resolve(cached.data) : fetchAll().then(function (data) {
    if (!data.FACULTY || !data.FACULTY.length) {
      log("nothing came back; keeping what the page already has");
      return window.CO_DATA || null;
    }
    var changed = JSON.stringify(data) !== JSON.stringify(window.CO_DATA || null);
    window.CO_DATA = data;
    writeCache(data);
    log("loaded", data.FACULTY.length, "teachers", changed ? "(changed)" : "(same)");
    if (changed && window.CO_REFRESH) {
      /* The page is already drawn by now, so hand it back to itself. */
      try { window.CO_REFRESH(data); } catch (e) { console.warn("[CO] refresh failed", e); }
    }
    return data;
  }));

  /* ── 5 · SENDING THE FORM ──────────────────────────────────────────────────
     Returns a promise that never rejects. A failed insert must not stop the
     visitor reaching WhatsApp — losing the row is recoverable, losing the
     enquiry is not. */
  window.CO_SUBMIT = function (payload) {
    var body = {
      kind:     payload.kind || "admission",
      name:     payload.name || "",
      phone:    payload.phone || "",
      email:    payload.email || "",
      level:    payload.level || "",
      mode:     payload.mode || "",
      campus:   payload.campus || "",
      subjects: payload.subjects || [],
      message:  payload.message || "",
      teacher:  payload.teacher || "",
      source:   "website",
      meta: {
        page: location.pathname,
        ref: document.referrer || "",
        ua: navigator.userAgent,
        at: new Date().toISOString()
      }
    };
    return fetch(REST + "submissions", {
      method: "POST",
      headers: Object.assign({ "Content-Type": "application/json", Prefer: "return=minimal" }, HEAD),
      body: JSON.stringify(body)
    }).then(function (r) {
      log("enquiry sent", r.status);
      return r.ok;
    }).catch(function (e) {
      console.warn("[CO] enquiry not recorded", e);
      return false;
    });
  };

  /* ── 6 · THINGS THAT APPLY TO THE WHOLE PAGE ──────────────────────────────
     Contact numbers and the discount ribbon are not owned by any one section,
     so they are painted here rather than threaded through the page's own
     render functions. */
  function applyGlobals() {
    var d = window.CO_DATA;
    if (!d) return;
    var contact = (d.SETTINGS && d.SETTINGS.contact) || {};

    /* The site carries two admissions lines on purpose: the WhatsApp button
       opens a sheet with both, and the footer lists both. Rewriting every
       wa.me and tel: href to one number turned that sheet into the same
       number twice. Each baked line is matched and replaced on its own, so
       the backend can move either without flattening the pair. Set
       whatsapp_2 / phone_2 in settings.contact to move the second one. */
    var BAKED_WA  = ["923463311647", "923360050557"],
        BAKED_TEL = ["+923463311647", "+923360050557"],
        AGENCY    = contact.agency_whatsapp || "923053687680";
    var digits = function (v) { return String(v || "").replace(/[^0-9]/g, ""); };

    var waTo = [digits(contact.whatsapp), digits(contact.whatsapp_2)];
    if (waTo[0] || waTo[1]) {
      [].forEach.call(document.querySelectorAll('a[href*="wa.me/"]'), function (a) {
        /* The agency's own credit link is somebody else's number. Leave it. */
        if (a.href.indexOf(AGENCY) !== -1) return;
        var m = /wa\.me\/(\d+)/.exec(a.href);
        if (!m) return;
        var k = BAKED_WA.indexOf(m[1]);
        /* A number the page did not bake in is left alone rather than
           guessed at. */
        if (k === -1 || !waTo[k]) return;
        a.href = a.href.replace(/wa\.me\/\d+/, "wa.me/" + waTo[k]);
      });
      window.CO_WA = waTo[0] || digits(BAKED_WA[0]);
    }

    var telTo = [digits(contact.phone), digits(contact.phone_2)];
    if (telTo[0] || telTo[1]) {
      [].forEach.call(document.querySelectorAll('a[href^="tel:"]'), function (a) {
        var cur = a.getAttribute("href").slice(4).replace(/\s+/g, "");
        var k = BAKED_TEL.indexOf(cur);
        if (k === -1 || !telTo[k]) return;
        a.href = "tel:+" + telTo[k];
        /* The visible number follows the href when the link is just the
           number written out, which is how the footer lists them. */
        if (/^[+\d\s]+$/.test(a.textContent)) a.textContent = "+" + telTo[k];
      });
    }

    var site = (d.SETTINGS && d.SETTINGS.site) || {};
    if (site.maintenance && site.maintenance_note) banner(site.maintenance_note, "#E06A6A");
    if (d.PROMO) ribbon(d.PROMO);
  }

  var THEME = { gold:"#C9982F", emerald:"#5FD1A3", ruby:"#E06A6A", ice:"#7FC4E8",
                violet:"#B79BF0", amber:"#F0B95F", mono:"#8E8E8E" };

  function ribbon(p) {
    if (p.placement && p.placement !== "ribbon") return;   /* other placements are the page's business */
    if (document.getElementById("coPromo")) return;
    try { if (sessionStorage.getItem("co-promo-" + p.id) === "shut") return; } catch (e) {}

    var acc = THEME[p.theme] || THEME.gold;
    var el = document.createElement("aside");
    el.id = "coPromo";
    el.setAttribute("role", "complementary");
    el.style.cssText =
      "position:fixed;left:0;right:0;bottom:0;z-index:70;display:flex;align-items:center;" +
      "gap:14px;padding:11px 16px;font-family:Outfit,system-ui,sans-serif;font-size:.88rem;" +
      "color:#F5EDE0;background:linear-gradient(100deg,#1A0708,#2A0608 60%);" +
      "border-top:1px solid " + acc + "55;box-shadow:0 -14px 40px -20px rgba(0,0,0,.9);" +
      "transform:translateY(110%);transition:transform .5s cubic-bezier(.16,1,.3,1)";
    el.innerHTML =
      '<span style="font-family:JetBrains Mono,monospace;font-size:.6rem;letter-spacing:.2em;' +
      'text-transform:uppercase;color:' + acc + ';flex:0 0 auto">' + txt(p.kicker || "Offer") + "</span>" +
      '<span style="flex:1;min-width:0"><b style="font-weight:600">' + txt(p.headline || "") + "</b>" +
      (p.body ? '<span style="opacity:.72"> — ' + txt(p.body) + "</span>" : "") + "</span>" +
      (p.code ? '<span style="flex:0 0 auto;padding:5px 11px;border:1px dashed ' + acc +
        ";color:" + acc + ";border-radius:8px;font-family:JetBrains Mono,monospace;font-size:.76rem;" +
        'letter-spacing:.12em;font-weight:600">' + txt(p.code) + "</span>" : "") +
      '<a href="' + txt(p.cta_href || "#contact") + '" style="flex:0 0 auto;padding:8px 15px;' +
      "border-radius:9px;background:" + acc + ';color:#2A0608;font-weight:600;text-decoration:none">' +
      txt(p.cta_label || "Find out more") + "</a>" +
      '<button type="button" aria-label="Dismiss this offer" style="flex:0 0 auto;width:28px;height:28px;' +
      "border:0;background:none;color:#F5EDE0;opacity:.55;cursor:pointer;font-size:1.1rem;" +
      'line-height:1">&times;</button>';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.style.transform = "translateY(0)"; });
    el.querySelector("button").onclick = function () {
      el.style.transform = "translateY(110%)";
      try { sessionStorage.setItem("co-promo-" + p.id, "shut"); } catch (e) {}
      setTimeout(function () { el.remove(); }, 520);
    };
  }

  function banner(text, colour) {
    /* applyGlobals runs twice — once off the cache, once off the fetch — so
       without this the notice was appended a second time under the first. */
    if (document.getElementById("coBanner")) return;
    var el = document.createElement("div");
    el.id = "coBanner";
    el.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:80;padding:9px 16px;" +
      "text-align:center;font-family:Outfit,sans-serif;font-size:.84rem;color:#0C0304;" +
      "background:" + colour;
    el.textContent = text;
    document.body.appendChild(el);
  }

  function txt(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyGlobals();
      window.CO_READY.then(applyGlobals);
    });
  } else {
    applyGlobals();
    window.CO_READY.then(applyGlobals);
  }
})();
