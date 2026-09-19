#!/usr/bin/env python3
"""
Builds one 1200x630 JPEG share card per teacher: og-<id>.jpg

Why these exist at all: the teacher and lecture pages used to hand WhatsApp
and Facebook the teacher's portrait, a .webp, as the share image. Those
scrapers are unreliable with WebP, so links shared on WhatsApp — which is the
channel this site actually runs on — often previewed with no image at all.
A JPEG at the exact size the scrapers ask for fixes that, and the card can
carry the name and subject instead of just a face.

The roster is read from FACULTY_BAKED in index.html, the same single source of
truth the other two builders use. A teacher with no portrait gets the crest.

Run from the repo root whenever a teacher, a subject or a portrait changes:

    python3 build-og-cards.py

Needs Pillow:  pip install Pillow
"""
import os, re, sys

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    sys.exit("Pillow is not installed.  pip install Pillow")

OUT  = os.path.dirname(os.path.abspath(__file__))
W, H = 1200, 630

CREAM, GOLD, GOLD_HI, MUTED = (245,237,224), (201,152,47), (235,196,112), (188,170,158)

# ---- fonts ----------------------------------------------------------------
# Lora and Poppins stand in for the site's Playfair Display and Poppins. Any
# serif/sans pair will do; the card is laid out from measured text, so nothing
# overflows if the metrics differ.
SERIF_PATHS = ["/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf",
               "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
               "C:/Windows/Fonts/georgia.ttf", "/Library/Fonts/Georgia.ttf"]
ITAL_PATHS  = ["/usr/share/fonts/truetype/google-fonts/Lora-Italic-Variable.ttf",
               "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf",
               "C:/Windows/Fonts/georgiai.ttf", "/Library/Fonts/Georgia Italic.ttf"]
SANS_PATHS  = ["/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf",
               "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
               "C:/Windows/Fonts/segoeui.ttf", "/System/Library/Fonts/Helvetica.ttc"]
SANS_L_PATHS= ["/usr/share/fonts/truetype/google-fonts/Poppins-Light.ttf"] + SANS_PATHS

def _first(paths):
    for p in paths:
        if os.path.exists(p): return p
    sys.exit("No usable font found. Install DejaVu or point the *_PATHS lists at one.")

F_SERIF, F_ITAL, F_SANS, F_SANS_L = map(_first, (SERIF_PATHS, ITAL_PATHS, SANS_PATHS, SANS_L_PATHS))

def _font(path, size, weight=None):
    f = ImageFont.truetype(path, size)
    if weight:
        try: f.set_variation_by_axes([weight])
        except Exception: pass
    return f

SERIF_B = lambda s: _font(F_SERIF, s, 700)
SERIF_I = lambda s: _font(F_ITAL,  s, 400)
SANS_M  = lambda s: _font(F_SANS,  s)
SANS_L  = lambda s: _font(F_SANS_L, s)

# ---- the plate ------------------------------------------------------------
def backdrop():
    """The oxblood ground og-card.png is built on: warm top-left, deep
       bottom-right, and the faint band across the lower third."""
    bg = Image.new("RGB", (W, H), (52, 34, 31))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        fy = y / H
        for x in range(0, W, 4):
            t = (x / W) * .45 + fy * .55
            d.rectangle([x, y, x + 3, y],
                        fill=(max(int(64 - 44*t), 18), max(int(50 - 38*t), 10),
                              max(int(45 - 34*t), 10)))
    d.rectangle([0, 430, W, 433], fill=(72, 52, 40))
    return bg.filter(ImageFilter.GaussianBlur(1.2))

def rounded(im, r):
    m = Image.new("L", im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, im.size[0]-1, im.size[1]-1], r, fill=255)
    out = im.convert("RGBA"); out.putalpha(m); return out

def cover(im, box):
    """Fill the frame without distorting, cropped a little above centre so the
       face sits where a face should."""
    bw, bh = box
    s = max(bw / im.width, bh / im.height)
    im = im.resize((max(1, int(im.width*s)), max(1, int(im.height*s))), Image.LANCZOS)
    x = (im.width - bw)//2; y = int((im.height - bh) * .22)
    return im.crop((x, y, x+bw, y+bh))

