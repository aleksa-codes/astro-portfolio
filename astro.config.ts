import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.config';
import { targetBlank } from './src/plugins/targetBlank';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

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
    rehypePlugins: [[targetBlank, { domain: import.meta.env.PROD ? siteConfig.url : 'http://localhost:3000' }]],
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
    expressiveCode({
      themes: ['one-dark-pro', 'one-light'],
      themeCssSelector: (theme) => (theme.name === 'one-dark-pro' ? '.dark' : ':root:not(.dark)'),
    }),
    mdx(),
  ],
  adapter: netlify({
    imageCDN: false,
  }),
});
