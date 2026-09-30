import { games, type Game } from "@/lib/games"

/** Newest first, the order the grid renders in. */
export const sortedGames: Game[] = [...games].sort((a, b) =>
  (b.date ?? "").localeCompare(a.date ?? "")
)

/**
 * Tags used by two or more games, most used first.
 *
 * The tags in games.ts are ordered on purpose: the first is what makes a game a
 * game (the renderer, then the genre) and it is the one that reliably reaches
 * multiple games, so it is the one that earns a filter page. Later tags are
 * finer detail, useful on the card but too rare to filter by. A filter that
 * leaves a single card is worse than no filter at all, so a tag used once gets
 * no page.
 */
export const filterTags: string[] = (() => {
  const counts = new Map<string, number>()
  for (const game of games) {
    for (const tag of game.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
})()

/** "Three.js" -> "three-js", for use in a URL. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

/** The tag a slug points at, or undefined when the slug is not a filter. */
export function tagFromSlug(slug: string): string | undefined {
  return filterTags.find((tag) => tagSlug(tag) === slug)
}

export function gamesWithTag(tag: string): Game[] {
  const needle = tag.toLowerCase()
  return sortedGames.filter((game) =>
    (game.tags ?? []).some((t) => t.toLowerCase() === needle)
  )
}
