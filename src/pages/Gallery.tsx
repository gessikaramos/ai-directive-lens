export default function Gallery() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-foreground mb-2">Gallery</h1>
      <p className="text-muted-foreground mb-10">Your generated creations.</p>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {Array.from({ length: 16 }).map((_, i) => {
          const heights = ['h-40', 'h-52', 'h-64', 'h-48', 'h-56'];
          const h = heights[i % heights.length];
          return (
            <div
              key={i}
              className={`${h} bg-surface border border-border rounded-xl flex items-center justify-center break-inside-avoid`}
            >
              <span className="text-xs text-muted-foreground">Generation #{i + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
