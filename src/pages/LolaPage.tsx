import { useState } from 'react';
import { Send, Sparkles, Plus } from 'lucide-react';

const aiEngines = ['Claude Opus', 'GPT-4.1', 'Gemini 2.5 Pro'];

const briefingFields = [
  { key: 'titulo', label: 'Título' },
  { key: 'conceito', label: 'Conceito' },
  { key: 'estilo', label: 'Estilo' },
  { key: 'produto', label: 'Produto' },
  { key: 'avatar', label: 'Avatar Type' },
  { key: 'voz', label: 'Voz' },
  { key: 'idioma', label: 'Idioma' },
  { key: 'duracao', label: 'Duração' },
];

export default function LolaPage() {
  const [engine, setEngine] = useState(aiEngines[0]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Olá! Sou a Lola, sua diretora criativa IA. Como posso ajudar com seu projeto hoje?' },
  ]);
  const [input, setInput] = useState('');
  const [briefing, setBriefing] = useState<Record<string, string>>({});

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Entendi! Vou preparar uma direção criativa para isso. Posso sugerir um approach editorial com estilo sensorial?' }]);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left - Chat */}
      <div className="w-[360px] border-r border-border flex flex-col bg-background hidden md:flex">
        {/* Engine selector */}
        <div className="p-4 border-b border-border">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">AI Engine</p>
          <div className="flex gap-1.5 flex-wrap">
            {aiEngines.map(e => (
              <button
                key={e}
                onClick={() => setEngine(e)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  engine === e ? 'bg-purple text-black' : 'bg-secondary text-muted-foreground'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm p-3 rounded-xl max-w-[90%] ${
                msg.role === 'user'
                  ? 'bg-secondary text-foreground ml-auto'
                  : 'bg-surface text-foreground border border-border'
              }`}
            >
              {msg.role === 'assistant' && (
                <Sparkles className="w-3 h-3 text-purple inline mr-1.5 mb-0.5" />
              )}
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-purple"
              placeholder="Descreva seu projeto..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-purple text-black p-2 rounded-lg hover:brightness-110 transition-all">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Briefing fields */}
        <div className="p-4 border-t border-border max-h-[300px] overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">Briefing</p>
          <div className="space-y-2">
            {briefingFields.map(field => (
              <div key={field.key}>
                <label className="text-[10px] text-muted-foreground mb-0.5 block">{field.label}</label>
                <input
                  type="text"
                  className="w-full bg-surface border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-purple"
                  value={briefing[field.key] || ''}
                  onChange={e => setBriefing(prev => ({ ...prev, [field.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center - Scene Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Scene Editor</h2>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary px-3 py-1.5 rounded-lg transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Scene
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 px-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium w-10">#</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Cena</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Script</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Visual Direction</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium w-20">Duração</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(n => (
                <tr key={n} className="border-b border-border/50 hover:bg-surface/50 transition-all">
                  <td className="py-3 px-3 text-muted-foreground">{n}</td>
                  <td className="py-3 px-3">
                    <input className="bg-transparent text-foreground text-sm w-full focus:outline-none" placeholder="Scene name..." />
                  </td>
                  <td className="py-3 px-3">
                    <input className="bg-transparent text-foreground text-sm w-full focus:outline-none" placeholder="Script / dialogue..." />
                  </td>
                  <td className="py-3 px-3">
                    <input className="bg-transparent text-foreground text-sm w-full focus:outline-none" placeholder="Visual direction..." />
                  </td>
                  <td className="py-3 px-3">
                    <input className="bg-transparent text-muted-foreground text-sm w-full focus:outline-none" placeholder="5s" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right - Output */}
      <div className="w-[320px] border-l border-border bg-background hidden xl:flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded text-xs font-medium bg-secondary text-foreground">JSON</button>
            <button className="px-3 py-1 rounded text-xs font-medium text-muted-foreground">Text</button>
          </div>
        </div>
        <div className="flex-1 p-4">
          <pre className="text-xs text-muted-foreground font-mono bg-surface rounded-lg p-4 overflow-auto whitespace-pre-wrap min-h-[200px]">
{`{
  "scenes": [],
  "briefing": {},
  "engine": "${engine}"
}`}
          </pre>
        </div>
        <div className="p-4 border-t border-border">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">Assets</p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-surface border border-border rounded-lg flex items-center justify-center">
                <span className="text-[9px] text-muted-foreground">—</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
