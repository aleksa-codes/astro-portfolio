# Astro • Tailwind • DaisyUI • Portfolio & MDX Blog

👉 Portfolio website with personal and contact information, project showcase, and a blog.

- Responsive
- Night Mode 🌚
- RSS feed
- Auto generate blog posts OG images ( requires to build locally first, then deploy )
- .mdx files for blog posts ( .md if no React ) 💻
- Calculate read time for the posts
- Posts comments section 💬
- Draft posts
- Local CMS
- Contact form 📬
- Socials & Resume
- Buy me a coffee button ( on desktop ) ☕

Google Lighthouse scores are all 💯 ( sometimes 97-98 performance for mobile ). I've also added a service worker to pass PWA check as well, just for fun, so it is also installable on all devices ✔

Feel free to contribute, open issues or PRs.

## Demo

Demo for this project is available @ [aleksa.codes](https://aleksa.codes)

This portfolio/blog was inspired and built on top of: https://daisy-blog.netlify.app/ by [@saadeghi](https://github.com/saadeghi),
the creator of daisyUI.

## 🚀 Project Structure

Inside of this project, you'll find the following directories and files:

```
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
        ...
└── package.json
    ...
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                                                                       |
| :------------------ | :------------------------------------------------------------------------------------------- |
| `yarn install`      | Installs dependencies                                                                        |
| `yarn dev`          | Starts local dev server at `localhost:4321`                                                  |
| `yarn cms`          | Starts local dev server at `localhost:4321` and TinaCMS at `localhost:4321/admin/index.html` |
| `yarn build`        | Build your production site to `./dist/` and build Open Graph images for posts                |
| `yarn preview`      | Preview your build locally, before deploying                                                 |
| `yarn astro ...`    | Run CLI commands like `astro add`, `astro check`, etc.                                       |
| `yarn astro --help` | Get help using the Astro CLI                                                                 |

\*\* If you are using npm instead of yarn, just replace `yarn` with `npm run` in the commands above.
