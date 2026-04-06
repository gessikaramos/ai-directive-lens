export type ModelCategory = 'image' | 'video' | 'audio' | 'edit' | 'character';

export interface Model {
  name: string;
  category: ModelCategory;
  badge?: string; // NEW, TOP, UNLIMITED
  isApi?: boolean;
  price?: string;
  restricted?: boolean;
}

export const models: Model[] = [
  // IMAGE (22)
  { name: 'Higgsfield Soul 2.0', category: 'image', badge: 'NEW' },
  { name: 'Soul Cinema', category: 'image', badge: 'NEW' },
  { name: 'Popcorn', category: 'image' },
  { name: 'Nano Banana 2', category: 'image', isApi: true, price: '$0.045' },
  { name: 'Nano Banana Pro', category: 'image', badge: 'TOP', isApi: true, price: '$0.15' },
  { name: 'Seedream 5.0', category: 'image', isApi: true },
  { name: 'GPT Image 1.5', category: 'image', isApi: true },
  { name: 'GPT Image', category: 'image', isApi: true, badge: 'UNLIMITED' },
  { name: 'FLUX.2', category: 'image', isApi: true },
  { name: 'FLUX.2 Pro', category: 'image', isApi: true, badge: 'UNLIMITED' },
  { name: 'FLUX.2 Max', category: 'image', isApi: true },
  { name: 'Flux Kontext Max', category: 'image', isApi: true },
  { name: 'Reve', category: 'image', badge: 'UNLIMITED' },
  { name: 'Z-Image', category: 'image', badge: 'UNLIMITED' },
  { name: 'Topaz', category: 'image' },
  { name: 'Kling O1', category: 'image', badge: 'UNLIMITED' },
  { name: 'WAN 2.2', category: 'image', isApi: true },
  { name: 'Imagen 4', category: 'image', isApi: true },
  { name: 'DALL-E 3', category: 'image', isApi: true },
  { name: 'Stable Diffusion', category: 'image', isApi: true },
  { name: 'Midjourney', category: 'image' },
  { name: 'Multi Reference', category: 'image', badge: 'UNLIMITED' },

  // VIDEO (18)
  { name: 'Seedance 2.0', category: 'video', badge: 'TOP', isApi: true },
  { name: 'Kling 3.0', category: 'video' },
  { name: 'Kling 2.6', category: 'video' },
  { name: 'Kling 3.0 Motion', category: 'video', badge: 'NEW' },
  { name: 'Kling O1 Edit', category: 'video' },
  { name: 'Grok Imagine', category: 'video', isApi: true },
  { name: 'Higgsfield DOP', category: 'video', isApi: true },
  { name: 'Sora 2', category: 'video' },
  { name: 'Veo 3.1', category: 'video', isApi: true },
  { name: 'Seedance 1.5 Pro', category: 'video', isApi: true },
  { name: 'Wan 2.6', category: 'video', isApi: true },
  { name: 'Runway Gen-4', category: 'video', isApi: true },
  { name: 'Minimax Hailuo', category: 'video', isApi: true },
  { name: 'HeyGen Video Agent', category: 'video', badge: 'NEW', isApi: true },
  { name: 'HeyGen Avatar IV', category: 'video', badge: 'NEW', isApi: true },
  { name: 'HeyGen Translate', category: 'video', isApi: true },
  { name: 'Arcads UGC', category: 'video', badge: 'NEW', isApi: true },
  { name: 'Arcads Lip Sync', category: 'video', isApi: true },

  // AUDIO (4)
  { name: 'Eleven v3', category: 'audio', badge: 'NEW', isApi: true },
  { name: 'MiniMax Speech', category: 'audio', badge: 'NEW', isApi: true },
  { name: 'VibeVoice', category: 'audio', badge: 'NEW' },
  { name: 'HeyGen TTS', category: 'audio', isApi: true },

  // EDIT (8)
  { name: 'NB Pro Inpaint', category: 'edit', isApi: true },
  { name: 'NB Inpaint', category: 'edit', isApi: true },
  { name: 'Product Placement', category: 'edit' },
  { name: 'Topaz', category: 'edit' },
  { name: 'Grok Edit', category: 'edit', isApi: true },
  { name: 'Kling Motion Control', category: 'edit' },
  { name: 'Kling Omni', category: 'edit', badge: 'NEW' },
  { name: 'Kling O1 Edit', category: 'edit', badge: 'TOP' },

  // CHARACTER (4)
  { name: 'Soul ID Character', category: 'character' },
  { name: 'HeyGen Photo Avatar', category: 'character', badge: 'NEW', isApi: true },
  { name: 'HeyGen Digital Twin', category: 'character', isApi: true },
  { name: 'Arcads AI Actors', category: 'character', badge: 'NEW', isApi: true },
];

export const presets = {
  image: [
    { name: 'Editorial Fashion', description: 'High-end editorial photography style' },
    { name: 'Produto Luxo', description: 'Luxury product photography' },
    { name: 'Noir Urbano', description: 'Dark urban noir aesthetic' },
  ],
  video: [
    { name: 'Fashion Film', description: 'Cinematic fashion film style' },
    { name: 'Unboxing Premium', description: 'Premium unboxing experience' },
    { name: 'Sensorial', description: 'Sensory-driven visual storytelling' },
  ],
};

export function getModelsByCategory(category: ModelCategory): Model[] {
  return models.filter(m => m.category === category);
}

export function getModelCounts() {
  const imageCount = models.filter(m => m.category === 'image').length;
  const videoCount = models.filter(m => m.category === 'video').length;
  const audioCount = models.filter(m => m.category === 'audio').length;
  const editCount = models.filter(m => m.category === 'edit').length;
  const charCount = models.filter(m => m.category === 'character').length;
  const apiCount = models.filter(m => m.isApi).length;
  return { imageCount, videoCount, audioCount, editCount, charCount, apiCount, total: models.length };
}
