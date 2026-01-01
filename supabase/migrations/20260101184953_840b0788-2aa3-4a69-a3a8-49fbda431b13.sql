-- 1. Add INSERT policy for admin_audit_log (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_audit_log' 
    AND policyname = 'Admins can insert audit logs'
  ) THEN
    CREATE POLICY "Admins can insert audit logs"
    ON public.admin_audit_log
    FOR INSERT
    TO authenticated
    WITH CHECK (is_admin() AND auth.uid() = admin_user_id);
  END IF;
END $$;

-- 2. Drop the dangerous create_admin_user function
DROP FUNCTION IF EXISTS public.create_admin_user(text, text, text);