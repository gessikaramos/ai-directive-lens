import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';

const LabEntry = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [value, setValue] = useState('');

  const submit = () => {
    const v = value.trim();
    if (!v) {
      navigate('/lab');
      return;
    }
    navigate(`/lab?intent=${encodeURIComponent(v)}`);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  return (
    <section
      id="lab-entry"
      className="px-6 md:px-12 py-24 md:py-32 bg-background"
    >
      <div className="max-w-[720px] mx-auto text-center">
        <span className="label-style block mb-8" style={{ color: 'hsl(var(--bronze))' }}>
          THE LAB
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder={
            lang === 'pt'
              ? 'Diga ao Lab o que está a tentar fazer.'
              : "Tell the Lab what you're trying to make."
          }
          aria-label="Lab entry"
          className="w-full bg-background text-ink placeholder:text-ink-soft/60 border-b border-ink-soft/40 focus:border-bronze focus:outline-none py-4 text-lg md:text-xl font-light text-center transition-colors"
          style={{ fontWeight: 300 }}
        />
        <p
          className="mt-6 text-sm text-ink-soft italic"
          style={{ fontWeight: 300 }}
        >
          {lang === 'pt'
            ? 'Beta aberta. Uma investigação sobre como humanos falam com IA.'
            : 'Open beta. An investigation into how humans talk to AI.'}
        </p>
      </div>
    </section>
  );
};

export default LabEntry;
