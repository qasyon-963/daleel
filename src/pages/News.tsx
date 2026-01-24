import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppHeader } from "@/components/AppHeader";
import { ArrowLeft, Calendar } from "lucide-react";
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

// Category labels in Arabic
const categoryLabels: Record<string, string> = {
  general: "عام",
  admissions: "قبول",
  exams: "امتحانات", 
  events: "فعاليات",
  scholarships: "منح",
};

export const News = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        return;
      }

      setNewsData(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNews = newsData.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (news.summary && news.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ar-EG-u-ca-gregory', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <AppHeader 
          onSearch={setSearchQuery}
          searchPlaceholder="البحث في الأخبار..."
        />
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">جاري تحميل الأخبار...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader 
        onSearch={setSearchQuery}
        searchPlaceholder="البحث في الأخبار..."
      />
      
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 animate-fade-in">
          <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative text-center">
            <h1 className="text-3xl font-bold mb-3">الأخبار الجامعية</h1>
            <p className="text-primary-foreground/80 text-sm">
              آخر الأخبار والإعلانات من الجامعات السورية
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="space-y-4">
          {filteredNews.map((news, index) => (
            <Card 
              key={news.id} 
              className="group cursor-pointer border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 animate-slide-up overflow-hidden"
              onClick={() => navigate(`/news/${news.id}`)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-bold leading-tight flex-1 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                      <ArrowLeft size={16} />
                    </div>
                  </div>
                  
                  {news.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {news.summary}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge 
                        variant="secondary"
                        className="bg-muted text-foreground text-xs"
                      >
                        {categoryLabels[news.category] || news.category}
                      </Badge>
                      {news.is_important && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          مهم
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      <span>{formatDate(news.created_at)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-muted-foreground" size={28} />
            </div>
            <p className="text-muted-foreground">
              {newsData.length === 0 ? "لا توجد أخبار متاحة حالياً" : "لم يتم العثور على أخبار تطابق البحث"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
