import { useState } from 'react';
import { ArrowRight, GraduationCap, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CertificateSelector } from '@/components/admissions/CertificateSelector';
import { RequirementsDisplay } from '@/components/admissions/RequirementsDisplay';
import { AdmissionsTable } from '@/components/admissions/AdmissionsTable';
import { type CertificateType } from '@/data/admission-requirements';

export function Admissions() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateType | null>(null);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-5xl mx-auto px-4 py-6 pb-24">
          {/* Header */}
          <div className="mb-6">
            {selectedCertificate ? (
              <Button
                variant="ghost"
                onClick={() => setSelectedCertificate(null)}
                className="gap-2 mb-4 -mr-2"
              >
                <ArrowRight className="h-4 w-4" />
                العودة لاختيار الشهادة
              </Button>
            ) : null}
            
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">شروط القبول والحدود الدنيا</h1>
                <p className="text-muted-foreground text-sm">
                  {selectedCertificate 
                    ? selectedCertificate.name 
                    : 'اختر نوع شهادتك لعرض شروط القبول والتخصصات المتاحة'}
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="requirements" className="gap-2">
                  <FileCheck className="h-4 w-4" />
                  شروط التسجيل
                </TabsTrigger>
                <TabsTrigger value="majors" className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  الحدود الدنيا
                </TabsTrigger>
              </TabsList>

              <TabsContent value="requirements" className="mt-4">
                <RequirementsDisplay certificate={selectedCertificate} />
              </TabsContent>

              <TabsContent value="majors" className="mt-4">
                <AdmissionsTable entries={selectedCertificate.admissionEntries} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
}
