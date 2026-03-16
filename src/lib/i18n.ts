export type Lang = 'en' | 'pt';

export const translations: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.work': { en: 'WORK', pt: 'TRABALHOS' },
  'nav.selected': { en: 'SELECTED', pt: 'SELECIONADOS' },
  'nav.about': { en: 'ABOUT', pt: 'SOBRE' },
  'nav.contact': { en: 'CONTACT', pt: 'CONTATO' },

  // Hero
  'hero.headline': { en: 'Direction Makes It Matter.', pt: 'Direção Faz Importar.' },
  'hero.tagline': { en: 'AI is the medium. Direction is the craft.', pt: 'IA é o meio. Direção é o ofício.' },
  'hero.scroll': { en: 'SCROLL', pt: 'SCROLL' },

  // Statement
  'statement.line1': { en: 'Artificial intelligence expands possibility.', pt: 'Inteligência artificial expande possibilidades.' },
  'statement.line2': { en: 'Direction decides what deserves to exist.', pt: 'Direção decide o que merece existir.' },

  // About
  'about.label': { en: 'ABOUT', pt: 'SOBRE' },
  'about.name': { en: 'Gessika Olivieri', pt: 'Gessika Olivieri' },
  'about.bio1': {
    en: 'Creative director and founder of Lola Lab, working at the intersection of cinema, fashion, and artificial intelligence.',
    pt: 'Diretora criativa e fundadora do Lola Lab, atuando na interseção entre cinema, moda e inteligência artificial.',
  },
  'about.bio2': {
    en: 'She directs characters, campaigns, films, soundtracks, and digital products through a single cinematic pipeline — concept to final cut.',
    pt: 'Ela dirige personagens, campanhas, filmes, trilhas sonoras e produtos digitais através de um único pipeline cinematográfico — do conceito ao corte final.',
  },
  'about.statement': {
    en: 'AI is the medium. Direction is the craft.',
    pt: 'IA é o meio. Direção é o ofício.',
  },
  'about.capabilities': {
    en: 'AI creative direction • cinematic storytelling • fashion editorial • character design • video production • costume design • copywriting • voice design',
    pt: 'direção criativa com IA • narrativa cinematográfica • editorial de moda • design de personagens • produção de vídeo • figurino • copywriting • design de voz',
  },

  // Contact
  'contact.headline': { en: 'Start Something Worth Directing', pt: 'Comece Algo Que Valha a Pena Dirigir' },
  'contact.subtitle': {
    en: 'For campaigns, films, characters, and digital experiences shaped with intention.',
    pt: 'Para campanhas, filmes, personagens e experiências digitais moldadas com intenção.',
  },
  'contact.name': { en: 'Name', pt: 'Nome' },
  'contact.email': { en: 'Email', pt: 'Email' },
  'contact.message': { en: 'Tell me about your project', pt: 'Conte-me sobre seu projeto' },
  'contact.send': { en: 'Send Message', pt: 'Enviar Mensagem' },
  'contact.sent': { en: 'Message sent! I\'ll get back to you soon.', pt: 'Mensagem enviada! Retornarei em breve.' },

  // Cases
  'cases.label': { en: 'SELECTED WORK', pt: 'TRABALHOS SELECIONADOS' },
  'cases.pietra.label': { en: 'CASE STUDY', pt: 'ESTUDO DE CASO' },
  'cases.pietra.tagline': { en: 'AI-Directed Luxury Fashion Campaign', pt: 'Campanha de Moda de Luxo Dirigida por IA' },
  'cases.pietra.intro': {
    en: 'PIETRA is a luxury fashion campaign built entirely through AI creative direction — from character casting to final editorial. Two original AI models, Hollis and Kris, were designed with stable visual DNA and directed across 24 images, 2 videos, and 10 distinct looks.',
    pt: 'PIETRA é uma campanha de moda de luxo construída inteiramente através de direção criativa com IA — do casting de personagens ao editorial final. Duas modelos originais de IA, Hollis e Kris, foram desenhadas com DNA visual estável e dirigidas em 24 imagens, 2 vídeos e 10 looks distintos.',
  },
  'cases.pietra.casting': { en: 'AI MODEL CASTING', pt: 'CASTING DE MODELOS IA' },
  'cases.pietra.cta': { en: 'Discuss a Campaign', pt: 'Discutir uma Campanha' },

  // Footer
  'footer.rights': { en: '© 2026 Lola Lab. All rights reserved.', pt: '© 2026 Lola Lab. Todos os direitos reservados.' },
  'footer.credit': { en: 'Design & Direction — Gessika Olivieri', pt: 'Design & Direção — Gessika Olivieri' },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}
