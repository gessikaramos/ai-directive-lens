
ALTER TABLE public.hit_conversations ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS hit_conversations_user_id_created_at_idx ON public.hit_conversations (user_id, created_at);

-- Allow authenticated users to read their own conversations
CREATE POLICY "Users can read own conversations"
ON public.hit_conversations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
