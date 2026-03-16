import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  src: string;
  type?: 'image' | 'video';
  alt?: string;
  onClose: () => void;
}

const Lightbox = ({ src, type = 'image', alt = '', onClose }: LightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.96)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-foreground/70 hover:text-foreground transition-opacity z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="max-w-[94vw] max-h-[92vh]">
        {type === 'image' ? (
          <img
            src={src}
            alt={alt}
            className="max-w-[94vw] max-h-[92vh] object-contain"
          />
        ) : (
          <video
            src={src}
            controls
            autoPlay
            className="max-w-[94vw] max-h-[92vh] object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default Lightbox;
