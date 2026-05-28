# React Blog Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Devanshu Patil's personal blog from Nuxt 3 to Vite + React 18 + TypeScript, applying the warm editorial redesign from the spec.

**Architecture:** Static blog powered by `import.meta.glob` to load Markdown files at build time, parsed with gray-matter (frontmatter) and remark (body → HTML). React Router v6 handles client-side routing. Tailwind CSS with custom warm editorial tokens drives all styling.

**Tech Stack:** Vite 5, React 18, TypeScript 5, React Router v6, Tailwind CSS v3, gray-matter, remark, rehype-highlight, highlight.js, Netlify (static deploy)

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite + raw Markdown import config |
| `tsconfig.json` | TypeScript config |
| `tailwind.config.js` | Warm editorial color tokens |
| `postcss.config.js` | Tailwind/autoprefixer pipeline |
| `index.html` | HTML shell |
| `netlify.toml` | SPA redirect rule for Netlify |
| `src/main.tsx` | App entry point |
| `src/App.tsx` | Router tree |
| `src/styles/index.css` | Tailwind imports + Georgia font override |
| `src/types/post.ts` | `PostMeta` and `Post` TypeScript types |
| `src/lib/posts.ts` | Load + parse all Markdown files |
| `src/hooks/useDarkMode.ts` | Dark mode toggle with localStorage |
| `src/components/Header.tsx` | Sticky navbar: logo, category links, dark toggle |
| `src/components/Footer.tsx` | Minimal footer |
| `src/components/FeaturedPost.tsx` | Full-width card for most recent post |
| `src/components/PostRow.tsx` | Compact divider-list row (home + category pages) |
| `src/components/CategoryBadge.tsx` | Small orange text badge |
| `src/hooks/useScrollReveal.ts` | Fade-in-on-scroll animation hook |
| `src/pages/Home.tsx` | Hero + featured post + recent posts list |
| `src/pages/BlogIndex.tsx` | All posts, newest first |
| `src/pages/CategoryPage.tsx` | Category header + filtered post list |
| `src/pages/PostPage.tsx` | Individual post with prose rendering |
| `content/blog/*.md` | Restored from git history |
| `content/blog/ai/` | New AI category directory |
| `public/assets/` | Restored image assets from git history |

---

## Task 1: Restore content and assets from git history

**Files:**
- Restore: `content/blog/*.md` (from `git show HEAD~1`)
- Restore: `public/assets/` (from `git show HEAD~1`)
- Restore: `public/favicon.ico`

- [ ] **Step 1: Restore content files**

```bash
git checkout HEAD~1 -- content/ public/assets/ public/favicon.ico
```

- [ ] **Step 2: Create AI content directory**

```bash
mkdir -p content/blog/ai
```

- [ ] **Step 3: Create a placeholder AI post so the category isn't empty**

Create `content/blog/ai/intro-to-llms.md`:
```markdown
---
title: A Developer's Introduction to LLMs
description: What large language models actually are, how they work under the hood, and why they matter for developers building products today.
category: AI
published: true
createdAt: 2026-05-01T09:00:00.000Z
image: /assets/placeholder.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 6 min read
tags: ['ai', 'llm']
proficiency: Beginner
---

Large language models are not magic — they are next-token predictors trained on enormous text corpora. Here is what every developer should understand before building on top of them.

## What is a token?

A token is roughly four characters of text. The sentence "Hello, world!" is five tokens...
```

- [ ] **Step 4: Commit**

```bash
git add content/ public/assets/ public/favicon.ico
git commit -m "chore: restore content and assets from git history, add AI category"
```

---

## Task 2: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.js`
- Create: `index.html`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "devanshu-blog",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "highlight.js": "^11.10.0",
    "rehype-highlight": "^7.0.0",
    "rehype-stringify": "^10.0.0",
    "remark": "^15.0.0",
    "remark-rehype": "^11.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.3",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Note: do NOT add `assetsInclude: ['**/*.md']`. That treats `.md` files as static URL assets, not raw strings. `import.meta.glob` with `query: '?raw'` works without it and they conflict.

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create `postcss.config.js`**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Devanshu Patil — Blog</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Install dependencies**

