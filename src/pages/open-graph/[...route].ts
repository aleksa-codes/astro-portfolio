import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',

  pages: await getCollection('blog').then((posts) =>
    Object.fromEntries(
      posts.map((post) => [
        post.id,
        {
          title: post.data.title,
          description: post.data.description,
          thumbnail: post.data.thumbnail,
        },
      ]),
    ),
  ),
  getImageOptions: (_path, page) => ({
    title: page.title,
    // description: page.description,
    // bgImage: page.thumbnail
    //   ? {
    //       path: page.thumbnail,
    //       fit: 'cover',
    //     }
    //   : undefined,
    logo: {
      path: './public/icons/android/android-launchericon-192-192.png',
      // Width only, height will scale proportionally
      size: [192],
    },
    font: {
      title: {
        size: 60,
        families: ['Inter'],
        weight: 'Bold',
      },
      description: {
        size: 30,
        families: ['Inter'],
        lineHeight: 1.4,
      },
    },
    fonts: [
      'https://api.fontsource.org/v1/fonts/inter/latin-400-normal.ttf',
      'https://api.fontsource.org/v1/fonts/inter/latin-700-normal.ttf',
    ],
    bgGradient: [
      [18, 18, 18],
      [18, 18, 18],
      [18, 18, 18],
      [32, 32, 32],
      [32, 32, 32],
      [64, 64, 64],
    ],
  }),
});
