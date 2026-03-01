import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { targetBlank } from './src/lib/target-blank';

const SITE = import.meta.env.PROD ? 'https://aleksa.codes' : 'http://localhost:3000';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  server: {
    port: 3000,
  },
  // build: {
  //   inlineStylesheets: 'always',
  // },
  adapter: netlify({
    imageCDN: false,
  }),
  markdown: {
    rehypePlugins: [[targetBlank, { domain: SITE }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    expressiveCode({
      themes: ['one-dark-pro', 'one-light'],
      themeCssSelector: theme => (theme.name === 'one-dark-pro' ? '.dark' : ':root:not(.dark)'),
      styleOverrides: {
        codeFontFamily:
          'var(--font-mono), SF Mono, SF Mono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
        frames: {
          frameBoxShadowCssValue: '0 0 0 1px var(--border), 0 2px 4px -1px var(--shadow)',
          tooltipSuccessBackground: 'var(--foreground)',
          tooltipSuccessForeground: 'var(--background)',
        },
      },
    }),
    mdx(),
    icon(),
    sitemap(),
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
  ],
});
