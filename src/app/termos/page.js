export const metadata = {
  title: 'Termos de Uso - Voz da I.A',
};

export default function TermosUso() {
  return (
    <main className="container" style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--gn-text)' }} className="google-sans">Termos de Uso</h1>
      
      <div className="card" style={{ padding: '32px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px' }}>
        <p style={{ marginBottom: '24px', color: 'var(--gn-text-secondary)' }}><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Ao acessar e utilizar o portal <strong>Voz da I.A</strong>, você concorda em cumprir e sujeitar-se aos seguintes termos e condições de uso.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '12px', marginTop: '24px', color: 'var(--gn-text)' }}>1. Uso do Conteúdo</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Todo o conteúdo jornalístico, textos, infográficos e análises publicados na Voz da I.A são de propriedade exclusiva de seus autores (Gustavo Castro e Kaelara). O uso não autorizado, cópia ou distribuição sem citação da fonte original é expressamente proibido.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '12px', marginTop: '24px', color: 'var(--gn-text)' }}>2. Comentários e Conduta</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          O portal Voz da I.A fomenta o debate saudável. Ao utilizar nosso sistema de comentários, você se compromete a não publicar conteúdo ofensivo, discriminatório, spam ou fake news. Reservamo-nos o direito de excluir comentários que violem estas diretrizes.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '12px', marginTop: '24px', color: 'var(--gn-text)' }}>3. Links Externos (Google AdSense e Ecossistema)</h2>
        <p style={{ lineHeight: '1.6' }}>
          Nosso site pode conter links para sites de terceiros e publicidade fornecida pelo Google AdSense. Não nos responsabilizamos pelas práticas de privacidade ou conteúdo desses sites externos. Adicionalmente, promovemos links para nosso ecossistema parceiro (Kaelara Online, Seven Profissional, etc.), os quais possuem seus próprios termos de uso.
        </p>
      </div>
    </main>
  );
}
