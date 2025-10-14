-- Add university type enum and column
DO $$ BEGIN
  CREATE TYPE public.university_type AS ENUM ('public', 'private');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add type column to universities table
ALTER TABLE public.universities 
ADD COLUMN IF NOT EXISTS type public.university_type DEFAULT 'public' NOT NULL;

-- Update existing universities to be public (government) universities
UPDATE public.universities SET type = 'public' WHERE type IS NULL;