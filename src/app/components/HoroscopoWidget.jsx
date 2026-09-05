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

export default function HoroscopoWidget() {
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

  return (
    <div style={{ maxWidth: '1000px', margin: '32px auto', padding: '0' }}>
      
      {/* HEADER MÍSTICO */}
      <div style={{
        background: 'linear-gradient(135deg, #1e0836 0%, #0f041d 100%)',
        border: '1px solid #4c1d95',
        borderRadius: '16px',
        padding: '28px 20px',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(15, 4, 29, 0.4)',
        color: '#ffffff'
      }}>
        <div style={{
          width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.15)',
          border: '1px solid #c084fc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#e879f9', fontSize: '24px', marginBottom: '12px'
        }}>
          ✨
        </div>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
          Astrologia & Tarô
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.3px', color: '#fff' }}>
          Horóscopo do Dia & Tarô
        </h2>
        <p style={{ color: '#d8b4fe', fontSize: '14px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
          A sabedoria dos astros e a mensagem do arcano diário para inspirar o seu dia.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Bloco 1: Signos */}
        <section style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow)'
        }}>
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🪐</span> Escolha o seu Signo
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(65px, 1fr))', gap: '6px', marginBottom: '20px' }}>
            {signos.map((s) => {
              const isSelected = selectedSigno === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSigno(s.id)}
                  style={{
                    padding: '10px 4px',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #a855f7' : '1px solid var(--border)',
                    background: isSelected ? 'rgba(168, 85, 247, 0.12)' : 'var(--bg)',
                    color: isSelected ? '#a855f7' : 'var(--text)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    boxShadow: isSelected ? '0 4px 10px rgba(168, 85, 247, 0.2)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>{SIMBOLOS_SIGNOS[s.id] || '✨'}</span>
                  <span style={{ fontSize: '11px', fontWeight: '700' }}>{s.nome}</span>
                </button>
              );
            })}
          </div>

          {loadingSigno ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '13px' }}>
              Carregando previsões...
            </div>
          ) : signoData && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'rgba(168, 85, 247, 0.08)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{SIMBOLOS_SIGNOS[selectedSigno]}</span> {signoData.signo}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{signoData.periodo}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px 14px', background: 'rgba(244, 63, 94, 0.06)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '10px' }}>
                  <div style={{ color: '#e11d48', fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>❤️ Amor</div>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text)', lineHeight: '1.5' }}>{signoData.previsoes.amor}</p>
                </div>
                <div style={{ padding: '12px 14px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px' }}>
                  <div style={{ color: '#059669', fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>💼 Trabalho</div>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text)', lineHeight: '1.5' }}>{signoData.previsoes.trabalho}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Bloco 2: Tarô */}
        <section style={{
          background: 'linear-gradient(135deg, #120424 0%, #1a0833 100%)',
          border: '1px solid #4c1d95',
          borderRadius: '16px',
          padding: '24px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <span>🔮</span> Tarô do Dia
          </h3>

          {!revelarCarta ? (
            <div style={{ padding: '16px 0' }}>
              <button
                onClick={() => setRevelarCarta(true)}
                style={{
                  width: '140px',
                  height: '220px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b0764 0%, #1e053a 100%)',
                  border: '3px solid #f59e0b',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  transition: 'transform 0.2s'
                }}
              >
                <span style={{ fontSize: '42px', marginBottom: '8px' }}>🃏</span>
                <span style={{ fontSize: '11px', color: '#fcd34d', fontWeight: '700', textTransform: 'uppercase' }}>Revelar</span>
              </button>
              <p style={{ color: '#d8b4fe', fontSize: '12px', marginTop: '12px' }}>Clique para tirar a carta do dia.</p>
            </div>
          ) : taroDoDia ? (
            <div>
              <div style={{
                width: '140px',
                height: '210px',
                borderRadius: '12px',
                background: '#fff',
                border: '3px solid #f59e0b',
                color: '#1e053a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                margin: '0 auto 16px auto'
              }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#d97706', textTransform: 'uppercase' }}>Arcano</div>
                <div style={{ fontSize: '44px' }}>🔮</div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#4c1d95', textTransform: 'uppercase' }}>{taroDoDia.nome}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px', textAlign: 'left', fontSize: '13px', color: '#f3e8ff' }}>
                <p style={{ margin: '0 0 8px 0', lineHeight: '1.4' }}>{taroDoDia.significado}</p>
                <div style={{ color: '#fcd34d', fontStyle: 'italic' }}>&ldquo;{taroDoDia.conselho}&rdquo;</div>
              </div>

              <button
                onClick={() => setRevelarCarta(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  color: '#d8b4fe',
                  padding: '6px 14px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginTop: '12px'
                }}
              >
                Tirar Novamente
              </button>
            </div>
          ) : null}
        </section>

      </div>
    </div>
  );
}