```bash
npm install
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite starts on localhost:5173 (blank page is fine at this stage)

- [ ] **Step 9: Commit**

```bash
git add package.json vite.config.ts tsconfig.json tsconfig.node.json postcss.config.js index.html
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

## Task 3: Configure Tailwind with warm editorial tokens

**Files:**
- Create: `tailwind.config.js`
- Create: `src/styles/index.css`

- [ ] **Step 1: Create `tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          bg: '#fdf6ee',
          light: '#fef3e6',
          border: '#f0ddc8',
        },
        editorial: {
          text: '#2d1f0f',
          muted: '#7c5c3e',
          accent: '#e07b39',
          subtle: '#c4a882',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        reading: '1.75',
      },
      typography: (theme) => ({
        editorial: {
          css: {
            '--tw-prose-body': theme('colors.editorial.text'),
            '--tw-prose-headings': theme('colors.editorial.text'),
            '--tw-prose-links': theme('colors.editorial.accent'),
            '--tw-prose-code': theme('colors.editorial.text'),
            '--tw-prose-pre-bg': theme('colors.cream.light'),
            '--tw-prose-quote-borders': theme('colors.editorial.accent'),
            'font-family': theme('fontFamily.sans').join(', '),
            'line-height': '1.75',
            'h1, h2, h3, h4': {
              'font-family': theme('fontFamily.serif').join(', '),
            },
            'code, pre': {
              'background-color': theme('colors.cream.light'),
            },
            blockquote: {
              'border-left-color': theme('colors.editorial.accent'),
              'background-color': theme('colors.cream.light'),
              'padding': '0.75rem 1rem',
              'border-radius': '0 0.25rem 0.25rem 0',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

- [ ] **Step 2: Install typography plugin**

```bash
npm install -D @tailwindcss/typography
```

- [ ] **Step 3: Create `src/styles/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    background-color: #fdf6ee;
  }
  html.dark {
    background-color: #111827;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/styles/index.css package.json package-lock.json
git commit -m "feat: add Tailwind with warm editorial color tokens"
```

---

## Task 4: Types, post loader, and dark mode hook

**Files:**
- Create: `src/types/post.ts`
- Create: `src/lib/posts.ts`
- Create: `src/hooks/useDarkMode.ts`

- [ ] **Step 1: Create `src/types/post.ts`**

```typescript
export interface PostMeta {
  slug: string
  title: string
  description: string
  category: string
  published: boolean
  createdAt: string
  image: string
  author: string
  authorTitle: string
  readingTime: string
  tags: string[]
  proficiency: string
  featured?: boolean
}

export interface Post extends PostMeta {
  contentHtml: string
}
```

- [ ] **Step 2: Create `src/lib/posts.ts`**

```typescript
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import type { PostMeta, Post } from '../types/post'

const modules = import.meta.glob('/content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path
    .replace('/content/blog/', '')
    .replace(/\.md$/, '')
    .replace(/\//g, '-')
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data } = matter(raw)
      return {
        ...(data as Omit<PostMeta, 'slug'>),
        slug: slugFromPath(path),
      }
    })
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  )
}

export async function getPost(slug: string): Promise<Post | null> {
  const entry = Object.entries(modules).find(
    ([path]) => slugFromPath(path) === slug,
  )
  if (!entry) return null

  const [, raw] = entry
  const { data, content } = matter(raw)

  const processed = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  return {
    ...(data as Omit<PostMeta, 'slug'>),
    slug,
    contentHtml: processed.toString(),
  }
}

