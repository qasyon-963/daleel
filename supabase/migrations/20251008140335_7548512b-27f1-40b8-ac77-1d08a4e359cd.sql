-- Step 1: Drop all foreign key constraints that reference universities.id
ALTER TABLE public.faculties DROP CONSTRAINT IF EXISTS faculties_university_id_fkey;
ALTER TABLE public.branches DROP CONSTRAINT IF EXISTS branches_university_id_fkey;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_university_id_fkey;

-- Step 2: Add temporary slug column to universities
ALTER TABLE public.universities ADD COLUMN IF NOT EXISTS slug text;

-- Step 3: Populate slug column with English names for known universities
UPDATE public.universities SET slug = 'damascus-university' WHERE name LIKE '%دمشق%' OR name_en LIKE '%Damascus%';
UPDATE public.universities SET slug = 'aleppo-university' WHERE name LIKE '%حلب%' OR name_en LIKE '%Aleppo%';
UPDATE public.universities SET slug = 'tishreen-university' WHERE name LIKE '%تشرين%' OR name_en LIKE '%Tishreen%';
UPDATE public.universities SET slug = 'baath-university' WHERE name LIKE '%البعث%' OR name_en LIKE '%Al-Baath%' OR name_en LIKE '%Baath%';

-- Step 4: For any universities without a slug, create one from name_en
UPDATE public.universities 
SET slug = lower(regexp_replace(name_en, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL AND name_en IS NOT NULL;

-- Step 5: For any still without slug, use name
UPDATE public.universities 
SET slug = 'university-' || substr(md5(name), 1, 8)
WHERE slug IS NULL;

-- Step 6: Create mapping table for old UUID to new slug
CREATE TEMP TABLE university_id_mapping AS
SELECT id::text as old_id, slug as new_id FROM public.universities;

-- Step 7: Update faculties table
ALTER TABLE public.faculties ADD COLUMN IF NOT EXISTS new_university_id text;
UPDATE public.faculties f 
SET new_university_id = m.new_id 
FROM university_id_mapping m 
WHERE f.university_id::text = m.old_id;

-- Step 8: Update branches table
ALTER TABLE public.branches ADD COLUMN IF NOT EXISTS new_university_id text;
UPDATE public.branches b 
SET new_university_id = m.new_id 
FROM university_id_mapping m 
WHERE b.university_id::text = m.old_id;

-- Step 9: Update profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS new_university_id text;
UPDATE public.profiles p 
SET new_university_id = m.new_id 
FROM university_id_mapping m 
WHERE p.university_id::text = m.old_id;

-- Step 10: Drop old university_id columns
ALTER TABLE public.faculties DROP COLUMN university_id;
ALTER TABLE public.branches DROP COLUMN university_id;
ALTER TABLE public.profiles DROP COLUMN university_id;

-- Step 11: Rename new columns to university_id
ALTER TABLE public.faculties RENAME COLUMN new_university_id TO university_id;
ALTER TABLE public.branches RENAME COLUMN new_university_id TO university_id;
ALTER TABLE public.profiles RENAME COLUMN new_university_id TO university_id;

-- Step 12: Set NOT NULL for faculties and branches
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.faculties WHERE university_id IS NULL) THEN
    ALTER TABLE public.faculties ALTER COLUMN university_id SET NOT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.branches WHERE university_id IS NULL) THEN
    ALTER TABLE public.branches ALTER COLUMN university_id SET NOT NULL;
  END IF;
END $$;

-- Step 13: Change universities.id from uuid to text
ALTER TABLE public.universities DROP CONSTRAINT universities_pkey;
ALTER TABLE public.universities DROP COLUMN id;
ALTER TABLE public.universities RENAME COLUMN slug TO id;
ALTER TABLE public.universities ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.universities ADD PRIMARY KEY (id);

-- Step 14: Re-create foreign key constraints
ALTER TABLE public.faculties 
ADD CONSTRAINT faculties_university_id_fkey 
FOREIGN KEY (university_id) REFERENCES public.universities(id) ON DELETE CASCADE;

ALTER TABLE public.branches 
ADD CONSTRAINT branches_university_id_fkey 
FOREIGN KEY (university_id) REFERENCES public.universities(id) ON DELETE CASCADE;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_university_id_fkey 
FOREIGN KEY (university_id) REFERENCES public.universities(id) ON DELETE SET NULL;