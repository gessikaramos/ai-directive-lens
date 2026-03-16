import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pipelineSteps = [
  { num: '01', title: 'Characterization', desc: 'Character bible, visual DNA, personality' },
  { num: '02', title: 'Keyframes', desc: 'Midjourney + Nano Banana refinement' },
  { num: '03', title: 'Direction', desc: 'Prompt engineering, styling, composition' },
  { num: '04', title: 'Video', desc: 'Higgsfield + Kling 3.0 animation' },
  { num: '05', title: 'Post-Production', desc: 'DaVinci Resolve, LUT, color grading' },
];

const CasesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const steps = sectionRef.current.querySelectorAll('.pipeline-step');
    const label = sectionRef.current.querySelector('.pipeline-label');

    // Animate label
    if (label) {
      gsap.fromTo(
        label,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Stagger-animate each step
    gsap.fromTo(
      steps,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section id="cases" className="section-spacing" ref={sectionRef}>
      {/* Creative Pipeline */}
      <div className="px-6 md:px-12 lg:px-20">
        <p className="pipeline-label label-style mb-8">CREATIVE PIPELINE</p>
        <div className="flex flex-col md:flex-row md:divide-x divide-border">
          {pipelineSteps.map((step) => (
            <div key={step.num} className="pipeline-step flex-1 py-6 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0">
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
