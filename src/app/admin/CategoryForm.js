'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CategoryForm() {
  const [name, setName] = useState('');
  const [colorCode, setColorCode] = useState('#1a73e8');
  const [loading, setLoading] = useState(false);
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
    setMessage('Criando...');

    try {
      const slug = slugify(name);
      
      const { error: insertError } = await supabase.from('categories').insert([{
        name,
        slug,
        color_code: colorCode,
      }]);

      if (insertError) {
        throw new Error('Erro ao criar bloco: ' + insertError.message);
      }

      setMessage('Bloco criado com sucesso!');
      setName('');
      setColorCode('#1a73e8');
      
      // Atualiza a página para refletir o novo contador de categorias
      router.refresh();

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #dadce0', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', color: '#202124', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="material-icons-extended" style={{color: '#34A853'}}>category</span> Criar Novo Bloco (Filtro)
      </h2>
      <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <input 
          type="text" 
          placeholder="Nome do Bloco (ex: Esportes, Política)" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px' }} 
          required
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500' }}>Cor do Bloco:</label>
          <input 
            type="color" 
            value={colorCode}
            onChange={(e) => setColorCode(e.target.value)}
            style={{ width: '50px', height: '40px', padding: '0', border: '1px solid #dadce0', borderRadius: '4px', cursor: 'pointer' }} 
            required
          />
        </div>

        {message && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '14px',
            background: message.includes('sucesso') ? '#e6f4ea' : (message.includes('Erro') || message.includes('Preencha') ? '#fce8e6' : '#e8f0fe'),
            color: message.includes('sucesso') ? '#137333' : (message.includes('Erro') || message.includes('Preencha') ? '#c5221f' : '#1a73e8'),
          }}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ background: '#34A853', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '500', cursor: loading ? 'wait' : 'pointer' }}
        >
          {loading ? 'Salvando...' : 'Criar Bloco'}
        </button>
      </form>
    </div>
  );
}
