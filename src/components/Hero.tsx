import { useTranslation } from 'react-i18next'

export default function Hero() {
    const { t } = useTranslation();
  return (
    <section id="start" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {t('hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#oferta" className="inline-flex items-center rounded-xl bg-brand-500 px-5 py-3 font-medium text-white hover:bg-brand-600">
              {t('hero.ctaOffer')}
            </a>
            <a href="#kontakt" className="inline-flex items-center rounded-xl border px-5 py-3 font-medium text-gray-800 hover:bg-gray-50">
              {t('hero.ctaQuote')}
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
            alt="Plac budowy — wizualizacja realizacji Nordbud"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}