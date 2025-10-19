import { useCallback, useEffect, useRef } from 'react'

type Options = {
  gapPx?: number      // odstęp między kartami
  intervalMs?: number // okres autoprzewijania
  loop?: boolean
  pauseOnHover?: boolean
}

export default function useCarousel<T extends HTMLElement>(opts: Options = {}) {
  const { gapPx = 16, intervalMs = 3500, loop = true, pauseOnHover = true } = opts
  const ref = useRef<T | null>(null)
  const pauseRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const getStep = useCallback(() => {
    const el = ref.current
    if (!el) return 0
    const firstCard = el.querySelector<HTMLElement>('[data-card]')
    if (!firstCard) return el.clientWidth // awaryjnie cała szerokość
    return firstCard.offsetWidth + gapPx
  }, [gapPx])

  const next = useCallback(() => {
    const el = ref.current
    if (!el) return
    const step = getStep()
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
    if (atEnd && loop) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' })
    }
  }, [getStep, loop])

  const prev = useCallback(() => {
    const el = ref.current
    if (!el) return
    const step = getStep()
    if (el.scrollLeft <= 0 && loop) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: -step, behavior: 'smooth' })
    }
  }, [getStep, loop])

  useEffect(() => {
    if (!intervalMs) return
    const tick = () => { if (!pauseRef.current) next() }
    timerRef.current = window.setInterval(tick, intervalMs)
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
  }, [intervalMs, next])

  useEffect(() => {
    if (!pauseOnHover) return
    const el = ref.current
    if (!el) return
    const onEnter = () => { pauseRef.current = true }
    const onLeave = () => { pauseRef.current = false }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [pauseOnHover])

  // pauza gdy karta nieaktywna
  useEffect(() => {
    const onVisibility = () => { pauseRef.current = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return { containerRef: ref, next, prev }
}