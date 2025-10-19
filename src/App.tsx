// src/App.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Offer from '@/components/Offer'
import Projects from '@/components/Projects'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import useScrollToHash from '@/hooks/useScrollToHash'

export default function App() {
  useScrollToHash(96) // wysokość sticky navu
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <section id="start" className="scroll-mt-24"><Hero /></section>
        <section id="oferta" className="scroll-mt-24"><Offer /></section>
        <section id="realizacje" className="scroll-mt-24"><Projects /></section>
        <section id="kontakt" className="scroll-mt-24"><ContactSection /></section>
      </main>
      <Footer />
    </div>
  )
}