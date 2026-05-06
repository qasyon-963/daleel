import { useState, useEffect, useCallback } from 'react';
import { GraduationCap, BookOpen, FileCheck, Sparkles, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import daleelLogo from '@/assets/daleel-logo-new.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: GraduationCap,
    title: 'استكشف الجامعات السورية',
    description: 'دليلك الشامل لجميع الجامعات والكليات والتخصصات الأكاديمية في سوريا',
  },
  {
    icon: FileCheck,
    title: 'المفاضلات والقبول الجامعي',
    description: 'تعرف على شروط القبول والحدود الدنيا لكل تخصص وجامعة حسب نوع شهادتك',
  },
  {
    icon: Sparkles,
    title: 'مساعدك الذكي Daleel AI',
    description: 'اسأل أي سؤال عن الجامعات والتخصصات واحصل على إجابات دقيقة فوراً',
  },
];

const features = [
  { icon: GraduationCap, label: 'الجامعات' },
  { icon: BookOpen, label: 'التخصصات' },
  { icon: FileCheck, label: 'المفاضلات' },
  { icon: Sparkles, label: 'AI ذكي' },
];

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('daleel_splash_seen', 'true');
      onComplete();
    }, 350);
  }, [onComplete]);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setSlideDirection('next');
      setCurrentSlide(currentSlide + 1);
    } else {
      handleSkip();
    }
  }, [currentSlide, handleSkip]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      setSlideDirection('prev');
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-all duration-400 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(160deg, hsl(270 50% 12%) 0%, hsl(270 42% 28%) 40%, hsl(275 45% 38%) 70%, hsl(270 40% 18%) 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-white/[0.03] blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/[0.03] blur-3xl" />
      <div className="absolute top-[30%] left-[20%] w-[25vw] h-[25vw] rounded-full bg-purple-400/[0.06] blur-3xl" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Logo */}
        <div 
          className={`mb-12 transition-all duration-600 ease-out ${
            isEntering ? 'opacity-0 scale-75 translate-y-6' : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-[1.25rem] bg-white/[0.12] backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/[0.15] overflow-hidden">
              <img 
                src={daleelLogo} 
                alt="دليل" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="absolute -inset-3 rounded-[2rem] bg-white/[0.06] blur-2xl -z-10" />
          </div>
        </div>

        {/* Slide Content */}
        <div key={currentSlide} className="animate-fade-in max-w-xs">
          <div className="mb-6 flex justify-center">
            <div className="p-3 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1]">
              <CurrentIcon className="h-6 w-6 text-white/90" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-3 text-white tracking-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Feature pills - first slide only */}
        {currentSlide === 0 && (
          <div 
            className={`mt-8 flex flex-wrap justify-center gap-2 transition-all duration-500 delay-200 ${
              isEntering ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {features.map((feature, i) => (
              <div 
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] text-white/70"
              >
                <feature.icon className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="relative px-6 pb-10 pt-4 space-y-4 safe-area-bottom">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-400 ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : index < currentSlide
                    ? 'w-1.5 bg-white/40'
                    : 'w-1.5 bg-white/20'
              }`}
              aria-label={`الانتقال للشريحة ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <Button 
              onClick={handlePrev}
              variant="outline"
              className="h-12 w-12 rounded-xl border-white/15 bg-white/[0.08] backdrop-blur-sm text-white hover:bg-white/15 hover:text-white"
              size="icon"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
          
          <Button 
            onClick={handleNext}
            className="flex-1 h-12 text-base font-semibold rounded-xl gap-2 bg-white text-primary hover:bg-white/95 shadow-lg border-0"
            size="lg"
          >
            {currentSlide < slides.length - 1 ? (
              <>
                <span>التالي</span>
                <ArrowLeft className="h-5 w-5" />
              </>
            ) : (
              'ابدأ الاستكشاف 🚀'
            )}
          </Button>
        </div>

        {/* Skip */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="w-full text-white/40 hover:text-white/70 transition-colors py-2 text-xs"
          >
            تخطي المقدمة
          </button>
        )}
      </div>
    </div>
  );
}
