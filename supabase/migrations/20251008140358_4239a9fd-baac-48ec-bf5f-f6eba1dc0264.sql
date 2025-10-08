-- Update likes table to use text for target_id to support both UUID (majors) and text (universities)
ALTER TABLE public.likes ALTER COLUMN target_id TYPE text USING target_id::text;