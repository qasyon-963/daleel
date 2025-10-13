import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AppHeader } from "@/components/AppHeader";
import { ArrowRight, Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";

interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  is_important: boolean;
  source: string;
  image_url: string;
  created_at: string;
}

const newsSchema = z.object({
  title: z.string()
    .trim()
    .min(3, "العنوان قصير جداً")
    .max(200, "العنوان طويل جداً"),
  summary: z.string()
    .trim()
    .max(500, "الملخص طويل جداً")
    .optional()
    .or(z.literal("")),
  content: z.string()
    .trim()
    .min(10, "المحتوى قصير جداً")
    .max(10000, "المحتوى طويل جداً"),
  category: z.enum(["general", "admissions", "exams", "events", "scholarships"]),
  image_url: z.string()
    .trim()
    .url("رابط الصورة غير صالح")
    .max(500, "رابط الصورة طويل جداً")
    .refine(val => !val || val.startsWith("https://"), "يجب استخدام HTTPS")
    .optional()
    .or(z.literal("")),
  source: z.string()
    .trim()
    .max(200, "المصدر طويل جداً")
    .optional()
    .or(z.literal("")),
  is_important: z.boolean()
});

export const AdminNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "general",
    is_important: false,
    source: "",
    image_url: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchNews();
  }, []);

  const checkAuth = async () => {
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
  };

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل الأخبار",
        variant: "destructive",
      });
      return;
    }

    setNews(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const validatedData = newsSchema.parse({
        title: formData.title,
        summary: formData.summary || "",
        content: formData.content,
        category: formData.category,
        image_url: formData.image_url || "",
        source: formData.source || "",
        is_important: formData.is_important
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (editingId) {
        const { error } = await supabase
          .from("news")
          .update({
            title: validatedData.title,
            summary: validatedData.summary || null,
            content: validatedData.content,
            category: validatedData.category,
            is_important: validatedData.is_important,
            source: validatedData.source || null,
            image_url: validatedData.image_url || null,
          })
          .eq("id", editingId);

        if (error) {
          toast({
            title: "خطأ",
            description: "فشل في تحديث الخبر",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "تم التحديث",
          description: "تم تحديث الخبر بنجاح",
        });
      } else {
        const { error } = await supabase
          .from("news")
          .insert({
            title: validatedData.title,
            summary: validatedData.summary || null,
            content: validatedData.content,
            category: validatedData.category,
            is_important: validatedData.is_important,
            source: validatedData.source || null,
            image_url: validatedData.image_url || null,
            author_id: user.id,
          });

        if (error) {
          toast({
            title: "خطأ",
            description: "فشل في إضافة الخبر",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "تم الإضافة",
          description: "تم إضافة الخبر بنجاح",
        });
      }

      resetForm();
      fetchNews();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "خطأ في البيانات",
          description: error.issues[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Error saving news:", error);
        toast({
          title: "حدث خطأ",
          description: "لم يتم حفظ الخبر",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (newsItem: News) => {
    setFormData({
      title: newsItem.title,
      summary: newsItem.summary || "",
      content: newsItem.content,
      category: newsItem.category,
      is_important: newsItem.is_important,
      source: newsItem.source || "",
      image_url: newsItem.image_url || "",
    });
    setEditingId(newsItem.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الخبر؟")) return;

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في حذف الخبر",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم الحذف",
      description: "تم حذف الخبر بنجاح",
    });
    fetchNews();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "general",
      is_important: false,
      source: "",
      image_url: "",
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const categoryLabels: Record<string, string> = {
    general: "عام",
    admissions: "قبول",
    exams: "امتحانات",
    events: "فعاليات",
    scholarships: "منح",
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">جاري التحقق من الصلاحيات...</div>
        </div>
      </div>
    );
  }

  if (isAuthorized === false) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        title="إدارة الأخبار" 
        showBackButton 
        onBackClick={() => navigate("/admin")}
      />
      
      <div className="container mx-auto p-4 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة الأخبار</h1>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            إضافة خبر جديد
          </Button>
        </div>

        {isEditing && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? "تحرير الخبر" : "إضافة خبر جديد"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">العنوان</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">الملخص</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">المحتوى</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source">المصدر</Label>
                    <Input
                      id="source"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">رابط الصورة</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.is_important}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_important: checked })}
                  />
                  <Label>خبر مهم</Label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingId ? "تحديث" : "إضافة"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {news.map((newsItem) => (
            <Card key={newsItem.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{newsItem.title}</h3>
                      {newsItem.is_important && (
                        <Badge variant="destructive">مهم</Badge>
                      )}
                      <Badge variant="secondary">
                        {categoryLabels[newsItem.category]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{newsItem.summary}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat('ar-EG-u-ca-gregory', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(newsItem.created_at))}
                      {newsItem.source && ` • ${newsItem.source}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(newsItem)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(newsItem.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
