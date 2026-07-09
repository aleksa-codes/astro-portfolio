import { minifySync } from "@swc/core"
import { minify as minifyHtml } from "@swc/html"
import type { AstroIntegration } from "astro"
import { existsSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { cpus } from "node:os"
import { extname, join } from "node:path"
import { fileURLToPath } from "node:url"

const CONCURRENCY = Math.max(2, cpus().length)

interface MinifyStats {
  files: number
  bytesSaved: number
}

async function collectFiles(dir: string, exts: Set<string>): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })
  const out: string[] = []
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!exts.has(extname(entry.name))) continue
    if (entry.name.includes(".vite")) continue
    const parent =
      (entry as { parentPath?: string; path?: string }).parentPath ??
      (entry as { path?: string }).path ??
      dir
    out.push(join(parent, entry.name))
  }
  return out
}

async function runPool<T>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<void>
) {
  let i = 0
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (i < items.length) {
        await task(items[i++])
      }
    }
  )
  await Promise.all(workers)
}

async function minifyJsFile(file: string, stats: MinifyStats) {
  const code = await readFile(file, "utf-8")
  const { code: min } = minifySync(code, {
    compress: true,
    mangle: true,
    module: true,
  })
  if (min.length < code.length) {
    await writeFile(file, min)
    stats.files++
    stats.bytesSaved += code.length - min.length
  }
}

async function minifyHtmlFile(file: string, stats: MinifyStats) {
  const html = await readFile(file, "utf-8")
  const { code: min } = await minifyHtml(Buffer.from(html), {
    collapseWhitespaces: "smart",
    removeComments: false, // avoid stripping SSR/hydration marker comments
    preserveComments: ["^!"],
    removeEmptyAttributes: true,
    removeRedundantAttributes: "all",
    collapseBooleanAttributes: true,
    minifyJs: true,
    minifyCss: true,
    minifyJson: true,
    // sorting class/attribute values can break hydration-sensitive frameworks
    sortSpaceSeparatedAttributeValues: false,
  })
  if (min.length < html.length) {
    await writeFile(file, min)
    stats.files++
    stats.bytesSaved += html.length - min.length
  }
}

function formatBytes(n: number): string {
  return n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`
}

async function minifyAll(
  files: string[],
  stats: MinifyStats,
  fn: (file: string, stats: MinifyStats) => Promise<void>
) {
  await runPool(files, CONCURRENCY, async (file) => {
    try {
      await fn(file, stats)
    } catch (err) {
      console.warn(`[minify-dist] failed on ${file}: ${(err as Error).message}`)
    }
  })
}

export function minifyDist(): AstroIntegration {
  return {
    name: "minify-dist",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const root = fileURLToPath(dir)
        const dist = existsSync(join(root, "client"))
          ? join(root, "client")
          : root

        const [jsFiles, htmlFiles] = await Promise.all([
          collectFiles(dist, new Set([".js"])),
          collectFiles(dist, new Set([".html"])),
        ])

        const jsStats: MinifyStats = { files: 0, bytesSaved: 0 }
        const htmlStats: MinifyStats = { files: 0, bytesSaved: 0 }

        await Promise.all([
          minifyAll(jsFiles, jsStats, minifyJsFile),
          minifyAll(htmlFiles, htmlStats, minifyHtmlFile),
        ])

        console.log(
          `[minify-dist] JS: ${jsStats.files} files, ${formatBytes(jsStats.bytesSaved)} saved | ` +
            `HTML: ${htmlStats.files} files, ${formatBytes(htmlStats.bytesSaved)} saved`
        )
      },
    },
  }
}
