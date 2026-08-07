'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ArticleList({ articles }) {
  const [loadingId, setLoadingId] = useState(null);
  const router = useRouter();

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Tem certeza que deseja excluir a notícia "${title}"?\nEsta ação não pode ser desfeita.`)) {
      return;
    }

    setLoadingId(id);

    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      alert('Notícia excluída com sucesso!');
      router.refresh();
      
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ border: '1px solid #dadce0', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', color: '#202124', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="material-icons-extended" style={{color: '#EA4335'}}>article</span> Gerenciar Notícias Publicadas
      </h2>
      
      {articles && articles.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {articles.map(article => (
            <div key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #eee', borderRadius: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: '500', color: '#202124', fontSize: '15px' }}>{article.title}</span>
                <span style={{ fontSize: '12px', color: '#5f6368' }}>{new Date(article.created_at).toLocaleDateString('pt-BR')} • {article.categories?.name || 'Sem Categoria'}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link 
                  href={`/admin/editar/${article.id}`}
                  style={{ 
                    background: '#e8f0fe', color: '#1a73e8', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '18px' }}>edit</span>
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(article.id, article.title)}
                  disabled={loadingId === article.id}
                  style={{ 
                    background: '#fce8e6', color: '#d93025', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '18px' }}>delete</span>
                  {loadingId === article.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#5f6368', fontSize: '14px' }}>Nenhuma notícia encontrada.</p>
      )}
    </div>
  );
}
