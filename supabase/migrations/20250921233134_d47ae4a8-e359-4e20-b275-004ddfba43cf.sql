-- Insert Aleppo University
INSERT INTO universities (name, name_en, city, established, website, description) 
VALUES (
  'جامعة حلب',
  'University of Aleppo',
  'حلب',
  1958,
  'http://www.alepuniv.edu.sy',
  'جامعة حلب هي إحدى أقدم الجامعات في سوريا وأهمها في شمال البلاد'
) ON CONFLICT (name) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  city = EXCLUDED.city,
  established = EXCLUDED.established,
  website = EXCLUDED.website,
  description = EXCLUDED.description;

-- Insert Lattakia University
INSERT INTO universities (name, name_en, city, established, website, description)
VALUES (
  'جامعة تشرين',
  'Tishreen University',
  'اللاذقية',
  1971,
  'http://www.tishreen.edu.sy',
  'جامعة تشرين هي الجامعة الرئيسية في المنطقة الساحلية السورية'
) ON CONFLICT (name) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  city = EXCLUDED.city,
  established = EXCLUDED.established,
  website = EXCLUDED.website,
  description = EXCLUDED.description;

-- Get university IDs for reference
DO $$
DECLARE
  aleppo_id UUID;
  lattakia_id UUID;
  azaz_branch_id UUID;
