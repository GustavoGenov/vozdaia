'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciais inválidas. Tente novamente.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f3f4', fontFamily: "'Roboto', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h1 className="google-sans" style={{ fontSize: '24px', color: '#202124', marginBottom: '8px' }}>
          <span style={{ color: '#4285F4' }}>Voz</span>
          <span style={{ color: '#EA4335' }}>da</span>
          <span style={{ color: '#FBBC05' }}>I.A</span> Admin
        </h1>
        <p style={{ color: '#5f6368', marginBottom: '32px' }}>Acesso restrito ao painel de comando.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="E-mail" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px' }}
          />
          <input 
            type="password" 
            placeholder="Senha" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px' }}
          />
          
          {error && <div style={{ color: '#d32f2f', fontSize: '13px', textAlign: 'left' }}>{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: '#1a73e8', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', 
              fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px' 
            }}
          >
            {loading ? 'Autenticando...' : 'Entrar no Painel'}
          </button>
        </form>
        
        <div style={{ marginTop: '32px', fontSize: '12px', color: '#9aa0a6' }}>
          <span className="material-icons-extended" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>lock</span>
          Conexão Segura Supabase
        </div>
      </div>
    </div>
  );
}
