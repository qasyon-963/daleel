import { useState, useEffect } from "react";
import { Clock, Trash2, Eye, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface HistoryItem {
  id: string;
  title: string;
  image_url: string;
  purpose: string;
  created_at: string;
}

interface MindMapsHistoryProps {
  userId: string | null;
  onSelectMap: (imageUrl: string, title: string) => void;
  refreshTrigger?: number;
}

const purposeLabels: Record<string, string> = {
  understanding: 'فهم المحتوى',
  summarization: 'التلخيص',
  revision: 'المراجعة',
  exam_prep: 'التحضير للامتحان',
};

export const MindMapsHistory = ({ userId, onSelectMap, refreshTrigger }: MindMapsHistoryProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId, refreshTrigger]);

  const fetchHistory = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('mind_maps')
        .select('id, title, image_url, purpose, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory((data as HistoryItem[]) || []);
    } catch (error) {
      console.error('Error fetching mind map history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('mind_maps')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف الخريطة الذهنية بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحذف",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Brain className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          لم تقم بإنشاء أي خرائط ذهنية بعد
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-2">
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="group border border-border rounded-xl p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    {purposeLabels[item.purpose] || item.purpose}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>
                    {formatDistanceToNow(new Date(item.created_at), { 
                      addSuffix: true, 
                      locale: ar 
                    })}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onSelectMap(item.image_url, item.title)}
                >
                  <Eye size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
