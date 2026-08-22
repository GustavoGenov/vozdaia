import base64

code = '''"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const INITIAL_TEMPLATE = 
  <h2>Contexto Principal</h2>
  <p>Insira o contexto detalhado aqui. Evite parágrafos muito longos.</p>
  <h3>Análise e Impactos</h3>
  <p>Detalhe os impactos da tecnologia, pesquisa ou fato.</p>
  <blockquote>
    "O futuro da tecnologia depende de boas decisões no presente." - Especialista
  </blockquote>
  <h3>O que esperar</h3>
  <ul>
    <li>Ponto 1</li>
    <li>Ponto 2</li>
  </ul>
;

const AUTHORS = [
  "Gustavo de Castro Bernardes Rosa",
  "Daiene Maria de Meneses",
  "RuiWenceslau de Oliveira",
  "Jhonatan d\\' Osogiyan (ou Pai Jhonatan)",
  "Kaelara (Agente de IA Autônomo)",
  "Gabriela Castro Bernardes Rosa"
];

export default function PublishForm({ categories }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState(INITIAL_TEMPLATE);
  const [imageFile, setImageFile] = useState(null);
  
  // Novos campos
  const [authorName, setAuthorName] = useState(AUTHORS[0]);
  const [disclaimerType, setDisclaimerType] = useState('none');
  const [sources, setSources] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCredits, setImageCredits] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const slugify = (text) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const generatedSlug = slugify(title);

  // Contador de Palavras (Extraindo HTML)
  const wordCount = useMemo(() => {
    const text = content.replace(/<[^>]*>?/gm, ''); // Strip HTML
    const words = text.trim().split(/\s+/);
    return words[0] === '' ? 0 : words.length;
  }, [content]);

  let wordCountColor = '#1a73e8';
  let wordCountText = 'Tamanho bom';
  if (wordCount < 600) {
    wordCountColor = '#d32f2f';
    wordCountText = 'Alerta: Texto muito curto (Risco de Thin Content)';
  } else if (wordCount >= 800 && wordCount <= 1500) {
    wordCountColor = '#34A853';
    wordCountText = 'Excelente densidade informativa';
  } else if (wordCount > 1500) {
    wordCountColor = '#EA4335';
    wordCountText = 'Texto longo (Bom, mas mantenha a legibilidade)';
  }

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !categoryId || !summary || !content || !imageFile || !imageAlt) {
      setMessage('Preencha os campos obrigatórios (incluindo Alt Text da imagem).');
      return;
    }

    if (wordCount < 300) {
      setMessage('O artigo está muito curto para ser indexado pelo AdSense. Tente atingir pelo menos 600 palavras.');
      return;
    }

    setLoading(true);
    setMessage('Fazendo upload da imagem...');

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = f"{int(time.time() * 1000)}-{os.urandom(4).hex()}.{fileExt}" # Python f-string injected by accident? No, this is JS template literals!
''' # Wait, I will just base64 encode the string locally in python!
