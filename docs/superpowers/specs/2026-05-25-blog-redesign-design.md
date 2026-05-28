# Blog Website Redesign — Design Spec
**Date:** 2026-05-25
**Status:** Approved

## Overview

Redesign of Devanshu Patil's personal blog (Nuxt 4 + Tailwind) with a Warm Editorial aesthetic targeting 2026 UI/UX standards. The site remains simple but visually distinctive — readable, warm, and personal. Key change: replace the "Developer" nav category with "AI".

---

## 1. Visual Identity

### Color Palette
| Token | Value | Usage |
|---|---|---|
| Background | `#fdf6ee` | Page background |
| Surface | `#ffffff` | Cards, navbar |
| Primary text | `#2d1f0f` | Headlines, body |
| Secondary text | `#7c5c3e` | Meta, subtitles |
| Accent | `#e07b39` | Links, badges, borders, CTAs, active nav |
| Card border | `#f0ddc8` | Card outlines, dividers |
| Cream light | `#fef3e6` | Code blocks, blockquote bg |

### Typography
- **Headlines & logo:** Georgia serif
- **Body, nav, meta:** Inter sans-serif (existing)
- **Post titles on cards:** Georgia, font-weight 700
- **Body line-height:** 1.75 for comfortable reading

### Dark Mode
Existing dark mode toggle is preserved. Dark palette stays as-is (`gray-900` bg, `gray-100` text) — warm editorial applies to light mode only.

---

## 2. Navbar

### Layout
- **Sticky**, `top-0 z-50`
- Left: Logo — "Devanshu Patil" in Georgia serif, `#2d1f0f`
- Center: Search bar (existing Pagefind + fallback functionality, unchanged)
- Right: Category nav links + dark mode toggle

### Categories
```js
const _categories = ['Frontend', 'Backend', 'Cloud', 'AI']
```
(`'Developer'` removed, `'AI'` added — routes to `/blog/ai`)

### States
- **Default:** `#7c5c3e`, no underline
- **Hover:** smooth fade to `#e07b39`
- **Active (current route):** `#e07b39` color + `2px solid #e07b39` bottom border

### Mobile
- Hamburger menu collapses nav links into vertical drawer
- Search bar remains visible at all screen sizes

---

## 3. Homepage (`/`)

### Hero Section
- Serif headline: *"Learning daily, growing endlessly, sharing proudly."*
- Subtitle: Inter, `#7c5c3e`
- CTA button: orange fill, "Explore →", routes to `/blog`
- Existing `useScrollReveal` animation preserved

### Featured Post Card
- Full-width white card, `border-left: 3px solid #e07b39`
- Small badge: `✦ Featured` + category name in orange
- Post title: Georgia serif, large (`text-2xl`)
- Excerpt: 2 lines, Inter, `#7c5c3e`
- Footer: date + read time, muted (`#c4a882`)
- **Selection logic:** Most recently published post with `published: true` (confirmed frontmatter field), OR any post with `featured: true` frontmatter (manual pin takes priority)

### Recent Posts List
- Compact rows separated by `1px solid #f0ddc8` dividers
- Each row: `[category badge] · [title] · [date + read time right-aligned]`
- Category badge: small orange text, no background
- Title: Inter semi-bold, `#2d1f0f`
- "View all posts →" link at bottom, orange

---

## 4. Category Pages

### Affected routes
- `/blog/frontend` (existing)
- `/blog/backend` (existing)
- `/blog/cloud` (existing)
- `/blog/ai` (**new** — replaces `/blog/developer`)

### Page Header
- Category name: Georgia serif, `text-4xl`, `#2d1f0f`
- Subtitle: one descriptive line per category
  - Frontend: "Articles on UI, frameworks, and the web platform"
  - Backend: "Server-side patterns, APIs, and databases"
  - Cloud: "Infrastructure, deployment, and cloud services"
  - AI: "Machine learning, LLMs, and AI-powered tools"
- Post count: `#7c5c3e`, e.g. "12 articles"

### Post List
- Same compact divider list as homepage Recent Posts
- All posts equal weight, newest first
- No featured post on category pages

### New AI category
- Create `content/blog/ai/` directory
- Create `app/pages/blog/ai/index.vue` (mirrors `frontend/index.vue` pattern)
- Existing `developer` content and page untouched (nav link removed, page still accessible via direct URL — no redirect needed, no files deleted)

---

## 5. Blog Post Page

### Structure
No structural changes. Existing features preserved:
- Interactive Table of Contents sidebar
- Reading progress bar
- Giscus comments
- Text-to-speech
- Freshness badge
- Continue Reading

### Visual Updates
- Post title: Georgia serif
- Body: Inter, `line-height: 1.75`
- Inline code + code blocks: warm cream bg `#fef3e6` (replacing grey)
- Category badge: orange pill, consistent with rest of site
- Blockquotes: `border-left: 3px solid #e07b39`, cream bg

---

## 6. Files to Change

| File | Change |
|---|---|
| `app/components/Header.vue` | Categories array, nav active/hover styles, logo font |
| `app/pages/index.vue` | Homepage hero + featured post + recent list layout |
| `app/assets/css/tailwind.css` | Warm cream bg, accent color tokens |
| `app/layouts/default.vue` | Page background color |
| `app/pages/blog/ai/index.vue` | **New** — AI category page |
| `content/blog/ai/` | **New** — AI posts directory |
| `app/pages/blog/[slug].vue` | Post title font, code block bg, blockquote style |
| `app/components/BlogCard.vue` | Existing image card used on category pages — update border to `#f0ddc8`, category badge from indigo to orange |
| `app/components/BlogContentCategory.vue` | Category header + subtitle |
| `tailwind.config.js` | Add warm cream color tokens |

---

## Out of Scope

- No changes to RSS feed generation
- No changes to Pagefind search logic
- No changes to Giscus comments config
- No changes to existing `developer` content or route
- No new pages beyond `/blog/ai`
