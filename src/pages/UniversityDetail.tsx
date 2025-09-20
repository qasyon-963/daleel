import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Globe, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { syrianUniversities } from "@/data/universities";

export const UniversityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const university = syrianUniversities.find(u => u.id === id);

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">الجامعة غير موجودة</h2>
          <Button onClick={() => navigate("/")} variant="outline">
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowRight size={18} />
            رجوع
          </Button>
          <h1 className="text-lg font-bold text-primary">تفاصيل الجامعة</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* University Header Card */}
        <Card className="card-hero">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-foreground">
                {university.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {university.nameEn}
              </p>
              
              {/* Basic Info */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-primary" />
                  <span>{university.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-secondary" />
                  <span>تأسست {university.established}</span>
                </div>
              </div>

              {university.website && (
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Globe size={16} className="text-accent" />
                  <span className="text-accent">{university.website}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">نبذة عن الجامعة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {university.description}
            </p>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div className="text-2xl font-bold text-primary">
                  {university.faculties.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  كلية ومعهد
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Users className="text-secondary" size={24} />
                </div>
                <div className="text-2xl font-bold text-secondary">
                  {university.faculties.reduce((total, faculty) => total + faculty.majors.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  تخصص أكاديمي
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الكليات والمعاهد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {university.faculties.map((faculty) => (
              <div key={faculty.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {faculty.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {faculty.nameEn}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    التخصصات المتاحة:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faculty.majors.map((major, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {major}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};