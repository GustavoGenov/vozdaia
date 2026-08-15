'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CIDADES = [
  { id: 'sp', nome: 'São Paulo, SP', lat: -23.5489, lon: -46.6388, regiao: 'Sudeste' },
  { id: 'rj', nome: 'Rio de Janeiro, RJ', lat: -22.9068, lon: -43.1729, regiao: 'Sudeste' },
  { id: 'bh', nome: 'Belo Horizonte, MG', lat: -19.9208, lon: -43.9378, regiao: 'Sudeste' },
  { id: 'vix', nome: 'Vitória, ES', lat: -20.3155, lon: -40.3128, regiao: 'Sudeste' },
  { id: 'bsb', nome: 'Brasília, DF', lat: -15.7801, lon: -47.9292, regiao: 'Centro-Oeste' },
  { id: 'cwb', nome: 'Curitiba, PR', lat: -25.4284, lon: -49.2733, regiao: 'Sul' },
  { id: 'poa', nome: 'Porto Alegre, RS', lat: -30.0346, lon: -51.2177, regiao: 'Sul' },
  { id: 'ssa', nome: 'Salvador, BA', lat: -12.9714, lon: -38.5014, regiao: 'Nordeste' },
  { id: 'rec', nome: 'Recife, PE', lat: -8.0476, lon: -34.8770, regiao: 'Nordeste' },
  { id: 'for', nome: 'Fortaleza, CE', lat: -3.7172, lon: -38.5431, regiao: 'Nordeste' },
  { id: 'mao', nome: 'Manaus, AM', lat: -3.1019, lon: -60.0250, regiao: 'Norte' },
  { id: 'bel', nome: 'Belém, PA', lat: -1.4558, lon: -48.5044, regiao: 'Norte' },
];

function interpretarCodigoWMO(codigo) {
  if (codigo === 0) return { texto: 'Céu Limpo', icone: '☀️' };
  if (codigo === 1) return { texto: 'Maior Parte Claro', icone: '🌤️' };
  if (codigo === 2) return { texto: 'Parcialmente Nublado', icone: '⛅' };
  if (codigo === 3) return { texto: 'Nublado', icone: '☁️' };
  if (codigo === 45 || codigo === 48) return { texto: 'Nevoeiro', icone: '🌫️' };
  if (codigo >= 51 && codigo <= 55) return { texto: 'Chuvisco', icone: '🌧️' };
  if (codigo >= 61 && codigo <= 65) return { texto: 'Chuva', icone: '🌧️' };
  if (codigo >= 80 && codigo <= 82) return { texto: 'Pancadas de Chuva', icone: '🌦️' };
  if (codigo === 95 || codigo === 96 || codigo === 99) return { texto: 'Trovoada', icone: '⛈️' };
  return { texto: 'Instável', icone: '🌡️' };
}

export default function ClimaPage() {
  const [selectedCidade, setSelectedCidade] = useState(CIDADES[0]); // Padrão: SP
  const [climaData, setClimaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCidade) {
      buscarClima(selectedCidade);
    }
  }, [selectedCidade]);

  const buscarClima = async (cidade) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cidade.lat}&longitude=${cidade.lon}&current_weather=true&timezone=America%2FSao_Paulo`);
      if (!response.ok) throw new Error('Falha ao buscar dados climáticos.');
      const data = await response.json();
      setClimaData(data.current_weather);
    } catch (err) {
      setError('Não foi possível carregar o clima no momento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCidade = (cidadeId) => {
    const cidade = CIDADES.find(c => c.id === cidadeId);
    if (cidade) setSelectedCidade(cidade);
  };

  return (
    <main className="main-content" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Voltar para Home */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#1a73e8', fontWeight: '500', fontSize: '14px' }}>
          <span className="material-icons-extended" style={{ fontSize: '18px' }}>arrow_back</span> Voltar para as Manchetes
        </Link>
      </div>

      {/* Header do Clima */}
      <div style={{
        background: 'linear-gradient(135deg, #00796b 0%, #004d40 100%)',
        border: '1px solid #004d40',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        marginBottom: '32px',
        boxShadow: '0 8px 32px rgba(0, 77, 64, 0.4)'
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 188, 212, 0.2)',
          border: '1px solid #00bcd4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#00bcd4', fontSize: '28px', marginBottom: '16px'
        }}>
          🌤️
        </div>
        <h1 className="google-sans" style={{ fontSize: '28px', color: '#fff', margin: '0 0 8px 0', fontWeight: '700' }}>
          Clima Tempo em Tempo Real
        </h1>
        <p style={{ color: '#b2dfdb', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Confira a previsão do tempo para as principais capitais do Brasil, com atualizações automáticas via satélite.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* Bloco 1: Resultados do Clima */}
        <section style={{
          background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
          border: '1px solid #80deea',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          {loading ? (
             <div style={{ textAlign: 'center', padding: '40px' }}>
               <span className="material-icons-extended animate-spin" style={{ color: '#0097a7', fontSize: '32px' }}>sync</span>
               <p style={{ color: '#006064', marginTop: '12px', fontWeight: '500' }}>Sincronizando com satélite...</p>
             </div>
          ) : error ? (
            <div style={{ color: '#d32f2f', padding: '20px', fontWeight: '500' }}>
              <span className="material-icons-extended" style={{ fontSize: '32px', marginBottom: '8px' }}>error_outline</span>
              <p>{error}</p>
            </div>
          ) : climaData ? (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <h2 className="google-sans" style={{ fontSize: '24px', color: '#006064', margin: '0 0 8px 0' }}>
                {selectedCidade.nome}
              </h2>
              <span style={{ fontSize: '13px', background: '#00838f', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontWeight: '500' }}>
                Região {selectedCidade.regiao}
              </span>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', margin: '32px 0' }}>
                <div style={{ fontSize: '80px', textShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  {interpretarCodigoWMO(climaData.weathercode).icone}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '56px', fontWeight: '700', color: '#004d40', lineHeight: '1' }}>
                    {Math.round(climaData.temperature)}°C
                  </div>
                  <div style={{ fontSize: '18px', color: '#006064', fontWeight: '500', marginTop: '8px' }}>
                    {interpretarCodigoWMO(climaData.weathercode).texto}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', color: '#006064', fontWeight: '500' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-icons-extended">air</span>
                  Ventos: {climaData.windspeed} km/h
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-icons-extended">schedule</span>
                  Atualizado agora
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {/* Bloco 2: Seleção de Cidades */}
        <section style={{ background: '#fff', border: '1px solid #dadce0', borderRadius: '12px', padding: '24px' }}>
          <h2 className="google-sans" style={{ fontSize: '18px', color: '#202124', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#00bcd4' }}>location_on</span> Escolha sua Cidade
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '12px'
          }}>
            {CIDADES.map(c => (
              <button
                key={c.id}
                onClick={() => handleSelectCidade(c.id)}
                style={{
                  background: selectedCidade.id === c.id ? '#00bcd4' : '#f8f9fa',
                  border: selectedCidade.id === c.id ? '1px solid #00bcd4' : '1px solid #dadce0',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: selectedCidade.id === c.id ? '#fff' : '#202124',
                  transition: 'all 0.2s',
                  fontWeight: selectedCidade.id === c.id ? '600' : '500',
                  boxShadow: selectedCidade.id === c.id ? '0 4px 10px rgba(0, 188, 212, 0.3)' : 'none'
                }}
              >
                {c.nome.split(',')[0]}
              </button>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
