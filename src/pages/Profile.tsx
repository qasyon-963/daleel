import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";

// Sample user data - في التطبيق الحقيقي سيتم جلب هذه البيانات من قاعدة البيانات
const userData = {
  name: "أحمد محمد الأحمد",
  email: "ahmad.ahmad@example.com",
  university: "جامعة دمشق",
  faculty: "كلية الهندسة المعلوماتية",
  major: "هندسة البرمجيات",
  year: "السنة الثالثة",
  favoriteUniversities: ["جامعة دمشق", "جامعة حلب"],
  favoriteMajors: ["هندسة البرمجيات", "علوم الحاسوب", "الذكاء الاصطناعي"]
};

export const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
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
                  onClick={() => setIsLoggedIn(true)}
                >
                  تسجيل الدخول
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsLoggedIn(true)}
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
                  {userData.name}
                </h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Mail size={14} />
                  <span>{userData.email}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Edit size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} />
              المعلومات الأكاديمية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">الجامعة</p>
                <p className="font-medium text-foreground">{userData.university}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الكلية</p>
                <p className="font-medium text-foreground">{userData.faculty}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">التخصص</p>
                <p className="font-medium text-foreground">{userData.major}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">السنة الدراسية</p>
                <Badge variant="secondary">{userData.year}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorites Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="text-red-500" size={20} />
              المفضلة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Favorite Universities */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                الجامعات المفضلة
              </p>
              <div className="flex flex-wrap gap-2">
                {userData.favoriteUniversities.map((university, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {university}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Favorite Majors */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                التخصصات المفضلة
              </p>
              <div className="flex flex-wrap gap-2">
                {userData.favoriteMajors.map((major, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {major}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

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
              onClick={() => setIsLoggedIn(false)}
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