/**
 * Library Thank You · redirect de sucesso do Stripe Checkout. Não consulta
 * nada — a entrega real (link de acesso) chega por e-mail assim que o
 * webhook processar o pagamento, o que pode levar alguns segundos.
 */
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ink = 'hsl(30 14% 15%)';
const inkSoft = 'hsl(30 10% 38%)';
const bronzeLabel = {
  color: 'hsl(28 35% 45%)',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const LibraryThankYou = () => {
  useEffect(() => {
    document.title = 'Thank You · LolaLab';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen px-6 md:px-12 pt-40 pb-32 text-center"
        style={{ backgroundColor: 'hsl(var(--background))', color: ink }}
      >
        <span className="block mb-6" style={bronzeLabel}>
          THANK YOU
        </span>
        <p
          className="mb-6 max-w-[520px] mx-auto"
          style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '1.75rem', lineHeight: 1.35, color: ink }}
        >
          Your order is confirmed.
        </p>
        <p className="max-w-[440px] mx-auto" style={{ fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.7, color: inkSoft }}>
          A receipt with your personal access link is on its way to your inbox — it usually
          arrives within a minute.
        </p>
      </main>
      <Footer hideNewsletter />
    </>
  );
};

export default LibraryThankYou;
