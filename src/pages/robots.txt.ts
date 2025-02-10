import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) =>
  `User-agent: *
Allow: /
Disallow: /admin/

# Explicit rules for common LLM bots that might not attribute source data.
User-agent: anthropic-ai
User-agent: Applebot-Extended
User-agent: Bytespider
User-agent: CCBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: cohere-ai
User-agent: Diffbot
User-agent: FacebookBot
User-agent: GPTBot
User-agent: ImagesiftBot
User-agent: Meta-ExternalAgent
User-agent: Meta-ExternalFetcher
User-agent: Omgilibot
User-agent: PerplexityBot
User-agent: Timpibot
Disallow: /

Sitemap: ${sitemapURL.href}`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};
