/**
 * Legal · Terms of Sale, Refund & Delivery, Privacy Note — digital books
 * (LolaLab Library). Fonte: LOLALAB_LEGAL_MINIMUM_PACK_LIBRARY_v1_GUMROAD.md
 * (22/jul/2026). Rascunho — pendente revisão jurídica formal.
 */
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { useSeo } from '@/hooks/use-seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';

const labelStyle: React.CSSProperties = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
};

const h2Style: React.CSSProperties = {
  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
  fontWeight: 400,
  letterSpacing: '-0.01em',
  color: 'hsl(var(--cool-gray-primary, 0 0% 95%))',
  marginTop: '2.5rem',
  marginBottom: '0.75rem',
};

const pStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 300,
  lineHeight: 1.7,
  color: 'hsl(var(--cool-gray-tertiary))',
  marginBottom: '1rem',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <>
    <h2 style={h2Style}>{title}</h2>
    {children}
  </>
);

const P = ({ children }: { children: React.ReactNode }) => <p style={pStyle}>{children}</p>;

const SellerBlock = ({ lang }: { lang: 'en' | 'pt' }) => (
  <div
    className="mb-12 p-6"
    style={{ border: '1px solid hsl(var(--bronze-soft) / 0.25)', borderRadius: '4px' }}
  >
    <p style={{ ...pStyle, marginBottom: '0.35rem' }}>
      <strong>{lang === 'pt' ? 'Firma' : 'Legal name'}:</strong> MAR D&apos;OPÇÕES — UNIPESSOAL LDA
      {' '}({lang === 'pt' ? 'marca comercial' : 'trading as'}: LolaLab)
    </p>
    <p style={{ ...pStyle, marginBottom: '0.35rem' }}>
      <strong>NIPC/NIF:</strong> 515704474
    </p>
    <p style={{ ...pStyle, marginBottom: '0.35rem' }}>
      <strong>{lang === 'pt' ? 'Sede' : 'Registered address'}:</strong> Praceta Diogo do Couto 1, 17,
      Apt 6C, 2765-088 Estoril, Cascais, Portugal
    </p>
    <p style={{ ...pStyle, marginBottom: '0.35rem' }}>
      <strong>{lang === 'pt' ? 'Contacto' : 'Contact'}:</strong>{' '}
      <a href="mailto:hello@lolalabstudio.com" style={{ color: 'hsl(var(--bronze-soft))' }}>
        hello@lolalabstudio.com
      </a>
    </p>
    <p style={{ ...pStyle, marginBottom: 0 }}>
      <strong>{lang === 'pt' ? 'Processador de pagamento' : 'Payment processor'}:</strong> Gumroad,
      Inc. — {lang === 'pt' ? 'Merchant of Record (calcula e recolhe IVA/VAT/sales tax)' : 'Merchant of Record (calculates and collects VAT/GST/sales tax)'}
    </p>
  </div>
);

const ContentPT = () => (
  <>
    <SellerBlock lang="pt" />
    <Section title="1. O que está a comprar">
      <P>
        Um exemplar digital (PDF) do livro &quot;Direction Over Prompt&quot;, de Gessika Olivieri,
        publicado por LolaLab (Mar D&apos;Opções — Unipessoal Lda). A compra dá acesso pessoal e
        intransmissível ao ficheiro; não inclui revenda, redistribuição ou uso comercial do
        conteúdo sem autorização escrita.
      </P>
    </Section>
    <Section title="2. Preço e pagamento">
      <P>
        O preço apresentado no checkout já inclui, quando aplicável, o IVA/VAT do seu país,
        calculado e cobrado automaticamente pela Gumroad enquanto Merchant of Record. A Gumroad
        processa o pagamento e emite o recibo — a LolaLab não tem acesso aos dados do seu cartão.
      </P>
    </Section>
    <Section title="3. Entrega">
      <P>
        Entrega digital imediata após confirmação do pagamento: acesso ao download é
        disponibilizado diretamente pela Gumroad (link/área de biblioteca do comprador) e, quando
        aplicável, por e-mail de confirmação da Gumroad. Não há envio físico.
      </P>
    </Section>
    <Section title="4. Direito de desistência (conteúdo digital)">
      <P>
        Ao abrigo do Decreto-Lei n.º 24/2014 e legislação equivalente da UE, o consumidor tem, em
        regra, 14 dias para desistir de uma compra à distância. Para conteúdo digital entregue
        imediatamente, esse direito é perdido a partir do momento em que o download é
        disponibilizado, desde que o comprador tenha dado consentimento expresso e prévio para o
        início da execução antes do fim do prazo de 14 dias, e reconhecido que perde o direito de
        desistência com esse início. Esse consentimento é recolhido no checkout da Gumroad antes
        do pagamento.
      </P>
    </Section>
    <Section title="5. Reembolsos">
      <P>
        Por regra, não há reembolso após o download ter sido disponibilizado, dado o disposto na
        secção 4. Exceções, avaliadas caso a caso via hello@lolalabstudio.com: falha técnica
        comprovada (ficheiro corrompido, link que não funciona); cobrança duplicada por erro do
        sistema; compra não autorizada pelo titular do cartão (contactar também a Gumroad
        diretamente).
      </P>
    </Section>
    <Section title="6. Direitos de autor">
      <P>
        O conteúdo do livro é propriedade intelectual de Gessika Olivieri / LolaLab. A compra não
        transfere direitos de autor, apenas uma licença de uso pessoal do exemplar adquirido. É
        proibida a reprodução, distribuição ou publicação do conteúdo, total ou parcial, sem
        autorização escrita.
      </P>
    </Section>
    <Section title="Nota de privacidade">
      <P>
        Tratamos e-mail (entrega, recibo, suporte, e newsletter só com opt-in separado) e dados de
        navegação do site conforme a política geral de cookies. Dados de pagamento são
        processados exclusivamente pela Gumroad — nunca chegam até nós. Não vendemos nem
        partilhamos os seus dados com terceiros além da Gumroad e de ferramentas de analytics já
        divulgadas no site. Direitos RGPD (acesso, retificação, apagamento, portabilidade,
        oposição): hello@lolalabstudio.com.
      </P>
    </Section>
    <P>
      <em>
        Documento em revisão — minuta baseada em prática padrão para venda de e-book na UE, não
        constitui aconselhamento jurídico definitivo.
      </em>
    </P>
  </>
);

