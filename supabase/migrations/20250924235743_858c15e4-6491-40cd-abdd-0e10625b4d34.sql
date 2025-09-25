-- Fix duplicate faculties and add missing English translations
-- Delete duplicate faculties for Damascus University
DELETE FROM faculties WHERE id IN (
  SELECT f1.id FROM faculties f1
  JOIN faculties f2 ON f1.name = f2.name AND f1.university_id = f2.university_id
  WHERE f1.id > f2.id
);

-- Update missing English translations for faculties
UPDATE faculties SET name_en = 'Higher Institute for Arab Scientific Heritage' WHERE name = 'المعهد العالي للتراث العلمي العربي' AND name_en IS NULL;
UPDATE faculties SET name_en = 'Higher Institute for Languages' WHERE name = 'المعهد العالي للغات' AND name_en IS NULL;
UPDATE faculties SET name_en = 'Faculty of Arts' WHERE name = 'كلية الآداب' AND name_en IS NULL;
UPDATE faculties SET name_en = 'Faculty of Arts and Humanities' WHERE name = 'كلية الآداب والعلوم الإنسانية' AND name_en IS NULL;
UPDATE faculties SET name_en = 'Faculty of Islamic Studies' WHERE name = 'كلية الشريعة' AND name_en IS NULL;
UPDATE faculties SET name_en = 'Faculty of Science' WHERE name = 'كلية العلوم' AND name_en IS NULL;
UPDATE faculties SET name_en = 'Faculty of Fine Arts' WHERE name = 'كلية الفنون الجميلة' AND name_en IS NULL;

-- Add English translations for majors that are missing them
-- Get all majors without English names and add appropriate translations
UPDATE majors SET name_en = 'Computer Science' WHERE name LIKE '%حاسوب%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Mathematics' WHERE name LIKE '%رياضيات%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Physics' WHERE name LIKE '%فيزياء%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Chemistry' WHERE name LIKE '%كيمياء%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Biology' WHERE name LIKE '%أحياء%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Arabic Language' WHERE name LIKE '%عربية%' AND name_en IS NULL;
UPDATE majors SET name_en = 'English Language' WHERE name LIKE '%إنجليزية%' AND name_en IS NULL;
UPDATE majors SET name_en = 'History' WHERE name LIKE '%تاريخ%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Geography' WHERE name LIKE '%جغرافيا%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Philosophy' WHERE name LIKE '%فلسفة%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Psychology' WHERE name LIKE '%نفس%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Sociology' WHERE name LIKE '%اجتماع%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Education' WHERE name LIKE '%تربية%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Engineering' WHERE name LIKE '%هندسة%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Medicine' WHERE name LIKE '%طب%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Law' WHERE name LIKE '%حقوق%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Economics' WHERE name LIKE '%اقتصاد%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Business Administration' WHERE name LIKE '%إدارة%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Accounting' WHERE name LIKE '%محاسبة%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Finance' WHERE name LIKE '%مالية%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Tourism' WHERE name LIKE '%سياحة%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Agriculture' WHERE name LIKE '%زراعة%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Pharmacy' WHERE name LIKE '%صيدلة%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Dentistry' WHERE name LIKE '%أسنان%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Veterinary Medicine' WHERE name LIKE '%بيطري%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Nursing' WHERE name LIKE '%تمريض%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Arts' WHERE name LIKE '%فنون%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Media and Communication' WHERE name LIKE '%إعلام%' AND name_en IS NULL;
UPDATE majors SET name_en = 'Political Science' WHERE name LIKE '%سياسية%' AND name_en IS NULL;
UPDATE majors SET name_en = 'International Relations' WHERE name LIKE '%دولية%' AND name_en IS NULL;