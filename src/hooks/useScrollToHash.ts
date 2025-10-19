// src/hooks/useScrollToHash.ts
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollToHash(offset = 96) {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [hash, offset])
}