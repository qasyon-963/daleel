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
  
  // Medical & Health
  if (cat.includes('طب') || name.includes('طب') || name.includes('صيدل') || name.includes('تمريض')) {
    return Stethoscope;
  }
  // Law
  if (cat.includes('قانون') || name.includes('حقوق') || name.includes('قانون')) {
    return Scale;
  }
  // Engineering & Technology
  if (cat.includes('هندس') || name.includes('هندس') || cat.includes('تقن') || name.includes('برمج')) {
    return Cpu;
  }
  // Science
  if (cat.includes('علوم') || name.includes('كيمياء') || name.includes('فيزياء') || name.includes('أحياء')) {
    return FlaskConical;
  }
  // Arts & Design
  if (cat.includes('فنون') || name.includes('فن') || name.includes('تصميم') || name.includes('عمارة')) {
    return Palette;
  }
  // Architecture & Construction
  if (name.includes('معمار') || name.includes('بناء') || name.includes('مدني')) {
    return Building2;
  }
  // Politics & Economics
  if (cat.includes('اقتصاد') || name.includes('اقتصاد') || name.includes('سياس') || name.includes('علوم سياسية')) {
    return Landmark;
  }
  // Languages & Literature
  if (cat.includes('لغ') || name.includes('لغة') || name.includes('أدب') || name.includes('ترجمة')) {
    return Languages;
  }
  // Math & Statistics
  if (name.includes('رياضي') || name.includes('إحصاء') || name.includes('محاسب')) {
    return Calculator;
  }
  // Agriculture & Environment
  if (cat.includes('زراع') || name.includes('زراع') || name.includes('بيئ') || name.includes('غابات')) {
    return Leaf;
  }
  // Tourism & Hotels
  if (name.includes('سياح') || name.includes('فندق') || name.includes('ضيافة')) {
    return Plane;
  }
  // Business & Management
  if (cat.includes('إدار') || name.includes('إدارة') || name.includes('تسويق') || name.includes('أعمال')) {
    return Briefcase;
  }
  // Psychology & Social
  if (name.includes('نفس') || name.includes('اجتماع') || name.includes('تربي')) {
    return Heart;
  }
  // Music
  if (name.includes('موسيق')) {
    return Music;
  }
  // Media & Journalism
  if (name.includes('إعلام') || name.includes('صحاف')) {
    return Camera;
  }
  // Technical & Vocational
  if (name.includes('مهن') || name.includes('تقني') || name.includes('صناع')) {
    return Hammer;
  }
  // Physics & Nuclear
  if (name.includes('نووي') || name.includes('ذرة')) {
    return Atom;
  }
  // Geography & International
  if (name.includes('جغراف') || name.includes('دولي')) {
    return Globe;
  }
  // Education & Literature
  if (name.includes('تربية') || name.includes('تعليم') || cat.includes('تربي')) {
    return BookText;
  }
  
  return GraduationCap;
};

// Category colors mapping
const getCategoryColor = (category: string | undefined, majorName: string) => {
  const name = majorName.toLowerCase();
  const cat = category?.toLowerCase() || '';
  
  if (cat.includes('طب') || name.includes('طب') || name.includes('صيدل')) {
    return 'from-rose-500 to-pink-600';
  }
  if (cat.includes('هندس') || name.includes('هندس')) {
    return 'from-blue-500 to-cyan-600';
  }
  if (cat.includes('قانون') || name.includes('حقوق')) {
    return 'from-amber-500 to-orange-600';
  }
  if (cat.includes('علوم') || name.includes('علوم')) {
    return 'from-emerald-500 to-teal-600';
  }
  if (cat.includes('فنون') || name.includes('فن')) {
    return 'from-purple-500 to-violet-600';
  }
  if (cat.includes('اقتصاد') || name.includes('اقتصاد') || name.includes('إدارة')) {
    return 'from-indigo-500 to-blue-600';
  }
  if (cat.includes('لغ') || name.includes('لغة') || name.includes('أدب')) {
    return 'from-fuchsia-500 to-pink-600';
  }
  if (cat.includes('زراع') || name.includes('زراع')) {
    return 'from-green-500 to-emerald-600';
  }
  
  return 'from-primary to-primary/80';
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
        
        if (error) {
          // Error handled silently
        } else {
          setMajors(data || []);
        }
      } catch {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, []);

  // Memoized filtered majors
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
      <div className="min-h-screen bg-background pb-20">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن التخصصات..."
        />
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-muted-foreground">جاري تحميل التخصصات...</p>
          </div>
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
          <div className="text-center py-6 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/25 rotate-3 hover:rotate-0 transition-transform">
              <BookOpen className="text-primary-foreground" size={40} />
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-3">
              دليل التخصصات الجامعية
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              اكتشف جميع التخصصات المتاحة في الجامعات السورية
            </p>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl px-6 py-4 text-center border border-primary/20 animate-slide-up">
              <div className="text-3xl font-bold text-primary">{majors.length}</div>
              <div className="text-sm text-muted-foreground">تخصص متاح</div>
            </div>
          </div>

          {/* Majors List */}
          <div className="space-y-4">
            {filteredMajors.map((major, index) => {
              const IconComponent = getCategoryIcon(major.category, major.name);
              const colorClass = getCategoryColor(major.category, major.name);
              
              return (
                <Card 
                  key={major.id} 
                  className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-slide-up bg-card"
                  style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Icon Section */}
                      <div className={`w-20 sm:w-24 bg-gradient-to-br ${colorClass} flex items-center justify-center shrink-0`}>
                        <IconComponent size={32} className="text-white" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2">
                              {major.name}
                            </h3>
                            {major.name_en && (
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                                {major.name_en}
                              </p>
                            )}
                            <div className="flex items-center gap-2 flex-wrap">
                              {major.category && (
                                <Badge variant="secondary" className="text-xs bg-secondary/50">
                                  {major.category}
                                </Badge>
                              )}
                              {major.duration && (
                                <Badge variant="outline" className="text-xs flex items-center gap-1">
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
                              className="hover:bg-primary/10 h-10 w-10"
                            >
                              {expandedMajor === major.id ? (
                                <ChevronUp size={24} className="text-primary" />
                              ) : (
                                <ChevronDown size={24} className="text-primary" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {expandedMajor === major.id && (
                          <div className="space-y-3 pt-4 mt-4 border-t border-border animate-fade-in">
                            {major.description && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <h4 className="font-semibold text-sm text-foreground mb-1.5 flex items-center gap-2">
                                  <div className={`w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full`}></div>
                                  نبذة عن التخصص
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {major.description}
                                </p>
                              </div>
                            )}
                            
                            {major.career_opportunities && major.career_opportunities.length > 0 && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                                  <Users size={14} className="text-primary" />
                                  فرص العمل المتاحة
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  {major.career_opportunities.map((opportunity, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClass} rounded-full`}></div>
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
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" size={32} />
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