def fit(draw, text, maker, start, maxw, floor=26):
    """Shrink until it fits — 'Sir Javed Khan Afridi' is a lot wider than
       'Sir Umar Soni' and neither should be clipped."""
    s = start
    while s > floor:
        f = maker(s)
        if draw.textlength(text, font=f) <= maxw: return f
        s -= 2
    return maker(floor)

BASE = backdrop()

def card(tid, name, subject, lines, group, out):
    im = BASE.copy(); d = ImageDraw.Draw(im)
    PX, PY, PW, PH = 64, 62, 430, 506
    src = os.path.join(OUT, tid + ".webp")
    if os.path.exists(src):
        p = rounded(cover(Image.open(src).convert("RGB"), (PW, PH)), 20)
    else:
        plate = Image.new("RGB", (PW, PH), (42, 12, 14))
        c = Image.open(os.path.join(OUT, "crest-480.webp")).convert("RGBA")
        c.thumbnail((300, 300), Image.LANCZOS)
        plate.paste(c, ((PW-c.width)//2, (PH-c.height)//2), c)
        p = rounded(plate, 20)
    im.paste(p, (PX, PY), p)
    d.rounded_rectangle([PX, PY, PX+PW, PY+PH], 20, outline=(150, 112, 44), width=2)

    TX = PX + PW + 58; TW = W - TX - 64
    d.text((TX, 96), (group or "Cambridge Online").upper(), font=SANS_M(19), fill=GOLD)
    d.line([TX, 130, TX + 54, 130], fill=GOLD, width=2)

    fn = fit(d, name, SERIF_B, 62, TW, 34)
    d.text((TX, 150), name, font=fn, fill=CREAM)
    y = 150 + fn.size + 26
    fs = fit(d, subject, SERIF_I, 36, TW, 22)
    d.text((TX, y), subject, font=fs, fill=GOLD_HI)
    y += fs.size + 26
    for line in lines[:2]:
        fl = fit(d, line, SANS_L, 23, TW, 15)
        d.text((TX, y), line, font=fl, fill=MUTED); y += fl.size + 12

    d.line([TX, 500, TX + 150, 500], fill=(130, 96, 40), width=1)
    d.text((TX, 522), "Cambridge Online  \u00b7  SWK Solutions", font=SANS_L(21), fill=MUTED)
    d.text((TX, 556), "cambridgeonline.tech", font=SANS_M(21), fill=GOLD)
    im.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    return os.path.getsize(out)

# ---- the roster, from the one source of truth -----------------------------
idx = os.path.join(OUT, "index.html")
if not os.path.exists(idx):
    sys.exit("index.html not found. Run this from the repo root.")
PAGE = open(idx, encoding="utf-8", errors="surrogateescape").read()
i = PAGE.find("const FACULTY_BAKED")
if i < 0: sys.exit("FACULTY_BAKED not found in index.html")
body = PAGE[i:PAGE.find("\n];", i)]

def _un(x):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), x).replace('\\"', '"')

written = 0
for blk in re.split(r'\n  \{ id:', body)[1:]:
    blk = "id:" + blk
    g = lambda k: _un((re.search(k + r':\s*"((?:[^"\\]|\\.)*)"', blk) or [None, ""])[1])
    lv = re.search(r'levels:\s*\[(.*?)\]', blk, re.S)
    levels = [_un(x) for x in re.findall(r'"([^"]+)"', lv.group(1))] if lv else []
    lines = ([" \u00b7 ".join(levels)] if levels else []) + ([g("tag")] if g("tag") else [])
    out = os.path.join(OUT, f"og-{g('id')}.jpg")
    kb = card(g("id"), g("name"), g("subject"), lines, g("group"), out)
    print(f"  og-{g('id')}.jpg  {kb//1024} KB")
    written += 1

if not written: sys.exit("parsed 0 teachers")
print(f"\nwrote {written} share cards")
print("The teacher and lecture pages pick these up on their next build.")
