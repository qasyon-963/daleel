import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GenerateParams {
  content: string;
  contentType: 'text' | 'pdf';
  purpose: string;
  userId: string;
}

interface GenerateResult {
  imageUrl: string;
  title: string;
}

export const useMindMapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generate = async (params: GenerateParams): Promise<GenerateResult | null> => {
    const { content, contentType, purpose, userId } = params;

    if (!content || content.length < 50) {
      toast({
        title: "المحتوى قصير جداً",
        description: "يرجى إدخال محتوى أطول (50 حرف على الأقل)",
        variant: "destructive",
      });
      return null;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-mind-map', {
        body: {
          content,
          contentType,
          purpose,
          userId,
        },
      });

      if (fnError) {
        throw new Error(fnError.message || 'فشل في إنشاء الخريطة الذهنية');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data?.imageUrl) {
        throw new Error('لم يتم إنشاء الخريطة الذهنية');
      }

      toast({
        title: "تم الإنشاء بنجاح",
        description: "تم إنشاء الخريطة الذهنية بنجاح",
      });

      return {
        imageUrl: data.imageUrl,
        title: data.title || 'خريطة ذهنية',
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(message);
      toast({
        title: "خطأ",
        description: message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generate,
    isGenerating,
    error,
  };
};
