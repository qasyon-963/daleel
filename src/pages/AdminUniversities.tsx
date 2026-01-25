import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Upload, Image, Loader2, Check, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import defaultLogo from "@/assets/daleel-logo.png";

interface University {
  id: string;
  name: string;
  name_en: string;
  city: string;
  logo_url: string | null;
  banner_url: string | null;
}

export const AdminUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState<string | null>(null);
  const [uploadingBanner, setUploadingBanner] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setIsAuthorized(false);
      navigate("/admin/login");
      return;
    }

    const { data: isAdminResult, error: roleError } = await supabase
      .rpc('is_admin', { user_id: user.id });

    if (roleError || !isAdminResult) {
      setIsAuthorized(false);
      navigate("/admin/login");
      return;
    }

    setIsAuthorized(true);
    fetchUniversities();
  };

  const fetchUniversities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('universities')
      .select('id, name, name_en, city, logo_url, banner_url')
      .order('name');

    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل الجامعات",
        variant: "destructive",
      });
    } else {
      setUniversities(data || []);
    }
    setLoading(false);
  };

  const uploadFile = async (file: File, universityId: string, type: 'logo' | 'banner') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${universityId}-${type}-${Date.now()}.${fileExt}`;
    const filePath = `${type}s/${fileName}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('universitieslogos')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('universitieslogos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleLogoUpload = async (universityId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف صورة صالح",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "خطأ",
        description: "حجم الملف يجب أن يكون أقل من 2 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setUploadingLogo(universityId);

    try {
      const publicUrl = await uploadFile(file, universityId, 'logo');

      // Update university record
      const { error: updateError } = await supabase
        .from('universities')
        .update({ logo_url: publicUrl })
        .eq('id', universityId);

      if (updateError) throw updateError;

      // Update local state
      setUniversities(prev => 
        prev.map(u => u.id === universityId ? { ...u, logo_url: publicUrl } : u)
      );

      toast({
        title: "تم بنجاح",
        description: "تم رفع شعار الجامعة",
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في رفع الشعار",
        variant: "destructive",
      });
    } finally {
      setUploadingLogo(null);
    }
  };

  const handleBannerUpload = async (universityId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف صورة صالح",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "خطأ",
        description: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setUploadingBanner(universityId);

    try {
      const publicUrl = await uploadFile(file, universityId, 'banner');

      const { error: updateError } = await supabase
        .from('universities')
        .update({ banner_url: publicUrl })
        .eq('id', universityId);

      if (updateError) throw updateError;

      setUniversities(prev => 
        prev.map(u => u.id === universityId ? { ...u, banner_url: publicUrl } : u)
      );

      toast({
        title: "تم بنجاح",
        description: "تم رفع صورة البانر",
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في رفع البانر",
        variant: "destructive",
      });
    } finally {
      setUploadingBanner(null);
    }
  };

  const removeLogo = async (universityId: string) => {
    try {
      const { error } = await supabase
        .from('universities')
        .update({ logo_url: null })
        .eq('id', universityId);

      if (error) throw error;

      setUniversities(prev => 
        prev.map(u => u.id === universityId ? { ...u, logo_url: null } : u)
      );

      toast({
        title: "تم بنجاح",
        description: "تم حذف الشعار",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حذف الشعار",
        variant: "destructive",
      });
    }
  };

  const removeBanner = async (universityId: string) => {
    try {
      const { error } = await supabase
        .from('universities')
        .update({ banner_url: null })
        .eq('id', universityId);

      if (error) throw error;

      setUniversities(prev => 
        prev.map(u => u.id === universityId ? { ...u, banner_url: null } : u)
      );

      toast({
        title: "تم بنجاح",
        description: "تم حذف البانر",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حذف البانر",
        variant: "destructive",
      });
    }
  };

  if (isAuthorized === null || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (isAuthorized === false) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="إدارة شعارات الجامعات" />
      
      <div className="container mx-auto p-4 pt-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للوحة التحكم
        </Button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">إدارة شعارات الجامعات</h1>
          <p className="text-muted-foreground">قم برفع وإدارة شعارات وصور الجامعات</p>
        </div>

        <div className="grid gap-6">
          {universities.map((university) => (
            <Card key={university.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <img 
                    src={university.logo_url || defaultLogo} 
                    alt={university.name}
                    className="w-12 h-12 object-contain rounded-lg bg-muted p-1"
                  />
                  <div>
                    <div>{university.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">{university.city}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Logo Upload Section */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">الشعار (Logo)</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted">
                        {university.logo_url ? (
                          <img 
                            src={university.logo_url} 
                            alt="Logo"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image className="w-8 h-8 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`logo-${university.id}`} className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                            {uploadingLogo === university.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            <span>رفع شعار</span>
                          </div>
                          <Input
                            id={`logo-${university.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleLogoUpload(university.id, e)}
                            disabled={uploadingLogo === university.id}
                          />
                        </Label>
                        {university.logo_url && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeLogo(university.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="w-4 h-4 ml-1" />
                            حذف
                          </Button>
                        )}
                      </div>
                    </div>
                    {university.logo_url && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="w-4 h-4" />
                        <span>تم تعيين الشعار</span>
                      </div>
                    )}
                  </div>

                  {/* Banner Upload Section */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">صورة البانر (Banner)</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted">
                        {university.banner_url ? (
                          <img 
                            src={university.banner_url} 
                            alt="Banner"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image className="w-8 h-8 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`banner-${university.id}`} className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                            {uploadingBanner === university.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            <span>رفع بانر</span>
                          </div>
                          <Input
                            id={`banner-${university.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleBannerUpload(university.id, e)}
                            disabled={uploadingBanner === university.id}
                          />
                        </Label>
                        {university.banner_url && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeBanner(university.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="w-4 h-4 ml-1" />
                            حذف
                          </Button>
                        )}
                      </div>
                    </div>
                    {university.banner_url && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="w-4 h-4" />
                        <span>تم تعيين البانر</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
