import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, Image, LogOut, Plus } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/admin/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    setUser(user);
    setProfile(profile);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لك",
    });
    navigate("/");
  };

  if (!user || !profile) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="لوحة الإدارة" />
      
      <div className="container mx-auto p-4 pt-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">مرحباً، {profile.full_name}</h1>
            <p className="text-muted-foreground">إدارة محتوى دليل الجامعات</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Newspaper className="w-5 h-5 mr-2" />
                إدارة الأخبار
              </CardTitle>
              <CardDescription>
                إضافة وتحرير وحذف الأخبار الجامعية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/news")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                إدارة الأخبار
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="w-5 h-5 mr-2" />
                إدارة صور الجامعات
              </CardTitle>
              <CardDescription>
                تحديث صور وشعارات الجامعات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/universities")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                إدارة الجامعات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};