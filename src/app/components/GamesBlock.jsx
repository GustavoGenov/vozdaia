'use client';

import { useState } from 'react';

export default function GamesBlock() {
  const [activeTab, setActiveTab] = useState('sudoku');

  return (
    <div id="passatempos" style={{ marginTop: '40px', border: '1px solid var(--gn-border)', borderRadius: '12px', background: 'var(--gn-surface)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gn-border)', display: 'flex', gap: '16px', background: 'var(--gn-search-bg)', flexWrap: 'wrap' }}>
        <h3 className="google-sans" style={{ fontSize: '18px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px', marginRight: 'auto' }}>
          <span className="material-icons-extended" style={{ color: '#EA4335' }}>extension</span>
          Passatempos
        </h3>
        <button onClick={() => setActiveTab('sudoku')} style={{ background: 'none', border: 'none', color: activeTab === 'sudoku' ? '#1a73e8' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'sudoku' ? '600' : '400', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'sudoku' ? '2px solid #1a73e8' : '2px solid transparent', paddingBottom: '4px' }}>Sudoku</button>
        <button onClick={() => setActiveTab('cruzadas')} style={{ background: 'none', border: 'none', color: activeTab === 'cruzadas' ? '#1a73e8' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'cruzadas' ? '600' : '400', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'cruzadas' ? '2px solid #1a73e8' : '2px solid transparent', paddingBottom: '4px' }}>Cruzadinhas</button>
        <button onClick={() => setActiveTab('7erros')} style={{ background: 'none', border: 'none', color: activeTab === '7erros' ? '#1a73e8' : 'var(--gn-text-secondary)', fontWeight: activeTab === '7erros' ? '600' : '400', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === '7erros' ? '2px solid #1a73e8' : '2px solid transparent', paddingBottom: '4px' }}>7 Erros</button>
      </div>

      <div style={{ padding: '0', background: '#fff', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {activeTab === 'sudoku' && (
          <iframe 
            src="https://widget.websudoku.com/?level=1" 
            style={{ width: '100%', height: '500px', border: 'none' }}
            title="Sudoku Widget"
          />
        )}
        
        {activeTab === 'cruzadas' && (
          <div style={{ width: '100%', height: '500px', overflow: 'hidden', position: 'relative' }}>
            <iframe 
              src="https://rachacuca.com.br/palavras-cruzadas/" 
              style={{ width: '100%', height: '800px', border: 'none', marginTop: '-180px' }}
              title="Palavras Cruzadas"
              scrolling="no"
            />
          </div>
        )}
        
        {activeTab === '7erros' && (
          <iframe 
            src="https://play.famobi.com/spot-the-difference" 
            style={{ width: '100%', height: '500px', border: 'none' }}
            title="Jogo dos 7 Erros"
          />
        )}
      </div>
    </div>
  );
}
