-- Make the universitieslogos bucket public for easy access
UPDATE storage.buckets SET public = true WHERE id = 'universitieslogos';

-- Create storage policies for university logos
CREATE POLICY "Anyone can view university logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'universitieslogos');

CREATE POLICY "Admins can upload university logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'universitieslogos' AND public.is_admin());

CREATE POLICY "Admins can update university logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'universitieslogos' AND public.is_admin());

CREATE POLICY "Admins can delete university logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'universitieslogos' AND public.is_admin());

-- Allow admins to update universities table
CREATE POLICY "Admins can update universities"
ON public.universities FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());