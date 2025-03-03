export const siteConfig = {
  // Basic site info
  title: 'aleksa.codes',
  author: 'aleksa-codes',
  description:
    'Hey, I’m Aleksa, a full-stack developer crafting fast, modern web applications and websites that users love. I specialize in responsive, accessible designs with clean code and innovative solutions. Let’s build something great!',
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
    { href: '/about/', label: 'About' },
    {
      href: '/projects/',
      label: 'Projects',
      // dropdown: [
      //   { href: '/websites', label: 'Websites' },
      //   { href: '/applications', label: 'Applications' },
      //   { href: '/marketing', label: 'Marketing' },
      // ],
    },
    {
      href: '/blog/',
      label: 'Blog',
    },
    // { href: '/contact', label: 'Contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
