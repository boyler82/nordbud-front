import { motion } from 'framer-motion'
import { Hammer } from 'lucide-react'

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20">
      <section className="grid gap-8 py-16 md:grid-cols-2 md:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight md:text-5xl"
          >
            Solidne realizacje budowlane dla firm i domów
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600">
            Nordbud – wykonawstwo, remonty, instalacje. Terminowo, rzetelnie, bez zbędnych formalności.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="#oferta"
              className="rounded-xl bg-brand-500 px-5 py-3 font-medium text-white shadow hover:bg-brand-600 active:scale-[0.99]"
            >
              Zobacz ofertę
            </a>
            <a
              href="/kontakt"
              className="rounded-xl border px-5 py-3 font-medium text-gray-800 hover:bg-gray-50"
            >
              Umów wycenę
            </a>
          </div>
          <ul id="oferta" className="mt-10 grid gap-4 sm:grid-cols-2">
            {["Generalne wykonawstwo","Remonty i wykończenia","Elewacje i dachy","Instalacje i serwis"].map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-xl border p-4">
                <Hammer className="h-5 w-5" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border shadow">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
            alt="Plac budowy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </main>
  )
}