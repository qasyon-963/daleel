import { FileText, ChevronLeft, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { certificateTypes, type CertificateType } from '@/data/admission-requirements';

interface CertificateSelectorProps {
  selectedId: string | null;
  onSelect: (certificate: CertificateType) => void;
}

export function CertificateSelector({ selectedId, onSelect }: CertificateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">اختر نوع الشهادة</h2>
        <Badge variant="outline" className="gap-1">
          <Plus className="h-3 w-3" />
          قريباً: المزيد من الشهادات
        </Badge>
      </div>

      <div className="grid gap-3">
        {certificateTypes.map((cert) => (
          <Card
            key={cert.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedId === cert.id
                ? 'ring-2 ring-primary border-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelect(cert)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  selectedId === cert.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{cert.nameEn}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {cert.admissionEntries.length} تخصص
                  </Badge>
                  <ChevronLeft className={`h-5 w-5 text-muted-foreground transition-transform ${
                    selectedId === cert.id ? '-rotate-90' : ''
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* بطاقة الشهادات القادمة */}
        <Card className="border-dashed opacity-60">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-muted">
                <Plus className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-muted-foreground">شهادات إضافية قادمة</h3>
                <p className="text-sm text-muted-foreground">
                  الشهادة الثانوية السورية العامة، شهادات عربية وأجنبية...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
