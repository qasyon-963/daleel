import { GraduationCap, Building2, BookOpen, MapPin, Sparkles, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center min-h-[70vh]">
      {/* Logo with enhanced styling */}
      <div className="relative mb-8 animate-fade-in">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden shadow-lg border border-primary/10">
          <img 
            src={daleelLogo} 
            alt="Daleel AI" 
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />
        </div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md animate-pulse">
          <Sparkles className="text-primary-foreground" size={16} />
        </div>
      </div>

      {/* Title with gradient */}
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
        Daleel AI
      </h1>
      <p className="text-muted-foreground mb-8 max-w-lg text-base sm:text-lg leading-relaxed">
        مساعدك الذكي للجامعات والتخصصات الأكاديمية في سوريا.
        <br className="hidden sm:block" />
        اسأل أي سؤال وسأساعدك بإجابات دقيقة ومفصلة.
      </p>

      {/* Mind Maps Tool Card */}
      <div className="w-full max-w-xl mb-8">
        <button
          onClick={() => navigate('/mind-maps')}
          className="w-full p-5 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 hover:border-primary/50 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/25 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Brain className="text-primary" size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-lg mb-1 flex items-center gap-2">
                الخرائط الذهنية
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">أداة</span>
              </p>
              <p className="text-sm text-muted-foreground">
                حوّل محتواك الدراسي إلى خرائط ذهنية احترافية بالذكاء الاصطناعي
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Enhanced Suggestions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.question)}
            className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transition-all duration-300 text-right group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
              <suggestion.icon className="text-primary" size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-base mb-1">
                {suggestion.title}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {suggestion.question}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Enhanced Capabilities Section */}
      <div className="mt-12 text-sm text-muted-foreground max-w-lg bg-muted/30 rounded-2xl p-6 border border-border">
        <p className="mb-4 font-semibold text-foreground flex items-center justify-center gap-2">
          <GraduationCap size={18} className="text-primary" />
          يمكنني مساعدتك في:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
            <span>معلومات عن جميع الجامعات والكليات</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
            <span>التخصصات ومتطلبات القبول</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
            <span>نصائح لاختيار المسار الدراسي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
            <span>أسئلة عامة عن التعليم والدراسة</span>
          </div>
        </div>
      </div>
    </div>
  );
};
