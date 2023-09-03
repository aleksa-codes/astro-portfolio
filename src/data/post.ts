type MarkdownInstance = import('astro').MarkdownInstance<any>;
type MDXComponent = import('astro').MDXInstance<any>;
// Vite import.meta.env fix: https://dev.to/yanagisawahidetoshi/mastering-environment-variables-in-vitetypescriptreact-1odi
const { MODE } = import.meta.env;

export type Post = {
  title: string;
  slug: string;
  desc: string;
  author: string;
  timestamp: number;
  draft: boolean;
  date: string;
  file: URL;
  img: string;
  imgWidth: number;
  imgHeight: number;
};

export function single(post: MarkdownInstance | MDXComponent): Post {
  const filePathArray = post.file.split('/');
  const slug = filePathArray.pop()?.replace(/\.(md|mdx)$/, '');
  return {
    ...post.frontmatter,
    Content: post.Content,
    slug,
    ogImage: `${import.meta.env.SITE}/assets/posts/${slug}.png`,
    draft: filePathArray.pop() === 'drafts',
    timestamp: new Date(post.frontmatter.date).valueOf()
  };
}

export function published(posts: (MarkdownInstance | MDXComponent)[]): Post[] {
  return posts
    .filter((post) => post.frontmatter.title && (MODE === 'development' || !post.frontmatter.draft))
    .map(single)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function getRSS(posts: (MarkdownInstance | MDXComponent)[]): any {
  return {
    stylesheet: '/rss/styles.xsl',
    title: 'Blog Posts (from aleksa.codes)',
    description:
      'Beginner friendly developer content, with a focus on React, TypeScript, Next.js, Astro, Tailwind CSS and more.',
    site: import.meta.env.SITE,
    customData: `<language>en-us</language>`,
    items: published(posts).map((post: Post) => ({
      title: post.title,
      description: post.desc,
      link: post.slug,
      pubDate: post.date
    }))
  };
}
