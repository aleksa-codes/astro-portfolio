import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import astroOGImage from 'astro-og-image';

// https://astro.build/config
export default defineConfig({
  site: 'https://aleksa.codes',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro'
    }
  },
  integrations: [
    sitemap(),
    mdx(),
    tailwind(),
    image(),
    astroOGImage({
      config: {
        path: 'src/posts'
        // change this value to the folder where your posts are
        // NOTE: index.md file will not get proccesed, so please avoid it
      }
    })
  ]
});