BEGIN
  -- Get Aleppo University ID
  SELECT id INTO aleppo_id FROM universities WHERE name = 'جامعة حلب';
  
  -- Get Lattakia University ID
  SELECT id INTO lattakia_id FROM universities WHERE name = 'جامعة تشرين';

  -- Insert Aleppo faculties
  INSERT INTO faculties (university_id, name, name_en, type) VALUES
  (aleppo_id, 'كلية الطب البشري', 'Faculty of Medicine', 'faculty'),
  (aleppo_id, 'كلية طب الأسنان', 'Faculty of Dentistry', 'faculty'),
  (aleppo_id, 'كلية الصيدلة', 'Faculty of Pharmacy', 'faculty'),
  (aleppo_id, 'كلية التمريض', 'Faculty of Nursing', 'faculty'),
  (aleppo_id, 'كلية الهندسة الزراعية', 'Faculty of Agricultural Engineering', 'faculty'),
  (aleppo_id, 'كلية الهندسة المدنية', 'Faculty of Civil Engineering', 'faculty'),
  (aleppo_id, 'كلية الهندسة المعمارية', 'Faculty of Architecture', 'faculty'),
  (aleppo_id, 'كلية الهندسة الكهربائية والإلكترونية', 'Faculty of Electrical and Electronic Engineering', 'faculty'),
  (aleppo_id, 'كلية الهندسة الميكانيكية', 'Faculty of Mechanical Engineering', 'faculty'),
  (aleppo_id, 'كلية الهندسة التقنية', 'Faculty of Technical Engineering', 'faculty'),
  (aleppo_id, 'كلية الاقتصاد', 'Faculty of Economics', 'faculty'),
  (aleppo_id, 'كلية الحقوق', 'Faculty of Law', 'faculty'),
  (aleppo_id, 'كلية التربية', 'Faculty of Education', 'faculty'),
  (aleppo_id, 'كلية الشريعة', 'Faculty of Sharia', 'faculty'),
  (aleppo_id, 'كلية الآداب والعلوم الإنسانية', 'Faculty of Arts and Humanities', 'faculty'),
  (aleppo_id, 'كلية الفنون الجميلة', 'Faculty of Fine Arts', 'faculty'),
  (aleppo_id, 'الكلية التطبيقية', 'Applied College', 'faculty')
  ON CONFLICT (university_id, name) DO NOTHING;

  -- Insert Aleppo technical institutes
  INSERT INTO faculties (university_id, name, name_en, type) VALUES
  (aleppo_id, 'المعهد التقاني الطبي', 'Technical Medical Institute', 'technical_institute'),
  (aleppo_id, 'المعهد التقاني لطب الأسنان', 'Technical Institute for Dentistry', 'technical_institute'),
  (aleppo_id, 'المعهد الصحي التقاني', 'Technical Health Institute', 'technical_institute'),
  (aleppo_id, 'المعهد التقاني لإدارة الأعمال والتسويق', 'Technical Institute for Business Administration and Marketing', 'technical_institute'),
  (aleppo_id, 'المعهد التقاني للعلوم المالية والمصرفية', 'Technical Institute for Financial and Banking Sciences', 'technical_institute'),
  (aleppo_id, 'المعهد التقاني الهندسي', 'Technical Engineering Institute', 'technical_institute'),
  (aleppo_id, 'المعهد التقاني للحاسوب', 'Technical Computer Institute', 'technical_institute'),
  (aleppo_id, 'المعهد التقاني الزراعي', 'Technical Agricultural Institute', 'technical_institute'),
  (aleppo_id, 'المعهد التقاني للهندسة الميكانيكية والكهربائية', 'Technical Institute for Mechanical and Electrical Engineering', 'technical_institute')
  ON CONFLICT (university_id, name) DO NOTHING;

  -- Insert Aleppo higher institutes
  INSERT INTO faculties (university_id, name, name_en, type) VALUES
  (aleppo_id, 'المعهد العالي للغات', 'Higher Institute for Languages', 'higher_institute'),
  (aleppo_id, 'المعهد العالي للتراث العلمي العربي', 'Higher Institute for Arab Scientific Heritage', 'higher_institute')
  ON CONFLICT (university_id, name) DO NOTHING;

  -- Insert Azaz branch
  INSERT INTO branches (university_id, name, city) VALUES
  (aleppo_id, 'فرع أعزاز', 'أعزاز')
  ON CONFLICT (university_id, name) DO UPDATE SET city = EXCLUDED.city
  RETURNING id INTO azaz_branch_id;

  -- Insert Azaz branch faculties
  INSERT INTO faculties (university_id, branch_id, name, name_en, type) VALUES
  (aleppo_id, azaz_branch_id, 'كلية الاقتصاد', 'Faculty of Economics', 'faculty'),
  (aleppo_id, azaz_branch_id, 'كلية الآداب والعلوم الإنسانية', 'Faculty of Arts and Humanities', 'faculty'),
  (aleppo_id, azaz_branch_id, 'كلية التربية', 'Faculty of Education', 'faculty'),
  (aleppo_id, azaz_branch_id, 'كلية الحقوق', 'Faculty of Law', 'faculty')
  ON CONFLICT (university_id, name, COALESCE(branch_id::text, '')) DO NOTHING;

  -- Insert Lattakia faculties
  INSERT INTO faculties (university_id, name, name_en, type) VALUES
  (lattakia_id, 'كلية الطب البشري', 'Faculty of Medicine', 'faculty'),
  (lattakia_id, 'كلية طب الأسنان', 'Faculty of Dentistry', 'faculty'),
  (lattakia_id, 'كلية الصيدلة', 'Faculty of Pharmacy', 'faculty'),
  (lattakia_id, 'كلية التمريض', 'Faculty of Nursing', 'faculty'),
  (lattakia_id, 'كلية الهندسة المدنية', 'Faculty of Civil Engineering', 'faculty'),
  (lattakia_id, 'كلية الهندسة المعمارية', 'Faculty of Architecture', 'faculty'),
  (lattakia_id, 'كلية الهندسة المعلوماتية', 'Faculty of Informatics Engineering', 'faculty'),
  (lattakia_id, 'كلية الهندسة الكهربائية', 'Faculty of Electrical Engineering', 'faculty'),
  (lattakia_id, 'كلية الهندسة الميكانيكية', 'Faculty of Mechanical Engineering', 'faculty'),
  (lattakia_id, 'الكلية التطبيقية', 'Applied College', 'faculty'),
  (lattakia_id, 'كلية الهندسة الزراعية', 'Faculty of Agricultural Engineering', 'faculty'),
  (lattakia_id, 'كلية الجيوماتية', 'Faculty of Geomatics', 'faculty'),
  (lattakia_id, 'كلية الهندسة البحرية', 'Faculty of Marine Engineering', 'faculty'),
  (lattakia_id, 'كلية الاقتصاد', 'Faculty of Economics', 'faculty'),
  (lattakia_id, 'كلية الحقوق', 'Faculty of Law', 'faculty'),
  (lattakia_id, 'كلية التربية', 'Faculty of Education', 'faculty')
  ON CONFLICT (university_id, name) DO NOTHING;

  -- Insert Lattakia technical institutes
  INSERT INTO faculties (university_id, name, name_en, type) VALUES
  (lattakia_id, 'المعهد التقاني الطبي', 'Technical Medical Institute', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني لطب الأسنان', 'Technical Institute for Dentistry', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني للهندسة', 'Technical Engineering Institute', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني للحاسوب', 'Technical Computer Institute', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني للعلوم المالية والمصرفية', 'Technical Institute for Financial and Banking Sciences', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني للطب البيطري', 'Technical Veterinary Institute', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني للزراعات المتوسطية', 'Technical Institute for Mediterranean Agriculture', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني الإحصائي', 'Technical Statistical Institute', 'technical_institute'),
  (lattakia_id, 'المعهد التقاني للعلوم السياحية والفندقية', 'Technical Institute for Tourism and Hotel Sciences', 'technical_institute'),
  (lattakia_id, 'مدرسة التمريض', 'Nursing School', 'technical_institute')
  ON CONFLICT (university_id, name) DO NOTHING;

  -- Insert Lattakia higher institutes
  INSERT INTO faculties (university_id, name, name_en, type) VALUES
  (lattakia_id, 'المعهد العالي للبحوث البحرية', 'Higher Institute for Marine Research', 'higher_institute'),
  (lattakia_id, 'المعهد العالي لبحوث البيئة', 'Higher Institute for Environmental Research', 'higher_institute'),
  (lattakia_id, 'المعهد العالي للغات', 'Higher Institute for Languages', 'higher_institute')
  ON CONFLICT (university_id, name) DO NOTHING;

END $$;