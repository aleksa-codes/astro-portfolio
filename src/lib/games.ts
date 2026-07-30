import CsFySnow from "@/assets/games/cs-fy-snow.png"
import DoodleJump from "@/assets/games/doodle-jump.png"
import FlappyBird from "@/assets/games/flappy-bird.png"
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

export const games: Game[] = [
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
