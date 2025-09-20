import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Bell } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "announcement" | "admission" | "scholarship" | "exam";
  isImportant: boolean;
  source: string;
}

// Sample news data - في التطبيق الحقيقي سيتم جلب هذه البيانات من API
const newsData: NewsItem[] = [
  {
    id: "1",
    title: "إعلان مواعيد التسجيل للعام الدراسي الجديد 2024-2025",
    summary: "أعلنت وزارة التعليم العالي والبحث العلمي عن مواعيد التسجيل للعام الدراسي الجديد في الجامعات الحكومية السورية.",
    date: "2024-09-15",
    category: "admission",
    isImportant: true,
    source: "وزارة التعليم العالي والبحث العلمي"
  },
  {
    id: "2", 
    title: "منح دراسية للطلاب المتفوقين في الجامعات السورية",
    summary: "تعلن الوزارة عن توفر منح دراسية للطلاب المتفوقين أكاديمياً في مختلف التخصصات الجامعية.",
    date: "2024-09-12",
    category: "scholarship",
    isImportant: false,
    source: "وزارة التعليم العالي والبحث العلمي"
  },
  {
    id: "3",
    title: "تعديل مواعيد الامتحانات النهائية لكليات الطب",
    summary: "تم تعديل جدول الامتحانات النهائية لكليات الطب في الجامعات السورية نظراً للظروف الاستثنائية.",
    date: "2024-09-10",
    category: "exam",
    isImportant: true,
    source: "اتحاد كليات الطب السورية"
  },
  {
    id: "4",
    title: "افتتاح معمل جديد للحاسوب في جامعة دمشق",
    summary: "تم افتتاح معمل حديث للحاسوب مجهز بأحدث التقنيات في كلية الهندسة المعلوماتية بجامعة دمشق.",
    date: "2024-09-08",
    category: "announcement",
    isImportant: false,
    source: "جامعة دمشق"
  },
  {
    id: "5",
    title: "ورشة عمل حول ريادة الأعمال للطلاب الجامعيين",
    summary: "تنظم الوزارة ورشة عمل مجانية حول ريادة الأعمال والابتكار موجهة لجميع الطلاب الجامعيين.",
    date: "2024-09-05",
    category: "announcement",
    isImportant: false,
    source: "وزارة التعليم العالي والبحث العلمي"
  }
];

const categoryLabels = {
  announcement: "إعلان",
  admission: "قبول جامعي",
  scholarship: "منح دراسية", 
  exam: "امتحانات"
};

const categoryColors = {
  announcement: "bg-blue-100 text-blue-800",
  admission: "bg-green-100 text-green-800",
  scholarship: "bg-purple-100 text-purple-800",
  exam: "bg-orange-100 text-orange-800"
};

export const News = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsData.filter(
    (news) =>
      news.title.includes(searchQuery) ||
      news.summary.includes(searchQuery) ||
      news.source.includes(searchQuery)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        onSearch={setSearchQuery} 
        searchPlaceholder="البحث في الأخبار..."
      />
      
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            الأخبار والإعلانات
          </h2>
          <p className="text-muted-foreground">
            آخر الأخبار والإعلانات من وزارة التعليم العالي والجامعات السورية
          </p>
        </div>

        {/* News List */}
        <div className="space-y-4">
          {filteredNews.map((news) => (
            <Card key={news.id} className="university-card">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  {news.isImportant && (
                    <Bell className="text-red-500 mt-1 flex-shrink-0" size={20} />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground leading-tight mb-2">
                      {news.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge 
                        variant="secondary"
                        className={`text-xs ${categoryColors[news.category]}`}
                      >
                        {categoryLabels[news.category]}
                      </Badge>
                      {news.isImportant && (
                        <Badge variant="destructive" className="text-xs">
                          مهم
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="text-primary flex-shrink-0" size={18} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Summary */}
                <p className="text-sm text-foreground leading-relaxed">
                  {news.summary}
                </p>

                {/* Date and Source */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-primary" />
                    <span>{formatDate(news.date)}</span>
                  </div>
                  <span className="font-medium">
                    {news.source}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              لم يتم العثور على أخبار تطابق بحثك
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            للحصول على آخر الأخبار والإعلانات، يرجى زيارة الموقع الرسمي لوزارة التعليم العالي
          </p>
        </div>
      </div>
    </div>
  );
};