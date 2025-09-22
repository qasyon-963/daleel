import { AppHeader } from "@/components/AppHeader";
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
  Edit
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
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader searchPlaceholder="البحث..." />
        
        <div className="flex items-center justify-center min-h-[70vh] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="text-primary" size={32} />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">
                  مرحباً بك في دليل
                </h2>
                <p className="text-muted-foreground text-sm">
                  قم بتسجيل الدخول للوصول إلى ملفك الشخصي وحفظ الجامعات والتخصصات المفضلة
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full btn-primary"
                  onClick={() => navigate('/auth')}
                >
                  تسجيل الدخول
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/auth')}
                >
                  إنشاء حساب جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader searchPlaceholder="البحث..." />
      
      <div className="p-4 space-y-6">
        {/* User Info Card */}
        <Card className="card-hero">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="text-primary" size={28} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  {profile?.full_name || user?.email || "مستخدم"}
                </h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Mail size={14} />
                  <span>{profile?.email || user?.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        {!showAcademicForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-primary" size={20} />
                  المعلومات الأكاديمية
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAcademicForm(true)}
                >
                  <Edit size={18} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.university_name ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">الجامعة</p>
                    <p className="font-medium text-foreground">{profile.university_name}</p>
                  </div>
                  {profile.faculty_name && (
                    <div>
                      <p className="text-sm text-muted-foreground">الكلية</p>
                      <p className="font-medium text-foreground">{profile.faculty_name}</p>
                    </div>
                  )}
                  {profile.major_name && (
                    <div>
                      <p className="text-sm text-muted-foreground">التخصص</p>
                      <p className="font-medium text-foreground">{profile.major_name}</p>
                    </div>
                  )}
                  {profile.academic_year && (
                    <div>
                      <p className="text-sm text-muted-foreground">السنة الدراسية</p>
                      <Badge variant="secondary">{profile.academic_year}</Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="mx-auto mb-3 text-muted-foreground" size={48} />
                  <p className="text-muted-foreground mb-4">لم تتم إضافة المعلومات الأكاديمية بعد</p>
                  <Button onClick={() => setShowAcademicForm(true)}>
                    إضافة المعلومات الأكاديمية
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="text-primary" size={20} />
              الإعدادات والخيارات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start gap-3 text-right">
              <Bell size={18} />
              إعدادات الإشعارات
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-right">
              <BookOpen size={18} />
              سجل القراءة
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-right">
              <Share2 size={18} />
              مشاركة التطبيق
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-right text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              تسجيل الخروج
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center py-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            دليل - دليل الطلاب الجامعي في سوريا
          </p>
          <p className="text-xs text-muted-foreground">
            الإصدار 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};