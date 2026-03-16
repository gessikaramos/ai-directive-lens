import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'nav.work', href: '#work' },
    { key: 'nav.selected', href: '#cases' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-background/80 backdrop-blur-md' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#" className="block">
            <img
              src="/images/logos/logo-horizontal.svg"
              alt="Lola Lab"
              className="h-5 md:h-6 opacity-90"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="label-style underline-offset-4 hover:underline hover:text-foreground transition-all duration-300"
              >
                {t(link.key, lang)}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="label-style border border-border px-3 py-1.5 hover:bg-accent-surface transition-all duration-300"
            >
              {lang === 'en' ? 'PT' : 'EN'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center gap-10 animate-in fade-in duration-300">
          <button
            className="absolute top-6 right-6 text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          {navLinks.map(link => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-light tracking-[0.15em] text-soft underline-offset-4 hover:underline hover:text-foreground transition-all duration-300"
            >
              {t(link.key, lang)}
            </a>
          ))}
          <button
            onClick={() => { toggleLang(); setMobileOpen(false); }}
            className="label-style border border-border px-4 py-2 mt-4"
          >
            {lang === 'en' ? 'PT' : 'EN'}
          </button>
        </div>
      )}
    </>
  );
}
