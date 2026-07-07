
-- 1) Replace overly-permissive INSERT policies (WITH CHECK true) with validated checks

-- collective_applications
DROP POLICY IF EXISTS "anon can apply to collective" ON public.collective_applications;
CREATE POLICY "anon can apply to collective"
ON public.collective_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(location) BETWEEN 1 AND 200
  AND length(portfolio_url) BETWEEN 1 AND 500
  AND length(favorite_project) BETWEEN 1 AND 2000
  AND length(why_lolalab) BETWEEN 1 AND 4000
  AND array_length(expertise, 1) BETWEEN 1 AND 20
  AND (website_url IS NULL OR length(website_url) <= 500)
  AND (linkedin_url IS NULL OR length(linkedin_url) <= 500)
  AND status = 'new'
  AND reviewed_by IS NULL
  AND reviewed_at IS NULL
  AND notes IS NULL
);

-- hit_feedback
DROP POLICY IF EXISTS "anon can insert feedback" ON public.hit_feedback;
CREATE POLICY "anon can insert feedback"
ON public.hit_feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(session_id) BETWEEN 1 AND 100
  AND (feedback_type IS NULL OR feedback_type IN ('clear','confused','loved','wrong'))
  AND (comment IS NULL OR length(comment) <= 2000)
);

-- signal_opt_in
DROP POLICY IF EXISTS "anon can subscribe to signal" ON public.signal_opt_in;
CREATE POLICY "anon can subscribe to signal"
ON public.signal_opt_in
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (source IS NULL OR length(source) <= 50)
  AND confirmed IS NOT TRUE
  AND confirmed_at IS NULL
);

-- 2) Explicitly lock down read access on sensitive tables

REVOKE SELECT ON public.hit_conversations FROM anon, authenticated;
REVOKE SELECT ON public.signal_opt_in FROM anon, authenticated;

-- Restrictive deny-all SELECT policies make intent explicit and future-proof
DROP POLICY IF EXISTS "deny all reads" ON public.hit_conversations;
CREATE POLICY "deny all reads"
ON public.hit_conversations
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "deny all reads" ON public.signal_opt_in;
CREATE POLICY "deny all reads"
ON public.signal_opt_in
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);
