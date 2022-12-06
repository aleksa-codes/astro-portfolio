import { OGImageRoute } from 'astro-og-canvas';

export const { getStaticPaths, get } = OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: 'route',

  // A collection of pages to generate images for.
  // This can be any map of paths to data, not necessarily a glob result.
  pages: await import.meta.glob('../../posts/*.mdx', { eager: true }),

  // For each page, this callback will be used to customize the OpenGraph
  // image. For example, if `pages` was passed a glob like above, you
  // could read values from frontmatter.
  getImageOptions: (path, page) => ({
    title: page.frontmatter.title,
    bgGradient: [
      [18, 18, 18],
      [18, 18, 18],
      [18, 18, 18],
      [32, 32, 32],
      [32, 32, 32],
      [64, 64, 64]
    ],
    logo: {
      path: './public/icons/android/android-launchericon-192-192.png'
    }
    // There are a bunch more options you can use here!
  })
});
