export const metadata = {
  title: 'Política de Privacidade - Kaelara News',
};

export default function PoliticaPrivacidade() {
  return (
    <main className="container" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>Política de Privacidade</h1>
      
      <div className="card" style={{ padding: '32px' }}>
        <p style={{ marginBottom: '16px' }}><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        
        <p style={{ marginBottom: '16px' }}>
          O Kaelara News leva a sua privacidade a sério. Esta política descreve como coletamos, usamos e protegemos as suas informações ao visitar o nosso portal.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '16px', marginTop: '24px' }}>1. Coleta de Dados e Cookies</h2>
        <p style={{ marginBottom: '16px' }}>
          Utilizamos cookies para melhorar a sua experiência, analisar o tráfego do site e, no futuro, personalizar anúncios através do Google AdSense. 
          Os dados coletados (como endereço IP anonimizado, tipo de navegador e páginas visitadas) são usados estritamente para fins de análise e funcionamento da plataforma.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '16px', marginTop: '24px' }}>2. Publicidade (Google AdSense)</h2>
        <p style={{ marginBottom: '16px' }}>
          O nosso site exibe anúncios fornecidos pelo Google. O Google, como fornecedor terceirizado, utiliza cookies (como o cookie DART) para exibir anúncios baseados em suas visitas ao nosso site e a outros sites na internet.
          Você pode desativar o uso de cookies DART visitando a Política de Privacidade da rede de conteúdo e dos anúncios do Google.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '16px', marginTop: '24px' }}>3. Segurança</h2>
        <p>
          Seus dados são protegidos utilizando protocolos de segurança modernos. Nenhuma informação pessoal sensível é armazenada em nossos servidores sem o seu consentimento explícito.
        </p>
      </div>
    </main>
  );
}
