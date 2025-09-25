-- إضافة المعاهد التقنية المفقودة لجامعة إدلب
INSERT INTO public.faculties (university_id, name, name_en, type) 
SELECT 
  (SELECT id FROM universities WHERE name = 'جامعة إدلب'),
  institute_name,
  institute_name_en,
  'technical_institute'
FROM (VALUES
  ('المعهد التقاني للحاسوب', 'Technical Institute of Computer Science'),
  ('المعهد التقاني للعلوم الإدارية المالية', 'Technical Institute of Administrative and Financial Sciences'),
  ('المعهد التقاني الهندسي', 'Technical Institute of Engineering'),
  ('المعهد التقاني الطبي', 'Technical Institute of Medical Sciences'),
  ('المعهد التقاني للتجهيزات الطبية', 'Technical Institute of Medical Equipment')
) AS new_institutes(institute_name, institute_name_en)
WHERE NOT EXISTS (
  SELECT 1 FROM faculties f 
  JOIN universities u ON f.university_id = u.id 
  WHERE u.name = 'جامعة إدلب' AND f.name = institute_name
);

-- إضافة عمود التصنيف للكليات
ALTER TABLE public.faculties ADD COLUMN IF NOT EXISTS category text;

-- تحديث تصنيف الكليات الطبية
UPDATE public.faculties 
SET category = 'طبية'
WHERE name IN (
  'كلية الطب البشري', 'كلية طب الأسنان', 'كلية الصيدلة', 'كلية العلوم الصحية', 
  'كلية الطب البيطري', 'المعهد التقاني الطبي', 'المعهد التقاني للتجهيزات الطبية'
);

-- تحديث تصنيف الكليات الهندسية
UPDATE public.faculties 
SET category = 'هندسية'
WHERE name IN (
  'كلية الهندسة المعلوماتية', 'كلية الهندسة المدنية', 'كلية الهندسة المعمارية',
  'كلية الهندسة الميكانيكية', 'كلية الهندسة الكهربائية', 'كلية الهندسة الزراعية',
  'كلية الهندسة البترولية و الكيميائية', 'كلية الهندسة الكهربائية و الميكانيكية',
  'المعهد التقاني الهندسي'
);

-- تحديث تصنيف الكليات الإنسانية والاجتماعية
UPDATE public.faculties 
SET category = 'إنسانية واجتماعية'
WHERE name IN (
  'كلية الآداب والعلوم الإنسانية', 'كلية العلوم السياسية', 'كلية الاقتصاد والإدارة',
  'كلية الشريعة والحقوق', 'كلية التربية', 'كلية الحقوق', 'كلية السياحة',
  'كلية التربية الموسيقية', 'كلية الاقتصاد', 'كلية العلوم الإنسانية و الآداب',
  'المعهد التقاني للعلوم الإدارية المالية', 'المعهد العالي للغات'
);

-- تحديث تصنيف كليات العلوم والزراعة
UPDATE public.faculties 
SET category = 'علوم وزراعة'
WHERE name IN (
  'كلية العلوم العامة', 'كلية العلوم', 'كلية العلوم الثانية', 'كلية الزراعة',
  'المعهد التقاني الزراعي', 'المعهد التقاني لشؤون التصحر والبادية',
  'المعهد العالي لإدارة المياه'
);

-- تحديث تصنيف الكليات التطبيقية والتقنية
UPDATE public.faculties 
SET category = 'تطبيقية وتقنية'
WHERE name IN (
  'الكلية التطبيقية', 'المعهد التقاني للحاسوب'
);

-- تحديث الكليات التي لم تصنف بعد
UPDATE public.faculties 
SET category = 'عامة'
WHERE category IS NULL;