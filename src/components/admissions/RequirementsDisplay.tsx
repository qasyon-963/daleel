import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CertificateType } from '@/data/admission-requirements';

interface RequirementsDisplayProps {
  certificate: CertificateType;
}

export function RequirementsDisplay({ certificate }: RequirementsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* وصف الشهادة */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-primary" />
            معلومات المفاضلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{certificate.description}</p>
          {certificate.registrationDates && (
            <Badge variant="outline" className="mt-3">
              {certificate.registrationDates}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* شروط التسجيل */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            شروط التسجيل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {certificate.requirements.map((req, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ملاحظات مهمة */}
      <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            ملاحظات مهمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {certificate.importantNotes.map((note, index) => (
              <li key={index} className="flex gap-2 items-start text-sm">
                <span className="text-amber-500 mt-1">•</span>
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
