import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET() {
  const blog = (await getCollection("blog")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )
  return rss({
    title: "RSS Feed",
    description: "Thoughts and tutorials from my web development journey.",
    site: import.meta.env.SITE,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  })
}
