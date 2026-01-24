import { useState, useEffect, useMemo, useCallback } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, ChevronDown, ChevronUp, BookOpen, Users, GraduationCap,
  Stethoscope, Scale, Cpu, FlaskConical, Palette, Building2, 
  Landmark, Languages, Calculator, Leaf, Plane, Briefcase, 
  Heart, Music, Camera, Hammer, Atom, Globe, BookText
} from "lucide-react";
import { LikeButton } from "@/components/LikeButton";
import { supabase } from "@/integrations/supabase/client";

interface Major {
  id: string;
  name: string;
  name_en: string;
  likes_count: number;
  description?: string;
  category?: string;
  duration?: string;
  career_opportunities?: string[];
  faculty: {
    name: string;
    name_en: string;
    university: {
      name: string;
      name_en: string;
    };
  };
}

// Category icons mapping
const getCategoryIcon = (category: string | undefined, majorName: string) => {
  const name = majorName.toLowerCase();
  const cat = category?.toLowerCase() || '';
  
  if (cat.includes('طب') || name.includes('طب') || name.includes('صيدل') || name.includes('تمريض')) return Stethoscope;
  if (cat.includes('قانون') || name.includes('حقوق') || name.includes('قانون')) return Scale;
  if (cat.includes('هندس') || name.includes('هندس') || cat.includes('تقن') || name.includes('برمج')) return Cpu;
  if (cat.includes('علوم') || name.includes('كيمياء') || name.includes('فيزياء') || name.includes('أحياء')) return FlaskConical;
  if (cat.includes('فنون') || name.includes('فن') || name.includes('تصميم') || name.includes('عمارة')) return Palette;
  if (name.includes('معمار') || name.includes('بناء') || name.includes('مدني')) return Building2;
  if (cat.includes('اقتصاد') || name.includes('اقتصاد') || name.includes('سياس') || name.includes('علوم سياسية')) return Landmark;
  if (cat.includes('لغ') || name.includes('لغة') || name.includes('أدب') || name.includes('ترجمة')) return Languages;
  if (name.includes('رياضي') || name.includes('إحصاء') || name.includes('محاسب')) return Calculator;
  if (cat.includes('زراع') || name.includes('زراع') || name.includes('بيئ') || name.includes('غابات')) return Leaf;
  if (name.includes('سياح') || name.includes('فندق') || name.includes('ضيافة')) return Plane;
  if (cat.includes('إدار') || name.includes('إدارة') || name.includes('تسويق') || name.includes('أعمال')) return Briefcase;
  if (name.includes('نفس') || name.includes('اجتماع') || name.includes('تربي')) return Heart;
  if (name.includes('موسيق')) return Music;
  if (name.includes('إعلام') || name.includes('صحاف')) return Camera;
  if (name.includes('مهن') || name.includes('تقني') || name.includes('صناع')) return Hammer;
  if (name.includes('نووي') || name.includes('ذرة')) return Atom;
  if (name.includes('جغراف') || name.includes('دولي')) return Globe;
  if (name.includes('تربية') || name.includes('تعليم') || cat.includes('تربي')) return BookText;
  
  return GraduationCap;
};

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
            description,
            category,
            duration,
            career_opportunities,
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
        
        if (!error) {
          setMajors(data || []);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, []);

  const filteredMajors = useMemo(() => {
    return majors.filter((major) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        major.name.includes(searchQuery) || 
        (major.name_en && major.name_en.toLowerCase().includes(searchLower)) ||
        major.faculty?.name.includes(searchQuery) ||
        major.faculty?.university?.name.includes(searchQuery) ||
        (major.category && major.category.includes(searchQuery))
      );
    });
  }, [majors, searchQuery]);

  const toggleMajorDetails = useCallback((majorId: string) => {
    setExpandedMajor(prev => prev === majorId ? null : majorId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن التخصصات..."
        />
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">جاري تحميل التخصصات...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard 
      requireAuth={requireAuth} 
      message="يرجى تسجيل الدخول لاستكشاف التخصصات الجامعية والحصول على معلومات مفصلة"
    >
      <div className="min-h-screen bg-background pb-24">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن التخصصات..."
        />
        
        <div className="p-4 space-y-6">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-background/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative text-center">
              <div className="w-14 h-14 bg-background/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary-foreground" size={28} />
              </div>
              <h1 className="text-3xl font-bold mb-3">دليل التخصصات الجامعية</h1>
              <p className="text-primary-foreground/80 text-sm">
                اكتشف جميع التخصصات المتاحة في الجامعات السورية
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center">
            <div className="bg-muted/50 rounded-xl px-6 py-3 text-center border border-border">
              <span className="text-2xl font-bold text-foreground">{majors.length}</span>
              <span className="text-sm text-muted-foreground mr-2">تخصص متاح</span>
            </div>
          </div>

          {/* Majors List */}
          <div className="space-y-3">
            {filteredMajors.map((major, index) => {
              const IconComponent = getCategoryIcon(major.category, major.name);
              
              return (
                <Card 
                  key={major.id} 
                  className="border border-border bg-card hover:border-primary transition-all duration-300 animate-slide-up overflow-hidden"
                  style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Icon Section */}
                      <div className="w-16 bg-primary flex items-center justify-center shrink-0">
                        <IconComponent size={24} className="text-primary-foreground" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-foreground mb-1 line-clamp-2">
                              {major.name}
                            </h3>
                            {major.name_en && (
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                                {major.name_en}
                              </p>
                            )}
                            <div className="flex items-center gap-2 flex-wrap">
                              {major.category && (
                                <Badge variant="secondary" className="text-xs bg-muted text-foreground">
                                  {major.category}
                                </Badge>
                              )}
                              {major.duration && (
                                <Badge variant="outline" className="text-xs flex items-center gap-1 border-border">
                                  <Clock size={10} />
                                  {major.duration}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 shrink-0">
                            <LikeButton 
                              targetId={major.id}
                              targetType="major"
                              likesCount={major.likes_count || 0}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleMajorDetails(major.id)}
                              className="hover:bg-muted h-9 w-9"
                            >
                              {expandedMajor === major.id ? (
                                <ChevronUp size={20} className="text-foreground" />
                              ) : (
                                <ChevronDown size={20} className="text-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {expandedMajor === major.id && (
                          <div className="space-y-3 pt-4 mt-4 border-t border-border animate-fade-in">
                            {major.description && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <h4 className="font-semibold text-sm text-foreground mb-1.5">
                                  نبذة عن التخصص
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {major.description}
                                </p>
                              </div>
                            )}
                            
                            {major.career_opportunities && major.career_opportunities.length > 0 && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                                  <Users size={14} />
                                  فرص العمل المتاحة
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  {major.career_opportunities.map((opportunity, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                      <span>{opportunity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredMajors.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-muted-foreground" size={28} />
              </div>
              <p className="text-muted-foreground">
                لم يتم العثور على تخصصات تطابق بحثك
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};
