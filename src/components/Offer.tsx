import { useTranslation } from 'react-i18next'

export default function Offer() {
  const { t } = useTranslation()

  const serviceKeys = ['carpentry', 'renovation', 'concrete', 'roofFacade']

  const services = serviceKeys.map(key => ({
    key,
    title: t(`offer.services.${key}.title`),
    short: t(`offer.services.${key}.short`),
    details: t(`offer.services.${key}.details`),
  }))

  const reasonsKeys = ['experience', 'quality', 'communication', 'onTime']

  const reasons = reasonsKeys.map(key => ({
    key,
    text: t(`offer.why.items.${key}`),
  }))

  return (
    <section id="oferta" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* Główny nagłówek sekcji */}
      <header className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {t('offer.heading')}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600">
          {t('offer.lead')}
        </p>
      </header>

      {/* Kafle usług */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map(s => (
          <article
            key={s.key}
            className="
              group relative overflow-hidden
              rounded-2xl border bg-white/80
              p-5 sm:p-6
              shadow-sm
              transition
              hover:-translate-y-1 hover:shadow-lg hover:border-brand-400
            "
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {s.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              {s.short}
            </p>

            {/* Szczegóły pojawiające się przy hover / tap */}
            <p
              className="
                mt-3 text-sm text-gray-700
                opacity-0 max-h-0
                group-hover:opacity-100 group-hover:max-h-40
                transition-all duration-300 ease-out
              "
            >
              {s.details}
            </p>
          </article>
        ))}
      </div>

      {/* „Dlaczego my” */}
      <section className="mt-10 rounded-2xl border bg-white/80 p-5 sm:p-6 shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          {t('offer.why.heading')}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          {t('offer.why.lead')}
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {reasons.map(r => (
            <li
              key={r.key}
              className="flex items-start gap-2 text-sm text-gray-800"
            >
              <span className="mt-[4px] h-2 w-2 rounded-full bg-brand-500" />
              <span>{r.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}