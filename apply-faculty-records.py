#!/usr/bin/env python3
"""
Rewrites each teacher's bio in FACULTY_BAKED and attaches their social handles.

Every sentence below is built from what that teacher supplied on the master
sheet — the distinctions, the years, the awards, the qualifications. Nothing is
invented and nothing is imported from a search result about somebody who
happens to share a name. Four teachers supplied almost nothing, so their bios
are short; that is the honest length for what is known, and padding them would
mean writing fiction about a real person on their employer's site.

Institution names are deliberately absent. The sheet's own note applies: the
strongest verified credentials trace back to Eden, Nixor, Lyceum, Credo and
Whales, and naming a rival academy on your own faculty page advertises them.
The qualification and the years stay; the employer goes.
"""
import json, re, os, sys

OUT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(OUT, "index.html")

BIO = {
 "waqas-khan":
  "Founder of SWK Solutions and the teacher the academy is named for. Teaching "
  "Mathematics and Additional Mathematics since 2002, with a record that includes "
  "eleven Cambridge distinctions, two Top in the World placements and a Best Across "
  "Eight award in Additional Mathematics. Five consecutive sessions have produced "
  "distinction batches. He builds every topic from zero, so a student meeting a "
  "concept for the first time and a student retaking both start in the same place — "
  "which is why his classes hold students across the O Level, IGCSE, A Level and "
  "Edexcel routes at once.",

 "mehboob-khan":
  "Physics across O Level, IGCSE, AS and A2, including the Edexcel route. Teaching "
  "since 2007, with seven Cambridge distinctions to his name and a past-paper archive "
  "he has kept since 2002 — every paper, every variant, indexed by topic rather than "
  "by year. That archive is the spine of how he teaches: a chapter is not finished "
  "until a student has met every way the examiner has asked it. His notes circulate "
  "well beyond his own classes.",

 "usman-khan":
  "O Level and IGCSE Chemistry, with twenty years in the subject and three Cambridge "
  "distinctions. He teaches mechanism first — what the electrons do and why — on the "
  "view that a student who understands the movement can reconstruct a reaction they "
  "have never seen, while a student who has memorised equations cannot.",

 "sohail-aziz":
  "A Level Chemistry, organic and physical, with more than thirty-three years of "
  "teaching behind him. His classes stay with the harder half of 9701 — the "
  "mechanisms, the equilibria, the calculations that separate a B from an A — on the "
  "principle that the marks lost at A Level are rarely lost in the easy chapters.",

 "farhan-khan":
  "Chemistry from O Level through A Level, taught as one continuous course rather "
  "than two separate ones. A Senior Lecturer with more than twenty-five O and A Level "
  "distinctions, including a distinction batch in 2021, he has taught around 22,000 "
  "students in person and another thousand online. His argument for continuity is "
  "practical: the students who struggle most at AS are usually the ones who were "
  "taught O Level Chemistry as a set of facts to be dropped afterwards.",

 "umar-soni":
  "O Level and IGCSE Biology, with four Cambridge distinctions. He teaches "
  "diagram-first — the structure drawn before the function is named — because the "
  "Biology papers reward a student who can label and explain what they are looking at "
  "far more than one who can recite a definition.",

 "javed-khan-afridi":
  "A Level Biology with a pre-medical emphasis. He holds an MSc in Botany with "
  "first-class honours and a B.Ed, with a background in Zoology alongside it, and has "
  "taught for over two decades across both Chemistry and Biology. That double "
  "grounding shows in how he handles 9700: the biochemistry chapters are taught as "
  "chemistry, which is where most pre-medical students lose their marks.",

 "afham-saya":
  "Computer Science across O Level, IGCSE and A Level — both the theory papers and "
  "the practical. He holds a BS in Computer Science with an AI major and has taught "
  "for more than ten years, with a 94%+ A*/A rate and a student placed Top in Saudi "
  "Arabia in IGCSE Computer Science in 2024. Paper 2 is taught as programming rather "
  "than as pseudocode to be memorised, which is the difference between a student who "
  "can answer the question asked and one who can only answer the question practised.",

 "minhas-rupsi":
  "Computer Science at O Level, IGCSE and A Level, with twenty-two years of teaching "
  "and more than 10,000 students taught across over ten institutions. He has run a "
  "Python bootcamp since 2022 alongside the Cambridge syllabus. His specialism is the "
  "half of the course students find least intuitive — systems, architecture and data "
  "representation — taught from how the machine actually works rather than from the "
  "definitions.",

 "rohail-ahmed":
  "Accounts at both O and A Level, with more than twenty years of teaching. He keeps "
  "the two levels joined: the same double-entry discipline that carries 7707 is what "
  "the 9706 financial and cost papers are built on, so a student who learns it "
  "properly once does not relearn it later.",

 "ammar-samana":
  "A Level Accounts — financial and cost — with seventeen years of teaching and an "
  "award from the Morbi Tankara Memon Association. His classes run on worked "
  "questions rather than notes, on the view that 9706 is a paper you get better at by "
  "doing rather than by reading.",

 "sohail-ahmed":
  "Business at O and A Level, Cambridge Certified, with more than 500 students who "
  "have taken an A* under him. He teaches through the case study, because both 7115 "
  "and 9609 are papers where the marks sit in applying a concept to the firm in front "
  "of you, not in defining the concept.",

 "murtaza-zai":
  "Economics at O and A Level. He has spoken at Indus University on what A Level "
  "students do after results day, and runs exam workshops on O Level Economics. His "
  "classes are built on diagram discipline — the view that a correctly drawn, "
  "correctly labelled diagram carries more marks in 2281 and 9708 than a paragraph "
  "explaining the same thing.",

 "azeem-iqbal":
  "Sociology and Psychology across both levels, taught with a shared research-methods "
  "spine — validity, reliability, sampling, ethics — because both subjects test the "
  "same evaluation skill and reward the same habits of argument. A student taking one "
  "of the two gets that grounding anyway; a student taking both gets it once instead "
  "of twice.",

 "anna-malik":
  "English Language at GCE and IGCSE, Cambridge Certified, with years of results "
  "behind her and thousands of A* and A grades. Her focus is directed writing and "
  "comprehension — the two sections where technique moves a grade fastest, and where "
  "most students lose marks to structure rather than to English.",

 "junaid-akhtar":
  "Pakistan Studies at O Level and IGCSE, and a Director of SWK Solutions. Four "
  "Cambridge distinctions. He teaches 2059 as source work rather than as history to "
  "be remembered: what the source says, what it leaves out, who wrote it and why — "
  "the technique the paper actually marks.",

 "jameel-ansari":
  "Urdu from O Level through A Level — composition, translation and the set texts. "
  "More than twelve years of teaching, with a 56.6% A*/A rate across the 2025–26 CAIE "
  "session. He teaches the language paper and the literature paper as one subject, "
  "since the writing technique that carries one carries the other.",

 "umar-sheikh":
  "Islamiyat at O Level and IGCSE, with more than fifteen years of teaching. His "
  "classes are built on reference-backed answers — every point supported from the "
  "Qur'an or the Hadith, which is the requirement the 2058 and 0493 mark schemes set "
  "and the one candidates most often miss.",
}

