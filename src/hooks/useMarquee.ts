// src/hooks/useMarquee.ts
import { useEffect, useRef, useState } from 'react'

type Options = {
  pxPerSec?: number
}

export default function useMarquee<T extends HTMLElement>(opts: Options = {}) {
  const { pxPerSec = 50 } = opts // domyślnie 50 px/s
  const containerRef = useRef<T | null>(null)
  const [speed] = useState(pxPerSec)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let animationId: number
    let lastTime: number | null = null
    const paused = { current: false }

    const step = (time: number) => {
      if (lastTime != null && !paused.current) {
        const dt = (time - lastTime) / 1000 // sekundy
        const delta = pxPerSec * dt

        el.scrollLeft += delta

        // PĘTLA BEZ SKOKU — zakładamy items = [...data, ...data]
        const half = el.scrollWidth / 2
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half
        }
      }
      lastTime = time
      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)

    // pauza podczas dotyku / drag, żeby nie walczyć z użytkownikiem
    const onDown = () => { paused.current = true }
    const onUp = () => { paused.current = false }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('pointerleave', onUp)

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('pointerleave', onUp)
    }
  }, [pxPerSec])

  return { containerRef, speed }
}