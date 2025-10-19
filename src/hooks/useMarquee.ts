import { useEffect, useRef, useState } from 'react'

type Options = {
  pxPerSec?: number      // prędkość domyślna (px/s)
  draggable?: boolean    // przeciąganie myszką / dotykiem
}

export default function useMarquee<T extends HTMLElement>({
  pxPerSec = 40,
  draggable = true,
}: Options = {}) {
  const ref = useRef<T | null>(null)

  const rafId = useRef<number | null>(null)
  const lastTs = useRef<number | null>(null)
  const halfWidth = useRef<number>(0)

  const [speed, setSpeed] = useState(pxPerSec)
  const [paused, setPaused] = useState(false)

  // Refy do aktualnych wartości
  const speedRef = useRef(speed)
  const pausedRef = useRef(paused)
  useEffect(() => { speedRef.current = speed }, [speed])
  useEffect(() => { pausedRef.current = paused }, [paused])

  // pętla płynnego przesuwania
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const loop = (ts: number) => {
      if (!ref.current) return
      if (lastTs.current == null) lastTs.current = ts
      const dt = (ts - lastTs.current) / 1000
      lastTs.current = ts

      const spd = speedRef.current
      const isPaused = pausedRef.current

      if (!isPaused && Math.abs(spd) > 0.01) {
        ref.current.scrollLeft += spd * dt

        // bezszwowa pętla
        if (ref.current.scrollLeft >= halfWidth.current) {
          ref.current.scrollLeft -= halfWidth.current
        } else if (ref.current.scrollLeft < 0) {
          ref.current.scrollLeft += halfWidth.current
        }
      }

      rafId.current = requestAnimationFrame(loop)
    }

    const updateHalf = () => { halfWidth.current = Math.floor(el.scrollWidth / 2) }
    updateHalf()
    const ro = new ResizeObserver(updateHalf)
    ro.observe(el)

    rafId.current = requestAnimationFrame(loop)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      ro.disconnect()
      lastTs.current = null
    }
  }, [])

  // Drag / swipe
  useEffect(() => {
    if (!draggable) return
    const el = ref.current
    if (!el) return

    let isDown = false
    let startX = 0
    let startScroll = 0

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDown = true
      setPaused(true)
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX
      startScroll = el.scrollLeft
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const dx = clientX - startX
      el.scrollLeft = startScroll - dx
      if (el.scrollLeft >= halfWidth.current) el.scrollLeft -= halfWidth.current
      if (el.scrollLeft < 0) el.scrollLeft += halfWidth.current
    }
    const onUp = () => {
      isDown = false
      setPaused(false)
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onDown, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: true })
    el.addEventListener('touchend', onUp)

    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onDown)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onUp)
    }
  }, [draggable])

  // pauza gdy karta nieaktywna
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return {
    containerRef: ref,
    paused,
    setPaused,
    speed,
    setSpeed,
  }
}