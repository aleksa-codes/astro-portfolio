/** Shared dependencies the terminal easter-egg games need from their host. */
export interface GameCtx {
  /** The terminal body element the overlay + control listeners attach to. */
  term: HTMLElement
  /** The invisible input that mirrors typed commands. */
  input: HTMLInputElement
  /** Re-renders the mirror input (used to clear it when a game exits). */
  render: () => void
}
