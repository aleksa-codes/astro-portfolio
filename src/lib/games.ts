import CsFySnow from "@/assets/games/cs-fy-snow.png"
import DoodleJump from "@/assets/games/doodle-jump.png"
import DxBall from "@/assets/games/dx-ball.png"
import FlappyBird from "@/assets/games/flappy-bird.png"
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
