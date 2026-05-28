import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Apply initial delay before observing (for staggered cards)
    const timer = setTimeout(() => {
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
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return ref
}
