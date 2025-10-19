import { useTranslation } from 'react-i18next'

export default function Offer() {
  const { t } = useTranslation();
  const items = t('offer.items', { returnObjects: true }) as string[];

  return (
    <section id="oferta" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">{t('offer.heading')}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map(txt => (
          <li key={txt} className="rounded-xl border p-4">
            {txt}
          </li>
        ))}
      </ul>
    </section>
  );
}