export function getFeaturedPost(): PostMeta | null {
  const all = getAllPosts()
  return all.find((p) => p.featured) ?? all[0] ?? null
}
```

- [ ] **Step 3: Create `src/hooks/useDarkMode.ts`**

```typescript
import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return { dark, toggle: () => setDark((d) => !d) }
}
```

- [ ] **Step 4: Create `src/hooks/useScrollReveal.ts`**

```typescript
import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

- [ ] **Step 5: Commit**

```bash
git add src/types/post.ts src/lib/posts.ts src/hooks/useDarkMode.ts src/hooks/useScrollReveal.ts
git commit -m "feat: add post types, Markdown loader, dark mode and scroll reveal hooks"
```

---

## Task 5: CategoryBadge and PostRow components

> **Route decision (make this now):** Post URLs use `/blog/posts/:slug`. Category URLs use `/blog/:category`. This avoids the route collision where React Router would match `/blog/frontend` (a category) and `/blog/build-rest-api` (a post slug) to the same pattern. All `Link` components for posts use `/blog/posts/${post.slug}`.

**Files:**
- Create: `src/components/CategoryBadge.tsx`
- Create: `src/components/PostRow.tsx`

- [ ] **Step 1: Create `src/components/CategoryBadge.tsx`**

```tsx
interface Props {
  category: string
}

export function CategoryBadge({ category }: Props) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-editorial-accent">
      {category}
    </span>
  )
}
```

- [ ] **Step 2: Create `src/components/PostRow.tsx`**

```tsx
import { Link } from 'react-router-dom'
import type { PostMeta } from '../types/post'
import { CategoryBadge } from './CategoryBadge'

interface Props {
  post: PostMeta
}

export function PostRow({ post }: Props) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex items-baseline gap-3 py-4 border-b border-cream-border last:border-0">
      <CategoryBadge category={post.category} />
      <span className="text-editorial-muted text-sm">·</span>
      <Link
        to={`/blog/posts/${post.slug}`}
        className="flex-1 font-semibold text-editorial-text hover:text-editorial-accent transition-colors"
      >
        {post.title}
      </Link>
      <span className="text-xs text-editorial-subtle whitespace-nowrap ml-auto">
        {date} · {post.readingTime}
      </span>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CategoryBadge.tsx src/components/PostRow.tsx
git commit -m "feat: add CategoryBadge and PostRow components"
```

---

## Task 6: FeaturedPost component

**Files:**
- Create: `src/components/FeaturedPost.tsx`

- [ ] **Step 1: Create `src/components/FeaturedPost.tsx`**

```tsx
import { Link } from 'react-router-dom'
import type { PostMeta } from '../types/post'

interface Props {
  post: PostMeta
}

export function FeaturedPost({ post }: Props) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="bg-white border border-cream-border border-l-[3px] border-l-editorial-accent rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-editorial-accent font-semibold text-sm">✦ Featured</span>
        <span className="text-editorial-muted text-sm">·</span>
        <span className="text-editorial-accent text-sm font-medium uppercase tracking-wide">
          {post.category}
        </span>
      </div>
      <Link to={`/blog/posts/${post.slug}`}>
        <h2 className="font-serif text-2xl font-bold text-editorial-text hover:text-editorial-accent transition-colors leading-snug mb-2 dark:text-gray-100">
          {post.title}
        </h2>
      </Link>
      <p className="text-editorial-muted line-clamp-2 mb-4 text-sm leading-reading">
        {post.description}
      </p>
      <div className="text-xs text-editorial-subtle">
        {date} · {post.readingTime}
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturedPost.tsx
git commit -m "feat: add FeaturedPost component"
```

---

## Task 7: Header and Footer

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/Header.tsx`**

```tsx
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

const CATEGORIES = ['Frontend', 'Backend', 'Cloud', 'AI'] as const

