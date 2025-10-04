-- 1. إصلاح مشاكل الأمان
-- تحديث سياسة RLS لجدول likes لحماية خصوصية المستخدمين
DROP POLICY IF EXISTS "Users can view all likes" ON public.likes;
CREATE POLICY "Users can view their own likes" ON public.likes
FOR SELECT USING (auth.uid() = user_id);

-- 2. إضافة حقول الرموز (IDs) للجامعات والتخصصات
ALTER TABLE public.universities ADD COLUMN IF NOT EXISTS university_code TEXT UNIQUE;
ALTER TABLE public.majors ADD COLUMN IF NOT EXISTS major_code TEXT UNIQUE;

-- 3. تحديث رموز الجامعات الموجودة
UPDATE public.universities SET university_code = 'UU01' WHERE name = 'جامعة دمشق';
UPDATE public.universities SET university_code = 'UU02' WHERE name = 'جامعة حلب';
UPDATE public.universities SET university_code = 'UU03' WHERE name = 'جامعة تشرين';

-- 4. إضافة الجامعات الجديدة: حماة، طرطوس، الفرات
INSERT INTO public.universities (name, name_en, city, established, description, website, university_code, logo_url, banner_url) VALUES
('جامعة حماة', 'Hama University', 'حماة', 2014, 'جامعة حكومية سورية تأسست عام 2014 في مدينة حماة، تضم عدداً من الكليات في التخصصات الطبية والهندسية والإنسانية والعلمية.', 'http://hama-univ.edu.sy', 'UU04', '/placeholder.svg', '/placeholder.svg'),
('جامعة طرطوس', 'Tartous University', 'طرطوس', 2015, 'جامعة حكومية سورية تأسست عام 2015 في مدينة طرطوس الساحلية، تقدم برامج دراسية متنوعة في مختلف المجالات.', 'http://tartous-univ.edu.sy', 'UU05', '/placeholder.svg', '/placeholder.svg'),
('جامعة الفرات', 'Al-Furat University', 'دير الزور', 2006, 'جامعة حكومية سورية تأسست عام 2006 في محافظة دير الزور، تهدف لخدمة المنطقة الشرقية من سوريا بتخصصات متنوعة.', 'http://alfuratuniv.edu.sy', 'UU06', '/placeholder.svg', '/placeholder.svg');

-- 5. إضافة كليات جامعة حماة
INSERT INTO public.faculties (name, name_en, university_id, type, category) 
SELECT 'كلية الطب البشري', 'Faculty of Medicine', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية طب الأسنان', 'Faculty of Dentistry', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية الصيدلة', 'Faculty of Pharmacy', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية الهندسة المدنية', 'Faculty of Civil Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية الهندسة الميكانيكية والكهربائية', 'Faculty of Mechanical and Electrical Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية العلوم', 'Faculty of Sciences', id, 'faculty', 'علمية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية الآداب والعلوم الإنسانية', 'Faculty of Arts and Humanities', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية التربية', 'Faculty of Education', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية الاقتصاد', 'Faculty of Economics', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية الزراعة', 'Faculty of Agriculture', id, 'faculty', 'علمية' FROM public.universities WHERE name = 'جامعة حماة'
UNION ALL
SELECT 'كلية الطب البيطري', 'Faculty of Veterinary Medicine', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة حماة';

-- 6. إضافة كليات جامعة طرطوس
INSERT INTO public.faculties (name, name_en, university_id, type, category) 
SELECT 'كلية الطب البشري', 'Faculty of Medicine', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية الصيدلة', 'Faculty of Pharmacy', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية الهندسة المدنية', 'Faculty of Civil Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية الهندسة الميكانيكية والكهربائية', 'Faculty of Mechanical and Electrical Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية الهندسة المعلوماتية', 'Faculty of Informatics Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية العلوم', 'Faculty of Sciences', id, 'faculty', 'علمية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية الآداب والعلوم الإنسانية', 'Faculty of Arts and Humanities', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية التربية', 'Faculty of Education', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة طرطوس'
UNION ALL
SELECT 'كلية السياحة', 'Faculty of Tourism', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة طرطوس';

-- 7. إضافة كليات جامعة الفرات
INSERT INTO public.faculties (name, name_en, university_id, type, category) 
SELECT 'كلية الطب البشري', 'Faculty of Medicine', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية طب الأسنان', 'Faculty of Dentistry', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الصيدلة', 'Faculty of Pharmacy', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الهندسة المدنية', 'Faculty of Civil Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية هندسة النفط والغاز', 'Faculty of Petroleum and Gas Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الهندسة الميكانيكية والكهربائية', 'Faculty of Mechanical and Electrical Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الهندسة التقنية', 'Faculty of Technical Engineering', id, 'faculty', 'هندسية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية العلوم', 'Faculty of Sciences', id, 'faculty', 'علمية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الآداب والعلوم الإنسانية', 'Faculty of Arts and Humanities', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية التربية', 'Faculty of Education', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الحقوق', 'Faculty of Law', id, 'faculty', 'إنسانية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الزراعة', 'Faculty of Agriculture', id, 'faculty', 'علمية' FROM public.universities WHERE name = 'جامعة الفرات'
UNION ALL
SELECT 'كلية الطب البيطري', 'Faculty of Veterinary Medicine', id, 'faculty', 'طبية' FROM public.universities WHERE name = 'جامعة الفرات';

-- 8. تحسين الأمان: تفعيل حماية كلمات المرور المسربة
-- ملاحظة: هذا يتم من لوحة التحكم في Supabase Auth Settings

COMMENT ON COLUMN universities.university_code IS 'رمز الجامعة الفريد (UU01, UU02, ...)';
COMMENT ON COLUMN majors.major_code IS 'رمز التخصص الفريد (SP001, SP002, ...)';