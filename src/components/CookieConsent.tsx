import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Prefs = {
  necessary: true
  functional: boolean
  analytics: boolean
  performance: boolean
  ads: boolean
  unclassified: boolean
}

type StoredConsent = {
  version: number
  status: 'all' | 'reject' | 'custom'
  prefs: Prefs
}

const STORAGE_KEY = 'cookieConsent'
const STORAGE_VERSION = 1

const defaultPrefs: Prefs = {
  necessary: true,
  functional: false,
  analytics: false,
  performance: false,
  ads: false,
  unclassified: false,
}

function loadStored(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (!parsed || parsed.version !== STORAGE_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function saveStored(status: StoredConsent['status'], prefs: Prefs) {
  const payload: StoredConsent = {
    version: STORAGE_VERSION,
    status,
    prefs,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export default function CookieConsent() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs)

  useEffect(() => {
    const stored = loadStored()
    if (!stored) {
      setIsOpen(true)
      return
    }
    setPrefs(stored.prefs)
  }, [])

  const allOnPrefs = useMemo<Prefs>(() => ({
    necessary: true,
    functional: true,
    analytics: true,
    performance: true,
    ads: true,
    unclassified: true,
  }), [])

  const handleAcceptAll = () => {
    setPrefs(allOnPrefs)
    saveStored('all', allOnPrefs)
    setIsOpen(false)
    setShowPrefs(false)
  }

  const handleReject = () => {
    setPrefs(defaultPrefs)
    saveStored('reject', defaultPrefs)
    setIsOpen(false)
    setShowPrefs(false)
  }

  const handleSavePrefs = () => {
    const payload: Prefs = { ...prefs, necessary: true }
    setPrefs(payload)
    saveStored('custom', payload)
    setIsOpen(false)
    setShowPrefs(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-4 md:pb-8">
      <div className="absolute inset-0 bg-black/30" onClick={() => setShowPrefs(true)} />

      {!showPrefs ? (
        <div className="relative w-full max-w-3xl rounded-2xl border bg-white p-5 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('cookies.title')}
          </h3>
          <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
            {t('cookies.lead')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReject}
              className="rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('cookies.reject')}
            </button>
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('cookies.customize')}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              {t('cookies.acceptAll')}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-3xl rounded-2xl border bg-white p-5 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('cookies.prefsTitle')}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                {t('cookies.prefsLead')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPrefs(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold text-gray-600 hover:bg-gray-100"
              aria-label={t('cookies.close')}
            >
              ×
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-700">
            {t('cookies.prefsText')}
            {!showMore && (
              <>
                {' '}
                <button
                  type="button"
                  onClick={() => setShowMore(true)}
                  className="text-brand-600 underline"
                >
                  {t('cookies.more')}
                </button>
              </>
            )}
          </p>

          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{t('cookies.necessary')}</div>
                  <div className="text-xs text-gray-600">{t('cookies.alwaysActive')}</div>
                </div>
                <span className="text-xs font-semibold text-brand-700">
                  {t('cookies.alwaysOn')}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-600 whitespace-pre-line">
                {t('cookies.necessaryDesc')}
              </p>
            </div>

            {([
              ['functional', 'functionalDesc'],
              ['analytics', 'analyticsDesc'],
              ['performance', 'performanceDesc'],
              ['ads', 'adsDesc'],
              ['unclassified', 'unclassifiedDesc'],
            ] as const).map(([key, descKey]) => (
              <div key={key} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-gray-900">
                    {t(`cookies.${key}`)}
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={prefs[key]}
                      onChange={(e) =>
                        setPrefs((p) => ({ ...p, [key]: e.target.checked }))
                      }
                    />
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-600 whitespace-pre-line">
                  {t(`cookies.${descKey}`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReject}
              className="rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('cookies.reject')}
            </button>
            <button
              type="button"
              onClick={handleSavePrefs}
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              {t('cookies.save')}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('cookies.acceptAll')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
