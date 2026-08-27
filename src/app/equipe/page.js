import PageTracker from '../components/PageTracker';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Nossa Equipe | Voz da I.A',
  description: 'Conheça a equipe por trás do Voz da I.A, trabalhando para trazer informações precisas e combater as fake news.',
};

const founders = [
  {
    name: 'Gustavo de Castro Bernardes Rosa',
    roleTag: 'Fundador',
    subtitle: 'Fundador, Engenharia de I.A & CTO',
    initials: 'GC',
    image: '/equipe/gustavo.jpg',
    email: 'gustavocastroinfo@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb',
    website: null,
    areas: 'Inteligência Artificial & Agentes, Engenharia & hardware, Web designer e CTO',
    formation: 'Tecnólogo em redes de computação e Engenharia de I.A',
    color: 'linear-gradient(135deg, #1a73e8, #8e24aa)'
  },
  {
    name: 'RuiWenceslau de Oliveira',
    roleTag: 'Cofundador',
    subtitle: 'Cofundador, Editor & Relações Públicas',
    initials: 'RO',
    image: '/equipe/rui.jpg',
    email: 'ruiwenceslau@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/ruiwenceslau-de-oliveira-ab08bb42a',
    website: null,
    areas: 'Editor, Relações Públicas, Debug de UX/UI',
    formation: 'Criador de conteúdo para mídias sociais e Youtuber',
    color: 'linear-gradient(135deg, #34A853, #0F9D58)'
  }
];

const columnists = [
  {
    name: 'Beatriz Freire',
    roleTag: 'Colunista',
    subtitle: 'Perfil de Beatriz',
    initials: 'BF',
    image: '/equipe/beatriz.jpg',
    email: 'freiredemelob@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/beatriz-freire-41225b3b0/',
    website: 'https://uiclap.bio/beafreire',
    areas: 'Estrategista de Customer Success & Qualidade | Comunicação Social | Marketing & Social Media',
    formation: 'Comunicação Social, Marketing & Social Media e Estratégia de Customer Success & Qualidade',
    color: 'linear-gradient(135deg, #e65100, #ff9800)'
  },
  {
    name: 'Daiene Maria de Meneses',
    roleTag: 'Colunista',
    subtitle: 'Colunista de Ciência e Educação',
    initials: 'DM',
    image: '/equipe/daiene.jpg',
    email: 'daidiva15@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/daiene-meneses-dai-13561a20a',
    website: null,
    areas: 'Ciência & Fronteira Espacial, Revisora, Copidesque',
    formation: 'Pedagoga e Professora de educação infantil',
    color: 'linear-gradient(135deg, #e91e63, #c2185b)'
  },
  {
    name: 'Jhonatan d\' Osogiyan (ou Pai Jhonatan)',
    roleTag: 'Colunista',
    subtitle: 'Colunista de Cultura, Tradições Afro-Brasileiras e Etnobotânica',
    initials: 'SJ',
    image: '/equipe/jhonatan.jpg',
    email: null,
    phone: '37 9968-8433',
    linkedin: null,
    website: null,
    areas: 'Cultura, Filosofia & Bem-Estar, Horóscopo & Tarô',
    formation: 'Psicologia, Pesquisador de Tradições Populares e Herbalista',
    color: 'linear-gradient(135deg, #ff9800, #f57c00)'
  },
  {
    name: 'Kaelara (Agente de IA Autônomo)',
    roleTag: 'Inteligência Artificial',
    subtitle: 'Sistema Inteligente de Análise e Monitoramento Climático',
    initials: 'KC',
    image: '/equipe/kaelara.png',
    email: 'nicholaigenov@gmail.com',
    phone: null,
    linkedin: null,
    website: null,
    areas: 'Clima tempo',
    formation: 'Agente de Inteligência Artificial desenvolvido sob arquitetura LLM (Gemma/Google API) para processamento automatizado de dados meteorológicos e satelitais.',
    color: 'linear-gradient(135deg, #9c27b0, #6a1b9a)'
  },
  {
    name: 'Gabriela Castro Bernardes Rosa',
    roleTag: 'Colunista',
    subtitle: 'Colunista de Tecnologia e Games',
    initials: 'GB',
    image: '',
    email: 'dfggames715@gmail.com',
    phone: null,
    linkedin: null,
    website: null,
    areas: 'Tech & Gaming',
    formation: 'Youtuber e Gamer',
    color: 'linear-gradient(135deg, #00bcd4, #0097a7)'
  }
];

function MemberCard({ member }) {
  return (
    <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {member.roleTag && (
        <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '12px', background: 'var(--gn-bg, #f1f3f4)', color: 'var(--gn-text-secondary, #5f6368)', border: '1px solid var(--gn-border)' }}>
          {member.roleTag}
        </span>
      )}
      <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: member.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', margin: '0 auto 24px', overflow: 'hidden' }}>
        {member.image ? (
          <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          member.initials
        )}
      </div>
      <h2 className="google-sans" style={{ fontSize: '22px', marginBottom: member.subtitle ? '4px' : '8px', color: 'var(--gn-text)' }}>
        {member.name}
      </h2>
      {member.subtitle && (
        <h3 style={{ fontSize: '14px', color: 'var(--gn-text-secondary)', marginBottom: '16px', fontWeight: '500' }}>
          {member.subtitle}
        </h3>
      )}
      
      <div style={{ color: 'var(--gn-text-secondary)', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px', flexGrow: 1, textAlign: 'left' }}>
        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: 'var(--gn-text)' }}>Áreas de Atuação:</strong><br />
          {member.areas}
        </div>
        {member.formation && (
          <div>
            <strong style={{ color: 'var(--gn-text)' }}>Formação:</strong><br />
            {member.formation}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: 'auto' }}>
        {member.email && (
          <a href={"mailto:" + member.email} title="Email" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">email</span>
          </a>
        )}
        {member.phone && (
          <a href={"https://wa.me/55" + member.phone.replace(/\D/g, '')} target="_blank" rel="noopener noreferrer" title="WhatsApp / Telefone" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">phone</span>
          </a>
        )}
        {member.website && (
          <a href={member.website} target="_blank" rel="noopener noreferrer" title="Site / Perfil" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">language</span>
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">link</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function EquipePage() {
  return (
    <main className="main-content" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      <h1 className="page-title google-sans" style={{ fontSize: '32px', marginBottom: '16px', textAlign: 'center' }}>
        Nossa Equipe
      </h1>
      
      <div style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--gn-text-secondary)', marginBottom: '40px', textAlign: 'center' }}>
        Conheça as pessoas dedicadas a trazer notícias confiáveis e de alta tecnologia para você.
      </div>

      {/* Seção Fundadores */}
      <div style={{ marginBottom: '48px' }}>
        <h2 className="google-sans" style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-icons-extended" style={{ color: '#1a73e8' }}>verified</span>
          Fundador e Cofundador
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {founders.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>

      {/* Seção Colunistas */}
      <div style={{ marginBottom: '48px' }}>
        <h2 className="google-sans" style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-icons-extended" style={{ color: '#34A853' }}>edit_note</span>
          Colunistas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {columnists.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_EQUIPE" />
      </div>
    </main>
  );
}
