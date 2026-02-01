-- Create mind_maps table for storing generated mind maps
CREATE TABLE public.mind_maps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content_preview TEXT,
  purpose TEXT NOT NULL DEFAULT 'understanding',
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.mind_maps ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own mind maps" 
ON public.mind_maps 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mind maps" 
ON public.mind_maps 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mind maps" 
ON public.mind_maps 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_mind_maps_updated_at
BEFORE UPDATE ON public.mind_maps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for mind map images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mind-maps', 'mind-maps', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for mind map images
CREATE POLICY "Mind map images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'mind-maps');

CREATE POLICY "Authenticated users can upload mind map images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'mind-maps' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own mind map images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'mind-maps' AND auth.role() = 'authenticated');