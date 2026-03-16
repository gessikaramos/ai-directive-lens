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
      className={`fixed inset-0 z-50 bg-background overflow-y-auto transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ scrollBehavior: 'smooth' }}
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
