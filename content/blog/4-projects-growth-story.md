---
title: 4 Projects. Here's How They Made Me a Better Developer.
description: A growth story across 4 real-world builds — a PDF generator, an e-commerce platform, a desktop activity tracker, and an AI-powered LMS. Here's what each one actually taught me.
category: Career
published: true
createdAt: 2026-06-07T09:00:00.000Z
image: /assets/blogging.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 9 min read
tags: ['career', 'fullstack', 'javascript', 'webdev']
proficiency: Intermediate
---

I spent a long time learning by watching. Tutorials, courses, YouTube walkthroughs — I consumed all of it. And I got decent at following along.

Then I tried building something real, and everything fell apart.

Not catastrophically. Just quietly. Edges I hadn't thought about. APIs that didn't behave the way the tutorial said. State that drifted. Features that seemed simple until they weren't.

Over the past year or so, I shipped four projects that actually mattered to me: a marriage biodata generator, a full e-commerce platform, a desktop developer activity tracker, and an AI-powered learning management system. None of them were perfect. All of them taught me something I couldn't have gotten from a course.

This is that story.

---

## Project 1 — Marriage Biodata Builder: Client-Side Complexity Is Real

The idea sounded simple. Users fill out a form, pick a template, download a PDF. How hard could it be?

![Marriage Biodata Builder](/assets/marriage-biodata.png)

Very hard, as it turns out.

I built the frontend with React and Vite, styled with TailwindCSS, and wired up `jsPDF` and `html2canvas` to handle the PDF export. On screen, everything looked great. Clean layouts, proper fonts, nice spacing.

Then I hit export.

The PDF came out wrong — every time. Fonts rendered differently. Padding collapsed. Elements that lined up perfectly on screen overlapped in the output. The problem was that `html2canvas` screenshots the DOM at a specific pixel ratio and hands it to `jsPDF`, but the browser renders components for *screens*, not for print. DPI scaling, CSS transforms, font fallbacks — all of it can behave differently when the "output" is a canvas snapshot instead of a viewport.

I ended up redesigning the template components twice. Not because the logic was wrong, but because I hadn't thought about what the output medium actually demands. I started treating the PDF canvas as a first-class target, not an afterthought. Each template needed to be designed for both contexts simultaneously.

That shift in thinking — designing for output format, not just for the screen — changed how I approach every UI feature now.

> *"Every feature has a rendering cost you won't see until export."*

---

## Project 2 — Sagar-Shop: Full-Stack Is a Mindset Shift, Not Just More Code

![Sagar Shop](/assets/shop-sagar.png)

I'd built frontends before. I'd poked at backends. Sagar-Shop was the first time I had to make them work together at scale — and it exposed a gap in my thinking I didn't know was there.

Sagar-Shop is a full e-commerce platform: product browsing, cart and wishlist sync, user authentication, an admin dashboard, order tracking, file storage. The stack was React + Redux Toolkit on the frontend, Node.js + Express on the backend, and Supabase for the database, auth, and file storage.

The problem I didn't expect was auth state.

I was using Supabase Auth for the authentication flow, but also issuing custom JWTs from the backend for API authorization. Two token systems. Two sources of truth for "is this user logged in?" When they drifted — which they did — the user would see the frontend say one thing and the API say another. Checkout would fail silently. Cart items would vanish.

The fix wasn't technically complex. But arriving at it forced me to think differently about ownership: who owns state, where it lives, and what happens when two systems need to agree on the same fact. Redux was syncing client-side state fine. The problem was I hadn't designed the server-client contract carefully enough upfront.

After that, I started sketching data-flow diagrams before writing a single route. Not formal architecture docs — just a rough map of where data lives, who reads it, and who writes it. It took ten minutes and saved hours of debugging.

> *"When your frontend and backend disagree on who owns state, the user loses."*

---

## Project 3 — TimeStream: Build for Yourself First

![TimeStream](/assets/timestream.png)

TimeStream started as a personal itch. I wanted to know how I was actually spending my dev time — not a rough guess, actual data. What sites I was visiting, what files I was touching, how long I spent in VS Code versus YouTube versus documentation.

