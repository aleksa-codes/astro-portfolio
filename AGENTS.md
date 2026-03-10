# astro-portfolio - Agent Instructions

**CRITICAL:** The dev server is likely already running. Do NOT start a new server or build unless explicitly asked. Use MCP tool Context7 to look up docs for rapidly evolving technologies like Astro 6, Tailwind v4, or unfamiliar libs (`@felixicaza/astro-capo`, `astro-compress`, `astro-icon`, `@northsoon/astro-seo`, `astro-og-canvas`, `astro-expressive-code`).

## Architecture

- **Stack:** Astro 6, Tailwind CSS 4 (Vite plugin), TypeScript (strict), Bun.
- **Adapter:** `@astrojs/netlify` — hybrid rendering (static + SSR for `/api/chat`).
- **Content:** Single `blog` collection in `src/content/blog/` (MDX) via `src/content.config.ts`.
- **Projects:** Static TypeScript array in `src/lib/projects.ts` (NOT a content collection).
- **Layout:** Single layout `src/layouts/base-layout.astro` — includes SEO, Header, Footer, Dock, AIChat.
- **Assets:** `src/assets/` (Astro-optimized images/fonts), `public/` (static files).

## Commands

| Command           | What it does                                                  |
| ----------------- | ------------------------------------------------------------- |
| `bun run dev`     | Dev server on port 3000                                       |
| `bun run build`   | `astro check` → `astro build` → Tailwind CLI minify → PostCSS |
| `bun run preview` | Preview production build                                      |
| `bun run format`  | Prettier (astro + organize-imports + tailwindcss plugins)     |
| `bun run decap`   | Local Decap CMS server (access at `/admin`)                   |

## Core Patterns

### Imports & Aliases

Always use the `@/` alias (maps to `src/`):

```ts
import Card from '@/components/ui/card.astro';
import { cn } from '@/lib/utils';
```

### Icons

```astro
import {Icon} from 'astro-icon/components';
<Icon name='lucide:star' class='h-5 w-5' />
```

Available icon sets: `lucide`, `simple-icons`, `bxl`, `iconoir`, `tabler`.

### Class Merging

Always use `cn()` for conditional/merged Tailwind classes:

```ts
import { cn } from '@/lib/utils';
// cn() = clsx() + tailwind-merge
cn('base-class', condition && 'conditional', className);
```

### Component Props

Every component defines `interface Props` in frontmatter:

```astro
---
interface Props {
  title: string;
  class?: string;
}
const { title, class: className } = Astro.props;
---
```

### Client-side Interactivity

**No framework islands** — all interactivity is vanilla JS in `<script>` tags:

```astro
<script>
  function initFeature() {
    const el = document.getElementById('my-element')!;
    el.addEventListener('click', () => {
      /* ... */
    });
  }
  initFeature();
  document.addEventListener('astro:after-swap', initFeature);
</script>
```

- Use `<script>` (module, TypeScript) for most interactivity.
- Use `<script is:inline>` only when it must run before hydration (e.g., theme init) or for external CDN scripts.
- Always re-attach listeners on `astro:after-swap` for view transition support.

### Head & SEO

Use `@felixicaza/astro-capo` (`<Head>` with capital H, not `<head>`) and `@northsoon/astro-seo` (`AstroSeo`). Both are configured in `base-layout.astro`.

### Dark Mode

Three-layer implementation:

1. **Inline script** in `<Head>` reads `localStorage.theme` / `prefers-color-scheme` and sets `.dark` class before paint.
2. **Theme toggle** (`theme-toggle.astro`) toggles `.dark`, saves to `localStorage`, uses instant transition trick (`[&_*]:!transition-none`).
3. **CSS**: `@custom-variant dark (&:is(.dark *))` in `global.css`.

### Images

Use Astro's `<Image>` component with `priority` attribute for above-the-fold images:

```astro
import {Image} from 'astro:assets';
<Image src={myImage} alt='description' format='webp' priority />
```

