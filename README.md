# 📖 Devanshu Patil — Personal Blog & Editorial Space

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Netlify-Deployed-00AD9F?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
</div>

<br />

Welcome to **Devanshu Patil's Personal Blog & Editorial Space**—a premium, high-performance, and content-first web experience engineered with a state-of-the-art frontend stack. 

The site is built to combine the rich, warm, and sophisticated styling of traditional editorial print (reminiscent of Substack and premium literary journals) with the snappy, fluid interaction models of modern single-page applications.

---

## ✨ Features at a Glance

### 🎨 Warm Editorial Design System
* **Curated Warm Palette**: Built on HSL-tailored warm whites, soft cream overlays, and charcoal typography to reduce cognitive reading strain.
* **Typographic Contrast**: Combines modern grotesque sans-serif fonts for interfaces with elegant high-contrast serif typography for content layout.
* **Premium Sachin Ghait Style Header**: High-presence navigation bar with a dynamic Layers SVG logo brand mark, wide responsive container, and custom interactive components.

### 🔍 Custom Fast Vector Search
* **Real-time Local Querying**: Fully localized vector search pipeline, providing instantaneous results as you type.
* **Intelligent Tag Indexing**: Automatically indexes post titles, descriptions, categories, and tags with beautiful popover previews.

### 🎭 Staggered Scroll-Reveal Animations
* **React Intersection Observer**: Custom staggered scroll animation pipeline using browser intersection observers.
* **Fluid Card Intros**: Articles and cards gracefully glide in from the bottom with a precise delay, creating an extremely premium feel.

### 🌓 Professional Dark Mode System
* **Seamless Syncing**: Implemented via custom React state and system preferences hooks.
* **Circular Toggle (⊙ Style)**: Features a beautiful circular border button toggling smooth vector sun/moon icons.
* **Inverted Code Typography**: Custom transitions inverted on code syntax highlights (`prose-invert` overrides) for maximum legibility in pitch-black environments.

### 📧 Newsletter Capture Core
* **High-converting CTAs**: Interactive newsletter subscription card styled with subtle gradients and focus-highlight bounds.
* **Interactive State Validation**: Rich success banners and clean, layout-preserving email validation feedback loops.

---

## 📂 Architecture & Folder Layout

```text
├── content/               # Markdown (*.md) database source of truth
│   └── blog/              # Category directories
│       ├── ai/            # Artificial Intelligence posts
│       ├── backend/       # Backend development posts
│       ├── cloud/         # Cloud & DevOps posts
│       └── frontend/      # User Interfaces & CSS posts
├── public/                # Static public assets (images, icons)
├── src/
│   ├── components/        # Highly focused reusable React UI blocks
│   │   ├── Header.tsx     # Premium top navigation & logo
│   │   ├── SearchBar.tsx  # Dynamic vector search & result list
│   │   ├── NewsletterCTA.tsx # Soft gradient newsletter email capture
│   │   └── AnimatedBlogCard.tsx # Staggered reveal layout card wrapper
│   ├── hooks/             # Custom utility hooks (e.g. useDarkMode)
│   ├── lib/               # Utility modules (Markdown parser, filesystems)
│   │   └── posts.ts       # Parses posts using gray-matter & rehype-sanitize
│   ├── pages/             # Layout templates & view controllers
│   │   ├── Home.tsx       # Landing page (Hero, Featured post, Recent posts)
│   │   ├── BlogIndex.tsx  # Grid listing with active filter tabs
│   │   ├── PostPage.tsx   # Elegant markdown text renderer
│   │   └── NotFound.tsx   # Premium custom 404 page
│   ├── styles/            # Global stylesheets
│   │   └── index.css      # Core Design System, Tailwinds, and animations
│   ├── types/             # Shared typescript definitions (*.d.ts)
│   ├── App.tsx            # App router & theme providers
│   └── main.tsx           # Client bundle mounting entrypoint
├── tailwind.config.js     # Typography configuration & warm editorial palette
├── tsconfig.json          # Strict compiler ruleset for TypeScript
└── vite.config.ts         # High-speed bundler orchestration
```

---

## 🚀 Getting Started

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Install Dependencies
First, install the package dependencies using npm or bun:
```bash
# Install dependencies
npm install
```

### 2. Launch Local Dev Server
Fire up the lightning-fast Vite bundler development server locally:
```bash
# Run local environment
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

### 3. Build for Production
Bundle and optimize all typescript assets, code splits, and stylesheets:
```bash
# Perform production build
npm run build
```
This generates a static production bundle inside the `/dist` folder, optimized for immediate CDN hosting.

---

## 📝 Content Management: Adding New Posts

All blog posts are authored in clean, standard Markdown (`.md`) format.

### Post File Locations
Store posts in their matching lowercase category folder inside `content/blog/`:
* `content/blog/frontend/`
* `content/blog/backend/`
* `content/blog/cloud/`
* `content/blog/ai/`

### Frontmatter Schema (YAML Header)
Every Markdown post must begin with a YAML header bounded by `---` containing precise meta configurations:

```markdown
---
title: A Developer's Guide to Flexbox & CSS Grid
description: Learn when to use flexbox and grid layouts on your modern user interfaces.
category: Frontend
tags: [CSS, Layout, Frontend]
coverImage: /content/blog/frontend/grid-cover.jpg
author: Devanshu Patil
authorRole: Software Engineer
date: 2026-05-28
readingTime: 6 min read
featured: true
---

# A Developer's Guide to Flexbox & CSS Grid

Write standard markdown body content directly below...
```

---

## 🔒 Security & Code Integrity

* **Safe HTML Injection**: The blog renders raw HTML generated from parsed Markdown safely by routing it through `rehype-sanitize` inside `src/lib/posts.ts` to fully defend against Cross-Site Scripting (XSS) vulnerabilities.
* **Safe SPA Routing**: Handled via `react-router-dom` with robust Netlify configuration (`_redirects` / `netlify.toml`) preventing reload 404s.

---

<div align="center">
  <p>Designed and crafted with passion by <b>Devanshu Patil</b></p>
  <sub>Learning daily, growing endlessly, sharing proudly.</sub>
</div>
# Blog
# Blog
