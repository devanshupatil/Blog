---
title: "I Took My Project to a Real Institute. The Feedback Humbled Me."
description: "I built a full-stack online learning portal and thought it was ready. Then I walked into a coaching institute that runs classes from 1st to 12th and JEE, NEET, CET — and found out what 'ready' actually means."
category: Growth
published: true
createdAt: 2026-08-14T14:00:00.000Z
image: /assets/portal-institute-visit.png
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 6 min read
tags: ['career', 'growth', 'communication', 'projects']
proficiency: Beginner
---

I had a working project. Role-based dashboards, AI-powered question extraction, Docker deployment, the full stack. And I had no idea if any of it was actually useful to anyone. So I went and found out.

## What I Built

The project is an Online Learning Portal — a full-stack platform built with React and Node.js, with separate dashboards for admins, teachers, learners, and parents. Teachers can upload course materials, create tests, track attendance. Students can access content, take assessments, monitor their own progress. Parents can check in on their child's performance without calling the institute.

The part I was most proud of: AI integration. I wired up OpenAI GPT-4o, Claude, Gemini, and Perplexity to process uploaded documents — scanned test papers, PDFs, handwritten sheets — and automatically extract questions, options, and answers into structured JSON. What used to be an hour of manual typing becomes a single upload.

It worked. End to end. On my machine. And that was the problem — a working app with no real users is just a very elaborate guess.

## The Institute

I wanted feedback from the kind of people who would actually use this. Not other developers, not form responses — people running real educational operations.

The institute I found runs classes from **1st to 12th standard**, alongside **JEE, NEET, and CET preparation**. That's a wide range: a 7th grader doing basic science sits in the same building as a 12th grader grinding Physics for JEE Mains. Multiple batches, different syllabi, competitive exam deadlines, and parents who want updates on everything.

This is exactly the kind of place my portal was supposed to help. So I asked to come in and show it.

## Sitting Down With a Teacher

I went in person. Not a form, not a link, not a screen share — I sat across from a teacher and opened the laptop.

My plan was to walk them through every feature. The admin dashboard. The teacher portal. How a student would take a test. How the AI extracted questions from a scanned paper. I had a whole mental tour prepared.

I got about five minutes in before I realised they weren't looking at the screen anymore. They were waiting for me to stop talking so they could say something.

That's when I learned the first real lesson: **nobody cares about the features you built until they've told you the problem they have.** I had it backwards. I was presenting a solution before I'd heard the problem.

I closed the tour. I asked: *"What's the most frustrating part of running the institute day to day?"*

And then I actually listened.

## What They Told Me

The feedback that came back had nothing to do with AI or multi-model fallback systems or Docker deployment. It was about the daily friction of running a place that teaches hundreds of students across 12 years of schooling and three competitive exams.

> **"We need to know who hasn't paid fees."** Every month, someone chases down payments manually. There's a register, but it's always behind. The institute needs a dashboard that shows pending fees at a glance — by student, by batch, by month.

> **"Our results should be on the home page."** When a parent is deciding where to send their child for JEE prep, they want proof. Last year's AIR ranks. NEET qualifiers. CET toppers. That's the first thing they ask about — and right now there's no easy way to show it.

> **"There should be a profile page for the institute — teachers, batches, achievements."** Trust is built before a single class. Parents want to know who's teaching, what their background is, and what past students went on to do.

None of those three things were in my project. I'd built course management, AI document processing, attendance tracking — and missed the three things that would make someone actually choose to use it.

## What I Had to Unlearn

I built this portal the way most developers build things: from the inside out. I started with the technical architecture, decided what features made sense, and shipped them. The logic was sound. The execution was solid. The problem was I'd never once asked someone who runs a coaching institute what they actually need.

The AI question extraction I was proud of? They weren't unimpressed — they just didn't bring it up. Because before a teacher digitises a test paper, they need to know their fees are collected and their students' parents trust them enough to enroll. The infrastructure problem comes before the efficiency problem.

That ordering is invisible when you're building alone. It only becomes clear when you sit down with someone who lives with the problem every day.

## What I Learned About Communicating

Walking into an institute with a laptop and a project is not the same as deploying code. There's no error message, no stack trace. Just a person, and whether your explanation is landing or not.

The first version of me in that room over-explained everything. I used words like "role-based access control" and "JWT authentication" with someone whose day involves managing batch schedules and calling parents. That's not communication — that's a monologue.

What actually works is simpler than I expected: **say what it does for them, in their words, not yours.** "Teachers see their own students, admins see everyone" lands. "Role-based access control" doesn't. "Upload a scanned paper and get the questions ready in seconds" lands. "Multi-model LLM document processing pipeline" doesn't.

The other thing I had to learn: don't defend the parts they criticise. My first instinct when someone said "this is hard to find" was to explain why I put it there. That instinct is useless. Write it down, say thank you, fix it later. The explanation doesn't make the feature easier to find.

## What Building Confidence Actually Looks Like

Before I walked into that room, I thought confidence meant knowing your code is good. And I knew it was good — the architecture was solid, the tests passed, the deployment worked.

That's not confidence. That's competence. They're different.

Confidence — the kind that's actually useful — is the belief that you can sit across from someone who doesn't care how the code works, hear them tell you what's wrong with your project, and come out with something better than you walked in with. That's not built by writing more code. It's built by having that conversation once, and then having it again.

Each time I've gone back, it's gotten easier. Not because the feedback has gotten gentler — it hasn't. Because I stopped taking it personally. The project isn't me. The project is a thing I made that needs to be useful to someone else. That separation is what makes it possible to improve instead of just defend.

## Where the Project Is Now

I'm building the three features they asked for. A fees management section with per-student, per-batch tracking. A results showcase on the homepage — top ranks, NEET qualifiers, CET achievers from past batches. An institute profile page with teacher bios, batch history, and achievements.

These aren't the features I would have prioritised if I'd stayed at my desk. But they're the features that will make someone actually use this — which is the only thing that matters.

The AI document processing is still in there. It's still useful. It just isn't the first thing I lead with anymore.

## The Actual Takeaway

If you've built something and you're not sure if it's useful: stop guessing. Find one person it's supposed to help, sit across from them, and ask what frustrates them about the problem you're trying to solve. Then listen more than you talk.

You will come out with a better project. You will also come out as a slightly different developer — one who understands that building the thing is only half of building the right thing.

The other half is the conversation you have before, and after, you write the code.