### Forms

Netlify Forms with reCAPTCHA:

- Attributes: `data-netlify="true"`, `data-netlify-recaptcha="true"`, `netlify-honeypot="bot-field"`
- Hidden fields: `form-name`, `bot-field`
- Client-side JS handles submission via `fetch('/')`.

## Styling (Tailwind v4)

**No `tailwind.config.js`** — all config lives in `src/styles/global.css`:

```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme inline {
  --font-sans: 'Geist', sans-serif;
  --font-mono: 'Geist Mono', monospace;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... maps shadcn CSS variables to Tailwind tokens */
}

@utility container {
  margin-inline: auto;
  padding-inline: 1rem;
  max-width: 48rem;
}
@custom-variant dark (&:is(.dark *));
```

- **Color system:** shadcn-style semantic tokens in oklch color space (`:root` for light, `.dark` for dark).
- **Fonts:** Geist (sans), Geist Mono (mono), Dancing Script (footer signature) — loaded from `public/fonts/` via `@font-face`.
- **Container:** `max-width: 48rem` (768px) — narrow, content-focused layout.

## Content Collection

```ts
// src/content.config.ts — single "blog" collection
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

schema: ({ image }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Aleksa'),
    thumbnail: image().optional(),
    tags: z.array(z.string()).default([]),
  });
```

Blog posts are MDX files in `src/content/blog/`. Paginated at 4 per page.

## Routing

| Route               | File                             | Rendering                     |
| ------------------- | -------------------------------- | ----------------------------- |
| `/`                 | `pages/index.astro`              | Static                        |
| `/projects`         | `pages/projects.astro`           | Static                        |
| `/contact`          | `pages/contact.astro`            | Static                        |
| `/blog`, `/blog/2`  | `pages/blog/[...page].astro`     | Static (paginated)            |
| `/blog/{slug}`      | `pages/blog/[...slug].astro`     | Static                        |
| `/api/chat`         | `pages/api/chat.ts`              | **SSR** (`prerender = false`) |
| `/open-graph/*.png` | `pages/open-graph/[...route].ts` | Static (build-time)           |
| `/rss.xml`          | `pages/rss.xml.ts`               | Static                        |
| `/robots.txt`       | `pages/robots.txt.ts`            | Static                        |
| `/admin`            | `pages/admin.astro`              | Static (Decap CMS shell)      |

Only `/api/chat` is server-rendered (Netlify Functions). Everything else is prerendered.

## AI Chat

- **Backend** (`src/pages/api/chat.ts`): Groq model via Vercel AI SDK. `streamText` + `Output.object()` → NDJSON stream.
- **Frontend** (`src/components/ai-chat.astro`): Vanilla JS modal. Parses NDJSON, renders markdown via `marked`. 5 messages/day client-side rate limit (`localStorage`). Conversation persisted in `sessionStorage`.
- **Communication:** Dock's "Ask AI" button calls `window.toggleChat()` (global function set by ai-chat component).
- **Env var:** `GROQ_API_KEY` (required for chat to work).

## Environment Variables

| Variable       | Required       | Purpose                 |
| -------------- | -------------- | ----------------------- |
| `GROQ_API_KEY` | Yes (for chat) | Groq API authentication |

## Key Gotchas

1. **Build has 3 stages:** `astro build` → `@tailwindcss/cli` → `postcss`. All three must pass.
2. **GitHub Activity** is fetched at build time (frontmatter), but contribution graph rendered client-side via external API.
3. **Expressive Code** themes sync with dark mode: `one-dark-pro` for `.dark`, `one-light` for `:root:not(.dark)`.
4. **Projects data** is in `src/lib/projects.ts` with image imports — not a content collection.
5. **`marked`** is a client-side runtime dependency (used in ai-chat for markdown rendering).
6. **Giscus comments** sync theme via MutationObserver on `<html>` class changes.
