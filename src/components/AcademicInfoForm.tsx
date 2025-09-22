import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Save, X } from "lucide-react";

interface University {
  id: string;
  name: string;
  name_en: string;
}

interface Faculty {
  id: string;
  name: string;
  name_en: string;
  university_id: string;
}

interface Major {
  id: string;
  name: string;
  name_en: string;
  faculty_id: string;
}

interface AcademicInfoFormProps {
  onClose: () => void;
  onSave: () => void;
  currentInfo?: {
    university?: string;
    faculty?: string;
    major?: string;
    year?: string;
  };
}

export const AcademicInfoForm = ({ onClose, onSave, currentInfo }: AcademicInfoFormProps) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  
  const [selectedUniversity, setSelectedUniversity] = useState(currentInfo?.university || "");
  const [selectedFaculty, setSelectedFaculty] = useState(currentInfo?.faculty || "");
  const [selectedMajor, setSelectedMajor] = useState(currentInfo?.major || "");
  const [selectedYear, setSelectedYear] = useState(currentInfo?.year || "");
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      fetchFaculties(selectedUniversity);
      setSelectedFaculty("");
      setSelectedMajor("");
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (selectedFaculty) {
      fetchMajors(selectedFaculty);
      setSelectedMajor("");
    }
  }, [selectedFaculty]);

  const fetchUniversities = async () => {
    const { data, error } = await supabase
      .from('universities')
      .select('id, name, name_en')
      .order('name');
    
    if (error) {
      console.error('Error fetching universities:', error);
    } else {
      setUniversities(data || []);
    }
  };

  const fetchFaculties = async (universityId: string) => {
    const { data, error } = await supabase
      .from('faculties')
      .select('id, name, name_en, university_id')
      .eq('university_id', universityId)
      .order('name');
    
    if (error) {
      console.error('Error fetching faculties:', error);
    } else {
      setFaculties(data || []);
    }
  };

  const fetchMajors = async (facultyId: string) => {
    const { data, error } = await supabase
      .from('majors')
      .select('id, name, name_en, faculty_id')
      .eq('faculty_id', facultyId)
      .order('name');
    
    if (error) {
      console.error('Error fetching majors:', error);
    } else {
      setMajors(data || []);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const universityName = universities.find(u => u.id === selectedUniversity)?.name || "";
      const facultyName = faculties.find(f => f.id === selectedFaculty)?.name || "";
      const majorName = majors.find(m => m.id === selectedMajor)?.name || "";

      const { error } = await supabase
        .from('profiles')
        .update({
          university_id: selectedUniversity || null,
          faculty_id: selectedFaculty || null,
          major_id: selectedMajor || null,
          academic_year: selectedYear || null,
          university_name: universityName,
          faculty_name: facultyName,
          major_name: majorName,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث معلوماتك الأكاديمية",
      });
      
      onSave();
    } catch (error) {
      console.error('Error saving academic info:', error);
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ المعلومات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const academicYears = [
    "السنة الأولى",
    "السنة الثانية", 
    "السنة الثالثة",
    "السنة الرابعة",
    "السنة الخامسة",
    "السنة السادسة"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary" size={20} />
            تحديث المعلومات الأكاديمية
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={18} />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>الجامعة</Label>
          <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الجامعة" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((university) => (
                <SelectItem key={university.id} value={university.id}>
                  {university.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>الكلية</Label>
          <Select 
            value={selectedFaculty} 
            onValueChange={setSelectedFaculty}
            disabled={!selectedUniversity}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الكلية" />
            </SelectTrigger>
            <SelectContent>
              {faculties.map((faculty) => (
                <SelectItem key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>التخصص</Label>
          <Select 
            value={selectedMajor} 
            onValueChange={setSelectedMajor}
            disabled={!selectedFaculty}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر التخصص" />
            </SelectTrigger>
            <SelectContent>
              {majors.map((major) => (
                <SelectItem key={major.id} value={major.id}>
                  {major.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>السنة الدراسية</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="اختر السنة الدراسية" />
            </SelectTrigger>
            <SelectContent>
              {academicYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} disabled={loading} className="flex-1">
            <Save size={16} className="mr-2" />
            {loading ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};