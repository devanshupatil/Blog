import { useState, useEffect } from 'react'

const STYLES = `
  @keyframes auroraDrift {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(20px, -15px) scale(1.08); }
    66%  { transform: translate(-15px, 18px) scale(0.94); }
    100% { transform: translate(12px, -8px) scale(1.05); }
  }
  @keyframes gridFade {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
  @keyframes nodePulse {
    0%   { opacity: 0.15; transform: scale(1); }
    100% { opacity: 0.8; transform: scale(2.5); }
  }
  .ab-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: auroraDrift ease-in-out infinite alternate;
  }
  .ab-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 32px 32px;
    animation: gridFade 3s ease-in-out infinite;
  }
  .ab-node {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    transform-origin: center;
    animation: nodePulse ease-in-out infinite alternate;
  }
  @media (prefers-reduced-motion: reduce) {
    .ab-blob, .ab-grid, .ab-node { animation: none !important; }
  }
`

function useIsDark() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    const el = document.documentElement
    const obs = new MutationObserver(() => setDark(el.classList.contains('dark')))
    obs.observe(el, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

function LightAurora() {
  return (
    <>
      <style>{STYLES}</style>
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
      >
        <div
          className="ab-blob"
          style={{ width: 700, height: 700, top: -250, left: -180, background: 'rgba(224,123,57,0.22)', animationDuration: '8s' }}
        />
        <div
          className="ab-blob"
          style={{ width: 550, height: 550, top: 80, right: -120, background: 'rgba(196,168,130,0.18)', animationDuration: '11s', animationDelay: '-4s' }}
        />
        <div
          className="ab-blob"
          style={{ width: 480, height: 480, bottom: -150, left: '25%', background: 'rgba(212,135,90,0.16)', animationDuration: '9s', animationDelay: '-2s' }}
        />
      </div>
    </>
  )
}

const NODES: Array<{ top: number; left?: number; right?: number; dur: string; delay: string }> = [
  { top: 64,  left: 96,   dur: '2.0s', delay: '0s'    },
  { top: 64,  left: 288,  dur: '3.2s', delay: '-1.2s' },
  { top: 64,  left: 480,  dur: '2.6s', delay: '-0.8s' },
  { top: 128, left: 192,  dur: '2.8s', delay: '-0.6s' },
  { top: 128, right: 160, dur: '3.6s', delay: '-2.0s' },
  { top: 192, left: 384,  dur: '2.4s', delay: '-1.8s' },
  { top: 192, right: 288, dur: '3.0s', delay: '-2.8s' },
  { top: 256, left: 128,  dur: '3.0s', delay: '-0.4s' },
  { top: 256, right: 96,  dur: '2.6s', delay: '-2.4s' },
  { top: 320, left: 320,  dur: '3.4s', delay: '-1.0s' },
  { top: 320, left: 576,  dur: '2.2s', delay: '-3.0s' },
  { top: 384, left: 64,   dur: '2.2s', delay: '-1.6s' },
  { top: 384, right: 224, dur: '3.8s', delay: '-0.8s' },
  { top: 448, left: 480,  dur: '2.5s', delay: '-1.4s' },
  { top: 512, left: 224,  dur: '3.1s', delay: '-2.2s' },
  { top: 512, right: 128, dur: '2.9s', delay: '-1.0s' },
]

function DarkGrid() {
  return (
    <>
      <style>{STYLES}</style>
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
      >
        <div className="ab-grid" />
        {NODES.map((n, i) => (
          <div
            key={i}
            className="ab-node"
            style={{ top: n.top, left: n.left, right: n.right, animationDuration: n.dur, animationDelay: n.delay }}
          />
        ))}
      </div>
    </>
  )
}

export function AnimatedBackground() {
  const dark = useIsDark()
  return dark ? <DarkGrid /> : <LightAurora />
}
