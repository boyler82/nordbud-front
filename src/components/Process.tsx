import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown } from 'lucide-react'

const steps = [
  { key: 'befaring' },
  { key: 'tilbud', hasDetails: true },
  { key: 'planlegging' },
  { key: 'utforelse', hasDetails: true },
  { key: 'ferdigstillelse' },
]

export default function Process() {
  const { t } = useTranslation()
  const [openIdx, setOpenIdx] = useState<number[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [unpinDelayDone, setUnpinDelayDone] = useState(false)
  const [isUnpinning, setIsUnpinning] = useState(false)
  const isPinned = activeIndex < steps.length - 1 || !unpinDelayDone

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onReduceChange = () => {
      if (media.matches) setActiveIndex(steps.length - 1)
    }
    onReduceChange()
    media.addEventListener?.('change', onReduceChange)

    if (media.matches) {
      setActiveIndex(steps.length - 1)
      setUnpinDelayDone(true)
      return () => {
        media.removeEventListener?.('change', onReduceChange)
      }
    }

    let timer = 0
    let cancelled = false
    const tick = (idx: number) => {
      if (cancelled) return
      setActiveIndex(idx)
      if (idx >= steps.length - 1) return
      timer = window.setTimeout(() => tick(idx + 1), 1500)
    }
    timer = window.setTimeout(() => tick(0), 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      media.removeEventListener?.('change', onReduceChange)
    }
  }, [])

  useEffect(() => {
    if (activeIndex < steps.length - 1) {
      setUnpinDelayDone(false)
      setIsUnpinning(false)
      return
    }
    const blurId = window.setTimeout(() => setIsUnpinning(true), 1600)
    const id = window.setTimeout(() => {
      setUnpinDelayDone(true)
      setIsUnpinning(false)
    }, 2000)
    return () => {
      window.clearTimeout(blurId)
      window.clearTimeout(id)
    }
  }, [activeIndex])

  const toggle = (idx: number) => {
    setOpenIdx(prev => (prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]))
  }

  const renderHeader = (compact: boolean) => (
    <header className="max-w-3xl">
      {!compact && (
        <h2 className="text-2xl font-bold">{t('process.title')}</h2>
      )}
      {!compact && (
        <>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            {t('process.lead')}
          </p>
          <p className="mt-3 text-sm font-semibold text-brand-700">
            {t('process.promise')}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {t('process.local')}
          </p>
        </>
      )}
    </header>
  )

  const content = (compact: boolean) => (
    <div
      className={`rounded-3xl border bg-white/60 backdrop-blur ${
        compact ? 'px-2.5 py-3 sm:px-5 sm:py-4' : 'p-6 sm:p-8'
      }`}
    >
      {renderHeader(compact)}

      <div className={`relative ${compact ? 'mt-2' : 'mt-8'}`}>
        <div
          className={`process-line absolute left-4 right-4 top-4 h-px ${compact ? '' : 'hidden md:block'}`}
          style={{
            ['--process-progress' as any]: `${Math.max(0, (activeIndex + 1) / steps.length) * 100}%`,
          }}
        />
        <ol
          className={`grid ${
            compact ? 'grid-cols-5 gap-2' : 'gap-6 sm:grid-cols-2 md:grid-cols-5'
          }`}
        >
          {steps.map((step, i) => {
            const isActive = i <= activeIndex
            const title = t(`process.steps.${step.key}.title`)
            const summary = t(`process.steps.${step.key}.summary`)
            const details = step.hasDetails
              ? t(`process.steps.${step.key}.details`)
              : ''

            return (
            <li
              key={step.key}
              className={`flex flex-col ${
                compact
                  ? 'items-center text-center'
                  : 'items-start text-left sm:items-center sm:text-center'
              }`}
            >
              <div
                className={`process-dot relative z-10 flex items-center justify-center rounded-full border bg-white shadow-sm ${
                  compact ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-8 w-8'
                } ${isActive ? 'process-dot-active' : ''}`}
              >
                <span className={`process-fill ${isActive ? 'process-fill-active' : ''}`} aria-hidden />
                <Check
                  className={`process-check text-brand-700 ${
                    compact ? 'h-2.5 w-2.5 sm:h-3 sm:w-3' : 'h-4 w-4'
                  }`}
                  style={{ animationDelay: `${i * 120}ms` }}
                  aria-hidden
                />
              </div>
              <div
                className={`font-semibold text-gray-800 ${
                  compact ? 'mt-1 text-[clamp(0.55rem,2.2vw,0.8rem)]' : 'mt-3 text-sm'
                }`}
              >
                {title}
              </div>
              {!compact && (
                <div className="mt-1 text-xs text-gray-600">
                  {summary}
                </div>
              )}
              {step.hasDetails && details && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800"
                    aria-expanded={openIdx.includes(i)}
                    aria-controls={`process-details-${i}`}
                  >
                    {openIdx.includes(i) ? t('process.less') : t('process.more')}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${openIdx.includes(i) ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                  {openIdx.includes(i) && (
                    <div
                      id={`process-details-${i}`}
                      className="mt-2 rounded-lg border bg-white/80 px-3 py-2 text-xs text-gray-700"
                    >
                      {details}
                    </div>
                  )}
                </div>
              )}
            </li>
          )})}
        </ol>
      </div>
    </div>
  )

  return (
    <>
      <section
        id="prosess"
        className={`mx-auto max-w-6xl px-4 ${isPinned ? 'py-0' : 'py-10 sm:py-12'}`}
      >
        {!isPinned && content(false)}
      </section>
      {isPinned && (
        <div
          className={`fixed bottom-4 left-0 right-0 z-50 transition-all duration-300 ease-out ${isUnpinning ? 'process-unpin' : ''}`}
        >
          <div className="mx-auto max-w-6xl px-2 sm:px-4">
            {content(true)}
          </div>
        </div>
      )}
    </>
  )
}
