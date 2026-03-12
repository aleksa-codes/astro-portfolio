import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

// we don't include full post content to avoid extra deps, but setup is ready to expand
export async function GET() {
  let blog = await getCollection("blog")
  // sort newest first by date
  blog = blog.sort((a, b) => (b.data.date as any) - (a.data.date as any))
  return rss({
    title: "aleksa.codes blog",
    description: "Thoughts and tutorials from my web development journey.",
    site: import.meta.env.SITE,
    // optional: match the site's trailingSlash setting if you have one
    // trailingSlash: false,
    stylesheet: "/rss/styles.xsl",
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  })
}
