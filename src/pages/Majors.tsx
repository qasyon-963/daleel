import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { majorsData, majorCategories } from "@/data/majors";

export const Majors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);

  const filteredMajors = majorsData.filter((major) => {
    const matchesSearch = major.name.includes(searchQuery) || 
                         major.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         major.description.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || major.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleMajorDetails = (majorId: string) => {
    setExpandedMajor(expandedMajor === majorId ? null : majorId);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        onSearch={setSearchQuery} 
        searchPlaceholder="البحث عن التخصصات..."
      />
      
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            دليل التخصصات الأكاديمية
          </h2>
          <p className="text-muted-foreground">
            اكتشف التخصصات المختلفة وفرص العمل المتاحة لكل منها
          </p>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">تصفية حسب المجال:</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="text-xs"
            >
              جميع التخصصات
            </Button>
            {majorCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Majors List */}
        <div className="space-y-4">
          {filteredMajors.map((major) => {
            const category = majorCategories.find(cat => cat.id === major.category);
            const isExpanded = expandedMajor === major.id;
            
            return (
              <Card key={major.id} className="university-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground">
                          {major.name}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${category?.color || ''}`}
                        >
                          {category?.name}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {major.nameEn}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleMajorDetails(major.id)}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} className="text-primary" />
                    <span>مدة الدراسة: {major.duration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground leading-relaxed">
                    {major.description}
                  </p>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="space-y-4 border-t border-border pt-4">
                      {/* Career Opportunities */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp size={16} className="text-success" />
                          <h4 className="font-semibold text-foreground">
                            فرص العمل المتاحة:
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {major.careerOpportunities.map((opportunity, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-foreground">
                                {opportunity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prerequisites */}
                      {major.prerequisites && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            المتطلبات:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {major.prerequisites.map((prerequisite, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {prerequisite}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredMajors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              لم يتم العثور على تخصصات تطابق بحثك
            </p>
          </div>
        )}
      </div>
    </div>
  );
};