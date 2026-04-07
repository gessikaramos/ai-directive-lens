import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero: parallax content on scroll ──
      const heroContent = document.querySelector('[data-anim="hero-content"]');
      if (heroContent) {
        gsap.to(heroContent, {
          y: -80,
          opacity: 0,
          force3D: true,
          ease: 'none',
          scrollTrigger: {
            trigger: heroContent,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // ── Hero scroll indicator fade ──
      const scrollIndicator = document.querySelector('[data-anim="scroll-indicator"]');
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          y: 20,
          force3D: true,
          scrollTrigger: {
            trigger: scrollIndicator,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        });
      }

      // ── Statement: horizontal parallax ──
      const statementLine1 = document.querySelector('[data-anim="statement-line1"]');
      const statementLine2 = document.querySelector('[data-anim="statement-line2"]');
      const statementParent = statementLine1?.closest('section');

      if (statementLine1) {
        gsap.fromTo(statementLine1,
          { x: 0, opacity: 0 },
          {
            x: -300,
            opacity: 1,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: statementParent,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      if (statementLine2) {
        gsap.fromTo(statementLine2,
          { x: 0, opacity: 0 },
          {
            x: 300,
            opacity: 1,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: statementParent,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // ── Skills: stagger cards ──
      const skillCards = document.querySelectorAll('[data-anim="skill-card"]');
      if (skillCards.length) {
        gsap.from(skillCards, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          force3D: true,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: skillCards[0].parentElement,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }

      // ── Cases: reveal sections ──
      document.querySelectorAll('[data-anim="case-reveal"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          force3D: true,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Pietra hero parallax ──
      const pietraHero = document.querySelector('[data-anim="pietra-hero"]');
      if (pietraHero) {
        gsap.to(pietraHero.querySelector('div:last-child'), {
          y: -40,
          force3D: true,
          ease: 'none',
          scrollTrigger: {
            trigger: pietraHero,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // ── Image grids: fade in ──
      document.querySelectorAll('[data-anim="image-grid"]').forEach((el) => {
        const children = el.children;
        gsap.from(children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          force3D: true,
          stagger: 0.05,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── About section ──
      const aboutSection = document.querySelector('[data-anim="about"]');
      if (aboutSection) {
        gsap.from(aboutSection.children, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          force3D: true,
          stagger: 0.15,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }

      // ── Contact section ──
      const contactSection = document.querySelector('[data-anim="contact"]');
      if (contactSection) {
        gsap.from(contactSection.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          force3D: true,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }

      // ── Pipeline steps ──
      const pipelineSteps = document.querySelectorAll('[data-anim="pipeline-step"]');
      if (pipelineSteps.length) {
        gsap.from(pipelineSteps, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          force3D: true,
          stagger: 0.1,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: pipelineSteps[0],
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }

      // ── Fullscreen video cards ──
      document.querySelectorAll('[data-anim="video-card"]').forEach((el) => {
        gsap.from(el.querySelector('[data-anim="video-card-content"]'), {
          opacity: 0,
          y: 40,
          duration: 1,
          force3D: true,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Refresh after layout settles (needed for Lenis sync)
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
}
