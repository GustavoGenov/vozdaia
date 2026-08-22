import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function getArticles() {
  const { data, error } = await supabase.from('articles').select('title');
  console.log('Total articles in DB:', data ? data.length : error);
}
getArticles();
