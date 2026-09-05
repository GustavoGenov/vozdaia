'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CIDADES = [
  { id: 'formiga', nome: 'Formiga, MG', lat: -20.4639, lon: -45.4264, regiao: 'Centro-Oeste MG', destaque: true },
  { id: 'bh', nome: 'Belo Horizonte, MG', lat: -19.9208, lon: -43.9378, regiao: 'Sudeste' },
  { id: 'sp', nome: 'São Paulo, SP', lat: -23.5489, lon: -46.6388, regiao: 'Sudeste' },
  { id: 'rj', nome: 'Rio de Janeiro, RJ', lat: -22.9068, lon: -43.1729, regiao: 'Sudeste' },
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
  if (codigo === 0) return { texto: 'Céu Limpo', icone: '☀️', gradiente: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' };
  if (codigo === 1) return { texto: 'Ensolarado c/ Nuvens', icone: '🌤️', gradiente: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' };
  if (codigo === 2) return { texto: 'Parcialmente Nublado', icone: '⛅', gradiente: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' };
  if (codigo === 3) return { texto: 'Encoberto / Nublado', icone: '☁️', gradiente: 'linear-gradient(135deg, #475569 0%, #334155 100%)' };
  if (codigo === 45 || codigo === 48) return { texto: 'Nevoeiro Denso', icone: '🌫️', gradiente: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' };
  if (codigo >= 51 && codigo <= 55) return { texto: 'Chuvisco Leve', icone: '🌦️', gradiente: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)' };
  if (codigo >= 61 && codigo <= 65) return { texto: 'Chuva Constante', icone: '🌧️', gradiente: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' };
  if (codigo >= 80 && codigo <= 82) return { texto: 'Pancadas de Chuva', icone: '⛈️', gradiente: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)' };
  if (codigo === 95 || codigo === 96 || codigo === 99) return { texto: 'Tempestade com Raios', icone: '⚡', gradiente: 'linear-gradient(135deg, #311042 0%, #180829 100%)' };
  return { texto: 'Instável', icone: '🌤️', gradiente: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' };
}

export default function ClimaPage() {
  const [selectedCidade, setSelectedCidade] = useState(CIDADES[0]);
  const [climaData, setClimaData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
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
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cidade.lat}&longitude=${cidade.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=7`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Falha ao conectar com o serviço meteorológico.');
      const data = await response.json();
      
      setClimaData(data.current);
      setDailyData(data.daily);
      
      if (data.hourly && data.hourly.time) {
        const now = new Date();
        const currentHourStr = now.toISOString().slice(0, 13);
        const startIndex = data.hourly.time.findIndex(t => t.startsWith(currentHourStr)) || 0;
        const next12Hours = data.hourly.time.slice(startIndex, startIndex + 12).map((time, idx) => ({
          time: new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          temp: Math.round(data.hourly.temperature_2m[startIndex + idx]),
          code: data.hourly.weather_code[startIndex + idx]
        }));
        setHourlyData(next12Hours);
      }
    } catch (err) {
      setError('Não foi possível carregar os dados meteorológicos no momento.');
    } finally {
      setLoading(false);
    }
  };

  const statusClima = climaData ? interpretarCodigoWMO(climaData.weather_code) : { texto: 'Carregando...', icone: '🌤️', gradiente: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' };

  return (
    <main className="main-content" style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Botão de Retorno */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'var(--gn-blue)', fontWeight: '600', fontSize: '14px' }}>
          <span className="material-icons-extended" style={{ fontSize: '18px' }}>arrow_back</span> Voltar para as Manchetes
        </Link>
      </div>

      {/* HEADER PRINCIPAL */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(14, 165, 233, 0.02) 100%)',
        border: '1px solid rgba(2, 132, 199, 0.2)',
        borderRadius: '16px',
        padding: '32px 24px',
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '14px' }}>
          <span className="material-icons-extended" style={{ fontSize: '16px' }}>radar</span>
          Monitoramento Meteorológico em Tempo Real
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text)', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
          Clima Tempo Brasil & Região de Formiga
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
          Previsão meteorológica de alta precisão com dados de satélite e radares atmosféricos para Formiga, Minas Gerais e capitais brasileiras.
        </p>
      </div>

      {/* SELETOR DE CIDADES EM CARDS ROLÁVEIS */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
          Selecione a Localidade:
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          {CIDADES.map(cidade => {
            const isSelected = selectedCidade.id === cidade.id;
            return (
              <button
                key={cidade.id}
                onClick={() => setSelectedCidade(cidade)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid #0284c7' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(2, 132, 199, 0.12)' : 'var(--card)',
                  color: isSelected ? '#0284c7' : 'var(--text)',
                  fontWeight: isSelected ? '700' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {cidade.destaque ? '📍' : '🏙️'} {cidade.nome}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <div style={{ padding: '24px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#991b1b', textAlign: 'center', margin: '32px 0' }}>
          <span className="material-icons-extended" style={{ fontSize: '32px', marginBottom: '8px' }}>cloud_off</span>
          <p style={{ margin: 0, fontWeight: '600' }}>{error}</p>
        </div>
      ) : (
        <>
          {/* CARD DE DESTAQUE DO CLIMA ATUAL */}
          <div style={{
            background: statusClima.gradiente,
            borderRadius: '20px',
            padding: '36px',
            color: '#ffffff',
            boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {selectedCidade.regiao} • Agora
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '4px 0 12px 0', letterSpacing: '-0.5px' }}>
                  {selectedCidade.nome}
                </h2>
                <div style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.95, fontWeight: '500' }}>
                  <span style={{ fontSize: '28px' }}>{statusClima.icone}</span>
                  <span>{statusClima.texto}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: 1, letterSpacing: '-2px' }}>
                  {climaData ? `${Math.round(climaData.temperature_2m)}°` : '--°'}
                </div>
                {climaData?.apparent_temperature && (
                  <div style={{ fontSize: '14px', opacity: 0.85, marginTop: '6px' }}>
                    Sensação térmica: {Math.round(climaData.apparent_temperature)}°C
                  </div>
                )}
              </div>
            </div>

            {/* BARRA DE DETALHES TÉCNICOS */}
            {climaData && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{ background: 'rgba(255,255,255,0.12)', padding: '14px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>💨 Vento</div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{Math.round(climaData.wind_speed_10m)} km/h</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.12)', padding: '14px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>💧 Umidade</div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{climaData.relative_humidity_2m}%</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.12)', padding: '14px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>🌧️ Precipitação</div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{climaData.precipitation || 0} mm</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.12)', padding: '14px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>📡 Atualização</div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>Em Tempo Real</div>
                </div>
              </div>
            )}
          </div>

          {/* PREVISÃO HORA A HORA (PRÓXIMAS 12 HORAS) */}
          {hourlyData && hourlyData.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-icons-extended" style={{ color: '#0284c7' }}>schedule</span>
                Previsão Hora a Hora
              </h3>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {hourlyData.map((item, idx) => {
                  const itemCond = interpretarCodigoWMO(item.code);
                  return (
                    <div 
                      key={idx}
                      style={{
                        padding: '16px 20px',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '14px',
                        textAlign: 'center',
                        minWidth: '90px',
                        boxShadow: 'var(--shadow)'
                      }}
                    >
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.time}</div>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{itemCond.icone}</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)' }}>{item.temp}°</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PREVISÃO PARA OS PRÓXIMOS 7 DIAS */}
          {dailyData && dailyData.time && (
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-icons-extended" style={{ color: '#0284c7' }}>calendar_month</span>
                Previsão para a Semana (7 Dias)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                {dailyData.time.map((dateStr, idx) => {
                  const date = new Date(dateStr + 'T12:00:00');
                  const diaSemana = idx === 0 ? 'Hoje' : date.toLocaleDateString('pt-BR', { weekday: 'short' });
                  const diaMes = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                  const cond = interpretarCodigoWMO(dailyData.weather_code[idx]);
                  const max = Math.round(dailyData.temperature_2m_max[idx]);
                  const min = Math.round(dailyData.temperature_2m_min[idx]);
                  const probChuva = dailyData.precipitation_probability_max ? dailyData.precipitation_probability_max[idx] : null;

                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '20px 14px',
                        background: idx === 0 ? 'rgba(2, 132, 199, 0.06)' : 'var(--card)',
                        border: idx === 0 ? '1.5px solid #0284c7' : '1px solid var(--border)',
                        borderRadius: '14px',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow)'
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '700', color: idx === 0 ? '#0284c7' : 'var(--text)', textTransform: 'capitalize' }}>
                        {diaSemana}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                        {diaMes}
                      </div>
                      <div style={{ fontSize: '32px', margin: '8px 0' }}>
                        {cond.icone}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {cond.texto}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px', fontSize: '14px', fontWeight: '600' }}>
                        <span style={{ color: '#ef4444' }}>{max}°</span>
                        <span style={{ color: 'var(--text-muted)' }}>/</span>
                        <span style={{ color: '#3b82f6' }}>{min}°</span>
                      </div>
                      {probChuva !== null && (
                        <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: '600', marginTop: '6px' }}>
                          💧 {probChuva}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

    </main>
  );
}
