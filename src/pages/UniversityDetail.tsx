import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Calendar, Globe, BookOpen, Users, ExternalLink, Building2, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { syrianUniversities } from "@/data/universities";
import { getUniversityDetails, UniversityDetails } from "@/services/university";
import damascusLogo from "@/assets/damascus-logo.png";
import aleppoLogo from "@/assets/aleppo-logo.png";
import tishreenLogo from "@/assets/tishreen-logo.png";
import damascusBanner from "@/assets/damascus-university-banner.jpg";
import aleppoBanner from "@/assets/aleppo-university-banner.jpg";
import tishreenBanner from "@/assets/tishreen-university-banner.jpg";

const logoMap: Record<string, string> = {
  damascus: damascusLogo,
  aleppo: aleppoLogo,
  tishreen: tishreenLogo,
};

const bannerMap: Record<string, string> = {
  damascus: damascusBanner,
  aleppo: aleppoBanner,
  tishreen: tishreenBanner,
};

export const UniversityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [universityDetails, setUniversityDetails] = useState<UniversityDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fallback to static data for non-damascus universities
  const staticUniversity = syrianUniversities.find(u => u.id === id);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      // Try to fetch from database first (for Damascus University)
      if (id === 'damascus') {
        const details = await getUniversityDetails('a1111111-1111-1111-1111-111111111111');
        if (details) {
          setUniversityDetails(details);
        }
      }
      
      setIsLoading(false);
    };

    fetchUniversityDetails();
  }, [id]);

  // Use database data for Damascus, fallback to static data for others
  const university = universityDetails || staticUniversity;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-pulse">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-4">الجامعة غير موجودة</h2>
          <Button onClick={() => navigate("/")} variant="outline" className="btn-primary">
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  const universityLogo = logoMap[university.id];
  const universityBanner = bannerMap[university.id];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/30">
        <div className="flex items-center gap-4 p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 interactive-hover"
          >
            <ArrowRight size={18} />
            رجوع
          </Button>
          <h1 className="text-lg font-bold gradient-text">تفاصيل الجامعة</h1>
        </div>
      </header>

      <div className="space-y-0">
        {/* University Hero Banner */}
        <div className="relative">
          {/* Banner Background */}
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${universityBanner})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Content Over Banner */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end gap-6">
                {/* University Logo - Circular on the right */}
                <div className="relative ml-auto">
                  <img 
                    src={universityLogo} 
                    alt={university.name}
                    className="university-logo w-24 h-24 object-cover animate-float"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse-glow">
                    <ExternalLink className="text-white" size={16} />
                  </div>
                </div>
                
                {/* University Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-3xl font-bold mb-2 animate-slide-up">
                    {university.name}
                  </h1>
                  <p className="text-xl text-white/90 mb-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {universityDetails ? universityDetails.name_en : (university as any).nameEn}
                  </p>
                  
                  {/* Quick Info */}
                  <div className="flex items-center gap-6 text-sm text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-secondary" />
                      <span>{university.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-accent" />
                      <span>تأسست {university.established}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 animate-fade-in">
          {/* Website Link */}
          {university.website && (
            <Card className="card-glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Globe size={18} className="text-accent" />
                  <span className="font-medium">{university.website}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-lg gradient-text">نبذة عن الجامعة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {university.description}
              </p>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="card-modern bg-gradient-hero/5">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="space-y-3 interactive-hover">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <BookOpen className="text-white" size={28} />
                    </div>
                  </div>
                   <div className="text-3xl font-bold gradient-text">
                    {universityDetails ? 
                      universityDetails.faculties.filter(f => f.type === 'faculty').length + 
                      universityDetails.branches.reduce((total, branch) => total + branch.faculties.filter(f => f.type === 'faculty').length, 0)
                      : university.faculties?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    كلية
                  </div>
                </div>
                <div className="space-y-3 interactive-hover">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Building2 className="text-white" size={28} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-secondary">
                    {universityDetails ? 
                      universityDetails.faculties.filter(f => f.type === 'technical_institute').length + 
                      universityDetails.faculties.filter(f => f.type === 'higher_institute').length +
                      universityDetails.branches.reduce((total, branch) => total + branch.faculties.filter(f => f.type === 'technical_institute').length, 0)
                      : 0}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    معهد
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Campus Faculties */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-lg gradient-text flex items-center gap-2">
                <GraduationCap size={20} />
                كليات الحرم الرئيسي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(universityDetails?.faculties.filter(f => f.type === 'faculty') || university.faculties || []).map((faculty, index) => (
                <div 
                  key={faculty.id || index} 
                  className="p-5 bg-gradient-card rounded-lg border border-border/50 space-y-4 interactive-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {faculty.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {faculty.name_en || faculty.nameEn}
                    </p>
                  </div>
                  
                  {faculty.majors && faculty.majors.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <BookOpen size={16} className="text-primary" />
                        التخصصات المتاحة:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {faculty.majors.map((major, majorIndex) => (
                          <Badge 
                            key={majorIndex} 
                            variant="secondary" 
                            className="text-xs bg-gradient-primary/10 text-primary border-primary/20 hover:bg-gradient-primary/20 transition-all duration-300"
                          >
                            {typeof major === 'string' ? major : major.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Technical Institutes */}
          {universityDetails && universityDetails.faculties.filter(f => f.type === 'technical_institute').length > 0 && (
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-lg gradient-text flex items-center gap-2">
                  <Building2 size={20} />
                  المعاهد التقنية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {universityDetails.faculties.filter(f => f.type === 'technical_institute').map((institute, index) => (
                  <div 
                    key={institute.id} 
                    className="p-5 bg-gradient-card rounded-lg border border-border/50 interactive-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {institute.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {institute.name_en}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Higher Institutes */}
          {universityDetails && universityDetails.faculties.filter(f => f.type === 'higher_institute').length > 0 && (
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-lg gradient-text flex items-center gap-2">
                  <BookOpen size={20} />
                  المعاهد العليا
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {universityDetails.faculties.filter(f => f.type === 'higher_institute').map((institute, index) => (
                  <div 
                    key={institute.id} 
                    className="p-5 bg-gradient-card rounded-lg border border-border/50 interactive-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {institute.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {institute.name_en}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* University Branches */}
          {universityDetails && universityDetails.branches.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text text-center">فروع الجامعة</h2>
              {universityDetails.branches.map((branch, branchIndex) => (
                <Card key={branch.id} className="card-modern">
                  <CardHeader>
                    <CardTitle className="text-lg gradient-text flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={20} />
                        {branch.name}
                      </div>
                      <Badge variant="outline">{branch.city}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Branch Faculties */}
                    {branch.faculties.filter(f => f.type === 'faculty').length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
                          <GraduationCap size={16} />
                          الكليات
                        </h4>
                        <div className="grid gap-3">
                          {branch.faculties.filter(f => f.type === 'faculty').map((faculty, facultyIndex) => (
                            <div key={faculty.id} className="p-3 bg-gradient-primary/5 rounded-lg border border-primary/20">
                              <h5 className="font-medium">{faculty.name}</h5>
                              {faculty.name_en && <p className="text-sm text-muted-foreground">{faculty.name_en}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Branch Technical Institutes */}
                    {branch.faculties.filter(f => f.type === 'technical_institute').length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-secondary flex items-center gap-2">
                          <Building2 size={16} />
                          المعاهد التقنية
                        </h4>
                        <div className="grid gap-3">
                          {branch.faculties.filter(f => f.type === 'technical_institute').map((institute, instituteIndex) => (
                            <div key={institute.id} className="p-3 bg-gradient-secondary/5 rounded-lg border border-secondary/20">
                              <h5 className="font-medium">{institute.name}</h5>
                              {institute.name_en && <p className="text-sm text-muted-foreground">{institute.name_en}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};