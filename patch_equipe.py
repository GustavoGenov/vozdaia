import re

with open('src/app/equipe/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update Kaelara
content = re.sub(
    r"name: 'Kaelara Castro Bernardes Rosa',[\s\S]*?formation: 'A\.I usando Gemma 4 llm e api Google',",
    r"name: 'Kaelara (Agente de IA Autônomo)',\n      subtitle: 'Sistema Inteligente de Análise e Monitoramento Climático',\n      initials: 'KC',\n      image: '/equipe/kaelara.png',\n      email: 'nicholaigenov@gmail.com',\n      phone: null,\n      linkedin: null,\n      areas: 'Clima tempo',\n      formation: 'Agente de Inteligência Artificial desenvolvido sob arquitetura LLM (Gemma/Google API) para processamento automatizado de dados meteorológicos e satelitais.',",
    content
)

# Update Jhonatan
content = re.sub(
    r"name: 'Sagrada Jurema Zé Severino',[\s\S]*?formation: 'Psicologia e herbalista',",
    r"name: 'Jhonatan d\' Osogiyan (ou Pai Jhonatan)',\n      subtitle: 'Colunista de Cultura, Tradições Afro-Brasileiras e Etnobotânica',\n      initials: 'SJ',\n      image: '/equipe/jhonatan.jpg',\n      email: null,\n      phone: '37 9968-8433',\n      linkedin: null,\n      areas: 'Cultura, Filosofia & Bem-Estar, Horóscopo & Tarô',\n      formation: 'Psicologia, Pesquisador de Tradições Populares e Herbalista',",
    content
)

with open('src/app/equipe/page.js', 'w', encoding='utf-8') as f:
    f.write(content)
