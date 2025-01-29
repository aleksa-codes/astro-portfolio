import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config/site.config';

export async function GET() {
  const blog = await getCollection('blog');
  const sortedPosts = blog.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: siteConfig.title,
    description: `The latest blog posts from ${siteConfig.title}`,
    site: import.meta.env.SITE,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      author: post.data.author,
    })),
    customData: `<language>${siteConfig.defaultLocale.toLowerCase()}</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
