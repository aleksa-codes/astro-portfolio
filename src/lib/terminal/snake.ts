import type { GameCtx } from "./context"

export function runSnake(gc: GameCtx): Promise<void> {
  const { term, input, render } = gc
  return new Promise((resolve) => {
    const rect = term.getBoundingClientRect()
    const canvas = document.createElement("canvas")
    canvas.setAttribute("aria-hidden", "true")
    canvas.style.cssText = `position:absolute;inset:0;z-index:10;pointer-events:none;width:${rect.width}px;height:${rect.height}px`
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    term.appendChild(canvas)
    const ctx = canvas.getContext("2d")!
    ctx.scale(dpr, dpr)
    const touchDevice = matchMedia("(pointer: coarse)").matches

    const hint = document.createElement("span")
    hint.setAttribute("aria-hidden", "true")
    hint.className =
      "absolute right-3 bottom-3 z-20 text-xs text-green-400/70 select-none"
    hint.textContent = touchDevice ? "tap × to exit" : "q / ctrl+c to exit"
    term.appendChild(hint)

    const CELL = 18
    let COLS = Math.floor(rect.width / CELL)
    let ROWS = Math.floor(rect.height / CELL)
    // Center the grid so any leftover canvas is split evenly between the
    // edges, instead of piling up on the right/bottom
    let OFFX = Math.round((rect.width - COLS * CELL) / 2)
    let OFFY = Math.round((rect.height - ROWS * CELL) / 2)

    let snake: { x: number; y: number }[] = [
      { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
    ]
    let dir = { x: 1, y: 0 }
    const turns: { x: number; y: number }[] = []
    let food: { x: number; y: number } | null = null
    let score = 0
    let over = false
    let moved = false
    let raf = 0
    let last = 0
    let interval = 120

    const occupied = (x: number, y: number) =>
      snake.some((s) => s.x === x && s.y === y)

    // Random empty cell — null means the board is full (win)
    const spawnFood = () => {
      const free: { x: number; y: number }[] = []
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) if (!occupied(x, y)) free.push({ x, y })
      food = free.length ? free[(Math.random() * free.length) | 0] : null
    }

    const restart = () => {
      snake = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }]
      dir = { x: 1, y: 0 }
      turns.length = 0
      score = 0
      over = false
      moved = false
      interval = 120
      spawnFood()
    }

    // Soft rounded tiles instead of harsh squares
    const fillTile = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      ctx.beginPath()
      if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, r)
      else ctx.rect(x, y, w, h)
      ctx.fill()
    }

    const step = () => {
      const next = turns.shift()
      // Buffer turns so quick inputs register, but never reverse into yourself
      if (next && !(next.x === -dir.x && next.y === -dir.y)) {
        dir = next
      }
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }
      if (
        head.x < 0 ||
        head.x >= COLS ||
        head.y < 0 ||
        head.y >= ROWS ||
        occupied(head.x, head.y)
      ) {
        over = true
        return
      }
      snake.unshift(head)
      if (food && head.x === food.x && head.y === food.y) {
        score++
        interval = Math.max(70, 120 - score * 3)
        spawnFood()
        if (!food) over = true // cleared the whole board
      } else {
        snake.pop()
      }
    }

    const paint = () => {
      ctx.fillStyle = "#040705"
      ctx.fillRect(0, 0, rect.width, rect.height)
      // Visible wall: the board may not fill the canvas exactly, so the
      // perimeter line marks where the snake actually dies
      ctx.strokeStyle = "rgba(74, 222, 128, 0.16)"
      ctx.lineWidth = 1
      ctx.strokeRect(OFFX + 0.5, OFFY + 0.5, COLS * CELL - 1, ROWS * CELL - 1)
      ctx.font = '700 13px "Geist Mono", monospace'

      if (over) {
        ctx.fillStyle = "rgba(4,7,5,0.55)"
        ctx.fillRect(0, 0, rect.width, rect.height)
        ctx.textAlign = "center"
        ctx.fillStyle = "#fca5a5"
        ctx.fillText(
          food ? "game over" : "you win!",
          rect.width / 2,
          rect.height / 2 - 8
        )
        ctx.fillStyle = "#86efac"
        ctx.fillText(
          touchDevice
            ? "tap to restart · × to exit"
            : "r to restart · q to exit",
          rect.width / 2,
          rect.height / 2 + 14
        )
        ctx.textAlign = "left"
        return
      }

      if (food) {
        ctx.fillStyle = "#f87171"
        ctx.beginPath()
        ctx.arc(
          OFFX + food.x * CELL + CELL / 2,
          OFFY + food.y * CELL + CELL / 2,
          CELL / 2 - 3,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#86efac" : "#22c55e"
        fillTile(
          OFFX + seg.x * CELL + 1,
          OFFY + seg.y * CELL + 1,
          CELL - 2,
          CELL - 2,
          4
        )
      })

      // Controls hint until the snake moves, score once it does
      if (!moved) {
        ctx.textAlign = "center"
        ctx.fillStyle = "#86efac"
        ctx.fillText(
          touchDevice ? "swipe to move" : "arrows / wasd to move",
          rect.width / 2,
          rect.height / 2
        )
        ctx.textAlign = "left"
      } else {
        ctx.fillStyle = "#9ca3af"
        ctx.fillText(`score: ${score}`, 10, 18)
      }
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (moved && !over && t - last >= interval) {
        last = t
        step()
      }
      paint()
    }

    let exited = false
    let handleResize: (() => void) | null = null
    const exit = () => {
      if (exited) return
      exited = true
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", onKey)
      term.removeEventListener("touchstart", onTouchStart)
      term.removeEventListener("touchmove", onTouchMove)
      if (handleResize) window.removeEventListener("resize", handleResize)
      // Discard anything typed into the invisible input mid-game
      input.value = ""
      render()
      canvas.style.transition = "opacity 300ms ease-out"
      canvas.style.opacity = "0"
      hint.style.transition = "opacity 300ms ease-out"
      hint.style.opacity = "0"
      exitBtn.style.transition = "opacity 300ms ease-out"
      exitBtn.style.opacity = "0"
      pad.style.transition = "opacity 300ms ease-out"
      pad.style.opacity = "0"
      setTimeout(() => {
        canvas.remove()
        hint.remove()
        exitBtn.remove()
        pad.remove()
      }, 350)
      resolve()
    }

    const exitBtn = document.createElement("button")
    exitBtn.setAttribute("aria-label", "Exit snake")
    exitBtn.className =
      "absolute top-2 right-2 z-30 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-sm text-green-300/80 transition-colors duration-150 hover:bg-white/10 hover:text-green-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    exitBtn.textContent = "×"
    // Keeps the game's own touch handling from seeing the button's taps
    exitBtn.addEventListener("touchstart", (e) => e.stopPropagation())
    exitBtn.addEventListener("click", exit)
    term.appendChild(exitBtn)

    // Terminal-style D-pad: text arrow keys, only needed on touch screens.
    // Grid slots are set inline so Tailwind's scanner keeps the literal
    // class names.
    const padKeys = [
      { d: { x: 0, y: -1 }, label: "▲", col: 2, row: 1 },
      { d: { x: -1, y: 0 }, label: "◀", col: 1, row: 2 },
      { d: { x: 0, y: 1 }, label: "▼", col: 2, row: 2 },
      { d: { x: 1, y: 0 }, label: "▶", col: 3, row: 2 },
    ]
    const pad = document.createElement("div")
    pad.className =
      "absolute bottom-3 left-1/2 z-30 grid -translate-x-1/2 grid-cols-3 gap-1"
    pad.style.pointerEvents = "auto"
    pad.addEventListener("touchstart", (e) => e.stopPropagation())
    for (const { d, label, col, row } of padKeys) {
      const btn = document.createElement("button")
      btn.setAttribute("aria-label", `Move ${label}`)
      btn.className =
        "flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-secondary/40 font-mono text-sm text-green-300/90 transition-colors duration-150 active:bg-green-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      btn.style.gridColumn = col.toString()
      btn.style.gridRow = row.toString()
      btn.textContent = label
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault()
        steer(d)
      })
      pad.appendChild(btn)
    }
    if (touchDevice) term.appendChild(pad)

    const steer = (d: { x: number; y: number }) => {
      moved = true
      last = performance.now()
      if (turns.length < 2) turns.push(d)
    }

    const onKey = (e: KeyboardEvent) => {
      const dirs: Record<string, { x: number; y: number }> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      }
      if (dirs[e.key]) {
        e.preventDefault()
        steer(dirs[e.key])
      } else if (
        e.key === "q" ||
        e.key === "Escape" ||
        (e.ctrlKey && e.key === "c")
      ) {
        e.preventDefault()
        exit()
      } else if (over && (e.key === "r" || e.key === "Enter")) {
        restart()
        last = performance.now()
      }
    }
    document.addEventListener("keydown", onKey)

    // Touch controls: swipe anywhere on the terminal to steer, tap to
    // restart on game over. touchmove is captured so the page doesn't
    // scroll mid-game.
    let touchStart: { x: number; y: number } | null = null
    const onTouchStart = (e: TouchEvent) => {
      if (exited) return
      if (over) {
        restart()
        last = performance.now()
        return
      }
      const t = e.touches[0]
      touchStart = { x: t.clientX, y: t.clientY }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (exited || !touchStart) return
      const t = e.touches[0]
      const dx = t.clientX - touchStart.x
      const dy = t.clientY - touchStart.y
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
      e.preventDefault()
      const move =
        Math.abs(dx) > Math.abs(dy)
          ? { x: Math.sign(dx), y: 0 }
          : { x: 0, y: Math.sign(dy) }
      // Reset the origin so consecutive swipes chain into new turns
      touchStart = { x: t.clientX, y: t.clientY }
      steer(move)
    }
    term.addEventListener("touchstart", onTouchStart, { passive: true })
    term.addEventListener("touchmove", onTouchMove, { passive: false })

    // Keep the board glued to the terminal across viewport resizes
    // (rotation, URL bar collapse, window drag). If a segment lands
    // outside the new bounds, restart so the walls never turn invisible.
    handleResize = () => {
      const r = term.getBoundingClientRect()
      const rd = Math.min(window.devicePixelRatio || 1, 2)
      canvas.style.width = `${r.width}px`
      canvas.style.height = `${r.height}px`
      canvas.width = Math.max(1, Math.round(r.width * rd))
      canvas.height = Math.max(1, Math.round(r.height * rd))
      ctx.setTransform(rd, 0, 0, rd, 0, 0)
      rect.width = r.width
      rect.height = r.height
      COLS = Math.max(3, Math.floor(rect.width / CELL))
      ROWS = Math.max(3, Math.floor(rect.height / CELL))
      OFFX = Math.round((rect.width - COLS * CELL) / 2)
      OFFY = Math.round((rect.height - ROWS * CELL) / 2)
      if (snake.some((s) => s.x >= COLS || s.y >= ROWS)) restart()
      if (food && (food.x >= COLS || food.y >= ROWS)) spawnFood()
    }
    window.addEventListener("resize", handleResize)

    spawnFood()
    raf = requestAnimationFrame(frame)
  })
}
