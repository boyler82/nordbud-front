import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation();
  const images = [
    'https://res.cloudinary.com/dioua8akg/image/upload/v1770466775/Flakstad_skole_-_Hundven-Clements_LINK_Arkitektur_6_zmsqrg.jpg',
    'https://res.cloudinary.com/dioua8akg/image/upload/v1770466770/batsfiord_hall2_f9qmi8.jpg',
    'https://res.cloudinary.com/dioua8akg/image/upload/v1770466781/glasvegg_cba7iv.jpg',
    'https://res.cloudinary.com/dioua8akg/image/upload/v1770466624/IMG_3041_httvhx.jpg',
    'https://res.cloudinary.com/dioua8akg/image/upload/v1770466765/batsfiord_holl_rbwlyj.jpg',
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [images.length])

  return (
    <section
      id="start"
      className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:py-20 -translate-y-[30px]"
    >
      <div className="grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
        {/* Tekst */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {t('hero.title')}
          </h1>

          <p className="mt-4 whitespace-pre-line text-base sm:text-lg text-gray-600">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:flex-wrap sm:items-center">
            <a
              href="#oferta"
              className="inline-flex w-full justify-center items-center rounded-xl bg-brand-500 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-600 whitespace-normal break-words sm:w-auto sm:px-5 sm:py-3 sm:text-base"
            >
              {t('hero.ctaOffer')}
            </a>
            <a
              href="#kontakt"
              className="inline-flex w-full justify-center items-center rounded-xl border px-4 py-2.5 text-center text-sm font-medium text-gray-800 bg-white/60 hover:bg-white whitespace-normal break-words sm:w-auto sm:px-5 sm:py-3 sm:text-base"
            >
              {t('hero.ctaQuote')}
            </a>
          </div>
        </div>

        {/* Obrazek / pokaz slajdów */}
        <div className="relative mt-6 md:mt-0 overflow-hidden rounded-2xl border shadow-sm">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Realizacje Nordbud"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="aspect-[16/10] w-full" />
        </div>
      </div>
    </section>
  );
}
