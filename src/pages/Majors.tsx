import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { LikeButton } from "@/components/LikeButton";
import { supabase } from "@/integrations/supabase/client";

interface Major {
  id: string;
  name: string;
  name_en: string;
  likes_count: number;
  faculty: {
    name: string;
    name_en: string;
    university: {
      name: string;
      name_en: string;
    };
  };
}

export const Majors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [requireAuth, setRequireAuth] = useState(false);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setRequireAuth(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('majors')
          .select(`
            id,
            name,
            name_en,
            likes_count,
            faculty:faculties(
              name,
              name_en,
              university:universities(
                name,
                name_en
              )
            )
          `)
          .order('likes_count', { ascending: false });
        
        if (error) {
          console.error('Error fetching majors:', error);
        } else {
          setMajors(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, []);

  // Filter majors based on search query
  const filteredMajors = majors.filter((major) => {
    const matchesSearch = 
      major.name.includes(searchQuery) || 
      (major.name_en && major.name_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
      major.faculty?.name.includes(searchQuery) ||
      major.faculty?.university?.name.includes(searchQuery);
    
    return matchesSearch;
  });

  const toggleMajorDetails = (majorId: string) => {
    setExpandedMajor(expandedMajor === majorId ? null : majorId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن التخصصات..."
        />
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">جاري تحميل التخصصات...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard 
      requireAuth={requireAuth} 
      message="يرجى تسجيل الدخول لاستكشاف التخصصات الجامعية والحصول على معلومات مفصلة"
    >
      <div className="min-h-screen bg-background pb-20">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن التخصصات..."
        />
        
        <div className="p-4 space-y-6">
          {/* Header Section */}
          <div className="text-center py-8 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <GraduationCap className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-3">
              دليل التخصصات الجامعية
            </h2>
            <p className="text-muted-foreground text-lg">
              اكتشف جميع التخصصات المتاحة في الجامعات السورية مع معلومات مفصلة
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-card rounded-xl p-6 text-center animate-slide-up">
              <div className="text-2xl font-bold text-primary">{majors.length}</div>
              <div className="text-sm text-muted-foreground">تخصص متاح</div>
            </div>
            <div className="bg-gradient-card rounded-xl p-6 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl font-bold text-secondary">3</div>
              <div className="text-sm text-muted-foreground">جامعات حكومية</div>
            </div>
            <div className="bg-gradient-card rounded-xl p-6 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl font-bold text-accent">{filteredMajors.length}</div>
              <div className="text-sm text-muted-foreground">نتيجة البحث</div>
            </div>
          </div>

          {/* Majors List */}
          <div className="space-y-4">
            {filteredMajors.map((major, index) => (
              <Card 
                key={major.id} 
                className="card-modern animate-slide-up hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {major.name}
                      </h3>
                      {major.name_en && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {major.name_en}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary" className="bg-gradient-primary/10 text-primary border-primary/20">
                          {major.faculty?.name || 'غير محدد'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {major.faculty?.university?.name || 'غير محدد'}
                        </Badge>
                      </div>
                      {major.faculty?.name_en && (
                        <p className="text-sm text-muted-foreground">
                          {major.faculty.name_en} - {major.faculty?.university?.name_en}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <LikeButton 
                        targetId={major.id}
                        targetType="major"
                        likesCount={major.likes_count || 0}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMajorDetails(major.id)}
                        className="hover:bg-primary/10"
                      >
                        {expandedMajor === major.id ? (
                          <ChevronUp size={20} className="text-primary" />
                        ) : (
                          <ChevronDown size={20} className="text-primary" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {expandedMajor === major.id && (
                    <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                      <div className="bg-gradient-card rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
                          معلومات التخصص
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          هذا التخصص متاح في {major.faculty?.name} في {major.faculty?.university?.name}. 
                          للمزيد من المعلومات حول شروط القبول والمناهج الدراسية، 
                          يرجى التواصل مع الجامعة مباشرة.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMajors.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-primary" size={32} />
              </div>
              <p className="text-muted-foreground text-lg">
                لم يتم العثور على تخصصات تطابق بحثك
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};