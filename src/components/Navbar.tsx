// src/components/Navbar.tsx
import { useState } from 'react'
import Logo from '@/components/Logo'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#start', label: t('nav.start') },
    { href: '#oferta', label: t('nav.offer') || 'Oferta' },
    { href: '#realizacje', label: t('nav.projects') || 'Realizacje' },
    { href: '#kontakt', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <a
          href="#start"
          className="text-brand-600 hover:text-brand-700 transition-colors"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile: language + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-white/70 hover:text-gray-900"
          >
            {open ? (
              // Ikona X
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              // Ikona hamburgera
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu (rozwijane pod navem) */}
      {open && (
        <div className="md:hidden border-b bg-white/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 text-gray-800 hover:text-gray-900"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}