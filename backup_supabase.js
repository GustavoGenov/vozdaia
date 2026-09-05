const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function exportData() {
  console.log('Iniciando extração do Supabase...');
  let sqlDump = `-- Backup Completo do Supabase - Voz da I.A\n-- Gerado via Node.js Script\n\n`;

  const tables = ['categories', 'articles', 'admins', 'page_views', 'tags', 'article_tags'];

  for (const table of tables) {
    console.log(`Extraindo tabela: ${table}...`);
    const { data, error } = await supabase.from(table).select('*');
    
    if (error) {
      console.log(`Erro ou tabela inexistente: ${table}`);
      continue;
    }

    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      
      data.forEach(row => {
        const values = keys.map(k => {
          let val = row[k];
          if (val === null) return 'NULL';
          if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
          if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
          return val;
        });
        sqlDump += `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')});\n`;
      });
      sqlDump += '\n';
      console.log(`> ${data.length} registros exportados de ${table}.`);
    } else {
      console.log(`> Tabela ${table} está vazia.`);
    }
  }

  fs.writeFileSync('backup_vozdaia.sql', sqlDump);
  console.log('\nBackup concluído com sucesso! Arquivo: backup_vozdaia.sql');
}

exportData();
