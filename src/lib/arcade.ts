import { games, type Game } from "@/lib/games"

export const sortedGames: Game[] = [...games].sort((a, b) =>
  (b.date ?? "").localeCompare(a.date ?? "")
)
