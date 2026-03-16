import { useEffect, useCallback, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

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
    if (open) {
      // Push history state for deep linking
      window.history.pushState({ skill: skillSlug }, '', `#skill/${skillSlug}`);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-background transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        style={{ padding: '3rem 2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-0 float-right z-10 text-foreground/60 hover:text-foreground transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>

        {children}

        <div className="clear-both" />
      </div>
    </div>
  );
};

export default SkillModal;
