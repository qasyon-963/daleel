import { BookOpen, Brain, GraduationCap, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface PurposeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const purposes = [
  {
    id: 'understanding',
    label: 'فهم المحتوى',
    labelEn: 'Understanding',
    icon: Lightbulb,
    description: 'تبسيط المفاهيم المعقدة'
  },
  {
    id: 'summarization',
    label: 'التلخيص',
    labelEn: 'Summary',
    icon: BookOpen,
    description: 'استخراج النقاط الرئيسية'
  },
  {
    id: 'revision',
    label: 'المراجعة',
    labelEn: 'Revision',
    icon: Brain,
    description: 'مراجعة سريعة وشاملة'
  },
  {
    id: 'exam_prep',
    label: 'التحضير للامتحان',
    labelEn: 'Exam Prep',
    icon: GraduationCap,
    description: 'التركيز على النقاط المهمة'
  },
];

export const PurposeSelector = ({ value, onChange }: PurposeSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        ما هو هدفك من الخريطة الذهنية؟
      </label>
      <div className="grid grid-cols-2 gap-3">
        {purposes.map((purpose) => {
          const Icon = purpose.icon;
          const isSelected = value === purpose.id;
          
          return (
            <button
              key={purpose.id}
              type="button"
              onClick={() => onChange(purpose.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <Icon size={24} strokeWidth={isSelected ? 2.5 : 2} />
              <span className="text-sm font-semibold">{purpose.label}</span>
              <span className="text-xs text-muted-foreground text-center">
                {purpose.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
