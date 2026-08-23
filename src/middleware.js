import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAgent = request.headers.get('x-agent-role') === 'gemini_spark_agent';
  const method = request.method;

  // Bloqueio imediato se o agente tentar métodos destrutivos ou de criação
  if (isAgent && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return NextResponse.json(
      { error: 'Acesso Negado: Agente possui permissão estrita de Somente-Leitura (Read-Only).' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

// Configuração para interceptar rotas de API
export const config = {
  matcher: '/api/:path*',
};