const fs = require('fs');

// 1. Fix LayoutShell.js Footer Logo
let shell = fs.readFileSync('src/app/components/LayoutShell.js', 'utf8');

const footerRegex = /<footer[\s\S]*?<\/footer>/;
const newFooter = `<footer style={{
            marginTop: 'auto',
            padding: '40px 24px',
            borderTop: '1px solid var(--gn-border)',
            background: 'var(--gn-surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            color: 'var(--gn-text-secondary)',
            fontSize: '15px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center' }}>
              <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '42px', width: '42px', objectFit: 'cover' }} />
              <h3 style={{ color: 'var(--gn-text)', fontSize: '22px', fontWeight: '700', margin: 0 }} className="google-sans">Voz da I.A</h3>
            </div>
            
            <p style={{ maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              O portal focado em combater fake news com informação de alta tecnologia e precisão jornalística.
            </p>
            
            {/* Links Institucionais Centralizados */}
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--gn-border)', paddingTop: '20px', width: '100%', maxWidth: '800px' }}>
              <Link href="/sobre" style={{ fontWeight: '500' }} onClick={closeDrawer}>Sobre Nós</Link>
              <Link href="/equipe" style={{ fontWeight: '500' }} onClick={closeDrawer}>Nossa Equipe</Link>
              <Link href="/politica-de-privacidade" style={{ fontWeight: '500' }} onClick={closeDrawer}>Política de Privacidade</Link>
              <Link href="/termos" style={{ fontWeight: '500' }} onClick={closeDrawer}>Termos de Uso</Link>
            </div>

            <div style={{ fontSize: '13px', marginTop: '4px' }}>
              &copy; {new Date().getFullYear()} Voz da I.A. Todos os direitos reservados.
            </div>
          </footer>`;

shell = shell.replace(footerRegex, newFooter);
fs.writeFileSync('src/app/components/LayoutShell.js', shell, 'utf8');

// 2. Fix globals.css Zoom
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/html\s*\{[^}]*\}/, `html {\n  font-size: 118%; /* Zoom otimizado para leitura confortável */\n}`);
fs.writeFileSync('src/app/globals.css', css, 'utf8');

// 3. Fix PublishForm.js Word Counter & minimum 800 words
let publishForm = fs.readFileSync('src/app/admin/PublishForm.js', 'utf8');

// Replace wordCount logic
const oldWordCountRegex = /\/\/ Contador de Palavras[\s\S]*?if \(wordCount < 600\)[\s\S]*?wordCountText = 'Texto longo \(Bom, mas mantenha a legibilidade\)';\n  \}/;

const newWordCountLogic = `// Contador de Palavras Completo (Título + Linha Fina + Corpo + Fontes)
  const wordCount = useMemo(() => {
    const rawContent = content.replace(/<[^>]*>?/gm, ' ');
    const combinedText = \`\${title} \${summary} \${rawContent} \${sources}\`;
    const words = combinedText.trim().split(/\\s+/).filter(w => w.length > 0);
    return words.length;
  }, [title, summary, content, sources]);

  let wordCountColor = '#d32f2f';
  let wordCountText = 'Alerta: Texto com ' + wordCount + ' palavras (Mínimo de 800 palavras exigido pelo AdSense)';
  if (wordCount >= 800 && wordCount <= 1600) {
    wordCountColor = '#34A853';
    wordCountText = 'Excelente densidade informativa (' + wordCount + ' palavras - Aprovado AdSense)';
  } else if (wordCount > 1600) {
    wordCountColor = '#1a73e8';
    wordCountText = 'Matéria aprofundada e completa (' + wordCount + ' palavras)';
  }`;

publishForm = publishForm.replace(oldWordCountRegex, newWordCountLogic);

// Replace publish validation from 300 to 800
publishForm = publishForm.replace(
  /if \(!isDraft && wordCount < 300\) \{[\s\S]*?\}/,
  `if (!isDraft && wordCount < 800) {\n      setMessage('A matéria possui ' + wordCount + ' palavras. É necessário atingir o mínimo de 800 palavras (contando Título, Linha Fina, Texto e Fontes) para publicação oficial AdSense.');\n      return;\n    }`
);

fs.writeFileSync('src/app/admin/PublishForm.js', publishForm, 'utf8');

console.log('Update script finished successfully.');
