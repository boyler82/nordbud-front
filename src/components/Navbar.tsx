import Logo from '@/components/Logo'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Navbar() {
  const { t } = useTranslation();

  const links = [
    { href: '#start', label: t('nav.start') },
    { href: '#oferta', label: t('nav.offer') || 'Oferta' },
    { href: '#realizacje', label: t('nav.projects') || 'Realizacje' },
    { href: '#kontakt', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#start" className="text-brand-600 hover:text-brand-700 transition-colors">
          <Logo />
        </a>
        <nav className="flex items-center gap-6 text-sm">
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
      </div>
    </header>
  )
}