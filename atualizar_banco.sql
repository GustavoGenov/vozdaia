-- 1. Cria as novas categorias
INSERT INTO categories (name, slug, color_code) VALUES 
('Economia', 'economia', '#673ab7'),
('Jogos', 'jogos', '#9c27b0'),
('Religião', 'religiao', '#795548'),
('Formiga-MG', 'formiga-mg', '#ff5722');

-- 2. Transfere todas as matérias antigas do bloco "Economia & Jogos" para o novo bloco "Economia"
UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'economia')
WHERE category_id = (SELECT id FROM categories WHERE slug = 'economia-jogos');

-- 3. Apaga a categoria antiga "Economia & Jogos"
DELETE FROM categories WHERE slug = 'economia-jogos';