So I built it. An Electron desktop app paired with a browser extension, storing everything in a local SQLite database using `better-sqlite3`. No server, no cloud, no account. Just a dashboard that reflects your last 24 hours back at you.

Building for the desktop was disorienting at first.

Electron splits your app into two worlds: the main process (Node.js, full OS access) and the renderer process (essentially a browser tab). They can't share memory. They communicate via IPC — `ipcMain` and `ipcRenderer` — and if you don't design those message channels deliberately, you end up with spaghetti. The browser extension added another layer: Chrome's `chrome.runtime.sendMessage` API communicating with the Electron main process through a local HTTP bridge.

Meanwhile, `chokidar` was watching the filesystem for file changes. `better-sqlite3` was writing to a local DB synchronously (which is actually the right call in Electron, but counterintuitive if you're used to async everything). None of this maps to how you build web apps.

What changed for me: I stopped treating "the browser" as the default deployment target. There's a whole category of problems — privacy-sensitive tooling, local-first apps, developer utilities — where a desktop app is the right answer and pretending otherwise limits what you can build.

> *"When you build outside the browser, the platform stops being invisible."*

---

## Project 4 — Online Learning Portal: Complexity Compounds. Design Before You Code.

![Online Learning Portal](/assets/online-learning-patfrom.png)

This was the biggest project I'd attempted. A full learning management system: course management, attendance tracking, progress reports, interactive materials, built-in messaging — and a multi-LLM AI layer that could extract questions from scanned exam papers using GPT-4o, Claude, Gemini, or Perplexity as fallbacks.

Four user roles: admin, teacher, learner, parent. Each with their own dashboard, their own routes, their own permissions.

I made the mistake of starting to code before I had fully thought through the role boundaries.

Two weeks in, I had an admin route that a teacher could accidentally hit. A learner dashboard that partly rendered for parents. Permission checks scattered across components and API handlers with no consistent logic. The codebase was working but it wasn't coherent — and every new feature made it less so.

I stopped, wrote out every role's permissions explicitly in a table, and refactored the middleware to enforce it in one place. That single session of design work — no code, just a document — probably saved two weeks of rework.

The multi-LLM integration taught a different lesson. Routing across four APIs (OpenAI, Anthropic, Google, Perplexity) required a fallback chain: if the primary model fails or times out, try the next. Getting that right meant thinking carefully about failure modes, rate limits, and response format consistency. Each model returns structured data slightly differently. I normalised everything into a shared JSON schema at the point of ingestion, which meant the rest of the app didn't need to know which model had answered.

Deploying it via Docker and Terraform was its own education. The frontend and backend each had their own Dockerfile. Terraform managed the cloud infrastructure. When state drifted between what Terraform thought was deployed and what was actually running, I understood why infrastructure-as-code isn't just a buzzword — it's the only way to reason about deployment at any meaningful scale.

> *"Four user roles means four mental models. Get them right first, or refactor forever."*

---

## What I Actually Learned

Looking back across all four projects, three things stand out that no tutorial prepared me for.

**You don't know what you don't know until the app is live.** You can read every article about state management, PDF rendering, Electron IPC, or role-based auth — and still hit a wall the moment you're dealing with real data, real edge cases, real users. The gap between "I understand this concept" and "I can ship this feature" is only visible when you're in it.

**Every stack choice is a tradeoff, and you should know what you're trading.** Supabase is powerful and fast to get started with, but adding a custom JWT layer on top means you own the sync problem. `jsPDF` + `html2canvas` is a reasonable client-side PDF solution, but you're fighting the browser's rendering model. Electron gives you OS access, but you're now reasoning about two processes. None of these are bad choices — but each one comes with a cost, and knowing the cost upfront changes how you design.

**The best way to grow is to finish things.** Not polish them to perfection. Not rebuild them from scratch when something gets messy. Finish them. A shipped project with rough edges teaches you more than a half-built one with a perfect architecture. The rough edges are the lesson.

I'm not a better developer because I know more syntax or more APIs. I'm better because I've shipped things that broke in ways I didn't expect, and had to figure out why.

That's the only part tutorials can't replicate.
