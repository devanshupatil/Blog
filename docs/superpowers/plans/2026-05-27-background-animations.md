# Background Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add animated backgrounds to the blog — warm amber aurora blobs in light mode, monochrome dot-grid pulse in dark mode.

**Architecture:** A single `AnimatedBackground` component is mounted at root in `App.tsx`. It detects dark mode via a `MutationObserver` watching the `html` class attribute, and swaps between `LightAurora` (CSS blur blobs) and `DarkGrid` (CSS grid + pulsing nodes) without a page reload. All animation keyframes are injected via an inline `<style>` tag — no external CSS scanning required.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v3, Vite, Bun

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/AnimatedBackground.tsx` | Create | All animation logic — dark detection, LightAurora, DarkGrid |
| `src/styles/index.css` | Modify | Update dark bg from `#111827` → `#0d0d0d` |
| `src/App.tsx` | Modify | Remove solid bg from App div, add `relative z-10` to content wrapper |

---

## Task 1: Update background colours

**Files:**
- Modify: `src/styles/index.css`
- Modify: `src/App.tsx`

- [x] **Step 1: Update dark mode background in CSS**

In `src/styles/index.css`, change:
```css
html.dark {
  background-color: #111827; /* old gray-900 */
}
```
to:
```css
html.dark {
  background-color: #0d0d0d; /* near-black */
}
```

- [x] **Step 2: Remove solid background from App div**

In `src/App.tsx`, remove `bg-cream-bg dark:bg-[#0d0d0d]` from the outer div — the `html` element now owns the background colour.

- [x] **Step 3: Add z-index layering to content wrapper**

Wrap `<Header>`, routes, and `<Footer>` in `<div className="relative z-10 flex flex-col flex-1">` so content sits above the animation layer.

- [x] **Step 4: Verify dev server — light mode background is cream, dark is near-black**

Run: `bun run dev`  
Expected: cream `#fdf6ee` in light, `#0d0d0d` in dark.

- [x] **Step 5: Commit**

```bash
git add src/styles/index.css src/App.tsx
git commit -m "feat: update background colours for animation layering"
```

---

## Task 2: Create AnimatedBackground component

**Files:**
- Create: `src/components/AnimatedBackground.tsx`

- [x] **Step 1: Create the dark-mode detector hook**

```tsx
function useIsDark() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const el = document.documentElement
    const obs = new MutationObserver(() => setDark(el.classList.contains('dark')))
    obs.observe(el, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}
```

Uses `MutationObserver` — reacts instantly when `useDarkMode` toggles the `html.dark` class, no prop drilling needed.

- [x] **Step 2: Define shared animation keyframes as injected `<style>` string**

```ts
const STYLES = `
  @keyframes auroraDrift { ... }
  @keyframes gridFade    { ... }
  @keyframes nodePulse   { ... }
  .ab-blob  { position: absolute; border-radius: 50%; filter: blur(80px); animation: auroraDrift ease-in-out infinite alternate; }
  .ab-grid  { position: absolute; inset: 0; background-image: linear-gradient(...); animation: gridFade 3s ease-in-out infinite; }
  .ab-node  { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.6); animation: nodePulse ease-in-out infinite alternate; }
  @media (prefers-reduced-motion: reduce) { .ab-blob, .ab-grid, .ab-node { animation: none !important; } }
`
```

Injecting via `<style>` avoids Tailwind purging custom class names.

- [x] **Step 3: Implement `LightAurora` — three warm amber blobs**

```tsx
function LightAurora() {
  return (
    <>
      <style>{STYLES}</style>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="ab-blob" style={{ width: 700, height: 700, top: -250, left: -180, background: 'rgba(224,123,57,0.22)', animationDuration: '8s' }} />
        <div className="ab-blob" style={{ width: 550, height: 550, top: 80, right: -120, background: 'rgba(196,168,130,0.18)', animationDuration: '11s', animationDelay: '-4s' }} />
        <div className="ab-blob" style={{ width: 480, height: 480, bottom: -150, left: '25%', background: 'rgba(212,135,90,0.16)', animationDuration: '9s', animationDelay: '-2s' }} />
      </div>
    </>
  )
}
```

Colours: `#e07b39` (amber), `#c4a882` (tan), `#d4875a` (terracotta) — matches the site's editorial palette.

- [x] **Step 4: Implement `DarkGrid` — dot grid + 16 pulsing nodes**

```tsx
const NODES = [
  { top: 64,  left: 96,   dur: '2.0s', delay: '0s'    },
  // ... 15 more spread across the viewport
]

function DarkGrid() {
  return (
    <>
      <style>{STYLES}</style>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="ab-grid" />
        {NODES.map((n, i) => (
          <div key={i} className="ab-node" style={{ top: n.top, left: n.left, right: n.right, animationDuration: n.dur, animationDelay: n.delay }} />
        ))}
      </div>
    </>
  )
}
```

Grid lines: `rgba(255,255,255,0.06)` at 32px intervals. Nodes pulse 0.15 → 0.8 opacity with staggered delays for organic feel.

- [x] **Step 5: Export root component**

```tsx
export function AnimatedBackground() {
  const dark = useIsDark()
  return dark ? <DarkGrid /> : <LightAurora />
}
```

- [x] **Step 6: Verify in browser — toggle dark mode, animation switches without reload**

Run: `bun run dev` → open `http://localhost:5174/`  
Expected: amber blobs in light mode, grid pulse in dark mode, instant swap on toggle.

- [x] **Step 7: Commit**

```bash
git add src/components/AnimatedBackground.tsx src/styles/index.css src/App.tsx
git commit -m "feat: add background animations — aurora blobs (light) + grid pulse (dark)"
```

---

## How to Modify Later

**Change blob colours (light mode):** Edit the `background` values in `LightAurora` — use `rgba(r,g,b,opacity)`. Keep opacity between `0.12`–`0.25` for subtlety.

**Change grid density (dark mode):** Edit `background-size: 32px 32px` in `.ab-grid` — smaller = denser grid.

**Add/remove pulsing nodes:** Edit the `NODES` array. Coordinates are in pixels from top/left or top/right.

**Change animation speed:** Edit `animationDuration` on each blob, or the `3s` in `gridFade`.

**Disable for a specific page:** Conditionally render `<AnimatedBackground />` in `App.tsx` based on route.
