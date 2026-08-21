import PageTracker from '../components/PageTracker';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Nossa Equipe | Voz da I.A',
  description: 'Conheça a equipe por trás do Voz da I.A, trabalhando para trazer informações precisas e combater as fake news.',
};

const teamMembers = [
  {
    name: 'RuiWenceslau de Oliveira',
    initials: 'RO',
    image: '', /* Coloque o caminho da foto aqui, ex: '/equipe/rui.jpg' */
    email: 'ruiwenceslau@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/ruiwenceslau-de-oliveira-ab08bb42a',
    areas: 'Economia, Geopolítica, Política e Eleições',
    color: 'linear-gradient(135deg, #34A853, #0F9D58)'
  },
  {
    name: 'Gustavo de Castro',
    initials: 'GC',
    image: '', /* Coloque o caminho da foto aqui, ex: '/equipe/gustavo.jpg' */
    email: 'gustavocastroinfo@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb',
    areas: 'Engenharia e Tech, Militar e governo',
    color: 'linear-gradient(135deg, #1a73e8, #8e24aa)'
  },
  {
    name: 'Daiene Maria de Meneses',
    initials: 'DM',
    image: '', /* Coloque o caminho da foto aqui */
    email: 'daidiva15@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/daiene-meneses-dai-13561a20a',
    areas: 'Ciência e espaço, esportes',
    color: 'linear-gradient(135deg, #e91e63, #c2185b)'
  },
  {
    name: 'Kaelara Castro Bernardes Rosa',
    initials: 'KC',
    image: '', /* Coloque o caminho da foto aqui */
    email: 'nicholaigenov@gmail.com',
    phone: null,
    linkedin: null,
    areas: 'IA Sem Mitos, Kaelara Insigths, Clima Tempo BR',
    color: 'linear-gradient(135deg, #9c27b0, #6a1b9a)'
  },
  {
    name: 'Sagrada Jurema Zé Severino',
    subtitle: "Terreiro do Sr. Zé / Pai Jhonatan d' Osogiyan",
    initials: 'SJ',
    image: '', /* Coloque o caminho da foto aqui */
    email: null,
    phone: '37 9968-8433',
    linkedin: null,
    areas: 'Horoscopo, Medicina e Bio Tech, Religião',
    color: 'linear-gradient(135deg, #ff9800, #f57c00)'
  },
  {
    name: 'Gabriela Castro Bernardes Rosa',
    initials: 'GB',
    image: '', /* Coloque o caminho da foto aqui */
    email: 'dfggames715@gmail.com',
    phone: null,
    linkedin: null,
    areas: 'Jogos, Passatempos',
    color: 'linear-gradient(135deg, #00bcd4, #0097a7)'
  }
];

export default function EquipePage() {
  return (
    <main className="main-content" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      <h1 className="page-title google-sans" style={{ fontSize: '32px', marginBottom: '24px', textAlign: 'center' }}>
        Nossa Equipe
      </h1>
      
      <div style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--gn-text-secondary)', marginBottom: '48px', textAlign: 'center' }}>
        Conheça as pessoas dedicadas a trazer notícias confiáveis e de alta tecnologia para você.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {teamMembers.map((member, index) => (
          <div key={index} style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: member.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', margin: '0 auto 24px', overflow: 'hidden' }}>
              {member.image ? (
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                member.initials
              )}
            </div>
            <h2 className="google-sans" style={{ fontSize: '24px', marginBottom: member.subtitle ? '4px' : '8px', color: 'var(--gn-text)' }}>
              {member.name}
            </h2>
            {member.subtitle && (
              <h3 style={{ fontSize: '15px', color: 'var(--gn-text-secondary)', marginBottom: '16px', fontWeight: '500' }}>
                {member.subtitle}
              </h3>
            )}
            
            <p style={{ color: 'var(--gn-text-secondary)', fontSize: '15px', lineHeight: '1.5', marginBottom: '24px', flexGrow: 1 }}>
              <strong style={{ color: 'var(--gn-text)' }}>Áreas:</strong><br />
              {member.areas}
            </p>

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
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
                  <span className="material-icons-extended">link</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_EQUIPE" />
      </div>
    </main>
  );
}
