# 🚀 Astro Portfolio - aleksa.codes

> **📅 March 2026 Update:** This repository has undergone a **major overhaul** and refactor!

Personal portfolio and blog built with Astro 5, Tailwind CSS 4, and TypeScript.

[![Astro](https://img.shields.io/badge/Astro_5-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Netlify](https://img.shields.io/badge/Netlify-00C46A?logo=netlify&logoColor=white)](https://www.netlify.com/)

## Features

- **Astro 5** — 🌌 Static-first with hybrid SSR for the AI chat endpoint
- **Tailwind CSS 4** — 🎨 Vite plugin, CSS-only config, shadcn-style oklch design tokens
- **MDX Blog** — 📝 Content collections, pagination, reading time, Giscus comments
- **AI Chat** — 🤖 Groq-powered streaming assistant with follow-up questions and daily rate limits
- **OG Images** — 🖼️ Auto-generated at build time via `astro-og-canvas`
- **Decap CMS** — ⚙️ Git-based headless CMS at `/admin`
- **Dark Mode** — 🌙 System-aware with instant toggle (no flash)
- **Contact Form** — ✉️ Netlify Forms with reCAPTCHA and honeypot
- **Performance** — ⚡ Compression, lazy loading, priority hints, preloaded fonts
- **SEO** — 🔍 Sitemap, RSS, meta tags, structured OG data

## Quick Start

```bash
# Clone & install
git clone https://github.com/aleksa-codes/astro-portfolio.git
cd astro-portfolio
bun install

# Set up env
echo 'GROQ_API_KEY=your_key_here' > .env

# Run dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `bun run dev`     | Dev server (port 3000)                               |
| `bun run build`   | Type check → Astro build → Tailwind minify → PostCSS |
| `bun run preview` | Preview production build                             |
| `bun run format`  | Prettier (Astro + Tailwind + import sorting)         |
| `bun run decap`   | Local Decap CMS server                               |

## Project Structure

```
src/
├── assets/            # Images & fonts (Astro-optimized)
├── components/        # Astro components (kebab-case)
│   └── ui/            # Primitives (card, badge, button, tooltip)
├── content/blog/      # MDX blog posts
├── layouts/           # base-layout.astro
├── lib/               # Utilities, project data, tech stack data
├── pages/             # Routes (static + /api/chat SSR)
└── styles/            # global.css (Tailwind v4 config + design tokens)
```

## Environment Variables

| Variable       | Required       | Purpose                                                  |
| -------------- | -------------- | -------------------------------------------------------- |
| `GROQ_API_KEY` | Yes (for chat) | [Groq API](https://console.groq.com/keys) authentication |

## Tech Stack

| Category        | Technology                                                                              |
| --------------- | --------------------------------------------------------------------------------------- |
| Framework       | [Astro 5](https://astro.build/)                                                         |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) tokens |
| AI              | [Vercel AI SDK](https://ai-sdk.dev/) + [Groq](https://groq.com/)                        |
| Content         | [MDX](https://mdxjs.com/) + [Decap CMS](https://decapcms.org/)                          |
| Icons           | [astro-icon](https://github.com/natemoo-re/astro-icon) (Lucide, Simple Icons, etc.)     |
| Code Blocks     | [Expressive Code](https://expressive-code.com/)                                         |
| Deployment      | [Netlify](https://www.netlify.com/) (static + serverless)                               |
| Package Manager | [Bun](https://bun.sh/)                                                                  |

## Deployment

Deploy to Netlify with these settings:

- **Build command:** `bun run build`
- **Publish directory:** `dist`
- **Environment variables:** `GROQ_API_KEY`
- Enable **Netlify Forms** and **Netlify Identity** (for Decap CMS)

## License

MIT — see [LICENSE](LICENSE).
