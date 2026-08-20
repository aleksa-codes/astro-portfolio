import AngryBirdsPro from "@/assets/games/angry-birds-pro.png"
import CsFySnow from "@/assets/games/cs-fy-snow.png"
import DoodleJump from "@/assets/games/doodle-jump.png"
import DxBall from "@/assets/games/dx-ball.png"
import FlappyBird from "@/assets/games/flappy-bird.png"
import FruitNinjaFlash from "@/assets/games/fruit-ninja-flash.png"
import MiniGolf from "@/assets/games/mini-golf.png"
import WhackAMole from "@/assets/games/whack-a-mole.png"

export interface Game {
  /** Used for the shareable modal hash URL, e.g. #play-flappy-bird */
  slug: string
  title: string
  description: string
  /** AI model that wrote the game */
  model: string
  /** Prompt used to generate it */
  prompt: string
  /** Path to the single-file game inside public/arcade/ */
  file: string
  tags?: string[]
  /** YYYY-MM, used to sort newest first */
  date?: string
  /** Optional screenshot from src/assets/games/ */
  image?: ImageMetadata
}

interface ModelBadge {
  icon: string
  color: string
}

const providerBadges: Record<string, ModelBadge> = {
  claude: { icon: "simple-icons:claude", color: "#D97757" },
  anthropic: { icon: "simple-icons:anthropic", color: "#D97757" },
  deepseek: { icon: "simple-icons:deepseek", color: "#4D6BFE" },
  gemini: { icon: "simple-icons:googlegemini", color: "#1C7CF4" },
  openai: { icon: "simple-icons:openai", color: "#10A37F" },
  gpt: { icon: "simple-icons:openai", color: "#10A37F" },
  ollama: { icon: "simple-icons:ollama", color: "#6B7280" },
}

const defaultBadge: ModelBadge = { icon: "lucide:sparkles", color: "" }

export function getModelBadge(model: string): ModelBadge {
  const lower = model.toLowerCase()
  for (const [key, badge] of Object.entries(providerBadges)) {
    if (lower.includes(key)) return badge
  }
  return defaultBadge
}

