'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [msg, setMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const { error } = await supabase.from('subscribers').insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // unique violation
        setMsg('Você já está inscrito!');
        setStatus('success');
      } else {
        setMsg('Ocorreu um erro. Tente novamente.');
        setStatus('error');
      }
    } else {
      setMsg('Inscrição confirmada com sucesso!');
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '40px 20px', textAlign: 'center', borderTop: '1px solid #dadce0', marginTop: '60px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '24px', color: '#202124', marginBottom: '12px' }}>Assine a Voz da I.A</h3>
        <p style={{ color: '#5f6368', marginBottom: '24px' }}>Receba as notícias mais recentes de I.A e tecnologia diretamente no seu e-mail.</p>
        
        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <input 
            type="email" 
            placeholder="Digite seu e-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px 16px', borderRadius: '4px', border: '1px solid #dadce0', fontSize: '16px', flex: 1, maxWidth: '350px' }}
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{ padding: '12px 24px', borderRadius: '4px', border: 'none', background: '#1a73e8', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {status === 'loading' ? 'Enviando...' : 'Inscrever'}
          </button>
        </form>

        {msg && (
          <div style={{ marginTop: '16px', color: status === 'error' ? '#d93025' : '#137333', fontWeight: '500' }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
