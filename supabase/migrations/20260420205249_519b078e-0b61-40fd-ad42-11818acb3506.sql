-- service_role bypasses RLS by design; explicit "WITH CHECK (true)" policies
-- only triggered the always-true linter warning without adding security value.
DROP POLICY IF EXISTS "Only service role can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only service role can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only service role can delete roles" ON public.user_roles;