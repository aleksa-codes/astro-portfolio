<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title"/> | aleksa.codes
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          :root {
            --background: #fafafa;
            --foreground: #18181b;
            --card: #ffffff;
            --card-foreground: #18181b;
            --muted: #f4f4f5;
            --muted-foreground: #71717a;
            --border: #e4e4e7;
            --ring: #a1a1aa;
            --link: #2563eb;
            --link-hover: #1d4ed8;
            --rss-orange: #f97316;
            --rss-orange-bg: #fff7ed;
            --radius: 0.625rem;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --background: #09090b;
              --foreground: #fafafa;
              --card: #18181b;
              --card-foreground: #fafafa;
              --muted: #27272a;
              --muted-foreground: #a1a1aa;
              --border: #27272a;
              --ring: #3f3f46;
              --link: #60a5fa;
              --link-hover: #93bbfd;
              --rss-orange: #fb923c;
              --rss-orange-bg: #1c1209;
            }
          }

          *, ::after, ::before {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          html {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
            background: var(--background);
            color: var(--foreground);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            max-width: 680px;
            margin: 0 auto;
            padding: 1.5rem 1.25rem;
            line-height: 1.6;
          }

          /* Links - nice blue */
          a {
            color: var(--link);
            text-decoration: underline;
            text-underline-offset: 0.2em;
            text-decoration-thickness: 1px;
            text-decoration-color: color-mix(in srgb, var(--link) 40%, transparent);
            transition: color 0.15s, text-decoration-color 0.15s;
          }

          a:hover {
            color: var(--link-hover);
            text-decoration-color: var(--link-hover);
          }

          /* Info banner */
          .info-banner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            padding: 0.75rem 0.875rem;
            background: var(--rss-orange-bg);
            border: 1px solid color-mix(in srgb, var(--rss-orange) 25%, transparent);
            border-radius: var(--radius);
            margin-bottom: 1.25rem;
          }

          .info-banner p {
            font-size: 0.8125rem;
            line-height: 1.45;
            color: var(--muted-foreground);
          }

          .info-banner a {
            flex-shrink: 0;
            white-space: nowrap;
            font-size: 0.8125rem;
            font-weight: 500;
          }

          .info-banner strong {
            color: var(--foreground);
            font-weight: 600;
          }

          /* Header */
          .feed-header {
            margin-bottom: 1.5rem;
          }

          .feed-title-row {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            align-items: center;
            gap: 1rem;
          }

          .feed-title-row > div {
            min-width: 0;
          }

          .feed-icon {
            width: 3rem;
            height: 3rem;
            flex-shrink: 0;
            border-radius: 0.5rem;
          }

          h1 {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.15;
            color: var(--foreground);
          }

          .feed-description {
            margin-top: 0.25rem;
            font-size: 0.875rem;
            color: var(--muted-foreground);
            line-height: 1.45;
          }

          .visit-link {
            display: inline-flex;
            align-items: center;
            justify-self: end;
            gap: 0.5rem;
            white-space: nowrap;
            font-size: 0.8125rem;
            font-weight: 500;
            color: var(--foreground);
            text-decoration: none;
            padding: 0.5rem 0.75rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background: var(--card);
            transition: all 0.15s;
          }

          .visit-link:hover {
            background: var(--muted);
            border-color: var(--ring);
            color: var(--foreground);
          }

          .visit-link svg {
            width: 0.8125rem;
            height: 0.8125rem;
            opacity: 0.6;
          }

          @media (max-width: 600px) {
            .feed-title-row {
              grid-template-columns: auto minmax(0, 1fr);
              align-items: start;
            }

            .visit-link {
              grid-column: 2;
              justify-self: start;
              margin-top: 0.125rem;
            }
          }

          /* Divider */
          hr {
            border: none;
            height: 1px;
            background: var(--border);
            margin: 1.25rem 0 0.75rem;
          }

          /* Section heading */
          h2 {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.6875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            line-height: 1.25;
            color: var(--muted-foreground);
            margin-bottom: 0.75rem;
          }

          h2::after {
            content: "";
            flex: 1;
            height: 1px;
            background: var(--border);
          }

          /* Feed items */
          article {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            column-gap: 1.25rem;
            row-gap: 0.375rem;
            padding: 1rem 0;
            border-top: 1px solid var(--border);
          }

          article h3 {
            min-width: 0;
          }

          article h3 a {
            font-size: 1rem;
            font-weight: 600;
            color: var(--card-foreground);
            text-decoration: none;
            line-height: 1.35;
            transition: color 0.15s;
          }

          article h3 a:hover {
            color: var(--link);
          }

          a:focus-visible {
            outline: 2px solid var(--ring);
            outline-offset: 3px;
            border-radius: 0.25rem;
          }

          article .meta {
            display: flex;
            align-self: start;
            align-items: center;
            justify-self: end;
            gap: 0.375rem;
            padding-top: 0.125rem;
            white-space: nowrap;
            font-size: 0.7rem;
            color: var(--muted-foreground);
            font-variant-numeric: tabular-nums;
          }

          article .meta svg {
            width: 0.7rem;
            height: 0.7rem;
            opacity: 0.5;
          }

          article p {
            grid-column: 1 / -1;
            max-width: 65ch;
            font-size: 0.8125rem;
            color: var(--muted-foreground);
            line-height: 1.55;
          }

          @media (max-width: 600px) {
            article {
              grid-template-columns: 1fr;
            }

            article .meta {
              grid-column: 1;
              grid-row: 2;
              justify-self: start;
              padding-top: 0;
            }

            article p {
              grid-column: 1;
              grid-row: 3;
            }
          }

          /* Footer */
          .feed-footer {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            gap: 1rem;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
            text-align: left;
          }

          .feed-footer p {
            margin: 0;
            font-size: 0.75rem;
            color: var(--muted-foreground);
          }

          .feed-footer p:first-child {
            color: var(--foreground);
            font-size: 0.8125rem;
          }

          .feed-footer p + p {
            text-align: right;
          }

          .feed-footer a {
            font-weight: 500;
          }

          @media (max-width: 600px) {
            .feed-footer {
              grid-template-columns: 1fr;
              gap: 0.25rem;
            }

            .feed-footer p + p {
              text-align: left;
            }
          }
        </style>
      </head>
      <body>
        <nav class="info-banner" aria-label="RSS subscription help">
          <p>Subscribe to this feed in your favorite newsreader.</p>
          <a href="https://aboutfeeds.com" target="_blank" rel="noopener noreferrer">About Feeds</a>
        </nav>
        <main>
          <header class="feed-header">
            <div class="feed-title-row">
              <!-- Classic RSS icon large -->
              <svg class="feed-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <defs>
                  <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg2">
                    <stop offset="0.0" stop-color="#E3702D"/><stop offset="0.1071" stop-color="#EA7D31"/>
                    <stop offset="0.3503" stop-color="#F69537"/><stop offset="0.5" stop-color="#FB9E3A"/>
                    <stop offset="0.7016" stop-color="#EA7C31"/><stop offset="0.8866" stop-color="#DE642B"/>
                    <stop offset="1.0" stop-color="#D95B29"/>
                  </linearGradient>
                </defs>
                <rect width="256" height="256" rx="55" ry="55" x="0" y="0" fill="#CC5D15"/>
                <rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"/>
                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg2)"/>
                <circle cx="68" cy="189" r="24" fill="#FFF"/>
                <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
              </svg>
              <div>
                <h1>
                  <xsl:value-of select="/rss/channel/title"/>
                </h1>
                <p class="feed-description">
                  <xsl:value-of select="/rss/channel/description"/>
                </p>
              </div>
              <a class="visit-link" target="_blank">
                <xsl:attribute name="href">
                  <xsl:value-of select="/rss/channel/link"/>
                </xsl:attribute>
                Visit Website
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </header>
          <hr/>
          <h2>Recent Items</h2>
          <xsl:for-each select="/rss/channel/item">
            <article>
              <h3>
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <div class="meta">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <xsl:value-of select="pubDate"/>
              </div>
              <p>
                <xsl:value-of select="description"/>
              </p>
            </article>
          </xsl:for-each>
        </main>
        <footer class="feed-footer">
          <p>Built in support of an open, independent web.</p>
          <p>In memory of <a href="https://en.wikipedia.org/wiki/Aaron_Swartz" target="_blank" rel="noreferrer">Aaron Swartz</a>.</p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>