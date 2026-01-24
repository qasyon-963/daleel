import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Calendar, BookOpen, ArrowLeft } from "lucide-react";
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
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setRequireAuth(true);
      return;
    }
    
    navigate(`/university/${universityId}`);
  };

  const [requireAuth, setRequireAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن الجامعات..."
        />
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">جاري تحميل الجامعات...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard 
      requireAuth={requireAuth} 
      message="يرجى تسجيل الدخول لاستكشاف الجامعات والكليات والتخصصات المتاحة"
    >
      <div className="min-h-screen bg-background pb-24">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن الجامعات..."
        />
        
        <div className="p-4 space-y-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-background/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative text-center">
              <h1 className="text-3xl font-bold mb-3">
                دليل الجامعات السورية
              </h1>
              <p className="text-primary-foreground/80 text-sm max-w-md mx-auto leading-relaxed">
                منصتك الشاملة لاستكشاف الجامعات وجميع الكليات والتخصصات المتاحة
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-primary-foreground" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">استكشف بحرية</h3>
                <p className="text-xs text-muted-foreground">
                  تصفح الجامعات واستكشف المعلومات. سجّل دخولك للوصول الكامل
                </p>
              </div>
            </div>
          </div>

          {/* Universities Grid */}
          <div className="space-y-4">
            {filteredUniversities.map((university, index) => (
              <Card 
                key={university.id} 
                className="group cursor-pointer border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 animate-slide-up overflow-hidden"
                onClick={() => handleUniversityClick(university.id)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {university.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {university.name_en}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <LikeButton 
                        targetId={university.id}
                        targetType="university"
                        likesCount={university.likes_count || 0}
                      />
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowLeft size={16} />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 pt-0">
                  {/* Location and Year */}
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center">
                        <MapPin size={14} className="text-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{university.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center">
                        <Calendar size={14} className="text-foreground" />
                      </div>
                      <span className="text-muted-foreground">تأسست {university.established}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {university.description}
                  </p>

                  {/* University Type Badge */}
                  <div className="flex items-center">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      university.type === 'private' 
                        ? 'bg-muted text-foreground' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {university.type === 'private' ? 'جامعة خاصة' : 'جامعة حكومية'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-muted-foreground" size={28} />
              </div>
              <p className="text-muted-foreground">
                لم يتم العثور على جامعات تطابق بحثك
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};
