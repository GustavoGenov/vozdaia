'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PageTracker() {
  const pathname = usePathname();
  const tracked = useRef(new Set());

  useEffect(() => {
    // Evitar contar duas vezes a mesma rota na mesma sessão para evitar flood
    if (pathname && !tracked.current.has(pathname)) {
      tracked.current.add(pathname);
      
      // Insere silenciosamente no supabase
      supabase.from('page_views').insert([{ path: pathname }])
        .then(({ error }) => {
          if (error) console.error('Erro ao registrar visita:', error);
        });
    }
  }, [pathname]);

  return null;
}
