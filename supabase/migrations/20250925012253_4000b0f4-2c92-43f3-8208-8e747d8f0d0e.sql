-- Add Idlib and Homs Universities with their faculties and institutes

-- Insert Idlib University
INSERT INTO public.universities (name, name_en, city, description, established)
VALUES (
  'جامعة إدلب',
  'Idlib University',
  'إدلب',
  'جامعة حكومية سورية تقع في محافظة إدلب، تضم العديد من الكليات والمعاهد التقنية.',
  2015
);

-- Insert Homs University
INSERT INTO public.universities (name, name_en, city, description, established)
VALUES (
  'جامعة حمص',
  'Homs University',
  'حمص',
  'جامعة حكومية سورية تقع في محافظة حمص، تضم مجموعة واسعة من الكليات والمعاهد العليا.',
  2005
);

-- Get university IDs for faculty insertion
WITH idlib_uni AS (
  SELECT id FROM public.universities WHERE name = 'جامعة إدلب'
),
homs_uni AS (
  SELECT id FROM public.universities WHERE name = 'جامعة حمص'
)

-- Insert Idlib University Faculties
INSERT INTO public.faculties (name, name_en, university_id, type)
SELECT 'كلية الطب البشري', 'Faculty of Human Medicine', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية طب الأسنان', 'Faculty of Dentistry', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الصيدلة', 'Faculty of Pharmacy', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية العلوم الصحية', 'Faculty of Health Sciences', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الطب البيطري', 'Faculty of Veterinary Medicine', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الهندسة المعلوماتية', 'Faculty of Informatics Engineering', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الهندسة المدنية', 'Faculty of Civil Engineering', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الهندسة المعمارية', 'Faculty of Architecture', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الهندسة الميكانيكية', 'Faculty of Mechanical Engineering', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الهندسة الكهربائية', 'Faculty of Electrical Engineering', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الهندسة الزراعية', 'Faculty of Agricultural Engineering', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية العلوم السياسية', 'Faculty of Political Science', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الآداب والعلوم الإنسانية', 'Faculty of Arts and Humanities', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الاقتصاد والإدارة', 'Faculty of Economics and Management', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية الشريعة والحقوق', 'Faculty of Sharia and Law', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية التربية', 'Faculty of Education', idlib_uni.id, 'faculty' FROM idlib_uni
UNION ALL
SELECT 'كلية العلوم العامة', 'Faculty of General Sciences', idlib_uni.id, 'faculty' FROM idlib_uni

-- Insert Idlib University Technical Institutes
UNION ALL
SELECT 'المعهد التقاني للحاسوب', 'Technical Institute of Computer', idlib_uni.id, 'institute' FROM idlib_uni
UNION ALL
SELECT 'المعهد التقاني للعلوم الإدارية المالية', 'Technical Institute of Administrative and Financial Sciences', idlib_uni.id, 'institute' FROM idlib_uni
UNION ALL
SELECT 'المعهد التقاني الهندسي', 'Technical Engineering Institute', idlib_uni.id, 'institute' FROM idlib_uni
UNION ALL
SELECT 'المعهد التقاني الطبي', 'Technical Medical Institute', idlib_uni.id, 'institute' FROM idlib_uni
UNION ALL
SELECT 'المعهد التقاني للتجهيزات الطبية', 'Technical Institute of Medical Equipment', idlib_uni.id, 'institute' FROM idlib_uni

-- Insert Homs University Faculties
UNION ALL
SELECT 'كلية الطب البشري', 'Faculty of Human Medicine', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية طب الأسنان', 'Faculty of Dentistry', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الصيدلة', 'Faculty of Pharmacy', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية العلوم الصحية', 'Faculty of Health Sciences', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الهندسة المعلوماتية', 'Faculty of Informatics Engineering', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الهندسة المدنية', 'Faculty of Civil Engineering', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الهندسة المعمارية', 'Faculty of Architecture', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الهندسة البترولية و الكيميائية', 'Faculty of Petroleum and Chemical Engineering', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الهندسة الكهربائية و الميكانيكية', 'Faculty of Electrical and Mechanical Engineering', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الزراعة', 'Faculty of Agriculture', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'الكلية التطبيقية', 'Applied Faculty', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية العلوم الإنسانية و الآداب', 'Faculty of Humanities and Arts', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الحقوق', 'Faculty of Law', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية السياحة', 'Faculty of Tourism', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية التربية', 'Faculty of Education', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية التربية الموسيقية', 'Faculty of Music Education', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية الاقتصاد', 'Faculty of Economics', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية العلوم', 'Faculty of Sciences', homs_uni.id, 'faculty' FROM homs_uni
UNION ALL
SELECT 'كلية العلوم الثانية', 'Second Faculty of Sciences', homs_uni.id, 'faculty' FROM homs_uni

-- Insert Homs University Higher Institutes
UNION ALL
SELECT 'المعهد العالي للغات', 'Higher Institute of Languages', homs_uni.id, 'institute' FROM homs_uni
UNION ALL
SELECT 'المعهد العالي لإدارة المياه', 'Higher Institute of Water Management', homs_uni.id, 'institute' FROM homs_uni

-- Insert Homs University Technical Institutes
UNION ALL
SELECT 'الحاسوب التقاني', 'Technical Computer Institute', homs_uni.id, 'institute' FROM homs_uni
UNION ALL
SELECT 'الهندسي التقاني', 'Technical Engineering Institute', homs_uni.id, 'institute' FROM homs_uni
UNION ALL
SELECT 'الزراعي التقاني', 'Technical Agricultural Institute', homs_uni.id, 'institute' FROM homs_uni
UNION ALL
SELECT 'التصحر و البادية لشؤون التقاني', 'Technical Institute for Desertification and Steppe Affairs', homs_uni.id, 'institute' FROM homs_uni;

-- Insert Homs University Palmyra Branch
INSERT INTO public.branches (name, city, university_id)
SELECT 'فرع تدمر', 'تدمر', homs_uni.id FROM (SELECT id FROM public.universities WHERE name = 'جامعة حمص') homs_uni;

-- Insert Education Faculty for Palmyra Branch
WITH homs_uni AS (
  SELECT id FROM public.universities WHERE name = 'جامعة حمص'
),
palmyra_branch AS (
  SELECT id FROM public.branches WHERE name = 'فرع تدمر' AND city = 'تدمر'
)
INSERT INTO public.faculties (name, name_en, university_id, branch_id, type)
SELECT 'كلية التربية', 'Faculty of Education', homs_uni.id, palmyra_branch.id, 'faculty'
FROM homs_uni, palmyra_branch;