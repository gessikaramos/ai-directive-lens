const pipelineSteps = [
  { num: '01', title: 'Characterization', desc: 'Character bible, visual DNA, personality' },
  { num: '02', title: 'Keyframes', desc: 'Midjourney + Nano Banana refinement' },
  { num: '03', title: 'Direction', desc: 'Prompt engineering, styling, composition' },
  { num: '04', title: 'Video', desc: 'Higgsfield + Kling 3.0 animation' },
  { num: '05', title: 'Post-Production', desc: 'DaVinci Resolve, LUT, color grading' },
];

const CasesSection = () => {
  return (
    <section id="cases" className="section-spacing">
      {/* Creative Pipeline */}
      <div className="px-6 md:px-12 lg:px-20">
        <p className="label-style mb-8">CREATIVE PIPELINE</p>
        <div className="flex flex-col md:flex-row md:divide-x divide-border">
          {pipelineSteps.map((step) => (
            <div key={step.num} className="flex-1 py-6 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0">
              <p className="label-style text-dim mb-2">{step.num}</p>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-1">
                {step.title}
              </h4>
              <p className="text-soft text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
