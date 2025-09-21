import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, BookOpen, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface University {
  id: string;
  name: string;
  name_en: string;
  city: string;
  established: number;
  description: string;
  logo_url: string;
  banner_url: string;
  website: string;
}

export const Universities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Error fetching universities:', error);
        } else {
          setUniversities(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter(
    (university) =>
      university.name.includes(searchQuery) ||
      university.city.includes(searchQuery) ||
      university.name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUniversityClick = (universityId: string) => {
    navigate(`/university/${universityId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader 
          onSearch={setSearchQuery} 
          searchPlaceholder="البحث عن الجامعات..."
        />
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">جاري تحميل الجامعات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        onSearch={setSearchQuery} 
        searchPlaceholder="البحث عن الجامعات..."
      />
      
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center py-8 animate-fade-in">
          <h2 className="text-3xl font-bold gradient-text mb-3">
            الجامعات الحكومية السورية
          </h2>
          <p className="text-muted-foreground text-lg">
            اكتشف جميع الجامعات الحكومية في سوريا ومعلومات شاملة عن كل منها
          </p>
        </div>

        {/* Universities Grid */}
        <div className="space-y-5">
          {filteredUniversities.map((university, index) => (
            <Card 
              key={university.id} 
              className="university-card cursor-pointer animate-slide-up"
              onClick={() => handleUniversityClick(university.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {university.name}
                    </h3>
                     <p className="text-sm text-muted-foreground">
                       {university.name_en}
                     </p>
                  </div>
                  <div className="interactive-hover">
                    <ExternalLink className="text-primary" size={22} />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5">
                {/* Location and Year */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-foreground">{university.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Calendar size={14} className="text-white" />
                    </div>
                    <span className="text-muted-foreground">تأسست {university.established}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed">
                  {university.description}
                </p>

                 {/* University Info */}
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                     <BookOpen size={14} className="text-white" />
                   </div>
                   <span className="text-sm font-medium text-foreground">
                     جامعة حكومية
                   </span>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-primary" size={32} />
            </div>
            <p className="text-muted-foreground text-lg">
              لم يتم العثور على جامعات تطابق بحثك
            </p>
          </div>
        )}
      </div>
    </div>
  );
};