// scripts/backup-articles.js
// Copia recursivamente a pasta src/app/artigo para D:/JornalBackup com timestamp
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src', 'app', 'artigo');
const backupRoot = 'D:/JornalBackup';

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-');
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function runBackup() {
  const ts = getTimestamp();
  const dest = path.join(backupRoot, `artigo_${ts}`);
  console.log('Iniciando backup →', dest);
  copyRecursive(srcDir, dest);
  console.log('Backup concluído.');
}

runBackup();
