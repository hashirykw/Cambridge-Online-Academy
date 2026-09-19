
/* ==========================================================================
   CAMBRIDGE ONLINE — data
   Faculty roster as supplied. Campus details from Google Places.
   ========================================================================== */

/* Subject identity: accent colour + the motif drawn on demo thumbnails.
   Each motif is real subject notation, not decoration. */
const SUBJECTS_BAKED = {
  "Mathematics":        { key:"math",  accent:"#E3B55D" },
  "Physics":            { key:"phys",  accent:"#7FC4E8" },
  "Chemistry":          { key:"chem",  accent:"#5FD1A3" },
  "Biology":            { key:"bio",   accent:"#9BD35F" },
  "Computer Science":   { key:"cs",    accent:"#B79BF0" },
  "Accounts":           { key:"acct",  accent:"#F0B95F" },
  "Accounts & Business":{ key:"acct",  accent:"#F0B95F" },
  "Business":           { key:"biz",   accent:"#E89B6C" },
  "Business Studies":   { key:"biz",   accent:"#E89B6C" },
  "Economics":          { key:"econ",  accent:"#6FC7C0" },
  "Sociology & Psychology":{ key:"soc", accent:"#E58FB0" },
  "English Language":   { key:"eng",   accent:"#D9C48F" },
  "Pakistan Studies":   { key:"pst",   accent:"#6FCF97" },
  "Urdu":               { key:"urdu",  accent:"#E3B55D" },
  "Islamiyat":          { key:"isl",   accent:"#8FD8C4" }
};
/* Backend first; the list above is the fallback the page ships with. */
var SUBJECTS = (window.CO_DATA && window.CO_DATA.SUBJECTS && (window.CO_DATA.SUBJECTS.length || Object.keys(window.CO_DATA.SUBJECTS).length))
  ? window.CO_DATA.SUBJECTS : SUBJECTS_BAKED;

const FACULTY_BAKED = [
  /* ---------- Maths & Sciences ---------- */
  { id:"waqas-khan", name:"Sir Waqas Khan", subject:"Mathematics", group:"Maths & Sciences",
    levels:["O Level / IGCSE","A Level / Edexcel"], star:true,
    tag:"Five consecutive distinction batches",
    bio:"Founder of SWK Solutions and the teacher the academy is named for. Builds every topic from zero, so a student who has never met a concept and a student retaking both start in the same place. Known across Karachi for a distinction record in Mathematics and Additional Mathematics that has held for five consecutive sessions.",
    distinctions:["5 consecutive distinction batches","Mathematics & Additional Mathematics","Teaching since 2006"],
    demo:{ title:"Introduction to Mathematics", mins:14, code:"0580 / 4024" } },

  { id:"mehboob-khan", name:"Sir Mehboob Khan", subject:"Physics", group:"Maths & Sciences",
    levels:["O Level & IGCSE","A Level"], star:true,
    tag:"Every past paper since 2002",
    bio:"Cambridge Physics for 5054, 0625 and 9702. Recorded lectures, written notes and a past-paper archive going back to 2002 — every question, every mark scheme, indexed by topic rather than by year.",
    distinctions:["Teaching since 2007","Past-paper archive from 2002","5054 · 0625 · 9702"],
    demo:{ title:"Introduction to Physics", mins:17, code:"5054 / 9702" } },

  { id:"usman-khan", name:"Sir Usman Khan", subject:"Chemistry", group:"Maths & Sciences",
    levels:["O Level & IGCSE"],
    tag:"Mechanism-first Chemistry",
    bio:"Teaches O Level and IGCSE Chemistry by mechanism rather than memorisation — why a reaction goes the way it does, so the answer holds even when the paper rephrases the question.",
    distinctions:["O Level & IGCSE specialist","Mechanism-led approach"],
    demo:{ title:"Introduction to Chemistry", mins:13, code:"5070 / 0620" } },

  { id:"sohail-aziz", name:"Sir Sohail Aziz", subject:"Chemistry", group:"Maths & Sciences",
    levels:["A Level"],
    tag:"A Level organic and physical",
    bio:"A Level Chemistry with a focus on organic pathways and physical calculations — the two areas where most A2 marks are won and lost.",
    distinctions:["A Level specialist","Organic & physical focus"],
    demo:{ title:"Introduction to Chemistry", mins:16, code:"9701" } },

  { id:"farhan-khan", name:"Sir Farhan Khan", subject:"Chemistry", group:"Maths & Sciences",
    levels:["O / A Levels"],
    tag:"O through A Level continuity",
    bio:"Carries students from O Level into A Level Chemistry without the usual break in method, so the step up in year one is a continuation rather than a restart.",
    distinctions:["O and A Level continuity","Full Chemistry pathway"],
    demo:{ title:"Introduction to Chemistry", mins:15, code:"5070 / 9701" } },

  { id:"umar-soni", name:"Sir Umar Soni", subject:"Biology", group:"Maths & Sciences",
    levels:["O Level & IGCSE"],
    tag:"Diagram-led Biology",
    bio:"O Level and IGCSE Biology taught through labelled diagrams and process flow, which is how the paper actually asks for it.",
    distinctions:["O Level & IGCSE specialist","Diagram and process method"],
    demo:{ title:"Introduction to Biology", mins:12, code:"5090 / 0610" } },

  { id:"javed-khan-afridi", name:"Sir Javed Khan Afridi", subject:"Biology", group:"Maths & Sciences",
    levels:["A Level"],
    tag:"A Level and pre-medical",
    bio:"A Level Biology with a pre-medical emphasis — the depth expected by 9700 alongside the groundwork students need for medical entry testing.",
    distinctions:["A Level specialist","Pre-medical preparation"],
    demo:{ title:"Introduction to Biology", mins:18, code:"9700" } },


  /* ---------- Computing ---------- */
  { id:"afham-saya", name:"Sir Afham Saya", subject:"Computer Science", group:"Computing",
    levels:["O Level & IGCSE","A Level"],
    tag:"Theory and paper 2 practical",
    bio:"Computer Science across both levels — architecture and theory on paper 1, algorithm design and pseudocode on paper 2, taught as one subject rather than two.",
    distinctions:["O, IGCSE and A Level","Theory and practical papers"],
    demo:{ title:"Introduction to Computer Science", mins:16, code:"2210 / 9618" } },

  { id:"minhas-rupsi", name:"Sir Minhas Rupsi", subject:"Computer Science", group:"Computing",
    levels:["O Level & IGCSE","A Level"],
    tag:"Systems and data representation",
    bio:"Computer Science with a systems emphasis — data representation, logic and networks explained from the hardware up.",
    distinctions:["O, IGCSE and A Level","Systems and networks focus"],
    demo:{ title:"Introduction to Computer Science", mins:13, code:"2210 / 9618" } },

  /* ---------- Commerce ---------- */
  { id:"rohail-ahmed", name:"Sir Rohail Ahmed", subject:"Accounts", group:"Commerce",
    levels:["O / A Levels"],
    tag:"Accounts and Business together",
    bio:"Teaches Accounting and Business across both levels, which lets the ratio analysis in one subject do double duty in the other.",
    distinctions:["Accounts specialist","O and A Level"],
    demo:{ title:"Introduction to Accounts", mins:19, code:"7707 / 9706" } },

  { id:"ammar-samana", name:"Sir Ammar Samana", subject:"Accounts", group:"Commerce",
    levels:["A Level"],
    tag:"A Level financial and cost",
    bio:"A Level Accounting covering financial reporting and cost and management accounting, with an emphasis on presentation marks in the structured papers.",
    distinctions:["A Level specialist","Financial and cost accounting"],
    demo:{ title:"Introduction to Accounts", mins:17, code:"9706" } },

  { id:"sohail-ahmed", name:"Sir Sohail Ahmed", subject:"Business", group:"Commerce",
    levels:["O / A Levels"],
    tag:"Case-study method",
    bio:"Business Studies taught through case material, because the Cambridge papers reward application to the given business far more than recalled definitions.",
    distinctions:["O and A Level","Case-study application method"],
    demo:{ title:"Introduction to Business", mins:14, code:"7115 / 9609" } },


  { id:"murtaza-zai", name:"Sir Murtaza Zai", subject:"Economics", group:"Commerce",
    levels:["O / A Levels"],
    tag:"Diagram discipline",
    bio:"Economics taught diagram-first — every answer anchored to a correctly labelled diagram, which is where the analysis marks live.",
    distinctions:["O and A Level","Diagram-led analysis"],
    demo:{ title:"Introduction to Economics", mins:13, code:"2281 / 9708" } },


  { id:"azeem-iqbal", name:"Sir Azeem Iqbal", subject:"Sociology & Psychology", group:"Commerce",
    levels:["O / A Levels"],
    tag:"Two subjects, one method",
    bio:"Sociology and Psychology across both levels, taught with a shared research-methods spine since both papers test the same evaluation skill.",
    distinctions:["Dual subject: Sociology & Psychology","O and A Level"],
    demo:{ title:"Introduction to Sociology & Psychology", mins:15, code:"2251 / 9990" } },

  /* ---------- Languages & Humanities ---------- */
  { id:"anna-malik", name:"Miss Anna Malik", subject:"English Language", group:"Languages & Humanities",
    levels:["O / A Levels","GCE · IGCSE"],
    tag:"Directed writing and comprehension",
    bio:"English Language across GCE and IGCSE routes, with directed writing and comprehension technique taught as a repeatable structure rather than a matter of talent.",
    distinctions:["GCE and IGCSE routes","Directed writing specialist"],
    demo:{ title:"Introduction to English Language", mins:14, code:"1123 / 0500" } },

  { id:"junaid-akhtar", name:"Sir Junaid Akhtar", subject:"Pakistan Studies", group:"Languages & Humanities",
    levels:["O Level & IGCSE"], star:true,
    tag:"Source-based history technique",
    bio:"Pakistan Studies History and Geography, taught with a source-handling method that turns the seven and fourteen mark questions into a predictable structure.",
    distinctions:["Consistent distinction record","History and Geography papers"],
    demo:{ title:"Introduction to Pakistan Studies", mins:16, code:"2059" } },

  { id:"jameel-ansari", name:"Sir Jameel Ansari", subject:"Urdu", group:"Languages & Humanities",
    levels:["O Level & IGCSE","A Level"],
    tag:"Urdu across both levels",
    bio:"Urdu language and literature from O Level through A Level, covering composition, translation and the set texts.",
    distinctions:["O, IGCSE and A Level","Language and literature"],
    demo:{ title:"Introduction to Urdu", mins:13, code:"3248 / 9676" } },

  { id:"umar-sheikh", name:"Sir Umar Sheikh", subject:"Islamiyat", group:"Languages & Humanities",
    levels:["O Level & IGCSE"],
    tag:"Reference-backed answers",
    bio:"Islamiyat for O Level and IGCSE, with answers built on accurate reference and the part (b) evaluation technique the paper asks for.",
    distinctions:["O Level & IGCSE specialist","Reference and evaluation method"],
    demo:{ title:"Introduction to Islamiyat", mins:14, code:"2058 / 0493" } }
];
/* Backend first; the list above is the fallback the page ships with. */
var FACULTY = (window.CO_DATA && window.CO_DATA.FACULTY && (window.CO_DATA.FACULTY.length || Object.keys(window.CO_DATA.FACULTY).length))
  ? window.CO_DATA.FACULTY : FACULTY_BAKED;
/* Not on the Session 2026 faculty poster. */
var RETIRED = ["shoaib-munaf", "osama-mosani", "daniyal-aslam"];
FACULTY = FACULTY.filter(function (t) { return RETIRED.indexOf(t.id) === -1; })
  .map(function (t) { return t.id === "rohail-ahmed" && t.subject === "Accounts & Business"
                             ? Object.assign({}, t, { subject: "Accounts" }) : t; });

/* Campus data from Google Places, August 2026. */
const CAMPUSES_BAKED = [
  { name:"Gulshan-e-Iqbal Campus", short:"Gulshan",
    address:"A-574, Block 5, Gulshan-e-Iqbal, Karachi",
    phone:"+92 334 2222792", hours:"Every day · 9:00 AM – 11:15 PM",
    rating:4.6, reviews:109, lat:24.9205984, lng:67.0870305, flagship:true },
  { name:"Gulistan-e-Johar Campus", short:"Johar",
    address:"A-533, near Darul Sehat, Block 15, Gulistan-e-Johar, Karachi",
    phone:"+92 334 2222791", hours:"Every day · 11:00 AM – 11:00 PM",
    rating:4.8, reviews:29, lat:24.9149529, lng:67.127035 },
  { name:"North Nazimabad Campus", short:"North Nazimabad",
    address:"B-152, Block H, North Nazimabad, Karachi",
    phone:"+92 334 2222793", hours:"Every day · 4:00 PM – 10:00 PM",
    rating:4.5, reviews:55, lat:24.9410097, lng:67.0490533 },
  { name:"Bahadurabad Campus", short:"Bahadurabad",
    address:"Bahadurabad, Karachi",
    phone:"+92 331 2799345", hours:"Call for current timings",
    rating:null, reviews:null, lat:24.8783, lng:67.0663 },
  { name:"Lahore Campus", short:"Lahore",
    address:"Lahore, Punjab",
    phone:"+92 334 2222791", hours:"Call for current timings",
    rating:null, reviews:null, lat:31.5204, lng:74.3587 }
];
/* Backend first; the list above is the fallback the page ships with. */
var CAMPUSES = (window.CO_DATA && window.CO_DATA.CAMPUSES && (window.CO_DATA.CAMPUSES.length || Object.keys(window.CO_DATA.CAMPUSES).length))
  ? window.CO_DATA.CAMPUSES : CAMPUSES_BAKED;

var GROUPS_BAKED = ["Maths & Sciences","Computing","Commerce","Languages & Humanities"];
var GROUPS = (window.CO_DATA && window.CO_DATA.GROUPS && window.CO_DATA.GROUPS.length)
  ? window.CO_DATA.GROUPS : GROUPS_BAKED;

/* Level labels are written for humans ("O / A Levels"), so route membership
   is resolved here rather than by pattern-matching the display string at
   each call site. A combined label counts for both routes. */
function routesOf(t){
  var s = t.levels.join(" · ");
  var both = /O\s*[\/&]\s*A/i.test(s);
  return {
    o: both || /O Level|IGCSE|GCE/i.test(s),
    a: both || /A Level|Edexcel/i.test(s)
  };
}

/* ══════════════════════════════════ THE COURSE ════════════════════════════
   One lecture per teacher is free. That lecture is the `demo` on the roster
   above — a complete lesson, not a trailer, opened from any faculty card with
   no form and no deposit. Everything after it is part of the paid course and
   is arranged through admissions, which is what LOCKED below means: a locked
   row does not try to sell anything or take a card number, it opens WhatsApp
   with the teacher and the topic already written into the message so whoever
   picks it up knows what the enquiry is about before they reply.

   The titles are per SUBJECT rather than per teacher: two teachers taking the
   same Cambridge syllabus teach the same topics, and inventing twenty-one
   separate curricula would be inventing differences that do not exist. What
   differs between two teachers on the same subject is the free lesson, which
   is theirs, and the order they reach the rest in.

   Each entry is [title, minutes]. Minutes are indicative, and they are what
   the course length on the faculty popup is summed from. */
