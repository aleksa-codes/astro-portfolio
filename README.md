# Astro • Tailwind • DaisyUI • Portfolio & MDX Blog

Porfolio website with personal and contact inforamation, project showcase and a blog.

RSS feed, .mdx files for blog posts (.md if no React), contact form.

Google Lighthouse scores are all 100, I've added service worker to pass PWA check as well, just for fun.

## Demo

Demo for this repo is available @ [aleksa.codes](https://aleksa.codes)

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

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

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `yarn install`      | Installs dependencies                            |
| `yarn dev`          | Starts local dev server at `localhost:3000`      |
| `yarn build`        | Build your production site to `./dist/`          |
| `yarn preview`      | Preview your build locally, before deploying     |
| `yarn astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `yarn astro --help` | Get help using the Astro CLI                     |

\*\* if you are using npm -> just use `npm run` instead of `yarn`
