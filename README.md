# Astro • Tailwind CSS • DaisyUI • Portfolio & MDX Blog

👉 A responsive portfolio website featuring a project showcase, personal information, and a rich blogging platform.

## 🌐 Demo

Check out a live demo at [aleksa.codes](https://aleksa.codes)

This portfolio/blog is inspired by [daisy-blog](https://github.com/saadeghi/daisy-blog) by [@saadeghi](https://github.com/saadeghi), the creator of DaisyUI.

### Key Features

- 🌌 **Responsive Design** – Optimized for all devices with Night Mode support
- 📰 **Dynamic Blog** – Write blog posts with MDX (or Markdown) support and auto-generated Open Graph images
- 🕒 **Read Time Calculation** – Calculates estimated read time for each post
- 💬 **Interactive Blog** – Comment section, draft mode, and RSS feed
- 📬 **Contact Form** – Easily get in touch through a built-in form
- 🔄 **Local CMS** – Manage content with ease using TinaCMS
- 🖼️ **Social Profiles & Resume** – Integrated links for social networks and resume download
- ☕ **"Buy Me a Coffee" Button** – Desktop-friendly support feature
- 🧩 **PWA Ready** – Installable on all devices with Google Lighthouse scores hitting 💯 (97-98 performance on mobile occasionally)

> **Note:** To enable automatic Open Graph image generation, build locally before deployment.

## 🚀 Project Structure

This project is organized as follows:

```
/
├── public/               # Static assets (images, icons, etc.)
├── src/
│   ├── components/       # Astro/React/Vue/Svelte/Preact components
│   └── pages/            # Page routes (.astro or .md files) 
│       └── index.astro   # Homepage
└── package.json
```

Astro automatically exposes `.astro` and `.md` files in `src/pages/` as routes, creating a clean and modular structure. 

## 🧩 Commands

Run these commands from the project root:

| Command             | Action                                                                                       |
| :------------------ | :------------------------------------------------------------------------------------------- |
| `yarn install`      | Install dependencies                                                                         |
| `yarn dev`          | Start local development server at `localhost:4321`                                           |
| `yarn cms`          | Start development server with TinaCMS at `localhost:4321/admin/index.html`                   |
| `yarn build`        | Build production site to `./dist/` and generate Open Graph images for blog posts             |
| `yarn preview`      | Preview the production build locally before deploying                                        |
| `yarn astro ...`    | Run Astro CLI commands (e.g., `astro add`, `astro check`)                                    |
| `yarn astro --help` | View help for Astro CLI commands                                                             |

> **Note:** For npm users, replace `yarn` with `npm run`.

---

Feel free to contribute by opening issues or submitting pull requests!
