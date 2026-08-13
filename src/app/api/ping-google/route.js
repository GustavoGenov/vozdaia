export async function POST() {
  try {
    const hubUrl = 'https://pubsubhubbub.appspot.com/';
    const feedUrl = 'https://vozdaia.vercel.app/feed.xml';

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
      console.log('Ping para o Google Notícias concluído com sucesso!');
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const text = await response.text();
      console.error('Falha no ping do Google Notícias:', text);
      return new Response(JSON.stringify({ success: false, error: text }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.error('Erro na requisição de ping:', err.message);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
