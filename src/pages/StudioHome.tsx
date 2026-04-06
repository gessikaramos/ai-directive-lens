import { Link } from 'react-router-dom';
import { Image, Video, Music, Mic, ArrowRight } from 'lucide-react';
import { models } from '@/lib/models';

const categories = [
  { label: 'AI Image', icon: Image, count: 22, color: 'text-lime' },
  { label: 'AI Video', icon: Video, count: 18, color: 'text-purple' },
  { label: 'AI Music', icon: Music, count: 4, color: 'text-api-yellow' },
  { label: 'AI Voiceover', icon: Mic, count: 4, color: 'text-api-orange' },
];

const featuredModels = models.filter(m => m.badge === 'NEW' || m.badge === 'TOP').slice(0, 6);

export default function StudioHome() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="px-6 py-20 md:py-32 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Start creating with the{' '}
          <span className="text-lime">AI Toolkit</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Access 56+ AI models for image, video, audio and character generation. Professional creative direction tools in one platform.
        </p>

        {/* Category cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {categories.map(cat => (
            <Link
              key={cat.label}
              to="/toolkit"
              className="bg-surface border border-border rounded-xl p-6 hover:border-muted-foreground/30 transition-all group"
            >
              <cat.icon className={`w-8 h-8 ${cat.color} mb-3 mx-auto`} />
              <p className="text-sm font-medium text-foreground">{cat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{cat.count} models</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Models */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Featured AI Models</h2>
          <Link to="/toolkit" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {featuredModels.map((model, i) => (
            <div
              key={`${model.name}-${i}`}
              className="min-w-[200px] bg-surface border border-border rounded-xl p-5 flex-shrink-0"
            >
              <div className="flex items-center gap-2 mb-3">
                {model.isApi && (
                  <span className="w-2 h-2 rounded-full bg-api-yellow" />
                )}
                {model.badge && (
                  <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                    model.badge === 'NEW' ? 'bg-lime/15 text-lime' :
                    model.badge === 'TOP' ? 'bg-purple/15 text-purple' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {model.badge}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-foreground">{model.name}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{model.category}</p>
              {model.price && (
                <p className="text-xs text-api-yellow mt-1">{model.price}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom banner */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-surface border border-border rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            LolaLab Studio
          </h2>
          <p className="text-muted-foreground mb-8">Direct your vision</p>
          <Link
            to="/toolkit"
            className="inline-flex items-center gap-2 bg-lime text-black font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition-all"
          >
            Enter <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
