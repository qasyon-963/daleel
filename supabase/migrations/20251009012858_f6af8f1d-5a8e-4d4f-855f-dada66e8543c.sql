-- Add location fields to universities table
ALTER TABLE public.universities 
ADD COLUMN IF NOT EXISTS location_lat DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS location_lng DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS google_maps_url TEXT;