const SYLLABUS_BAKED = {
  math: [
    ["Simultaneous equations, linear and quadratic", 22],
    ["Functions, inverses and composite functions", 24],
    ["Differentiation from first principles", 26],
    ["Integration and the area under a curve", 25],
    ["Trigonometric identities and equations", 23],
    ["Vectors in two and three dimensions", 21],
    ["Probability, permutations and combinations", 24],
    ["Past-paper clinic: the six-mark structures", 28],
    ["Sequences, series and the binomial expansion", 23],
    ["Coordinate geometry: lines, circles and loci", 22]
  ],
  phys: [
    ["Kinematics and the equations of motion", 22],
    ["Newton's laws applied to connected bodies", 24],
    ["Work, energy and the conservation principle", 21],
    ["Waves, superposition and standing waves", 25],
    ["Electric circuits and the potential divider", 23],
    ["Fields: gravitational, electric, magnetic", 26],
    ["Nuclear physics and radioactive decay", 22],
    ["Practical paper: uncertainty and error", 27],
    ["Thermal physics and the kinetic model", 21],
    ["Momentum, impulse and collisions", 23]
  ],
  chem: [
    ["Atomic structure and electron configuration", 21],
    ["Bonding, shapes and intermolecular forces", 24],
    ["Stoichiometry and titration calculations", 26],
    ["Energetics and Hess's law cycles", 23],
    ["Equilibria and Le Chatelier in practice", 22],
    ["Organic mechanisms, group by group", 28],
    ["Qualitative analysis and the ion tests", 20],
    ["Practical paper: planning and evaluation", 25],
    ["Redox, oxidation number and electrolysis", 24],
    ["Rates of reaction and the collision model", 22]
  ],
  bio: [
    ["Cell structure and the fluid mosaic model", 21],
    ["Enzymes, kinetics and inhibition", 23],
    ["Transport in plants and in animals", 24],
    ["Gas exchange and the respiratory surface", 20],
    ["DNA, replication and protein synthesis", 26],
    ["Inheritance, genetic diagrams and ratios", 24],
    ["Homeostasis and the control of blood glucose", 22],
    ["Data-response and the long-answer structure", 25],
    ["Immunity and the response to infection", 23],
    ["Ecology, energy transfer and the carbon cycle", 22]
  ],
  cs: [
    ["Data representation: binary, hex, and text", 22],
    ["Boolean logic and logic gate circuits", 21],
    ["Computer architecture and the fetch cycle", 24],
    ["Networks, protocols and the OSI stack", 23],
    ["Databases, normalisation and SQL", 26],
    ["Algorithms: searching, sorting and Big O", 27],
    ["Programming paradigms and the OOP model", 25],
    ["Paper 2: the pre-release, worked through", 30],
    ["System software, interrupts and the OS", 22],
    ["Security, encryption and error checking", 21]
  ],
  acct: [
    ["Double entry and the accounting equation", 22],
    ["Adjustments: accruals, prepayments, depreciation", 26],
    ["Control accounts and bank reconciliation", 24],
    ["Partnership accounts and appropriation", 25],
    ["Limited company accounts and IAS format", 27],
    ["Manufacturing accounts and cost statements", 23],
    ["Ratio analysis and what each one is telling you", 24],
    ["Incomplete records, reconstructed", 26],
    ["Non-profit and club accounts", 21],
    ["Budgeting, variance and standard costing", 25]
  ],
  biz: [
    ["Business objectives and stakeholder conflict", 21],
    ["Marketing mix and the product life cycle", 23],
    ["Operations, capacity and quality management", 22],
    ["Human resources and organisational structure", 24],
    ["Finance: sources, cash flow and break-even", 26],
    ["Investment appraisal and the decision", 24],
    ["Strategy: SWOT, Ansoff and Porter", 25],
    ["Case study technique for the application marks", 28],
    ["Growth, integration and economies of scale", 23],
    ["External environment: PESTLE in an answer", 22]
  ],
  econ: [
    ["Demand, supply and the price mechanism", 22],
    ["Elasticity and its revenue consequences", 23],
    ["Market failure and government intervention", 24],
    ["Costs, revenue and the theory of the firm", 26],
    ["Market structures from perfect to monopoly", 25],
    ["Macroeconomic objectives and the trade-offs", 24],
    ["Fiscal, monetary and supply-side policy", 26],
    ["Evaluation: the paragraph that earns the marks", 22],
    ["Labour markets and wage determination", 23],
    ["Trade, exchange rates and the balance of payments", 25]
  ],
  soc: [
    ["Research methods: validity and reliability", 23],
    ["Sampling, ethics and the practical constraints", 21],
    ["Family, household and the functionalist view", 24],
    ["Education, achievement and social class", 25],
    ["Crime, deviance and the labelling perspective", 24],
    ["Approaches in psychology, compared", 26],
    ["Studies in detail: aim, method, findings", 27],
    ["Essay technique for the extended questions", 24],
    ["Stratification, mobility and inequality", 24],
    ["Media, socialisation and identity", 22]
  ],
  eng: [
    ["Directed writing: audience, form and register", 22],
    ["Summary writing and the content points", 21],
    ["Comprehension and the inference questions", 23],
    ["Descriptive writing and controlled imagery", 24],
    ["Narrative writing: structure over incident", 25],
    ["Language analysis: how to quote and comment", 26],
    ["Argumentative writing and counter-argument", 24],
    ["Timed paper, marked live against the criteria", 28],
    ["Register and tone: writing for a named reader", 22],
    ["Editing under timing: what to cut first", 21]
  ],
  pst: [
    ["The Pakistan Movement, 1857 to 1947", 26],
    ["Partition and the early problems of 1947", 24],
    ["Governments and constitutions since 1947", 27],
    ["Foreign policy and the regional relationships", 23],
    ["Physical geography and the natural regions", 22],
    ["Agriculture, industry and the water question", 25],
    ["Population, education and the human resource", 21],
    ["The 14-mark question, planned and written", 26],
    ["Language, culture and the national identity", 22],
    ["Trade, transport and the communications network", 23]
  ],
  urdu: [
    ["Composition: structure before sentences", 22],
    ["Translation technique, Urdu to English", 24],
    ["Comprehension and the short-answer marks", 21],
    ["Letter and application writing conventions", 20],
    ["Prose texts and the themes examiners ask for", 25],
    ["Poetry: form, imagery and the set couplets", 26],
    ["Grammar, idiom and the common errors", 23],
    ["Full paper under timing, then marked", 27],
    ["Essay writing: the argued composition", 24],
    ["Precis and the art of leaving things out", 22]
  ],
  isl: [
    ["The life of the Prophet: the Makkan period", 25],
    ["The Madinan period and the treaties", 26],
    ["The Holy Quran: revelation and compilation", 24],
    ["Hadith: classification and the major collections", 23],
    ["The Rightly Guided Caliphs, in order", 27],
    ["The pillars, and the reasoning behind each", 22],
    ["Part (b) answers: from account to argument", 24],
    ["Past-paper clinic and the mark scheme", 26],
    ["The Prophet as a leader, judge and commander", 25],
    ["Articles of faith and the evidence for them", 23]
  ]
};
/* Backend first; the list above is the fallback the page ships with. */
var SYLLABUS = (window.CO_DATA && window.CO_DATA.SYLLABUS && (window.CO_DATA.SYLLABUS.length || Object.keys(window.CO_DATA.SYLLABUS).length))
  ? window.CO_DATA.SYLLABUS : SYLLABUS_BAKED;

/* A title reduced to its content words, for comparing two of them. Case,
   punctuation and the short connectives all go — "Part (b) answers: from
   account to argument" and "Part (b) answers \u2014 from account to argument"
   have to come out the same, because on the Islamiyat roster they did. */
function topicWords(s){
  var out = {}, n = 0;
  String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ")
    .forEach(function (w) { if (w.length > 3 && !out[w]) { out[w] = 1; n++; } });
  out.__n = n;
  return out;
}

/* Does a syllabus topic say the same thing as the teacher's free lecture?
   Measured as the share of the shorter title's content words that appear in
   the longer one — half or more and it is the same lesson wearing different
   punctuation. Seven of the twenty-one teachers tripped this. */
function sameTopic(a, b){
  var A = topicWords(a), B = topicWords(b);
  if (!A.__n || !B.__n) return false;
  var hit = 0;
  Object.keys(A).forEach(function (w) { if (w !== "__n" && B[w]) hit++; });
  return hit / Math.min(A.__n, B.__n) >= 0.5;
}

/* The teacher's full course: their free lecture first, then the paid syllabus
   for their subject. `free` is the only flag the page branches on.

   The free lecture is the teacher's own, and several of them are a topic that
   is also on the subject syllabus below — listing "Research methods: validity
   and reliability" as locked directly under the identical free lecture makes
   the whole list look auto-generated, which it half is. So a paid topic that
   restates the free one is dropped, and the lists carry two spare topics each
   so the course still runs to eight paid lectures after the drop. */
function courseOf(t){
  var d = t.demo || {};
  var free = d.title || "Demo lesson";
  var key = (SUBJECTS[t.subject] || {}).key || "math";
  var paid = (SYLLABUS[key] || SYLLABUS.math).filter(function (p) {
    return !sameTopic(p[0], free);
  }).slice(0, 8);

  var out = [{ n: 1, title: free, mins: d.mins || 14, code: d.code || "", free: true, url: d.url || d.video || "" }];
  paid.forEach(function (p, i) {
    /* A syllabus row is free only when the backend marks it free and gives
       it a video (config.js passes both through as p[2] and p[3]). */
    var isFree = !!p[2] && !!p[3];
    out.push({ n: i + 2, title: p[0], mins: p[1], code: d.code || "", free: isFree, url: p[3] || "" });
  });
  return out;
}

/* Total teaching time across the course, in whole hours and minutes. */
function courseLength(t){
  var m = courseOf(t).reduce(function (a, l) { return a + l.mins; }, 0);
  var h = Math.floor(m / 60);
  return h ? h + " hr " + (m % 60) + " min" : m + " min";
}

/* The one route out of a locked lecture. No cart, no checkout — the lecture
   list hands the enquiry to a person, with the teacher and the topic already
   written into it so the reply can be useful on the first message. */
const TEAM_WA = "923342222792";
function enquireHref(t, lecture){
  var msg = "Assalam o Alaikum \u2014 I watched the free lecture" +
    (t ? " by " + t.name : "") + " on Cambridge Online" +
    (lecture ? ".\nI'd like to enrol for the full " + (t ? t.subject + " " : "") +
      "course. The lecture I'm asking about is: \u201c" + lecture.title + "\u201d." :
      " and I'd like to enrol for the full course.") +
    "\nPlease could you share the fee and the timetable?";
  return "https://wa.me/" + TEAM_WA + "?text=" + encodeURIComponent(msg);
}


/* Chapter scaffolding for the lecture page. Deliberately generic: the real
   breakdown comes from the actual recording once it is attached. Timings are
   derived from the lesson length in the roster so they always add up. */
function chaptersOf(t){
  var mins = (t.demo && t.demo.mins) || 14;
  var plan = [
    ["Where this sits in the syllabus", .12],
    ["The idea from first principles",  .26],
    ["Worked example, start to finish", .28],
    ["A past-paper question on it",     .22],
    ["What the examiner is looking for",.12]
  ];
  var at = 0;
  return plan.map(function(p, i){
    var start = at;
    at += mins * 60 * p[1];
    return {
      n: i + 1,
      title: p[0],
      start: Math.round(start),
      len: Math.round(mins * 60 * p[1])
    };
  });
}

function fmtTime(s){
  s = Math.max(0, Math.round(s));
  return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
}

/* ==========================================================================
   CAMBRIDGE ONLINE — behaviour
   Sound engine · smooth scroll · theme · reveals · counters · faculty cards
   ========================================================================== */
