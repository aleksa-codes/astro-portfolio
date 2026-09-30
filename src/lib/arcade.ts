import { games, type Game } from "@/lib/games"

export const sortedGames: Game[] = [...games].sort((a, b) =>
  (b.date ?? "").localeCompare(a.date ?? "")
)

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

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function tagFromSlug(slug: string): string | undefined {
  return filterTags.find((tag) => tagSlug(tag) === slug)
}

export function gamesWithTag(tag: string): Game[] {
  const needle = tag.toLowerCase()
  return sortedGames.filter((game) =>
    (game.tags ?? []).some((t) => t.toLowerCase() === needle)
  )
}
