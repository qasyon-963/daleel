import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LikeButtonProps {
  targetId: string;
  targetType: 'major' | 'university';
  likesCount: number;
  className?: string;
}

export const LikeButton = ({ targetId, targetType, likesCount, className }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkIfLiked();
  }, [targetId, targetType]);

  const checkIfLiked = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .maybeSingle();

      if (error) {
        console.error('Error checking like status:', error);
        return;
      }

      setIsLiked(!!data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "يرجى تسجيل الدخول",
          description: "تحتاج لتسجيل الدخول لإضافة إعجاب",
          variant: "destructive"
        });
        return;
      }

      setLoading(true);

      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', session.user.id)
          .eq('target_type', targetType)
          .eq('target_id', targetId);

        if (error) {
          console.error('Error removing like:', error);
          toast({
            title: "خطأ",
            description: "حدث خطأ في إزالة الإعجاب",
            variant: "destructive"
          });
          return;
        }

        setIsLiked(false);
        setCurrentLikesCount(prev => Math.max(0, prev - 1));
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: session.user.id,
            target_type: targetType,
            target_id: targetId
          });

        if (error) {
          console.error('Error adding like:', error);
          toast({
            title: "خطأ",
            description: "حدث خطأ في إضافة الإعجاب",
            variant: "destructive"
          });
          return;
        }

        setIsLiked(true);
        setCurrentLikesCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 hover:bg-primary/10 ${className}`}
    >
      <Heart 
        size={16} 
        className={`transition-colors ${
          isLiked 
            ? 'text-red-500 fill-red-500' 
            : 'text-muted-foreground hover:text-red-500'
        }`}
      />
    </Button>
  );
};