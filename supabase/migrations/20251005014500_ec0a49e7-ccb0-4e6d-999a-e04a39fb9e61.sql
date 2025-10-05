-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Only admins can view user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users cannot modify roles" ON public.user_roles;

-- Policy: Only admins can view roles
CREATE POLICY "Only admins can view user roles"
ON public.user_roles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Policy: Prevent anyone from modifying their own roles
CREATE POLICY "Users cannot modify roles"
ON public.user_roles
FOR ALL
USING (false)
WITH CHECK (false);

-- Migrate existing roles from profiles to user_roles (if column exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'role'
  ) THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT user_id, role
    FROM public.profiles
    WHERE role IS NOT NULL
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Remove role column from profiles
    ALTER TABLE public.profiles DROP COLUMN role;
  END IF;
END $$;

-- Update is_admin function to use user_roles table
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = $1 AND user_roles.role = 'admin'
  );
$$;

-- Update get_current_user_role to use user_roles
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Create audit log table
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) NOT NULL,
  action TEXT NOT NULL,
  target_user_id UUID REFERENCES auth.users(id),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can view audit log" ON public.admin_audit_log;

CREATE POLICY "Only admins can view audit log"
ON public.admin_audit_log
FOR SELECT
USING (public.is_admin());

-- Update handle_new_user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert profile without role
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', new.email)
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    new.id,
    CASE 
      WHEN new.email = 'admin@daleel.com' THEN 'admin'
      ELSE 'user'
    END
  );
  
  RETURN new;
END;
$function$;