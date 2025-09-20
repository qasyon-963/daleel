import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, BookOpen, ExternalLink } from "lucide-react";
import { syrianUniversities } from "@/data/universities";
import { useNavigate } from "react-router-dom";

export const Universities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredUniversities = syrianUniversities.filter(
    (university) =>
      university.name.includes(searchQuery) ||
      university.city.includes(searchQuery) ||
      university.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUniversityClick = (universityId: string) => {
    navigate(`/university/${universityId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        onSearch={setSearchQuery} 
        searchPlaceholder="البحث عن الجامعات..."
      />
      
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            الجامعات الحكومية السورية
          </h2>
          <p className="text-muted-foreground">
            اكتشف جميع الجامعات الحكومية في سوريا ومعلومات شاملة عن كل منها
          </p>
        </div>

        {/* Universities Grid */}
        <div className="space-y-4">
          {filteredUniversities.map((university) => (
            <Card 
              key={university.id} 
              className="university-card cursor-pointer"
              onClick={() => handleUniversityClick(university.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground">
                      {university.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {university.nameEn}
                    </p>
                  </div>
                  <ExternalLink className="text-primary" size={20} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location and Year */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-primary" />
                    <span>{university.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-secondary" />
                    <span>تأسست {university.established}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed">
                  {university.description}
                </p>

                {/* Faculties Count */}
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-accent" />
                  <span className="text-sm text-foreground">
                    {university.faculties.length} كلية ومعهد
                  </span>
                </div>

                {/* Faculty Badges */}
                <div className="flex flex-wrap gap-2">
                  {university.faculties.slice(0, 3).map((faculty) => (
                    <Badge 
                      key={faculty.id} 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {faculty.name}
                    </Badge>
                  ))}
                  {university.faculties.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{university.faculties.length - 3} أخرى
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              لم يتم العثور على جامعات تطابق بحثك
            </p>
          </div>
        )}
      </div>
    </div>
  );
};