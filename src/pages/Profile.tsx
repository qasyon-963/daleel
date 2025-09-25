import { AppHeader } from "@/components/AppHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AcademicInfoForm } from "@/components/AcademicInfoForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  Bell,
  Heart,
  Share2,
  LogOut,
  Edit,
  CheckCircle,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  university_name?: string;
  faculty_name?: string;
  major_name?: string;
  academic_year?: string;
  university_id?: string;
  faculty_id?: string;
  major_id?: string;
}

export const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showAcademicForm, setShowAcademicForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requireAuth, setRequireAuth] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setRequireAuth(true);
        setLoading(false);
        return;
      }
      
      setSession(session);
      setUser(session.user);
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          setRequireAuth(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "شكراً لك على استخدام دليل",
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <User className="text-white" size={32} />
          </div>
          <p className="text-lg text-muted-foreground">جاري تحميل الملف الشخصي...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard 
      requireAuth={requireAuth} 
      message="يرجى تسجيل الدخول لعرض ملفك الشخصي وإدارة معلوماتك الأكاديمية"
    >
      <div className="min-h-screen bg-background pb-20">
        <AppHeader searchPlaceholder="البحث..." />
        
        <div className="p-4 space-y-6">
          {/* Header Section */}
          <div className="text-center py-8 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <User className="text-white" size={48} />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-3">
              الملف الشخصي
            </h1>
            <p className="text-muted-foreground text-lg">
              إدارة معلوماتك الشخصية والأكاديمية
            </p>
          </div>

          {/* User Info Card */}
          <Card className="card-modern animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </div>
                المعلومات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">الاسم الكامل</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    <p className="font-medium text-foreground">
                      {profile?.full_name || user?.email || "مستخدم"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">البريد الإلكتروني</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    <p className="font-medium text-foreground">{profile?.email || user?.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Info */}
          {!showAcademicForm && (
            <Card className="card-modern animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <GraduationCap size={16} className="text-white" />
                    </div>
                    الرغبات الأكاديمية
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAcademicForm(true)}
                    className="hover:bg-secondary/10"
                  >
                    <Edit size={18} className="text-secondary" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.university_name ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">الجامعة</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-secondary" />
                        <p className="font-medium text-foreground">{profile.university_name}</p>
                      </div>
                    </div>
                    {profile.faculty_name && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">الكلية</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-secondary" />
                          <p className="font-medium text-foreground">{profile.faculty_name}</p>
                        </div>
                      </div>
                    )}
                    {profile.major_name && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">التخصص</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-secondary" />
                          <p className="font-medium text-foreground">{profile.major_name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="text-secondary" size={32} />
                    </div>
                    <p className="text-muted-foreground mb-4 text-lg">لم تتم إضافة الرغبات الأكاديمية بعد</p>
                    <p className="text-sm text-muted-foreground mb-6">أضف رغباتك الأكاديمية للحصول على توصيات مخصصة</p>
                    <Button 
                      onClick={() => setShowAcademicForm(true)} 
                      className="bg-gradient-primary hover:bg-gradient-primary/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                    >
                      <GraduationCap size={18} />
                      إضافة الرغبات الأكاديمية
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

        {/* Academic Info Form */}
        {showAcademicForm && (
          <AcademicInfoForm
            onClose={() => setShowAcademicForm(false)}
            onSave={() => {
              setShowAcademicForm(false);
              fetchProfile();
            }}
            currentInfo={{
              university: profile?.university_id,
              faculty: profile?.faculty_id,
              major: profile?.major_id,
              year: profile?.academic_year,
            }}
          />
        )}

          {/* Quick Actions */}
          <Card className="card-modern animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Settings size={16} className="text-white" />
                </div>
                الإعدادات والخيارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start gap-3 text-right hover:bg-accent/10">
                <Bell size={18} className="text-accent" />
                <span>إعدادات الإشعارات</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-right hover:bg-accent/10">
                <BookOpen size={18} className="text-accent" />
                <span>سجل القراءة</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-right hover:bg-accent/10">
                <Share2 size={18} className="text-accent" />
                <span>مشاركة التطبيق</span>
              </Button>
              <div className="border-t border-border my-3"></div>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-right text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>تسجيل الخروج</span>
              </Button>
            </CardContent>
          </Card>

          {/* App Info */}
          <div className="text-center py-6 space-y-3 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="text-primary" size={24} />
            </div>
            <p className="text-sm text-muted-foreground">
              دليل - دليل الطلاب الجامعي في سوريا
            </p>
            <p className="text-xs text-muted-foreground">
              الإصدار 1.0.0 - تم إنشاؤه بحب للطلاب السوريين
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};