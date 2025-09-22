-- Add academic information fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN university_id uuid REFERENCES public.universities(id),
ADD COLUMN faculty_id uuid REFERENCES public.faculties(id),
ADD COLUMN major_id uuid REFERENCES public.majors(id),
ADD COLUMN academic_year text,
ADD COLUMN university_name text,
ADD COLUMN faculty_name text,
ADD COLUMN major_name text;