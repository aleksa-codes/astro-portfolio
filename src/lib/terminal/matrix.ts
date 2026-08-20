import type { GameCtx } from "./context"

export function runMatrix(gc: GameCtx): Promise<void> {
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

    // Exit hint, like a TUI app's status line
    const hint = document.createElement("span")
    hint.setAttribute("aria-hidden", "true")
    hint.className =
      "absolute right-3 bottom-3 z-20 text-xs text-green-400/70 select-none"
    hint.textContent = touchDevice ? "tap here to exit" : "q / ctrl+c to exit"
    term.appendChild(hint)

    // Spatial streams: falling glyph columns at three depth layers (far /
    // mid / near), bright head fading into an Apple-green body.
    const CHARS =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ⌘⌥⌃⇧"
    const LAYERS = [
      { scale: 0.65, speed: 0.55, opacity: 0.35, color: "#1B6A31" },
      { scale: 1.0, speed: 1.0, opacity: 0.85, color: "#30D158" },
      { scale: 1.35, speed: 1.45, opacity: 1.0, color: "#4EFA77" },
    ]
    const FONT_BASE = 14

    interface Stream {
      x: number
      y: number
      layerIndex: number
      fontSize: number
      speed: number
      length: number
      glyphs: string[]
      timers: number[]
    }
    let streams: Stream[] = []
    // Cursor drift: near streams accelerate as the pointer glides in
    let mouse = { x: -1000, y: -1000, radius: 110 }
    let lastT = performance.now()

    // All glyphs are single BMP code units, so charAt is safe
    const randGlyph = () => CHARS.charAt((Math.random() * CHARS.length) | 0)

    const newStream = (x: number, layerIndex: number): Stream => {
      const layer = LAYERS[layerIndex]
      const length = Math.floor(10 + Math.random() * 14)
      const glyphs: string[] = []
      const timers: number[] = []
      for (let i = 0; i < length; i++) {
        glyphs.push(randGlyph())
        timers.push(Math.random() * 2)
      }
      return {
        x,
        y: -((Math.random() * 0.8 + 0.4) * rect.height),
        layerIndex,
        fontSize: Math.floor(FONT_BASE * layer.scale),
        speed: (120 + Math.random() * 160) * layer.speed,
        length,
        glyphs,
        timers,
      }
    }

    const buildStreams = () => {
      streams = []
      const total = Math.max(1, Math.floor(rect.width / 16))
      for (let i = 0; i < total; i++) {
        const x = (i / total) * rect.width + (Math.random() * 6 - 3)
        // Distribute across depth: 30% far, 50% mid, 20% near
        let layerIndex = 1
        const rand = Math.random()
        if (rand < 0.3) layerIndex = 0
        else if (rand > 0.8) layerIndex = 2
        streams.push(newStream(x, layerIndex))
      }
    }

    // Opaque dark backdrop so the effect reads in light mode too
    ctx.fillStyle = "#040705"
    ctx.fillRect(0, 0, rect.width, rect.height)

    let raf = 0
    let exited = false
    let onAnyClick: (() => void) | null = null
    let handleResize: (() => void) | null = null
    const exit = () => {
      if (exited) return
      exited = true
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", onKey)
      if (onAnyClick) document.removeEventListener("click", onAnyClick)
      if (handleResize) window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("mouseleave", onPointerLeave)
      window.removeEventListener("touchend", onPointerLeave)
      // Discard anything typed into the invisible input mid-matrix
      input.value = ""
      render()
      canvas.style.transition = "opacity 300ms ease-out"
      canvas.style.opacity = "0"
      hint.style.transition = "opacity 300ms ease-out"
      hint.style.opacity = "0"
      setTimeout(() => {
        canvas.remove()
        hint.remove()
      }, 350)
      resolve()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Escape" || (e.ctrlKey && e.key === "c")) {
        e.preventDefault()
        exit()
      }
    }
    document.addEventListener("keydown", onKey)

    // Tap or click anywhere on the page to exit — one unified handler so
    // it works for mouse, touch, and pen alike. `click` only fires on a
    // clean tap (a scroll-drag won't trigger it).
    onAnyClick = () => {
      if (!exited) exit()
    }
    document.addEventListener("click", onAnyClick)

    // Track the terminal size so a viewport resize (rotation, URL bar
    // collapse, window drag) doesn't leave the canvas stale or clipped
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
      buildStreams()
    }
    window.addEventListener("resize", handleResize)

    // Rebuild a stream that has fallen past the bottom
    const recycle = (s: Stream) => {
      const layer = LAYERS[s.layerIndex]
      s.length = Math.floor(10 + Math.random() * 14)
      s.fontSize = Math.floor(FONT_BASE * layer.scale)
      s.speed = (120 + Math.random() * 160) * layer.speed
      s.y = -s.length * s.fontSize
      s.glyphs = []
      s.timers = []
      for (let i = 0; i < s.length; i++) {
        s.glyphs.push(randGlyph())
        s.timers.push(Math.random() * 2)
      }
    }

    const update = (s: Stream, dt: number) => {
      // Glide faster as the pointer drifts near — a subtle spatial tug
      const dx = s.x - mouse.x
      const dy = s.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const speed = dist < mouse.radius ? s.speed * 2.2 : s.speed
      s.y += speed * dt
      // Glyphs mutate organically over time, not once at build
      for (let i = 0; i < s.length; i++) {
        s.timers[i] -= dt
        if (s.timers[i] <= 0) {
          s.glyphs[i] = randGlyph()
          s.timers[i] = 0.1 + Math.random() * 1.5
        }
      }
      if (s.y - s.length * s.fontSize > rect.height) recycle(s)
    }

    const draw = (s: Stream) => {
      const layer = LAYERS[s.layerIndex]
      ctx.font = `600 ${s.fontSize}px "Geist Mono", monospace`
      ctx.textAlign = "center"
      for (let i = 0; i < s.length; i++) {
        const y = s.y - i * s.fontSize
        if (y < -s.fontSize || y > rect.height + s.fontSize) continue
        const alpha = Math.max(0, 1 - i / s.length) * layer.opacity
        if (i === 0) {
          // Pure white head with a soft mint aura
          ctx.fillStyle = "#FFFFFF"
          ctx.shadowColor = "rgba(99, 230, 226, 0.7)"
          ctx.shadowBlur = 8
        } else if (i === 1) {
          ctx.fillStyle = "#C2FCD4"
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = layer.color
          ctx.shadowBlur = 0
        }
        ctx.globalAlpha = alpha
        ctx.fillText(s.glyphs[i], s.x, y)
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }

    // Delta-time loop so movement stays even across refresh rates
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((t - lastT) / 1000, 0.1)
      lastT = t
      ctx.fillStyle = "#040705"
      ctx.fillRect(0, 0, rect.width, rect.height)
      for (const s of streams) {
        update(s, dt)
        draw(s)
      }
    }

    // Pointer drift: track the cursor so near streams glide faster
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) {
        mouse.x = t.clientX
        mouse.y = t.clientY
      }
    }
    const onPointerLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("mouseleave", onPointerLeave)
    window.addEventListener("touchend", onPointerLeave)

    buildStreams()
    raf = requestAnimationFrame(frame)
  })
}
