import { marked } from "marked"
import remend from "remend"

async function parseMarkdown(text: string): Promise<string> {
  return marked.parse(remend(text))
}

interface MessageState {
  count: number
  lastReset: string
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  followUpQuestions?: string[]
}

const MESSAGE_LIMIT = 5
const DAILY_STORAGE_KEY = "portfolio-ai-message-state"
const CONVERSATION_STORAGE_KEY = "portfolio-ai-conversation"

const elements = {
  overlay: document.getElementById("chat-overlay"),
  window: document.getElementById("chat-window"),
  closeBtn: document.getElementById("chat-close-btn"),
  messagesContainer: document.getElementById("chat-messages"),
  suggestions: document.getElementById("chat-suggestions"),
  form: document.getElementById("chat-form") as HTMLFormElement,
  input: document.getElementById("chat-input") as HTMLInputElement,
  submitBtn: document.getElementById("submit-button") as HTMLButtonElement,
  sendIcon: document.getElementById("send-icon"),
  loadingIcon: document.getElementById("loading-icon"),
  messageCounter: document.getElementById("message-counter"),
  clearBtn: document.getElementById("clear-chat-btn") as HTMLButtonElement,
}

const storage = {
  getStoredState(): MessageState {
    const defaultState: MessageState = {
      count: 0,
      lastReset: new Date().toISOString().split("T")[0],
    }
    try {
      const stored = localStorage.getItem(DAILY_STORAGE_KEY)
      if (!stored) return defaultState
      const state: MessageState = JSON.parse(stored)
      const today = new Date().toISOString().split("T")[0]
      if (state.lastReset !== today) {
        this.saveState(defaultState)
        return defaultState
      }
      return state
    } catch {
      return defaultState
    }
  },

  saveState(state: MessageState) {
    localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(state))
  },

  getStoredConversation(): ChatMessage[] {
    try {
      const stored = sessionStorage.getItem(CONVERSATION_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  saveConversation(messages: ChatMessage[]) {
    sessionStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(messages))
  },
}

const state = {
  messages: storage.getStoredConversation(),
  isLoading: false,
  userMessageCount: storage.getStoredState().count,
  isOpen: false,
}

const ui = {
  async addMessage(
    content: string,
    isUser: boolean,
    renderStored = false,
    followUps: string[] = []
  ): Promise<void> {
    if (!elements.messagesContainer) return

    // Remove old follow-ups if any
    document
      .querySelectorAll(".dynamic-follow-up-container")
      .forEach((el) => el.remove())

    let messageEl = document.getElementById("streaming-message")
    const thinkingEl = document.getElementById("ai-thinking")

    // 1. If we just started responding and thinking bubble exists, recycle it
    if (!isUser && thinkingEl && !renderStored) {
      thinkingEl.id = "streaming-message"
      thinkingEl.classList.remove("animate-fade-in-up") // Prevent double animation
      messageEl = thinkingEl

      const bubble = messageEl.querySelector(".message-bubble-wrapper")
      if (bubble) {
        bubble.className =
          "text-base text-foreground leading-relaxed bg-muted border border-border/40 px-5 py-4 rounded-3xl rounded-tl-sm shadow-sm break-words [&_a]:break-all message-bubble-wrapper message-bubble-content prose prose-sm dark:prose-invert max-w-none"
        bubble.innerHTML = "" // clear thinking dots
      }
    }

    // 2. If not streaming an existing message, create a new one
    if (!messageEl) {
      messageEl = document.createElement("div")
      messageEl.className = `flex flex-col gap-2 ${isUser ? "items-end ml-auto" : ""} max-w-[90%] md:max-w-[85%] animate-fade-in-up message-item`

      if (!renderStored && !isUser) {
        messageEl.id = "streaming-message"
      }

      const header = document.createElement("div")
      header.className = "flex items-center gap-2 mb-1"
      header.innerHTML = isUser
        ? `<span class="text-sm uppercase tracking-wider text-muted-foreground font-semibold">You</span>`
        : `<div class="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
             <span class="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Assistant</span>
           </div>`

      const bubble = document.createElement("div")
      // Added "message-bubble-wrapper" to user bubble for consistent querying
      bubble.className = isUser
        ? `text-base bg-foreground text-background selection:bg-background selection:text-foreground px-5 py-4 rounded-3xl rounded-tr-sm shadow-sm break-words message-bubble-wrapper`
        : `text-base text-foreground leading-relaxed bg-muted border border-border/40 px-5 py-4 rounded-3xl rounded-tl-sm shadow-sm break-words [&_a]:break-all message-bubble-wrapper message-bubble-content prose prose-sm dark:prose-invert max-w-none`

      messageEl.appendChild(header)
      messageEl.appendChild(bubble)
      elements.messagesContainer.appendChild(messageEl)
    }

    // 3. Update content (parseMarkdown is called only ONCE here)
    const contentEl = messageEl.querySelector(".message-bubble-wrapper")
    if (contentEl) {
      if (isUser) {
        contentEl.textContent = content
      } else {
        contentEl.innerHTML = await parseMarkdown(content)
      }
    }

    // 4. Render follow-ups if any
    if (followUps.length > 0) {
      this.renderFollowUps(followUps, messageEl)
    }

    this.scrollToBottom()
  },

  renderFollowUps(questions: string[], targetEl: HTMLElement) {
    let container = targetEl.querySelector(
      ".dynamic-follow-up-container"
    ) as HTMLElement
    if (!container) {
      container = document.createElement("div")
      container.className =
        "dynamic-follow-up-container flex flex-wrap gap-2 mt-2 animate-fade-in-up message-item"
      targetEl.appendChild(container)
    }

    const questionsKey = JSON.stringify(questions)
    if (container.dataset.rendered === questionsKey) return

    const template = document.getElementById(
      "follow-up-template"
    ) as HTMLTemplateElement | null
    if (!template) return

    container.innerHTML = ""
    questions.forEach((q) => {
      if (!q) return
      const btn = template.content.firstElementChild!.cloneNode(
        true
      ) as HTMLButtonElement
      btn.querySelector("span")!.textContent = q
      btn.onclick = () => {
        if (elements.input) {
          elements.input.value = q
          elements.form?.dispatchEvent(new Event("submit"))
        }
      }
      container.appendChild(btn)
    })
    container.dataset.rendered = questionsKey
    this.scrollToBottom()
  },

  scrollToBottom() {
    if (elements.messagesContainer) {
      elements.messagesContainer.scrollTop =
        elements.messagesContainer.scrollHeight
    }
  },

  toggleLoading(loading: boolean) {
    state.isLoading = loading
    const reachedLimit = state.userMessageCount >= MESSAGE_LIMIT
    const isDisabled = loading || reachedLimit

    if (elements.submitBtn) elements.submitBtn.disabled = isDisabled
    if (elements.input) elements.input.disabled = isDisabled

    // Disable suggestions and follow-ups
    elements.suggestions
      ?.querySelectorAll("button")
      .forEach((btn) => ((btn as HTMLButtonElement).disabled = isDisabled))
    document
      .querySelectorAll(".dynamic-follow-up-container button")
      .forEach((btn) => ((btn as HTMLButtonElement).disabled = isDisabled))

    if (elements.sendIcon) elements.sendIcon.classList.toggle("hidden", loading)
    if (elements.loadingIcon)
      elements.loadingIcon.classList.toggle("hidden", !loading)

    if (loading) {
      // Remove any existing thinking indicators first to prevent dupes
      document.getElementById("ai-thinking")?.remove()

      const thinking = document.createElement("div")
      thinking.id = "ai-thinking"
      thinking.className =
        "flex flex-col gap-2 max-w-[90%] md:max-w-[85%] animate-fade-in-up message-item"

      thinking.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
          <span class="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Assistant</span>
        </div>
        <div class="message-bubble-wrapper bg-muted border border-border/40 px-5 py-3 rounded-3xl rounded-tl-sm shadow-sm w-fit wrap-break-word">
          <div class="flex gap-1.5 items-center h-4">
            <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-dot-flashing" style="animation-delay: 0s;"></div>
            <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-dot-flashing" style="animation-delay: 0.2s;"></div>
            <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-dot-flashing" style="animation-delay: 0.4s;"></div>
          </div>
        </div>
      `

      elements.messagesContainer?.appendChild(thinking)
      this.scrollToBottom()
    }
  },

  updateCounter() {
    if (elements.messageCounter) {
      elements.messageCounter.textContent = `${state.userMessageCount}/${MESSAGE_LIMIT} today`
      if (state.userMessageCount >= MESSAGE_LIMIT) {
        elements.messageCounter.classList.add("text-destructive")
        if (elements.input) elements.input.disabled = true
        if (elements.submitBtn) elements.submitBtn.disabled = true

        // Disable all suggestion buttons
        elements.suggestions
          ?.querySelectorAll("button")
          .forEach((btn) => ((btn as HTMLButtonElement).disabled = true))

        // Also disable dynamic follow-ups
        document
          .querySelectorAll(".dynamic-follow-up-container button")
          .forEach((btn) => ((btn as HTMLButtonElement).disabled = true))
      }
    }
  },

  async renderStored() {
    if (state.messages.length > 0) {
      if (elements.suggestions) elements.suggestions.style.display = "none"
      if (elements.clearBtn) elements.clearBtn.classList.remove("hidden")
    }
    for (const msg of state.messages) {
      await this.addMessage(
        msg.content,
        msg.role === "user",
        true,
        msg.followUpQuestions
      )
    }
  },

  clearConversation() {
    if (elements.messagesContainer) {
      const currentItems =
        elements.messagesContainer.querySelectorAll(".message-item")
      currentItems.forEach((m) => m.remove())

      if (elements.suggestions) elements.suggestions.style.display = "flex"
      if (elements.clearBtn) elements.clearBtn.classList.add("hidden")
    }
  },
}

const chat = {
  async sendMessage(text: string) {
    if (
      !text.trim() ||
      state.userMessageCount >= MESSAGE_LIMIT ||
      state.isLoading
    )
      return

    state.userMessageCount++
    storage.saveState({
      count: state.userMessageCount,
      lastReset: new Date().toISOString().split("T")[0],
    })
    ui.updateCounter()

    await ui.addMessage(text, true)
    state.messages.push({ role: "user", content: text })
    storage.saveConversation(state.messages)

    if (elements.clearBtn) elements.clearBtn.classList.remove("hidden")

    ui.toggleLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: state.messages }),
      })

      if (!response.ok) throw new Error("API Error")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""
      let finalFollowUps: string[] = []

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n").filter((l) => l.trim())

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line)
            if (parsed.response) {
              fullResponse = parsed.response
              await ui.addMessage(fullResponse, false, false, finalFollowUps)
              ui.toggleLoading(false)
            }
            if (parsed.followUpQuestions) {
              finalFollowUps = parsed.followUpQuestions
              if (fullResponse)
                await ui.addMessage(fullResponse, false, false, finalFollowUps)
            }
          } catch (e) {}
        }
      }

      const streamingEl = document.getElementById("streaming-message")
      if (streamingEl) streamingEl.removeAttribute("id")

      state.messages.push({
        role: "assistant",
        content: fullResponse,
        followUpQuestions: finalFollowUps,
      })
      storage.saveConversation(state.messages)
    } catch (err) {
      console.error(err)
      await ui.addMessage(
        "Sorry, I encountered an error. Please try again.",
        false
      )
    } finally {
      ui.toggleLoading(false)
    }
  },
}

export function toggleChat() {
  state.isOpen = !state.isOpen
  if (state.isOpen) {
    elements.overlay?.classList.remove("opacity-0", "pointer-events-none")
    elements.window?.classList.remove("scale-95", "opacity-0")
    elements.window?.classList.add("scale-100", "opacity-100")
    if (window.innerWidth > 768) {
      setTimeout(() => elements.input?.focus(), 150)
    }
    document.body.style.overflow = "hidden"
  } else {
    elements.overlay?.classList.add("opacity-0", "pointer-events-none")
    elements.window?.classList.remove("scale-100", "opacity-100")
    elements.window?.classList.add("scale-95", "opacity-0")
    document.body.style.overflow = ""
  }
}

elements.closeBtn?.addEventListener("click", toggleChat)
elements.overlay?.addEventListener("click", (e) => {
  if (e.target === elements.overlay) toggleChat()
})

elements.form?.addEventListener("submit", (e) => {
  e.preventDefault()
  const text = elements.input?.value.trim()
  if (text) {
    chat.sendMessage(text)
    elements.input.value = ""
  }
})

elements.suggestions?.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const prompt = btn.getAttribute("data-prompt")
    if (prompt) chat.sendMessage(prompt)
  })
})

elements.clearBtn?.addEventListener("click", () => {
  state.messages = []
  storage.saveConversation([])
  ui.clearConversation()
})

// Init runs when the module is first imported (the first time chat is opened),
// so the DOM is guaranteed to be ready.
ui.updateCounter()
ui.renderStored()
