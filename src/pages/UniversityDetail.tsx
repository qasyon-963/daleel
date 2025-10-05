import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Calendar, Globe, BookOpen, Users, ExternalLink, Building2, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUniversityDetails, UniversityDetails } from "@/services/university";
import unifiedLogo from "@/assets/daleel-logo-new.png";
import damascusBanner from "@/assets/daleel-logo-new.png";
import aleppoBanner from "@/assets/daleel-logo-new.png";
import tishreenBanner from "@/assets/tishreen-university-banner.jpg";


const logoMapByName: Record<string, string> = {
  "جامعة دمشق": unifiedLogo,
  "جامعة حلب": unifiedLogo,
"جامعة اللاذقية": unifiedLogo,
"جامعة حماة": unifiedLogo,
  "جامعة إدلب": unifiedLogo,
  "جامعة حمص": unifiedLogo,
};

const bannerMapByName: Record<string, string> = {
  "جامعة دمشق": unifiedLogo,
  "جامعة حلب": unifiedLogo,
  "جامعة اللاذقية": unifiedLogo,
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
                    {university?.name_en}
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

          {/* Main Campus Faculties by Category */}
          {universityDetails && (() => {
            const faculties = universityDetails.faculties.filter(f => f.type === 'faculty');
            const categorizedFaculties = faculties.reduce((acc, faculty) => {
              const category = faculty.category || 'عامة';
              if (!acc[category]) acc[category] = [];
              acc[category].push(faculty);
              return acc;
            }, {} as Record<string, typeof faculties>);

            return Object.entries(categorizedFaculties).map(([category, categoryFaculties]) => (
              <Card key={category} className="card-modern">
                <CardHeader>
                  <CardTitle className="text-lg gradient-text flex items-center gap-2">
                    <GraduationCap size={20} />
                    الكليات ال{category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryFaculties.map((faculty, index) => (
                    <div 
                      key={`${faculty.id}-${index}`} 
                      className="p-5 bg-gradient-card rounded-lg border border-border/50 space-y-4 interactive-hover animate-slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-1">
                          {faculty.name}
                        </h3>
                        {faculty.name_en && (
                          <p className="text-sm text-muted-foreground">
                            {faculty.name_en}
                          </p>
                        )}
                      </div>
                      
                      {faculty.majors && faculty.majors.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <BookOpen size={16} className="text-primary" />
                            التخصصات المتاحة:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {faculty.majors.slice(0, 6).map((major, majorIndex) => (
                              <Badge 
                                key={majorIndex} 
                                variant="secondary" 
                                className="text-xs bg-gradient-primary/10 text-primary border-primary/20 hover:bg-gradient-primary/20 transition-all duration-300"
                              >
                                {typeof major === 'string' ? major : major.name}
                              </Badge>
                            ))}
                            {faculty.majors.length > 6 && (
                              <Badge variant="outline" className="text-xs">
                                +{faculty.majors.length - 6} أخرى
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ));
          })()}

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
                    {/* Branch Faculties by Category */}
                    {(() => {
                      const branchFaculties = branch.faculties.filter(f => f.type === 'faculty');
                      if (branchFaculties.length === 0) return null;

                      const categorizedBranchFaculties = branchFaculties.reduce((acc, faculty) => {
                        const category = faculty.category || 'عامة';
                        if (!acc[category]) acc[category] = [];
                        acc[category].push(faculty);
                        return acc;
                      }, {} as Record<string, typeof branchFaculties>);

                      return Object.entries(categorizedBranchFaculties).map(([category, categoryFaculties]) => (
                        <div key={category}>
                          <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
                            <GraduationCap size={16} />
                            الكليات ال{category}
                          </h4>
                          <div className="grid gap-3 mb-4">
                            {categoryFaculties.map((faculty) => (
                              <div key={faculty.id} className="p-3 bg-gradient-primary/5 rounded-lg border border-primary/20">
                                <h5 className="font-medium">{faculty.name}</h5>
                                {faculty.name_en && <p className="text-sm text-muted-foreground">{faculty.name_en}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                    
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
