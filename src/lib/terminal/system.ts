import type { GameCtx } from "./context"

export function runSystem(gc: GameCtx): Promise<void> {
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
    hint.textContent = touchDevice
      ? "tap to launch a comet"
      : "tap to launch a comet — q to exit"
    term.appendChild(hint)

    // ---- ASCII solar system ----
    const FONT = '700 13px "Geist Mono", monospace'
    ctx.font = FONT
    const charW = Math.max(7, Math.ceil(ctx.measureText("M").width))
    const fontH = 15
    let COLS = Math.max(26, Math.floor(rect.width / charW))
    let ROWS = Math.max(14, Math.floor(rect.height / fontH))
    const CENTER_X = COLS / 2
    const CENTER_Y = ROWS / 2
    const cellX = (c: number) => Math.round(c) * charW
    const baseline = (r: number) => r * fontH + fontH * 0.8

    const ORBITS = 6
    let maxRx = COLS / 2 - 4
    let maxRy = ROWS / 2 - 1

    // Sun + planets (orbit slot, drift speed, glyph, color, ring)
    const PLANETS = [
      { o: 1, speed: 1.05, glyph: "o", color: "#a8a29e", ring: false },
      { o: 2, speed: 0.82, glyph: "O", color: "#f59e0b", ring: false },
      { o: 3, speed: 0.62, glyph: "@", color: "#38bdf8", ring: false },
      { o: 4, speed: 0.48, glyph: "x", color: "#ef4444", ring: false },
      { o: 5, speed: 0.37, glyph: "O", color: "#fbbf24", ring: true }, // Saturn
      { o: 6, speed: 0.28, glyph: "o", color: "#22d3ee", ring: false },
    ]
    let planetPhase = PLANETS.map(() => Math.random() * Math.PI * 2)

    const hexRGB = (hex: string) => {
      const n = parseInt(hex.slice(1), 16)
      return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
    }

    // Field stars in two layers (dense dim far + a few bright near) for depth
    type BgStar = {
      x: number
      y: number
      ph: number
      tw: number
      bright: boolean
    }
    let bgStars: BgStar[] = []
    const buildStars = () => {
      bgStars = []
      const count = Math.floor((COLS * ROWS) / 8)
      for (let i = 0; i < count; i++) {
        bgStars.push({
          x: 1 + Math.random() * (COLS - 2),
          y: 1 + Math.random() * (ROWS - 2),
          ph: Math.random() * Math.PI * 2,
          tw: 2 + Math.random() * 4,
          bright: Math.random() < 0.08,
        })
      }
    }
    buildStars()

    interface Comet {
      x: number
      y: number
      vx: number
      vy: number
      life: number
    }
    const comets: Comet[] = []
    let lastComet = 0
    const launchComet = () => {
      const fromLeft = Math.random() < 0.5
      const angle = 0.55 + Math.random() * 0.7
      const speed = 260 + Math.random() * 180
      comets.push({
        x: fromLeft ? -10 : rect.width + 10,
        y: rect.height * (0.1 + Math.random() * 0.35),
        vx: (fromLeft ? 1 : -1) * Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
      })
    }

    let exited = false
    let handleResize: (() => void) | null = null
    let onKey: ((e: KeyboardEvent) => void) | null = null
    let onPointerDown: (() => void) | null = null
    const exit = () => {
      if (exited) return
      exited = true
      cancelAnimationFrame(raf)
      if (onKey) document.removeEventListener("keydown", onKey)
      if (onPointerDown) term.removeEventListener("pointerdown", onPointerDown)
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
    exitBtn.setAttribute("aria-label", "Exit system")
    exitBtn.className =
      "absolute top-2 right-2 z-30 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-sm text-green-300/80 transition-colors duration-150 hover:bg-white/10 hover:text-green-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    exitBtn.textContent = "×"
    // Ignore the system's own pointer handling for the button's taps
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
      launchComet()
    }
    term.addEventListener("pointerdown", onPointerDown)

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
      COLS = Math.max(26, Math.floor(rect.width / charW))
      ROWS = Math.max(14, Math.floor(rect.height / fontH))
      maxRx = COLS / 2 - 4
      maxRy = ROWS / 2 - 1
      buildStars()
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

      for (let i = 0; i < PLANETS.length; i++) {
        planetPhase[i] += PLANETS[i].speed * dt
      }

      // deep-space backdrop
      ctx.fillStyle = "#05050f"
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.font = FONT
      ctx.textAlign = "left"
      ctx.textBaseline = "alphabetic"

      // faint milky-way band sweeping behind — mostly about scale
      const band = ctx.createLinearGradient(0, 0, rect.width, rect.height)
      band.addColorStop(0, "rgba(148, 163, 255, 0.05)")
      band.addColorStop(0.5, "rgba(226, 232, 240, 0.04)")
      band.addColorStop(1, "rgba(255, 214, 215, 0.05)")
      ctx.fillStyle = band
      ctx.fillRect(0, 0, rect.width, rect.height)

      // field stars twinkling behind — dim layer + a few bright "+\"'s
      for (const s of bgStars) {
        const tw = 0.3 + 0.5 * Math.abs(Math.sin(runT * 0.001 * s.tw + s.ph))
        ctx.fillStyle = `rgba(${
          s.bright ? "255, 255, 255" : "203, 213, 225"
        }, ${tw.toFixed(2)})`
        ctx.fillText(s.bright ? "+" : "·", cellX(s.x), baseline(s.y))
      }

      // orbit rings
      ctx.fillStyle = "rgba(125, 211, 252, 0.22)"
      for (let o = 1; o <= ORBITS; o++) {
        const rx = (maxRx * o) / ORBITS
        const ry = (maxRy * o) / ORBITS
        for (let k = 0; k < 100; k++) {
          const a = (k / 100) * Math.PI * 2
          const x = CENTER_X + rx * Math.cos(a)
          const y = CENTER_Y + ry * Math.sin(a)
          if (x < 0 || x >= COLS || y < 0 || y >= ROWS) continue
          ctx.fillText("·", cellX(x), baseline(y))
        }
      }

      // the sun — warm, slowly pulsing, with soft rays
      const glow = 0.7 + 0.3 * Math.sin(runT * 0.0015)
      ctx.fillStyle = `rgba(254, 215, 102, ${Math.min(1, glow).toFixed(2)})`
      ctx.fillText("*", cellX(CENTER_X), baseline(CENTER_Y))
      ctx.fillStyle = "rgba(253, 186, 116, 0.16)"
      ctx.fillText("~", cellX(CENTER_X - 1), baseline(CENTER_Y))
      ctx.fillText("~", cellX(CENTER_X + 1), baseline(CENTER_Y))

      // planets with faint motion trails
      for (let i = 0; i < PLANETS.length; i++) {
        const p = PLANETS[i]
        const rx = (maxRx * p.o) / ORBITS
        const ry = (maxRy * p.o) / ORBITS
        const a = planetPhase[i]
        for (let k = 1; k <= 3; k++) {
          const ta = a - k * p.speed * 0.05
          const tx = CENTER_X + rx * Math.cos(ta)
          const ty = CENTER_Y + ry * Math.sin(ta)
          ctx.fillStyle = `rgba(${hexRGB(p.color)}, ${(0.22 / k).toFixed(2)})`
          ctx.fillText("·", cellX(tx), baseline(ty))
        }
        const x = CENTER_X + rx * Math.cos(a)
        const y = CENTER_Y + ry * Math.sin(a)
        ctx.fillStyle = p.color
        ctx.fillText(p.glyph, cellX(x), baseline(y))
        if (p.ring) {
          // Saturn's ring, tilted slightly
          ctx.fillStyle = "rgba(231, 194, 120, 0.7)"
          ctx.fillText("=", cellX(x - 1.4), baseline(y + 0.5))
          ctx.fillText("=", cellX(x + 1.4), baseline(y + 0.5))
        }
      }

      // comets — a little ambient traffic plus one per tap
      if (t - lastComet > 4000 + Math.random() * 3500) {
        launchComet()
        lastComet = t
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const m = comets[i]
        m.x += m.vx * dt
        m.y += m.vy * dt
        m.life -= dt * 0.7
        if (
          m.life <= 0 ||
          m.x < -80 ||
          m.x > rect.width + 80 ||
          m.y > rect.height + 40
        ) {
          comets.splice(i, 1)
          continue
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${(m.life * 0.7).toFixed(2)})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(m.x - m.vx * 0.045, m.y - m.vy * 0.045)
        ctx.lineTo(m.x, m.y)
        ctx.stroke()
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life.toFixed(2)})`
        ctx.beginPath()
        ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    raf = requestAnimationFrame(frame)
  })
}
