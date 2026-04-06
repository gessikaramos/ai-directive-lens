import { Film, LayoutTemplate, Palette, Music } from 'lucide-react';

const categories = [
  { label: 'Footage', icon: Film, count: 'Coming soon' },
  { label: 'Templates', icon: LayoutTemplate, count: 'Coming soon' },
  { label: 'LUTs', icon: Palette, count: 'Coming soon' },
  { label: 'Music', icon: Music, count: 'Coming soon' },
];

export default function StockCatalog() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-foreground mb-2">Stock Catalog</h1>
      <p className="text-muted-foreground mb-10">Professional assets for your creative projects.</p>

      {/* Category tabs */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.label}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-all"
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Placeholder grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-video bg-surface border border-border rounded-xl flex items-center justify-center"
          >
            <span className="text-xs text-muted-foreground">Coming Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
}
