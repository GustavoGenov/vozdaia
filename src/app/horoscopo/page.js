'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SIMBOLOS_SIGNOS = {
  aries: '♈', touro: '♉', gemeos: '♊', cancer: '♋',
  leao: '♌', virgem: '♍', libra: '♎', escorpiao: '♏',
  sagitario: '♐', capricornio: '♑', aquario: '♒', peixes: '♓'
};

const CORES_ELEMENTOS = {
  Fogo: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
  Terra: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' },
  Ar: { bg: 'rgba(14, 165, 233, 0.1)', text: '#0ea5e9', border: 'rgba(14, 165, 233, 0.3)' },
  Água: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' }
};

export default function HoroscopoPage() {
  const [signos, setSignos] = useState([]);
  const [selectedSigno, setSelectedSigno] = useState('aries');
  const [signoData, setSignoData] = useState(null);
  const [taroDoDia, setTaroDoDia] = useState(null);
  const [revelarCarta, setRevelarCarta] = useState(false);
  const [loadingSigno, setLoadingSigno] = useState(false);

  useEffect(() => {
    fetch('/api/horoscopo')
      .then(res => res.json())
      .then(data => {
        setSignos(data.signos || []);
        setTaroDoDia(data.taroDoDia || null);
        if (data.signos && data.signos.length > 0) {
          handleSelectSigno('aries');
        }
      })
      .catch(err => console.error('Erro ao carregar horóscopo:', err));
  }, []);

  const handleSelectSigno = (signoId) => {
    setSelectedSigno(signoId);
    setLoadingSigno(true);
    fetch(`/api/horoscopo?signo=${signoId}`)
      .then(res => res.json())
      .then(data => {
        setSignoData(data);
        setLoadingSigno(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingSigno(false);
      });
  };

  const hojeFormatado = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="main-content" style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Botão de Retorno */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#a855f7', fontWeight: '600', fontSize: '14px' }}>
          <span className="material-icons-extended" style={{ fontSize: '18px' }}>arrow_back</span> Voltar para as Manchetes
        </Link>
      </div>

      {/* HEADER MÍSTICO */}
      <div style={{
        background: 'linear-gradient(135deg, #1e0836 0%, #0f041d 100%)',
        border: '1px solid #4c1d95',
        borderRadius: '20px',
        padding: '36px 24px',
        textAlign: 'center',
        marginBottom: '36px',
        boxShadow: '0 12px 36px rgba(15, 4, 29, 0.4)',
        color: '#ffffff'
      }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.15)',
          border: '1.5px solid #c084fc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#e879f9', fontSize: '32px', marginBottom: '16px'
        }}>
          ✨
        </div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          Astrologia, Cartomancia & Sabedoria Ancestral
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
          Horóscopo Diário & Tarô do Dia
        </h1>
        <p style={{ color: '#d8b4fe', fontSize: '15px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
          Previsões astrológicas para os 12 signos do zodíaco e a mensagem do arcano diário para orientar suas decisões em {hojeFormatado}.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        
        {/* COLUNA 1: HORÓSCOPO DOS 12 SIGNOS */}
        <section style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: 'var(--shadow)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🪐</span> Escolha o seu Signo
          </h2>

          {/* GRADE DOS 12 SIGNOS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '8px', marginBottom: '24px' }}>
            {signos.map((s) => {
              const isSelected = selectedSigno === s.id;
              const elementoEstilo = CORES_ELEMENTOS[s.elemento] || CORES_ELEMENTOS.Fogo;

              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSigno(s.id)}
                  style={{
                    padding: '12px 6px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #a855f7' : '1px solid var(--border)',
                    background: isSelected ? 'rgba(168, 85, 247, 0.12)' : 'var(--bg)',
                    color: isSelected ? '#a855f7' : 'var(--text)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: isSelected ? '0 4px 12px rgba(168, 85, 247, 0.25)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>{SIMBOLOS_SIGNOS[s.id] || '✨'}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700' }}>{s.nome}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{s.elemento}</span>
                </button>
              );
            })}
          </div>

          {/* PREVISÃO DETALHADA DO SIGNO SELECIONADO */}
          {loadingSigno ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <span className="material-icons-extended" style={{ fontSize: '32px', animation: 'spin 1s infinite' }}>refresh</span>
              <p style={{ marginTop: '8px', fontSize: '14px' }}>Consultando as constelações...</p>
            </div>
          ) : signoData && (
            <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(192, 132, 252, 0.04) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                borderRadius: '14px',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{SIMBOLOS_SIGNOS[selectedSigno]}</span> {signoData.signo}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Período: {signoData.periodo}
                  </div>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  background: CORES_ELEMENTOS[signoData.elemento]?.bg || 'rgba(168, 85, 247, 0.1)',
                  color: CORES_ELEMENTOS[signoData.elemento]?.text || '#a855f7',
                  border: `1px solid ${CORES_ELEMENTOS[signoData.elemento]?.border || 'rgba(168, 85, 247, 0.3)'}`
                }}>
                  Elemento {signoData.elemento}
                </span>
              </div>

              {/* CARDS DE PREVISÃO SETORIAL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Amor */}
                <div style={{ padding: '16px', background: 'rgba(244, 63, 94, 0.06)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                    <span className="material-icons-extended" style={{ fontSize: '18px' }}>favorite</span> 
                    Amor & Relacionamentos
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', lineHeight: '1.6' }}>
                    {signoData.previsoes.amor}
                  </p>
                </div>

                {/* Trabalho */}
                <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                    <span className="material-icons-extended" style={{ fontSize: '18px' }}>work</span> 
                    Trabalho & Finanças
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', lineHeight: '1.6' }}>
                    {signoData.previsoes.trabalho}
                  </p>
                </div>

                {/* Saúde */}
                <div style={{ padding: '16px', background: 'rgba(14, 165, 233, 0.06)', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                    <span className="material-icons-extended" style={{ fontSize: '18px' }}>spa</span> 
                    Saúde & Energia Vital
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', lineHeight: '1.6' }}>
                    {signoData.previsoes.saude}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* COLUNA 2: CARTOMANCIA & TARÔ DO DIA */}
        <section style={{
          background: 'linear-gradient(135deg, #120424 0%, #1a0833 100%)',
          border: '1px solid #4c1d95',
          borderRadius: '16px',
          padding: '28px',
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <span>🔮</span> O Arcano de Hoje (Tarô)
          </h2>

          <div style={{ maxWidth: '360px', margin: '0 auto' }}>
            {!revelarCarta ? (
              <div style={{ padding: '24px 0' }}>
                <button
                  onClick={() => setRevelarCarta(true)}
                  style={{
                    width: '160px',
                    height: '250px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #3b0764 0%, #1e053a 100%)',
                    border: '3px solid #f59e0b',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    margin: '0 auto'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)';
                    e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.7), 0 0 30px rgba(245, 158, 11, 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.3)';
                  }}
                >
                  <div style={{ width: '84%', height: '88%', border: '1px dashed rgba(245, 158, 11, 0.5)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '48px' }}>🃏</span>
                    <span style={{ fontSize: '11px', color: '#fcd34d', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Toque p/ Revelar
                    </span>
                  </div>
                </button>
                <p style={{ color: '#d8b4fe', fontSize: '13px', marginTop: '18px', lineHeight: '1.5' }}>
                  Concentre-se em sua pergunta ou intenção e clique na carta acima para ler a mensagem do dia.
                </p>
              </div>
            ) : taroDoDia ? (
              <div style={{ animation: 'fadeIn 0.5s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* FRENTE DA CARTA REVELADA */}
                <div style={{
                  width: '160px',
                  height: '250px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '3px solid #f59e0b',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
                  color: '#1e053a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  marginBottom: '20px',
                  margin: '0 auto 20px auto'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#d97706' }}>
                    Arcano do Dia
                  </div>
                  <div style={{ fontSize: '52px', margin: '8px 0' }}>🔮</div>
                  <div style={{ fontSize: '15px', fontWeight: '800', textTransform: 'uppercase', textAlign: 'center', color: '#4c1d95', lineHeight: 1.2 }}>
                    {taroDoDia.nome}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '18px', textAlign: 'left', width: '100%' }}>
                  <div style={{ fontSize: '13px', color: '#c084fc', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Significado & Simbolismo:
                  </div>
                  <div style={{ fontSize: '14px', color: '#f3e8ff', marginBottom: '14px', lineHeight: '1.6' }}>
                    {taroDoDia.significado}
                  </div>
                  
                  <div style={{ fontSize: '13px', color: '#fcd34d', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Conselho do Oráculo:
                  </div>
                  <div style={{ fontSize: '14px', color: '#fef3c7', lineHeight: '1.6', fontStyle: 'italic', background: 'rgba(245, 158, 11, 0.08)', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                    &ldquo;{taroDoDia.conselho}&rdquo;
                  </div>
                </div>

                <button
                  onClick={() => setRevelarCarta(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '20px',
                    color: '#d8b4fe',
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '20px',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.color = '#d8b4fe';
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '16px' }}>restart_alt</span>
                  Embaralhar & Tirar Novamente
                </button>
              </div>
            ) : null}
          </div>
        </section>

      </div>
    </main>
  );
}
