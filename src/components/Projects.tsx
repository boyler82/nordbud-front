import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useMarquee from '@/hooks/useMarquee'

// jeśli później zrobisz osobne podstrony, można wrócić do <Link>
// na razie użyjemy <button>, żeby otwierać modal
// import { Link } from 'react-router-dom'

type Project = {
  slug: string
  img: string          // miniaturka na liście
  gallery: string[]    // pełna galeria w modalu
}

const data: Project[] = [
  {
    slug: 'hala-magazynowa-gdansk',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    slug: 'dom-jednorodzinny-gdynia',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518733057094-95b53151d6b4?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    slug: 'remont-biura-sopot',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  // ...dodaj kolejne realizacje (slug, img, gallery)
]

export default function Projects() {
  const { t } = useTranslation()

  // karuzela – stała prędkość 50 px/s
  const { containerRef } = useMarquee<HTMLDivElement>({ pxPerSec: 50 })

  // który projekt jest aktualnie otwarty w modalu
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const selectedProject = selectedSlug
    ? data.find(p => p.slug === selectedSlug) ?? null
    : null

  // zamykanie modala klawiszem Escape
  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSlug(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject])

  return (
    <>
      <section id="realizacje" className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t('projects.heading')}</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              {t('projects.subtitle')}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2" />
        </div>

        <div
          ref={containerRef}
          className="no-scrollbar relative flex gap-4 overflow-x-auto"
          style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          {[...data, ...data].map((p, i) => {
            const title = t(`projects.titles.${p.slug}`)
            const aria = t('projects.viewAria', { title })

            return (
              <article
                key={`${p.slug}-${i}`}
                data-card
                className="shrink-0 w-[85%] sm:w-[60%] md:w-[33.333%] overflow-hidden rounded-2xl border shadow-sm bg-white"
              >
                <button
                  type="button"
                  onClick={() => setSelectedSlug(p.slug)}
                  aria-label={aria}
                  className="block w-full text-left"
                >
                  <img
                    src={p.img}
                    alt={title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-3 text-sm text-gray-700">{title}</div>
                </button>
              </article>
            )
          })}
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-xl">
            {/* X w prawym górnym rogu */}
            <button
              type="button"
              onClick={() => setSelectedSlug(null)}
              aria-label={t('projects.close')}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold text-gray-600 hover:bg-gray-100"
            >
              ×
            </button>

            {(() => {
              const title = t(`projects.titles.${selectedProject.slug}`)
              const description = t(
                `projects.details.${selectedProject.slug}.description`
              )

              return (
                <>
                  <h3 className="mb-2 pr-8 text-xl font-semibold">
                    {title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {description}
                  </p>
                </>
              )
            })()}

            <div className="grid gap-3 sm:grid-cols-2">
              {selectedProject.gallery.map((src, idx) => {
                const title = t(`projects.titles.${selectedProject.slug}`)
                return (
                  <img
                    key={idx}
                    src={src}
                    alt={`${title} ${idx + 1}`}
                    className="w-full rounded-lg object-cover"
                  />
                )
              })}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSlug(null)}
                className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t('projects.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}