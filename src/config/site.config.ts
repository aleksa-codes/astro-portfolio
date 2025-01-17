export const siteConfig = {
  // Basic site info
  name: 'aleksa.codes',
  description:
    "Aleksa is junior React developer, skilled in building user interfaces and front-end applications using the popular JavaScript library. Passionate about coding and dedicated to creating visually appealing and user-friendly experiences, Aleksa is constantly seeking to improve and expand their skills. Explore Aleksa's (or Alexa's) portfolio to see their work and learn more about their capabilities as a web developer.",
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
