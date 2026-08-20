import type { GameCtx } from "./context"

/** A Mr. Robot-style hacking session: mashing keys types fake security code. */
export function runHack(gc: GameCtx): Promise<void> {
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

    // Text grid the session is drawn on
    const FONT = '700 13px "Geist Mono", monospace'
    ctx.font = FONT
    const charW = Math.max(7, Math.ceil(ctx.measureText("M").width))
    const fontH = 15
    let COLS = Math.max(28, Math.floor(rect.width / charW))
    let ROWS = Math.max(12, Math.floor(rect.height / fontH))
    const cellX = (c: number) => c * charW
    const baseline = (r: number) => r * fontH + fontH * 0.8

    // Fake-security vocabulary
    const WORDS = [
      "decrypt",
      "spawn",
      "scan",
      "probe",
      "relay",
      "bypass",
      "inject",
      "uplink",
      "payload",
      "keygen",
      "fuzz",
      "sniff",
      "handshake",
      "session",
      "token",
      "sweep",
      "fork",
      "root",
    ]
    const PARAMS = ["-r", "-s", "-f", "-x", "-t", "-v"]
    const USERS = ["root", "sys", "zero-day", "null", "daemon", "k1n9"]
    const DOMAINS = ["shield", "vault", "grid", "nexus", "arc", "kernel"]
    const HEX = () =>
      `0x${((Math.random() * 0xffff) | 0).toString(16).padStart(4, "0")}`
    const IP = () =>
      `${10 + ((Math.random() * 245) | 0)}.${(Math.random() * 255) | 0}.${
        (Math.random() * 255) | 0
      }.${(Math.random() * 255) | 0}`
    const pick = <T>(a: T[]) => a[(Math.random() * a.length) | 0]

    // Mr. Robot easter eggs hidden inside ordinary-looking code
    const RARE = [
      { target: "./f_ociety.dat --init", color: "#fcd34d" },
      {
        target: "curl -s http://evilcorp.com --no-check-certificate",
        color: "#fcd34d",
      },
      {
        target: "void helloFriend() { /* i'm here to help */ }",
        color: "#5eead4",
      },
      { target: "sed -i 's/ours/everyones/g' /etc/reality", color: "#a7f3d0" },
      { target: "fsociety://welcome/home", color: "#c4b5fd" },
      { target: "grep -r 'elegance' /dev/soul", color: "#5eead4" },
      { target: "# the revolution will be decentralized", color: "#fda4af" },
      { target: "export E_CORP=0xdeadbeef", color: "#f9a8d4" },
      { target: "kill -9 evilcorp", color: "#fdba74" },
      { target: "while (asleep) { wakeUp('samurai') }", color: "#93c5fd" },
    ]
    const MILESTONES = [
      "[+] access granted · leave this city",
      "[*] fsociety is watching",
      "[!] E Corp SOC alerted · trace scrubbed",
      "[+] meeting at the arcade · 11:15",
      "[+] pleasure to meet you, friend",
    ]
    const SECRETS: {
      word: string
      lines: { text: string; color: string }[]
    }[] = [
      {
        word: "fsociety",
        lines: [
          { text: "# hello, friend. we are fsociety.", color: "#fcd34d" },
          { text: "> ./f_ociety.dat --join", color: "#fcd34d" },
          { text: "# leave this city.", color: "#fcd34d" },
        ],
      },
      {
        word: "ecorp",
        lines: [
          { text: "# E Corp is evil corp. delete it.", color: "#fda4af" },
          { text: "rm -rf E_CORP", color: "#fda4af" },
        ],
      },
      {
        word: "darkarmy",
        lines: [{ text: "# the dark army is watching.", color: "#c4b5fd" }],
      },
      {
        word: "mrrobot",
        lines: [{ text: "# i'm mr robot. come with me.", color: "#a7f3d0" }],
      },
    ]
    let typed = ""

    const makeLine = (): { target: string; color: string } => {
      const w = () => pick(WORDS)
      // Rare Mr. Robot flavor lines — the code has layers
      if (Math.random() < 0.07) return pick(RARE)
      const kind = Math.random()
      if (kind < 0.4)
        return {
          target: `> ${w()} --${pick(PARAMS)} ${HEX()} ${HEX()}`,
          color: "#86efac",
        }
      if (kind < 0.6)
        return {
          target: `[+] ${w()} intercepted @ ${IP()}:${
            20 + ((Math.random() * 80) | 0)
          }`,
          color: "#4ade80",
        }
      if (kind < 0.78)
        return {
          target: `$ ${w()} -${pick(PARAMS)} ${HEX()} ${pick(DOMAINS)}.exe`,
          color: "#6ee7a0",
        }
      if (kind < 0.9)
        return {
          target: `${w()}://${pick(USERS)}@${pick(DOMAINS)}/payload/${HEX()}`,
          color: "#a7f3d0",
        }
      return { target: `[!] ${w()} failed · trace ${IP()}`, color: "#f87171" }
    }

    interface LogLine {
      text: string
      color: string
    }
    const log: LogLine[] = []
    let live = makeLine()
    let offset = 0
    let progress = 0
    let started = false

    const push = (line: LogLine) => {
      log.push(line)
      if (log.length > ROWS - 2) log.shift()
    }

    // Advance the on-screen line; commit when it completes
    const pump = (n: number) => {
      offset = Math.min(live.target.length, offset + n)
      if (offset >= live.target.length) commit()
    }
    const commit = () => {
      started = true
      push({ text: live.target, color: live.color })
      progress = Math.min(100, progress + 2 + Math.random() * 4)
      if (Math.random() < 0.16) {
        push(
          Math.random() < 0.5
            ? { text: pick(MILESTONES), color: "#a7f3d0" }
            : { text: `[*] uplink established · ${IP()}`, color: "#a7f3d0" }
        )
      }
      if (progress >= 100) {
        progress = 4 + Math.random() * 10
        push({
          text:
            Math.random() < 0.5
              ? "[+] access granted · session forked"
              : "[+] we're in. now what?",
          color: "#86efac",
        })
      }
      live = makeLine()
      offset = 0
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
      setTimeout(() => {
        canvas.remove()
        exitBtn.remove()
      }, 350)
      resolve()
    }

    const exitBtn = document.createElement("button")
    exitBtn.setAttribute("aria-label", "Exit hack")
    exitBtn.className =
      "absolute top-2 right-2 z-30 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-sm text-green-300/80 transition-colors duration-150 hover:bg-white/10 hover:text-green-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    exitBtn.textContent = "×"
    // Ignore the hack's own pointer handling for the button's taps
    exitBtn.addEventListener("touchstart", (e) => e.stopPropagation())
    exitBtn.addEventListener("pointerdown", (e) => e.stopPropagation())
    exitBtn.addEventListener("click", exit)
    term.appendChild(exitBtn)

    // Mashing any key "types" the code — nothing leaks into the invisible input
    onKey = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Escape" || (e.ctrlKey && e.key === "c")) {
        e.preventDefault()
        exit()
      } else {
        // The Enter that launched the command bubbles up to this handler too,
        // so don't let it fire the first keystroke before anything is typed.
        if (!started && e.key === "Enter") {
          e.preventDefault()
          return
        }
        e.preventDefault()
        pump(2 + ((Math.random() * 3) | 0))
        // Watch what you actually type — say the magic word and it reacts
        if (e.key.length === 1 && /[a-z0-9]/i.test(e.key)) {
          typed = (typed + e.key.toLowerCase()).slice(-12)
          for (const s of SECRETS) {
            if (typed.includes(s.word)) {
              push(s.lines[(Math.random() * s.lines.length) | 0])
              typed = ""
              break
            }
          }
        }
        input.value = ""
        render()
      }
    }
    document.addEventListener("keydown", onKey)

    // On touch, tapping keeps the show moving too
    onPointerDown = () => {
      if (exited) return
      pump(3 + ((Math.random() * 4) | 0))
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
      COLS = Math.max(28, Math.floor(rect.width / charW))
      ROWS = Math.max(12, Math.floor(rect.height / fontH))
    }
    window.addEventListener("resize", handleResize)

    let raf = 0
    let startT = performance.now()

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      const runT = t - startT
      ctx.fillStyle = "#04070a"
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.font = FONT
      ctx.textAlign = "left"
      ctx.textBaseline = "alphabetic"

      // Progress readout across the top
      const barW = Math.floor(COLS * 0.55)
      const filled = Math.round((progress / 100) * barW)
      const bar = `[${"=".repeat(filled)}${"-".repeat(Math.max(0, barW - filled))}]`
      ctx.fillStyle = "#6ee7a0"
      ctx.fillText(`${bar} ${Math.round(progress)}%`, cellX(0), baseline(0))

      // Sits still until the first line completes — nothing runs on its own
      if (!started) {
        // Live feedback for the line you're building, then the cue below
        ctx.fillStyle = live.color
        ctx.fillText(live.target.slice(0, offset), cellX(0), baseline(ROWS - 1))
        if (offset === 0) {
          ctx.textAlign = "center"
          ctx.fillStyle = "#86efac"
          ctx.fillText(
            "start typing anything — any key, anytime",
            rect.width / 2,
            rect.height / 2 - 6
          )
          ctx.fillStyle = "rgba(134, 239, 172, 0.5)"
          ctx.fillText(
            "(psst… try typing fsociety)",
            rect.width / 2,
            rect.height / 2 + 14
          )
          ctx.textAlign = "left"
        }
        return
      }

      // Scrolling log (latest at the bottom) ending in the live line
      const visible = [
        ...log,
        { text: live.target.slice(0, offset), color: live.color },
      ]
      for (let i = 0; i < visible.length; i++) {
        const row = ROWS - 1 - i
        if (row <= 0) break
        const line = visible[visible.length - 1 - i].text.slice(0, COLS)
        ctx.fillStyle = visible[visible.length - 1 - i].color
        ctx.fillText(line, cellX(0), baseline(row))
      }

      // Blinking cursor at the end of the live line
      if (Math.floor(runT / 450) % 2 === 0) {
        ctx.fillStyle = "#bbf7d0"
        ctx.fillText(
          "▌",
          cellX(live.target.slice(0, offset).length),
          baseline(ROWS - 1)
        )
      }
    }
    raf = requestAnimationFrame(frame)
  })
}
