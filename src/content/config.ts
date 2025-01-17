import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
// import { siteConfig } from '@/config/site.config';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      // author: z.string().default(siteConfig.name),
      thumbnail: image(),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { blog };
