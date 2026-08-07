import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';
import Link from 'next/link';

export default async function EditArticlePage({ params }) {
  const { id } = await params;

  // Busca os dados do artigo
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (!article) {
    notFound();
  }

  // Busca categorias para o select
  const { data: categories } = await supabase.from('categories').select('*');

  return (
    <div style={{ padding: '24px', maxWidth: '1080px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1a73e8', textDecoration: 'none', fontWeight: '500' }}>
          <span className="material-icons-extended">arrow_back</span>
          Voltar para o Painel
        </Link>
      </div>
      
      <h1 style={{ fontSize: '28px', color: '#202124', marginBottom: '8px' }}>Editar Reportagem</h1>
      <p style={{ color: '#5f6368', marginBottom: '32px' }}>Atualize as informações da notícia abaixo.</p>

      <EditForm article={article} categories={categories} />
    </div>
  );
}
