import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User } from 'lucide-react';

const navTabs = [
  { label: 'Home', path: '/' },
  { label: 'AI Toolkit', path: '/toolkit' },
  { label: 'Stock Catalog', path: '/stock' },
  { label: 'Lola', path: '/lola', icon: Sparkles },
];

export default function TopNav() {
  const location = useLocation();

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm flex items-center px-6 fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-lg font-bold tracking-tight text-foreground mr-10">
        LolaLab
      </Link>

      {/* Center tabs */}
      <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
        {navTabs.map(tab => {
          const active = location.pathname === tab.path;
          const isToolkit = tab.path === '/toolkit';
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                active && isToolkit
                  ? 'bg-api-yellow text-black'
                  : active
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-3 ml-auto">
        <Link
          to="/toolkit"
          className="hidden sm:inline-flex bg-api-yellow text-black text-sm font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition-all"
        >
          Subscribe Now
        </Link>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
