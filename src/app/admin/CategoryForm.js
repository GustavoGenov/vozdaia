'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CategoryForm() {
  const [name, setName] = useState('');
  const [colorCode, setColorCode] = useState('#1a73e8');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const slugify = (text) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage('Preencha o nome do bloco.');
      return;
    }

    setLoading(true);
    setMessage('Criando bloco...');

    try {
      const slug = slugify(name);
      
      const { error: insertError } = await supabase.from('categories').insert([{
        name,
        slug,
        color_code: colorCode,
        views: 0
      }]);

      if (insertError) {
        throw new Error('Erro ao criar bloco: ' + insertError.message);
      }

      setMessage('Bloco criado com sucesso!');
      setName('');
      setColorCode('#1a73e8');
      router.refresh();

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetupAdSense = async () => {
    if (!window.confirm('Atenção: Isso irá reestruturar os blocos para o padrão oficial otimizado. Deseja continuar?')) {
      return;
    }

    setResetLoading(true);
    setMessage('Configurando blocos oficiais...');

    const newCategories = [
      { name: 'Inteligência Artificial & Agentes', slug: 'ia-e-agentes', color_code: '#1a73e8', views: 0 },
      { name: 'Ciência & Fronteira Espacial', slug: 'ciencia-e-espaco', color_code: '#34A853', views: 0 },
      { name: 'Tech & Gaming', slug: 'tech-e-gaming', color_code: '#F4B400', views: 0 },
      { name: 'Cultura, Filosofia & Bem-Estar', slug: 'cultura-filosofia-bem-estar', color_code: '#ea580c', views: 0 },
      { name: 'Engenharia & Hardware', slug: 'engenharia-e-hardware', color_code: '#8e24aa', views: 0 },
      { name: 'Formiga em Foco & Sociedade', slug: 'formiga-em-foco', color_code: '#00897b', views: 0 }
    ];

    try {
      const { error: insertErr } = await supabase.from('categories').upsert(newCategories, { onConflict: 'slug' });

      if (insertErr) {
        throw new Error('Erro ao atualizar blocos: ' + insertErr.message);
      }

      setMessage('Blocos oficiais atualizados com sucesso!');
      router.refresh();

    } catch (err) {
      setMessage(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '32px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: '700' }}>
          <span className="material-icons-extended" style={{ color: '#34A853' }}>category</span> 
          Gerenciar Blocos e Editorias
        </h2>
        <button 
          onClick={handleSetupAdSense}
          disabled={resetLoading}
          style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: resetLoading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)' }}
        >
          <span className="material-icons-extended" style={{ fontSize: '18px' }}>monetization_on</span>
          {resetLoading ? 'Sincronizando...' : 'Sincronizar Blocos AdSense'}
        </button>
      </div>

      <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div>
          <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '6px', display: 'block' }}>
            Nome do Novo Bloco / Editoria:
          </label>
          <input 
            type="text" 
            placeholder="Ex: Economia & Negócios, Saúde Digital..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)' }} 
            required
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>Cor do Destaque:</label>
          <input 
            type="color" 
            value={colorCode}
            onChange={(e) => setColorCode(e.target.value)}
            style={{ width: '48px', height: '38px', padding: '0', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }} 
            required
          />
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{colorCode}</span>
        </div>

        {message && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '14px',
            fontWeight: '500',
            background: message.includes('sucesso') ? '#e6f4ea' : (message.includes('Erro') || message.includes('Preencha') ? '#fce8e6' : '#e8f0fe'),
            color: message.includes('sucesso') ? '#137333' : (message.includes('Erro') || message.includes('Preencha') ? '#c5221f' : '#1a73e8'),
          }}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: loading ? 'wait' : 'pointer', alignSelf: 'flex-start' }}
        >
          {loading ? 'Salvando...' : 'Adicionar Novo Bloco'}
        </button>
      </form>
    </div>
  );
}
