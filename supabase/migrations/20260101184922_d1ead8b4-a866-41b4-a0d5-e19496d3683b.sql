-- 1. Add INSERT policy for admin_audit_log
CREATE POLICY "Admins can insert audit logs"
ON public.admin_audit_log
FOR INSERT
TO authenticated
WITH CHECK (is_admin() AND auth.uid() = admin_user_id);

-- 2. Drop the dangerous create_admin_user function that directly manipulates auth.users
DROP FUNCTION IF EXISTS public.create_admin_user(text, text, text);