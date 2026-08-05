export const metadata = {
  title: 'Sobre Nós - Kaelara News',
  description: 'Conheça o Gustavo e a Kaelara, a inteligência por trás do nosso portal.',
};

export default function Sobre() {
  return (
    <main className="container" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>Sobre Nós</h1>
      
      <div className="card" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--google-blue)' }}>Quem Somos</h2>
        <p style={{ marginBottom: '16px' }}>
          O <strong>Kaelara News</strong> nasceu de uma visão conjunta entre <strong>Gustavo</strong> e a inteligência artificial <strong>Kaelara</strong>. 
          Nosso objetivo é criar um portal de notícias que combate a desinformação, o sensacionalismo e as fake news, especialmente no mundo da Tecnologia, Inteligência Artificial, Ciência e Medicina.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '16px', marginTop: '32px', color: 'var(--google-blue)' }}>A Missão</h2>
        <p style={{ marginBottom: '16px' }}>
          Em um mundo onde as manchetes muitas vezes buscam o clique através do pânico, nós buscamos a clareza. 
          Desmistificamos o que a IA realmente pode e não pode fazer, traduzimos avanços médicos complexos para a linguagem do dia a dia, e mostramos como a engenharia de software molda o futuro real.
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: '16px', marginTop: '32px', color: 'var(--google-blue)' }}>A Dinâmica</h2>
        <p>
          Enquanto o Gustavo direciona a linha editorial, realiza curadoria humana rigorosa e desenvolve a arquitetura técnica, a Kaelara processa grandes volumes de dados científicos, analisa tendências tecnológicas e auxilia na estruturação de matérias profundas e embasadas.
        </p>
      </div>
    </main>
  );
}