export function Header() {
  const { dark, toggle } = useDarkMode()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-cream-border dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <NavLink
          to="/"
          className="font-serif text-xl font-bold text-editorial-text dark:text-gray-100 shrink-0"
        >
          Devanshu Patil
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat}
              to={`/blog/${cat.toLowerCase()}`}
              className={({ isActive }) =>
                [
                  'text-sm font-medium transition-colors pb-0.5',
                  isActive
                    ? 'text-editorial-accent border-b-2 border-editorial-accent'
                    : 'text-editorial-muted hover:text-editorial-accent',
                ].join(' ')
              }
            >
              {cat}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-md text-editorial-muted hover:text-editorial-accent transition-colors"
          >
            {dark ? '☀' : '☾'}
          </button>
          <button
            type="button"
            className="md:hidden p-2 text-editorial-muted"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-cream-border px-4 py-3 flex flex-col gap-3 bg-white dark:bg-gray-900 dark:border-gray-700">
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat}
              to={`/blog/${cat.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  'text-sm font-medium py-1',
                  isActive ? 'text-editorial-accent' : 'text-editorial-muted',
                ].join(' ')
              }
            >
              {cat}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-cream-border py-8 mt-16 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-editorial-muted">
        © {new Date().getFullYear()} Devanshu Patil. Built with React + Vite.
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx src/components/Footer.tsx
git commit -m "feat: add Header with category nav and Footer"
```

---

## Task 8: Homepage

**Files:**
- Create: `src/pages/Home.tsx`

- [ ] **Step 1: Create `src/pages/Home.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { getFeaturedPost, getAllPosts } from '../lib/posts'
import { FeaturedPost } from '../components/FeaturedPost'
import { PostRow } from '../components/PostRow'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Home() {
  const featured = getFeaturedPost()
  const recent = getAllPosts().slice(0, 6)
  const heroRef = useScrollReveal<HTMLElement>()

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      {/* Hero — starts invisible, fades in on scroll reveal */}
      <section ref={heroRef} className="mb-16 text-center opacity-0 translate-y-4 transition-all duration-700">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-editorial-text leading-tight mb-4 dark:text-gray-100">
          Learning daily, growing endlessly, sharing proudly.
        </h1>
        <p className="text-editorial-muted text-lg mb-8 max-w-xl mx-auto">
          A personal blog on frontend, backend, cloud, and AI — from a developer who builds and experiments daily.
        </p>
        <Link
          to="/blog"
          className="inline-block bg-editorial-accent text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Explore →
        </Link>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="mb-12">
          <FeaturedPost post={featured} />
        </section>
      )}

      {/* Recent posts */}
      <section>
        <h2 className="font-serif text-xl font-bold text-editorial-text mb-4 dark:text-gray-100">
          Recent Posts
        </h2>
        <div>
          {recent.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
        <Link
          to="/blog"
          className="inline-block mt-6 text-editorial-accent font-semibold hover:underline"
        >
          View all posts →
        </Link>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: add Homepage with hero, featured post, recent posts"
```

---

## Task 9: Blog index and Category pages

**Files:**
- Create: `src/pages/BlogIndex.tsx`
- Create: `src/pages/CategoryPage.tsx`

- [ ] **Step 1: Create `src/pages/BlogIndex.tsx`**

```tsx
import { getAllPosts } from '../lib/posts'
import { PostRow } from '../components/PostRow'

export function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-editorial-text mb-2 dark:text-gray-100">
        All Posts
      </h1>
      <p className="text-editorial-muted mb-8">{posts.length} articles</p>
      <div>
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create `src/pages/CategoryPage.tsx`**

```tsx
import { useParams } from 'react-router-dom'
import { getPostsByCategory } from '../lib/posts'
import { PostRow } from '../components/PostRow'

const CATEGORY_META: Record<string, { label: string; subtitle: string }> = {
  frontend: {
    label: 'Frontend',
    subtitle: 'Articles on UI, frameworks, and the web platform',
  },
  backend: {
    label: 'Backend',
    subtitle: 'Server-side patterns, APIs, and databases',
  },
  cloud: {
    label: 'Cloud',
    subtitle: 'Infrastructure, deployment, and cloud services',
  },
  ai: {
    label: 'AI',
    subtitle: 'Machine learning, LLMs, and AI-powered tools',
  },
}

export function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>()
  const meta = CATEGORY_META[category.toLowerCase()]
  const posts = getPostsByCategory(category)

  if (!meta) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-editorial-muted">Category not found.</p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-editorial-text mb-2 dark:text-gray-100">
        {meta.label}
      </h1>
      <p className="text-editorial-muted mb-1">{meta.subtitle}</p>
      <p className="text-editorial-muted text-sm mb-8">{posts.length} articles</p>
      <div>
        {posts.length === 0 ? (
          <p className="text-editorial-muted">No posts yet.</p>
        ) : (
          posts.map((post) => <PostRow key={post.slug} post={post} />)
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/BlogIndex.tsx src/pages/CategoryPage.tsx
git commit -m "feat: add BlogIndex and CategoryPage"
```

---

## Task 10: Post page

**Files:**
- Create: `src/pages/PostPage.tsx`

- [ ] **Step 1: Create `src/pages/PostPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPost } from '../lib/posts'
import type { Post } from '../types/post'
import { CategoryBadge } from '../components/CategoryBadge'

export function PostPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  // Route: /blog/posts/:slug
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPost(slug).then((p) => {
      setPost(p)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-editorial-muted">Loading…</p>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-editorial-muted">Post not found.</p>
        <Link to="/blog" className="text-editorial-accent hover:underline mt-4 block">
          ← Back to all posts
        </Link>
      </main>
    )
  }

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/blog" className="text-sm text-editorial-muted hover:text-editorial-accent transition-colors">
          ← All posts
        </Link>
      </div>

      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={post.category} />
          <span className="text-editorial-muted text-sm">·</span>
          <span className="text-xs text-editorial-subtle">{post.proficiency}</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-editorial-text leading-tight mb-4 dark:text-gray-100">
          {post.title}
        </h1>
        <p className="text-editorial-muted mb-4 leading-reading">{post.description}</p>
        <div className="text-xs text-editorial-subtle">
          {post.author} · {date} · {post.readingTime}
        </div>
      </header>

      <article
        className="prose prose-editorial max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/PostPage.tsx
git commit -m "feat: add PostPage with prose rendering"
```

---

## Task 11: App entry, router, and layout

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`

- [ ] **Step 1: Create `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import 'highlight.js/styles/github.css'
import { App } from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 2: Create `src/App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { BlogIndex } from './pages/BlogIndex'
import { CategoryPage } from './pages/CategoryPage'
import { PostPage } from './pages/PostPage'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream-bg dark:bg-gray-900 flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:category" element={<CategoryPage />} />
            <Route path="/blog/posts/:slug" element={<PostPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
```

**Route note:** No collision. Categories live at `/blog/:category` and posts live at `/blog/posts/:slug`. React Router matches `/blog/posts/:slug` before `/blog/:category` due to specificity.

- [ ] **Step 3: Commit**

```bash
git add src/main.tsx src/App.tsx
git commit -m "feat: wire up app entry, router, and layout shell"
```

---

## Task 12: Netlify config and build verification

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 2: Run full build**

```bash
npm run build
```
Expected: `dist/` folder created with no TypeScript errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```
Open `http://localhost:4173` and verify:
- Homepage loads with hero section
- Featured post card appears
- Recent posts list renders
- Nav links route to `/blog/frontend`, `/blog/ai`, etc.
- Clicking a post loads the post page
- Dark mode toggle works

- [ ] **Step 4: Fix any build/routing issues found in step 3**

- [ ] **Step 5: Commit**

```bash
git add netlify.toml dist/
git commit -m "feat: add Netlify config, verify production build"
```

