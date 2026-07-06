export type Lang = 'en' | 'pt';

export const translations: Record<string, Record<Lang, string>> = {
  // Nav · canon Fred v1 Wave 1 · Lab · Library · Studio · About · Contact
  'nav.lab': { en: 'LAB', pt: 'LAB' },
  'nav.library': { en: 'LIBRARY', pt: 'LIBRARY' },
  'nav.studio': { en: 'STUDIO', pt: 'STUDIO' },
  'nav.about': { en: 'ABOUT', pt: 'SOBRE' },
  'nav.contact': { en: 'CONTACT', pt: 'CONTATO' },
  // Legacy keys · kept for backwards compat during migration
  'nav.work': { en: 'WORK', pt: 'TRABALHO' },
  'nav.selected': { en: 'SELECTED', pt: 'SELECIONADOS' },

  // Hero
  'hero.headline': { en: 'Direction Makes It Matter.', pt: 'A Direção Faz a Diferença.' },
  // Wave 1.1 · Fred v1 canon · Hero support único (substitui tagline+body legacy)
  'hero.support': {
    en: 'AI can generate. LolaLab directs.',
    pt: 'A IA pode gerar. A LolaLab dirige.',
  },
  // Legacy keys mantidas por retrocompatibilidade — não usadas mais no Hero
  'hero.tagline': {
    en: 'Translating human intention into form.',
    pt: 'Traduzindo intenção humana em forma.',
  },
  'hero.body': {
    en: 'AI-native editorial film studio. Direction is the craft.',
    pt: 'Estúdio de cinema editorial AI-native. A direção é o ofício.',
  },
  'hero.scroll': { en: 'SCROLL', pt: 'SCROLL' },
  'hero.cta.selected': { en: 'View selected work', pt: 'Ver trabalhos selecionados' },
  'hero.cta.lab': { en: 'Enter the Lab', pt: 'Entrar no Lab' },
  // Wave 1.1 · Fred v1 canon · CTA secondary Explore the Library
  'hero.cta.library': { en: 'Explore the Library', pt: 'Explorar a Library' },

  // Statement
  'statement.line1': {
    en: 'Artificial intelligence expands possibility.',
    pt: 'A inteligência artificial expande a possibilidade.',
  },
  'statement.line2': {
    en: 'Direction decides what deserves to exist.',
    pt: 'A direção decide o que merece existir.',
  },

  // Services (canon 4)
  'services.label': { en: 'WORK', pt: 'TRABALHO' },
  'services.heading': { en: 'What we do', pt: 'O que fazemos' },
  'service.films.title': {
    en: 'AI Brand Films & Launch Campaigns',
    pt: 'Filmes de Marca e Campanhas de Lançamento com IA',
  },
  'service.films.desc': {
    en: 'Editorial cinematic films for brands that want craft, not template.',
    pt: 'Filmes cinematográficos editoriais para marcas que querem ofício, não template.',
  },
  'service.characters.title': {
    en: 'Persistent Characters & Worlds',
    pt: 'Personagens e Mundos Persistentes',
  },
  'service.characters.desc': {
    en: 'Recurring characters and worlds that hold identity across scenes, formats, and time.',
    pt: 'Personagens e mundos recorrentes que sustentam identidade entre cenas, formatos e tempo.',
  },
  'service.systems.title': {
    en: 'Creative Systems Design',
    pt: 'Design de Sistemas Criativos',
  },
  'service.systems.desc': {
    en: 'Repeatable AI pipelines that translate human direction into production.',
    pt: 'Pipelines de IA repetíveis que traduzem direção humana em produção.',
  },
  'service.fashion.title': {
    en: 'AI Editorial Fashion Direction',
    pt: 'Direção Editorial de Moda com IA',
  },
  'service.fashion.desc': {
    en: 'Fashion editorials, lookbooks, and campaign imagery through AI direction.',
    pt: 'Editoriais de moda, lookbooks e imagens de campanha através de direção com IA.',
  },

  // Selected work
  'selected.label': { en: 'SELECTED WORK', pt: 'TRABALHO SELECIONADO' },
  'selected.masterchef.title': { en: 'MasterChef', pt: 'MasterChef' },
  // Wave 1.1 · Emenda 5 canon cross-site · Confidential · retail tech client
  // NÃO expor Retailgrid Oy publicamente até Fred/Gé validarem permissão.
  'selected.masterchef.client': {
    en: 'Confidential · retail tech client',
    pt: 'Confidencial · cliente de retail tech',
  },
  'selected.masterchef.desc': {
    en: 'A 54-second editorial commercial film. Six locked shots. Character consistency across scenes. Nordic Practical aesthetic. Fully AI-native from prompt to grade.',
    pt: 'Um filme comercial editorial de 54 segundos. Seis planos fixos. Consistência de personagem entre cenas. Estética Nordic Practical. Inteiramente AI-native, do prompt à gradação.',
  },
  'selected.masterchef.tag': { en: 'COMMERCIAL CASE', pt: 'CASE COMERCIAL' },
  'selected.masterchef.bridge': {
    en: 'For brand films, launch campaigns and AI-native visual systems, write to the studio.',
    pt: 'Para filmes de marca, campanhas de lançamento e sistemas visuais AI-native, escreva ao estúdio.',
  },
  'selected.pietra.tag': { en: 'EDITORIAL STUDY · SPECULATIVE LUXURY SYSTEM', pt: 'ESTUDO EDITORIAL · SISTEMA DE LUXO ESPECULATIVO' },
  'selected.pietra.title': { en: 'PIETRA', pt: 'PIETRA' },
  'selected.pietra.desc': {
    en: 'A 24-piece editorial fashion collection featuring Bottega Veneta pieces. Full character and costume consistency, cinematic video, original soundtrack, voice cloning.',
    pt: 'Uma coleção editorial de moda com 24 peças, apresentando peças Bottega Veneta. Consistência total de personagem e figurino, vídeo cinematográfico, trilha original e clonagem de voz.',
  },
  'selected.pietra.legal': {
    en: 'Designer references shown for creative demonstration purposes only. No brand affiliation or endorsement implied.',
    pt: 'Referências de designers apresentadas apenas para fins de demonstração criativa. Nenhuma afiliação ou endosso de marca implícito.',
  },

  // About
  'about.label': { en: 'ABOUT', pt: 'SOBRE' },
  'about.p1': {
    en: 'LolaLab is an AI-native editorial film studio founded by Gessika Olivieri in Lisbon.',
    pt: 'A LolaLab é um estúdio de cinema editorial AI-native fundado por Gessika Olivieri em Lisboa.',
  },
  'about.p2': {
    en: 'We work at the intersection of cinema, editorial photography, and applied AI. Our craft is direction — not tools.',
    pt: 'Trabalhamos na interseção entre cinema, fotografia editorial e IA aplicada. O nosso ofício é a direção — não as ferramentas.',
  },
  'about.p3': {
    en: 'Every project begins with a question, not a prompt. We build character bibles before shots. We design lighting before we render. We choose pipelines per shot, not per project.',
    pt: 'Cada projeto começa com uma pergunta, não com um prompt. Construímos bíblias de personagem antes dos planos. Desenhamos a luz antes de renderizar. Escolhemos pipelines por plano, não por projeto.',
  },
  'about.p4': {
    en: 'AI is infrastructure. Direction is craft. The bottleneck is no longer production — it is what deserves to exist.',
    pt: 'A IA é infraestrutura. A direção é ofício. O gargalo já não é a produção — é o que merece existir.',
  },

  // Contact
  'contact.headline': { en: 'Get in touch', pt: 'Entre em contacto' },
  'contact.subtitle': {
    en: 'For collaborations, commissions and thoughtful questions.',
    pt: 'Para colaborações, comissões e perguntas com intenção.',
  },
  'contact.cta': {
    en: 'Write to the studio',
    pt: 'Escreva ao estúdio',
  },

  // Footer
  'footer.rights': { en: '© 2026 LolaLab. All rights reserved.', pt: '© 2026 LolaLab. Todos os direitos reservados.' },
  'footer.credit': { en: 'Direction — Gessika Olivieri', pt: 'Direção — Gessika Olivieri' },
  'footer.line': { en: 'Lab guides. Library teaches. Studio makes.', pt: 'Lab guides. Library teaches. Studio makes.' },
  // Wave 1.2 · Fred v1 canon · Library page footer específico
  'footer.line.library': {
    en: 'Learn the method. Shape the idea. Build the work.',
    pt: 'Learn the method. Shape the idea. Build the work.',
  },

  // Wave 1 · Home Choose your path · canon Fred v1
  'home.choose.label': { en: 'CHOOSE YOUR PATH', pt: 'ESCOLHA O SEU CAMINHO' },
  'home.path.lab.name': { en: 'Lab', pt: 'Lab' },
  'home.path.lab.desc': {
    en: 'For shaping loose ideas into clear creative direction.',
    pt: 'Para dar forma a ideias soltas transformando-as em direção criativa clara.',
  },
  'home.path.lab.cta': { en: 'Enter the Lab', pt: 'Entrar no Lab' },
  'home.path.library.name': { en: 'Library', pt: 'Library' },
  'home.path.library.desc': {
    en: 'For learning the method behind the work.',
    pt: 'Para aprender o método por trás do trabalho.',
  },
  'home.path.library.cta': { en: 'Explore the Library', pt: 'Explorar a Library' },
  'home.path.studio.name': { en: 'Studio', pt: 'Studio' },
  'home.path.studio.desc': {
    en: 'For brands, films, campaigns and visual systems.',
    pt: 'Para marcas, filmes, campanhas e sistemas visuais.',
  },
  'home.path.studio.cta': { en: 'Work with the studio', pt: 'Trabalhar com o estúdio' },

  // Wave 1 · Home About preview · canon Fred v1
  'home.about.preview': {
    en: 'LolaLab is an AI-native creative direction studio translating human intention into visual systems, films and creative tools.',
    pt: 'A LolaLab é um estúdio de direção criativa AI-native que traduz intenção humana em sistemas visuais, filmes e ferramentas criativas.',
  },
  'home.about.cta': { en: 'Learn more', pt: 'Saiba mais' },

  // Wave 1 · Home Contact preview · canon Fred v1
  'home.contact.preview': {
    en: 'For collaborations, commissions and thoughtful questions.',
    pt: 'Para colaborações, comissões e perguntas com intenção.',
  },
  'home.contact.cta': { en: 'Write to the studio', pt: 'Escreva ao estúdio' },

  // Wave 1 · Library page skeleton · canon Fred v1
  'library.label': { en: 'LIBRARY', pt: 'LIBRARY' },
  'library.hero.headline': {
    en: 'Practical knowledge for creative minds.',
    pt: 'Conhecimento prático para mentes criativas.',
  },
  'library.hero.sub': {
    en: 'Guides, prompts and frameworks to help you think, create and lead with intention.',
    pt: 'Guias, prompts e frameworks para pensar, criar e liderar com intenção.',
  },
  'library.footer.line': {
    en: 'Learn the method. Shape the idea. Build the work.',
    pt: 'Learn the method. Shape the idea. Build the work.',
  },

  // Wave 1 · Studio page skeleton · canon Fred v1
  'studio.label': { en: 'STUDIO', pt: 'STUDIO' },
  'studio.hero.headline': {
    en: 'We make the work that moves culture.',
    pt: 'Fazemos o trabalho que move a cultura.',
  },
  'studio.hero.sub': {
    en: 'Strategic creative direction and AI-accelerated production for brands, launches and visual systems.',
    pt: 'Direção criativa estratégica e produção acelerada por IA para marcas, lançamentos e sistemas visuais.',
  },
  'studio.cta.inquiry': {
    en: 'Start a project inquiry',
    pt: 'Iniciar uma proposta de projeto',
  },

  // Wave 1 · About page skeleton · canon Fred v1
  'about.hero.headline': {
    en: 'LolaLab translates human intention into form.',
    pt: 'A LolaLab traduz intenção humana em forma.',
  },
  'about.hero.sub': {
    en: 'An AI-native creative direction studio founded by Gessika Olivieri.',
    pt: 'Um estúdio de direção criativa AI-native fundado por Gessika Olivieri.',
  },

  // Wave 1 · Contact page skeleton · canon Fred v1
  'contact.hero.headline': {
    en: 'Write to the studio.',
    pt: 'Escreva ao estúdio.',
  },
  'contact.hero.sub': {
    en: 'For collaborations, commissions and thoughtful questions.',
    pt: 'Para colaborações, comissões e perguntas com intenção.',
  },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}
