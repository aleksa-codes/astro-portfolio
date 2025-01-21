import { defineConfig } from 'astro/config';
import { siteConfig } from '@/config/site.config';
import { imageService } from '@unpic/astro/service';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

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
