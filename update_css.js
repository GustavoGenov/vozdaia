const fs = require('fs');
let content = fs.readFileSync('D:\\Backup_Projetos\\Jornal\\src\\app\\globals.css', 'utf8');

const target = ".nav-item {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 10px 24px;\n  color: var(--gn-text);\n  font-size: 14px;\n  font-weight: 500;\n  border-radius: 0 24px 24px 0;\n  margin-right: 12px;\n  transition: background 0.2s;\n}";

const replacement = ".nav-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 16px;\n  color: var(--gn-text);\n  font-size: 13px;\n  font-weight: 500;\n  border-radius: 0 24px 24px 0;\n  margin-right: 8px;\n  margin-bottom: 2px;\n  transition: background 0.2s;\n}";

// Replace with flexible whitespace
const regex = /\.nav-item\s*\{\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*16px;\s*padding:\s*10px\s+24px;\s*color:\s*var\(--gn-text\);\s*font-size:\s*14px;\s*font-weight:\s*500;\s*border-radius:\s*0\s+24px\s+24px\s+0;\s*margin-right:\s*12px;\s*transition:\s*background\s*0\.2s;\s*\}/g;

content = content.replace(regex, replacement);

fs.writeFileSync('D:\\Backup_Projetos\\Jornal\\src\\app\\globals.css', content, 'utf8');
