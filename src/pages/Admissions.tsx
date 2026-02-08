import { useState } from 'react';
import { ArrowRight, GraduationCap, FileCheck, ClipboardList, Building2, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CertificateSelector } from '@/components/admissions/CertificateSelector';
import { RequirementsDisplay } from '@/components/admissions/RequirementsDisplay';
import { AdmissionsTable } from '@/components/admissions/AdmissionsTable';
import { type CertificateType } from '@/data/admission-requirements';

export function Admissions() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateType | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="relative container max-w-5xl mx-auto px-4 pt-6 pb-8">
          {/* Back Button */}
          {selectedCertificate && (
            <Button
              variant="ghost"
              onClick={() => setSelectedCertificate(null)}
              className="gap-2 mb-6 -mr-2 hover:bg-primary/5 group"
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span>تغيير نوع الشهادة</span>
            </Button>
          )}
          
          {/* Header Content */}
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-xl">
              <ClipboardList className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">المفاضلات الجامعية</h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                {selectedCertificate 
                  ? selectedCertificate.name 
                  : 'اختر نوع شهادتك لمعرفة شروط القبول والحدود الدنيا لجميع التخصصات'}
              </p>
            </div>
          </div>

          {/* Quick Stats - Only show when no certificate selected */}
          {!selectedCertificate && (
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">30+</p>
                  <p className="text-xs text-muted-foreground">جامعة</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">300+</p>
                  <p className="text-xs text-muted-foreground">تخصص</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">2025</p>
                  <p className="text-xs text-muted-foreground">مُحدّث</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-5xl mx-auto px-4 pb-28">
        {!selectedCertificate ? (
          <div className="animate-fade-in">
            <CertificateSelector
              selectedId={null}
              onSelect={setSelectedCertificate}
            />
          </div>
        ) : (
          <Tabs defaultValue="requirements" className="space-y-6 animate-fade-in">
            <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-muted rounded-2xl">
              <TabsTrigger 
                value="requirements" 
                className="gap-2 text-sm rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm h-12"
              >
                <FileCheck className="h-4 w-4" />
                شروط التسجيل
              </TabsTrigger>
              <TabsTrigger 
                value="majors" 
                className="gap-2 text-sm rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm h-12"
              >
                <GraduationCap className="h-4 w-4" />
                الحدود الدنيا
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requirements" className="mt-6 animate-fade-in">
              <RequirementsDisplay certificate={selectedCertificate} />
            </TabsContent>

            <TabsContent value="majors" className="mt-6 animate-fade-in">
              <AdmissionsTable entries={selectedCertificate.admissionEntries} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
