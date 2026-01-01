import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, BookOpen, ExternalLink, Users } from "lucide-react";
import { LikeButton } from "@/components/LikeButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface University {
  id: string;
  name: string;
  name_en: string;
  city: string;
  established: number;
  description: string;
  logo_url: string;
  banner_url: string;
  website: string;
  likes_count: number;
  type: 'public' | 'private';
}

export const Universities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .order('likes_count', { ascending: false });
        
        if (error) {
          console.error('Error fetching universities:', error);
        } else {
          setUniversities(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter(
    (university) =>
      university.name.includes(searchQuery) ||
      university.city.includes(searchQuery) ||
      university.name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUniversityClick = async (universityId: string) => {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Show auth dialog through AuthGuard
      setRequireAuth(true);
      return;
    }
    
    navigate(`/university/${universityId}`);
  };

  const [requireAuth, setRequireAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن الجامعات..."
        />
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">جاري تحميل الجامعات...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard 
      requireAuth={requireAuth} 
      message="يرجى تسجيل الدخول لاستكشاف الجامعات والكليات والتخصصات المتاحة"
    >
      <div className="min-h-screen bg-background pb-20">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن الجامعات..."
        />
        
        <div className="p-4 space-y-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl p-8 mb-8 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
            <div className="relative text-center">
              <h1 className="text-4xl font-bold gradient-text mb-4">
                دليل الجامعات السورية
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                منصتك الشاملة لاستكشاف الجامعات الحكومية السورية وجميع الكليات والتخصصات المتاحة. 
                ابدأ رحلتك الأكاديمية من هنا واكتشف مستقبلك المهني
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>جامعات حكومية معتمدة</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span>معلومات محدثة</span>
                </div>
              </div>
            </div>
          </div>

          {/* Browse Notice */}
          <div className="bg-gradient-card rounded-xl p-6 border border-border/50 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">استكشف بحرية</h3>
                <p className="text-sm text-muted-foreground">
                  تصفح الجامعات واستكشف المعلومات الأساسية. للوصول إلى تفاصيل الكليات والتخصصات، ستحتاج لتسجيل دخول مجاني
                </p>
              </div>
            </div>
          </div>

          {/* Universities Grid */}
          <div className="space-y-5">
            {filteredUniversities.map((university, index) => (
              <Card 
                key={university.id} 
                className="university-card cursor-pointer animate-slide-up hover:shadow-2xl"
                onClick={() => handleUniversityClick(university.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {university.name}
                    </h3>
                     <p className="text-sm text-muted-foreground">
                       {university.name_en}
                     </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LikeButton 
                      targetId={university.id}
                      targetType="university"
                      likesCount={university.likes_count || 0}
                    />
                    <div className="interactive-hover">
                      <ExternalLink className="text-primary" size={22} />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5">
                {/* Location and Year */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-foreground">{university.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Calendar size={14} className="text-white" />
                    </div>
                    <span className="text-muted-foreground">تأسست {university.established}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed">
                  {university.description}
                </p>

                 {/* University Info */}
                 <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                     university.type === 'private' ? 'bg-amber-500' : 'bg-gradient-accent'
                   }`}>
                     <BookOpen size={14} className="text-white" />
                   </div>
                   <span className="text-sm font-medium text-foreground">
                     {university.type === 'private' ? 'جامعة خاصة' : 'جامعة حكومية'}
                   </span>
                 </div>
              </CardContent>
            </Card>
          ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" size={32} />
              </div>
              <p className="text-muted-foreground text-lg">
                لم يتم العثور على جامعات تطابق بحثك
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};