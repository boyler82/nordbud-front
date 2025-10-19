import { useTranslation } from 'react-i18next'
import useMarquee from '@/hooks/useMarquee'
// Jeśli nie masz jeszcze stron detali, użyj <a href="#"> zamiast Link.
import { Link } from 'react-router-dom'

const data = [
  { slug: 'hala-magazynowa-gdansk',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'dom-jednorodzinny-gdynia',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'remont-biura-sopot',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop' },
  // …dodawaj kolejne obiekty (slug + img)
]

export default function Projects() {
  const { t } = useTranslation()

  // startowo 40 px/s; możesz zmienić np. na 60
const { containerRef, setSpeed, speed, paused, setPaused } =
  useMarquee<HTMLDivElement>({ pxPerSec: 40, draggable: true })

  // duplikujemy listę, by mieć płynną pętlę bez „skoku”
  const items = [...data, ...data]

  return (
    <section id="realizacje" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('projects.heading')}</h2>
          <p className="mt-2 text-gray-600">
            {t('projects.speedLabel')}: <span className="font-medium">{Math.round(speed)} px/s</span>
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setSpeed(s => Math.max(10, s - 20))}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            aria-label={t('projects.slower')!}
          >
            {t('projects.slower')}
          </button>
          <button
            onClick={() => setSpeed(s => s + 20)}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            aria-label={t('projects.faster')!}
          >
            {t('projects.faster')}
          </button>
          <button
            onClick={() => setPaused(p => !p)}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            aria-label={paused ? t('projects.resume')! : t('projects.pause')!}
          >
            {paused ? t('projects.start') : t('projects.pause')}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="no-scrollbar relative flex gap-4 overflow-x-auto"
        style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((p, i) => {
          const title = t(`projects.titles.${p.slug}`)
          const aria = t('projects.viewAria', { title })
          // Jeśli nie masz jeszcze stron detali, zamień Link na <a href="#">
          return (
            <article
              key={`${p.slug}-${i}`}
              data-card
              className="shrink-0 w-[85%] sm:w-[60%] md:w-[33.333%] overflow-hidden rounded-2xl border shadow-sm bg-white"
            >
              <Link to={`/projekt/${p.slug}`} aria-label={aria}>
                <img src={p.img} alt={title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-3 text-sm text-gray-700">{title}</div>
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}