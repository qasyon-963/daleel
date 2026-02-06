import { useState } from 'react';
import { ArrowRight, GraduationCap, FileCheck, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CertificateSelector } from '@/components/admissions/CertificateSelector';
import { RequirementsDisplay } from '@/components/admissions/RequirementsDisplay';
import { AdmissionsTable } from '@/components/admissions/AdmissionsTable';
import { type CertificateType } from '@/data/admission-requirements';

export function Admissions() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-5xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          {selectedCertificate ? (
            <Button
              variant="ghost"
              onClick={() => setSelectedCertificate(null)}
              className="gap-2 mb-4 -mr-2 hover:bg-primary/5"
            >
              <ArrowRight className="h-4 w-4" />
              تغيير نوع الشهادة
            </Button>
          ) : null}
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary text-primary-foreground shadow-lg">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">القبول الجامعي</h1>
              <p className="text-muted-foreground text-sm">
                {selectedCertificate 
                  ? selectedCertificate.name 
                  : 'اختر نوع شهادتك لمعرفة شروط القبول والحدود الدنيا'}
              </p>
            </div>
          </div>
        </div>

        {/* المحتوى */}
        {!selectedCertificate ? (
          <CertificateSelector
            selectedId={null}
            onSelect={setSelectedCertificate}
          />
        ) : (
          <Tabs defaultValue="requirements" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="requirements" className="gap-2 text-sm">
                <FileCheck className="h-4 w-4" />
                شروط التسجيل
              </TabsTrigger>
              <TabsTrigger value="majors" className="gap-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                الحدود الدنيا
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requirements" className="mt-4 animate-fade-in">
              <RequirementsDisplay certificate={selectedCertificate} />
            </TabsContent>

            <TabsContent value="majors" className="mt-4 animate-fade-in">
              <AdmissionsTable entries={selectedCertificate.admissionEntries} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
