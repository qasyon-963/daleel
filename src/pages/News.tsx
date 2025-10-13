import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import { ArrowLeft } from "lucide-react";
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

// Category colors for badges
const categoryColors: Record<string, string> = {
  general: "bg-blue-100 text-blue-800",
  admissions: "bg-green-100 text-green-800",
  exams: "bg-orange-100 text-orange-800",
  events: "bg-purple-100 text-purple-800",
  scholarships: "bg-pink-100 text-pink-800",
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
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader 
          onSearch={setSearchQuery}
          searchPlaceholder="البحث في الأخبار..."
        />
        <div className="container mx-auto p-4 pt-20">
          <div className="text-center">جاري تحميل الأخبار...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        onSearch={setSearchQuery}
        searchPlaceholder="البحث في الأخبار..."
      />
      
      <div className="container mx-auto p-4 pt-6">
        {/* Header Section */}
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold mb-2">الأخبار الجامعية</h2>
          <p className="text-muted-foreground">
            آخر الأخبار والإعلانات من الجامعات السورية
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6">
          {filteredNews.map((news) => (
            <Card 
              key={news.id} 
              className="university-card hover-lift cursor-pointer interactive-hover"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold leading-tight flex-1">
                      {news.title}
                    </h3>
                    <ArrowLeft size={20} className="text-primary shrink-0 mt-1" strokeWidth={2.5} />
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
                        className="bg-gradient-primary/10 text-primary border-primary/20"
                      >
                        {categoryLabels[news.category]}
                      </Badge>
                      {news.is_important && (
                        <Badge variant="destructive">
                          مهم
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-foreground font-semibold">
                      {formatDate(news.created_at)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {newsData.length === 0 ? "لا توجد أخبار متاحة حالياً" : "لم يتم العثور على أخبار تطابق البحث"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};