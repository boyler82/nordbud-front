import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Offer() {
  const { t } = useTranslation()
  const [openKey, setOpenKey] = useState<string | null>(null)

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

  const toggle = (key: string) => {
    setOpenKey(prev => (prev === key ? null : key))
  }

  return (
    <section id="oferta" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold">{t('offer.heading')}</h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600">{t('offer.lead')}</p>
      </header>

      {/* LISTA USŁUG */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map(s => {
          const isOpen = openKey === s.key

          return (
            <article
              key={s.key}
              className="
                rounded-2xl border bg-white/80 shadow-sm transition
                hover:-translate-y-1 hover:shadow-lg hover:border-brand-400
              "
            >
              <button
                type="button"
                onClick={() => toggle(s.key)}
                className="flex w-full flex-col items-stretch text-left p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {s.short}
                    </p>
                  </div>

                  {/* NOWA IKONA + / - */}
                  <span
                    aria-hidden="true"
                    className="
                      flex h-7 w-7 items-center justify-center rounded-full border
                      text-lg font-bold text-brand-600
                      transition-all duration-300
                    "
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </div>

                {/* rozwinięcie */}
                {isOpen && (
                  <p
                    className="
                      mt-4 text-sm text-gray-700 animate-fadeIn
                    "
                  >
                    {s.details}
                  </p>
                )}
              </button>
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
              <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-brand-500" />
              <span>{r.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}