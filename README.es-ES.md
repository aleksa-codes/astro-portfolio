

# 🚀 Astro Portfolio - aleksa.codes

> **📅 Actualización de marzo de 2026:** ¡Este repositorio ha experimentado una **gran reestructuración** y refactorización!

Portafolio personal y blog construido con Astro 7, Tailwind CSS 4 y TypeScript.

[![Astro](https://img.shields.io/badge/Astro_7-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Netlify](https://img.shields.io/badge/Netlify-00C46A?logo=netlify&logoColor=white)](https://www.netlify.com/)

## Características

- **Astro 7** 🌌 Enfoque estático primero con SSR híbrido para el endpoint de chat de IA
- **Tailwind CSS 4** 🎨 Plugin de Vite, configuración solo en CSS, tokens de diseño oklch al estilo shadcn
- **Blog en Markdown** 📝 Colecciones de contenido, paginación, tiempo de lectura, comentarios de Giscus
- **Arcade** 🕹️ Juegos para navegador de un solo archivo escritos por IA, jugables en la página con el modelo y el prompt detrás de cada uno
- **Chat de IA** 🤖 Asistente de streaming impulsado por Groq con preguntas de seguimiento y límites diarios de uso
- **Imágenes OG** 🖼️ Generadas automáticamente en tiempo de compilación mediante `astro-og-canvas`
- **Decap CMS** ⚙️ CMS sin cabeza basado en Git en `/admin`
- **Modo Oscuro** 🌙 Detección automática del sistema con cambio instantáneo (sin parpadeo)
- **Formulario de Contacto** ✉️ Formularios de Netlify con reCAPTCHA y honeypot
- **Rendimiento** ⚡ Compresión, carga diferida, pistas de prioridad, fuentes precargadas
- **SEO** 🔍 Sitemap, RSS, etiquetas meta, datos OG estructurados

## Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/aleksa-codes/astro-portfolio.git
cd astro-portfolio
bun install

# Configurar entorno
echo 'GROQ_API_KEY=your_key_here' > .env

# Ejecutar servidor de desarrollo
bun run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando           | Descripción                                          |
| ----------------- | ---------------------------------------------------- |
| `bun run dev`     | Servidor de desarrollo (puerto 3000)                               |
| `bun run build`   | Verificación de tipos → Compilación de Astro → Minificación de Tailwind → PostCSS |
| `bun run preview` | Vista previa de la compilación de producción                             |
| `bun run format`  | Prettier (Astro + Tailwind + ordenamiento de importaciones)         |
| `bun run decap`   | Servidor local de Decap CMS                               |

## Estructura del Proyecto

```
src/
├── assets/            # Imágenes y fuentes (optimizadas por Astro)
├── components/        # Componentes de Astro (kebab-case)
│   └── ui/            # Primitivas (card, badge, button, tooltip)
├── content/blog/      # Entradas del blog en Markdown
├── layouts/           # base-layout.astro
├── lib/               # Utilidades, datos del proyecto, datos del stack tecnológico
├── pages/             # Rutas (estáticas + /api/chat SSR)
└── styles/            # global.css (configuración de Tailwind v4 + tokens de diseño)
```

## Variables de Entorno

| Variable       | Requerida       | Propósito                                                  |
| -------------- | -------------- | -------------------------------------------------------- |
| `GROQ_API_KEY` | Sí (para el chat) | Autenticación de [Groq API](https://console.groq.com/keys) |

## Stack Tecnológico

| Categoría        | Tecnología                                                                              |
| --------------- | --------------------------------------------------------------------------------------- |
| Framework       | [Astro 7](https://astro.build/)                                                         |
| Estilos         | [Tailwind CSS 4](https://tailwindcss.com/) + tokens de [shadcn/ui](https://ui.shadcn.com/) |
| IA              | [Vercel AI SDK](https://ai-sdk.dev/) + [Groq](https://groq.com/)                        |
| Contenido         | [Markdown](https://www.markdownguide.org/) + [Decap CMS](https://decapcms.org/)         |
| Iconos           | [astro-icon](https://github.com/natemoo-re/astro-icon) (Lucide, Simple Icons, etc.)     |
| Bloques de código     | [Expressive Code](https://expressive-code.com/)                                         |
| Despliegue      | [Netlify](https://www.netlify.com/) (estático + serverless)                               |
| Administrador de paquetes | [Bun](https://bun.sh/)                                                                  |

## Despliegue

Despliega en Netlify con la siguiente configuración:

- **Comando de compilación:** `bun run build`
- **Directorio de publicación:** `dist`
- **Variables de entorno:** `GROQ_API_KEY`
- Activa **Netlify Forms** y **Netlify Identity** (para Decap CMS)

## Licencia

MIT - ver [LICENSE](LICENSE).
