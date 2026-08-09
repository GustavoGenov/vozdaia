'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PageTracker({ articleId, categoryId }) {
  const pathname = usePathname();
  const tracked = useRef(new Set());

  useEffect(() => {
    // Evitar contar duas vezes a mesma rota na mesma sessão para evitar flood
    if (pathname && !tracked.current.has(pathname)) {
      tracked.current.add(pathname);
      
      // 1. Registro Global de Visitas (Oculto)
      supabase.from('page_views').insert([{ path: pathname }])
        .then(({ error }) => {
          if (error) console.error('Erro ao registrar visita geral:', error);
        });
        
      // 2. Incrementar contador de Artigo (se aplicável)
      if (articleId) {
        supabase.rpc('increment_article_views', { row_id: articleId })
          .then(({ error }) => {
            if (error) console.error('Erro ao registrar visita na matéria:', error);
          });
      }
      
      // 3. Incrementar contador de Categoria (se aplicável)
      if (categoryId) {
        supabase.rpc('increment_category_views', { row_id: categoryId })
          .then(({ error }) => {
            if (error) console.error('Erro ao registrar visita no bloco:', error);
          });
      }
    }
  }, [pathname, articleId, categoryId]);

  return null;
}
