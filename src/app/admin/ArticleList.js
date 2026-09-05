'use client';

import { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ArticleList({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadingId, setLoadingId] = useState(null);
  const router = useRouter();

  const filteredArticles = useMemo(() => {
    return (articles || []).filter(art => {
      const matchSearch = (art.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (art.author_name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'all' || art.category_id === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [articles, searchTerm, selectedCategory]);

  const categoriesList = useMemo(() => {
    const catsMap = new Map();
    (articles || []).forEach(a => {
      if (a.categories) {
        catsMap.set(a.categories.id || a.category_id, a.categories.name);
      }
    });
    return Array.from(catsMap.entries());
  }, [articles]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Tem certeza que deseja excluir a notícia "${title}"?\nEsta ação é permanente e removerá o artigo do ar.`)) {
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
    <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '32px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0', fontWeight: '700' }}>
            <span className="material-icons-extended" style={{ color: '#EA4335' }}>article</span> 
            Gerenciar Matérias Cadastradas
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Exibindo {filteredArticles.length} de {articles?.length || 0} matérias
          </span>
        </div>

        {/* Filtro e Busca Rápida */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Filtrar por título ou autor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', background: 'var(--bg)', color: 'var(--text)', minWidth: '220px' }}
          />

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', background: 'var(--bg)', color: 'var(--text)' }}
          >
            <option value="all">Todas as Categorias</option>
            {categoriesList.map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredArticles.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>
          {filteredArticles.map(article => (
            <div key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--bg)', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text)', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {article.title}
                  </span>
                  {!article.published && (
                    <span style={{ fontSize: '11px', background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      Rascunho
                    </span>
                  )}
                </div>
                
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span style={{ fontWeight: '500', color: '#1a73e8' }}>{article.categories?.name || 'Sem Categoria'}</span>
                  <span>•</span>
                  <span>Por {article.author_name || 'Redação'}</span>
                  <span>•</span>
                  <span style={{ color: '#ea580c', fontWeight: '600' }}>{article.views || 0} visualizações</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Link 
                  href={`/artigo/${article.slug}`}
                  target="_blank"
                  title="Ver no site"
                  style={{ 
                    background: 'var(--card)', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '16px' }}>visibility</span>
                  Ver
                </Link>

                <Link 
                  href={`/admin/editar/${article.id}`}
                  style={{ 
                    background: 'rgba(26, 115, 232, 0.1)', color: '#1a73e8', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '16px' }}>edit</span>
                  Editar
                </Link>

                <button 
                  onClick={() => handleDelete(article.id, article.title)}
                  disabled={loadingId === article.id}
                  style={{ 
                    background: 'rgba(217, 48, 37, 0.1)', color: '#d93025', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '16px' }}>delete</span>
                  {loadingId === article.id ? '...' : 'Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '14px' }}>
          Nenhuma matéria encontrada com os filtros selecionados.
        </div>
      )}
    </div>
  );
}
