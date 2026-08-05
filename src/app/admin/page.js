import { supabase } from '@/lib/supabase';

// Força re-renderização no servidor para pegar dados recentes no admin
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Busca contagens (stats)
  const { count: articlesCount } = await supabase.from('articles').select('*', { count: 'exact', head: true });
  const { count: commentsCount } = await supabase.from('comments').select('*', { count: 'exact', head: true });
  const { data: categories } = await supabase.from('categories').select('*');

  return (
    <div>
      <h1 style={{ fontSize: '28px', color: '#202124', marginBottom: '8px' }}>Dashboard do Jornal</h1>
      <p style={{ color: '#5f6368', marginBottom: '32px' }}>Bem-vindo à central de comando da Voz da I.A.</p>

      {/* Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase' }}>Notícias Publicadas</div>
          <div style={{ fontSize: '32px', color: '#1a73e8', fontWeight: '700' }}>{articlesCount || 0}</div>
        </div>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase' }}>Comentários Recebidos</div>
          <div style={{ fontSize: '32px', color: '#34A853', fontWeight: '700' }}>{commentsCount || 0}</div>
        </div>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase' }}>Blocos (Categorias)</div>
          <div style={{ fontSize: '32px', color: '#EA4335', fontWeight: '700' }}>{categories?.length || 0}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Simulador de Editor de Notícias */}
        <div id="editor" style={{ border: '1px solid #dadce0', borderRadius: '8px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', color: '#202124', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{color: '#1a73e8'}}>edit_document</span> Escrever Notícia
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="Título da Manchete" style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '16px' }} />
            <select style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px' }}>
              <option value="">Selecione o Bloco (Categoria)</option>
              {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <input type="text" placeholder="URL da Imagem de Capa" style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px' }} />
            <textarea placeholder="Escreva a notícia com a ajuda da Kaelara..." rows={8} style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px', resize: 'vertical' }}></textarea>
            <button style={{ background: '#1a73e8', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '500', cursor: 'pointer' }}>Publicar Artigo</button>
          </div>
        </div>

        <div>
          {/* AdSense Config */}
          <div id="adsense" style={{ border: '1px solid #dadce0', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', color: '#202124', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-icons-extended" style={{color: '#EA4335'}}>monetization_on</span> Monetização (AdSense)
            </h2>
            <p style={{ fontSize: '13px', color: '#5f6368', marginBottom: '16px' }}>Cole aqui o seu Client ID do Google AdSense para ativar os anúncios nos artigos.</p>
            <input type="text" placeholder="ex: ca-pub-1234567890" style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px', marginBottom: '16px' }} />
            <button style={{ background: '#34A853', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '500', cursor: 'pointer' }}>Salvar Configuração</button>
          </div>
          
          <div style={{ padding: '16px', background: 'rgba(251, 188, 5, 0.1)', border: '1px solid #FBBC05', borderRadius: '8px', color: '#b07b00', fontSize: '13px' }}>
            <strong>Nota de Desenvolvimento:</strong> Esta é a interface estrutural do painel. Para que os formulários salvem os dados de fato no Supabase de forma segura, será necessário conectar o sistema de Login (Supabase Auth) na próxima etapa.
          </div>
        </div>
      </div>

    </div>
  );
}
