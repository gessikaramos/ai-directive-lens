
-- hit_conversations
CREATE TABLE public.hit_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message_index int,
  user_message text,
  ai_response text,
  filter_applied bool DEFAULT true,
  latency_ms int,
  model_used text DEFAULT 'gpt-4o-mini',
  created_at timestamptz DEFAULT now(),
  ip_hash text
);
CREATE INDEX idx_hit_conv_session ON public.hit_conversations(session_id);
CREATE INDEX idx_hit_conv_created ON public.hit_conversations(created_at DESC);
CREATE INDEX idx_hit_conv_ip ON public.hit_conversations(ip_hash);
GRANT ALL ON public.hit_conversations TO service_role;
ALTER TABLE public.hit_conversations ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policies: only service_role (edge function) writes/reads.

-- hit_feedback
CREATE TABLE public.hit_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message_id uuid REFERENCES public.hit_conversations(id) ON DELETE CASCADE,
  feedback_type text CHECK (feedback_type IN ('clear','confused','loved','wrong')),
  comment text,
  created_at timestamptz DEFAULT now()
);
GRANT INSERT ON public.hit_feedback TO anon, authenticated;
GRANT ALL ON public.hit_feedback TO service_role;
ALTER TABLE public.hit_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon can insert feedback" ON public.hit_feedback FOR INSERT TO anon, authenticated WITH CHECK (true);

-- collective_applications
CREATE TABLE public.collective_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  portfolio_url text NOT NULL,
  expertise text[] NOT NULL,
  favorite_project text NOT NULL,
  linkedin_url text,
  website_url text,
  why_lolalab text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new','reviewing','in_network','passed','declined')),
  reviewed_by text,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  ip_hash text
);
GRANT INSERT ON public.collective_applications TO anon, authenticated;
GRANT ALL ON public.collective_applications TO service_role;
ALTER TABLE public.collective_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon can apply to collective" ON public.collective_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

-- signal_opt_in
CREATE TABLE public.signal_opt_in (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text CHECK (source IN ('signal','cast','lab','other')),
  confirmed bool DEFAULT false,
  confirmation_token text,
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  ip_hash text
);
GRANT INSERT ON public.signal_opt_in TO anon, authenticated;
GRANT ALL ON public.signal_opt_in TO service_role;
ALTER TABLE public.signal_opt_in ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon can subscribe to signal" ON public.signal_opt_in FOR INSERT TO anon, authenticated WITH CHECK (true);
