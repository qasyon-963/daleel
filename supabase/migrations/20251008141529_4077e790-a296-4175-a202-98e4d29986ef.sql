-- Fix user_roles RLS policies to allow admin operations
-- First, drop the overly restrictive blanket deny policy
DROP POLICY IF EXISTS "Users cannot modify roles" ON public.user_roles;

-- Allow admins to assign roles
CREATE POLICY "Admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Allow admins to update roles
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Allow admins to delete roles
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Prevent non-admins from any role modifications
CREATE POLICY "Non-admins cannot modify roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add database constraints for news table to enforce data quality
ALTER TABLE public.news
  ADD CONSTRAINT news_title_length CHECK (length(title) BETWEEN 3 AND 200),
  ADD CONSTRAINT news_summary_length CHECK (summary IS NULL OR length(summary) <= 500),
  ADD CONSTRAINT news_content_length CHECK (length(content) BETWEEN 10 AND 10000),
  ADD CONSTRAINT news_source_length CHECK (source IS NULL OR length(source) <= 200),
  ADD CONSTRAINT news_image_url_length CHECK (image_url IS NULL OR length(image_url) <= 500),
  ADD CONSTRAINT news_image_url_https CHECK (image_url IS NULL OR image_url LIKE 'https://%');