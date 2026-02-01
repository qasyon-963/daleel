import { Brain, Sparkles, Network } from "lucide-react";

export const GeneratingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Animated Icon */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-pulse">
          <Brain className="w-12 h-12 text-primary" />
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <Sparkles className="w-5 h-5 text-primary/70" />
          </div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <Network className="w-5 h-5 text-primary/70" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          جاري إنشاء الخريطة الذهنية
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          يقوم الذكاء الاصطناعي بتحليل المحتوى وتنظيمه في خريطة ذهنية احترافية...
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Step label="تحليل المحتوى" status="complete" />
        <Step label="استخراج الأفكار الرئيسية" status="active" />
        <Step label="بناء الهيكل التنظيمي" status="pending" />
        <Step label="إنشاء التصميم المرئي" status="pending" />
      </div>
    </div>
  );
};

interface StepProps {
  label: string;
  status: 'complete' | 'active' | 'pending';
}

const Step = ({ label, status }: StepProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`
        w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
        ${status === 'complete' ? 'bg-primary text-primary-foreground' : ''}
        ${status === 'active' ? 'bg-primary/20 text-primary border-2 border-primary animate-pulse' : ''}
        ${status === 'pending' ? 'bg-muted text-muted-foreground' : ''}
      `}>
        {status === 'complete' ? '✓' : status === 'active' ? '...' : '○'}
      </div>
      <span className={`text-sm ${status === 'active' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
};
