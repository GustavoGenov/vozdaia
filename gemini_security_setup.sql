-- =========================================================================
-- SCRIPT DE SEGURANÇA: PERMISSÕES SOMENTE-LEITURA PARA O AGENTE GEMINI SPARK
-- Projeto: Voz da I.A (vozdaia.com)
-- =========================================================================

-- 1. Habilitar a extensão de criptografia (se ainda não estiver ativa)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Criar a Role/Perfil dedicado para o Agente de IA
DO $ $
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'gemini_spark_agent') THEN
        CREATE ROLE gemini_spark_agent WITH NOLOGIN;
    END IF;
END
$ $;

-- 3. Habilitar Row Level Security (RLS) nas tabelas principais
ALTER TABLE IF EXISTS public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.metrics ENABLE ROW LEVEL SECURITY;

-- 4. Conceder permissão EXCLUSIVA de SELECT (Leitura) ao agente
GRANT USAGE ON SCHEMA public TO gemini_spark_agent;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO gemini_spark_agent;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO gemini_spark_agent;

-- 5. Revogar explicitamente qualquer permissão de INSERT, UPDATE e DELETE do Agente
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM gemini_spark_agent;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLES FROM gemini_spark_agent;

-- 6. Criação das Políticas de Acesso RLS (Row Level Security)

-- Política para Leitura de Todos os Posts (Publicados e Rascunhos) pelo Agente
DROP POLICY IF EXISTS "Agente_Leitura_Total_Posts" ON public.posts;
CREATE POLICY "Agente_Leitura_Total_Posts"
ON public.posts
FOR SELECT
TO gemini_spark_agent
USING (true);

-- Política para Escrita Restrita: Apenas o Administrador Master (Você) pode alterar dados
DROP POLICY IF EXISTS "Admin_Acesso_Total_Posts" ON public.posts;
CREATE POLICY "Admin_Acesso_Total_Posts"
ON public.posts
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' = 'nicholaigenov@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'nicholaigenov@gmail.com');

-- 7. Confirmação de Auditoria
COMMENT ON ROLE gemini_spark_agent IS 'Perfil restrito do Gemini Spark para auditoria, leitura de SEO e checagem de integridade sem direitos de escrita.';