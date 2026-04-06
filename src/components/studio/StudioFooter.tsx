import { getModelCounts } from '@/lib/models';

export default function StudioFooter() {
  const counts = getModelCounts();

  return (
    <footer className="border-t border-border bg-background px-6 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
          LolaLab Studio — Storytelling Sensorial & IA Aplicada
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>{counts.total} Models</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{counts.apiCount} APIs</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{counts.imageCount} Image</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{counts.videoCount} Video</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{counts.audioCount} Audio</span>
        </div>
      </div>
    </footer>
  );
}
