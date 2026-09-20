#!/usr/bin/env python3
"""
Builds the faculty composition — a designed arrangement of the existing
portraits, not a photograph of people standing together.

The distinction matters. Every face here was photographed alone against the
same plinth; compositing them into a group shot would be inventing a scene
that never happened, of real identifiable people, on their employer's site.
So this is deliberately a layout: portraits sit in their own framed cells with
gold rules between them, the way a printed faculty board reads. Nobody
mistakes it for a snapshot.

Sir Waqas Khan takes the centre at roughly twice the width, as the founder
and the teacher the academy is named for. The other two distinction holders
flank him. Sir Umar Sheikh appears as the drawn slot, because he asked not to
have a portrait published and that holds here too.
"""
import json, os, math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = os.path.dirname(os.path.abspath(__file__))
F = json.load(open('/home/claude/fac.json'))
GOLD = (176, 130, 31)
GOLD_HI = (214, 176, 112)

# Height is computed, not guessed — fifteen cells at five a row is three
# rows, and the first version cropped the last one off the bottom.
W = 2000
PAD = 54

def load(rec, w, h):
    """A portrait cell, or the drawn slot where there is no portrait."""
    if rec['photo']:
        im = Image.open(os.path.join(OUT, rec['id'] + '.webp')).convert('RGB')
        # the source is 1000x625; crop toward the head rather than the plinth floor
        sw, sh = im.size
        tgt = w / h
        if sw / sh > tgt:
            nw = int(sh * tgt); im = im.crop(((sw - nw) // 2, 0, (sw + nw) // 2, sh))
        else:
            nh = int(sw / tgt); top = int(sh * 0.02)
            im = im.crop((0, top, sw, min(sh, top + nh)))
        return im.resize((w, h), Image.LANCZOS)
    # no portrait: the plinth with the same drawn figure the site uses
    base = Image.open(os.path.join(OUT, '_plinth.webp')).convert('RGB').resize((w, h), Image.LANCZOS)
    d = ImageDraw.Draw(base, 'RGBA')
    cx, cy, r = w // 2, int(h * 0.40), int(min(w, h) * 0.13)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(143, 216, 196, 150), width=max(2, w // 130))
    d.arc([cx - int(r * 1.75), cy + int(r * 0.45), cx + int(r * 1.75), cy + int(r * 3.3)],
          200, 340, fill=(143, 216, 196, 150), width=max(2, w // 130))
    return base

def font(sz, bold=False):
    for p in ('/usr/share/fonts/truetype/dejavu/DejaVuSerif%s.ttf' % ('-Bold' if bold else ''),
              '/usr/share/fonts/truetype/liberation/LiberationSerif-%s.ttf' % ('Bold' if bold else 'Regular')):
        try: return ImageFont.truetype(p, sz)
        except Exception: pass
    return ImageFont.load_default()

def mono(sz):
    for p in ('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',
              '/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf'):
        try: return ImageFont.truetype(p, sz)
        except Exception: pass
    return ImageFont.load_default()

def cell(canvas, rec, x, y, w, h, hero=False):
    """One framed portrait with its name plate underneath."""
    plate = int(h * (0.20 if hero else 0.24))
    ph = h - plate
    canvas.paste(load(rec, w, ph), (x, y))
    d = ImageDraw.Draw(canvas, 'RGBA')

    # gold hairline around the portrait, brighter for a distinction holder
    edge = GOLD_HI if rec['star'] else GOLD
    a = 210 if rec['star'] else 120
    d.rectangle([x, y, x + w - 1, y + ph - 1], outline=edge + (a,), width=2 if rec['star'] else 1)

    # the plate
    d.rectangle([x, y + ph, x + w - 1, y + h - 1], fill=(22, 13, 12, 235))
    d.line([(x, y + ph), (x + w, y + ph)], fill=edge + (a,), width=1)

    nm = rec['name']
    fs = int(h * (0.075 if hero else 0.085))
    fn = font(fs)
    while d.textbbox((0, 0), nm, font=fn)[2] > w - 26 and fs > 9:
        fs -= 1; fn = font(fs)
    d.text((x + w // 2, y + ph + int(plate * 0.30)), nm, font=fn,
           fill=(246, 241, 230), anchor="mm")

    sub = rec['subject'].upper()
    ms = max(8, int(h * (0.036 if hero else 0.042)))
    fm = mono(ms)
    while d.textbbox((0, 0), sub, font=fm)[2] > w - 22 and ms > 7:
        ms -= 1; fm = mono(ms)
    d.text((x + w // 2, y + ph + int(plate * 0.68)), sub, font=fm,
           fill=GOLD_HI, anchor="mm")

    if rec['star']:
        # drawn, not typed — the serif face has no star glyph and renders a box
        s_ = int(h * 0.030)
        cx0, cy0 = x + 15 + s_, y + 15 + s_
        pts = []
        for k in range(10):
            ang = math.pi / 2 + k * math.pi / 5
            rr = s_ if k % 2 == 0 else s_ * 0.42
            pts.append((cx0 + rr * math.cos(ang), cy0 - rr * math.sin(ang)))
        d.polygon(pts, fill=GOLD_HI + (235,))

# ---- background: the brocade, darkened so the portraits carry the eye -----
TOP_    = 176
ROW_H   = 440
CELL_H  = 300
GAP_    = 16
PAD_    = 54
ROWS    = math.ceil((len(F) - 3) / 5)
H = TOP_ + ROW_H + 26 + ROWS * (CELL_H + GAP_) + PAD_

bg = Image.open(os.path.join(OUT, 'brocade2-dark.png')).convert('RGB')
canvas = Image.new('RGB', (W, H))
for yy in range(0, H, bg.height):
    for xx in range(0, W, bg.width):
        canvas.paste(bg, (xx, yy))
canvas = Image.blend(canvas, Image.new('RGB', (W, H), (18, 10, 10)), 0.42)

# ---- order: Waqas centre, the other distinctions beside him ---------------
star = [r for r in F if r['star']]
rest = [r for r in F if not r['star']]
waqas = next(r for r in star if r['id'] == 'waqas-khan')
flank = [r for r in star if r['id'] != 'waqas-khan']

d = ImageDraw.Draw(canvas, 'RGBA')
head = font(60)
d.text((W // 2, 62), "The Faculty", font=head, fill=(246, 241, 230), anchor="mm")
d.text((W // 2, 112), "CAMBRIDGE ONLINE  \u00b7  SWK SOLUTIONS", font=mono(19),
       fill=GOLD_HI, anchor="mm")
d.line([(W // 2 - 190, 140), (W // 2 + 190, 140)], fill=GOLD + (160,), width=1)

TOP, GAP = TOP_, GAP_

# hero row: flank · Waqas (double width) · flank
row_h = ROW_H
hero_w = 820   # genuinely the widest cell, not merely centred
side_w = (W - 2 * PAD - hero_w - 2 * GAP) // 2
cell(canvas, flank[0], PAD, TOP, side_w, row_h)
cell(canvas, waqas, PAD + side_w + GAP, TOP, hero_w, row_h, hero=True)
cell(canvas, flank[1], PAD + side_w + GAP + hero_w + GAP, TOP, side_w, row_h)

# the remaining fifteen, five to a row
y = TOP + row_h + 26
cw = (W - 2 * PAD - 4 * GAP) // 5
ch = CELL_H
for i, rec in enumerate(rest):
    r, c = divmod(i, 5)
    cell(canvas, rec, PAD + c * (cw + GAP), y + r * (ch + GAP), cw, ch)

canvas.save(os.path.join(OUT, 'faculty-wall.webp'), 'WEBP', quality=88, method=6)
canvas.save('/home/claude/faculty-wall-preview.png')
print('faculty-wall.webp', canvas.size, os.path.getsize(os.path.join(OUT, 'faculty-wall.webp')), 'bytes')
