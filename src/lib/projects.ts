import AleksaPortfolio from "@/assets/projects/aleksa.codes.png"
import EasyWebsiteBlocker from "@/assets/projects/easy-website-blocker.png"
import EasyWebsiteGPT from "@/assets/projects/easy-websitegpt.png"
import FluxGhibsky from "@/assets/projects/flux-ghibsky.jpg"
import GptImgCaptioner from "@/assets/projects/gpt-img-captioner.png"
import NbaZone from "@/assets/projects/nbazone.png"
import NextWorkout from "@/assets/projects/next-workout.png"
import OneDarkModernPro from "@/assets/projects/one-dark-modern-pro.png"
import Portal from "@/assets/projects/portal.png"
import UnYellowGPT from "@/assets/projects/unyellow-gpt.png"

export const projects = [
  {
    title: "UnYellowGPT",
    description:
      "SaaS platform trusted by over 4,000 users that instantly fixes yellow tints and sepia filters in AI-generated images. Features advanced white balance and true color restoration.",
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
    demo: "https://unyellowgpt.com",
    featured: true,
    category: "Web Apps",
  },
  {
    title: "NBA Zone",
    description:
      "A fast, modern NBA dashboard presenting live standings, in-depth team statistics, latest schedules, and up-to-date NBA news and videos fetched via ESPN API and YouTube RSS.",
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
    featured: true,
    category: "Web Apps",
  },
  {
    title: "Flux Ghibsky Illustration",
    description:
      "Popular Flux LoRA for Ghibli-inspired landscapes, powering over 30,000 monthly generations across Hugging Face and Replicate.",
    tags: ["FLUX", "LoRA", "Stable Diffusion", "Text-to-Image", "AI"],
    image: FluxGhibsky,
    huggingface:
      "https://huggingface.co/aleksa-codes/flux-ghibsky-illustration",
    replicate: "https://replicate.com/aleksa-codes/flux-ghibsky-illustration",
    featured: true,
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
    featured: true,
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
      "Powerful productivity extension designed to eliminate digital distractions. Features highly customizable block lists and granular exceptions for deep, uninterrupted work sessions.",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Chrome API"],
    image: EasyWebsiteBlocker,
    github: "https://github.com/aleksa-codes/easy-website-blocker",
    category: "Browser Extensions",
  },
  {
    title: "Next Workout",
    description:
      "Modern fitness app providing AI-tailored workout plans and integrated rest timers. Features customizable routines, circuit options, and embedded video demonstrations.",
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
    featured: true,
    category: "AI & Tools",
  },
  {
    title: "aleksa.codes",
    description:
      "My personal portfolio and blog built with Astro for peak performance and SEO. Features a Decap CMS integration and an interactive AI site assistant.",
    tags: ["Astro", "TypeScript", "Tailwind CSS", "Decap CMS", "AI", "SEO"],
    image: AleksaPortfolio,
    demo: "https://aleksa.codes",
    github: "https://github.com/aleksa-codes/astro-portfolio",
    category: "Websites",
  },
]
