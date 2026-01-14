// src/App.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Offer from '@/components/Offer'
import Projects from '@/components/Projects'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import useScrollToHash from '@/hooks/useScrollToHash'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.resolvedLanguage || 'no'

    const titles: Record<string, string> = {
      no: 'Valheimbygg AS – Byggfirma i Norge',
      en: 'Valheimbygg AS – Construction company in Norway',
      pl: 'Valheimbygg AS – Firma budowlana w Norwegii',
    }

    const descriptions: Record<string, string> = {
      no: 'Valheimbygg AS – profesjonell byggfirma i Norge. Tømrerarbeid, rehabilitering, betong og fasader. Gratis befaring.',
      en: 'Valheimbygg AS – construction company in Norway. Carpentry, renovation, concrete and facades. Free site visit.',
      pl: 'Valheimbygg AS – firma budowlana w Norwegii. Ciesielstwo, remonty, beton i elewacje. Darmowa wycena.',
    }

    document.title = titles[lang] || titles.no

    // Update (or create) meta description for the current language
    const head = document.head
    let meta = head.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      head.appendChild(meta)
    }
    meta.content = descriptions[lang] || descriptions.no

    // Update html lang for accessibility/SEO
    document.documentElement.lang = lang
  }, [i18n.resolvedLanguage])
  useScrollToHash(96);

  return (
<div style={{ background: "var(--color-bg-gradient-3)" }} className="min-h-screen text-gray-900">
      <Navbar />
      <main>
        <section id="start" className="scroll-mt-24">
          <Hero />
        </section>
        <section id="oferta" className="scroll-mt-24">
          <Offer />
        </section>
        <section id="realizacje" className="scroll-mt-24">
          <Projects />
        </section>
        <section id="kontakt" className="scroll-mt-24">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}