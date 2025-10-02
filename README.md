# aleksa.codes — Astro Portfolio

A fast, content-driven personal website and blog built with Astro, featuring a modern design, AI-powered chat assistant, seasonal effects, and headless CMS integration.

[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Netlify](https://img.shields.io/badge/Netlify-00C46A?logo=netlify&logoColor=white)](https://www.netlify.com/)

## ✨ Features

- **🚀 Astro v5+** - Modern static site generator with islands architecture
- **🎨 Tailwind CSS v4** - Utility-first CSS framework with custom design tokens
- **📝 MDX Blog** - Write blog posts with Markdown and JSX components
- **🎛️ Decap CMS** - Headless CMS for content management
- **🤖 AI Chat Assistant** - Groq-powered chat with daily limits and conversation persistence
- **❄️ Seasonal Effects** - Winter snow animation and seasonal avatars
- **📱 Responsive Design** - Mobile-first approach with dark mode support
- **🔍 SEO Optimized** - Meta tags, sitemap, RSS feed, and structured data
- **⚡ Performance** - Optimized with compression, lazy loading, and modern web standards
- **♿ Accessibility** - ARIA labels, keyboard navigation, and semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Bun (for Tailwind/PostCSS build steps)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aleksa-codes/astro-portfolio.git
   cd astro-portfolio
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   # GROQ API Key: https://console.groq.com/keys
   GROQ_API_KEY="" # required for AI chat functionality

   # Google Analytics: https://analytics.google.com/analytics/web/
   GA_ID="G-XXXXXXXXX" # optional
   ```

4. **Start development server**

   ```bash
   bun run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📜 Available Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `bun run dev`      | Start development server with hot reload         |
| `bun run build`    | Build for production (includes TypeScript check) |
| `bun run preview`  | Preview production build locally                 |
| `bun run prod`     | Format, build, and preview (end-to-end workflow) |
| `bun run prettier` | Format code with Prettier                        |
| `bun run decap`    | Start Decap CMS local development server         |

> **Note**: If you prefer npm, you can use `npm run <script>` instead of `bun run <script>`.

## 🎨 Customization

### Content Management

- **Blog Posts**: Add MDX files to `src/content/blog/` with required frontmatter
- **Projects**: Update `src/pages/projects/index.astro` with new project data
- **Site Config**: Modify `src/config/site.config.ts` for navigation and metadata

### Styling

- **Design Tokens**: Edit `src/styles/global.css` for colors and themes
- **Components**: Use Tailwind utilities with semantic color variants
- **Dark Mode**: Automatically toggles via `.dark` class on `<html>`

### Features

- **AI Chat**: Configure daily limits and prompts in `src/components/ai-chat.astro`
- **Snow Effect**: Seasonal animation active Nov-Jan, toggleable via localStorage
- **External Links**: Auto-open in new tabs via custom rehype plugin

## 🔧 Configuration

### Decap CMS

Configure content collections in `public/admin/config.yml`. Sync with `src/content/config.ts` when changing schemas. The CMS is accessible at `/admin`.

### Build Configuration

Integrations configured in `astro.config.ts`:

- **astro-compress**: Asset optimization
- **astro-icon**: Icon management
- **astro-expressive-code**: Syntax highlighting
- **@astrojs/sitemap**: SEO sitemap generation

## 📚 Content Schema

### Blog Posts

```yaml
---
title: 'Post Title'
description: 'Brief description'
date: 2024-01-01
author: 'Author Name'
thumbnail: ./image.jpg
tags: ['tag1', 'tag2']
---
```

### Projects

Projects are defined in `src/pages/projects/index.astro` with properties for title, description, tags, image, demo URL, GitHub URL, featured status, and category.

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `dist`
4. Configure environment variables in Netlify dashboard
5. Enable Netlify Forms for contact form functionality

### Other Platforms

The site can be deployed to any static hosting service. Ensure the platform supports:

- Node.js build environment
- Environment variable configuration
- Form handling (or use alternative contact methods)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Run `bun run prettier` before committing
- Test builds with `bun run build`
- Follow existing code patterns and conventions
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