const ContentEN = () => (
  <>
    <SellerBlock lang="en" />
    <Section title="1. What you're buying">
      <P>
        A digital copy (PDF) of &quot;Direction Over Prompt&quot; by Gessika Olivieri, published
        by LolaLab (Mar D&apos;Opções — Unipessoal Lda, Portugal). Your purchase grants personal,
        non-transferable access to the file. It does not include resale, redistribution, or
        commercial use of the content without written permission.
      </P>
    </Section>
    <Section title="2. Price and payment">
      <P>
        The price shown at checkout includes VAT/sales tax for your country where applicable,
        calculated and collected automatically by Gumroad as Merchant of Record. Gumroad
        processes your payment and issues the receipt — LolaLab never has access to your card
        details.
      </P>
    </Section>
    <Section title="3. Delivery">
      <P>
        Immediate digital delivery upon payment confirmation: download access is provided
        directly by Gumroad (buyer library / confirmation email). No physical shipment.
      </P>
    </Section>
    <Section title="4. Right of withdrawal (digital content)">
      <P>
        Under EU Directive 2011/83/EU and equivalent national law, consumers generally have 14
        days to withdraw from a distance purchase. For digital content delivered immediately,
        this right is lost from the moment download access is provided, provided the buyer has
        given prior express consent to immediate delivery and acknowledged the loss of the
        withdrawal right — collected at Gumroad&apos;s checkout before payment.
      </P>
    </Section>
    <Section title="5. Refunds">
      <P>
        As a rule, no refund is issued once download access has been provided, per section 4.
        Exceptions, reviewed case by case via hello@lolalabstudio.com: confirmed technical
        failure (corrupted file, broken download link); duplicate charge due to a system error;
        unauthorized use of the payment card (also contact Gumroad support directly).
      </P>
    </Section>
    <Section title="6. Copyright">
      <P>
        The book&apos;s content is the intellectual property of Gessika Olivieri / LolaLab.
        Purchase does not transfer copyright — only a personal-use license for the copy acquired.
        Reproduction, distribution, or republication of the content, in whole or in part, without
        written permission is prohibited.
      </P>
    </Section>
    <Section title="Privacy note">
      <P>
        We process your email (delivery, receipt, support, and newsletter only with a separate
        opt-in) and site browsing data per our general cookie policy. Payment data is processed
        exclusively by Gumroad — it never reaches us. We do not sell or share your data with
        third parties beyond Gumroad and any analytics tools already disclosed on the site. GDPR
        rights (access, rectification, erasure, portability, objection): hello@lolalabstudio.com.
      </P>
    </Section>
    <P>
      <em>
        Document under review — a solid draft based on standard EU e-book sale practice, not
        final legal advice.
      </em>
    </P>
  </>
);

const LegalContent = () => {
  const { lang } = useLanguage();

  useSeo({
    title: 'Terms & Privacy · LolaLab',
    description: 'Terms of sale, refund policy, and privacy note for LolaLab Library digital books.',
    path: '/legal',
  });

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--ink))' }}>
        <PageHero
          label={lang === 'pt' ? 'Legal' : 'Legal'}
          headline={lang === 'pt' ? 'Termos, reembolso e privacidade' : 'Terms, refunds & privacy'}
          sub={
            lang === 'pt'
              ? 'Para compras digitais da LolaLab Library.'
              : 'For LolaLab Library digital purchases.'
          }
        />
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[720px] mx-auto">
            <span className="block mb-6" style={labelStyle}>
              {lang === 'pt' ? 'Documento' : 'Document'}
            </span>
            {lang === 'pt' ? <ContentPT /> : <ContentEN />}
          </div>
        </section>
        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const Legal = () => (
  <LanguageProvider>
    <LegalContent />
  </LanguageProvider>
);

export default Legal;
