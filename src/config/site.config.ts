export const siteConfig = {
  // Basic site info
  name: 'aleksa.codes',
  description:
    'Full-stack web developer crafting modern, performant, and user-focused digital experiences. Specialized in building responsive web applications and innovative software solutions.',
  url: 'https://aleksa.codes',

  // SEO & Metadata
  defaultLocale: 'en_US',
  twitter: {
    creator: undefined,
    site: undefined,
  },
  defaultOgImage: '/og-image.png',

  // Contact Information
  contact: {
    phone: '(123) 456-7890',
    email: 'hello@aleksa.codes',
  },

  // Navigation
  navigation: [
    { href: '/about', label: 'About' },
    {
      href: '/projects',
      label: 'Projects',
      // dropdown: [
      //   { href: '/websites', label: 'Websites' },
      //   { href: '/applications', label: 'Applications' },
      //   { href: '/marketing', label: 'Marketing' },
      // ],
    },
    {
      href: '/blog',
      label: 'Blog',
    },
    // { href: '/contact', label: 'Contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
