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
        setMsg('Você já está inscrito em nossa newsletter!');
        setStatus('success');
      } else {
        setMsg('Ocorreu um erro ao processar. Tente novamente.');
        setStatus('error');
      }
    } else {
      setMsg('Inscrição confirmada com sucesso! Bem-vindo(a) ao Voz da I.A.');
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section className="newsletter-card" id="newsletter">
      <div>
        <h3>Receba a Voz da I.A no seu e-mail</h3>
        <p>Análise técnica sem pânico, notícias de Formiga e o melhor da inteligência artificial e ciência. 100% gratuito.</p>
        {msg && (
          <div style={{ marginTop: '12px', color: status === 'error' ? '#f87171' : '#4ade80', fontWeight: '600', fontSize: '14px' }}>
            {msg}
          </div>
        )}
      </div>

      <form className="newsletter-form" onSubmit={handleSubscribe}>
        <input 
          type="email" 
          placeholder="Seu melhor e-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando...' : 'Inscrever'}
        </button>
      </form>
    </section>
  );
}
