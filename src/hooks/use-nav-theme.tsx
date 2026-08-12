import { createContext, useContext, ReactNode } from 'react';

/**
 * NavTheme (8/ago) — bug: Navbar decidia cor clara/escura só por prefixo de
 * rota (`pathname.startsWith('/library')`), e /studio/:slug (fundo creme,
 * igual --background) ficava de fora — os 7 links renderizavam na mesma cor
 * do fundo, invisíveis.
 *
 * Cada página que precisa de navbar em modo claro (fundo creme/paper) agora
 * declara isso explicitamente com <NavThemeProvider theme="light">, em vez
 * de a Navbar tentar adivinhar pelo pathname. Default null: páginas que não
 * envolvem nada com o provider caem no heurístico de rota que a Navbar já
 * tinha (preserva /library, /library/access, /library/thank-you como
 * estavam, sem precisar tocar nelas).
 */
export type NavTheme = 'dark' | 'light';

const NavThemeContext = createContext<NavTheme | null>(null);

export function NavThemeProvider({ theme, children }: { theme: NavTheme; children: ReactNode }) {
  return <NavThemeContext.Provider value={theme}>{children}</NavThemeContext.Provider>;
}

export function useNavTheme(): NavTheme | null {
  return useContext(NavThemeContext);
}
