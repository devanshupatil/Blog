---
title: Getting Started with Nuxt 4
description: A practical beginner's guide to setting up a Nuxt 4 project from scratch, covering the new app/ directory, SSG, and content management.
category: Frontend
published: true
createdAt: 2025-05-20T09:00:00.000Z
image: /assets/blogging.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 6 min read
tags: ['frontend']
proficiency: Beginner
---

Nuxt 4 is a massive leap forward for Vue-based web development. In this guide, I'll walk you through everything you need to get a Nuxt 4 project running from scratch.

## Prerequisites

- Node.js 20 or higher
- Bun (recommended) or npm/pnpm

## Creating Your First Nuxt 4 Project

```bash
bunx nuxi@latest init my-blog --package-manager bun
cd my-blog
bun install
bun run dev
```

Open `http://localhost:3000` and you'll see the default Nuxt welcome page.

## The New app/ Directory

With `compatibilityVersion: 4`, all your application code moves into an `app/` directory:

```
app/
  components/
  composables/
  layouts/
  pages/
content/
public/
nuxt.config.ts
```

This keeps the root clean and separates framework config from app code.

## Setting Up @nuxt/content

Install the content module:

```bash
bun add @nuxt/content
```

Add it to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  modules: ['@nuxt/content'],
})
```

Now create markdown files in `content/` and query them with `queryCollection()`.

## Static Site Generation

To generate a fully static site:

```bash
bun run generate
```

This outputs plain HTML/CSS/JS to `dist/` — no server needed. Deploy anywhere.

## Next Steps

- Add Tailwind CSS for styling
- Set up `@tailwindcss/typography` for beautiful markdown rendering
- Add dark mode with a VueUse composable
- Deploy to Netlify in minutes

Nuxt 4 makes it incredibly easy to ship fast, modern websites. Give it a try!
