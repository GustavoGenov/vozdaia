import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Verificar token simples de segurança ou permissão de admin
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-cron-secret');
    const validSecret = process.env.CRON_SECRET || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (process.env.NODE_ENV === 'production' && validSecret) {
      if (cronSecret !== validSecret && authHeader !== `Bearer ${validSecret}`) {
        return NextResponse.json(
          { error: 'Não autorizado. Chave de disparo inválida.' },
          { status: 401 }
        );
      }
    }

    const hubUrl = 'https://pubsubhubbub.appspot.com/';
    const feedUrl = 'https://vozdaia.com/feed.xml';

    const params = new URLSearchParams();
    params.append('hub.mode', 'publish');
    params.append('hub.url', feedUrl);

    console.log('Disparando ping PubSubHubbub para o Google Notícias...');

    const response = await fetch(hubUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Ping para Google Notícias concluído com sucesso!' }, { status: 200 });
    } else {
      const text = await response.text();
      return NextResponse.json({ success: false, error: text }, { status: response.status });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
