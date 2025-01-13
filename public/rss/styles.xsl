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
          <xsl:value-of select="/rss/channel/title"/> Web Feed
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          a,h1,h2,nav a:hover{color:var(--primary)}a:hover,nav a{color:var(--accent)}a:hover,nav a:hover{text-decoration-color:currentColor}article,nav{padding:1rem}article,h1{margin:1rem 0}nav,small{color:var(--muted-foreground)}:root{--background:hsl(80, 20%, 97%);--foreground:hsl(147, 30%, 15%);--primary:hsl(147, 40%, 25%);--primary-foreground:hsl(80, 20%, 97%);--muted:hsl(147, 15%, 90%);--muted-foreground:hsl(147, 20%, 35%);--accent:hsl(33, 100%, 30%);--border:hsl(147, 15%, 85%);--radius:0.5rem}*,::after,::before{box-sizing:border-box;margin:0;padding:0}html{font-family:system-ui,-apple-system,sans-serif;background:var(--background);color:var(--foreground)}body{max-width:80ch;margin:2rem auto;padding:0 1rem;line-height:1.7}nav{background:var(--muted);border-radius:var(--radius);margin-bottom:2rem}nav a{font-weight:600;text-decoration-color:var(--accent)}h1{display:flex;align-items:center;gap:.5rem;font-size:2rem}h2{font-size:1.5rem;margin:2rem 0 1rem}h3{margin:1.5rem 0 .5rem}a{text-decoration:underline;text-underline-offset:0.2em;text-decoration-thickness:0.1em;text-decoration-color:var(--border)}p{margin:.5rem 0}article{border:1px solid var(--border);border-radius:var(--radius)}
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
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" class="pr-1" id="RSSicon" viewBox="0 0 256 256">
                <defs>
                  <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                    <stop  offset="0.0" stop-color="#E3702D"/><stop  offset="0.1071" stop-color="#EA7D31"/>
                    <stop  offset="0.3503" stop-color="#F69537"/><stop  offset="0.5" stop-color="#FB9E3A"/>
                    <stop  offset="0.7016" stop-color="#EA7C31"/><stop  offset="0.8866" stop-color="#DE642B"/>
                    <stop  offset="1.0" stop-color="#D95B29"/>
                  </linearGradient>
                </defs>
                <rect width="256" height="256" rx="55" ry="55" x="0"  y="0"  fill="#CC5D15"/>
                <rect width="246" height="246" rx="50" ry="50" x="5"  y="5"  fill="#F49C52"/>
                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
                <circle cx="68" cy="189" r="24" fill="#FFF"/>
                <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
              </svg>
              <xsl:value-of select="/rss/channel/title"/> RSS Feed Preview
            </h1>
            <p>
              <xsl:value-of select="/rss/channel/description"/>
            </p>
            <a target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
              Visit Website &#x2192;
            </a>
          </header>
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