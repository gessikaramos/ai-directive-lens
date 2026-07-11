import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import { getLenis } from '@/hooks/use-lenis';
import { Menu, X, Globe } from 'lucide-react';

// Wave 1.1 hotfix · Fred/Gé 6/jul · Escolha A: esconder PT/EN toggle temporariamente
// Motivo: toggle traduz só menu, não corpo. Site EN-only até tradução completa futura.
// Reativar: trocar pra true quando i18n cobrir todas as rotas.
const SHOW_LANG_TOGGLE = false;

type NavItem = { key: string; href: string; type: 'anchor' | 'route' };

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Wave 2.0 · canon-mestre navigation Fred+Gé 7/jul · Studio · Lab · Library · About · Contact
  // Steve Jobs Lens: quero contratar → Studio · quero explorar ideia → Lab · quero aprender → Library
  const navLinks: NavItem[] = [
    { key: 'nav.studio', href: '/studio', type: 'route' },
    { key: 'nav.lab', href: '/lab', type: 'route' },
    { key: 'nav.library', href: '/library', type: 'route' },
    { key: 'nav.signal', href: '/signal', type: 'route' },
    { key: 'nav.about', href: '/about', type: 'route' },
    { key: 'nav.contact', href: '/contact', type: 'route' },
  ];

  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/' + href);
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -80 });
      else target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname);
    },
    [location.pathname, navigate],
  );

  const renderLink = (
    link: NavItem,
    onClick?: () => void,
    className = '',
    style?: React.CSSProperties,
  ) => {
    if (link.type === 'route') {
      return (
        <Link
          key={link.key}
          to={link.href}
          onClick={onClick}
          className={className}
          style={style}
        >
          {t(link.key, lang)}
        </Link>
      );
    }
    return (
      <a
        key={link.key}
        href={link.href}
        onClick={(e) => {
          handleAnchor(e, link.href);
          onClick?.();
        }}
        className={className}
        style={style}
      >
        {t(link.key, lang)}
      </a>
    );
  };

  // Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
  // Home é toda dark ink · navbar cream sempre · backdrop ink sutil quando scrolled
  // Wave DOP: rotas cream/paper (Library) usam tom ink para não sumir no fundo.
  const lightRoute = location.pathname.startsWith('/library');
  const navTextColor = lightRoute && !scrolled ? 'hsl(30 14% 15%)' : 'hsl(var(--background))';
  const logoFilter = lightRoute && !scrolled ? 'none' : 'brightness(0) invert(1)';
  const navBg = scrolled
    ? { backgroundColor: 'hsl(var(--ink) / 0.85)', backdropFilter: 'blur(12px)' }
    : { backgroundColor: 'transparent' };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
        style={navBg}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link
            to="/"
            className="block"
            onClick={() => {
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(0);
            }}
          >
            <img
              src="/images/logos/logo-horizontal.svg"
              alt="Lola Lab"
              className="h-8 md:h-10"
              style={{ filter: logoFilter, opacity: 0.95 }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) =>
              renderLink(
                link,
                undefined,
                'transition-opacity duration-300 hover:opacity-70',
                {
                  color: navTextColor,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                },
              ),
            )}
            {SHOW_LANG_TOGGLE && (
              <button
                onClick={toggleLang}
                className="border border-border px-3 py-1.5 hover:bg-accent-surface transition-all duration-300 flex items-center gap-1.5"
                style={{
                  color: navTextColor,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
                aria-label={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'en' ? 'PT' : 'EN'}
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            style={{ color: navTextColor }}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10 animate-in fade-in duration-300"
          style={{ backgroundColor: 'hsl(var(--ink))' }}
        >
          <button
            className="absolute top-6 right-6"
            style={{ color: 'hsl(var(--background))' }}
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          {navLinks.map((link) =>
            renderLink(
              link,
              () => setMobileOpen(false),
              'transition-opacity duration-300 hover:opacity-70',
              {
                color: 'hsl(var(--background))',
                fontSize: '1.5rem',
                fontWeight: 300,
                letterSpacing: '0.05em',
              },
            ),
          )}
          {SHOW_LANG_TOGGLE && (
            <button
              onClick={() => {
                toggleLang();
                setMobileOpen(false);
              }}
              className="border px-5 py-2.5 mt-4 flex items-center gap-2"
              style={{
                borderColor: 'hsl(var(--background) / 0.3)',
                color: 'hsl(var(--background))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'Português' : 'English'}
            </button>
          )}
        </div>
      )}
    </>
  );
}
