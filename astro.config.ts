import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { imageService } from '@unpic/astro/service';
import { siteConfig } from './src/config/site.config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    svg: {
      mode: 'sprite',
    },
  },
  site: import.meta.env.PROD ? siteConfig.url : 'http://localhost:3000',
  server: {
    port: 3000,
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'css-variables',
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },
  },
  image: {
    service: imageService({
      // This can usually be auto-detected
      fallbackService: 'astro',
      placeholder: 'blurhash',
      // This is the default
      layout: 'constrained',
    }),
  },
  integrations: [
    icon(),
    sitemap({
      filter: (page) => page !== `${siteConfig.url}/admin/`,
    }),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    mdx(),
  ],
});
