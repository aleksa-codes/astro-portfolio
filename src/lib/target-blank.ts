import { defineHastPlugin } from "satteri"

export const targetBlank = (domain = "") =>
  defineHastPlugin({
    name: "target-blank",
    element: {
      filter: ["a"],
      visit(node, ctx) {
        const href = node.properties.href
        if (
          typeof href === "string" &&
          href.startsWith("http") &&
          !href.includes(domain)
        ) {
          ctx.setProperty(node, "target", "_blank")
        }
      },
    },
  })
