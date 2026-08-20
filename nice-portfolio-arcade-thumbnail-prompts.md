# Arcade thumbnails

Every thumbnail here shares one style so the `/arcade` grid reads as a set.
Generate a new one with the template below, save it here as `<slug>.png`, then
import it in `src/lib/games.ts` and set it as that game's `image`.

Cards render at 16:9 (`aspect-video`), so always ask for a wide image. Image
models default to square, which is why the aspect ratio is repeated so
insistently in the prompt.

## Template prompt

Replace only the SUBJECT line. Leave the STYLE block byte for byte identical,
that is what keeps the set consistent.

```text
Create a 16:9 landscape image (1920x1080 pixels, wide aspect ratio, NOT square).

STYLE (must be followed exactly, this is part of a matching set):
Flat minimal vector illustration. Near-black charcoal background (#111111) with
very subtle film grain. Subject is small and centered with generous negative
space around it. Thin, clean off-white (#f5f2ea) outlines and simple geometric
shapes only. One single accent color used sparingly: soft sage green (#8bc34a).
No gradients, no realism, no 3D, no photographic texture, no text, no letters,
no numbers, no logos, no UI chrome, no borders or frames. Restrained editorial
poster look, like a monochrome app icon blown up. Faint dotted grid texture in
the background at very low opacity.

SUBJECT: <one or two sentences describing the game as basic shapes. Name the
shapes, not the scene. Keep the sage green for the single character or focal
point and leave everything else as off-white outlines.>
```

## Adding to an existing set

Generate the first image with the full prompt above, then generate the rest in
the **same conversation** with this short follow-up, so the model carries the
style over instead of reinterpreting it:

```text
Same exact style, same 16:9 landscape 1920x1080 wide format, same charcoal
#111111 background, same thin off-white outlines, same single sage green
#8bc34a accent, same generous negative space, no text.

New subject: <the next game>
```

## Subjects used so far

| File               | SUBJECT line given                                                                                                                                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `doodle-jump.png`  | a vertical platformer. Three or four simple horizontal rounded bars floating at different heights, and a tiny simple rounded creature silhouette in sage green mid-jump between them, with a small arc line hinting at its upward bounce.                                                                                |
| `cs-fy-snow.png`   | a first person shooter. A simple thin off-white crosshair centered, four short lines with a gap in the middle, and behind it a few flat angular blocky shapes suggesting a snowy arena skyline, drawn as plain outlines. One small sage green dot or tick as the only accent.                                            |
| `whack-a-mole.png` | whack a mole. Three simple off-white ellipse outlines in a row representing holes, with one tiny rounded mole head in sage green peeking up out of the middle one, and a very simple mallet shape made of two rounded rectangles hovering above it.                                                                      |
| `flappy-bird.png`  | a side scrolling flappy bird game. Two vertical off-white rounded rectangle outlines like pipes, one hanging from the top and one rising from the bottom with a gap between them, and a tiny simple round bird shape in sage green with one small wing flying through the gap, plus a faint dotted arc showing its path. |

## The exact prompts used, verbatim

These are copy-paste ready. The first one was sent on its own, the other three
were sent as follow-ups in the same conversation, in this order.

### 1. Doodle Jump (the one that established the style)

```text
Create a 16:9 landscape image (1920x1080 pixels, wide aspect ratio, NOT square).

STYLE (must be followed exactly, this is the first of a matching set):
Flat minimal vector illustration. Near-black charcoal background (#111111) with very subtle film grain. Subject is small and centered with generous negative space around it. Thin, clean off-white (#f5f2ea) outlines and simple geometric shapes only. One single accent color used sparingly: soft sage green (#8bc34a). No gradients, no realism, no 3D, no photographic texture, no text, no letters, no numbers, no logos, no UI chrome, no borders or frames. Restrained editorial poster look, like a monochrome app icon blown up. Faint dotted grid texture in the background at very low opacity.

SUBJECT: a vertical platformer. Three or four simple horizontal rounded bars floating at different heights, and a tiny simple rounded creature silhouette in sage green mid-jump between them, with a small arc line hinting at its upward bounce.
```

### 2. CS 1.6 fy_snow

```text
Same exact style, same 16:9 landscape 1920x1080 wide format, same charcoal #111111 background, same thin off-white outlines, same single sage green #8bc34a accent, same generous negative space, no text.

New subject: a first person shooter. A simple thin off-white crosshair centered, four short lines with a gap in the middle, and behind it a few flat angular blocky shapes suggesting a snowy arena skyline, drawn as plain outlines. One small sage green dot or tick as the only accent.
```

### 3. Whack-a-Mole

```text
Same exact style, same 16:9 landscape 1920x1080 wide format, same charcoal #111111 background, same thin off-white outlines, same single sage green #8bc34a accent, same generous negative space, no text.

New subject: whack a mole. Three simple off-white ellipse outlines in a row representing holes, with one tiny rounded mole head in sage green peeking up out of the middle one, and a very simple mallet shape made of two rounded rectangles hovering above it.
```

### 4. Flappy Bird

```text
Same exact style, same 16:9 landscape 1920x1080 wide format, same charcoal #111111 background, same thin off-white outlines, same single sage green #8bc34a accent, same generous negative space, no text.

New subject: a side scrolling flappy bird game. Two vertical off-white rounded rectangle outlines like pipes, one hanging from the top and one rising from the bottom with a gap between them, and a tiny simple round bird shape in sage green with one small wing flying through the gap, plus a faint dotted arc showing its path.
```

## Notes

- The palette is deliberate: charcoal and off-white match the site's black and
  white design tokens, and the sage green ties back to the Doodle Jump critter.
- Keep the green for one focal element only. Two green things in a frame breaks
  the look immediately.
- Ask for no text. Image models render garbled letters, and the card already
  shows the title right underneath.
