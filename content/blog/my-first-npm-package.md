---
title: How I Built and Published My First npm Package
description: A walkthrough of creating, testing, and publishing a small utility package to npm — including TypeScript setup, semver, and the lessons I learned.
category: Backend
published: true
createdAt: 2025-04-28T09:00:00.000Z
image: /assets/node-modules-app-performance_.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 5 min read
tags: ['developer']
proficiency: Beginner
---

Publishing to npm always seemed intimidating to me. After doing it for the first time, I realized it's actually straightforward. Here's exactly what I did.

## The Problem I Solved

I kept copying the same date formatting utility across every project. So I packaged it once and published it.

## Project Setup

```bash
mkdir date-fmt && cd date-fmt
npm init -y
```

Update `package.json`:

```json
{
  "name": "@devanshu/date-fmt",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"]
}
```

## The Code

```ts
// src/index.ts
export function formatDate(date: Date, locale = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]
  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s)
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
```

## Build and Publish

```bash
# Build TypeScript
npx tsc

# Login to npm
npm login

# Publish (scoped packages need --access public)
npm publish --access public
```

## Lessons Learned

1. **Scoped packages** (`@yourname/pkg`) are better — they namespace your work
2. **Write tests before publishing** — a broken published package is embarrassing
3. **Use semantic versioning** from day one — `1.0.0` → `1.0.1` for fixes, `1.1.0` for features
4. **Keep it focused** — do one thing well, resist scope creep

The whole thing took about 3 hours. Now I `bun add @devanshu/date-fmt` in every project and never copy-paste again.
