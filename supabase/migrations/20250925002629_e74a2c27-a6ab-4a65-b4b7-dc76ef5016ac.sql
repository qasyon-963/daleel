-- Create likes table for majors and universities
CREATE TABLE public.likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('major', 'university')),
  target_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, target_type, target_id)
);

-- Enable RLS
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Create policies for likes
CREATE POLICY "Users can view all likes" 
ON public.likes 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own likes" 
ON public.likes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" 
ON public.likes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_likes_updated_at
BEFORE UPDATE ON public.likes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add likes_count column to majors table
ALTER TABLE public.majors ADD COLUMN likes_count INTEGER DEFAULT 0;

-- Add likes_count column to universities table  
ALTER TABLE public.universities ADD COLUMN likes_count INTEGER DEFAULT 0;

-- Create function to update likes count
CREATE OR REPLACE FUNCTION public.update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increase likes count
    IF NEW.target_type = 'major' THEN
      UPDATE public.majors SET likes_count = likes_count + 1 WHERE id = NEW.target_id;
    ELSIF NEW.target_type = 'university' THEN
      UPDATE public.universities SET likes_count = likes_count + 1 WHERE id = NEW.target_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrease likes count
    IF OLD.target_type = 'major' THEN
      UPDATE public.majors SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.target_id;
    ELSIF OLD.target_type = 'university' THEN
      UPDATE public.universities SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.target_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically update likes count
CREATE TRIGGER update_likes_count_trigger
AFTER INSERT OR DELETE ON public.likes
FOR EACH ROW
EXECUTE FUNCTION public.update_likes_count();