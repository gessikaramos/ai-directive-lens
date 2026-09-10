/**
 * Gallery image manifest (10/set) — src + WebP sibling + intrinsic dimensions,
 * generated from the source JPGs via cwebp/Pillow. Feeds ModalGallery (perf fix:
 * width/height for CLS, webp for smaller payload) and the homepage Selected Work
 * blocks (same character/costume stills, reused rather than duplicated).
 */
export interface GalleryImage {
  src: string;
  webp: string;
  width: number;
  height: number;
}

export const CHARACTER_GALLERY: GalleryImage[] = [
  { src: "/images/kris/casting/kris-closeup.jpg", webp: "/images/kris/casting/kris-closeup.webp", width: 4000, height: 2233 },
  { src: "/images/kris/casting/kris-frente.jpg", webp: "/images/kris/casting/kris-frente.webp", width: 4000, height: 2233 },
  { src: "/images/kris/casting/kris-costas.jpg", webp: "/images/kris/casting/kris-costas.webp", width: 4000, height: 2233 },
  { src: "/images/kris/casting/kris-perfil.jpg", webp: "/images/kris/casting/kris-perfil.webp", width: 4000, height: 2233 },
  { src: "/images/kris/casting/kris-34.jpg", webp: "/images/kris/casting/kris-34.webp", width: 4000, height: 2233 },
];

// 10/set: variante pra o grid full-width da home (Selected Work · Consistency).
// object-fit:cover num box retrato (3:4) contra uma foto landscape (16:9ish)
// sempre preserva a ALTURA cheia (é a dimensão que "cobre" primeiro) — pra
// closeup.jpg tudo bem, mas frente/costas/perfil/34 são still de corpo
// inteiro com a cabeça ocupando só ~15% do quadro; no grid grande isso virava
// uma pessoa minúscula boiando no topo de um retrato vazio. Essas 4 vieram
// pré-recortadas (Pillow, ~44% superior, 3:4) num busto consistente — closeup
// já era um busto no original, não precisou de recorte novo.
export const CHARACTER_GALLERY_BUST: GalleryImage[] = [
  { src: "/images/kris/casting/kris-closeup.jpg", webp: "/images/kris/casting/kris-closeup.webp", width: 4000, height: 2233 },
  { src: "/images/kris/casting/kris-frente-bust.jpg", webp: "/images/kris/casting/kris-frente-bust.webp", width: 736, height: 982 },
  { src: "/images/kris/casting/kris-costas-bust.jpg", webp: "/images/kris/casting/kris-costas-bust.webp", width: 736, height: 982 },
  { src: "/images/kris/casting/kris-perfil-bust.jpg", webp: "/images/kris/casting/kris-perfil-bust.webp", width: 736, height: 982 },
  { src: "/images/kris/casting/kris-34-bust.jpg", webp: "/images/kris/casting/kris-34-bust.webp", width: 736, height: 982 },
];

export const COSTUME_STYLING_GALLERY: GalleryImage[] = [
  { src: "/images/kris/still/kris-still-04.jpg", webp: "/images/kris/still/kris-still-04.webp", width: 2500, height: 1396 },
  { src: "/images/kris/still/kris-still-01.jpg", webp: "/images/kris/still/kris-still-01.webp", width: 2500, height: 1396 },
  { src: "/images/kris/still/kris-still-02.jpg", webp: "/images/kris/still/kris-still-02.webp", width: 2500, height: 1395 },
  { src: "/images/kris/still/kris-still-03.jpg", webp: "/images/kris/still/kris-still-03.webp", width: 2500, height: 1395 },
];

export const COSTUME_ECOMMERCE_GALLERY: GalleryImage[] = [
  { src: "/images/hollis/look1/look1-01.jpg", webp: "/images/hollis/look1/look1-01.webp", width: 2752, height: 1536 },
  { src: "/images/hollis/look1/look1-02.jpg", webp: "/images/hollis/look1/look1-02.webp", width: 2752, height: 1536 },
  { src: "/images/hollis/look1/look1-03.jpg", webp: "/images/hollis/look1/look1-03.webp", width: 2500, height: 1396 },
  { src: "/images/hollis/look1/look1-04.jpg", webp: "/images/hollis/look1/look1-04.webp", width: 4000, height: 2233 },
  { src: "/images/hollis/look1/look1-05.jpg", webp: "/images/hollis/look1/look1-05.webp", width: 4000, height: 2233 },
  { src: "/images/hollis/look1/look1-06.jpg", webp: "/images/hollis/look1/look1-06.webp", width: 4000, height: 2233 },
  { src: "/images/hollis/look1/look1-07.jpg", webp: "/images/hollis/look1/look1-07.webp", width: 4000, height: 2233 },
];

export const FASHION_GALLERY: GalleryImage[] = [
  { src: "/images/hollis/campaign/campaign-06.jpg", webp: "/images/hollis/campaign/campaign-06.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-01.jpg", webp: "/images/hollis/campaign/campaign-01.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-02.jpg", webp: "/images/hollis/campaign/campaign-02.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-03.jpg", webp: "/images/hollis/campaign/campaign-03.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-04.jpg", webp: "/images/hollis/campaign/campaign-04.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-05.jpg", webp: "/images/hollis/campaign/campaign-05.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-07.jpg", webp: "/images/hollis/campaign/campaign-07.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-08.jpg", webp: "/images/hollis/campaign/campaign-08.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-09.jpg", webp: "/images/hollis/campaign/campaign-09.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-10.jpg", webp: "/images/hollis/campaign/campaign-10.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-11.jpg", webp: "/images/hollis/campaign/campaign-11.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-12.jpg", webp: "/images/hollis/campaign/campaign-12.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-13.jpg", webp: "/images/hollis/campaign/campaign-13.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/campaign/campaign-bottega.jpg", webp: "/images/hollis/campaign/campaign-bottega.webp", width: 4000, height: 2233 },
];

export const UGC_GALLERY: GalleryImage[] = [
  { src: "/images/hollis/outras/hollis-outras-08.jpg", webp: "/images/hollis/outras/hollis-outras-08.webp", width: 2048, height: 1152 },
  { src: "/images/hollis/outras/hollis-outras-09.jpg", webp: "/images/hollis/outras/hollis-outras-09.webp", width: 2048, height: 1152 },
];

