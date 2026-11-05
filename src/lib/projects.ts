import AleksaPortfolio from "@/assets/projects/aleksa.codes.png"
import EasyWebsiteBlocker from "@/assets/projects/easy-website-blocker.png"
import EasyWebsiteGPT from "@/assets/projects/easy-websitegpt.png"
import FluxGhibsky from "@/assets/projects/flux-ghibsky.jpg"
import GptImgCaptioner from "@/assets/projects/gpt-img-captioner.png"
import MouseClickSound from "@/assets/projects/mouse-click-sound.png"
import NbaZone from "@/assets/projects/nbazone.png"
import NextLocalAIChat from "@/assets/projects/next-local-ai-chat.png"
import NextWorkout from "@/assets/projects/next-workout.png"
import OneDarkModernPro from "@/assets/projects/one-dark-modern-pro.png"
import Portal from "@/assets/projects/portal.png"
import UnYellowGPT from "@/assets/projects/unyellow-gpt.png"

export const projects = [
  {
    title: "Next Local AI Chat",
    description:
      "Chat locally with Ollama or oMLX, save conversations, attach images, compare models side by side, and use real-time voice with optional screen sharing.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel AI SDK",
      "Ollama",
      "SQLite",
      "Drizzle ORM",
    ],
    image: NextLocalAIChat,
    featuredOrder: 3,
    github: "https://github.com/aleksa-codes/next-local-ai-chat",
    category: "AI & Tools",
  },
  {
    title: "Mouse Click Sound",
    description:
      "Native macOS menu-bar app for tactile sounds on clicks, taps, holds, and drags, with volume controls, sound previews, launch-at-login, and Input Monitoring status.",
    tags: ["Swift", "macOS", "SwiftUI", "AppKit", "AVFoundation"],
    image: MouseClickSound,
    featuredOrder: 4,
    github: "https://github.com/aleksa-codes/mouse-click-sound",
    category: "AI & Tools",
  },
  {
    title: "UnYellowGPT",
    description:
      "AI image restoration SaaS trusted by 6,000+ users. Removes yellow and sepia casts with precise white balance and restores true color.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Neon",
      "DrizzleORM",
      "Better Auth",
      "Polar.sh",
    ],
    image: UnYellowGPT,
    featuredOrder: 1,
    demo: "https://unyellowgpt.com",
    category: "Web Apps",
  },
  {
    title: "NBA Zone",
    description:
      "A live NBA dashboard for standings, team stats, schedules, news, and videos, with data from ESPN and YouTube RSS.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
    ],
    image: NbaZone,
    github: "https://github.com/aleksa-codes/nba-zone",
    demo: "https://nbazone.vercel.app",
    category: "Web Apps",
  },
  {
    title: "Flux Ghibsky Illustration",
    description:
      "Popular FLUX LoRA for Ghibli-inspired landscapes and Makoto Shinkai skies, with 167,000+ Replicate runs and 300,000+ Hugging Face downloads.",
    tags: ["FLUX", "LoRA", "Stable Diffusion", "Text-to-Image"],
    image: FluxGhibsky,
    featuredOrder: 2,
    huggingface:
      "https://huggingface.co/aleksa-codes/flux-ghibsky-illustration",
    replicate: "https://replicate.com/aleksa-codes/flux-ghibsky-illustration",
    category: "AI & Tools",
  },
  {
    title: "GPT Image Captioner",
    description:
      "Advanced tool for generating highly detailed image descriptions. Optimized for AI LoRA model training with seamless batch processing and customizable outputs.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "OpenAI API",
      "Ollama",
    ],
    image: GptImgCaptioner,
    github: "https://github.com/aleksa-codes/gpt-flux-img-captioner",
    demo: "https://gptcaptioner.aleksa.codes",
    category: "AI & Tools",
  },
  {
    title: "Portal",
    description:
      "An infinite AI web inspired by Rick and Morty's Interdimensional Cable. Enter any URL or file path and explore it as if it exists.",
    tags: [
      "Astro",
      "TypeScript",
      "Tailwind CSS",
      "CSS",
      "Vercel AI SDK",
      "OpenAI",
      "Gemini",
      "Claude",
    ],
    image: Portal,
    github: "https://github.com/aleksa-codes/portal",
    demo: "https://portal.aleksa.codes",
    category: "AI & Tools",
  },
  {
    title: "Easy WebsiteGPT",
    description:
      "Innovative Chrome extension that enables interactive AI conversations directly with any webpage. Features real-time streaming responses and persistent chat history.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Chrome API",
      "OpenAI API",
    ],
    image: EasyWebsiteGPT,
    github: "https://github.com/aleksa-codes/easy-website-gpt",
    category: "Browser Extensions",
  },
  {
    title: "Easy Website Blocker",
    description:
      "Chrome extension for focus: block distracting sites with customizable lists and granular exceptions, making deep work easier.",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Chrome API"],
    image: EasyWebsiteBlocker,
    github: "https://github.com/aleksa-codes/easy-website-blocker",
    category: "Browser Extensions",
  },
  {
    title: "Next Workout",
    description:
      "AI-tailored workout plans, rest timers, customizable routines, circuit options, and exercise videos in one fitness app.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "localStorage",
      "ChatGPT",
    ],
    image: NextWorkout,
    github: "https://github.com/aleksa-codes/next-workout",
    demo: "https://nextworkout.aleksa.codes",
    category: "AI & Tools",
  },
  {
    title: "One Dark Modern Pro",
    description:
      "Sleek, modern VS Code theme inspired by Atom's One Dark Pro. Delivers a refined UI and vibrant syntax highlighting for an optimal developer experience.",
    tags: [
      "VS Code",
      "Dark Theme",
      "Syntax Highlighting",
      "Readability",
      "Developer Experience",
    ],
    image: OneDarkModernPro,
    github: "https://github.com/aleksa-codes/one-dark-modern-pro",
    demo: "https://marketplace.visualstudio.com/items?itemName=aleksa-codes.one-dark-modern-pro",
    category: "AI & Tools",
  },
  {
    title: "aleksa.codes",
    description:
      "My personal portfolio and blog built with Astro for peak performance and SEO. Features a Decap CMS integration and an interactive AI site assistant.",
    tags: [
      "Astro",
      "TypeScript",
      "Tailwind CSS",
      "Decap CMS",
      "Vercel AI SDK",
      "SEO",
      "Netlify",
      "Cloudflare",
    ],
    image: AleksaPortfolio,
    demo: "https://aleksa.codes",
    github: "https://github.com/aleksa-codes/astro-portfolio",
    category: "Websites",
  },
]
