import { useState } from 'react';
import { type ModelCategory } from '@/lib/models';
import ToolkitSidebar from '@/components/studio/ToolkitSidebar';
import PromptForm from '@/components/studio/PromptForm';
import OutputPanel from '@/components/studio/OutputPanel';

const tabs = [
  { key: 'image', label: 'Image' },
  { key: 'video', label: 'Video' },
  { key: 'audio', label: 'Audio' },
  { key: 'edit', label: 'Edit' },
  { key: 'character', label: 'Character' },
  { key: 'video_agent', label: 'Video Agent' },
  { key: 'moodboard', label: 'Moodboard' },
  { key: 'cinema', label: 'Cinema Studio' },
  { key: 'gallery', label: 'Gallery' },
];

const tabToCategory: Record<string, ModelCategory> = {
  image: 'image',
  video: 'video',
  audio: 'audio',
  edit: 'edit',
  character: 'character',
  video_agent: 'video',
  moodboard: 'image',
  cinema: 'video',
  gallery: 'image',
};

export default function AIToolkit() {
  const [activeTab, setActiveTab] = useState('image');
  const [activeCategory, setActiveCategory] = useState<ModelCategory>('image');
  const [activeModel, setActiveModel] = useState<string | null>('Nano Banana Pro');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveCategory(tabToCategory[key] || 'image');
  };

  const handleCategoryChange = (cat: ModelCategory) => {
    setActiveCategory(cat);
    setActiveTab(cat);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ToolkitSidebar
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        activeModel={activeModel}
        setActiveModel={setActiveModel}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tab header */}
        <div className="border-b border-border px-4 flex items-center gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-3 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.key
                  ? 'text-foreground border-lime'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <PromptForm
          category={activeCategory}
          activeModel={activeModel}
          onGenerate={(data) => console.log('Generate:', data)}
        />
      </div>

      <OutputPanel activeModel={activeModel} />
    </div>
  );
}
