import PageTracker from '../components/PageTracker';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Termos e Condições de Uso | Voz da I.A',
  description: 'Termos e Condições de Uso do portal Voz da I.A',
};

export default function TermosUso() {
  return (
    <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      <h1 className="page-title google-sans" style={{ fontSize: '36px', marginBottom: '16px', textAlign: 'center', color: 'var(--gn-text)' }}>
        Termos e Condições de Uso
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--gn-text-secondary)', marginBottom: '32px' }}>
        <strong>Última atualização:</strong> 21 de agosto de 2026
      </p>
      
      <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '16px', lineHeight: '1.8', color: 'var(--gn-text-secondary)' }}>
        
        <p style={{ marginBottom: '32px', fontSize: '18px' }}>
          Seja bem-vindo ao portal <strong>Voz da I.A</strong>. Ao acessar, navegar ou interagir com os serviços e publicações disponibilizados em nossa plataforma, você declara ter lido, compreendido e concordado integralmente com os presentes Termos e Condições de Uso. Caso não concorde com qualquer disposição aqui descrita, solicitamos que não continue a navegação.
        </p>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          1. Propriedade Intelectual e Direitos Autorais
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Todo o acervo publicado no Voz da I.A — incluindo reportagens, artigos de opinião, análises técnicas, textos, infográficos, imagens conceituais, códigos-fonte e logotipos — é protegido pelas leis de propriedade intelectual e direitos autorais (Lei nº 9.610/1998):
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>
            <strong>Autoria e Titularidade:</strong> Os conteúdos são de titularidade exclusiva de seus respectivos autores e criadores da equipe editorial (como Gustavo de Castro, Kaelara, Rui Wenceslau e demais colaboradores identificados).
          </li>
          <li>
            <strong>Uso Permitido:</strong> É permitida a citação de pequenos trechos para fins de estudo, debate ou divulgação jornalística, desde que com expressa atribuição de autoria e link direto (hiperlink dofollow) para a matéria original em nosso portal.
          </li>
          <li>
            <strong>Proibições Expressas:</strong> Fica expressamente vedada a reprodução total ou parcial, cópia não autorizada, raspagem de dados (web scraping) sem autorização, comercialização ou distribuição sem o devido consentimento por escrito dos autores.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          2. Conduta do Usuário e Política de Comentários
        </h2>
        <p style={{ marginBottom: '16px' }}>
          O Voz da I.A valoriza o pensamento crítico, a pluralidade de opiniões e o debate construtivo. No entanto, para manter um ambiente respeitoso e produtivo, os usuários que utilizarem nossos canais de comentários ou formulários de contato concordam em:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Não veicular conteúdos difamatórios, injuriosos, caluniosos, racistas, homofóbicos, preconceituosos ou que incitem a violência e o ódio.</li>
          <li>Não disseminar desinformação proposital (fake news), golpes digitais, links maliciosos ou práticas de spam e autopromoção não autorizada.</li>
          <li>Respeitar as opiniões dos demais leitores e da equipe editorial.</li>
          <li><strong>Moderação:</strong> Reservamo-nos o direito inalienável de moderar, ocultar ou excluir permanentemente qualquer comentário que viole estas diretrizes, sem necessidade de aviso prévio.</li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          3. Links Externos, Publicidade e Ecossistema Integrado
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Para enriquecer o conteúdo jornalístico e apoiar a sustentabilidade da plataforma, o portal integra diferentes tipos de conexões externas:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>
            <strong>Publicidade de Terceiros (Google AdSense):</strong> Nosso site exibe anúncios programáticos gerenciados pelo Google. Não temos controle direto sobre os produtos, serviços ou promessas anunciados nesses blocos publicitários. As transações e visitas a páginas de patrocinadores são de exclusiva responsabilidade entre o usuário e o anunciante.
          </li>
          <li>
            <strong>Links para Fontes e Referências:</strong> Disponibilizamos links diretos para documentos oficiais, artigos acadêmicos e repositórios externos. Não nos responsabilizamos pela estabilidade, disponibilidade técnica ou políticas de privacidade de páginas de terceiros.
          </li>
          <li>
            <strong>Projetos do Nosso Ecossistema:</strong> O portal promove e mantém conexões com soluções do nosso ecossistema parceiro (como Kaelara Online, 7 Profissional, entre outros). Cada uma dessas plataformas possui termos de uso e políticas operacionais próprias, que devem ser observadas pelo usuário ao acessá-las.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          4. Isenção de Responsabilidade Técnica
        </h2>
        <p style={{ marginBottom: '16px' }}>
          A equipe do Voz da I.A trabalha continuamente para manter a plataforma segura, rápida e estável:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Não garantimos que a operação do portal será ininterrupta ou 100% livre de falhas temporárias resultantes de indisponibilidade em provedores de nuvem, ataques cibernéticos externos ou falhas de infraestrutura de rede global.</li>
          <li>Os artigos de caráter tecnológico, educacional e científico têm o objetivo de informar e contextualizar a sociedade, não substituindo consultas técnicas ou jurídicas formais especializadas.</li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          5. Modificações dos Termos
        </h2>
        <p style={{ marginBottom: '24px' }}>
          O Voz da I.A poderá, a qualquer momento e a seu exclusivo critério, revisar, alterar ou atualizar estes Termos de Uso para refletir mudanças tecnológicas, regulatórias ou na linha editorial. As alterações passam a vigorar imediatamente após a sua publicação nesta página, identificadas pela data da última atualização no topo do documento.
        </p>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          6. Legislação Aplicável e Foro
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Estes Termos e Condições de Uso são regidos e interpretados de acordo com a legislação da República Federativa do Brasil. Para a resolução de eventuais litígios decorrentes do uso desta plataforma, fica eleito o Foro da Comarca de Formiga, Estado de Minas Gerais, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
        </p>

      </div>

      <div style={{ marginTop: '60px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_TERMOS" />
      </div>
    </main>
  );
}
