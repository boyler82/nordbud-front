import { useEffect, useState } from 'react'
import { useRef } from 'react'

type GalleryModalProps = {
  isOpen: boolean
  title: string
  images: string[]
  closeLabel: string
  emptyLabel: string
  onClose: () => void
}

function ImageWithLoader({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-lg">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={className}
        decoding="async"
      />
    </div>
  )
}

export default function GalleryModal({
  isOpen,
  title,
  images,
  closeLabel,
  emptyLabel,
  onClose,
}: GalleryModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false)
      return
    }
    scrollYRef.current = window.scrollY
    const id = window.requestAnimationFrame(() => setIsVisible(true))
    return () => window.cancelAnimationFrame(id)
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    window.setTimeout(() => {
      onClose()
      window.scrollTo({ top: scrollYRef.current, left: 0, behavior: 'auto' })
    }, 220)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
        isVisible ? 'bg-black/60 opacity-100' : 'bg-black/0 opacity-0'
      }`}
      onClick={handleClose}
      aria-hidden
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-xl transition-all duration-200 ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.98] opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold text-gray-600 hover:bg-gray-100"
        >
          ×
        </button>

        <h3 className="mb-4 pr-8 text-xl font-semibold text-gray-900">
          {title}
        </h3>

        {images.length === 0 ? (
          <p className="text-sm text-gray-600">{emptyLabel}</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((src, idx) => (
              <ImageWithLoader
                key={`${src}-${idx}`}
                src={src}
                alt={`${title} ${idx + 1}`}
                className="w-full object-cover"
              />
            ))}
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
