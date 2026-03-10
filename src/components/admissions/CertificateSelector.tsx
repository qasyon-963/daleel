import { FileText, Globe, Flag, Building2, ArrowLeft, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { certificateTypes, type CertificateType } from '@/data/admission-requirements';

interface CertificateSelectorProps {
  selectedId: string | null;
  onSelect: (certificate: CertificateType) => void;
}

const iconMap: Record<string, typeof FileText> = {
  'FileText': FileText,
  'Globe': Globe,
  'Flag': Flag,
  'Building2': Building2,
};

export function CertificateSelector({ selectedId, onSelect }: CertificateSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-2">اختر نوع شهادتك</h2>
        <p className="text-muted-foreground text-sm">
          حدد نوع الشهادة الثانوية للاطلاع على شروط التسجيل والحدود الدنيا
        </p>
      </div>

      {/* Certificate Cards */}
      <div className="grid gap-4">
        {certificateTypes.map((cert) => {
          const IconComponent = iconMap[cert.icon] || FileText;
          const isAvailable = cert.admissionEntries.length > 0;
          
          return (
            <Card
              key={cert.id}
              className={`group relative overflow-hidden transition-all duration-300 ${
                isAvailable 
                  ? 'cursor-pointer hover:shadow-xl hover:border-primary/50 hover:-translate-y-1' 
                  : 'opacity-60 cursor-not-allowed'
              } ${selectedId === cert.id ? 'ring-2 ring-primary border-primary' : 'border-border'}`}
              onClick={() => isAvailable && onSelect(cert)}
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardContent className="relative p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isAvailable 
                      ? 'bg-primary/10 group-hover:bg-primary group-hover:scale-110' 
                      : 'bg-muted'
                  }`}>
                    <IconComponent className={`h-6 w-6 transition-colors ${
                      isAvailable 
                        ? 'text-primary group-hover:text-primary-foreground' 
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-lg text-foreground">
                        {cert.name}
                      </h3>
                      {isAvailable ? (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          متاح
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-0 text-xs gap-1">
                          <Clock className="h-3 w-3" />
                          قريباً
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                    
                    {/* Stats for available certificates */}
                    {isAvailable && (
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="font-semibold text-foreground">{cert.admissionEntries.length}</span>
                          تخصص متاح
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow */}
                  {isAvailable && (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted group-hover:bg-primary transition-all duration-300">
                      <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Note */}
      <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          💡 يتم تحديث البيانات بشكل دوري وفقاً لإعلانات وزارة التعليم العالي والبحث العلمي
        </p>
      </div>
    </div>
  );
}
