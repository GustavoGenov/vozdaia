import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  // 1. Redirecionamento Canônico: Forçar domínio oficial para SEO e corrigir duplicidade Google (Soft 404)
  if (host.includes('vercel.app')) {
    const canonicalUrl = new URL(url.pathname + url.search, 'https://vozdaia.com');
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // 2. Proteção de Agentes (existente)
  const isAgent = request.headers.get('x-agent-role') === 'gemini_spark_agent';
  const method = request.method;

  if (isAgent && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return NextResponse.json(
      { error: 'Acesso Negado: Agente possui permissão estrita de Somente-Leitura (Read-Only).' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

// Configuração para interceptar TODAS as rotas, não apenas /api
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};