(function () {
  "use strict";

  function mq(q) {
    try { return !!(window.matchMedia && window.matchMedia(q).matches); }
    catch (e) { return false; }
  }
  var reduced = mq("(prefers-reduced-motion: reduce)");
  var finePointer = mq("(pointer: fine)");

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* data.js declares its roster with const — a script-scoped binding, not a
     property on window. Read the binding, then mirror it so every consumer
     sees one source. */
  function grab(name, fallback) {
    try {
      switch (name) {
        case "SUBJECTS": return typeof SUBJECTS !== "undefined" ? SUBJECTS : (window.SUBJECTS || fallback);
        case "FACULTY":  return typeof FACULTY  !== "undefined" ? FACULTY  : (window.FACULTY  || fallback);
        case "CAMPUSES": return typeof CAMPUSES !== "undefined" ? CAMPUSES : (window.CAMPUSES || fallback);
        case "GROUPS":   return typeof GROUPS   !== "undefined" ? GROUPS   : (window.GROUPS   || fallback);
      }
    } catch (e) {}
    return window[name] || fallback;
  }
  var SUBJ = grab("SUBJECTS", {});
  var ROSTER = grab("FACULTY", []);
  if (!window.SUBJECTS) window.SUBJECTS = SUBJ;
  if (!window.FACULTY) window.FACULTY = ROSTER;
  if (!window.CAMPUSES) window.CAMPUSES = grab("CAMPUSES", []);
  if (!window.GROUPS) window.GROUPS = grab("GROUPS", []);

  function accentOf(t) { return (SUBJ[t.subject] && SUBJ[t.subject].accent) || "#C9982F"; }
  function keyOf(t)    { return (SUBJ[t.subject] && SUBJ[t.subject].key) || "math"; }
  function initials(name) {
    var p = String(name).replace(/^(Sir|Miss|Mrs|Mr|Dr)\.?\s+/i, "").trim().split(/\s+/);
    return ((p[0] ? p[0][0] : "") + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
  }
  function byId(id) {
    for (var i = 0; i < ROSTER.length; i++) if (ROSTER[i].id === id) return ROSTER[i];
    return null;
  }

  /* ====================================================== SOUND ENGINE */
  /* Synthesised with the Web Audio API — no files to load, nothing to host,
     and every cue stays under 200ms so it reads as UI feedback, not music. */
  var Sound = (function () {
    var ctx = null, master = null, on = true, ready = false, last = 0;

    try { on = localStorage.getItem("co-sound") !== "off"; } catch (e) {}

    function init() {
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.16;
        master.connect(ctx.destination);
        ready = true;
      } catch (e) { ctx = null; }
      return ctx;
    }

    /* Browsers block audio until a gesture; arm on the first one. */
    function arm() {
      init();
      if (ctx && ctx.state === "suspended") ctx.resume();
    }
    ["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, arm, { once: true, passive: true });
    });

    function tone(freq, dur, type, vol, slideTo) {
      if (!on || reduced) return;
      init();
      if (!ready || !ctx || ctx.state !== "running") return;
      var t = ctx.currentTime;
      var osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, t);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol == null ? 0.5 : vol, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t + dur + 0.02);
    }

    function noise(dur, vol) {
      if (!on || reduced) return;
      init();
      if (!ready || !ctx || ctx.state !== "running") return;
      var n = Math.floor(ctx.sampleRate * dur);
      var buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      var src = ctx.createBufferSource(); src.buffer = buf;
      var f = ctx.createBiquadFilter(); f.type = "bandpass";
      f.frequency.setValueAtTime(700, ctx.currentTime);
      f.frequency.exponentialRampToValueAtTime(2600, ctx.currentTime + dur);
      var g = ctx.createGain(); g.gain.value = vol == null ? 0.25 : vol;
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      src.connect(f); f.connect(g); g.connect(master);
      src.start();
    }

    var api = {
      hover: function () {
        var now = Date.now();
        if (now - last < 55) return;      /* debounce rapid pointer travel */
        last = now;
        tone(1180, 0.05, "sine", 0.22);
      },
      tap:    function () { tone(560, 0.07, "triangle", 0.4, 880); },
      click:  function () { tone(420, 0.09, "triangle", 0.42); setTimeout(function(){ tone(660, 0.1, "sine", 0.3); }, 55); },
      open:   function () { tone(330, 0.16, "sine", 0.34, 620); },
      close:  function () { tone(560, 0.14, "sine", 0.3, 280); },
      swipe:  function () { noise(0.22, 0.16); },
      chime:  function () { [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { tone(f, 0.34, "sine", 0.28); }, i * 82); }); },
      error:  function () { tone(200, 0.18, "sawtooth", 0.24, 140); },
      isOn:   function () { return on; },
      set:    function (v) {
        on = !!v;
        try { localStorage.setItem("co-sound", on ? "on" : "off"); } catch (e) {}
        if (on) { arm(); api.tap(); }
      }
    };
    return api;
  })();

  /* =================================================== SMOOTH SCROLLING */
  /* Interpolates window.scrollTo rather than transforming a wrapper, so
     position:fixed chrome keeps working. Pointer devices only — touch
     already has momentum and hijacking it feels wrong. */
  var Scroller = (function () {
    var target = 0, current = 0, running = false, active = false;

    function enable() {
      if (!finePointer || reduced) return;
      active = true;
      document.documentElement.classList.add("lenis");
      target = current = window.scrollY;
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("resize", sync);
      window.addEventListener("keydown", onKey);
    }
    function sync() { target = current = window.scrollY; }
    function maxY() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }
    function onWheel(e) {
      if (!active || e.ctrlKey) return;
      /* Let genuinely scrollable panels (the chapter list) keep native feel. */
      var el = e.target;
      while (el && el !== document.body) {
        if (el.scrollHeight > el.clientHeight + 4) {
          var st = getComputedStyle(el).overflowY;
          if (st === "auto" || st === "scroll") return;
        }
        el = el.parentElement;
      }
      e.preventDefault();
      target = Math.min(maxY(), Math.max(0, target + e.deltaY * 1.05));
      if (!running) { running = true; requestAnimationFrame(loop); }
    }
    function onKey(e) {
      if (!active) return;
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      var step = { PageDown: 1, PageUp: -1, " ": 1 }[e.key];
      if (step) { target = Math.min(maxY(), Math.max(0, target + step * window.innerHeight * .86)); e.preventDefault(); }
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = maxY();
      else return;
      if (!running) { running = true; requestAnimationFrame(loop); }
    }
    function loop() {
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.4) { current = target; running = false; }
      window.scrollTo(0, current);
      if (running) requestAnimationFrame(loop);
    }
    function to(y) {
      if (!active) { window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" }); return; }
      target = Math.min(maxY(), Math.max(0, y));
      if (!running) { running = true; requestAnimationFrame(loop); }
    }
    return { enable: enable, to: to, sync: sync };
  })();

  /* ========================================================== REVEALS */
  var revealIO = "IntersectionObserver" in window
    ? new IntersectionObserver(function (rows) {
        rows.forEach(function (r) {
          if (!r.isIntersecting) return;
          r.target.classList.add("in");
          revealIO.unobserve(r.target);
        });
      }, { rootMargin: "0px 0px -7% 0px", threshold: .06 })
    : null;

  /* Fails open — [data-reveal] starts invisible, so any error in here must
     still end with the content on screen. */
  function observe(scope) {
    var root = scope || document, nodes;
    try {
      nodes = root.querySelectorAll("[data-reveal]:not(.in)");
      if (revealIO && !reduced) {
        [].forEach.call(nodes, function (n, i) {
          n.style.transitionDelay = Math.min(i, 7) * 60 + "ms";
          revealIO.observe(n);
        });
        return;
      }
    } catch (e) {}
    [].forEach.call(nodes || root.querySelectorAll("[data-reveal]"), function (n) {
      n.classList.add("in");
    });
  }

  /* ========================================================= COUNTERS */
  function runCount(el) {
    var to = parseFloat(el.dataset.count) || 0, suffix = el.dataset.suffix || "";
    var raf = window.requestAnimationFrame;
    if (reduced || !raf) { el.textContent = to + suffix; return; }
    var t0 = null, dur = 1450;
    function tick(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
      if (p < 1) raf(tick);
    }
    raf(tick);
  }
  function initCounters() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!("IntersectionObserver" in window)) { [].forEach.call(nodes, runCount); return; }
    var io = new IntersectionObserver(function (rows) {
      rows.forEach(function (r) {
        if (r.isIntersecting) { runCount(r.target); io.unobserve(r.target); }
      });
    }, { threshold: .45 });
    [].forEach.call(nodes, function (n) { io.observe(n); });
  }

  /* ==================================================== LESSON POSTER */
  /* Real subject notation rather than decoration, so the poster frame says
     what the lesson is about before anything loads. */
  function motif(k, a) {
    var s = 'fill="none" stroke="' + a + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
    var t = 'fill="' + a + '" font-family="JetBrains Mono,monospace" font-size="15" opacity=".85"';
    switch (k) {
      case "math": return '<g ' + s + '><path d="M126 250 H520 M172 98 V276"/>' +
        '<path d="M198 116 Q320 306 442 116" stroke-width="3"/>' +
        '<path d="M320 212 V250" stroke-dasharray="4 7" opacity=".6"/>' +
        '<circle cx="320" cy="212" r="6" fill="' + a + '"/></g>' +
        '<text x="196" y="304" ' + t + '>y = a(x−h)² + k</text>';
      case "phys": return '<g ' + s + '><path d="M150 170 H510"/>' +
        '<path d="M330 170 L300 235 H360 Z" fill="' + a + '" fill-opacity=".18"/>' +
        '<path d="M190 170 V110 M470 170 V230" stroke-width="3"/>' +
        '<path d="M190 110 l-11 16 M190 110 l11 16 M470 230 l-11-16 M470 230 l11-16"/></g>' +
        '<text x="200" y="90" ' + t + '>F₁d₁ = F₂d₂</text>';
      case "chem": return '<g ' + s + '><path d="M250 130 L320 92 L390 130 V208 L320 246 L250 208 Z"/>' +
        '<circle cx="320" cy="169" r="30" stroke-dasharray="5 7"/>' +
        '<path d="M420 169 H500 M500 169 l-14-9 M500 169 l-14 9"/></g>' +
        '<text x="150" y="290" ' + t + '>rate ∝ collisions</text>';
      case "bio": return '<g ' + s + '><ellipse cx="270" cy="170" rx="52" ry="86"/>' +
        '<ellipse cx="390" cy="170" rx="52" ry="86"/>' +
        '<path d="M270 118 v104 M390 118 v104" stroke-dasharray="4 8" opacity=".7"/>' +
        '<path d="M270 130 v84 M390 214 v-84" stroke-width="3"/>' +
        '<path d="M270 130 l-8 14 M270 130 l8 14 M390 214 l-8-14 M390 214 l8-14"/></g>' +
        '<text x="176" y="298" ' + t + '>xylem · phloem</text>';
      case "cs": return '<g ' + s + '><rect x="196" y="96" width="120" height="52" rx="9"/>' +
        '<path d="M256 148 V182"/><path d="M256 182 l-40 34 l40 34 l40-34 Z"/>' +
        '<path d="M296 216 H420"/><rect x="420" y="190" width="112" height="52" rx="9"/>' +
        '<path d="M256 250 V282 H420"/></g>' +
        '<text x="196" y="316" ' + t + '>IF … THEN … ENDIF</text>';
      case "acct": return '<g ' + s + '><path d="M200 108 H520 M360 108 V262"/>' +
        '<path d="M220 152 H330 M220 190 H330 M220 228 H310" opacity=".65"/>' +
        '<path d="M392 152 H500 M392 190 H460" opacity=".65"/></g>' +
        '<text x="214" y="92" ' + t + '>Dr</text><text x="392" y="92" ' + t + '>Cr</text>';
      case "biz": return '<g ' + s + '><path d="M170 262 H520"/>' +
        '<rect x="210" y="182" width="52" height="80" fill="' + a + '" fill-opacity=".14"/>' +
        '<rect x="292" y="140" width="52" height="122" fill="' + a + '" fill-opacity=".2"/>' +
        '<rect x="374" y="96" width="52" height="166" fill="' + a + '" fill-opacity=".26"/>' +
        '<path d="M210 214 L318 168 L400 118 L482 96" stroke-width="3"/></g>' +
        '<text x="196" y="82" ' + t + '>case → application</text>';
      case "econ": return '<g ' + s + '><path d="M170 268 H520 M200 88 V268"/>' +
        '<path d="M230 118 L470 250" stroke-width="3"/><path d="M230 250 L470 118" stroke-width="3"/>' +
        '<circle cx="350" cy="184" r="7" fill="' + a + '"/>' +
        '<path d="M350 184 H200 M350 184 V268" stroke-dasharray="4 7" opacity=".7"/></g>' +
        '<text x="472" y="108" ' + t + '>S</text><text x="472" y="264" ' + t + '>D</text>';
      case "soc": return '<g ' + s + '><circle cx="290" cy="178" r="80"/><circle cx="390" cy="178" r="80"/>' +
        '<path d="M340 108 a80 80 0 0 0 0 140 a80 80 0 0 0 0-140" fill="' + a + '" fill-opacity=".14"/></g>' +
        '<text x="184" y="304" ' + t + '>validity · reliability</text>';
      case "eng": return '<g ' + s + '><path d="M186 120 H448 M186 160 H488 M186 200 H408 M186 240 H468"/>' +
        '<path d="M186 280 H332" opacity=".5"/></g>' +
        '<g fill="' + a + '" opacity=".45">' +
        '<path d="M404 300 v-30 q0-30 30-35 v13 q-16 4-16 22 h16 v30 Z"/>' +
        '<path d="M452 300 v-30 q0-30 30-35 v13 q-16 4-16 22 h16 v30 Z"/></g>';
      case "pst": return '<g ' + s + '><path d="M160 250 H520"/>' +
        '<circle cx="220" cy="250" r="8" fill="' + a + '"/><circle cx="330" cy="250" r="8" fill="' + a + '"/>' +
        '<circle cx="440" cy="250" r="8" fill="' + a + '"/>' +
        '<path d="M220 250 V190 M330 250 V150 M440 250 V196"/>' +
        '<path d="M220 190 H300 M330 150 H414 M440 196 H514" opacity=".6"/></g>' +
        '<text x="160" y="300" ' + t + '>source → inference</text>';
      case "urdu": return '<g ' + s + '><path d="M200 210 q60 -80 120 -20 q50 50 110 -10" stroke-width="3.2"/>' +
        '<path d="M240 250 q70 40 150 0" stroke-width="3.2" opacity=".7"/>' +
        '<path d="M470 128 v92" stroke-width="3.2" opacity=".7"/></g>' +
        '<circle cx="300" cy="268" r="5" fill="' + a + '"/><circle cx="336" cy="268" r="5" fill="' + a + '"/>';
      case "isl": return '<g ' + s + '><path d="M320 88 L392 160 L320 232 L248 160 Z"/>' +
        '<path d="M320 88 L392 160 L320 232 L248 160 Z" transform="rotate(45 320 160)"/>' +
        '<circle cx="320" cy="160" r="98" stroke-dasharray="3 9" opacity=".6"/></g>' +
        '<text x="196" y="302" ' + t + '>reference → argument</text>';
      default: return '<g ' + s + '><circle cx="320" cy="180" r="80"/></g>';
    }
  }

  function posterSVG(t, cls) {
    var acc = accentOf(t), id = "p_" + t.id.replace(/[^a-z0-9]/gi, "");
    return '<svg class="' + (cls || "") + '" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" ' +
      'preserveAspectRatio="xMidYMid slice" role="img" aria-label="' +
      esc(t.demo ? t.demo.title : t.subject) + '">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + acc + '" stop-opacity=".15"/>' +
      '<stop offset="1" stop-color="' + acc + '" stop-opacity=".02"/></linearGradient>' +
      '<pattern id="' + id + 'p" width="34" height="34" patternUnits="userSpaceOnUse">' +
      '<path d="M34 0 H0 V34" fill="none" stroke="' + acc + '" stroke-width=".5" stroke-opacity=".18"/>' +
      '</pattern></defs>' +
      '<rect width="640" height="360" fill="url(#' + id + ')"/>' +
      '<rect width="640" height="360" fill="url(#' + id + 'p)"/>' +
      motif(keyOf(t), acc) + '</svg>';
  }

  /* Decorative filigree behind the card crown. */
  function crownSVG(t) {
    var acc = accentOf(t);
    return '<svg viewBox="0 0 400 104" preserveAspectRatio="none" aria-hidden="true">' +
      '<g fill="none" stroke="' + acc + '" stroke-width="1" stroke-opacity=".45">' +
      '<circle cx="330" cy="30" r="46"/><circle cx="330" cy="30" r="30"/>' +
      '<path d="M0 84 Q100 44 200 74 T400 58"/>' +
      '<path d="M0 96 Q110 60 210 88 T400 74" stroke-opacity=".25"/></g></svg>';
  }

  /* ==================================================== FACULTY CARDS */
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 12h13M13 6l6 6-6 6"/></svg>';

  /* ---- subject glyphs ----------------------------------------------------
     The right half of the card was bare mesh — a large dead area beside the
     medallion that the eye kept landing on and finding nothing in. Each card
     now carries a mark for what its teacher actually teaches, drawn as line
     work in the card's own accent so it reads as etched into the panel rather
     than as an icon dropped on top of it.

     Keyed by the first word of the subject, so "Accounts", "Accounts &
     Business", "Business" and "Business Studies" all resolve without needing
     a row each. Anything unmatched falls back to the open book. */
  var GLYPHS = {
    Mathematics: '<path d="M8 12h14M15 5v14"/><path d="M32 12h14"/>' +
                 '<path d="M9 33l13 13M22 33L9 46"/>' +
                 '<path d="M32 39.5h14"/><circle cx="39" cy="33.5" r="1.7"/>' +
                 '<circle cx="39" cy="45.5" r="1.7"/>',
    Physics:     '<circle cx="27" cy="27" r="5"/><ellipse cx="27" cy="27" rx="22" ry="9"/>' +
                 '<ellipse cx="27" cy="27" rx="22" ry="9" transform="rotate(60 27 27)"/>' +
                 '<ellipse cx="27" cy="27" rx="22" ry="9" transform="rotate(120 27 27)"/>',
    Chemistry:   '<path d="M21 6v14L9 42a4 4 0 0 0 3.5 6h29A4 4 0 0 0 45 42L33 20V6"/>' +
                 '<path d="M17 6h20"/><path d="M14 31h26" stroke-opacity=".55"/>' +
                 '<circle cx="22" cy="39" r="2.4"/><circle cx="31" cy="43" r="1.8"/>',
    Biology:     '<path d="M27 50V16"/><path d="M27 24c0-8 7-14 17-14 0 8-7 14-17 14Z"/>' +
                 '<path d="M27 38c0-8-7-14-17-14 0 8 7 14 17 14Z"/>' +
                 '<path d="M27 16c0-6 5-11 11-11" stroke-opacity=".5"/>',
    Computer:    '<rect x="6" y="10" width="42" height="28" rx="3"/>' +
                 '<path d="M18 48h18M27 38v10"/>' +
                 '<path d="M18 20l-5 4 5 4M36 20l5 4-5 4M31 18l-8 12" stroke-opacity=".7"/>',
    Economics:   '<path d="M8 44h40"/><path d="M8 36l11-11 9 8 20-19"/>' +
                 '<path d="M40 14h8v8" stroke-opacity=".7"/>' +
                 '<path d="M14 44V32M24 44v-6M34 44V26M44 44V20" stroke-opacity=".4"/>',
    Accounts:    '<rect x="9" y="5" width="36" height="44" rx="3"/>' +
                 '<path d="M16 15h22M16 24h22" stroke-opacity=".6"/>' +
                 '<path d="M16 33h9M16 41h9"/><path d="M31 33h9M35.5 28.5v9" stroke-opacity=".7"/>',
    Business:    '<rect x="5" y="16" width="44" height="28" rx="3"/>' +
                 '<path d="M19 16v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5"/>' +
                 '<path d="M5 27h44" stroke-opacity=".55"/><path d="M23 27h8v5h-8z"/>',
    /* Quotation marks, not a letterform. The first pass drew a stylised
       double-bowl glyph that simply read as a capital B. */
    English:     '<path d="M20 32c-5 0-9-4-9-9s4-9 9-9 9 4 9 9c0 9-5 15-13 18"/>' +
                 '<path d="M43 32c-5 0-9-4-9-9s4-9 9-9 9 4 9 9c0 9-5 15-13 18"/>',
    /* A qalam — the reed pen, held at the angle the script is written at. The
       first pass was a bare curve with two dots under it, which resembled
       nothing in particular. */
    Urdu:        '<path d="M11 47l3.5-9.5L37 15a4.2 4.2 0 0 1 6 6L20.5 43.5Z"/>' +
                 '<path d="M34.5 17.5l6 6" stroke-opacity=".6"/>' +
                 '<path d="M14.5 37.5l6 6" stroke-opacity=".6"/>' +
                 '<path d="M11 47l5-3" stroke-opacity=".8"/>',
    Islamiyat:   '<path d="M34 8a20 20 0 1 0 0 38 24 24 0 0 1 0-38Z"/>' +
                 '<path d="M44 18l2.4 5 5.6.6-4.2 3.8 1.2 5.6-5-3-5 3 1.2-5.6-4.2-3.8 5.6-.6Z" ' +
                 'stroke-opacity=".7"/>',
    Pakistan:    '<path d="M10 48V8h4v40z"/><path d="M14 10h30l-7 9 7 9H14z"/>' +
                 '<path d="M33 15a6 6 0 1 0 0 8 7 7 0 0 1 0-8Z" stroke-opacity=".8"/>' +
                 '<path d="M38 16.5l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2-1.5-1.4 2-.3Z" ' +
                 'stroke-opacity=".8"/>',
    Sociology:   '<circle cx="18" cy="16" r="7"/><circle cx="38" cy="16" r="7"/>' +
                 '<path d="M6 44c0-8 5-13 12-13s12 5 12 13"/>' +
                 '<path d="M26 44c0-8 5-13 12-13s12 5 12 13" stroke-opacity=".55"/>'
  };
  var GLYPH_FALLBACK =
    '<path d="M27 14C22 9 15 7 7 7v32c8 0 15 2 20 7V14Z"/>' +
    '<path d="M27 14c5-5 12-7 20-7v32c-8 0-15 2-20 7V14Z"/>';

  function glyphFor(subject) {
    var key = String(subject || "").split(/[\s&]+/)[0];
    return GLYPHS[key] || GLYPH_FALLBACK;
  }

  function cardHTML(t) {
    var acc = accentOf(t), d = t.demo || {};
    /* The callout reads as a unit code in the reference. Here it carries the
       real syllabus number when the teacher has one, and falls back to the
       level rather than inventing a code. */
    var code = (d.code || t.levels[0] || "").replace(/\s+/g, " ");
    return '<button class="fac" type="button" ' +
      'style="--acc:' + acc + '" data-id="' + esc(t.id) + '" data-group="' + esc(t.group) + '" data-reveal ' +
      'aria-haspopup="dialog" aria-label="' + esc(t.name) + ', ' + esc(t.subject) + ' — open details">' +
      '<span class="fac__pane">' +
        '<svg class="fac__glyph" viewBox="0 0 54 54" fill="none" stroke="currentColor" ' +
          'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          glyphFor(t.subject) + '</svg>' +
        '<span class="fac__marks">' +
          '<span class="fac__hatch"></span>' +
          (t.star ? '<span class="fac__star">★ Distinction</span>' : '') +
          '<span class="fac__code"><em>' + esc(code) +
            '<b class="fac__node"></b></em><i></i><i></i></span>' +
        '</span>' +
        '<span class="fac__b">' +
          '<span class="fac__med">' + esc(initials(t.name)) + '</span>' +
          '<span class="fac__name">' + esc(t.name) + '</span>' +
          '<span class="fac__tag">' + esc(t.tag) + '</span>' +
          '<span class="fac__lv">' + t.levels.map(function (l) {
            return '<span>' + esc(l) + '</span>';
          }).join("") + '</span>' +
          '<span class="fac__more">Open details' + ARROW + '</span>' +
        '</span>' +
      '</span>' +
      '<span class="fac__plate"><i></i><span>' + esc(t.subject) + '</span></span>' +
      '</button>';
  }

  function renderFaculty(sel, list) {
    var host = typeof sel === "string" ? document.querySelector(sel) : sel;
    if (!host) return;
    host.innerHTML = list.map(cardHTML).join("");
    observe(host);
    if (finePointer && !reduced) tiltify(host);
  }

  /* Pointer-follow tilt. Cheap enough to run on every card. */
  function tiltify(scope) {
    [].forEach.call(scope.querySelectorAll(".fac"), function (el) {
      var raf = null;
      el.addEventListener("pointermove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - .5;
          var py = (e.clientY - r.top) / r.height - .5;
          /* Rotation only. The lift belongs to .fac__pane's hover rule, and
             doing it here as well stacked two translations into an 11px jump. */
          el.style.transform = "perspective(900px) rotateY(" + (px * 7).toFixed(2) +
            "deg) rotateX(" + (-py * 7).toFixed(2) + "deg)";
        });
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* Liquid-glass specular. Feeds the pointer's horizontal position into the
     button so the highlight slides along the top edge with the cursor. The
     vertical axis is deliberately not tracked: following the cursor down into
     the middle of the pane laid a white pool over the face and made the dark
     button look fogged. The pane already looks right without any of this — the
     CSS parks the pool above the top edge — so it stays off for coarse
     pointers and reduced motion. */
  function initLiquid() {
    if (!finePointer || reduced) return;
    [].forEach.call(document.querySelectorAll(".btn--liquid"), function (el) {
      var raf = null;
      el.addEventListener("pointermove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = el.getBoundingClientRect();
          if (!r.width) return;
          el.style.setProperty("--lqx-mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        });
      });
      el.addEventListener("pointerleave", function () {
        el.style.removeProperty("--lqx-mx");
      });
    });
  }

  /* ------------------------------------------- touch: hover, by scroll ----
     Coarse pointers never fire :hover, so on phones every sheen sweep, card
     lift and silver filament on the page was unreachable. Here they are
     driven by position instead: an element lights up while it sits in the
     middle band of the viewport and goes dark once it leaves, so scrolling
     walks the effects down the page the way a cursor walks them across a
     desktop. Fine pointers keep :hover and skip this entirely. */
  function initTouchHover() {
    if (finePointer || reduced || !("IntersectionObserver" in window)) return;

    var sel = ".glass--sheen,.card,.step,.sub,.camp,.fac,.btn--liquid,.hero__by,.foot__swk," +
              ".aclear,.wiz,.cpane";
    var targets = document.querySelectorAll(sel);
    if (!targets.length) return;

    /* The band is the middle ~34% of the screen. Margins are negative on both
       edges, so an element must genuinely arrive before it fires rather than
       lighting up the instant a corner appears. */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle("is-hot", en.isIntersecting);
      });
    }, { rootMargin: "-33% 0px -33% 0px", threshold: 0 });

    [].forEach.call(targets, function (el) { io.observe(el); });

    /* Faculty and campus cards are built by script after boot, so a one-shot
       querySelectorAll at start-up misses every one of them. Watch for later
       arrivals and observe those too. */
    if ("MutationObserver" in window) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          [].forEach.call(m.addedNodes, function (n) {
            if (n.nodeType !== 1) return;
            if (n.matches && n.matches(sel)) io.observe(n);
            if (n.querySelectorAll) {
              [].forEach.call(n.querySelectorAll(sel), function (c) { io.observe(c); });
            }
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }

    /* A tap should also light the thing being tapped, immediately — waiting
       for it to drift into the band would feel unresponsive. Held on a short
       timer because touchend fires the moment the finger leaves. */
    document.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse") return;
      var el = e.target.closest && e.target.closest(sel);
      if (!el) return;
      el.classList.add("is-hot");
      clearTimeout(el._hotT);
      el._hotT = setTimeout(function () {
        /* Only drop it if the observer isn't already holding it lit. */
        var r = el.getBoundingClientRect();
        var h = window.innerHeight;
        if (r.bottom < h * 0.33 || r.top > h * 0.67) el.classList.remove("is-hot");
      }, 1600);
    }, { passive: true });
  }

  /* ------------------------------------------------ pane specular -------
     Same idea as the buttons, at pane scale — but both axes are tracked here,
     not just the horizontal. On a button the vertical was deliberately left
     out because dragging the pool into a 58px face read as fog; a pane is big
     enough that the highlight stays a highlight. Off for coarse pointers and
     reduced motion, where the parked resting position already looks right. */
  function initPaneGlow() {
    if (!finePointer || reduced) return;
    [].forEach.call(document.querySelectorAll(".wiz,.cpane"), function (el) {
      var raf = null;
      el.addEventListener("pointermove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          el.style.setProperty("--px", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
          el.style.setProperty("--py", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
        });
      });
      el.addEventListener("pointerleave", function () {
        el.style.removeProperty("--px");
        el.style.removeProperty("--py");
      });
    });
  }

  /* ==================================================== DOCK COLLISION ====
     Keeps the floating theme/sound pair out from under anything the visitor
     might be reaching for. An IntersectionObserver watches every tappable
     control against a root cropped down to the dock's own corner — the bottom
     ~15% of the viewport, left ~55% of it — so the callback only fires for
     things genuinely in the way, not for every button on screen.

     The margins are percentages rather than pixels on purpose: they are
     resolved against the root box, so a rotation or a resize re-crops the
     band for free and there is no listener to keep in sync.

     A counter rather than a boolean, because two controls can occupy the
     corner at once — a stacked Back and Continue do exactly that — and one of
     them leaving must not bring the dock back under the other. */
  function initDockYield() {
    var dock = document.querySelector(".dock");
    if (!dock || !("IntersectionObserver" in window)) return;

    /* Buttons only. The first pass included the faculty, campus and subject
       cards, which are full-width tap targets on a phone — and being card-
       sized they held the corner continuously, so the dock stayed gone for
       whole sections at a time and flickered at every seam between them. A
       button is where a mis-tap actually costs something. */
    var SEL = ".btn,.tab,.chap,.lec__dl a";
    var live = 0;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var was = en.target._inDock === true;
        if (en.isIntersecting === was) return;
        en.target._inDock = en.isIntersecting;
        live += en.isIntersecting ? 1 : -1;
      });
      if (live < 0) live = 0;
      dock.classList.toggle("is-yield", live > 0);
    }, { rootMargin: "-85% -45% 0% 0%", threshold: 0 });

    function watch(root) {
      [].forEach.call((root || document).querySelectorAll(SEL), function (el) {
        if (el._dockWatched) return;
        el._dockWatched = 1;
        io.observe(el);
      });
    }
    watch(document);

    /* Faculty and campus cards are rendered after boot, so a single pass at
       start-up misses them. Same watcher the touch-hover layer uses. */
    if ("MutationObserver" in window) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          [].forEach.call(m.addedNodes, function (n) {
            if (n.nodeType !== 1) return;
            if (n.matches && n.matches(SEL) && !n._dockWatched) { n._dockWatched = 1; io.observe(n); }
            watch(n);
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }

    /* The dock's own transition carries a half-second delay and a 0.7s curve —
       right for the entrance it was written for, far too slow for getting out
       of the way of a thumb. Swapping it wholesale would cost the entrance, so
       the quick one is switched in once that entrance is over and done. */
    setTimeout(function () { dock.classList.add("is-live"); }, 1500);

    /* A control that is removed or hidden while it holds the dock down — the
       wizard's Back button on the way to step one — would otherwise pin the
       dock away for good. Recount from scratch whenever a pane changes. */
    dock._dockRecount = function () {
      live = 0;
      [].forEach.call(document.querySelectorAll(SEL), function (el) {
        if (!el._inDock) return;
        if (!el.isConnected || el.hidden || !el.offsetParent) { el._inDock = false; return; }
        live++;
      });
      dock.classList.toggle("is-yield", live > 0);
    };
  }

  /* ============================================================ THEME */
  function applyTheme(mode, quiet) {
    document.documentElement.setAttribute("data-theme", mode);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", mode === "dark" ? "#0C0304" : "#F6F1E6");
    [].forEach.call(document.querySelectorAll("[data-theme-btn]"), function (b) {
      b.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
    try { localStorage.setItem("co-theme", mode); } catch (e) {}
    if (!quiet) Sound.tap();
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("co-theme"); } catch (e) {}
    applyTheme(saved || "light", true);   /* light is the default */
    /* Another open tab changed the theme: follow it straight away. */
    window.addEventListener("storage", function (e) {
      if (e.key === "co-theme" && (e.newValue === "light" || e.newValue === "dark")) applyTheme(e.newValue, true);
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest || !e.target.closest("[data-theme-btn]")) return;
      applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ============================================================ SOUND UI */
  function initSound() {
    function paint() {
      [].forEach.call(document.querySelectorAll("[data-sound-btn]"), function (b) {
        b.setAttribute("aria-pressed", Sound.isOn() ? "true" : "false");
        b.setAttribute("aria-label", Sound.isOn() ? "Mute sound" : "Unmute sound");
      });
    }
    paint();
    document.addEventListener("click", function (e) {
      if (!e.target.closest || !e.target.closest("[data-sound-btn]")) return;
      Sound.set(!Sound.isOn());
      paint();
    });

    /* Interaction cues, delegated so dynamically rendered nodes are covered. */
    var HOVER = ".btn,.fac,.nav a,.tab,.camp,.sub,.card,.step,.chap,.tgl,.snd,.mob a,.lec__dl a,.hdr__ic a";
    document.addEventListener("pointerover", function (e) {
      if (!e.target.closest) return;
      var el = e.target.closest(HOVER);
      if (el && !el.contains(e.relatedTarget)) Sound.hover();
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest) return;
      if (e.target.closest("[data-theme-btn],[data-sound-btn]")) return;
      if (e.target.closest(".btn,.fac,.tab,.chap,.lec__dl a,.burger")) Sound.click();
    });
  }

  /* =========================================================== CHROME */
  function initChrome() {
    var hdr = document.querySelector(".hdr");
    var prog = document.getElementById("prog");
    var burger = document.querySelector(".burger");
    var mob = document.querySelector(".mob");
    var lastY = 0;

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (hdr) {
        hdr.classList.toggle("stuck", y > 20);
        /* Hide on the way down, bring it back the moment they scroll up. */
        hdr.classList.toggle("hide", y > 420 && y > lastY && !(mob && mob.classList.contains("on")));
      }
      if (prog) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var scrim = document.getElementById("scrim");

    /* One place that owns every piece of the open state, so the scrim, the
       body lock and the burger can never drift out of sync with the panel. */
    function setNav(open) {
      if (!mob) return;
      mob.classList.toggle("on", open);
      burger.classList.toggle("on", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (scrim) scrim.classList.toggle("on", open);
      document.body.classList.toggle("nav-open", open);
    }
    function shut() { setNav(false); }

    if (burger && mob) {
      burger.addEventListener("click", function () {
        var open = !mob.classList.contains("on");
        setNav(open);
        open ? Sound.open() : Sound.close();
      });
      /* Tapping the blurred page is the obvious way out of the menu. */
      if (scrim) scrim.addEventListener("click", function () { shut(); Sound.close(); });
      mob.addEventListener("click", function (e) { if (e.target.closest("a")) shut(); });
      document.addEventListener("click", function (e) {
        if (!mob.contains(e.target) && !burger.contains(e.target)) shut();
      });
    }

    /* In-page anchors route through the smooth scroller. */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      /* The campus links keep href="#campuses" so they still land somewhere
         with the script off, but with it on they open the dialog instead —
         scrolling as well would move the page behind a veil that has just
         locked it. */
      if (a.hasAttribute("data-camps")) return;
      var id = a.getAttribute("href").slice(1);
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      shut();
      goTo(el);
      history.replaceState(null, "", "#" + id);
    });
  }

  /* Sections below the fold are content-visibility:auto, so their height is a
     remembered estimate until they have been painted once. On the very first
     jump to a section that has never been on screen, everything above it can
     resolve to a different height mid-flight and the landing drifts.

     So the target is re-measured after the scroll settles and corrected if it
     moved. Capped at three passes: if it has not converged by then something
     else is moving the page and chasing it would look like a fight. */
  function goTo(el, pass) {
    pass = pass || 0;
    var y = el.getBoundingClientRect().top + window.scrollY - 72;
    Scroller.to(y);
    if (pass >= 3) return;
    setTimeout(function () {
      var now = el.getBoundingClientRect().top + window.scrollY - 72;
      if (Math.abs(now - window.scrollY) > 8) goTo(el, pass + 1);
    }, 620);
  }

  /* Highlights the nav item for whichever section owns the viewport. */
  function initSpy() {
    var links = [].slice.call(document.querySelectorAll(".nav a[href^='#'], .mob a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var ids = links.map(function (a) { return a.getAttribute("href").slice(1); });
    var seen = {};
    var io = new IntersectionObserver(function (rows) {
      rows.forEach(function (r) { seen[r.target.id] = r.intersectionRatio; });
      var best = null, bestV = 0;
      ids.forEach(function (id) { if ((seen[id] || 0) > bestV) { bestV = seen[id]; best = id; } });
      if (!best) return;
      links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + best); });
    }, { threshold: [.12, .3, .55, .8], rootMargin: "-20% 0px -45% 0px" });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ======================================================== PRELOADER */
  /* The old gate was window.load — meaning the page stayed behind the
     preloader until the last image and font had landed. On a phone that was
     the difference between seeing the site at ~1.2s and at ~4.5s. Now it
     lifts as soon as the document is parseable and the fonts have settled,
     with a hard cap so a stalled asset can never trap it. Images below the
     fold finish arriving behind a page the visitor is already reading. */
  function initPreloader() {
    var pre = document.getElementById("pre");
    if (!pre) return;
    var bar = pre.querySelector(".pl__b"), finished = false;

    /* The bar used to jump on a 110ms interval by a random 12–38 per cent,
       which is four visible lurches and then a stop. It now runs on rAF and
       chases a target it never quite reaches, so the motion is continuous and
       decelerating — the shape real progress has. Written to transform, so
       the loop costs a composite and not a layout. */
    var shown = 0, target = 0, raf = 0;
    function paintBar() {
      /* Ease toward the target rather than stepping to it. The closer it
         gets, the slower it moves, which is what makes a bar that is really
         waiting on something look like it is working rather than stalled. */
      shown += (target - shown) * 0.085;
      if (bar) bar.style.transform = "scaleX(" + (shown / 100).toFixed(4) + ")";
      if (shown < 99.7 || !finished) raf = requestAnimationFrame(paintBar);
      else if (bar) bar.style.transform = "scaleX(1)";
    }
    /* The target creeps toward a ceiling it cannot pass, so the bar is always
       moving but never claims to be finished before it is. */
    var creep = setInterval(function () {
      if (!finished) target = Math.min(target + (94 - target) * 0.22 + 3, 93);
    }, 140);
    raf = requestAnimationFrame(paintBar);

    function done() {
      if (finished) return;
      finished = true;
      clearInterval(creep);
      target = 100;
      /* Held just long enough for the bar to visibly close the last stretch —
         snapping to full and leaving in the same frame reads as a glitch. */
      setTimeout(function () {
        pre.classList.add("gone");
        document.body.classList.add("ready");
        Sound.swipe();
        /* The loop is stopped once the loader is off screen; leaving a rAF
           running behind an invisible element is a frame budget spent on
           nothing for the rest of the session. */
        setTimeout(function () { cancelAnimationFrame(raf); }, 700);
      }, 170);
    }

    /* Wait on the crest specifically — it is the one image the hero cannot
       open without. Everything else can stream in afterwards. */
    function heroReady() {
      var crest = document.querySelector('.medal__face--a img[fetchpriority="high"]');
      if (!crest || crest.complete) return Promise.resolve();
      return new Promise(function (res) {
        crest.addEventListener("load", res, { once: true });
        crest.addEventListener("error", res, { once: true });
      });
    }
    /* document.fonts.ready waits for every face in the sheet — ten files
       across three families, including weights nothing above the fold uses.
       The headline needs two of them. Waiting on just those two typically
       releases the page several hundred milliseconds earlier, and the rest
       swap in underneath with no visible reflow because they are only used
       further down. */
    function fontsReady() {
      if (!document.fonts || !document.fonts.load) return Promise.resolve();
      try {
        return Promise.all([
          document.fonts.load('600 3rem "Cormorant Garamond"'),
          document.fonts.load('400 1rem "Outfit"')
        ]);
      } catch (e) { return Promise.resolve(); }
    }

    /* Whichever settles first — never block on the slow one. */
    Promise.race([
      Promise.all([fontsReady(), heroReady()]),
      new Promise(function (r) { setTimeout(r, 650); })
    ]).then(function () { setTimeout(done, 60); });

    setTimeout(done, 1500);              /* never let a stalled asset trap the page */
  }


  /* ══════════════════════════════════ THE DROPDOWN ════════════════════════
     Enhances every <select> on the page into a themed listbox, and keeps the
     real control underneath as the source of truth.

     Two-way: choosing in the list writes to the select and dispatches a real
     `change`, so the wizard's existing validation table needs no changes at
     all. Setting the select from script and firing `change` repaints the face,
     which is what the country-code picker and the campus list rely on.

     Runs on every screen. It used to stand down below 640px on the theory
     that the native picker wins on a phone; on this page it does not. iOS and
     Android paint their own slab — system grey, system face, a column of
     radio dots — straight over an oxblood-and-gold document, with no CSS
     reaching inside it. So the list runs everywhere and changes shape
     instead: an anchored popover on a pointer device, a bottom sheet on a
     phone. See place(), and the sheet block in the stylesheet. */
  function initSelects(scope) {
    var root = scope || document;
    [].forEach.call(root.querySelectorAll("select:not([data-sel])"), enhance);
  }

  /* One veil for every list on the page. It only appears in sheet mode, where
     it does two jobs: it separates the sheet from the document behind it, and
     it swallows the touch that would otherwise scroll that document. The
     dismiss itself is already handled — the pointerdown listener each control
     puts on the document sees a press that is in neither the wrapper nor the
     list and closes. */
  var selVeil = null;
  function selVeilShow(on) {
    if (!selVeil) {
      if (!on) return;
      selVeil = document.createElement("div");
      selVeil.className = "sel__veil";
      document.body.appendChild(selVeil);
      /* Forced reflow before the class lands, or the veil is born already
         opaque and never runs its fade. */
      void selVeil.offsetWidth;
    }
    selVeil.classList.toggle("is-open", !!on);
  }

  function enhance(native) {
    if (native.dataset.sel || native.multiple) return;
    native.dataset.sel = "1";

    var wrap = document.createElement("div");
    wrap.className = "sel" + (native.className ? " " + native.className : "");
    native.parentNode.insertBefore(wrap, native);
    wrap.appendChild(native);
    native.className = "sel__native";
    /* A hook for the few places that need to know the enhancement took over —
       the telephone block folds away its own code span and caret, since the
       themed button now prints both. A class rather than :has(), which is not
       safe to rely on for a layout that breaks visibly without it. */
    if (wrap.parentNode) wrap.parentNode.classList.add("has-sel");

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sel__btn";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    /* The <label for> points at the select, so the face borrows the same
       accessible name rather than inventing a second one. */
    var lab = native.id && document.querySelector('label[for="' + native.id + '"]');
    if (lab) btn.setAttribute("aria-labelledby", (lab.id || (lab.id = "sl_" + native.id)));
    else if (native.getAttribute("aria-label")) btn.setAttribute("aria-label", native.getAttribute("aria-label"));
    btn.innerHTML = '<span class="sel__lab"></span><span class="sel__car" aria-hidden="true"></span>';

    var pop = document.createElement("div");
    /* Any modifier the author put on the select comes along, so a rule can
       still target one particular list now that it is not a descendant. */
    pop.className = "sel__pop" + (native.dataset.pop ? " sel__pop--" + native.dataset.pop : "");
    pop.setAttribute("role", "listbox");
    pop.tabIndex = -1;

    wrap.appendChild(btn);
    /* The list is mounted on <body>, not inside the wrapper. It is
       position:fixed, and a fixed element is positioned against the nearest
       ancestor carrying a transform, a filter or a backdrop-filter rather
       than against the viewport. Nearly every card on this page has a
       backdrop-filter, so a list left inside one is offset by that card's own
       position — which is exactly how far the wizard's dropdown was landing
       from its button. Mounted on the body there is no such ancestor. */
    document.body.appendChild(pop);

    var face = btn.querySelector(".sel__lab");
    var opts = [], cur = -1, typed = "", typeTimer = null, typedTag = null;

    /* Read live rather than cached: a phone rotated into landscape crosses
       the breakpoint, and a sheet left behind on a 700px-wide viewport is a
       full-width bar glued to the bottom of the screen. */
    function sheet() { return mq("(max-width:640px)"); }
    /* The shape the list was last built in, so a resize can tell a keyboard
       opening from an actual change of form. */
    var builtSheet = false;

    /* A sheet covers the field it belongs to, so it has to carry the field's
       name — on a form with four of these stacked, an unlabelled list of
       answers has lost its question. Borrowed from the same <label> the
       button borrows its accessible name from. */
    function sheetTitle() {
      var l = native.id && document.querySelector('label[for="' + native.id + '"]');
      var t = (l && l.textContent) || native.getAttribute("aria-label") ||
              btn.getAttribute("aria-label") || "Choose";
      return t.replace(/[\s*·—-]+$/, "").trim();
    }

    /* ---- build the list from the select's own options -------------------
       Rebuildable, because two of these selects are filled by script after
       boot: the campus list and the two hundred and forty dial codes. */
    /* A list this long needs a real search field, not a blind type-ahead.
       Below the threshold a box would be clutter — four options do not need
       filtering — so it is added only where it earns its place. */
    var SEARCHABLE = 12;
    var find = null;

    function build() {
      pop.innerHTML = "";
      opts = [];
      find = null;
      var list = [].slice.call(native.options);

      builtSheet = sheet();
      pop.classList.toggle("sel__pop--sheet", builtSheet);
      if (builtSheet) {
        var head = document.createElement("div");
        head.className = "sel__head";
        head.innerHTML = '<span class="sel__grip" aria-hidden="true"></span>' +
                         '<span class="sel__ttl"></span>';
        head.querySelector(".sel__ttl").textContent = sheetTitle();
        pop.appendChild(head);
      }

      if (list.length >= SEARCHABLE) {
        var bar = document.createElement("div");
        bar.className = "sel__find";
        bar.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.6"/>' +
          '<path d="M16 16l4.2 4.2"/></svg>' +
          '<input type="text" autocomplete="off" spellcheck="false" placeholder="Search\u2026" ' +
          'aria-label="Search the list">';
        pop.appendChild(bar);
        find = bar.querySelector("input");
        find.addEventListener("input", filter);
        /* The field owns the arrows and Enter while it has focus, so the list
           can still be driven without leaving the box. */
        find.addEventListener("keydown", function (e) {
          if (e.key === "ArrowDown") { e.preventDefault(); step(1); }
          else if (e.key === "ArrowUp") { e.preventDefault(); step(-1); }
          else if (e.key === "Enter") { e.preventDefault(); if (cur >= 0) choose(cur); }
          else if (e.key === "Escape") { e.preventDefault(); close(); btn.focus(); }
          else if (e.key === "Tab") close();
        });
      }

      list.forEach(function (o, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "sel__opt" + (o.value === "" && i === 0 ? " is-ph" : "");
        b.setAttribute("role", "option");
        b.dataset.i = i;
        b.disabled = o.disabled;
        /* The dial picker prints the code as a trailing mono column. The
           marker is put there by the builder, not guessed at from the text. */
        if (o.dataset.aside) {
          b.innerHTML = esc(o.textContent) + "<em>" + esc(o.dataset.aside) + "</em>";
        } else {
          b.textContent = o.textContent;
        }
        b.addEventListener("click", function () { choose(i); });
        b.addEventListener("mousemove", function () { mark(i, false); });
        pop.appendChild(b);
        opts.push(b);
        if (o.value === "" && i === 0 && list.length > 1 && !find) {
          var sep = document.createElement("div");
          sep.className = "sel__sep";
          pop.appendChild(sep);
        }
      });
      paint();
    }

    /* Matches on the option text and on the side column, so the dial picker
       answers to "pak" and to "92" alike. A run with no hits says so rather
       than showing an empty box. */
    function filter() {
      var q = (find.value || "").trim().toLowerCase();
      var shown = -1, hits = 0;
      opts.forEach(function (b, i) {
        var o = native.options[i];
        var hay = (o.textContent + " " + (o.dataset.aside || "")).toLowerCase();
        var ok = !q || hay.indexOf(q) >= 0;
        b.hidden = !ok;
        if (ok) { hits++; if (shown < 0) shown = i; }
      });
      var none = pop.querySelector(".sel__none");
      if (!hits) {
        if (!none) {
          none = document.createElement("p");
          none.className = "sel__none";
          pop.appendChild(none);
        }
        none.textContent = "Nothing matches \u201c" + q + "\u201d";
      } else if (none) none.remove();
      if (shown >= 0) mark(shown);
    }

    function paint() {
      var o = native.options[native.selectedIndex];
      var empty = !o || o.value === "";
      face.textContent = o ? o.textContent : "";
      btn.dataset.empty = empty ? "1" : "0";
      opts.forEach(function (b, i) {
        b.setAttribute("aria-selected", i === native.selectedIndex ? "true" : "false");
      });
      /* The dial picker's face prints the code, not the country name — the
         span beside it is what the visitor reads, and a 20-character country
         name would push the phone field off the row. */
      if (native.dataset.face === "aside" && o && o.dataset.aside) {
        face.textContent = o.dataset.aside;
      }
    }

    function mark(i, scroll) {
      if (cur >= 0 && opts[cur]) opts[cur].classList.remove("is-cur");
      cur = i;
      if (i < 0 || !opts[i]) return;
      opts[i].classList.add("is-cur");
      pop.setAttribute("aria-activedescendant", opts[i].id || (opts[i].id = "so_" + Math.random().toString(36).slice(2, 8)));
      if (scroll !== false) {
        var b = opts[i], top = b.offsetTop, bot = top + b.offsetHeight;
        if (top < pop.scrollTop) pop.scrollTop = top - 6;
        else if (bot > pop.scrollTop + pop.clientHeight) pop.scrollTop = bot - pop.clientHeight + 6;
      }
    }

    function choose(i) {
      if (native.options[i] && native.options[i].disabled) return;
      var changed = native.selectedIndex !== i;
      native.selectedIndex = i;
      paint();
      close();
      btn.focus();
      if (changed) {
        native.dispatchEvent(new Event("change", { bubbles: true }));
        Sound.tap();
      }
    }

    /* ---- placement -------------------------------------------------------
       The list is position:fixed so it escapes every clipping card on the
       page. That means it has to be measured and placed by hand, and it has
       to flip above the control when there is not room below. */
    function place() {
      /* The sheet is placed by the stylesheet against the viewport, not by
         hand against the control. Every inline value from a previous popover
         run is cleared, or a stale `top` survives the rotation and pins the
         sheet halfway up the screen. */
      if (sheet()) {
        pop.style.top = pop.style.bottom = pop.style.left = "";
        pop.style.minWidth = pop.style.maxHeight = "";
        pop.classList.remove("is-up");
        return;
      }

      var r = btn.getBoundingClientRect();
      var vh = window.innerHeight, gap = 8;
      pop.style.minWidth = Math.max(r.width, 180) + "px";
      /* Measured with the panel laid out but still invisible, so the flip
         decision is made against the real height rather than a guess. */
      pop.style.maxHeight = "290px";
      var h = Math.min(pop.scrollHeight + 2, 290);
      var below = vh - r.bottom - gap - 10;
      var above = r.top - gap - 10;
      var up = below < h && above > below;
      pop.classList.toggle("is-up", up);
      pop.style.maxHeight = Math.max(120, Math.min(290, up ? above : below)) + "px";
      pop.style.top = up ? "" : (r.bottom + gap) + "px";
      pop.style.bottom = up ? (vh - r.top + gap) + "px" : "";

      /* Horizontally: aligned to the control, then pulled back inside the
         viewport if a wide list would otherwise hang off the edge. */
      var w = Math.max(pop.offsetWidth, r.width);
      var left = r.left;
      if (left + w > window.innerWidth - 12) left = window.innerWidth - w - 12;
      pop.style.left = Math.max(12, left) + "px";
    }

    function open() {
      if (wrap.classList.contains("is-open")) return;
      /* Only one list open at a time. Two open dropdowns is a state the native
         control cannot reach, and both would be drawn in the same fixed layer
         with nothing deciding which sits on top. */
      [].forEach.call(document.querySelectorAll(".sel.is-open"), function (o) {
        if (o !== wrap && o._selClose) o._selClose();
      });
      build();
      wrap.classList.add("is-open");
      pop.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      place();
      selVeilShow(builtSheet);
      mark(native.selectedIndex >= 0 ? native.selectedIndex : 0);
      /* preventScroll matters: focusing the field scrolls its container, and
         the scroll listener below treats a scroll as a reason to close — so
         without it the list opened and shut itself in the same frame.

         Not on a sheet, though: raising the keyboard the instant the sheet
         opens takes back half the screen it just claimed, and the visitor has
         not asked to type yet. The field is there to be tapped. */
      if (find && !builtSheet) find.focus({ preventScroll: true });
      Sound.open();
      window.addEventListener("scroll", onMove, true);
      window.addEventListener("resize", onMove);
    }

    function close() {
      if (!wrap.classList.contains("is-open")) return;
      wrap.classList.remove("is-open");
      pop.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      typed = "";
      selVeilShow(false);
      Sound.close();
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    }
    /* The list is position:fixed, so it does not travel with the control when
       the page moves. The first version closed on any scroll, which sounds
       tidy and is not: the smooth scroller is still settling for a moment
       after a jump to a section, the reveal observers reflow as sections
       paint, and a list opened during any of that shut itself before it could
       be used. It also made a two-hundred-row list impossible to scroll,
       because scrolling the rows bubbles to the same capture-phase listener.

       So a move re-places the list instead of dismissing it, and it is only
       dismissed once its control has actually left the viewport — the one
       case where staying open would leave the list floating unattached. */
    function onMove(e) {
      if (e && e.target && e.target !== document && e.target !== window &&
          e.target.nodeType === 1 && pop.contains(e.target)) return;
      /* Crossing the breakpoint while open — a rotation — leaves the list in
         the wrong shape entirely, and rebuilding it under the visitor's thumb
         is worse than dismissing it. */
      if (sheet() !== builtSheet) { close(); return; }
      /* A sheet is fixed to the bottom of the viewport, so it neither needs
         re-placing nor cares where its control has drifted to. The keyboard
         opening fires resize through here; it must not be read as the control
         leaving the screen. */
      if (builtSheet) return;
      var r = btn.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) { close(); return; }
      place();
    }

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      wrap.classList.contains("is-open") ? close() : open();
    });
    btn.addEventListener("mouseenter", function () { Sound.hover(); });

    /* ---- keyboard --------------------------------------------------------
       Matches the native contract: arrows move, Home/End jump, Enter and
       Space commit, Escape abandons, letters type-ahead. Arrows on a closed
       control step the value without opening, which is what a real select
       does and what anyone tabbing through a form expects. */
    btn.addEventListener("keydown", function (e) {
      var openNow = wrap.classList.contains("is-open");
      var k = e.key;

      if (!openNow && (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ")) {
        e.preventDefault(); open(); return;
      }
      if (!openNow) return;

      if (k === "Escape") { e.preventDefault(); close(); return; }
      if (k === "Tab") { close(); return; }
      if (k === "Enter" || k === " ") { e.preventDefault(); if (cur >= 0) choose(cur); return; }
      if (k === "ArrowDown") { e.preventDefault(); step(1); return; }
      if (k === "ArrowUp") { e.preventDefault(); step(-1); return; }
      if (k === "Home") { e.preventDefault(); mark(0); return; }
      if (k === "End") { e.preventDefault(); mark(opts.length - 1); return; }

      /* Where there is a search field, a letter press hands over to it rather
         than running a second, invisible matcher beside it. */
      if (find && k.length === 1) { find.focus(); return; }

      if (k.length === 1 && /\S/.test(k)) {
        e.preventDefault();
        typed += k.toLowerCase();
        clearTimeout(typeTimer);
        typeTimer = setTimeout(function () {
          typed = "";
          if (typedTag) { typedTag.remove(); typedTag = null; }
        }, 900);
        if (!typedTag) {
          typedTag = document.createElement("div");
          typedTag.className = "sel__typed";
          pop.insertBefore(typedTag, pop.firstChild);
        }
        typedTag.textContent = typed;
        for (var i = 0; i < native.options.length; i++) {
          if (native.options[i].textContent.toLowerCase().indexOf(typed) === 0) { mark(i); break; }
        }
      }
    });

    function step(d) {
      var i = cur;
      for (var n = 0; n < opts.length; n++) {
        i = (i + d + opts.length) % opts.length;
        /* Hidden rows are skipped, or the arrows walk through a filtered-out
           stretch of the list highlighting nothing. */
        if (!opts[i].disabled && !opts[i].hidden) { mark(i); return; }
      }
    }

    document.addEventListener("pointerdown", function (e) {
      if (!wrap.contains(e.target) && !pop.contains(e.target)) close();
    });

    /* Script writing to the select — the campus list filling after boot, the
       dial code being guessed from the timezone — repaints the face. */
    native.addEventListener("change", paint);
    native._selRebuild = function () { build(); paint(); };
    wrap._selClose = close;

    build();
  }


  /* ══════════════════════════════════ THE NOTICE ══════════════════════════
     One announcement, shown once a session. Everything in it is real: the
     series the academy is currently enrolling for, the entry deadline for it,
     and the numbers that actually answer.

     Session dates follow the Cambridge calendar — May/June entries close in
     February, October/November entries close in July — so the notice works
     out which series is next from the date rather than being hard-coded to
     one that goes stale in March. */
  function initNotice() {
    var host = document.getElementById("nx");
    if (!host) return;
    var box = host.querySelector(".nx__box");
    if (!box) return;

    /* Cambridge runs three series a year; only two of them matter to this
       audience. Entry closes roughly four months before the papers. */
    function series() {
      var now = new Date(), y = now.getFullYear();
      /* [close date, series label, first paper month] */
      var runs = [
        [new Date(y, 1, 21), "May/June " + y, "May " + y],
        [new Date(y, 6, 21), "October/November " + y, "October " + y],
        [new Date(y + 1, 1, 21), "May/June " + (y + 1), "May " + (y + 1)]
      ];
      for (var i = 0; i < runs.length; i++) if (runs[i][0] > now) return runs[i];
      return runs[runs.length - 1];
    }

    var run = series(), close = run[0];
    var cd = host.querySelector("#nxCd");

    function tick() {
      var ms = close - new Date();
      if (ms < 0) ms = 0;
      var s = Math.floor(ms / 1000);
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600);
      var m = Math.floor(s % 3600 / 60), sec = s % 60;
      var cells = cd ? cd.querySelectorAll("b") : [];
      if (cells.length === 4) {
        cells[0].textContent = d;
        cells[1].textContent = ("0" + h).slice(-2);
        cells[2].textContent = ("0" + m).slice(-2);
        cells[3].textContent = ("0" + sec).slice(-2);
      }
    }
    var timer = null;

    /* Two places show the series: the heading and the summary row. Only the
       heading was being filled, which left the row printing an em-dash. */
    [].forEach.call(host.querySelectorAll("#nxSeries,#nxSeriesRow"), function (n) {
      n.textContent = run[1];
    });
    var pap = host.querySelector("#nxPapers");
    if (pap) pap.textContent = "from " + run[2];
    var dl = host.querySelector("#nxClose");
    if (dl) {
      dl.textContent = close.toLocaleDateString("en-GB",
        { day: "numeric", month: "long", year: "numeric" });
    }

    function open() {
      host.classList.add("on");
      requestAnimationFrame(function () { host.classList.add("in"); });
      document.body.classList.add("nav-open");
      tick();
      timer = setInterval(tick, 1000);
      Sound.open();
      var x = host.querySelector(".nx__x");
      if (x) x.focus();
    }
    function shut() {
      if (!host.classList.contains("on")) return;
      host.classList.remove("in");
      document.body.classList.remove("nav-open");
      clearInterval(timer);
      Sound.close();
      setTimeout(function () { host.classList.remove("on"); }, 380);
      try { sessionStorage.setItem("co-nx", "seen"); } catch (e) {}
    }

    host.addEventListener("click", function (e) {
      if (e.target.closest("[data-nxclose]")) { shut(); return; }
      /* The enrol button closes the notice and hands the page to the form —
         leaving a modal open over the thing it just sent you to is the
         classic version of this mistake. */
      if (e.target.closest("[data-nxgo]")) {
        shut();
        setTimeout(function () {
          var t = document.getElementById("contact");
          if (t) Scroller.to(t.getBoundingClientRect().top + window.scrollY - 72);
          else location.href = "index.html#contact";
        }, 220);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && host.classList.contains("on")) shut();
    });
    /* Any control anywhere can raise it. */
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-notice]")) { e.preventDefault(); open(); }
    });

    var seen = false;
    try { seen = sessionStorage.getItem("co-nx") === "seen"; } catch (e) {}
    /* Held back until the visitor has had a moment with the page. A modal
       that lands on the hero before anything has been read is an obstacle,
       not an announcement. */
    if (!seen) setTimeout(open, 6500);
    window.__coNotice = open;
  }


  /* ═════════════════════════════════ CORNER ADS ═══════════════════════════
     A single promo card that rotates around the corners of the screen.

     The clock, as specified:
       · ten minutes on screen, then it retires and the next card enters from
         a different corner
       · dismissed, it stays away for three minutes and then resumes
       · the corner advances every time, so the card never lands twice in the
         same place

     Everything it advertises is a real part of this site — a free lecture that
     exists, a campus that exists, a number that answers. */
  var LIFE = 10 * 60 * 1000;   /* on screen before it retires itself */
  var SNOOZE = 3 * 60 * 1000;  /* after a dismissal before it comes back */
  var FIRST = 22 * 1000;       /* before the first one, so the page lands first */
  var GAP = 2500;              /* between one leaving and the next arriving */

  function initAds() {
    if (reduced) return;
    var host = document.getElementById("adz");
    if (!host) return;

    var SLOTS = ["br", "bl", "tr", "tl"];
    var slot = 0, at = 0, card = null, lifeT = null, nextT = null;

    /* The stock. Each entry names its own accent so the card is coloured by
       what it is offering rather than being gold every time. */
    var STOCK_BAKED = [
      {
        k: "One free lecture", acc: "#7FC4E8",
        h: "Watch a full lesson first",
        p: "Every teacher has a recorded lesson you can watch before you enrol. No form, no deposit.",
        cta: "Browse the faculty", href: "#faculty", ic: "play"
      },
      {
        k: "Past papers", acc: "#E3B55D",
        h: "Twenty years of papers, by topic",
        p: "The archive runs back to 2002 — every question and mark scheme indexed by topic, not by year.",
        cta: "See what's included", href: "#courses", ic: "paper"
      },
      {
        k: "Admissions", acc: "#5FD1A3",
        h: "Talk to admissions on WhatsApp",
        p: "Send your subjects and exam session; they come back with the teachers and the timetable.",
        cta: "Message +92 334 2222792",
        href: "https://wa.me/923463311647", ext: true, ic: "chat"
      },
      {
        k: "Multiple campuses", acc: "#E89B6C",
        h: "Sit your mocks in person",
        p: "Online students may sit invigilated mock papers at any of the SWK campuses.",
        cta: "Addresses and timings", href: "#campuses", camps: true, ic: "pin"
      },
      {
        k: "The faculty", acc: "#B79BF0",
        h: "Twenty-one specialist teachers",
        p: "The same faculty that teaches at the SWK campuses — separate specialists for O Level and A Level.",
        cta: "Find your subject", href: "#faculty", ic: "cap"
      },
      {
        k: "This session", acc: "#F0B95F",
        h: "Enrolment is open",
        p: "Tell admissions the subjects and the session you are sitting and they will map it to a timetable.",
        cta: "Check the deadline", href: "#", notice: true, ic: "clock"
      }
    ];
    /* Backend first; the list above is the fallback the page ships with. */
    var STOCK = (window.CO_DATA && window.CO_DATA.STOCK && (window.CO_DATA.STOCK.length || Object.keys(window.CO_DATA.STOCK).length))
      ? window.CO_DATA.STOCK : STOCK_BAKED;

    var ICONS = {
      play:  '<path d="M8 5.2v13.6L19 12 8 5.2Z" fill="currentColor" stroke="none"/>',
      paper: '<rect x="4.5" y="3" width="15" height="18" rx="2.4"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4.5"/>',
      chat:  '<path d="M21 11.6a8.4 8.4 0 0 1-12.1 7.5L3.5 20.5l1.5-5A8.4 8.4 0 1 1 21 11.6Z"/>',
      pin:   '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/>',
      cap:   '<path d="M12 4 2.5 9 12 14l9.5-5L12 4Z"/><path d="M6.5 11.4V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.6"/>',
      clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 2"/>'
    };

    function make(a, where) {
      var el = document.createElement("aside");
      el.className = "ad ad--" + where;
      el.style.setProperty("--ad-acc", a.acc);
      el.style.setProperty("--ad-life", (LIFE / 1000) + "s");
      el.setAttribute("role", "complementary");
      el.setAttribute("aria-label", a.k + " — " + a.h);

      var tag = a.ext ? "a" : (a.notice ? "button" : "a");
      var attrs = a.ext
        ? ' href="' + a.href + '" target="_blank" rel="noopener"'
        : a.notice ? ' type="button" data-notice'
        : ' href="' + a.href + '"' + (a.camps ? " data-camps" : "");

      el.innerHTML =
        '<span class="ad__lip" aria-hidden="true"></span>' +
        '<span class="ad__wash" aria-hidden="true"></span>' +
        '<button class="ad__x" type="button" aria-label="Dismiss this notice">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
          'stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<div class="ad__in">' +
          '<span class="ad__ic" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
            'stroke-linecap="round" stroke-linejoin="round">' + ICONS[a.ic] + '</svg>' +
          '</span>' +
          '<div class="ad__tx">' +
            '<span class="ad__k">' + esc(a.k) + '</span>' +
            '<p class="ad__h">' + esc(a.h) + '</p>' +
            '<p class="ad__p">' + esc(a.p) + '</p>' +
            '<' + tag + ' class="ad__go"' + attrs + '>' + esc(a.cta) +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
              'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<path d="M5 12h13M13 6l6 6-6 6"/></svg>' +
            '</' + tag + '>' +
          '</div>' +
        '</div>' +
        '<span class="ad__life" aria-hidden="true"><i></i></span>';

      return el;
    }

    function drop(el, then) {
      if (!el) { if (then) then(); return; }
      el.classList.remove("in");
      el.classList.add("out");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        if (then) then();
      }, 620);
    }

    function retire(snoozed) {
      clearTimeout(lifeT);
      var was = card;
      card = null;
      drop(was);
      /* A dismissal buys three minutes; a natural expiry only pauses for the
         length of the transition, then the next corner takes over. */
      clearTimeout(nextT);
      nextT = setTimeout(rotate, snoozed ? SNOOZE : GAP);
    }

    function rotate() {
      if (card) return;
      var a = STOCK[at % STOCK.length];
      at++;
      /* Advance the corner every time, so consecutive cards never share a
         spot even when the same offer comes round again. */
      slot = (slot + 1) % SLOTS.length;
      var el = make(a, SLOTS[slot]);
      host.appendChild(el);
      card = el;

      el.querySelector(".ad__x").addEventListener("click", function () {
        Sound.close();
        retire(true);
      });
      el.addEventListener("mouseenter", function () { Sound.hover(); });
      /* Following the link is engagement, not dismissal — the card leaves
         without the three-minute penalty. */
      el.querySelector(".ad__go").addEventListener("click", function () { retire(false); });

      requestAnimationFrame(function () {
        requestAnimationFrame(function () { el.classList.add("in"); });
      });
      Sound.tap();

      lifeT = setTimeout(function () { retire(false); }, LIFE);
    }

    /* Out of the way over the enquiry form: a card floating on top of the
       thing the whole page is pointing at is an obstacle, not an offer. */
    var contact = document.getElementById("contact");
    if (contact && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        host.style.visibility = es[0].isIntersecting ? "hidden" : "";
        host.style.pointerEvents = es[0].isIntersecting ? "none" : "";
      }, { threshold: 0.22 }).observe(contact);
    }

    /* A tab in the background does not burn its ten minutes. */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { clearTimeout(lifeT); clearTimeout(nextT); }
      else if (!card) nextT = setTimeout(rotate, GAP);
      else lifeT = setTimeout(function () { retire(false); }, LIFE);
    });

    /* Lifted clear of the sticky tap bar where a page has one. */
    var bar = document.querySelector(".tapbar");
    if (bar) host.style.setProperty("--ad-lift", "72px");

    /* The floating dock owns the bottom-left corner, and its width depends on
       the theme label inside it — which is a different length in every
       language and grows when the toggle is in its expanded state. Measured
       rather than guessed, then re-measured on resize, so the card clears it
       instead of landing half on top of it. */
    var dock = document.querySelector(".dock");
    function measureDock() {
      if (!dock) return;
      var w = Math.ceil(dock.getBoundingClientRect().width);
      host.style.setProperty("--dock-w", (w + 16) + "px");
    }
    measureDock();
    window.addEventListener("resize", measureDock);

    nextT = setTimeout(rotate, FIRST);
  }


  /* ============================================================= BOOT */
  window.__co = {
    observe: observe, posterSVG: posterSVG, cardHTML: cardHTML,
    accentOf: accentOf, initials: initials, byId: byId, crownSVG: crownSVG,
    sound: Sound, scroller: Scroller, esc: esc, tiltify: tiltify,
    /* Page scripts that build a <select> after boot call this to re-enhance
       it — the campus list and the dial codes both arrive that way. */
    selects: initSelects, notice: function () { if (window.__coNotice) window.__coNotice(); },
    /* Guarded media queries — page scripts must not call matchMedia raw,
       since a throw at that level takes the whole page wiring with it. */
    mq: mq, reduced: reduced, finePointer: finePointer,
    /* Runs a block of page wiring in isolation, so one bad section cannot
       leave the rest of the page unrendered. */
    step: function (label, fn) {
      try { fn(); }
      catch (e) { if (window.console) console.warn("[co] " + label, e); }
    }
  };
  window.renderFaculty = renderFaculty;

  /* ===================================================== ABOUT: THE WHEEL */
  /* Six panes on a shallow arc. The one at front is square to the reader;
     each step away from it adds a fixed rotation, a sideways offset and a
     push back in Z, which is what bends the row into a curve.

     Offsets are computed on the SHORT way round: with six panes, index 5 is
     one step behind index 0, not five ahead. Without that the wheel unwinds
     the long way whenever it wraps, and a pane visibly flies across the
     screen instead of stepping into place. */
  function initWheel() {
    var wheel = document.getElementById("awheel");
    var track = document.getElementById("awheelT");
    var hint = document.getElementById("awheelHint");
    if (!wheel || !track) return;

    var cards = [].slice.call(track.children);
    var N = cards.length;
    if (!N) return;

    var RM = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (RM.matches) return;                /* CSS has already flattened it */

    /* The geometry of the arc. */
    var SPREAD = 30;                       /* degrees added per step out    */
    var DEPTH  = 132;                      /* px pushed back per step out   */
    var FADE   = .3;                       /* opacity lost per step out     */
    var SIDES  = 2;                        /* panes drawn either side       */

    /* Half a second to turn, then long enough to read the pane. Change HOLD
       alone to re-pace it: 0 makes it turn continuously, 1480 gives one pane
       every two seconds. */
    var TURN = 550, HOLD = 1450;

    var i = 0, paused = false, visible = true, timer = null;

    function gap() {
      /* Read from the custom property so the arc re-spaces itself at each
         breakpoint without the numbers being duplicated in JS. */
      var w = parseFloat(getComputedStyle(wheel).getPropertyValue("--acw")) || 360;
      return w * .64;
    }

    function place() {
      var g = gap();
      cards.forEach(function (c, j) {
        /* Signed distance from the front pane, wrapped to the short way. */
        var d = ((j - i) % N + N) % N;
        if (d > N / 2) d -= N;

        var out = Math.abs(d);
        var hidden = out > SIDES;

        c.style.transform =
          "translateX(" + (d * g) + "px)" +
          " translateZ(" + (-out * DEPTH) + "px)" +
          " rotateY(" + (-d * SPREAD) + "deg)";
        c.style.opacity = hidden ? 0 : Math.max(0, 1 - out * FADE);
        /* A touch of blur on the receding panes so the eye settles on the
           front one instead of trying to read three at once. */
        c.style.filter = out ? "blur(" + (out * 1.1) + "px)" : "none";
        /* Nearer panes must paint over further ones; preserve-3d sorts by Z
           but the mask and the rims still benefit from an explicit order. */
        c.style.zIndex = String(10 - out);
        /* Off-arc panes must not be tabbed into or clicked through. */
        c.style.pointerEvents = hidden ? "none" : "";
        c.setAttribute("aria-hidden", hidden ? "true" : "false");
        c.classList.toggle("is-front", d === 0);
      });
    }

    function step() {
      i = (i + 1) % N;
      place();
    }

    function tick() {
      clearTimeout(timer);
      if (paused || !visible) return;
      timer = setTimeout(function () { step(); tick(); }, TURN + HOLD);
    }

    /* Pause and off-screen are two independent reasons to stop, resolved
       through one setter — writing the timer from two places is how you get a
       wheel that will not resume. */
    function apply() {
      wheel.classList.toggle("paused", paused);
      if (hint) hint.lastChild.nodeValue = paused ? "Paused — double-click to resume"
                                                  : "Double-click to pause";
      if (paused || !visible) clearTimeout(timer); else tick();
    }

    wheel.addEventListener("dblclick", function () { paused = !paused; apply(); });

    /* Safari on iOS does not fire dblclick reliably on a non-interactive
       element, and a double-tap there is a zoom gesture besides. Two taps
       inside 320ms is counted by hand. */
    var last = 0;
    wheel.addEventListener("touchend", function (e) {
      var now = Date.now();
      if (now - last < 320) { e.preventDefault(); paused = !paused; apply(); last = 0; }
      else last = now;
    }, { passive: false });

    /* Clicking a side pane brings it to the front rather than doing nothing. */
    wheel.addEventListener("click", function (e) {
      var c = e.target.closest(".aclear");
      if (!c) return;
      var j = cards.indexOf(c);
      if (j < 0 || j === i) return;
      i = j; place();
      if (!paused) tick();                 /* restart the dwell on this pane */
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (rows) {
        rows.forEach(function (r) { visible = r.isIntersecting; apply(); });
      }, { threshold: 0 }).observe(wheel);
    }

    /* --acw changes at the breakpoints, so the spacing has to be recomputed;
       the transform is otherwise stuck at the old width's geometry. */
    var rz = null;
    window.addEventListener("resize", function () {
      clearTimeout(rz);
      rz = setTimeout(place, 140);
    });

    place();
    apply();
  }

  /* ============================================================ THE DIAL */
  /* Eight stops, so the ring turns exactly 45 degrees a step. It turns for
     half a second, then holds long enough for the card to be read. Pressing
     the ring holds it; pressing again lets it go. It only runs while the
     section is on screen, so it is never mid-turn in a tab nobody is looking
     at, and it never starts itself for a reader who asked for less motion. */
  function initDial() {
    var wrap = document.getElementById("dial");
    if (!wrap) return;

    /* Every stop below is drawn from copy already on this page — the two that
       are not in the old six-card grid come from the About section (students
       mixing the two routes) and the SWK card (the 9:00 AM to 11:15 PM
       timetable). Nothing here is invented about the academy. */
    var STOPS = [
      { n:"01", k:"Live sessions", chip:"In the room",
        t:"The same lesson, not a broadcast",
        p:"Classes run to the campus timetable. Ask questions in the room or in the chat — the teacher taking your online session is the teacher standing in the Gulshan classroom." },
      { n:"02", k:"Same-day recordings", chip:"Same evening",
        t:"A missed class is not a missed topic",
        p:"Every session is recorded and posted the same evening. Attend live and rewatch it that night, or catch up in full if you could not make the slot." },
      { n:"03", k:"Written notes", chip:"Issued as taught",
        t:"The teacher's own notes",
        p:"Not a photocopied handout: each teacher's own written notes, issued as the topic is taught rather than handed over at the end of term." },
      { n:"04", k:"Past papers", chip:"Archive",
        t:"Indexed by topic, not by year",
        p:"The past-paper archive reorganised so you can drill one topic at a time, with mark schemes and marked model answers alongside." },
      { n:"05", k:"Marked assignments", chip:"Examiner-style",
        t:"You learn where the marks go",
        p:"Work comes back annotated the way an examiner would annotate it, so the feedback is about mark allocation rather than a bare score." },
      { n:"06", k:"Campus mocks", chip:"Multiple campuses",
        t:"Sit the mock in person",
        p:"Online students may sit invigilated mock papers at any SWK campus at no extra charge." },
      { n:"07", k:"Campus and online", chip:"Mix freely",
        t:"Two front doors, one faculty",
        p:"Take Physics on campus and Mathematics online if that suits your week. Students move between the two routes freely — it is the same institute either way." },
      { n:"08", k:"Late-evening slots", chip:"Timetable",
        t:"Morning through to 11:15 PM",
        p:"The full SWK timetable runs from 9:00 AM to 11:15 PM across the SWK campuses, so there is a slot that fits around school or college." }
    ];

    var N = STOPS.length, STEP = 360 / N;        /* 45 degrees */
    var TURN = 500, HOLD = 3400;                 /* half a second, then read */
    var ring = document.getElementById("dialRing"),
        spin = document.getElementById("dialSpin"),
        arc  = document.getElementById("dialArc"),
        nEl  = document.getElementById("dialN"),
        kEl  = document.getElementById("dialK"),
        chip = document.getElementById("dialChip"),
        tEl  = document.getElementById("dialT"),
        pEl  = document.getElementById("dialP"),
        dots = document.getElementById("dialDots"),
        hint = document.getElementById("dialHint");
    if (!ring || !spin || !arc) return;

    var RM = window.matchMedia("(prefers-reduced-motion: reduce)");
    var i = 0, held = RM.matches, timer = null, onScreen = false;

    /* The markers, and the faint spokes between them. */
    var marks = "";
    for (var m = 0; m < N; m++) {
      marks += '<g transform="rotate(' + (m * STEP) + ' 110 110)">' +
               '<line class="dial__sp" x1="110" y1="24" x2="110" y2="34"/>' +
               '<circle class="dial__m" cx="110" cy="16" r="4.5"/></g>';
    }
    spin.innerHTML = marks;
    var mEls = [].slice.call(spin.querySelectorAll(".dial__m"));

    var C = 2 * Math.PI * 94;
    arc.setAttribute("stroke-dasharray", C);

    for (var d = 0; d < N; d++) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Show " + STOPS[d].k);
      (function (j) { b.addEventListener("click", function () { hold(true); go(j); }); })(d);
      dots.appendChild(b);
    }
    var dEls = [].slice.call(dots.querySelectorAll("button"));

    function paint() {
      var v = STOPS[i];
      nEl.textContent = v.n; kEl.textContent = v.k;
      chip.textContent = v.chip; tEl.textContent = v.t; pEl.textContent = v.p;
      mEls.forEach(function (e, j) { e.classList.toggle("on", j === i); });
      dEls.forEach(function (e, j) {
        e.classList.toggle("on", j === i);
        e.setAttribute("aria-current", j === i ? "true" : "false");
      });
    }

    function go(next) {
      i = (next + N) % N;
      /* The ring turns backwards so the chosen marker comes up to meet the
         pin, rather than the pin appearing to chase the marker. */
      spin.style.setProperty("--rot", (-i * STEP) + "deg");
      arc.setAttribute("stroke-dashoffset", C - C * ((i + 1) / N));
      if (RM.matches) { paint(); return; }
      wrap.classList.add("is-turning");
      /* Swapped just past halfway through the turn, while the card is at its
         most faded — a swap at either end of the turn is visible as a pop. */
      setTimeout(function () { paint(); wrap.classList.remove("is-turning"); }, TURN * .55);
    }

    function tick() {
      clearTimeout(timer);
      if (held || !onScreen || RM.matches) return;
      timer = setTimeout(function () { go(i + 1); tick(); }, TURN + HOLD);
    }

    function hold(on) {
      held = on;
      wrap.classList.toggle("is-held", held);
      hint.textContent = held ? "Held — press to release" : "Press to hold";
      ring.setAttribute("aria-label", held
        ? "Course inclusions dial, held. Press to let it turn again."
        : "Course inclusions dial. Press to hold it still.");
      if (held) clearTimeout(timer); else tick();
    }

    ring.addEventListener("click", function () { hold(!held); });
    ring.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); hold(true); go(i + 1); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   { e.preventDefault(); hold(true); go(i - 1); }
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (rows) {
        rows.forEach(function (r) {
          onScreen = r.isIntersecting;
          if (onScreen) tick(); else clearTimeout(timer);
        });
      }, { threshold: .3 }).observe(wrap);
    } else { onScreen = true; tick(); }

    go(0);
    hold(held);
  }

  /* ========================================================= THE STREAMS */
  /* Spreads when it comes into view, and holds one card forward at a time. */
  function initTrio() {
    var trio = document.getElementById("trio");
    if (!trio) return;
    var cards = [].slice.call(trio.querySelectorAll(".trio__c"));
    if (!cards.length) return;
    var dots = document.getElementById("trioDots");
    var phone = window.matchMedia("(max-width:900px)");
    /* Set for one tick after a drag ends, so the click it generates does not
       land on a card. */
    var dragged = false;

    /* The spread runs on a stagger; once it has landed the delays are dropped
       so a press answers on the frame it was made. */
    function settle() { setTimeout(function () { trio.classList.add("set"); }, 1500); }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (rows) {
        rows.forEach(function (r) {
          if (r.isIntersecting) { trio.classList.add("in"); settle(); io.disconnect(); }
        });
      }, { threshold: .22 });
      io.observe(trio);
    } else { trio.classList.add("in"); settle(); }

    function close() {
      cards.forEach(function (c) {
        c.classList.remove("on");
        c.setAttribute("aria-expanded", "false");
      });
      trio.classList.remove("picked");
    }

    function choose(card) {
      trio.classList.add("set");            /* impatient press — answer at once */
      var already = card.classList.contains("on");
      close();
      if (already) return;
      trio.classList.add("picked");
      card.classList.add("on");
      card.setAttribute("aria-expanded", "true");
      if (phone.matches) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }

    cards.forEach(function (c) {
      c.addEventListener("click", function (e) {
        if (dragged) return;                /* this click ended a swipe */
        /* The jump button inside the card has its own job. */
        if (e.target.closest("[data-jump]")) return;
        choose(c);
      });
      c.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(c); }
      });
    });

    /* Pressing anywhere that is not a card returns the chosen one to the
       group, so another stream can be picked straight away. */
    document.addEventListener("click", function (e) {
      if (!trio.classList.contains("picked")) return;
      if (e.target.closest(".trio__c")) return;
      close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && trio.classList.contains("picked")) close();
    });

    /* ---- swipe dots, phone only ---- */
    var rail = trio.querySelector(".trio__rail");
    if (dots && rail) {
      function centreOf(j) {
        var c = cards[j];
        return c.offsetLeft + c.offsetWidth / 2 - rail.clientWidth / 2;
      }
      function nearest() {
        /* Nearest card centre to the rail centre, rather than a scroll
           fraction — the side padding makes a fraction lie at both ends. */
        var mid = rail.scrollLeft + rail.clientWidth / 2, best = 0, bd = Infinity;
        cards.forEach(function (c, j) {
          var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bd) { bd = d; best = j; }
        });
        return best;
      }

      cards.forEach(function (c, j) {
        var dot = document.createElement("button");
        dot.type = "button";
        var name = (c.querySelector(".trio__t") || {}).textContent || ("card " + (j + 1));
        dot.setAttribute("aria-label", "Show " + name);
        dot.addEventListener("click", function () {
          rail.scrollTo({ left: centreOf(j), behavior: "smooth" });
        });
        dots.appendChild(dot);
      });
      var dEls = [].slice.call(dots.querySelectorAll("button"));

      function mark() {
        var b = nearest();
        dEls.forEach(function (e, j) {
          e.classList.toggle("on", j === b);
          e.setAttribute("aria-current", j === b ? "true" : "false");
        });
      }
      var raf = null;
      rail.addEventListener("scroll", function () {
        if (raf) return;
        raf = requestAnimationFrame(function () { raf = null; mark(); });
      }, { passive: true });
      mark();

      /* ---- drag to scroll ----
         Touch already scrolls this natively, with momentum, so pointer drag
         is only wired up for mouse and pen — hijacking a finger would replace
         a good native gesture with a worse hand-rolled one. What this mainly
         buys is a narrow desktop window, where there is no way to scroll a
         horizontal rail without a trackpad. */
      var down = false, startX = 0, startLeft = 0, moved = 0;

      rail.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "touch" || e.button !== 0) return;
        down = true; moved = 0;
        startX = e.clientX; startLeft = rail.scrollLeft;
        rail.classList.add("is-drag");
      });
      rail.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > moved) moved = Math.abs(dx);
        if (moved > 3) {
          /* Only capture once it is clearly a drag, so a plain press still
             reaches the card underneath. */
          if (!rail.hasPointerCapture(e.pointerId)) rail.setPointerCapture(e.pointerId);
          rail.scrollLeft = startLeft - dx;
        }
      });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
        rail.addEventListener(ev, function (e) {
          if (!down) return;
          down = false;
          rail.classList.remove("is-drag");
          if (rail.hasPointerCapture && rail.hasPointerCapture(e.pointerId)) {
            rail.releasePointerCapture(e.pointerId);
          }
          if (moved > 6) {
            /* The click that follows a drag would otherwise open whichever
               card the pointer happened to finish over. */
            dragged = true;
            setTimeout(function () { dragged = false; }, 0);
            /* Snap-to-nearest by hand: the class that disabled snapping is
               gone, but the browser will not re-snap on its own. */
            rail.scrollTo({ left: centreOf(nearest()), behavior: "smooth" });
          }
        });
      });
    }
  }

  function boot() {
    [initTheme, initSound, initPreloader, initChrome, initSpy, initWheel, initDial, initTrio,
     initCounters, initLiquid, initTouchHover, initPaneGlow, initDockYield,
     Scroller.enable].forEach(function (fn) {
      try { fn(); } catch (e) { if (window.console) console.warn("[co]", e); }
    });

    /* Deferred to idle time. None of these are reachable in the first frame —
       the corner ads do not appear for twenty-two seconds, the notice for six,
       and a dropdown cannot be opened before there is a page to press. Running
       them inside boot put their cost inside the paint the visitor is actually
       waiting on, for no benefit at all. */
    var later = function () {
      [initSelects, initNotice, initAds].forEach(function (fn) {
        try { fn(); } catch (e) { if (window.console) console.warn("[co]", e); }
      });
    };
    if (window.requestIdleCallback) requestIdleCallback(later, { timeout: 2000 });
    else setTimeout(later, 260);
    try { observe(document); } catch (e) {
      [].forEach.call(document.querySelectorAll("[data-reveal]"), function (n) { n.classList.add("in"); });
    }
    /* If load already fired, the preloader handler may never run. */
    setTimeout(function () { document.body.classList.add("ready"); }, 600);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* ==========================================================================
   lecture — resolves ?t=<id> and drives the demo transport

   The shared core above is the same code the index runs: the sound engine,
   the smooth scroll, the reveals, the theme, the dropdowns, the notice, the
   corner ads, the faculty cards and both dialogs. Nothing on this page
   re-implements any of it. Only what a lesson page uniquely needs lives here.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  var co = window.__co;

  /* Shared state at handler scope. Only genuinely independent blocks are
     wrapped in co.step, so one isolated failure cannot orphan the rest. */
  var t, acc, demo, total, chapters;
  var chapHost, player, stage, fill, track, tNow, btnPlay, bigPlay;
  var speeds = [1, 1.25, 1.5, 2], si = 0, at = 0, playing = false, timer = null;

  /* --------------------------------------------------- logo fallbacks ----
     swk.png and the crest may not be dropped in yet. Rather than showing a
     broken icon in the header and the footer of every page, a drawn mark is
     substituted so the layout still reads. */
  co.step("logo fallbacks", function () {
    var FB = {
      crest: "data:image/svg+xml;base64," + btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#F3DDA4"/><stop offset=".5" stop-color="#C9982F"/>' +
        '<stop offset="1" stop-color="#A8781C"/></linearGradient></defs>' +
        '<path d="M60 6 L110 24 V70 C110 102 88 122 60 133 C32 122 10 102 10 70 V24 Z" ' +
        'fill="#2A0608" stroke="url(#g)" stroke-width="4.2" stroke-linejoin="round"/>' +
        '<text x="60" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="34" ' +
        'font-weight="700" fill="url(#g)">CO</text></svg>'),
      swk: "data:image/svg+xml;base64," + btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#F3DDA4"/><stop offset=".5" stop-color="#C9982F"/>' +
        '<stop offset="1" stop-color="#A8781C"/></linearGradient></defs>' +
        '<circle cx="60" cy="60" r="54" fill="#101F42" stroke="url(#g)" stroke-width="3.4"/>' +
        '<text x="60" y="59" text-anchor="middle" font-family="Georgia,serif" font-size="25" ' +
        'font-weight="700" fill="url(#g)">SWK</text>' +
        '<path d="M34 70 H86" stroke="url(#g)" stroke-width="1.2" opacity=".6"/>' +
        '<text x="60" y="84" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" ' +
        'font-size="8.4" letter-spacing="1.6" fill="url(#g)">SOLUTIONS</text></svg>')
    };
    [].forEach.call(document.querySelectorAll("img[data-fb]"), function (img) {
      img.addEventListener("error", function () {
        if (img.dataset.fbDone) return;
        img.dataset.fbDone = "1";
        img.src = FB[img.dataset.fb] || FB.crest;
      });
      if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event("error"));
    });
  });

  /* ------------------------------------------------- resolve the teacher --
     Deliberately not wrapped: everything below depends on it, so a failure
     here should surface rather than leave a half-rendered page. */
  /* Baked in per file by build-lecture-pages.py, so /lecture-waqas-khan is a
     real URL instead of a query string on one shared template. The query
     string still resolves, for anything already linking that way. */
  var id = window.CO_LECTURE_ID || "";
  try { if (!id) id = new URLSearchParams(location.search).get("t") || ""; }
  catch (e) { id = (location.search.match(/[?&]t=([^&]+)/) || [])[1] || ""; }
  t = co.byId(decodeURIComponent(id)) || FACULTY[0];

  acc = co.accentOf(t);
  demo = t.demo || { title: "Introduction to " + t.subject, mins: 14, code: "" };
  total = (demo.mins || 14) * 60;
  chapters = chaptersOf(t);

  /* ------------------------------------------------------------ metadata */
  co.step("metadata", function () {
    document.getElementById("lec").style.setProperty("--acc", acc);
    document.querySelector(".player").style.setProperty("--acc", acc);

    document.title = demo.title + " \u2014 free lecture by " + t.name +
                     " \u00b7 Cambridge Online";
    document.getElementById("crumbName").textContent = t.name;
    var subj = document.getElementById("mSubject");
    subj.textContent = t.subject;
    subj.style.color = acc;
    document.getElementById("mTitle").textContent = demo.title;
    document.getElementById("mBio").textContent = t.bio;

    /* The enrol button is a liquid button now, so the label lives in the
       inner span — writing to the button itself would wipe the trace SVG and
       the glass layers along with it. */

    /* Each teacher now has a real file, and that file bakes in its own
       canonical — so leave it alone. Only the legacy /lecture?t= route needs
       rewriting, and it should point at the real page, not at itself. */
    if (!window.CO_LECTURE_ID) {
      var can = document.querySelector('link[rel=canonical]');
      if (can) can.href = "https://cambridgeonline.tech/lecture-" + t.id;
    }

    /* Attribute the enquiry to the lecture that drove it. CO_SUBMIT already
       takes a teacher field; this page just never called it. */
    co.step("lecture-attribution", function () {
      var fired = false;
      function note() {
        if (fired || !window.CO_SUBMIT) return;
        fired = true;
        window.CO_SUBMIT({ kind: "lecture_interest", teacher: t.id,
                           subjects: [t.subject],
                           message: "Opened admissions from " + t.name + "'s free lecture" });
      }
      [].forEach.call(document.querySelectorAll('a[href*="#contact"], a[href*="wa.me"]'),
        function (a) { a.addEventListener("click", note, { once: true }); });
    });

    var cta = document.getElementById("ctaEnrol");
    var ctaLab = cta && cta.querySelector(".btn__lq");
    if (ctaLab) ctaLab.textContent = "Enrol with " + t.name.replace(/^Sir\s+/, "");

    document.getElementById("mChips").innerHTML =
      (demo.code ? '<span class="code">' + co.esc(demo.code) + "</span>" : "") +
      "<span>" + demo.mins + " min</span>" +
      t.levels.map(function (l) { return "<span>" + co.esc(l) + "</span>"; }).join("");

    document.getElementById("poster").innerHTML = co.posterSVG(t, "poster");

    document.getElementById("tutor").innerHTML =
      '<svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg>' +
      '<span class="med" style="--acc:' + acc + '">' + co.esc(co.initials(t.name)) + "</span>" +
      '<div><div style="font-family:var(--display);font-size:1.2rem;line-height:1.2">' +
      co.esc(t.name) + "</div>" +
      '<div style="font-size:.8rem;color:var(--text-3);margin-top:3px">' +
      co.esc(t.tag) + "</div></div>";
  });

  /* ------------------------------------------------------- the lectures --
     The introduction chapter on the teacher's row is always the free one and
     plays here. Any other lecture plays only if the backend marks it free and
     gives it a video; the rest stay locked and route to admissions. */
  var lectures = courseOf(t);
  lectures[0].url = demo.url || "";
  lectures[0].intro = true;
  var cur = lectures[0];

  function ytId(u) {
    u = String(u || "").trim();
    if (!u) return "";
    if (/^[\w-]{11}$/.test(u)) return u;
    var m = u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : "";
  }
  var LOCK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7.6 10.4V7.8a4.4 4.4 0 0 1 8.8 0v2.6"/>' +
    '<rect x="4.6" y="10.4" width="14.8" height="8.8" rx="2.1"/></svg>';

  /* Only the free lectures are listed. The paid course is taught through the
     Cambridge Online WhatsApp Community, not on this site, so its lessons
     are not named here one by one. */
  function paintCourse() {
    var host = document.getElementById("crs");
    if (!host) return;
    var free = lectures.filter(function (l) { return l.free; });
    var meta = document.getElementById("crsMeta");
    if (meta) meta.textContent = free.length + (free.length === 1 ? " free lecture" : " free lectures");
    host.innerHTML = free.map(function (l) {
      var i = lectures.indexOf(l), on = l === cur;
      return '<button type="button" class="crs__row crs__row--free' + (on ? ' is-on' : '') +
        '" data-i="' + i + '"' + (on ? ' aria-current="true"' : '') + '>' +
        '<span class="crs__k">' + ("0" + (free.indexOf(l) + 1)).slice(-2) + '</span>' +
        '<span class="crs__b"><b>' + co.esc(l.title) + '</b>' +
        '<small>' + (l.intro ? "Introduction chapter" : "Free lecture") +
        (on ? " \u00b7 on screen" : "") + '</small></span>' +
        '<span class="crs__t"><i>' + l.mins + ' min</i>' + (on ? '' : '<u>Play \u2192</u>') + '</span></button>';
    }).join("");
    var foot = document.getElementById("crsFoot");
    if (foot) foot.innerHTML =
      '<span class="crs__more"><b>Many more lessons are included in the paid course,</b> ' +
      'taught to enrolled students through the Cambridge Online WhatsApp Community.</span>' +
      '<a class="btn btn--liquid btn--sm btn--wide crs__join" href="' + co.esc(enquireHref(t, null)) +
      '" target="_blank" rel="noopener"><svg class="btn__trace" aria-hidden="true"><rect pathLength="100"/></svg>' +
      '<span class="btn__lq">Ask admissions about the course</span></a>';
    var ttl = document.getElementById("crsTitle");
    if (ttl) ttl.textContent = t.subject + " \u2014 watch free";
  }

  co.step("course", function () {
    paintCourse();
    var host = document.getElementById("crs");
    if (host) host.addEventListener("click", function (e) {
      var b = e.target.closest("button.crs__row");
      if (!b) return;
      var l = lectures[+b.dataset.i];
      if (!l || l === cur) return;
      setLecture(l, true);
      var p = document.getElementById("player");
      if (p && p.getBoundingClientRect().top < 0) p.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ------------------------------------------------------------ the player --
     A YouTube-hosted video in the site's own controls: the embed runs with
     its own controls, related videos and annotations switched off, and every
     control a visitor touches is drawn by this page. Nothing is laid over the
     video itself once it is playing. The embed only loads on the first press,
     so the page opens on the site's own poster and loads nothing from YouTube
     until someone asks for the lecture. */
  var yt = null, ytReady = false, apiAsked = false, poll = null, dur = total, muted = false;
  var soon, btnMute, btnFs;

  function loadAPI(cb) {
    if (window.YT && window.YT.Player) { cb(); return; }
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { if (prev) prev(); cb(); };
    if (apiAsked) return;
    apiAsked = true;
    var sc = document.createElement("script");
    sc.src = "https://www.youtube.com/iframe_api";
    sc.async = true;
    document.head.appendChild(sc);
  }

  function icons() {
    var p = playing ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="3.8" height="14" rx="1"/><rect x="13.7" y="5" width="3.8" height="14" rx="1"/></svg>'
                    : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg>';
    if (btnPlay) btnPlay.innerHTML = p;
    if (bigPlay) bigPlay.innerHTML = p;
    if (player) player.classList.toggle("playing", playing);
    if (btnMute) btnMute.classList.toggle("is-muted", muted);
  }

  function paint() {
    if (yt && ytReady && yt.getCurrentTime) {
      at = yt.getCurrentTime() || 0;
      var d = yt.getDuration && yt.getDuration();
      if (d) { dur = d; document.getElementById("tEnd").textContent = fmtTime(dur); }
    }
    var pc = dur ? at / dur * 100 : 0;
    if (fill) fill.style.width = Math.min(100, pc).toFixed(2) + "%";
    if (track) track.setAttribute("aria-valuenow", Math.round(pc));
    if (tNow) tNow.textContent = fmtTime(at);
  }

  function start(id) {
    player.classList.add("is-live", "is-loading");
    loadAPI(function () {
      if (yt) return;
      var pv = { autoplay: 1, controls: 0, rel: 0, iv_load_policy: 3, playsinline: 1,
                 disablekb: 1, fs: 0, cc_load_policy: 0, modestbranding: 1 };
      if (/^https?:$/.test(location.protocol)) pv.origin = location.origin;
      yt = new YT.Player("yt", {
        host: "https://www.youtube-nocookie.com",
        videoId: id, width: "100%", height: "100%", playerVars: pv,
        events: {
          onReady: function (e) {
            ytReady = true;
            e.target.setPlaybackRate(speeds[si]);
            e.target.playVideo();
            clearInterval(poll);
            poll = setInterval(paint, 250);
          },
          onStateChange: function (e) {
            var S = YT.PlayerState;
            playing = e.data === S.PLAYING || e.data === S.BUFFERING;
            if (e.data === S.PLAYING) player.classList.remove("is-loading");
            icons(); paint();
          },
          onError: function () {
            player.classList.remove("is-live", "is-loading");
            soon.hidden = false;
          }
        }
      });
    });
  }

  function setLecture(l, autoplay) {
    cur = l;
    document.getElementById("mTitle").textContent = l.title;
    document.title = l.title + " \u2014 free lecture by " + t.name + " \u00b7 Cambridge Online";
    var lab = document.getElementById("mFree");
    if (lab) lab.textContent = l.intro ? "Free \u00b7 Introduction chapter" : "Free lecture";
    var chips = document.getElementById("mChips");
    if (chips) chips.innerHTML =
      (l.code ? '<span class="code">' + co.esc(l.code) + "</span>" : "") +
      "<span>" + l.mins + " min</span>" +
      t.levels.map(function (x) { return "<span>" + co.esc(x) + "</span>"; }).join("");
    paintCourse();
    at = 0; dur = (l.mins || 14) * 60;
    document.getElementById("tEnd").textContent = fmtTime(dur);
    paint();
    var id = ytId(l.url);
    soon.hidden = !!id;
    player.classList.toggle("no-video", !id);
    if (!id) {
      if (yt && ytReady) yt.stopVideo();
      playing = false; icons();
      player.classList.remove("is-live", "is-loading");
      return;
    }
    if (yt && ytReady) {
      player.classList.add("is-live");
      if (autoplay) yt.loadVideoById(id); else yt.cueVideoById(id);
      return;
    }
    if (autoplay) start(id);
  }

  function toggle() {
    var id = ytId(cur.url);
    if (!id) { soon.hidden = false; soon.classList.remove("nudge"); void soon.offsetWidth; soon.classList.add("nudge"); return; }
    if (!yt) { start(id); return; }
    if (!ytReady) return;
    if (playing) yt.pauseVideo(); else yt.playVideo();
    co.sound.tap();
  }
  function jump(d) {
    if (!(yt && ytReady)) return;
    yt.seekTo(Math.min(dur, Math.max(0, yt.getCurrentTime() + d)), true);
    paint();
  }

  co.step("transport", function () {
    player = document.getElementById("player");
    stage = document.getElementById("stage");
    fill = document.getElementById("fill");
    track = document.getElementById("track");
    tNow = document.getElementById("tNow");
    btnPlay = document.getElementById("btnPlay");
    bigPlay = document.getElementById("bigPlay");
    btnMute = document.getElementById("btnMute");
    btnFs = document.getElementById("btnFs");
    soon = document.getElementById("vidSoon");

    stage.addEventListener("click", function () { if (!player.classList.contains("is-live")) toggle(); });
    stage.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
      if (e.key === "ArrowRight") { e.preventDefault(); jump(10); }
      if (e.key === "ArrowLeft") { e.preventDefault(); jump(-10); }
    });
    btnPlay.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    document.getElementById("btnBack").addEventListener("click", function (e) {
      e.stopPropagation(); jump(-10); co.sound.tap();
    });
    document.getElementById("btnSpeed").addEventListener("click", function (e) {
      e.stopPropagation();
      si = (si + 1) % speeds.length;
      document.getElementById("tSpeed").innerHTML = speeds[si] + "&times;";
      if (yt && ytReady) yt.setPlaybackRate(speeds[si]);
      co.sound.tap();
    });
    btnMute.addEventListener("click", function (e) {
      e.stopPropagation();
      muted = !muted;
      if (yt && ytReady) { if (muted) yt.mute(); else yt.unMute(); }
      btnMute.setAttribute("aria-label", muted ? "Unmute" : "Mute");
      icons();
    });
    btnFs.addEventListener("click", function (e) {
      e.stopPropagation();
      var d = document, el = player;
      if (d.fullscreenElement || d.webkitFullscreenElement) {
        (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      } else if (el.requestFullscreen) { el.requestFullscreen(); }
      else if (el.webkitRequestFullscreen) { el.webkitRequestFullscreen(); }
    });

    function seekTo(clientX) {
      var r = track.getBoundingClientRect();
      var f = Math.min(1, Math.max(0, (clientX - r.left) / (r.width || 1)));
      at = f * dur;
      if (yt && ytReady) yt.seekTo(at, true);
      paint();
    }
    track.addEventListener("click", function (e) { e.stopPropagation(); seekTo(e.clientX); });
    track.addEventListener("pointerdown", function (e) {
      e.stopPropagation();
      track.setPointerCapture(e.pointerId);
      var move = function (ev) { seekTo(ev.clientX); };
      var up = function () {
        track.removeEventListener("pointermove", move);
        track.removeEventListener("pointerup", up);
      };
      track.addEventListener("pointermove", move);
      track.addEventListener("pointerup", up);
    });
    track.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 10 : e.key === "ArrowLeft" ? -10 : 0;
      if (!d) return;
      e.preventDefault(); e.stopPropagation(); jump(d);
    });

    setLecture(cur, false);
  });

  /* ------------------------------------------------------------- related --
     The same cards the index renders, from the same roster, through the same
     renderer — so a press opens the shared dialog and a double press jumps
     to that teacher's lesson, exactly as it does on the index. */
  co.step("related", function () {
    var rel = FACULTY.filter(function (x) { return x.group === t.group && x.id !== t.id; });
    if (!rel.length) rel = FACULTY.filter(function (x) { return x.id !== t.id; }).slice(0, 3);
    document.getElementById("relTitle").textContent = "More from " + t.group;
    renderFaculty("#related", rel.slice(0, 6));
  });

  /* -------------------------------------------------------- the dialogs --
     The faculty panel and the campus bento both live in this page's markup,
     inherited from the shared shell. They are wired here rather than in the
     core because the core has no opinion about which pages carry them. */
  co.step("faculty dialog", function () {
    var pop = document.getElementById("fpop");
    var box = document.getElementById("fpopBox");
    if (!pop || !box) return;
    var esc = co.esc, opener = null, shutTimer = null;

    function build(x) {
      var d = x.demo || {};
      var href = "lecture.html?t=" + encodeURIComponent(x.id);
      var kin = FACULTY.filter(function (k) { return k.subject === x.subject; });
      var shown = kin.slice(0, 4);
      var rail = shown.map(function (k) {
        return '<button type="button" data-goto="' + esc(k.id) + '"' +
          (k.id === x.id ? ' class="on" aria-current="true"' : "") +
          ' title="' + esc(k.name) + '" aria-label="' + esc(k.name) + '">' +
          esc(co.initials(k.name)) + "</button>";
      }).join("");
      if (kin.length > shown.length) rail += "<span>+" + (kin.length - shown.length) + "</span>";

      var rows = [["Subject", x.subject], ["Levels", x.levels.join(" \u00b7 ")], ["Group", x.group]];
      if (d.code) rows.push(["Syllabus", d.code]);

      return '<button class="fpop__x" type="button" data-close aria-label="Close">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
          'stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '<div class="fpop__left">' +
          '<div class="fpop__rail">' + rail + '</div>' +
          '<div class="fpop__stage">' +
            '<a class="fpop__poster" href="' + href + '">' + co.posterSVG(x) +
              '<span class="fpop__go">&#9654;</span></a>' +
            '<p class="fpop__cap">' + esc(d.title || "Demo lesson") + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="fpop__right">' +
          '<span class="fpop__sub">' + esc(x.subject) + '</span>' +
          '<div class="fpop__head"><h3 id="fpopName">' + esc(x.name) + '</h3>' +
            (d.mins ? '<span class="fpop__mins">' + d.mins + ' min</span>' : "") + '</div>' +
          '<p class="fpop__tag">' + esc(x.tag) + '</p>' +
          '<div class="fpop__lv">' + x.levels.map(function (l) {
            return "<span>" + esc(l) + "</span>"; }).join("") + '</div>' +
          '<dl class="fpop__sum">' + rows.map(function (r) {
            return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") +
            '<div class="tot"><dt>Demo lesson</dt><dd>' + esc(d.title || "Available") + '</dd></div>' +
          '</dl>' +
          '<div class="fpop__act">' +
            '<a class="fpop__buy" href="' + href + '">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">' +
              '<path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg>Watch the full lesson</a>' +
            '<a class="fpop__alt" href="index.html#contact">Enrol with ' +
              esc(x.name.replace(/^Sir\s+/, "")) + '</a>' +
          '</div>' +
          '<p class="fpop__hint">Tip: double-press any teacher card to open ' +
          'their lesson straight away.</p>' +
        '</div>';
    }

    function swap(x) {
      box.style.setProperty("--acc", co.accentOf(x));
      box.innerHTML = build(x);
      var b = box.querySelector(".fpop__x");
      if (b) b.focus();
    }
    function open(x, from) {
      clearTimeout(shutTimer);
      opener = from || null;
      swap(x);
      pop.classList.add("on");
      requestAnimationFrame(function () { pop.classList.add("in"); });
      document.body.classList.add("nav-open");
      co.sound.open();
    }
    function shut() {
      if (!pop.classList.contains("on")) return;
      pop.classList.remove("in");
      document.body.classList.remove("nav-open");
      co.sound.close();
      shutTimer = setTimeout(function () {
        pop.classList.remove("on");
        box.innerHTML = "";
      }, 320);
      if (opener) { opener.focus(); opener = null; }
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) { shut(); return; }
      var jump = e.target.closest("[data-goto]");
      if (jump && pop.contains(jump)) {
        var to = co.byId(jump.dataset.goto);
        if (to) swap(to);
        return;
      }
      var card = e.target.closest(".fac");
      if (!card) return;
      var x = co.byId(card.dataset.id);
      if (x) { e.preventDefault(); open(x, card); }
    });

    /* Same shortcut as the index: a double press means "I know which one",
       and goes straight to that lesson. */
    document.addEventListener("dblclick", function (e) {
      var card = e.target.closest(".fac");
      if (!card) return;
      var x = co.byId(card.dataset.id);
      if (!x) return;
      e.preventDefault();
      shut();
      co.sound.click();
      location.href = "lecture.html?t=" + encodeURIComponent(x.id);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") shut();
    });
  });

  /* The campus bento, opened from the header, the footer and the corner ad.
     Lifted verbatim from the index rather than reimplemented: two renderers
     for one bento is exactly the drift the shared shell exists to prevent. */
  co.step("campuses", function () {
  var camps = document.getElementById("camps");
  var esc = co.esc;

  /* Range rings radiating from a pin. The ring count steps with the card's
     position so the five plates are not five copies of one drawing. */
  function viz(k) {
    var rings = "";
    for (var r = 1; r <= 4 + (k % 2); r++) {
      rings += '<ellipse cx="110" cy="104" rx="' + (30 * r) + '" ry="' + (11.5 * r) + '"' +
               ' stroke-width="1" opacity="' + (0.62 - r * 0.1).toFixed(2) + '"/>';
    }
    return '<svg viewBox="0 0 220 120" fill="none" stroke="currentColor" aria-hidden="true">' +
      rings +
      '<path d="M110 52a13 13 0 0 1 13 13c0 9.4-13 22-13 22s-13-12.6-13-22a13 13 0 0 1 13-13Z"' +
      ' stroke-width="1.7"/>' +
      '<circle cx="110" cy="65" r="4" fill="currentColor" stroke="none"/>' +
      '</svg>';
  }

  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"' +
            ' stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12' +
            's-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  var TEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"' +
            ' stroke-linecap="round" stroke-linejoin="round"><path d="M21 16.9v2.6a1.7 1.7 0 0 1' +
            '-1.9 1.7 17 17 0 0 1-7.4-2.6 16.6 16.6 0 0 1-5.1-5.1A17 17 0 0 1 4 6.1 1.7 1.7 0 0 1' +
            ' 5.7 4.2h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.7.6 2.5a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a13.6' +
            ' 13.6 0 0 0 5.1 5.1l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.5.6a1.7 1.7 0 0 1 1.4 1.7Z"/></svg>';

  camps.innerHTML = CAMPUSES.map(function (c, k) {
    var maps = "https://www.google.com/maps/search/?api=1&query=" + c.lat + "," + c.lng;
    /* No [data-reveal] here any more. The plates live in a dialog now, and
       that layer watches the viewport — inside a display:none panel there is
       nothing to watch, so the cards would open invisible and only fade in a
       beat after the box had already landed. The dialog stages them itself
       off --i instead. */
    return '<article class="camp' + (c.flagship ? " camp--flag" : "") + '"' +
      ' style="--i:' + k + '" data-short="' + esc(c.short) + '">' +
      '<div class="camp__viz" aria-hidden="true">' + viz(k) + '</div>' +
      '<div class="camp__b">' +
        '<div class="camp__top"><h3>' + esc(c.name) + '</h3>' +
        (c.flagship ? '<span class="camp__flag">Flagship</span>' : '') + '</div>' +
        '<p class="camp__addr">' + esc(c.address) + '</p>' +
        '<div class="camp__meta">' +
          '<span>◷ <b>' + esc(c.hours) + '</b></span>' +
          '<span>✆ <b>' + esc(c.phone) + '</b></span>' +
          (c.rating ? '<span class="rate"><i>★</i> <b>' + c.rating.toFixed(1) +
            '</b> <span>· ' + c.reviews + ' Google reviews</span></span>' : "") +
        '</div>' +
        '<div class="camp__row">' +
          '<a class="camp__go camp__go--p" href="' + maps + '" target="_blank" rel="noopener">' +
            PIN + 'Directions</a>' +
          '<a class="camp__go" href="tel:' + c.phone.replace(/\s/g, "") + '">' + TEL + 'Call</a>' +
        '</div>' +
      '</div></article>';
  }).join("");

  /* ---- the dialog ----
     Opened from anything carrying [data-camps]: the chips, the button under
     them, both "See the campuses" pills and the four campus links in the
     footer. A [data-camp] on the opener names which plate to light, so a
     press on "Malir Cantt" in the footer arrives at Malir Cantt rather than
     at the top of a list of five. */
  (function () {
    var pop = document.getElementById("cpop");
    if (!pop) return;
    var box = pop.querySelector(".cpop__box");
    var x = pop.querySelector(".cpop__x");
    var scroll = pop.querySelector(".cpop__scroll");
    var opener = null, shutTimer = null;

    function mark(short) {
      var hit = null;
      [].forEach.call(camps.querySelectorAll(".camp"), function (el) {
        var on = !!short && el.dataset.short === short;
        el.classList.toggle("is-target", on);
        if (on) hit = el;
      });
      return hit;
    }

    function open(from, short) {
      clearTimeout(shutTimer);
      opener = from || null;
      var hit = mark(short);
      pop.classList.add("on");
      pop.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-open");
      /* One frame between display and the transition, or the browser has
         nothing to animate from and the panel simply appears. */
      requestAnimationFrame(function () {
        pop.classList.add("in");
        if (scroll) {
          /* A named campus is scrolled to inside the panel, not into the
             page — offset by the plate's own top so it sits under the header
             rather than jammed against it. */
          scroll.scrollTop = hit ? Math.max(0, hit.offsetTop - 14) : 0;
        }
        if (x) x.focus();
      });
    }

    function shut() {
      if (!pop.classList.contains("on")) return;
      pop.classList.remove("in");
      pop.setAttribute("aria-hidden", "true");
      document.body.classList.remove("nav-open");
      /* Held open for the length of the fade, then dropped from the flow —
         hiding it immediately would cut the transition off at the knees. */
      shutTimer = setTimeout(function () {
        pop.classList.remove("on");
        mark(null);
      }, 320);
      if (opener) { opener.focus(); opener = null; }
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-cclose]")) { shut(); return; }
      var trig = e.target.closest("[data-camps]");
      if (!trig) return;
      e.preventDefault();
      open(trig, trig.getAttribute("data-camp") || "");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") shut();
      /* Tab is kept inside the panel while it is up. The faculty panel gets
         away without this because it is the shorter of the two; this one has
         five plates and ten links in it, and tabbing out of an open dialog
         into a page that cannot be scrolled is a dead end. */
      if (e.key !== "Tab" || !pop.classList.contains("on")) return;
      var f = box.querySelectorAll('a[href],button:not([disabled])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();

  });
});



/* Every silver outline takes the exact corner radius of the element it
   traces, measured from that element, so it sits on the edge at the corners
   too instead of cutting across them. Re-fitted when cards are added or the
   window changes size. */
(function () {
  var touch = !!(window.matchMedia && window.matchMedia("(hover:none)").matches);
  var io = touch && "IntersectionObserver" in window ? new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (!e.isIntersecting) return;
      var h = e.target;
      /* a small stagger so a row of buttons draws one after another */
      setTimeout(function () { h.classList.add("is-traced"); }, (h.__tIdx || 0) * 90);
      io.unobserve(h);
    });
  }, { threshold: 0.35 }) : null;
  function px(v, size) {
    v = String(v || "0").split(" ")[0];
    return v.indexOf("%") > -1 ? parseFloat(v) / 100 * size : parseFloat(v) || 0;
  }
  function fit(svg) {
    var host = svg.parentElement, rect = svg.firstElementChild;
    if (!host || !rect) return;
    var b = host.getBoundingClientRect();
    if (!b.width) return;
    var cs = getComputedStyle(host);
    /* an outline has to be measured against its own box, not a parent's */
    if (cs.position === "static") host.style.position = "relative";
    /* A box with its own border: the outline runs just inside it on the
       inner curve, and the border steps aside while the outline is drawn,
       so the edge reads as one line instead of a gold one and a silver one
       side by side. */
    var bw = parseFloat(cs.borderTopWidth) || 0;
    if (bw && cs.borderTopStyle !== "none") host.classList.add("has-edge");
    var iw = b.width - 2 * bw, ih = b.height - 2 * bw;
    var r = px(cs.borderTopLeftRadius, b.width) - bw;
    r = Math.max(0, Math.min(r, ih / 2, iw / 2) - 0.6);
    rect.style.rx = r + "px"; rect.style.ry = r + "px";
    /* The outline's own size set in pixels too. Some phone browsers keep an
       SVG rectangle at the size it had on first paint when it is given in
       percent, so a card that grows as its text and image load was left with
       an outline that stopped halfway down it. */
    var sw = host.clientWidth, sh = host.clientHeight;
    svg.style.width = sw + "px"; svg.style.height = sh + "px";
    svg.setAttribute("viewBox", "0 0 " + sw + " " + sh);
    rect.setAttribute("x", 0.6); rect.setAttribute("y", 0.6);
    rect.setAttribute("width", Math.max(0, sw - 1.2)); rect.setAttribute("height", Math.max(0, sh - 1.2));
    rect.style.width = Math.max(0, sw - 1.2) + "px"; rect.style.height = Math.max(0, sh - 1.2) + "px";
    if (ro && !host.__tRO) { host.__tRO = 1; ro.observe(host); }
  }
  /* Refit an outline whenever its box changes size, for whatever reason. */
  var ro = "ResizeObserver" in window ? new ResizeObserver(function (en) {
    en.forEach(function (e) {
      var svg = e.target.querySelector(":scope > .btn__trace");
      if (svg) fit(svg);
    });
  }) : null;
  function all() {
    var n = 0;
    [].forEach.call(document.querySelectorAll(".btn__trace"), function (svg) {
      fit(svg);
      var h = svg.parentElement;
      if (io && h && !h.__tWatch) { h.__tWatch = 1; h.__tIdx = (n++) % 4; io.observe(h); }
    });
  }
  var t = null;
  function soon() { clearTimeout(t); t = setTimeout(all, 120); }
  all();
  window.addEventListener("load", all);
  window.addEventListener("resize", soon);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(all);
  if ("MutationObserver" in window)
    new MutationObserver(function (m) {
      for (var i = 0; i < m.length; i++) if (m[i].addedNodes.length) { soon(); break; }
    }).observe(document.body, { childList: true, subtree: true });
})();
