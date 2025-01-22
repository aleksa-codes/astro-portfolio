<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title"/> Web Feed
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
        <style>
          *{margin:0;padding:0;box-sizing:border-box}:root{--bg:#fafaf9;--fg:#1c1917;--primary:#059669;--accent:#15803d;--muted:#e7e5e4;--muted-fg:#57534e;--border:#d6d3d1;--radius:.75rem;--shadow:0 1px 3px rgba(0,0,0,.1)}@media(prefers-color-scheme:dark){:root{--bg:#1c1917;--fg:#fafaf9;--primary:#34d399;--accent:#6ee7b7;--muted:#292524;--muted-fg:#a8a29e;--border:#44403c}}html{font-family:system-ui,sans-serif;background:var(--bg);color:var(--fg)}body{max-width:65ch;margin:1.5rem auto;padding:0 1rem;line-height:1.6;font-size:16px}@media(max-width:768px){body{margin:1rem auto;font-size:15px}}nav{background:var(--muted);border-radius:var(--radius);padding:1rem;margin-bottom:2rem;box-shadow:var(--shadow)}nav p{color:var(--muted-fg)}h1{display:flex;align-items:center;gap:.75rem;font-size:1.875rem;margin:2rem 0 1rem}@media(max-width:768px){h1{font-size:1.5rem}}h2{font-size:1.5rem;margin:2rem 0 1rem}h3{margin:1rem 0 .5rem}a{color:var(--primary);text-decoration:none;transition:color .15s}a:hover{color:var(--accent)}article{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin:1rem 0;transition:transform .2s,box-shadow .2s}article:hover{transform:translateY(-2px);box-shadow:var(--shadow)}small{color:var(--muted-fg);display:block;margin:.5rem 0}p{margin:.75rem 0;color:var(--fg)}
        </style>
      </head>
      <body>
        <nav>
          <p>
            <strong>This is a web feed,</strong> also known as an RSS feed. <strong>Subscribe</strong> by copying the URL from the address bar into your newsreader. Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more.
          </p>
        </nav>
        <main>
          <header>
            <h1>
              <!-- https://commons.wikimedia.org/wiki/File:Feed-icon.svg -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style="width:1.5em;height:1.5em">
                <defs>
                  <linearGradient id="RSSg" x1=".085" y1=".085" x2=".915" y2=".915">
                    <stop offset="0" stop-color="#E3702D"/><stop offset=".107" stop-color="#EA7D31"/>
                    <stop offset=".35" stop-color="#F69537"/><stop offset=".5" stop-color="#FB9E3A"/>
                    <stop offset=".702" stop-color="#EA7C31"/><stop offset=".887" stop-color="#DE642B"/>
                    <stop offset="1" stop-color="#D95B29"/>
                  </linearGradient>
                </defs>
                <rect width="256" height="256" rx="55" ry="55" fill="#CC5D15"/>
                <rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"/>
                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
                <circle cx="68" cy="189" r="24" fill="#FFF"/>
                <path d="M160 213h-34a82 82 0 0 0-82-82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
                <path d="M184 213A140 140 0 0 0 44 73V38a175 175 0 0 1 175 175z" fill="#FFF"/>
              </svg>
              <xsl:value-of select="/rss/channel/title"/>
            </h1>
            <p>
              <xsl:value-of select="/rss/channel/description"/>
            </p>
            <a target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
              Visit Website →
            </a>
          </header>
          <h2>Recent Posts</h2>
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
              <small>
                Published: <xsl:value-of select="pubDate" />
              </small>
              <p>
                <xsl:value-of select="description" />
              </p>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>