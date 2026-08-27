'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SIMBOLOS_SIGNOS = {
  aries: '♈', touro: '♉', gemeos: '♊', cancer: '♋',
  leao: '♌', virgem: '♍', libra: '♎', escorpiao: '♏',
  sagitario: '♐', capricornio: '♑', aquario: '♒', peixes: '♓'
};

export default function HoroscopoPage() {
  const [signos, setSignos] = useState([]);
  const [selectedSigno, setSelectedSigno] = useState(null);
  const [signoData, setSignoData] = useState(null);
  const [taroDoDia, setTaroDoDia] = useState(null);
  const [revelarCarta, setRevelarCarta] = useState(false);
  const [loadingSigno, setLoadingSigno] = useState(false);

  useEffect(() => {
    // Carrega dados iniciais da API
    fetch('/api/horoscopo')
      .then(res => res.json())
      .then(data => {
        setSignos(data.signos || []);
        setTaroDoDia(data.taroDoDia || null);
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
    <main className="main-content" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Voltar para Home */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#1a73e8', fontWeight: '500', fontSize: '14px' }}>
          <span className="material-icons-extended" style={{ fontSize: '18px' }}>arrow_back</span> Voltar para as Manchetes
        </Link>
      </div>

      {/* Header Místico */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0b2e 0%, #0d061f 100%)',
        border: '1px solid #3c1e70',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        marginBottom: '32px',
        boxShadow: '0 8px 32px rgba(13, 6, 31, 0.4)'
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(224, 64, 251, 0.1)',
          border: '1px solid #e040fb', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#e040fb', fontSize: '28px', marginBottom: '16px'
        }}>
          ✨
        </div>
        <h1 className="google-sans" style={{ fontSize: '28px', color: '#fff', margin: '0 0 8px 0', fontWeight: '700' }}>
          Horóscopo do Dia & Cartomancia
        </h1>
        <p style={{ color: '#b39ddb', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Orientações astrológicas e conselhos do Tarô gerados diariamente pela inteligência do jornal Voz da I.A para o seu bem-estar.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* Bloco 1: Seleção de Signos */}
        <section style={{ background: '#fff', border: '1px solid #dadce0', borderRadius: '12px', padding: '24px' }}>
          <h2 className="google-sans" style={{ fontSize: '18px', color: '#202124', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#e040fb' }}>auto_awesome</span> Selecione seu Signo
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {signos.map(s => (
              <button
                key={s.id}
                onClick={() => handleSelectSigno(s.id)}
                style={{
                  background: selectedSigno === s.id ? 'linear-gradient(135deg, #e040fb, #8e24aa)' : '#f8f9fa',
                  border: selectedSigno === s.id ? 'none' : '1px solid #dadce0',
                  borderRadius: '10px',
                  padding: '16px 8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: selectedSigno === s.id ? '#fff' : '#202124',
                  transition: 'all 0.2s',
                  boxShadow: selectedSigno === s.id ? '0 4px 12px rgba(224, 64, 251, 0.3)' : 'none'
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{SIMBOLOS_SIGNOS[s.id]}</div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{s.nome}</div>
                <div style={{ fontSize: '11px', color: selectedSigno === s.id ? 'rgba(255,255,255,0.8)' : '#5f6368', marginTop: '2px' }}>{s.periodo}</div>
              </button>
            ))}
          </div>

          {/* Previsão do Signo */}
          {selectedSigno && (
            <div style={{ borderTop: '1px solid #dadce0', paddingTop: '24px' }}>
              {loadingSigno ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <span className="material-icons-extended animate-spin" style={{ color: '#8e24aa', fontSize: '32px' }}>sync</span>
                  <p style={{ color: '#5f6368', marginTop: '12px' }}>Consultando astros...</p>
                </div>
              ) : signoData ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 className="google-sans" style={{ fontSize: '20px', color: '#202124', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Previsão para {signoData.signo}
                    </h3>
                    <span style={{ fontSize: '13px', background: '#f3e5f5', color: '#8e24aa', padding: '4px 12px', borderRadius: '20px', fontWeight: '500' }}>
                      Elemento: {signoData.elemento}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {/* Amor */}
                    <div style={{ padding: '16px', background: '#fff0f5', border: '1px solid #ffd1dc', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d81b60', fontWeight: '600', marginBottom: '8px' }}>
                        <span className="material-icons-extended">favorite</span> Amor
                      </div>
                      <p style={{ margin: 0, fontSize: '14px', color: '#4c2e35', lineHeight: '1.6' }}>{signoData.previsoes.amor}</p>
                    </div>

                    {/* Trabalho */}
                    <div style={{ padding: '16px', background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2e7d32', fontWeight: '600', marginBottom: '8px' }}>
                        <span className="material-icons-extended">work</span> Trabalho & Finanças
                      </div>
                      <p style={{ margin: 0, fontSize: '14px', color: '#1b431c', lineHeight: '1.6' }}>{signoData.previsoes.trabalho}</p>
                    </div>

                    {/* Saúde */}
                    <div style={{ padding: '16px', background: '#e1f5fe', border: '1px solid #b3e5fc', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0288d1', fontWeight: '600', marginBottom: '8px' }}>
                        <span className="material-icons-extended">medical_services</span> Saúde & Bem-estar
                      </div>
                      <p style={{ margin: 0, fontSize: '14px', color: '#0d3d56', lineHeight: '1.6' }}>{signoData.previsoes.saude}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </section>

        {/* Bloco 2: Cartomancia do Dia */}
        <section style={{
          background: 'linear-gradient(135deg, #0d061f 0%, #15092f 100%)',
          border: '1px solid #3c1e70',
          borderRadius: '12px',
          padding: '24px',
          color: '#fff',
          textAlign: 'center'
        }}>
          <h2 className="google-sans" style={{ fontSize: '18px', color: '#fff', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <span className="material-icons-extended" style={{ color: '#e040fb' }}>playing_cards</span> Cartomancia (O Tarô do Dia)
          </h2>
          
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            {!revelarCarta ? (
              <div style={{ padding: '20px 0' }}>
                {/* Costas da Carta */}
                <button
                  onClick={() => setRevelarCarta(true)}
                  style={{
                    width: '150px',
                    height: '240px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #311b92 0%, #1a0c4d 100%)',
                    border: '3px solid #ffb300',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(224, 64, 251, 0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.6), 0 0 25px rgba(224, 64, 251, 0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(224, 64, 251, 0.2)';
                  }}
                >
                  <div style={{ width: '80%', height: '88%', border: '1px dashed rgba(255, 179, 0, 0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '42px', color: '#ffb300' }}>👁️</span>
                  </div>
                </button>
                <p style={{ color: '#b39ddb', fontSize: '13px', marginTop: '16px' }}>Clique na carta acima para fazer a sua leitura diária.</p>
              </div>
            ) : taroDoDia ? (
              <div style={{
                animation: 'fadeIn 0.6s ease-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <style>{`
                  @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                  }
                `}</style>

                {/* Frente da Carta Revelada */}
                <div style={{
                  width: '150px',
                  height: '240px',
                  borderRadius: '12px',
                  background: '#fff',
                  border: '3px solid #ffb300',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  color: '#1a0c4d',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  marginBottom: '20px',
                  position: 'relative'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#ffb300' }}>Tarô Diário</div>
                  <div style={{ fontSize: '48px', margin: '16px 0' }}>🔮</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', textAlign: 'center', color: '#311b92' }}>{taroDoDia.nome}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '16px', textAlign: 'left', width: '100%' }}>
                  <div style={{ fontSize: '13px', color: '#e040fb', fontWeight: '600', marginBottom: '4px' }}>Significado Geral:</div>
                  <div style={{ fontSize: '14px', color: '#e0e0e0', marginBottom: '12px', lineHeight: '1.5' }}>{taroDoDia.significado}</div>
                  
                  <div style={{ fontSize: '13px', color: '#ffb300', fontWeight: '600', marginBottom: '4px' }}>Conselho do Tarô:</div>
                  <div style={{ fontSize: '14px', color: '#ffecb3', lineHeight: '1.5', fontStyle: 'italic' }}>&ldquo;{taroDoDia.conselho}&rdquo;</div>
                </div>

                <button
                  onClick={() => setRevelarCarta(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#b39ddb',
                    padding: '6px 16px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    marginTop: '16px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                >
                  Girar de volta / Embaralhar
                </button>
              </div>
            ) : null}
          </div>
        </section>

      </div>

      {/* DISCLAIMER DE ENTRETENIMENTO (COMPLIANCE ADSENSE) */}
      <div style={{ marginTop: '40px', padding: '16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
          <strong>Nota Editorial:</strong> A seção de Horóscopo e Tarô do Voz da I.A possui caráter estritamente de entretenimento e reflexão cultural. Não oferecemos previsões infalíveis ou aconselhamento profissional. As leituras são geradas com base em arquétipos tradicionais para fins lúdicos.
        </p>
      </div>

    </main>
  );
}
