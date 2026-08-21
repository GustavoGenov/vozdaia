import PageTracker from '../components/PageTracker';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Nossa Equipe | Voz da I.A',
  description: 'Conheça a equipe por trás do Voz da I.A, trabalhando para trazer informações precisas e combater as fake news.',
};

export default function EquipePage() {
  return (
    <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      <h1 className="page-title google-sans" style={{ fontSize: '32px', marginBottom: '24px', textAlign: 'center' }}>
        Nossa Equipe
      </h1>
      
      <div style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--gn-text-secondary)', marginBottom: '48px', textAlign: 'center' }}>
        Conheça as pessoas dedicadas a trazer notícias confiáveis e de alta tecnologia para você.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        
        {/* Membro 1 */}
        <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a73e8, #8e24aa)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', margin: '0 auto 24px' }}>
            GC
          </div>
          <h2 className="google-sans" style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--gn-text)' }}>Gustavo Castro</h2>
          <h3 style={{ fontSize: '16px', color: '#1a73e8', marginBottom: '16px', fontWeight: '500' }}>Fundador & Desenvolvedor Principal</h3>
          <p style={{ color: 'var(--gn-text-secondary)', fontSize: '15px', lineHeight: '1.5', marginBottom: '24px' }}>
            Responsável pela arquitetura técnica do Voz da I.A e integração com tecnologias de ponta para garantir a melhor experiência e precisão da informação.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="mailto:nicholaigenov@gmail.com" title="Email" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
              <span className="material-icons-extended">email</span>
            </a>
            <a href="https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
              <span className="material-icons-extended">link</span>
            </a>
          </div>
        </div>

        {/* Membro 2 */}
        <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #34A853, #0F9D58)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', margin: '0 auto 24px' }}>
            RO
          </div>
          <h2 className="google-sans" style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--gn-text)' }}>RuiWenceslau de Oliveira</h2>
          <h3 style={{ fontSize: '16px', color: '#34A853', marginBottom: '16px', fontWeight: '500' }}>Co-Fundador & Editor</h3>
          <p style={{ color: 'var(--gn-text-secondary)', fontSize: '15px', lineHeight: '1.5', marginBottom: '24px' }}>
            Coordena a curadoria de conteúdo e estratégias de comunicação, assegurando que o jornal mantenha seu compromisso no combate às fake news.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="mailto:ruiwenceslau@gmail.com" title="Email" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
              <span className="material-icons-extended">email</span>
            </a>
            <a href="https://www.linkedin.com/in/ruiwenceslau-de-oliveira-ab08bb42a" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
              <span className="material-icons-extended">link</span>
            </a>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '60px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_EQUIPE" />
      </div>
    </main>
  );
}