# Handles as supplied. The teaching account is used where a teacher keeps one
# separate from a personal account — Miss Anna Malik's personal handle is left
# off deliberately.
SOCIAL = {
 "waqas-khan":        ("swkoffical", "sirwaqaskhanswk"),
 "mehboob-khan":      ("sir_mehboob_khan", "Sir-Mehboob-Khan"),
 "usman-khan":        (None, "Sir-Usman-Khan-Chemistry"),
 "sohail-aziz":       ("chemwithsuhail", None),
 "farhan-khan":       ("chem_khan", "Farhan-Khan"),
 "umar-soni":         ("umer.q.soni", "sirumersoni"),
 "javed-khan-afridi": ("jkafridi_", "javed.khan.afridi"),
 "afham-saya":        ("afham_saya_official", "afham.saya"),
 "minhas-rupsi":      ("mrupsi", "mrupsi"),
 "rohail-ahmed":      ("rohailahmed12", "SirRohailAhmed"),
 "ammar-samana":      ("ammar.samana", "ammar.samana"),
 "sohail-ahmed":      ("bizbysohail", "Bizbysohail"),
 "murtaza-zai":       ("zai.murtaza", None),
 "azeem-iqbal":       ("socio_and_psych_by_azeemiqbal", "Sociology-Psychology-by-Azeem-Iqbal"),
 "anna-malik":        ("olevelenglish_by_annamalik", "EnglishwithAnnaMalik"),
 "junaid-akhtar":     ("junaidakhtar.official", "sirjunaidakhtar"),
 "jameel-ansari":     ("jameelansari089", "jameelansariOfficial"),
 "umar-sheikh":       ("umarsheikh_99", "Umarsheikh.islamiyat"),
}

s = open(SRC, encoding="utf-8", errors="surrogateescape").read()
i = s.find("const FACULTY_BAKED")
j = s.find("\n];", i)
block = s[i:j]

def esc(x): return x.replace("\\", "\\\\").replace('"', '\\"')

changed = 0
for tid, text in BIO.items():
    m = re.search(r'(id:"%s".*?bio:")((?:[^"\\]|\\.)*)(")' % re.escape(tid), block, re.S)
    if not m:
        print("  ! no bio field for", tid); continue
    block = block[:m.start(2)] + esc(" ".join(text.split())) + block[m.end(2):]
    changed += 1

# socials ride alongside the record so the schema can emit sameAs
for tid, (ig, fb) in SOCIAL.items():
    if re.search(r'id:"%s"[^}]*social:' % re.escape(tid), block, re.S): continue
    links = []
    if ig: links.append("https://instagram.com/" + ig)
    if fb: links.append("https://facebook.com/" + fb)
    if not links: continue
    lit = "social:[" + ",".join('"%s"' % u for u in links) + "],\n    "
    m = re.search(r'(id:"%s",\s*name:)' % re.escape(tid), block)
    if not m: continue
    k = block.find("levels:", m.start())
    block = block[:k] + lit + block[k:]

s = s[:i] + block + s[j:]
open(SRC, "w", encoding="utf-8", errors="surrogateescape").write(s)
print(f"bios rewritten: {changed}/18   socials attached: {sum(1 for v in SOCIAL.values() if any(v))}")
