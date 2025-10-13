-- Add sequential public_number and backfill
-- 1) Add column and sequence default
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='public' AND table_name='news' AND column_name='public_number'
  ) THEN
    ALTER TABLE public.news ADD COLUMN public_number bigint;
    -- Create sequence if not exists
    CREATE SEQUENCE IF NOT EXISTS public.news_public_number_seq OWNED BY public.news.public_number;
    ALTER TABLE public.news ALTER COLUMN public_number SET DEFAULT nextval('public.news_public_number_seq');
  END IF;
END $$;

-- 2) Backfill existing rows in chronological order for deterministic numbering
WITH ordered AS (
  SELECT id FROM public.news WHERE public_number IS NULL ORDER BY created_at ASC, id ASC
)
UPDATE public.news n
SET public_number = nextval('public.news_public_number_seq')
FROM ordered o
WHERE n.id = o.id;

-- 3) Enforce constraints
ALTER TABLE public.news ALTER COLUMN public_number SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS news_public_number_unique_idx ON public.news(public_number);
