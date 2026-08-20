import type { GameCtx } from "./context"

export function runTank(gc: GameCtx): Promise<void> {
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

    // Text grid the aquarium is drawn on
    const FONT = '700 13px "Geist Mono", monospace'
    ctx.font = FONT
    const charW = Math.max(7, Math.ceil(ctx.measureText("M").width))
    const fontH = 15
    let COLS = Math.max(20, Math.floor(rect.width / charW))
    let ROWS = Math.max(10, Math.floor(rect.height / fontH))
    const BOTTOM = ROWS - 1
    const cellX = (c: number) => c * charW
    const baseline = (r: number) => r * fontH + fontH * 0.82

    // Seaweed stalks rooted on the gravel
    interface Weed {
      x: number
      h: number
      phase: number
    }
    let weeds: Weed[] = []
    const buildWeeds = () => {
      weeds = []
      for (let i = 0; i < 6; i++) {
        weeds.push({
          x: 1 + Math.floor(Math.random() * Math.max(1, COLS - 3)),
          h: 5 + Math.floor(Math.random() * 5),
          phase: Math.random() * Math.PI * 2,
        })
      }
    }
    buildWeeds()

    interface Fish {
      x: number
      baseY: number
      dir: 1 | -1
      speed: number
      bobPhase: number
      bobAmp: number
      color: string
      left: string
      right: string
    }
    const SPECIES = [
      { color: "#4ade80", left: "<*)))><", right: "><(((*>" },
      { color: "#63e6e2", left: "<><", right: "><>" },
      { color: "#fbbf24", left: "<((<<>", right: "><>>)>" },
      { color: "#f472b6", left: "<°)))><", right: "><(((*°" },
    ]
    const fish: Fish[] = Array.from({ length: 6 }, (): Fish => {
      const s = SPECIES[(Math.random() * SPECIES.length) | 0]
      return {
        x: 2 + Math.random() * (COLS - 5),
        baseY: 1.5 + Math.random() * (ROWS - 4),
        dir: Math.random() < 0.5 ? -1 : 1,
        speed: 1.6 + Math.random() * 2.4,
        bobPhase: Math.random() * Math.PI * 2,
        bobAmp: 0.35 + Math.random() * 0.45,
        color: s.color,
        left: s.left,
        right: s.right,
      }
    })

    // Pink jellyfish — drift slowly and bob more than the fish
    interface Jelly {
      x: number
      baseY: number
      dir: 1 | -1
      speed: number
      bobPhase: number
    }
    const jellies: Jelly[] = Array.from({ length: 3 }, (): Jelly => ({
      x: 2 + Math.random() * (COLS - 7),
      baseY: 2.5 + Math.random() * (ROWS - 8),
      dir: Math.random() < 0.5 ? -1 : 1,
      speed: 0.9 + Math.random() * 0.8,
      bobPhase: Math.random() * Math.PI * 2,
    }))

    interface Bubble {
      x: number
      y: number
      speed: number
    }
    const bubbles: Bubble[] = []
    let lastSpawn = 0
    const spawnBubble = () => {
      const wx = weeds[(Math.random() * weeds.length) | 0]?.x ?? COLS / 2
      bubbles.push({
        x: Math.max(0, wx + (Math.random() * 3 - 1.5)),
        y: BOTTOM - 0.5,
        speed: 1.4 + Math.random() * 1.8,
      })
    }

    // Tap the glass and the fish dart away for a beat
    let scareUntil = 0
    const scare = () => {
      scareUntil = performance.now() + 1400
    }

    let exited = false
    let handleResize: (() => void) | null = null
    let onKey: ((e: KeyboardEvent) => void) | null = null
    let onPointerDown: ((e: PointerEvent) => void) | null = null
    let onPointerUp: (() => void) | null = null
    const exit = () => {
      if (exited) return
      exited = true
      cancelAnimationFrame(raf)
      if (onKey) document.removeEventListener("keydown", onKey)
      if (onPointerDown) term.removeEventListener("pointerdown", onPointerDown)
      if (onPointerUp) term.removeEventListener("pointerup", onPointerUp)
      if (handleResize) window.removeEventListener("resize", handleResize)
      input.value = ""
      render()
      canvas.style.transition = "opacity 300ms ease-out"
      canvas.style.opacity = "0"
      exitBtn.style.transition = "opacity 300ms ease-out"
      exitBtn.style.opacity = "0"
      hint.style.transition = "opacity 300ms ease-out"
      hint.style.opacity = "0"
      setTimeout(() => {
        canvas.remove()
        exitBtn.remove()
        hint.remove()
      }, 350)
      resolve()
    }

    const exitBtn = document.createElement("button")
    exitBtn.setAttribute("aria-label", "Exit tank")
    exitBtn.className =
      "absolute top-2 right-2 z-30 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-sm text-green-300/80 transition-colors duration-150 hover:bg-white/10 hover:text-green-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    exitBtn.textContent = "×"
    exitBtn.addEventListener("touchstart", (e) => e.stopPropagation())
    exitBtn.addEventListener("pointerdown", (e) => e.stopPropagation())
    exitBtn.addEventListener("click", exit)
    term.appendChild(exitBtn)

    onKey = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Escape" || (e.ctrlKey && e.key === "c")) {
        e.preventDefault()
        exit()
      }
    }
    document.addEventListener("keydown", onKey)

    onPointerDown = () => {
      if (exited) return
      scare()
    }
    onPointerUp = () => {
      /* no-op; pointerdown already scared the fish */
    }
    term.addEventListener("pointerdown", onPointerDown)
    term.addEventListener("pointerup", onPointerUp)

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
      COLS = Math.max(20, Math.floor(rect.width / charW))
      ROWS = Math.max(10, Math.floor(rect.height / fontH))
      buildWeeds()
      for (const f of fish) f.x = Math.min(f.x, COLS - 3)
    }
    window.addEventListener("resize", handleResize)

    let startT = performance.now()
    let raf = 0
    let lastDt = performance.now()

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((t - lastDt) / 1000, 0.1)
      lastDt = t
      const runT = t - startT
      const scared = t < scareUntil
      const mult = scared ? 2.6 : 1

      // update fish
      for (const f of fish) {
        f.x += f.dir * f.speed * mult * dt
        // bounce at the walls and pick a fresh lane
        if (f.x < -2) {
          f.dir = 1
          f.baseY = 1.5 + Math.random() * (ROWS - 4)
        } else if (f.x > COLS + 1) {
          f.dir = -1
          f.baseY = 1.5 + Math.random() * (ROWS - 4)
        }
      }
      // bubbles
      if (t - lastSpawn > 900 + Math.random() * 800) {
        spawnBubble()
        lastSpawn = t
      }
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]
        b.y -= b.speed * dt
        if (b.y < 1) bubbles.splice(i, 1)
      }

      // jellies drift slowly, shrinking their lane at the walls
      for (const j of jellies) {
        j.x += j.dir * j.speed * mult * dt
        if (j.x < 1) j.dir = 1
        else if (j.x > COLS - 5) j.dir = -1
      }

      // draw
      ctx.fillStyle = "#040705"
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.font = FONT
      ctx.textAlign = "left"
      ctx.textBaseline = "alphabetic"

      // gentle surface ripple at the top of the tank
      ctx.fillStyle = "rgba(165, 243, 252, 0.5)"
      for (let i = 0; i < COLS; i++) {
        const wv = Math.sin((i / COLS) * Math.PI * 6 + runT * 0.0012)
        const ch = wv > 0.45 ? "~" : wv < -0.45 ? "-" : " "
        ctx.fillText(ch, cellX(i), baseline(0))
      }

      // gravel floor
      ctx.fillStyle = "#4b5563"
      const gravel = ".,·,~,.,·,"
      for (let i = 0; i < COLS; i++) {
        ctx.fillText(gravel[i % gravel.length], cellX(i), baseline(BOTTOM))
      }

      // a couple of low rocks resting on the sand
      ctx.fillStyle = "#57534e"
      for (const rx of [3, COLS - 7]) {
        ctx.fillText(".###.", cellX(rx), baseline(BOTTOM - 1))
        ctx.fillText("#####", cellX(rx), baseline(BOTTOM))
      }

      // seaweed sway
      ctx.fillStyle = "#22c55e"
      for (const w of weeds) {
        const sway = Math.sin(runT * 0.0018 + w.phase)
        for (let i = 0; i < w.h; i++) {
          const r = BOTTOM - 1 - i
          if (r < 1) break
          const frac = i / w.h
          const off = Math.round(sway * frac * 2)
          const ch = off > 0 ? "\\" : off < 0 ? "/" : "|"
          ctx.fillText(ch, cellX(w.x + off), baseline(r))
        }
      }

      // bubbles — wobbling on their way up
      ctx.fillStyle = "#a5f3fc"
      for (const b of bubbles) {
        const wobble = Math.sin(runT * 0.003 + b.y * 0.35) * 0.4
        ctx.fillText("o", cellX(b.x + wobble), baseline(Math.round(b.y)))
      }

      // pink jellyfish — pulsing tentacles on a gentle bob
      for (const j of jellies) {
        const row = Math.max(
          1,
          Math.round(j.baseY + Math.sin(runT * 0.0016 + j.bobPhase) * 0.8)
        )
        const x = cellX(j.x)
        ctx.fillStyle = "#f0abfc"
        ctx.fillText("(o·o)", x, baseline(row))
        ctx.fillStyle = "rgba(240, 171, 252, 0.75)"
        const flick = Math.floor(runT / 900 + j.bobPhase) % 2 === 0
        ctx.fillText(flick ? "\\|/" : "/|\\", x + charW, baseline(row + 1))
      }

      // fish
      for (const f of fish) {
        const yy = f.baseY + Math.sin(runT * 0.0025 + f.bobPhase) * f.bobAmp
        const row = Math.max(1, Math.min(ROWS - 1, Math.round(yy)))
        ctx.fillStyle = f.color
        ctx.fillText(f.dir === 1 ? f.right : f.left, cellX(f.x), baseline(row))
      }

      // warm light from above, breathing slowly — ties the whole tank together
      const breathe = 0.5 + 0.5 * Math.sin(runT * 0.0007)
      const glow = ctx.createLinearGradient(0, 0, 0, rect.height)
      glow.addColorStop(0, `rgba(255, 241, 199, ${0.05 + 0.05 * breathe})`)
      glow.addColorStop(0.45, "rgba(30, 80, 140, 0)")
      glow.addColorStop(1, "rgba(4, 12, 30, 0.22)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, rect.width, rect.height)
    }
    raf = requestAnimationFrame(frame)
  })
}
