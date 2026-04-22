const pipelineCards = Array.from({ length: 6 }, (_, index) => index + 1);

const CreativePipelineSection = () => {
  return (
    <section className="section-spacing">
      <div className="px-6 md:px-12 lg:px-20">
        <h2 className="mb-4 font-serif text-4xl italic tracking-wide text-foreground md:text-6xl">
          Creative <span className="text-champagne">Pipeline</span>
        </h2>
        <p className="text-soft text-lg md:text-xl mb-10">
          From concept to screen — what's moving through the studio right now.
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth px-6 md:px-12 lg:px-20">
        <div className="flex gap-5">
          {pipelineCards.map((card) => (
            <article
              key={card}
              className="pipeline-card-surface relative aspect-[4/5] w-[280px] shrink-0 snap-start overflow-hidden rounded border border-[hsl(var(--champagne)/0.15)] transition duration-300 hover:scale-[1.02] hover:border-[hsl(var(--champagne)/0.45)] hover:shadow-[0_0_24px_hsl(var(--champagne)/0.12)]"
            >
              <div className="absolute inset-x-0 bottom-0 border-t border-[hsl(var(--champagne)/0.12)] bg-background/70 px-4 py-3">
                <p className="text-sm text-foreground/80">Coming soon</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 mt-8">
        <a
          href="https://www.instagram.com/lolalabstudio/"
          target="_blank"
          rel="noopener noreferrer"
          className="label-style text-champagne transition-opacity hover:opacity-80"
        >
          Follow @lolalabstudio
        </a>
      </div>
    </section>
  );
};

export default CreativePipelineSection;