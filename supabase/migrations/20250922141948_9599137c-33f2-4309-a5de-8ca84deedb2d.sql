-- Fix duplicate faculties in Damascus University by removing entries with null name_en where duplicates exist
DELETE FROM faculties 
WHERE university_id = (SELECT id FROM universities WHERE name = 'جامعة دمشق')
  AND name_en IS NULL 
  AND EXISTS (
    SELECT 1 FROM faculties f2 
    WHERE f2.university_id = faculties.university_id 
    AND f2.name = faculties.name 
    AND f2.name_en IS NOT NULL
  );

-- Update Tishreen University name to University of Lattakia
UPDATE universities 
SET name = 'جامعة اللاذقية', 
    name_en = 'University of Lattakia'
WHERE name = 'جامعة تشرين';

-- Add English names for Aleppo University faculties
UPDATE faculties 
SET name_en = CASE 
  WHEN name = 'كلية الاقتصاد' THEN 'Faculty of Economics'
  WHEN name = 'كلية التربية' THEN 'Faculty of Education'
  WHEN name = 'كلية التمريض' THEN 'Faculty of Nursing'
  WHEN name = 'كلية الجيوماتية' THEN 'Faculty of Geomatics'
  WHEN name = 'كلية الحقوق' THEN 'Faculty of Law'
  WHEN name = 'كلية الصيدلة' THEN 'Faculty of Pharmacy'
  WHEN name = 'كلية الطب البشري' THEN 'Faculty of Human Medicine'
  WHEN name = 'كلية الهندسة البحرية' THEN 'Faculty of Marine Engineering'
  WHEN name = 'كلية الهندسة الزراعية' THEN 'Faculty of Agricultural Engineering'
  WHEN name = 'كلية الهندسة الكهربائية' THEN 'Faculty of Electrical Engineering'
  WHEN name = 'كلية الهندسة المدنية' THEN 'Faculty of Civil Engineering'
  WHEN name = 'كلية الهندسة المعلوماتية' THEN 'Faculty of Informatics Engineering'
  WHEN name = 'كلية الهندسة المعمارية' THEN 'Faculty of Architecture'
  WHEN name = 'كلية الهندسة الميكانيكية' THEN 'Faculty of Mechanical Engineering'
  WHEN name = 'كلية طب الأسنان' THEN 'Faculty of Dentistry'
  WHEN name = 'الكلية التطبيقية' THEN 'Applied College'
  ELSE name_en
END
WHERE university_id IN (
  SELECT id FROM universities WHERE name IN ('جامعة حلب', 'جامعة اللاذقية')
) AND name_en IS NULL;

-- Add English names for technical institutes in Aleppo and Lattakia universities
UPDATE faculties 
SET name_en = CASE 
  WHEN name = 'المعهد التقاني الزراعي' THEN 'Technical Agricultural Institute'
  WHEN name = 'المعهد التقاني الطبي' THEN 'Technical Medical Institute'
  WHEN name = 'المعهد التقاني الهندسي' THEN 'Technical Engineering Institute'
  WHEN name = 'المعهد التقاني لإدارة الأعمال والتسويق' THEN 'Technical Institute for Business Administration and Marketing'
  WHEN name = 'المعهد التقاني لطب الأسنان' THEN 'Technical Institute for Dentistry'
  WHEN name = 'المعهد التقاني للحاسوب' THEN 'Technical Computer Institute'
  WHEN name = 'المعهد التقاني للعلوم المالية والمصرفية' THEN 'Technical Institute for Financial and Banking Sciences'
  WHEN name = 'المعهد التقاني للهندسة الميكانيكية والكهربائية' THEN 'Technical Institute for Mechanical and Electrical Engineering'
  WHEN name = 'المعهد الصحي التقاني' THEN 'Technical Health Institute'
  WHEN name = 'المعهد التقاني الاحصائي' THEN 'Technical Statistical Institute'
  WHEN name = 'المعهد التقاني للزراعات المتوسطية' THEN 'Technical Institute for Mediterranean Agriculture'
  WHEN name = 'المعهد التقاني للطب البيطري' THEN 'Technical Institute for Veterinary Medicine'
  WHEN name = 'المعهد التقاني للعلوم السياحية والفندقية' THEN 'Technical Institute for Tourism and Hotel Sciences'
  WHEN name = 'مدرسة التمريض' THEN 'Nursing School'
  ELSE name_en
END
WHERE university_id IN (
  SELECT id FROM universities WHERE name IN ('جامعة حلب', 'جامعة اللاذقية')
) AND name_en IS NULL AND type IN ('technical_institute', 'higher_institute');

-- Add English names for higher institutes in Lattakia University
UPDATE faculties 
SET name_en = CASE 
  WHEN name = 'المعهد العالي لبحوث البيئة' THEN 'Higher Institute for Environmental Research'
  WHEN name = 'المعهد العالي للبحوث البحرية' THEN 'Higher Institute for Marine Research'
  WHEN name = 'المعهد العالي للغات' THEN 'Higher Institute for Languages'
  ELSE name_en
END
WHERE university_id = (SELECT id FROM universities WHERE name = 'جامعة اللاذقية')
AND name_en IS NULL AND type = 'higher_institute';