-- Sequential, human-readable codes for faculties and departments (UUID stays the internal key)
CREATE SEQUENCE IF NOT EXISTS public.faculty_code_seq;
CREATE SEQUENCE IF NOT EXISTS public.department_code_seq;

ALTER TABLE public.faculties ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE public.departments ADD COLUMN IF NOT EXISTS code TEXT;

-- Backfill existing rows in creation order, preserving all data and relationships
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, id) AS rn
  FROM public.faculties
  WHERE code IS NULL
)
UPDATE public.faculties f
SET code = 'FAC-' || LPAD(o.rn::text, 3, '0')
FROM ordered o
WHERE f.id = o.id;

WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, id) AS rn
  FROM public.departments
  WHERE code IS NULL
)
UPDATE public.departments d
SET code = 'DEP-' || LPAD(o.rn::text, 3, '0')
FROM ordered o
WHERE d.id = o.id;

-- Continue numbering after the highest existing code
SELECT setval(
  'public.faculty_code_seq',
  GREATEST(COALESCE((SELECT MAX(NULLIF(regexp_replace(code, '\D', '', 'g'), '')::int) FROM public.faculties), 0), 1)
);
SELECT setval(
  'public.department_code_seq',
  GREATEST(COALESCE((SELECT MAX(NULLIF(regexp_replace(code, '\D', '', 'g'), '')::int) FROM public.departments), 0), 1)
);

ALTER TABLE public.faculties
  ALTER COLUMN code SET DEFAULT 'FAC-' || LPAD(nextval('public.faculty_code_seq')::text, 3, '0');
ALTER TABLE public.departments
  ALTER COLUMN code SET DEFAULT 'DEP-' || LPAD(nextval('public.department_code_seq')::text, 3, '0');

CREATE UNIQUE INDEX IF NOT EXISTS faculties_code_key ON public.faculties (code);
CREATE UNIQUE INDEX IF NOT EXISTS departments_code_key ON public.departments (code);

GRANT USAGE, SELECT ON SEQUENCE public.faculty_code_seq TO authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE public.department_code_seq TO authenticated, service_role;

-- Helper: next available code, derived from live data (never hardcoded)
CREATE OR REPLACE FUNCTION public.next_faculty_code()
RETURNS text
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT 'FAC-' || LPAD((COALESCE(MAX(NULLIF(regexp_replace(code, '\D', '', 'g'), '')::int), 0) + 1)::text, 3, '0')
  FROM public.faculties;
$$;

CREATE OR REPLACE FUNCTION public.next_department_code()
RETURNS text
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT 'DEP-' || LPAD((COALESCE(MAX(NULLIF(regexp_replace(code, '\D', '', 'g'), '')::int), 0) + 1)::text, 3, '0')
  FROM public.departments;
$$;

GRANT EXECUTE ON FUNCTION public.next_faculty_code() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.next_department_code() TO anon, authenticated, service_role;
