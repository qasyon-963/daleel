import { AlertCircle, CheckCircle2, Info, Calendar, BadgePercent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CertificateType } from '@/data/admission-requirements';

interface RequirementsDisplayProps {
  certificate: CertificateType;
}

export function RequirementsDisplay({ certificate }: RequirementsDisplayProps) {
  return (
    <div className="space-y-5">
      {/* معلومات المفاضلة */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Info className="h-4 w-4 text-primary" />
            </div>
            عن هذه المفاضلة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed text-sm">
            {certificate.description}
          </p>
          {certificate.registrationDates && (
            <div className="flex items-center gap-2 text-sm bg-background/60 rounded-lg p-3 border border-border/50">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{certificate.registrationDates}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* شروط التسجيل */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            شروط التسجيل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {certificate.requirements.map((req, index) => (
              <li key={index} className="flex gap-3 items-start group">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* الحدود الدنيا */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-blue-500/10">
              <BadgePercent className="h-4 w-4 text-blue-600" />
            </div>
            الحدود الدنيا للقبول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background rounded-lg p-3 border border-border/50 text-center">
              <div className="text-2xl font-bold text-red-600">80%</div>
              <div className="text-xs text-muted-foreground mt-1">طب وصيدلة</div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50 text-center">
              <div className="text-2xl font-bold text-orange-600">75%</div>
              <div className="text-xs text-muted-foreground mt-1">هندسة</div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50 text-center">
              <div className="text-2xl font-bold text-yellow-600">60%</div>
              <div className="text-xs text-muted-foreground mt-1">بيطرة وتمريض</div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50 text-center">
              <div className="text-2xl font-bold text-green-600">50%</div>
              <div className="text-xs text-muted-foreground mt-1">باقي الكليات</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ملاحظات مهمة */}
      <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-amber-500/10">
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </div>
            ملاحظات مهمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {certificate.importantNotes.map((note, index) => (
              <li key={index} className="flex gap-2 items-start text-sm">
                <span className="text-amber-500 mt-0.5">•</span>
                <span className="leading-relaxed text-muted-foreground">{note}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
