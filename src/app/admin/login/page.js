'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)', 
      padding: '24px',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '420px', 
        background: 'rgba(255, 255, 255, 0.96)', 
        padding: '40px 32px', 
        borderRadius: '20px', 
        boxShadow: '0 12px 40px rgba(0,0,0,0.3)', 
        border: '1px solid rgba(255,255,255,0.3)',
        textAlign: 'center' 
      }}>
        
        {/* Logo 3D */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <img 
            src="/simbolo.png" 
            alt="Símbolo Voz da I.A" 
            style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }} 
          />
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.3px' }}>
            Voz da I.A
          </h1>
        </Link>

        <h2 style={{ fontSize: '15px', color: '#475569', fontWeight: '600', marginBottom: '28px' }}>
          Painel de Controle Editorial
        </h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
              E-mail Administrativo
            </label>
            <input 
              type="email" 
              placeholder="seuemail@vozdaia.com" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                fontSize: '14px',
                outline: 'none',
                background: '#f8fafc'
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
              Senha de Acesso
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                fontSize: '14px',
                outline: 'none',
                background: '#f8fafc'
              }}
            />
          </div>
          
          {error && (
            <div style={{ color: '#dc2626', background: '#fee2e2', padding: '10px', borderRadius: '8px', fontSize: '13px', textAlign: 'left', fontWeight: '500' }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', 
              color: '#fff', 
              border: 'none', 
              padding: '14px', 
              borderRadius: '8px', 
              fontWeight: '700', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              marginTop: '8px',
              fontSize: '15px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            {loading ? 'Autenticando...' : 'Entrar no Painel'}
          </button>
        </form>
        
        <div style={{ marginTop: '28px', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span className="material-icons-extended" style={{ fontSize: '16px', color: '#10b981' }}>lock</span>
          <span>Ambiente Seguro & Autenticado (Supabase Auth)</span>
        </div>
      </div>
    </div>
  );
}
