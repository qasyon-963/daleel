import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Calendar, Globe, BookOpen, Users, ExternalLink, Building2, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUniversityDetails, UniversityDetails } from "@/services/university";
import unifiedLogo from "@/assets/daleel-logo-new.png";
import aleppoLogo from "@/assets/aleepo-logo.jpg";
import aleppoBanner from "@/assets/daleel-logo-new.png";
import tishreenBanner from "@/assets/tishreen-university-banner.jpg";


const logoMapByName: Record<string, string> = {
  "جامعة دمشق": unifiedLogo,
  "جامعة حلب": unifiedLogo,
"جامعة اللاذقية": unifiedLogo,
"جامعة حماة": unifiedLogo,
  "جامعة إدلب": unifiedLogo,
   "جامعة حمص": unifiedLogo,
  "جامعة الفرات": unifiedLogo,
  "جامعة طرطوس": unifiedLogo,
};

const bannerMapByName: Record<string, string> = {
  "جامعة دمشق": unifiedLogo,
  "جامعة حلب": unifiedLogo,
  "جامعة اللاذقية": unifiedLogo,
  "جامعة إدلب": unifiedLogo,
   "جامعة حمص": unifiedLogo,
  "جامعة الفرات": unifiedLogo,
  "جامعة طرطوس": unifiedLogo,
};

export const UniversityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [universityDetails, setUniversityDetails] = useState<UniversityDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUniversityDetails = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const details = await getUniversityDetails(id);
        setUniversityDetails(details);
      } catch (error) {
        console.error('Failed to fetch university details:', error);
        setUniversityDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversityDetails();
  }, [id]);

  const university = universityDetails;

  if (isLoading) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-lg text-muted-foreground">جاري التحميل...</p>
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

  const universityLogo = university ? (logoMapByName[university.name] || university.logo_url) : undefined;
  const universityBanner = university ? (bannerMapByName[university.name] || university.banner_url) : undefined;

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
        {/* University Hero Section */}
        <div className="relative py-12 px-4">
          {/* University Logo - Centered */}
          <div className="flex flex-col items-center justify-center gap-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-20 animate-pulse-glow"></div>
              <img 
                src={universityLogo} 
                alt={university.name}
                className="university-logo w-32 h-32 object-cover animate-float relative z-10"
              />
            </div>
            
            {/* University Info - Centered */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text animate-slide-up">
                {university.name}
              </h1>
              <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
                {university?.name_en}
              </p>
              
              {/* Quick Info */}
              <div className="flex items-center justify-center gap-6 text-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {(university.google_maps_url || (university.location_lat && university.location_lng)) ? (
                  <a 
                    href={
                      university.google_maps_url || 
                      `https://www.google.com/maps/search/?api=1&query=${university.location_lat},${university.location_lng}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-card px-4 py-2 rounded-full border border-primary/30 interactive-hover transition-all duration-300 hover:border-primary hover:bg-primary/10"
                  >
                    <MapPin size={18} className="text-primary" strokeWidth={2.5} />
                    <span className="text-foreground font-semibold">{university.city}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 bg-gradient-card px-4 py-2 rounded-full border border-primary/30">
                    <MapPin size={18} className="text-primary" strokeWidth={2.5} />
                    <span className="text-foreground font-semibold">{university.city}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-gradient-card px-4 py-2 rounded-full border border-primary/30">
                  <Calendar size={18} className="text-primary" strokeWidth={2.5} />
                  <span className="text-foreground font-semibold">تأسست {university.established}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 animate-fade-in">
          {/* Quick Links */}
          <div className="grid grid-cols-1 gap-4">
            {/* Website Link */}
            {university.website && (
              <a 
                href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="card-glass interactive-hover transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Globe size={20} className="text-white" />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">الموقع الإلكتروني</p>
                          <p className="font-medium text-primary">{university.website}</p>
                        </div>
                      </div>
                      <ExternalLink size={18} className="text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            )}

            {/* Google Maps Link */}
            {(university.google_maps_url || (university.location_lat && university.location_lng)) && (
              <a 
                href={
                  university.google_maps_url || 
                  `https://www.google.com/maps/search/?api=1&query=${university.location_lat},${university.location_lng}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="card-glass interactive-hover transition-all duration-300 hover:shadow-lg hover:border-secondary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <MapPin size={20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-foreground/70 mb-1 font-medium">الموقع الجغرافي</p>
                          <p className="font-bold text-primary">عرض على خرائط جوجل</p>
                        </div>
                      </div>
                      <ExternalLink size={18} className="text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            )}
          </div>

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
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Building2 className="text-white" size={28} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text">
                    {universityDetails ? 
                      universityDetails.faculties.filter(f => f.type === 'technical_institute').length + 
                      universityDetails.faculties.filter(f => f.type === 'higher_institute').length +
                      universityDetails.branches.reduce((total, branch) => total + branch.faculties.filter(f => f.type === 'technical_institute').length, 0)
                      : 0}
                  </div>
                  <div className="text-sm text-foreground font-semibold">
                    معهد
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Campus Faculties */}
          {universityDetails && universityDetails.faculties.filter(f => f.type === 'faculty').length > 0 && (
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-lg gradient-text flex items-center gap-2">
                  <GraduationCap size={20} />
                  الكليات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {universityDetails.faculties.filter(f => f.type === 'faculty').map((faculty, index) => (
                  <div 
                    key={`${faculty.id}-${index}`} 
                    className="p-5 bg-gradient-card rounded-lg border border-border/50 interactive-hover animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {faculty.name}
                    </h3>
                    {faculty.name_en && (
                      <p className="text-sm text-muted-foreground">
                        {faculty.name_en}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

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
                        <div className="grid gap-3 mb-4">
                          {branch.faculties.filter(f => f.type === 'faculty').map((faculty) => (
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
