-- إضافة الكليات والمعاهد المفقودة لجامعة حمص وإدلب

-- أولاً: إضافة الكليات المفقودة لجامعة حمص
INSERT INTO public.faculties (university_id, name, name_en, type) 
SELECT 
  (SELECT id FROM universities WHERE name = 'جامعة حمص'),
  faculty_name,
  faculty_name_en,
  'faculty'
FROM (VALUES
  ('كلية طب الأسنان', 'Faculty of Dentistry')
) AS new_faculties(faculty_name, faculty_name_en)
WHERE NOT EXISTS (
  SELECT 1 FROM faculties f 
  JOIN universities u ON f.university_id = u.id 
  WHERE u.name = 'جامعة حمص' AND f.name = faculty_name
);

-- إضافة المعاهد العليا المفقودة لجامعة حمص
INSERT INTO public.faculties (university_id, name, name_en, type) 
SELECT 
  (SELECT id FROM universities WHERE name = 'جامعة حمص'),
  institute_name,
  institute_name_en,
  'higher_institute'
FROM (VALUES
  ('المعهد العالي للغات', 'Higher Institute of Languages'),
  ('المعهد العالي لإدارة المياه', 'Higher Institute of Water Management')
) AS new_institutes(institute_name, institute_name_en)
WHERE NOT EXISTS (
  SELECT 1 FROM faculties f 
  JOIN universities u ON f.university_id = u.id 
  WHERE u.name = 'جامعة حمص' AND f.name = institute_name
);

-- إضافة المعاهد التقنية المفقودة لجامعة حمص
INSERT INTO public.faculties (university_id, name, name_en, type) 
SELECT 
  (SELECT id FROM universities WHERE name = 'جامعة حمص'),
  institute_name,
  institute_name_en,
  'technical_institute'
FROM (VALUES
  ('المعهد التقاني للحاسوب', 'Technical Institute of Computer Science'),
  ('المعهد التقاني الهندسي', 'Technical Institute of Engineering'),
  ('المعهد التقاني الزراعي', 'Technical Institute of Agriculture'),
  ('المعهد التقاني لشؤون التصحر والبادية', 'Technical Institute for Desertification and Steppe Affairs')
) AS new_institutes(institute_name, institute_name_en)
WHERE NOT EXISTS (
  SELECT 1 FROM faculties f 
  JOIN universities u ON f.university_id = u.id 
  WHERE u.name = 'جامعة حمص' AND f.name = institute_name
);

-- إضافة فرع تدمر مع كلية التربية لجامعة حمص
INSERT INTO public.branches (university_id, name, city)
SELECT 
  (SELECT id FROM universities WHERE name = 'جامعة حمص'),
  'فرع تدمر',
  'تدمر'
WHERE NOT EXISTS (
  SELECT 1 FROM branches b 
  JOIN universities u ON b.university_id = u.id 
  WHERE u.name = 'جامعة حمص' AND b.name = 'فرع تدمر'
);

-- إضافة كلية التربية لفرع تدمر
INSERT INTO public.faculties (university_id, name, name_en, type, branch_id) 
SELECT 
  (SELECT id FROM universities WHERE name = 'جامعة حمص'),
  'كلية التربية',
  'Faculty of Education',
  'faculty',
  (SELECT b.id FROM branches b JOIN universities u ON b.university_id = u.id WHERE u.name = 'جامعة حمص' AND b.name = 'فرع تدمر')
WHERE NOT EXISTS (
  SELECT 1 FROM faculties f 
  JOIN universities u ON f.university_id = u.id 
  JOIN branches b ON f.branch_id = b.id
  WHERE u.name = 'جامعة حمص' AND b.name = 'فرع تدمر' AND f.name = 'كلية التربية'
);