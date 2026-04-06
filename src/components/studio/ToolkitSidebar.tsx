import { getModelsByCategory, type ModelCategory } from '@/lib/models';
import { Image, Video, Music, Pencil, Users, Sparkles, Wand2, Clapperboard, LayoutGrid } from 'lucide-react';

const featureItems = [
  { key: 'image' as const, label: 'Image Gen', icon: Image },
  { key: 'video' as const, label: 'Video Gen', icon: Video },
  { key: 'audio' as const, label: 'Audio Gen', icon: Music },
  { key: 'edit' as const, label: 'Edit & Enhance', icon: Pencil },
  { key: 'character' as const, label: 'Characters', icon: Users },
];

interface ToolkitSidebarProps {
  activeCategory: ModelCategory;
  setActiveCategory: (cat: ModelCategory) => void;
  activeModel: string | null;
  setActiveModel: (name: string) => void;
}

export default function ToolkitSidebar({ activeCategory, setActiveCategory, activeModel, setActiveModel }: ToolkitSidebarProps) {
  const categoryModels = getModelsByCategory(activeCategory);

  return (
    <aside className="w-[270px] border-r border-border bg-background h-[calc(100vh-64px)] overflow-y-auto flex-shrink-0 hidden lg:block">
      {/* Features section */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">Features</p>
        <div className="space-y-0.5">
          {featureItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveCategory(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeCategory === item.key
                  ? 'text-foreground bg-secondary border-l-2 border-lime'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              <span className="ml-auto text-[10px] text-muted-foreground">
                {getModelsByCategory(item.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Models section */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">Models</p>
        <div className="space-y-0.5">
          {categoryModels.map((model, i) => (
            <button
              key={`${model.name}-${i}`}
              onClick={() => setActiveModel(model.name)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                activeModel === model.name
                  ? 'text-foreground bg-secondary border-l-2 border-destructive'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {model.isApi && (
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${model.restricted ? 'bg-api-orange' : 'bg-api-yellow'}`} />
              )}
              {!model.isApi && <span className="w-2 h-2 flex-shrink-0" />}
              <span className="truncate">{model.name}</span>
              {model.badge && (
                <span className={`ml-auto text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded flex-shrink-0 ${
                  model.badge === 'NEW' ? 'bg-lime/15 text-lime' :
                  model.badge === 'TOP' ? 'bg-purple/15 text-purple' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {model.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
