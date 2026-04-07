import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'nav.work', to: '/work' },
    { key: 'nav.about', to: '/about' },
    { key: 'nav.contact', to: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-background/80 backdrop-blur-md' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link to="/" className="block">
            <img
              src="/images/logos/logo-horizontal.svg"
              alt="Lola Lab"
              className="h-5 md:h-6 opacity-90"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.key}
                to={link.to}
                className="label-style underline-offset-4 hover:underline hover:text-foreground transition-all duration-300"
              >
                {t(link.key, lang)}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="label-style border border-border px-3 py-1.5 hover:bg-accent-surface transition-all duration-300 flex items-center gap-1.5"
              aria-label={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5" />
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
            <Link
              key={link.key}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-light tracking-[0.15em] text-soft underline-offset-4 hover:underline hover:text-foreground transition-all duration-300"
            >
              {t(link.key, lang)}
            </Link>
          ))}
          <button
            onClick={() => { toggleLang(); setMobileOpen(false); }}
            className="label-style border border-border px-5 py-2.5 mt-4 flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'Português' : 'English'}
          </button>
        </div>
      )}
    </>
  );
}
