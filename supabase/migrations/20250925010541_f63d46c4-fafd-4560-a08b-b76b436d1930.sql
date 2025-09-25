-- Create a security definer function to safely check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = $1 AND profiles.role = 'admin'
  );
$$;

-- Create a security definer function to safely get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

-- Update news RLS policy to use security definer function (avoid recursion)
DROP POLICY IF EXISTS "Only admins can manage news" ON public.news;

CREATE POLICY "Only admins can manage news"
ON public.news
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add a function to securely create admin users (only callable by existing admins)
CREATE OR REPLACE FUNCTION public.create_admin_user(
  user_email text,
  user_password text,
  user_full_name text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_user_id uuid;
  result json;
BEGIN
  -- Check if caller is admin
  IF NOT public.is_admin() THEN
    RETURN json_build_object('error', 'Unauthorized: Admin access required');
  END IF;

  -- Create the user account
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    json_build_object('full_name', user_full_name),
    now(),
    now()
  ) RETURNING id INTO new_user_id;

  -- Create profile with admin role
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (new_user_id, user_email, user_full_name, 'admin');

  RETURN json_build_object('success', true, 'user_id', new_user_id);
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('error', SQLERRM);
END;
$$;