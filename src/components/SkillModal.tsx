import { useEffect, useCallback, useState, useRef, ReactNode } from 'react';
import { X } from 'lucide-react';
import { getLenis } from '@/hooks/use-lenis';

interface SkillModalProps {
  open: boolean;
  skillSlug: string;
  onClose: () => void;
  children: ReactNode;
}

const SkillModal = ({ open, skillSlug, onClose, children }: SkillModalProps) => {
  const [visible, setVisible] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const lenis = getLenis();
    const html = document.documentElement;

    const stopScroll = () => {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      html.classList.remove('lenis');
      html.classList.remove('lenis-smooth');
    };

    const resumeScroll = () => {
      document.body.style.overflow = '';
      html.classList.add('lenis');
      html.classList.add('lenis-smooth');
      if (lenis) {
        lenis.start();
        requestAnimationFrame(() => {
          lenis.resize();
          window.dispatchEvent(new Event('resize'));
        });
      }
    };

    if (open) {
      window.history.pushState({ skill: skillSlug }, '', `#skill/${skillSlug}`);
      stopScroll();
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      resumeScroll();
    }

    // Always restore scroll if the component unmounts while open
    return () => {
      if (open) resumeScroll();
    };
  }, [open, skillSlug]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      const onPop = () => onClose();
      window.addEventListener('popstate', onPop);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('popstate', onPop);
      };
    }
  }, [open, handleKeyDown, onClose]);

  const modalRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top when modal opens
  useEffect(() => {
    if (open && visible && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [open, visible]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      data-lenis-prevent
      className={`fixed inset-0 z-50 bg-background overflow-y-auto transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ overscrollBehavior: 'contain' }}
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 text-foreground/60 hover:text-foreground transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {children}
      </div>
    </div>
  );
};

export default SkillModal;
