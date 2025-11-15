import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="start"
      className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:py-20"
    >
      <div className="grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
        {/* Tekst */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {t('hero.title')}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:flex-wrap sm:items-center">
            <a
              href="#oferta"
              className="inline-flex justify-center items-center rounded-xl bg-brand-500 px-5 py-3 font-medium text-white hover:bg-brand-600"
            >
              {t('hero.ctaOffer')}
            </a>
            <a
              href="#kontakt"
              className="inline-flex justify-center items-center rounded-xl border px-5 py-3 font-medium text-gray-800 bg-white/60 hover:bg-white"
            >
              {t('hero.ctaQuote')}
            </a>
          </div>
        </div>

        {/* Obrazek */}
        <div className="mt-6 md:mt-0 overflow-hidden rounded-2xl border shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
            alt="Plac budowy — wizualizacja realizacji Valheimbygg"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}