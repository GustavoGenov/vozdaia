import PageTracker from '../components/PageTracker';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Quem Somos | Voz da I.A',
  description: 'Conheça a história e o propósito do Voz da I.A',
};

export default function Sobre() {
  return (
    <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      <h1 className="page-title google-sans" style={{ fontSize: '36px', marginBottom: '32px', textAlign: 'center', color: 'var(--gn-text)' }}>
        Quem Somos: A Voz da I.A
      </h1>
      
      <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '18px', lineHeight: '1.8', color: 'var(--gn-text-secondary)' }}>
        
        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '0' }}>
          Da Paixão pela Tecnologia ao Nascimento de um Propósito
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Toda grande jornada nasce de quedas, aprendizados e, acima de tudo, da vontade inabalável de fazer a diferença. Rui Wenceslau e Gustavo de Castro compartilham uma trajetória de anos dedicada à criação de conteúdo na internet: desbravaram canais no YouTube, administraram páginas e construíram projetos em diversas redes sociais. Cada desafio enfrentado serviu como laboratório para moldar a maturidade, a resiliência e a visão técnica que hoje definem o nosso trabalho.
        </p>
        <p style={{ marginBottom: '40px' }}>
          Em junho de 2026, quando os caminhos de Rui e Gustavo se cruzaram, a sintonia foi imediata. Diante de dezenas de ideias e ambições compartilhadas, surgiu a decisão de construir uma iniciativa que integrasse tecnologia de ponta, verdade factual e impacto humano real. Dessa faísca nasceu o <strong>Voz da I.A</strong> — mais do que um jornal digital, um manifesto pelo jornalismo de alta precisão e pela democratização responsável da tecnologia.
        </p>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          A Nossa Missão: Resgatar a Verdade e Valorizar o Conhecimento
        </h2>
        <p style={{ marginBottom: '16px' }}>
          O Voz da I.A nasceu para responder a duas dores profundas da era digital:
        </p>
        <ul style={{ marginBottom: '40px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <strong>O Combate Rigoroso à Desinformação:</strong> Gustavo de Castro transformou sua indignação com o mar de fake news, boatos sensacionalistas e especulações infundadas sobre Inteligência Artificial em compromisso editorial. Enquanto a IA é frequentemente mal compreendida e instrumentalizada para gerar conteúdos superficiais, nós assumimos a vanguarda técnica para explicar a ciência, a arquitetura e os impactos reais dessa revolução sem mitos.
          </li>
          <li>
            <strong>A Proteção à Autoria e à Excelência:</strong> Rui Wenceslau vivenciou as consequências da apropriação indevida de produções intelectuais na internet, sem os devidos créditos e respeito aos criadores. Unindo forças, desenvolvemos uma plataforma própria, robusta e independente, focada em entregar análises profundas, checadas e com credibilidade inegociável.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          A Força da Nossa Equipe
        </h2>
        <p style={{ marginBottom: '16px' }}>
          A seriedade do projeto ecoou rapidamente. Atraídos pelo profissionalismo e pela transparência da nossa linha editorial, novos talentos integraram o ecossistema do Voz da I.A:
        </p>
        <p style={{ marginBottom: '40px' }}>
          Jhonatan, Daiene, Gabriela e Kaelara, ao lado de novos colaboradores que somam forças continuamente, enriquecem a publicação com suas especialidades em design, redação, engenharia e análise crítica. Cada integrante assina blocos editoriais dedicados, garantindo pluralidade técnica e profundidade humana em cada pauta.
        </p>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          Dinâmica e Engenharia Operacional
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Para garantir alto desempenho e excelência técnica diária, a liderança executiva do jornal opera de forma integrada:
        </p>
        <ul style={{ marginBottom: '40px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <strong>Rui Wenceslau:</strong> Lidera a estratégia de divulgação global, produção de conteúdo especializado, processos de debug e melhoria contínua da experiência do usuário, além da condução de parcerias e representações externas.
          </li>
          <li>
            <strong>Gustavo de Castro:</strong> Comanda a arquitetura de código e engenharia da plataforma, a integração avançada de ferramentas computacionais, a geração de pautas estruturantes e a articulação institucional.
          </li>
        </ul>

        <div style={{ textAlign: 'center', marginTop: '48px', padding: '32px', background: 'var(--gn-search-bg)', borderRadius: '8px' }}>
          <p style={{ fontStyle: 'italic', fontSize: '20px', color: 'var(--gn-text)', fontWeight: '500', margin: 0 }}>
            "Não construímos apenas páginas; desenvolvemos pontes de conhecimento entre a inteligência humana e as fronteiras da inovação tecnológica."
          </p>
        </div>

      </div>

      <div style={{ marginTop: '60px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_SOBRE" />
      </div>
    </main>
  );
}
