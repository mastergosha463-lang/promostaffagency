-- 1. Drop any potentially permissive insert policies
DROP POLICY IF EXISTS "Users can insert their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.user_roles;

-- 2. Allow users to read only their own role
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 3. Inserts only via service_role
DROP POLICY IF EXISTS "Only service role can insert roles" ON public.user_roles;
CREATE POLICY "Only service role can insert roles"
ON public.user_roles
FOR INSERT
TO service_role
WITH CHECK (true);

-- 4. Updates only via service_role
DROP POLICY IF EXISTS "Only service role can update roles" ON public.user_roles;
CREATE POLICY "Only service role can update roles"
ON public.user_roles
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Deletes only via service_role
DROP POLICY IF EXISTS "Only service role can delete roles" ON public.user_roles;
CREATE POLICY "Only service role can delete roles"
ON public.user_roles
FOR DELETE
TO service_role
USING (true);