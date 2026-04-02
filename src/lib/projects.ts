import AleksaPortfolio from "@/assets/projects/aleksa.codes.png"
import EasyWebsiteBlocker from "@/assets/projects/easy-website-blocker.png"
import EasyWebsiteGPT from "@/assets/projects/easy-websitegpt.png"
import FluxGhibsky from "@/assets/projects/flux-ghibsky.jpg"
import GptImgCaptioner from "@/assets/projects/gpt-img-captioner.png"
import NextMeal from "@/assets/projects/next-meal.png"
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
      "TailwindCSS",
      "shadcn/ui",
      "Neon",
      "DrizzleORM",
      "Better Auth",
      "Polar.sh",
      "SaaS",
    ],
    image: UnYellowGPT,
    demo: "https://unyellowgpt.com",
    featured: true,
    category: "Web Apps",
  },
  {
    title: "GPT Image Captioner",
    description:
      "Advanced tool for generating highly detailed image descriptions. Optimized for AI LoRA model training with seamless batch processing and customizable outputs.",
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
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
    title: "Easy WebsiteGPT",
    description:
      "Innovative Chrome extension that enables interactive AI conversations directly with any webpage. Features real-time streaming responses and persistent chat history.",
    tags: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "OpenAI API",
      "Chrome API",
    ],
    image: EasyWebsiteGPT,
    github: "https://github.com/aleksa-codes/easy-website-gpt",
    category: "Browser Extensions",
  },
  {
    title: "Next Workout",
    description:
      "Modern fitness app providing AI-tailored workout plans and integrated rest timers. Features customizable routines, circuit options, and embedded video demonstrations.",
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "ChatGPT",
      "localStorage",
    ],
    image: NextWorkout,
    github: "https://github.com/aleksa-codes/next-workout",
    demo: "https://nextworkout.aleksa.codes",
    category: "AI & Tools",
  },
  {
    title: "Portal",
    description:
      "Creative AI content generator heavily inspired by Rick and Morty's interdimensional portal technology. Instantly crafts imaginative documents with multi-model support (OpenAI, Gemini, Claude), and immersive CSS animations.",
    tags: [
      "Astro",
      "TypeScript",
      "CSS",
      "TailwindCSS",
      "Vercel AI SDK",
      "Gemini",
      "OpenAI",
      "Claude",
    ],
    image: Portal,
    github: "https://github.com/aleksa-codes/portal",
    demo: "https://portal.aleksa.codes",
    category: "AI & Tools",
  },
  {
    title: "Easy Website Blocker",
    description:
      "Powerful productivity extension designed to eliminate digital distractions. Features highly customizable block lists and granular exceptions for deep, uninterrupted work sessions.",
    tags: ["React", "TypeScript", "TailwindCSS", "shadcn/ui", "Chrome API"],
    image: EasyWebsiteBlocker,
    github: "https://github.com/aleksa-codes/easy-website-blocker",
    category: "Browser Extensions",
  },
  {
    title: "One Dark Modern Pro",
    description:
      "Sleek, modern VS Code theme inspired by Atom's One Dark Pro. Delivers a refined UI and vibrant syntax highlighting for an optimal developer experience.",
    tags: [
      "VS Code",
      "Dark Theme",
      "Readability",
      "Developer Experience",
      "Syntax Highlighting",
    ],
    image: OneDarkModernPro,
    github: "https://github.com/aleksa-codes/one-dark-modern-pro",
    demo: "https://marketplace.visualstudio.com/items?itemName=aleksa-codes.one-dark-modern-pro",
    featured: true,
    category: "AI & Tools",
  },
  {
    title: "Flux Ghibsky Illustration",
    description:
      "Popular Flux AI LoRA model fine-tuned for generating stunning Ghibli-inspired landscapes. Currently drives over 30,000 monthly generations across Hugging Face and Replicate.",
    tags: ["AI", "LoRA", "FLUX", "Stable Diffusion", "Text-to-Image"],
    image: FluxGhibsky,
    huggingface:
      "https://huggingface.co/aleksa-codes/flux-ghibsky-illustration",
    replicate: "https://replicate.com/aleksa-codes/flux-ghibsky-illustration",
    featured: true,
    category: "AI & Tools",
  },
  {
    title: "aleksa.codes",
    description:
      "My personal portfolio and blog built with Astro for peak performance and SEO. Features a Decap CMS integration and an interactive AI site assistant.",
    tags: ["Astro", "TypeScript", "TailwindCSS", "SEO", "Decap CMS", "AI"],
    image: AleksaPortfolio,
    demo: "https://aleksa.codes",
    github: "https://github.com/aleksa-codes/astro-portfolio",
    category: "Websites",
  },
  {
    title: "Next Meal",
    description:
      "Intuitive PWA for instant, randomized meal suggestions. Features full ingredient lists, step-by-step instructions, and embedded video tutorials.",
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "TheMealDB API",
      "PWA",
    ],
    image: NextMeal,
    github: "https://github.com/aleksa-codes/my-next-meal-pwa",
    demo: "https://nextmeal.aleksa.codes",
    category: "Web Apps",
  },
]
