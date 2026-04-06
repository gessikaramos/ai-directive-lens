import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface OutputPanelProps {
  activeModel: string | null;
}

export default function OutputPanel({ activeModel }: OutputPanelProps) {
  const [tab, setTab] = useState<'json' | 'text'>('json');
  const [copied, setCopied] = useState(false);

  const sampleOutput = tab === 'json'
    ? JSON.stringify({
        prompt: "Your generated prompt will appear here...",
        model: activeModel || "Select a model",
        parameters: {},
      }, null, 2)
    : "Your generated prompt will appear here...\n\nSelect a model and fill in the fields to generate.";

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-[380px] border-l border-border bg-background h-[calc(100vh-64px)] overflow-y-auto flex-shrink-0 hidden xl:flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('json')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              tab === 'json' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => setTab('text')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              tab === 'text' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
            }`}
          >
            Text
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-lime" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Model badge */}
      {activeModel && (
        <div className="px-4 pt-3">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-api-yellow" />
            <span className="text-xs font-medium text-foreground">{activeModel}</span>
          </div>
        </div>
      )}

      {/* Output */}
      <div className="flex-1 p-4">
        <pre className="text-xs text-muted-foreground font-mono bg-surface rounded-lg p-4 overflow-auto whitespace-pre-wrap h-full min-h-[300px]">
          {sampleOutput}
        </pre>
      </div>

      {/* Tips */}
      <div className="p-4 border-t border-border">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">Usage Tips</p>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li>• Fill required fields marked with *</li>
          <li>• Use presets for quick starting points</li>
          <li>• Combine style + lighting for best results</li>
        </ul>
      </div>
    </aside>
  );
}
