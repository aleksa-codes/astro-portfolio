export interface TechInfo {
  name: string
  icon: string
  color: string
  hover: string
  url: string
}

// central list used by both the landing page and project cards
export const techList: TechInfo[] = [
  // Languages
  {
    name: "HTML",
    icon: "simple-icons:html5",
    color: "text-orange-600 dark:text-orange-500",
    hover: "hover:shadow-orange-500/20",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS",
    icon: "simple-icons:css",
    color: "text-[rebeccapurple] dark:text-[#663399]",
    hover: "hover:shadow-[#663399]/20",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "JavaScript",
    icon: "simple-icons:javascript",
    color: "text-yellow-500 dark:text-yellow-400",
    hover: "hover:shadow-yellow-400/20",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    icon: "simple-icons:typescript",
    color: "text-blue-700 dark:text-blue-500",
    hover: "hover:shadow-blue-500/20",
    url: "https://www.typescriptlang.org/",
  },
  // Frontend
  {
    name: "React",
    icon: "simple-icons:react",
    color: "text-cyan-500 dark:text-cyan-400",
    hover: "hover:shadow-cyan-400/20",
    url: "https://react.dev/",
  },
  {
    name: "Next.js",
    icon: "simple-icons:nextdotjs",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://nextjs.org/",
  },
  {
    name: "TanStack Query",
    icon: "simple-icons:tanstack",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://tanstack.com/query/",
  },
  {
    name: "Astro",
    icon: "simple-icons:astro",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://astro.build/",
  },
  {
    name: "TailwindCSS",
    icon: "simple-icons:tailwindcss",
    color: "text-sky-500 dark:text-sky-400",
    hover: "hover:shadow-sky-400/20",
    url: "https://tailwindcss.com/",
  },
  {
    name: "shadcn/ui",
    icon: "simple-icons:shadcnui",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://ui.shadcn.com/",
  },
  {
    name: "Motion",
    icon: "bxl:motion-js",
    color: "text-yellow-500 dark:text-yellow-400",
    hover: "hover:shadow-yellow-400/20",
    url: "https://www.motion.dev/",
  },
  // Backend / Runtime
  {
    name: "Node.js",
    icon: "simple-icons:nodedotjs",
    color: "text-green-600 dark:text-green-500",
    hover: "hover:shadow-green-500/20",
    url: "https://nodejs.org/",
  },
  {
    name: "Bun",
    icon: "simple-icons:bun",
    color: "text-orange-200 dark:text-orange-50",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://bun.sh/",
  },
  {
    name: "Hono.js",
    icon: "simple-icons:hono",
    color: "text-orange-600 dark:text-orange-500",
    hover: "hover:shadow-orange-500/20",
    url: "https://hono.dev/",
  },
  {
    name: "Socket.IO",
    icon: "bxl:socket-io",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://socket.io/",
  },
  // Databases / ORM
  {
    name: "Drizzle ORM",
    icon: "simple-icons:drizzle",
    color: "text-lime-500 dark:text-lime-400",
    hover: "hover:shadow-lime-400/20",
    url: "https://orm.drizzle.team/",
  },
  {
    name: "PostgreSQL",
    icon: "simple-icons:postgresql",
    color: "text-blue-600 dark:text-blue-500",
    hover: "hover:shadow-blue-500/20",
    url: "https://www.postgresql.org/",
  },
  {
    name: "SQLite",
    icon: "simple-icons:sqlite",
    color: "text-sky-600 dark:text-sky-500",
    hover: "hover:shadow-sky-500/20",
    url: "https://www.sqlite.org/",
  },
  {
    name: "Supabase",
    icon: "simple-icons:supabase",
    color: "text-green-600 dark:text-green-500",
    hover: "hover:shadow-green-500/20",
    url: "https://supabase.com/",
  },
  {
    name: "Neon",
    icon: "bxl:neon-tech",
    color: "text-cyan-500 dark:text-cyan-400",
    hover: "hover:shadow-cyan-400/20",
    url: "https://neon.tech/",
  },
  {
    name: "Decap CMS",
    icon: "simple-icons:decapcms",
    color: "text-pink-600 dark:text-pink-400",
    hover: "hover:shadow-pink-400/20",
    url: "https://decapcms.org/",
  },
  // DevOps / Cloud
  {
    name: "Cloudflare",
    icon: "simple-icons:cloudflare",
    color: "text-orange-500 dark:text-orange-400",
    hover: "hover:shadow-orange-400/20",
    url: "https://www.cloudflare.com/",
  },
  {
    name: "Docker",
    icon: "simple-icons:docker",
    color: "text-blue-500 dark:text-blue-400",
    hover: "hover:shadow-blue-400/20",
    url: "https://www.docker.com/",
  },
  {
    name: "Coolify",
    icon: "simple-icons:coolify",
    color: "text-purple-600 dark:text-purple-400",
    hover: "hover:shadow-purple-400/20",
    url: "https://coolify.io/",
  },
  {
    name: "Netlify",
    icon: "simple-icons:netlify",
    color: "text-teal-500 dark:text-teal-400",
    hover: "hover:shadow-teal-400/20",
    url: "https://www.netlify.com/",
  },
  // AI
  {
    name: "OpenAI API",
    icon: "simple-icons:openai",
    color: "text-teal-600 dark:text-teal-500",
    hover: "hover:shadow-teal-500/20",
    url: "https://openai.com/api/",
  },
  {
    name: "Ollama",
    icon: "simple-icons:ollama",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://ollama.com/",
  },
  {
    name: "Vercel AI SDK",
    icon: "simple-icons:vercel",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://ai-sdk.dev/",
  },
  // Auth
  {
    name: "Better Auth",
    icon: "simple-icons:betterauth",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://better-auth.com/",
  },
  // Payments
  {
    name: "Polar.sh",
    icon: "iconoir:polar-sh",
    color: "text-blue-600 dark:text-blue-500",
    hover: "hover:shadow-blue-500/20",
    url: "https://polar.sh/",
  },
  // Tools
  {
    name: "Git",
    icon: "simple-icons:git",
    color: "text-red-600",
    hover: "hover:shadow-red-500/20",
    url: "https://git-scm.com/",
  },
  {
    name: "VS Code",
    icon: "simple-icons:visualstudiocode",
    color: "text-blue-500 dark:text-blue-400",
    hover: "hover:shadow-blue-400/20",
    url: "https://code.visualstudio.com/",
  },
  {
    name: "GitHub Copilot",
    icon: "simple-icons:githubcopilot",
    color: "text-neutral-800 dark:text-neutral-200",
    hover: "dark:hover:shadow-white/10 hover:shadow-black/10",
    url: "https://github.com/features/copilot",
  },
]

// normalize a name for keying (lowercase + remove non-alphanumeric)
function normalize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

// convenience lookup by normalized name(s)
export const techMap: Record<string, TechInfo> = techList.reduce(
  (map, tech) => {
    const key = normalize(tech.name)
    map[key] = tech
    // also store the raw lowercase for easier debugging
    map[tech.name.toLowerCase()] = tech
    return map
  },
  {} as Record<string, TechInfo>
)
