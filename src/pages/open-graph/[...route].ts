import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const blogPosts = await getCollection('blog');

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',

  pages: {
    index: {
      title: 'aleksa.codes',
      description:
        'Computer Science graduate and web developer specializing in performance optimization, clean UI design, and scalable architecture. Explore my work and get in touch.',
    },
    projects: {
      title: 'Projects',
      description:
        'Browse my portfolio of web development projects, including side projects and open source contributions built with modern tools and best practices.',
    },
    blog: {
      title: 'Blog',
      description:
        'Articles and insights on web development, software engineering, and computer science — written from hands-on experience as a developer.',
    },
    contact: {
      title: 'Contact',
      description:
        "Have a project in mind or want to collaborate? Reach out for freelance work, partnership inquiries, or general questions — I'd love to hear from you.",
    },
    // Blog posts
    ...Object.fromEntries(
      blogPosts.map(post => [
        `blog/${post.id}`,
        {
          title: post.data.title,
          description: post.data.description,
        },
      ]),
    ),
  },

  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: './src/assets/logo-192x192.png',
      size: [80],
    },
    font: {
      title: {
        size: 64,
        families: ['Geist'],
        weight: 'Bold',
        color: [15, 23, 42], // slate-900
      },
      description: {
        size: 32,
        families: ['Geist'],
        color: [100, 116, 139], // slate-500
      },
    },
    fonts: [
      'https://api.fontsource.org/v1/fonts/geist/latin-400-normal.ttf',
      'https://api.fontsource.org/v1/fonts/geist/latin-700-normal.ttf',
    ],
    bgGradient: [
      [248, 250, 252], // slate-50
      [241, 245, 249], // slate-100
    ],
    border: {
      color: [15, 23, 42], // slate-900
      width: 12,
      side: 'inline-start',
    },
  }),
});
