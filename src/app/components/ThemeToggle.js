'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: 40, height: 40 }} />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="menu-btn"
      title="Alternar Tema"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span className="material-icons-extended">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
