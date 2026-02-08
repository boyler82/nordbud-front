import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GalleryModal from '@/components/GalleryModal'

export default function Offer() {
  const { t } = useTranslation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [activeGallery, setActiveGallery] = useState<{
    title: string
    items: { src: string; alt: string }[]
  } | null>(null)

  const serviceKeys = ['systeme', 'montasje', 'snekker', 'betong']

  const services = serviceKeys.map(key => ({
    key,
    title: t(`offer.services.${key}.title`),
    short: t(`offer.services.${key}.short`),
    intro: t(`offer.services.${key}.detailsIntro`),
    items: (t(`offer.services.${key}.items`, { returnObjects: true }) as string[]) || [],
  }))

  const galleriesByService: Record<
    string,
    { key: string; label: string; items: { src: string; alt: string }[] }[]
  > = {
    systeme: [
      {
        key: 'ceilings-system',
        label: t('offer.gallery.systeme.ceilingsSystem'),
        items: [
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467188/624157112_1522303939896291_1616043400929296165_n_ztvs35.jpg',
            alt: t('alt.systeme.suspendedCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467079/625848100_1427852935404853_8619980546053770923_n_kb8v7r.jpg',
            alt: t('alt.systeme.suspendedCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467081/624652392_1275157338012754_2085512793756346340_n_azvswy.jpg',
            alt: t('alt.systeme.suspendedCeiling'),
          },
        ],
      },
      {
        key: 'ceilings-gk',
        label: t('offer.gallery.systeme.ceilingsGk'),
        items: [
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770485494/Rodzaje-profili-do-plyt-gipsowo-kartonowych.jpg_qx0yoz.webp',
            alt: t('alt.systeme.gypsumCeiling'),
          },
        ],
      },
      {
        key: 'ceilings-acoustic',
        label: t('offer.gallery.systeme.ceilingsAcoustic'),
        items: [
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467081/624652392_1275157338012754_2085512793756346340_n_azvswy.jpg',
            alt: t('alt.systeme.acousticCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770466952/623879116_1772609086753118_1248088909984247369_n_vv8uqx.jpg',
            alt: t('alt.systeme.acousticCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467187/624630076_885245020776075_8036395950518381393_n_nwrvdw.jpg',
            alt: t('alt.systeme.acousticCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467185/626317564_904669808696397_8396978757215254469_n_juckrn.jpg',
            alt: t('alt.systeme.acousticCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467185/623828746_1991382111416859_2751002747916170571_n_kga1r4.jpg',
            alt: t('alt.systeme.acousticCeiling'),
          },
        ],
      },
      {
        key: 'ceilings-wood',
        label: t('offer.gallery.systeme.ceilingsWood'),
        items: [
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467187/624630076_885245020776075_8036395950518381393_n_nwrvdw.jpg',
            alt: t('alt.systeme.woodCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467185/626317564_904669808696397_8396978757215254469_n_juckrn.jpg',
            alt: t('alt.systeme.woodCeiling'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770467185/623828746_1991382111416859_2751002747916170571_n_kga1r4.jpg',
            alt: t('alt.systeme.woodCeiling'),
          },
        ],
      },
      {
        key: 'walls-gk',
        label: t('offer.gallery.systeme.wallsGk'),
        items: [
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770486464/44_195717012.jpg_itkhqb.jxl',
            alt: t('alt.systeme.gypsumPartitions'),
          },
        ],
      },
      {
        key: 'walls-glass',
        label: t('offer.gallery.systeme.wallsGlass'),
        items: [
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770487956/Innvendige-glassvegger-kontorvegger-5_to57nu.jpg',
            alt: t('alt.systeme.glassPartitions'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770487943/Innvendige-glassvegger-kontorvegger-3-1-1_srtpcg.jpg',
            alt: t('alt.systeme.glassPartitions'),
          },
          {
            src: 'https://res.cloudinary.com/dioua8akg/image/upload/v1770466781/glasvegg_cba7iv.jpg',
            alt: t('alt.systeme.glassPartitions'),
          },
        ],
      },
    ],
    montasje: [
      { key: 'doors', label: t('offer.gallery.montasje.doors'), items: [] },
      { key: 'balustrades', label: t('offer.gallery.montasje.balustrades'), items: [] },
      { key: 'facades', label: t('offer.gallery.montasje.facades'), items: [] },
      { key: 'windows', label: t('offer.gallery.montasje.windows'), items: [] },
      { key: 'kitchens', label: t('offer.gallery.montasje.kitchens'), items: [] },
    ],
    snekker: [
      { key: 'roof', label: t('offer.gallery.snekker.roof'), items: [] },
      { key: 'timber', label: t('offer.gallery.snekker.timber'), items: [] },
      { key: 'finish', label: t('offer.gallery.snekker.finish'), items: [] },
    ],
    betong: [
      { key: 'foundations', label: t('offer.gallery.betong.foundations'), items: [] },
      { key: 'walls', label: t('offer.gallery.betong.walls'), items: [] },
      { key: 'slabs', label: t('offer.gallery.betong.slabs'), items: [] },
      { key: 'stairs', label: t('offer.gallery.betong.stairs'), items: [] },
      { key: 'other', label: t('offer.gallery.betong.other'), items: [] },
    ],
  }

  const reasonsKeys = ['experience', 'quality', 'communication', 'onTime']
  const reasons = reasonsKeys.map(key => ({
    key,
    text: t(`offer.why.items.${key}`),
  }))

  const toggle = (key: string) => {
    setOpenKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  return (
    <section id="oferta" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="rounded-3xl border bg-white/60 backdrop-blur p-6 sm:p-8">
        <header className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold">{t('offer.heading')}</h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">{t('offer.lead')}</p>
        </header>

        {/* LISTA USŁUG */}
        <div className="mt-8 grid gap-6">
          {services.map(s => {
            const isOpen = openKeys.includes(s.key)
            const galleries = galleriesByService[s.key] ?? []

            return (
              <article
                key={s.key}
                className="
                  rounded-2xl border bg-white/80 shadow-sm transition
                  hover:-translate-y-1 hover:shadow-lg hover:border-brand-400
                "
              >
                <div className="flex w-full flex-col items-stretch text-left p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        {s.short}
                      </p>
                    </div>

                    {/* IKONA + / - (tylko ona przełącza) */}
                    <button
                      type="button"
                      onClick={() => toggle(s.key)}
                      aria-label={isOpen ? 'Collapse' : 'Expand'}
                      className="
                        flex h-7 w-7 items-center justify-center rounded-full border border-gray-300
                        text-lg font-bold text-white transition-all duration-300
                      "
                      style={{ backgroundColor: isOpen ? '#c0392b' : 'var(--color-brand-600)' }}
                    >
                      {isOpen ? '−' : '+'}
                    </button>
                  </div>

                  {/* rozwinięcie */}
                  {isOpen && (
                    <>
                      {s.intro && (
                        <p
                          className="
                            mt-4 text-sm text-gray-700 animate-fadeIn
                          "
                        >
                          {s.intro}
                        </p>
                      )}
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-semibold text-gray-800">
                          {t('offer.scope')}
                        </p>
                        <ul className="grid gap-2">
                          {galleries.map((g, idx) => (
                            <li
                              key={g.key}
                              className="flex items-start justify-between gap-3 rounded-lg border bg-white/70 px-3 py-2"
                            >
                              <span className="text-sm text-gray-800">
                                • {s.items[idx] ?? g.label}
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveGallery({ title: g.label, items: g.items })}
                                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-brand-600 hover:bg-gray-50"
                                aria-label={g.label}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2-2h8l2 2h3a2 2 0 0 1 2 2z" />
                                  <circle cx="12" cy="13" r="3.5" />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {/* DLACZEGO MY */}
        <section className="mt-10 rounded-2xl border bg-white/80 p-5 sm:p-6 shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {t('offer.why.heading')}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            {t('offer.why.lead')}
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {reasons.map(r => (
              <li key={r.key} className="flex items-start gap-2 text-sm text-gray-800">
                <span className="mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500" />
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <GalleryModal
        isOpen={!!activeGallery}
        title={activeGallery?.title ?? ''}
        items={activeGallery?.items ?? []}
        closeLabel={t('modal.close')}
        emptyLabel={t('modal.empty')}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  )
}
