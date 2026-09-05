CREATE TABLE public.departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id uuid NOT NULL REFERENCES public.faculties(id) ON DELETE CASCADE,
  name text NOT NULL,
  name_en text,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX departments_faculty_id_idx ON public.departments(faculty_id);

GRANT SELECT ON public.departments TO anon;
GRANT SELECT ON public.departments TO authenticated;
GRANT ALL ON public.departments TO service_role;

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Departments are publicly readable"
ON public.departments FOR SELECT USING (true);

CREATE POLICY "Admins can manage departments"
ON public.departments FOR ALL TO authenticated
USING (is_admin()) WITH CHECK (is_admin());

CREATE TRIGGER update_departments_updated_at
BEFORE UPDATE ON public.departments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();