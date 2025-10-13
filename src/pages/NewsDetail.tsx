import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, ExternalLink, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  created_at: string;
  category: string;
  is_important: boolean;
  source: string;
  image_url: string;
}

const categoryLabels: Record<string, string> = {
  general: "عام",
  admissions: "قبول",
  exams: "امتحانات",
  events: "فعاليات",
  scholarships: "منح",
  academic: "أكاديمي",
};

export const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching news:", error);
          setNews(null);
        } else {
          setNews(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
          <p className="text-lg text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            الخبر غير موجود
          </h2>
          <Button
            onClick={() => navigate("/news")}
            variant="outline"
            className="btn-primary"
          >
            العودة للأخبار
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/30">
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/news")}
            className="flex items-center gap-2 interactive-hover"
          >
            <ArrowRight size={18} />
            رجوع
          </Button>
          <h1 className="text-lg font-bold gradient-text">تفاصيل الخبر</h1>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        {/* News Header */}
        <Card className="card-modern">
          <CardContent className="p-6 space-y-4">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold gradient-text leading-tight">
              {news.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date */}
              <div className="flex items-center gap-2 bg-gradient-card px-4 py-2 rounded-full border border-primary/30">
                <Calendar size={18} className="text-primary" strokeWidth={2.5} />
                <span className="text-foreground font-semibold text-sm">
                  {formatDate(news.created_at)}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2 bg-gradient-card px-4 py-2 rounded-full border border-primary/30">
                <Tag size={18} className="text-primary" strokeWidth={2.5} />
                <span className="text-foreground font-semibold text-sm">
                  {categoryLabels[news.category] || news.category}
                </span>
              </div>

              {/* Important Badge */}
              {news.is_important && (
                <Badge variant="destructive" className="px-4 py-2">
                  مهم
                </Badge>
              )}
            </div>

            {/* Source Link */}
            {news.source && (
              <a
                href={news.source.startsWith("http") ? news.source : `https://${news.source}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline interactive-hover"
              >
                <ExternalLink size={16} strokeWidth={2.5} />
                <span className="font-medium">المصدر</span>
              </a>
            )}
          </CardContent>
        </Card>

        {/* News Image */}
        {news.image_url && (
          <Card className="card-modern overflow-hidden">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-auto object-cover"
            />
          </Card>
        )}

        {/* News Content */}
        <Card className="card-modern">
          <CardContent className="p-6">
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line text-lg">
                {news.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
