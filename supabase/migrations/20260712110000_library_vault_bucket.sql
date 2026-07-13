-- Bucket privado para os arquivos pagos (PDF final + futuro audiobook).
-- Substitui o padrão de arquivo estático em /public usado no capítulo
-- gratuito do DOP — inadequado para conteúdo pago, pois um link estático
-- funciona pra qualquer um que o adivinhe, com ou sem flag. Aqui: bucket
-- NÃO público, sem policy nenhuma de storage.objects — só a service role
-- (Edge Function library-access) gera URL assinada e temporária pro
-- comprador com direito confirmado em library_entitlements.
INSERT INTO storage.buckets (id, name, public)
VALUES ('library-vault', 'library-vault', false)
ON CONFLICT (id) DO NOTHING;
