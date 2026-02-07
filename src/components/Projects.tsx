import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// jeśli później zrobisz osobne podstrony, można wrócić do <Link>
// na razie użyjemy <button>, żeby otwierać modal
// import { Link } from 'react-router-dom'

type Project = {
  slug: string
  img: string          // miniaturka na liście
  gallery: string[]    // pełna galeria w modalu
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
    <div className="relative overflow-hidden">
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

const data: Project[] = [
  {
    slug: 'flakstad-skole',
    img: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467083/Flakstad_skole_-_Hundven-Clements_LINK_Arkitektur_14_pr0q8r.jpg',
    gallery: [
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467083/Flakstad_skole_-_Hundven-Clements_LINK_Arkitektur_14_pr0q8r.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467085/Flakstad_skole_-_Hundven-Clements_LINK_Arkitektur_6_zyoqzf.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467081/624652392_1275157338012754_2085512793756346340_n_azvswy.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467080/624557958_646612198542413_8191119823954755618_n_mqx7wr.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467079/625848100_1427852935404853_8619980546053770923_n_kb8v7r.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770466952/623879116_1772609086753118_1248088909984247369_n_vv8uqx.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770466821/623806300_1263113015691006_8552080892317088751_n_e9t7b6.jpg',
    ],
  },
  {
    slug: 'batsfjord-skole',
    img: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467198/0_5422689_ai5rof.jpg',
    gallery: [
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467198/0_5422689_ai5rof.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467196/625189443_1788022451871718_3090963314440161813_n_nmlkdc.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467195/625315318_1439006944678890_1120666264324147189_n_oozof5.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467193/625402601_25737875549197117_3393613247484993502_n_x6kopw.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467192/623014151_895292279889546_3179939874879642749_n_glszzs.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467190/623301474_25887445337608358_7760429715345443066_n_lktgwx.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467189/624115563_1197815682334547_2379682599370264384_n_bkxo9j.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467188/624157112_1522303939896291_1616043400929296165_n_ztvs35.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467187/624630076_885245020776075_8036395950518381393_n_nwrvdw.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467185/626317564_904669808696397_8396978757215254469_n_juckrn.jpg',
      'https://res.cloudinary.com/dioua8akg/image/upload/v1770467185/623828746_1991382111416859_2751002747916170571_n_kga1r4.jpg',
    ],
  },
  // ...dodaj kolejne realizacje (slug, img, gallery)
]

export default function Projects() {
  const { t } = useTranslation()

  const repeatCount = 3
  const looped = Array.from({ length: repeatCount }, () => data).flat()

  // który projekt jest aktualnie otwarty w modalu
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const selectedProject = selectedSlug
    ? data.find(p => p.slug === selectedSlug) ?? null
    : null

  // zamykanie modala klawiszem Escape
  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) {
      setIsModalVisible(false)
      return
    }
    const id = window.requestAnimationFrame(() => setIsModalVisible(true))
    return () => window.cancelAnimationFrame(id)
  }, [selectedProject])

  const handleOpen = (slug: string) => {
    setSelectedSlug(slug)
  }

  const handleClose = () => {
    setIsModalVisible(false)
    window.setTimeout(() => setSelectedSlug(null), 220)
  }

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

        <div className="no-scrollbar relative overflow-hidden">
          <div
            className="marquee-track flex gap-4 hover:[animation-play-state:paused]"
            style={{ ['--marquee-shift' as any]: `${100 / repeatCount}%` }}
          >
            {looped.map((p, i) => {
            const title = t(`projects.titles.${p.slug}`)
            const aria = t('projects.viewAria', { title })

            return (
              <article
                key={`${p.slug}-${i}`}
                data-card
                className="shrink-0 w-[280px] overflow-hidden rounded-2xl border shadow-sm bg-white"
              >
                <button
                  type="button"
                  onClick={() => handleOpen(p.slug)}
                  aria-label={aria}
                  className="block w-full text-left"
                >
                  <ImageWithLoader
                    src={p.img}
                    alt={title}
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <div className="p-3 text-sm text-gray-700">{title}</div>
                </button>
              </article>
            )
          })}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
            isModalVisible ? 'bg-black/60 opacity-100' : 'bg-black/0 opacity-0'
          }`}
          onClick={handleClose}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-xl transition-all duration-200 ${
              isModalVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.98] opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* X w prawym górnym rogu */}
            <button
              type="button"
              onClick={handleClose}
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
                  <ImageWithLoader
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
                onClick={handleClose}
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