export const games: Game[] = [
  {
    slug: "angry-birds-pro",
    title: "Angry Birds Pro",
    description:
      "Armed with the slingshot, you take on collapsible wood, stone, and glass towers. Chain TNT reactions and fire three birds with in-flight specials.",
    model: "DeepSeek V4 Pro 0813",
    prompt:
      'Write a complete, playable Angry Birds clone as one self-contained HTML file with vanilla JavaScript and Canvas. Name it "Angry Birds Pro" and show that title on the start screen. No external assets of any kind: everything procedural, no images, no fonts beyond system fonts, no sound files.\n\nCanvas fills the window and stays sharp on high-DPI displays. Fixed 60Hz timestep physics so it feels identical on 60Hz and 120Hz screens. Pause automatically when the tab loses focus, plus P/Esc pause, R restart, M mute.\n\nPHYSICS: custom impulse-based solver, no libraries. Axis-aligned box bodies (blocks) and circle bodies (pigs, birds), gravity 500, slight air drag on birds, velocity damping 0.998 for blocks, 10 solver iterations with 0.4 positional correction, velocity-dependent restitution (0 below vn 200, 0.15 above), friction 0.5. Box-box contacts resolve with a vertical bias (only resolve horizontally when ox < oy*0.5) so stacks never eject sideways. Sleeping: bodies fall asleep after 40 frames below speed 14 only when a probe point below them hits support, and they wake when they lose support or take a real impulse. Sleeping bodies act as infinite mass in mixed pairs and wake when an impulse would change their velocity by more than 60. When a circle\'s center is inside a box, only the circle is pushed out, never the box. Ground clamp with restitution only above vy 200, plus a final post-solver ground pass. Slow bodies in contact bleed velocity at 0.9 per frame (resting contact damping). Impact damage = max(0, vn - 160) * 0.35 * sqrt(attacker mass); birds take damage above vn 320 instead. Materials: wood (hp 120, mass 1.5, planks 38x150 vertical / 150x38 horizontal), stone (hp 260, mass 3, 60x130 / 130x60), glass (hp 40, mass 1, 28x120 / 120x28), TNT (hp 30, 50x50, explodes on vn > 110 or hp <= 0: 160 radius, 40+160*falloff damage, 320*falloff impulse, smoke, screen shake, chain reactions). Pigs: small r22 hp80 mass1.2, medium r30 hp140 mass1.8, large r38 hp200 mass2.6, worth 5000 each. Blocks: wood 500, stone 800, glass 300, TNT 1000.\n\nSLINGSHOT: at x 150 on a ground line at y 700, pocket at (178, 616), prong tips at (160, 574) and (160, 658). Drag the waiting bird (grab radius 70 world units), constrain pull to 140 max with dy capped at 95 and dx capped at 30, release launches at power 940/140; pulls under 24 units cancel. Show trajectory dots while aiming (free-flight simulation of the launch vector). After launch the rubber band wobbles and decays. Camera: fit the whole level when wide; on portrait phones zoom so the full level height is visible and pan the camera to follow the flying bird, returning to the slingshot between shots. World ~1500-1550 wide, 800 tall, ground at 700.\n\nBIRDS: Red (r22, mass 5, hp 100, no special), Chuck (yellow triangle-dart body r24, tap after launch to dash to 1350 in the current direction, 0.4s invulnerable, double damage for 0.5s, yellow burst), Blues (r16, tap after launch to split into three r10 shards of mass 1.5 fanned at 0.14 rad, blue burst). Tap works on desktop and mobile. Birds poof with feathers after settling 1.4s below speed 30, leaving bounds, or 25s. Draw a "TAP!" indicator over special birds in flight.\n\nLEVELS: hand-built with builder helpers col(x, yBottom, mats) for vertical stacks, beam(x, yBottom, mats) for horizontal rows, pig(x, yBottom, size). Every beam box must have a column top overlapping its bottom so it stays supported. Six levels: 1) First Flight: two 2-plank wood columns with a 2-box wood beam, pig on top, pig inside, ground pig, 4 red birds. 2) Stone Cold: stone columns + 2-box stone beam with pig on top, glass shelter with pig on top and inside, 4 red birds. 3) TNT Trouble: wood tower with TNT on the beam and pig inside, stone+wood shelter with ground TNT, 5 pigs, red/chuck/chuck/red. 4) Glass House: three-storey glass tower, wood ground floor and two glass floors (2 boxes each), pigs on each floor, TNT underneath, red/blues/blues/red. 5) The Fortress: three stone columns, stone roof beam with wood beam above and a pig on top, TNT between the columns, plus a glass shelter, 5 pigs, red/chuck/blues/red/chuck. 6) Twin Towers: two fortresses with TNT on beams and inside, a stone pillar with pig on top and TNT beside it, 6 pigs, red/chuck/blues/chuck/red/blues. Stars: 2 for 60% and 3 for 88% of max potential score (pigs + blocks + 10000 per unused bird).\n\nPRESENTATION: bright sky gradient with sun glow, drifting procedural clouds, parallax hills, grass ground with dirt below and tufts. Slingshot drawn as a dark wood Y with wrap-around bands. Blocks with material-specific fills, grain/speckles/shine, and crack overlays below 66%/33% hp; TNT has a bomb emblem and spark. Pigs: green with ears, snout, nostrils, blinking eyes, crack/bruise states; they pop into green particles. Birds drawn with angry eyebrows, beaks, tail feathers, facing their velocity. Damage flash = brief white overlay. Score popups float and fade. HUD: SCORE top-left, LEVEL NAME top-center, bird queue icons bottom-left, DOM buttons top-right (PAUSE, RESTART, SOUND). DOM overlays: start screen with title "ANGRY BIRDS PRO" (PRO in amber), level progress and star total, play button; level complete screen with three animated stars, score, best, next/replay; failed screen; pause screen. All overlays match a chunky flat style: dark text #2f2a22 on white overlay, #8bc34a pill buttons with 5px hard shadow, Trebuchet MS.\n\nAUDIO: all synthesized with WebAudio, created lazily on first gesture: launch whoosh, stretch creaks, impact thuds pitched by speed, material break sounds (wood bandpass 1400, stone low thump, glass high tink), pig pop, TNT boom, Chuck zap, Blues triple chirp, win arpeggio, lose descent. Master gain 0.5, mute persisted in localStorage. Persist progress (highest unlocked level), stars per level, best scores per level, and mute, all under abp-* keys in try/catch.\n\nUnified Pointer Events for mouse and touch, touch-action none, no context menu, pointer capture on the canvas. Space/Enter to start or trigger the special, hints fade out after 4s per level.',
    file: "/arcade/angry-birds-pro.html",
    image: AngryBirdsPro,
    tags: ["Canvas", "Physics", "Arcade"],
    date: "2026-08",
  },
  {
    slug: "fruit-ninja-flash",
    title: "Fruit Ninja Flash",
    description:
      "Slice fruit into spinning halves, chain combos, and never touch a bomb. Juicy canvas rendering, synthesized sound, and multi-touch blades.",
    model: "DeepSeek V4 Flash 0731",
    prompt:
      'Write a Fruit Ninja clone as one self-contained HTML file, no dependencies and no sound files. Name it "Fruit Ninja Flash" and show that title on the start screen.\n\nCanvas, with the playfield resizing to fit any window, sharp on high-DPI displays. Fruit physics on a fixed 60Hz timestep so it feels identical on 60Hz and 120Hz screens, and the game pauses automatically when the tab loses focus and when the user presses P. Everything procedural, drawn in canvas: fruits, bombs, sliced halves, juice particles, blade trails, HUD. Game text uses system fonts only, no external assets of any kind.\n\nMostly-portrait canvas: fruits are launched from the bottom edge of the screen from three spawn zones (left, right, center), each aimed with an initial upward velocity so their parabolic apex lands at a random point in the upper third to half of the screen, with a random tumble rotation. Gravity scales with screen height. Fruit sizes scale with the smaller screen dimension.\n\nSix fruit types with visually distinct canvas rendering: a large striped watermelon, an orange with pored skin and a stem, a red apple with a leaf, an oval lemon, an oval fuzzy kiwi, plus a rare glowing golden star fruit. Each fruit gets a radial-gradient rind, a rim stroke, and a sheen highlight, and rotates while in flight.\n\nSlicing: the player\'s pointer draws a white blade trail that fades over about 140ms. Movement between the previous and current pointer position is tested as a line segment against each fruit\'s circle so fast swipes never skip over a fruit. Slicing requires at least 3px of movement; holding still cuts nothing. A sliced fruit is removed from the in-flight list instantly at the moment of the cut, so the falling body can never be mistaken for a miss and never costs a life; only an unsliced fruit that falls off the bottom does. On desktop the mouse is the blade and on mobile every finger is an independent blade via Pointer Events, with touch-action none so the page never scrolls or zooms.\n\nWhen a fruit is sliced it splits into two semicircular halves: each half is drawn as a rind-colored semicircle with a concentric smaller flesh-color semicircle so the cut face reads as a rind crescent around the flesh, with per-type interior details (watermelon seeds, apple pips, citrus segment lines, a kiwi seed ring). The halves fly apart along the cut normal, spin at random speeds, and fall under gravity. Each slice sprays a burst of flesh-colored juice droplets that arc down and shrink.\n\nBombs never spawn before the ninth fruit has been thrown, then appear at a rate climbing from 5% toward 18%: black spheres with a skull emblem, a fuse, and an ember spark particle. Slicing a bomb triggers a screen shake, a white flash, a shockwave ring, a "BOOM" popup, clears the field, plays a low boom sound, and ends the game immediately. A whole fruit that falls off the bottom costs one of three lives, shown as small watermelon-slice icons in the top-right; losing all three ends the game.\n\nScoring: fruits are worth 1 point, the golden star is worth 10, and chaining two or more slices within 0.9 seconds adds a combo bonus of 2 points per extra fruit, with a "COMBO xN" popup from three onwards; popups rise and fade with an overshoot ease. Best score and mute preference persist in localStorage wrapped in try/catch.\n\nKeep the pace friendly: fruits launch slightly slower than full speed so first-time players can actually hit them, the spawn interval starts at 0.75s and compresses toward 0.3s, and double throws only start after 40 seconds with triple throws after 65 seconds.\n\nThree screens as DOM overlays on the canvas: a start screen with the title "FRUIT NINJA FLASH" (FLASH in a gold gradient), a play button, instructions, and best score; a game over screen with score, best, a NEW BEST badge, and a play again button; and a pause banner. HUD during play: big score top-left with best beneath, a mute button top-right. A small hint line fades out during the first four seconds of play. Keyboard: Space or Enter start, P pauses, M toggles mute.\n\nSynthesize all sound with WebAudio, created lazily on first user gesture: a bandpass noise swish when a swipe moves during play, a slice splat pitched by fruit size, a rising arpeggio for combos, a sparkle run for the golden fruit, a descending thud for a miss, a low boom for bombs, and descending tones on game over. Mute toggle with a speaker icon button.',
    file: "/arcade/fruit-ninja-flash.html",
    image: FruitNinjaFlash,
    tags: ["Canvas", "Slicing", "Arcade"],
    date: "2026-08",
  },
  {
    slug: "mini-golf",
    title: "Sky Links Mini Golf",
    description:
      "Six little holes on islands that float. Low-poly, unhurried, and the only game here you can play with one thumb without getting your heart rate up.",
    model: "Claude Opus 5",
    prompt:
      "Build a low-poly 3D mini golf game as one self-contained HTML file, using Three.js from a CDN. Cosy rather than twitchy, and it has to work properly on a phone, so no pointer lock and no keyboard requirement.\n\nSix hand-built holes on islands floating in a pastel sky, each one its own drifting rock with a grassy top, waterfalls spilling off the edges into nothing, low-poly trees, and slow clouds. Everything procedural, no model or texture files anywhere.\n\nOne drag does the whole shot: sideways swings the aim around the ball, pulling back charges the power, letting go putts, and releasing at almost no power just cancels so you can look around freely. Arrow keys aim and space charges on a desktop. A button eases the camera up to a top-down view so you can scout the hole before you commit.\n\nAuthor the holes as character grids, one letter per cell for green, fairway, rough, sand, water and empty, plus a second grid of digits for the height, so slopes and ramps fall out of the data. Corner heights get averaged from the neighbouring cells, which turns the grid into a smooth heightfield the ball can roll across. Rails go around the edges automatically, except where a capital letter marks an edge you are meant to be able to fall off.\n\nBall physics on a fixed 60Hz timestep: it rolls along the surface, accelerates down slopes, has different friction on each surface, goes airborne off ramps and ledges, and bounces off the rails. Substep the movement so a hard putt can never tunnel through a rail. A ball arriving at the cup too fast rims out and runs on rather than dropping, and the sideways nudge must not point back along the approach or it just brakes the ball into the hole. Water and falling off cost a stroke and put you back on dry land, and a hopeless hole gets picked up rather than looping forever.\n\nRamp the six holes: a straight uphill to learn power, a dogleg to learn banking, a bunker across the direct line, a raised bridge you can fall off next to a longer safe route, a windmill whose blades gate a narrow corridor, and a multi-tier finish with a water channel and the cup near an open edge. Par for each, a scorecard at the end naming birdies and bogeys, and the best round kept in localStorage.\n\nSynthesise all the sound with WebAudio so it stays one file: the tock of the putt pitched by power, rolling noise that tracks the ball's speed, a rattle and chime when it drops, a splash, and a bed of soft wind with the odd bird. Mute button, and pause when the tab loses focus.",
    file: "/arcade/mini-golf.html",
    image: MiniGolf,
    tags: ["Three.js", "Mini golf", "Cozy"],
    date: "2026-07",
  },
  {
    slug: "dx-ball",
    title: "DX-Ball Clone",
    description:
      "The brick breaker I lost hours to in the early 2000s. Beveled bricks over a starfield, a paddle that puts spin on the ball, and ten layouts that keep coming back faster.",
    model: "Claude Opus 5",
    prompt:
      "Write a simpler DX-Ball clone as one self-contained HTML file, no dependencies and no sound. It was my favourite brick breaker as a kid.\n\nCanvas, and the playfield has to adapt to whatever it is embedded in: keep a roughly constant play area but match the frame's aspect exactly, so it is wide like the original on a desktop and tall on a phone in portrait, never letterboxed and never stretched. Stay sharp on high-DPI displays.\n\nMouse or arrow keys move the paddle on desktop, drag anywhere to move and tap to launch on mobile. The ball rests on the paddle at the start of every life until you serve it. Where the ball lands on the paddle sets the deflection angle across about 60 degrees either way, the paddle's own movement adds a little english, and the ball is never allowed to travel perfectly vertically, otherwise a ball that has punched a tunnel bounces up and down through it forever.\n\nTen hand-built brick layouts: solid rows, a pyramid, a checkerboard, a tunnel, a diamond, an arch, a zigzag, a gold-framed fortress, a smiley and a wave. Coloured bricks die in one hit, silver ones take a few, gold ones never break and do not count toward clearing the level. After the tenth layout they repeat with a faster ball and tougher silver. Two power-ups fall from broken bricks, multi-ball and a wide paddle. Three lives, an extra one every 20,000 points, a combo multiplier for consecutive bricks without touching the paddle, and the best score kept in localStorage.\n\nGive it a 90s look: deep space background with a drifting starfield and a faint nebula, chunky beveled bricks with a light top edge and a dark bottom edge, a metallic blue paddle with a specular highlight, a glowing ball with a short trail, coloured shards when a brick breaks, a chunky pixel HUD, and a subtle CRT scanline and vignette pass over the whole thing. Run the physics on a fixed 60Hz timestep so it feels identical on 60Hz and 120Hz screens, and pause automatically when the tab loses focus.",
    file: "/arcade/dx-ball.html",
    image: DxBall,
    tags: ["Canvas", "Brick breaker", "Retro"],
    date: "2026-07",
  },
  {
    slug: "doodle-jump",
    title: "Doodle Jump Clone",
    description:
      "The endless vertical bouncer from the early smartphone days. Notebook paper, a green critter, moving and crumbling platforms, and one more try.",
    model: "Claude Opus 5",
    prompt:
      "Write a Doodle Jump clone as one self-contained HTML file, no dependencies and no sound. I loved that game as a kid.\n\nCanvas, portrait play area that scales to fit any screen and stays sharp on high-DPI displays. The jumper falls under constant gravity and bounces automatically off any platform it lands on, so the only input is horizontal: arrow keys or A/D on desktop, drag and device tilt on mobile. Walking off one edge wraps you around to the other.\n\nPlatforms are generated procedurally above the player and get harder the higher you climb, with wider gaps and more of the tricky kinds. Four types: normal, moving ones that slide side to side, breakable ones that give you the bounce and then crumble away underneath you, and springs that launch you far past a normal jump.\n\nThe camera follows once the player passes the upper third, score is your altitude, and the best score persists in localStorage. Falling off the bottom ends the run and shows a restart screen.\n\nGive it a hand-drawn notebook-paper look, ruled lines that scroll with the camera, a rounded green critter drawn entirely in canvas that squashes on each bounce and faces the way it is moving, and small particle puffs when a platform breaks or a spring fires. Run the physics on a fixed 60Hz timestep so it feels identical on 60Hz and 120Hz screens.",
    file: "/arcade/doodle-jump.html",
    image: DoodleJump,
    tags: ["Canvas", "Endless", "Vertical platformer"],
    date: "2026-07",
  },
  {
    slug: "cs-fy-snow",
    title: "CS 1.6 Clone: fy_snow",
    description:
      "A browser take on the classic Counter-Strike 1.6 fun map: a blocky snowy arena, three weapons, bots that shoot back, and that green HUD.",
    model: "Gemini 3.1 Pro",
    prompt:
      "Build a browser version of the Counter-Strike 1.6 fun map fy_snow in one HTML file, using Three.js from a CDN. First person view with pointer lock mouse look, WASD movement and jumping, and a snowy blocked-out arena built from boxes and crates with procedurally generated brick and crate textures, fog and snowfall.\n\nGive me three weapons to switch between, an AK-47, an AWP with a scope overlay when you right click, and a Desert Eagle, each with its own damage, fire rate, recoil and reload. Enemy bots patrol the map, take damage by hitbox and shoot back. Round based: clear the enemies to win, with a kill feed and a red damage flash when you get hit.\n\nHUD in the classic green Counter-Strike style with health, ammo, enemies left and a round timer, plus a start menu with the controls.",
    file: "/arcade/cs-fy-snow.html",
    image: CsFySnow,
    tags: ["Three.js", "First-person", "Shooter"],
    date: "2026-07",
  },
  {
    slug: "whack-a-mole",
    title: "Cute Whack-a-Mole",
    description:
      "A grid of holes, a mole that will not sit still, and 30 seconds on the clock. Deceptively addictive.",
    model: "Gemini 3 Pro",
    prompt:
      "Create a cute whack-a-mole game in a single HTML file, built with plain DOM elements and CSS rather than canvas. A 3x3 grid of round holes on a grassy green background, and a mole that pops up in a random hole every 800ms, never the same hole twice in a row. Click a mole to score a point and make it disappear.\n\nDraw the mole as an inline SVG data URI, brown with big eyes and a pink nose, so the whole thing stays one file with no image assets. Give it a 30 second countdown, a live score, a start button, and a game over message when the timer runs out.",
    file: "/arcade/whack-a-mole.html",
    image: WhackAMole,
    tags: ["DOM", "Arcade", "Casual"],
    date: "2026-07",
  },
  {
    slug: "flappy-bird",
    title: "Flappy Bird Clone",
    description:
      "The pipe-dodging classic, rebuilt on Phaser with generated pixel-art sprites, gravity, and pipes that never stop coming.",
    model: "Gemini 3 Pro",
    prompt:
      "Write a Flappy Bird clone in one HTML file using Phaser 3 from a CDN. Arcade physics with gravity, space or click to flap, pairs of green pipes spawning every 1.5 seconds with a 200px gap at a random height, and scrolling ground.\n\nDon't load any image files: generate the bird, pipes and background as textures at runtime with the graphics API, pixel-art style, yellow bird with an orange beak against a light blue sky. Score a point for each pipe you pass, show it on screen, and on collision freeze the game and show a restart button.",
    file: "/arcade/flappy-bird.html",
    image: FlappyBird,
    tags: ["Phaser", "Endless", "Retro"],
    date: "2026-07",
  },
]
