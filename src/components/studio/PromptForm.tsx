import { useState } from 'react';
import { presets, type ModelCategory } from '@/lib/models';

const fieldsByCategory: Record<string, { key: string; label: string; required?: boolean; placeholder: string }[]> = {
  image: [
    { key: 'subject', label: 'Subject', required: true, placeholder: 'Main subject of the image...' },
    { key: 'details', label: 'Details', placeholder: 'Additional details and descriptors...' },
    { key: 'action', label: 'Action / Pose', placeholder: 'What is the subject doing...' },
    { key: 'scene', label: 'Scene', placeholder: 'Environment and background...' },
    { key: 'style', label: 'Style', placeholder: 'Art style, photography type...' },
    { key: 'lighting', label: 'Lighting', placeholder: 'Natural, studio, dramatic...' },
    { key: 'camera', label: 'Camera', placeholder: 'Angle, lens, depth of field...' },
    { key: 'palette', label: 'Palette', placeholder: 'Color palette and tones...' },
    { key: 'negative', label: 'Negative', placeholder: 'What to avoid...' },
  ],
  video: [
    { key: 'subject', label: 'Subject', required: true, placeholder: 'Main subject of the video...' },
    { key: 'action', label: 'Action', placeholder: 'Movement and action...' },
    { key: 'scene', label: 'Scene', placeholder: 'Setting and environment...' },
    { key: 'camera_movement', label: 'Camera Movement', placeholder: 'Pan, dolly, orbit...' },
    { key: 'style', label: 'Style', placeholder: 'Cinematic, documentary...' },
    { key: 'lighting', label: 'Lighting', placeholder: 'Lighting setup...' },
    { key: 'atmosphere', label: 'Atmosphere', placeholder: 'Mood and atmosphere...' },
    { key: 'audio', label: 'Audio', placeholder: 'Sound design notes...' },
    { key: 'temporal', label: 'Temporal', placeholder: 'Speed, time of day...' },
    { key: 'duration', label: 'Duration', placeholder: '5s, 10s, 15s...' },
    { key: 'negative', label: 'Negative', placeholder: 'What to avoid...' },
  ],
  audio: [
    { key: 'text', label: 'Text / Script', required: true, placeholder: 'Text to speak or sing...' },
    { key: 'voice', label: 'Voice', placeholder: 'Voice characteristics...' },
    { key: 'style', label: 'Style', placeholder: 'Tone, emotion, pace...' },
    { key: 'language', label: 'Language', placeholder: 'EN, PT, ES...' },
  ],
  edit: [
    { key: 'source', label: 'Source', required: true, placeholder: 'Describe the source image...' },
    { key: 'edit_instruction', label: 'Edit Instruction', placeholder: 'What to change...' },
    { key: 'mask_area', label: 'Mask Area', placeholder: 'Area to edit...' },
    { key: 'style', label: 'Style', placeholder: 'Output style...' },
  ],
  character: [
    { key: 'name', label: 'Character Name', required: true, placeholder: 'Character name...' },
    { key: 'appearance', label: 'Appearance', placeholder: 'Physical description...' },
    { key: 'style', label: 'Style', placeholder: 'Fashion and aesthetic...' },
    { key: 'personality', label: 'Personality', placeholder: 'Traits and behavior...' },
  ],
};

interface PromptFormProps {
  category: ModelCategory;
  activeModel: string | null;
  onGenerate: (data: Record<string, string>) => void;
}

export default function PromptForm({ category, activeModel, onGenerate }: PromptFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const fields = fieldsByCategory[category] || fieldsByCategory.image;
  const categoryPresets = (presets as any)[category] || [];

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    onGenerate(formData);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Presets */}
      {categoryPresets.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">Presets</p>
          <div className="flex gap-2 flex-wrap">
            {categoryPresets.map((preset: any) => (
              <button
                key={preset.name}
                onClick={() => setActivePreset(preset.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activePreset === preset.name
                    ? 'bg-lime text-black'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active model indicator */}
      {activeModel && (
        <div className="mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-api-yellow" />
          <span className="text-xs text-muted-foreground">Using: <span className="text-foreground font-medium">{activeModel}</span></span>
        </div>
      )}

      {/* Form fields */}
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.key}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {field.label}
              {field.required && <span className="text-destructive ml-0.5">*</span>}
            </label>
            {field.key === 'negative' || field.key === 'text' || field.key === 'edit_instruction' ? (
              <textarea
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-lime resize-none h-20"
                placeholder={field.placeholder}
                value={formData[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-lime"
                placeholder={field.placeholder}
                value={formData[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        className="mt-6 w-full bg-lime text-black font-semibold py-3 rounded-lg hover:brightness-110 transition-all text-sm"
      >
        Generate
      </button>
    </div>
  );
}
