'use client';

import { useState, useEffect } from 'react';

export default function GamesBlock() {
  const [activeTab, setActiveTab] = useState('sudoku');
  const [isPlaying, setIsPlaying] = useState(false);

  // Reseta o estado isPlaying ao mudar de aba
  useEffect(() => {
    setIsPlaying(false);
  }, [activeTab]);

  const renderCover = (title, icon, description, bgGradient) => (
    <div style={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: bgGradient, color: 'white' }}>
      <span className="material-icons-extended" style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</span>
      <h4 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>{title}</h4>
      <p style={{ fontSize: '14px', marginBottom: '24px', maxWidth: '300px', textAlign: 'center', opacity: 0.9 }}>{description}</p>
      <button 
        onClick={() => setIsPlaying(true)} 
        style={{ padding: '12px 32px', fontSize: '16px', fontWeight: 'bold', background: 'white', color: '#333', border: 'none', borderRadius: '24px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Jogar Agora
      </button>
    </div>
  );

  return (
    <div id="passatempos" style={{ marginTop: '40px', border: '1px solid var(--gn-border)', borderRadius: '12px', background: 'var(--gn-surface)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gn-border)', display: 'flex', gap: '16px', background: 'var(--gn-search-bg)', flexWrap: 'wrap' }}>
        <h3 className="google-sans" style={{ fontSize: '18px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px', marginRight: 'auto' }}>
          <span className="material-icons-extended" style={{ color: '#EA4335' }}>extension</span>
          Passatempos Tech
        </h3>
        <button onClick={() => setActiveTab('sudoku')} style={{ background: 'none', border: 'none', color: activeTab === 'sudoku' ? '#1a73e8' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'sudoku' ? '600' : '400', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'sudoku' ? '2px solid #1a73e8' : '2px solid transparent', paddingBottom: '4px' }}>Sudoku</button>
        <button onClick={() => setActiveTab('termo')} style={{ background: 'none', border: 'none', color: activeTab === 'termo' ? '#1a73e8' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'termo' ? '600' : '400', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'termo' ? '2px solid #1a73e8' : '2px solid transparent', paddingBottom: '4px' }}>Termo</button>
        <button onClick={() => setActiveTab('cruzadas')} style={{ background: 'none', border: 'none', color: activeTab === 'cruzadas' ? '#1a73e8' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'cruzadas' ? '600' : '400', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'cruzadas' ? '2px solid #1a73e8' : '2px solid transparent', paddingBottom: '4px' }}>Palavras Cruzadas</button>
      </div>

      <div style={{ padding: '0', background: '#fff', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* SUDOKU */}
        {activeTab === 'sudoku' && (
          !isPlaying ? renderCover('Sudoku Clássico', 'grid_4x4', 'Teste seu raciocínio lógico completando o quadro com números de 1 a 9.', 'linear-gradient(135deg, #1a73e8, #4285F4)') :
          <iframe src="https://widget.websudoku.com/?level=1" style={{ width: '100%', height: '500px', border: 'none' }} title="Sudoku Widget" />
        )}
        
        {/* TERMO */}
        {activeTab === 'termo' && (
          !isPlaying ? renderCover('Termo', 'spellcheck', 'Descubra a palavra secreta de 5 letras. Um sucesso que testa seu vocabulário!', 'linear-gradient(135deg, #0f9d58, #34A853)') :
          <iframe src="https://term.ooo/" style={{ width: '100%', height: '600px', border: 'none' }} title="Termo" />
        )}

        {/* CRUZADAS */}
        {activeTab === 'cruzadas' && (
          !isPlaying ? renderCover('Palavras Cruzadas', 'grid_on', 'Desafie seus conhecimentos gerais completando as palavras cruzadas diárias.', 'linear-gradient(135deg, #fbbc05, #f09300)') :
          <iframe src="https://crosswordlabs.com/embed/brasil" style={{ width: '100%', height: '600px', border: 'none' }} title="Palavras Cruzadas" />
        )}
        
      </div>
    </div>
  );
}
