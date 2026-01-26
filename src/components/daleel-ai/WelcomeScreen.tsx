import { GraduationCap, Building2, BookOpen, MapPin, Sparkles } from "lucide-react";
import daleelLogo from "@/assets/daleel-logo-new.png";

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: Building2,
    title: "الجامعات",
    question: "ما هي الجامعات الحكومية في سوريا؟",
  },
  {
    icon: GraduationCap,
    title: "التخصصات",
    question: "ما هي تخصصات كلية الهندسة؟",
  },
  {
    icon: BookOpen,
    title: "القبول",
    question: "كيف أختار التخصص المناسب لي؟",
  },
  {
    icon: MapPin,
    title: "المواقع",
    question: "أين تقع جامعة دمشق؟",
  },
];

export const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      {/* Logo */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
          <img 
            src={daleelLogo} 
            alt="Daleel AI" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Sparkles className="text-primary-foreground" size={14} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Daleel AI
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        مساعدك الذكي للجامعات والتخصصات الأكاديمية في سوريا.
        اسأل أي سؤال وسأساعدك بإجابات دقيقة ومفصلة.
      </p>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.question)}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-right group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <suggestion.icon className="text-primary" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">
                {suggestion.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {suggestion.question}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Capabilities */}
      <div className="mt-8 text-xs text-muted-foreground max-w-md">
        <p className="mb-2 font-medium">يمكنني مساعدتك في:</p>
        <ul className="space-y-1">
          <li>• معلومات عن جميع الجامعات والكليات والمعاهد</li>
          <li>• التخصصات الأكاديمية ومتطلبات القبول</li>
          <li>• نصائح لاختيار المسار الدراسي المناسب</li>
          <li>• أسئلة عامة عن التعليم والدراسة</li>
        </ul>
      </div>
    </div>
  );
};
