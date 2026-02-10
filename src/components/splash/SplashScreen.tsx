import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, FileCheck, Sparkles, ArrowLeft, ChevronLeft } from 'lucide-react';
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

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('daleel_splash_seen', 'true');
      onComplete();
    }, 400);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleSkip();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(160deg, hsl(270 55% 25%) 0%, hsl(270 42% 35%) 30%, hsl(280 45% 45%) 60%, hsl(270 40% 30%) 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-3xl" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div 
          className={`mb-10 transition-all duration-700 ease-out ${
            isEntering ? 'opacity-0 scale-50 translate-y-8' : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
              <img 
                src={daleelLogo} 
                alt="دليل" 
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-2xl -z-10" />
          </div>
        </div>

        {/* Slide Content */}
        <div key={currentSlide} className="animate-fade-in max-w-sm">
          <div className="mb-5 flex justify-center">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 shadow-lg">
              <CurrentIcon className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          <p className="text-white/80 text-base leading-relaxed mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Feature pills - first slide only */}
        {currentSlide === 0 && (
          <div 
            className={`mt-10 flex flex-wrap justify-center gap-2 transition-all duration-700 delay-300 ${
              isEntering ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
            }`}
          >
            {features.map((feature, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15"
              >
                <feature.icon className="h-4 w-4 text-white/90" />
                <span className="text-xs font-medium text-white/90">{feature.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="relative px-6 pb-8 pt-4 space-y-4">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-10 bg-white' 
                  : index < currentSlide
                    ? 'w-1.5 bg-white/50'
                    : 'w-1.5 bg-white/25'
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
              className="h-14 w-14 rounded-2xl border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white"
              size="icon"
            >
              <ChevronLeft className="h-5 w-5 rotate-180" />
            </Button>
          )}
          
          <Button 
            onClick={handleNext}
            className="flex-1 h-14 text-lg font-semibold rounded-2xl gap-2 bg-white text-primary hover:bg-white/90 shadow-xl border-0"
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
            className="w-full text-white/60 hover:text-white transition-colors py-2 text-sm"
          >
            تخطي المقدمة
          </button>
        )}
      </div>
    </div>
  );
}
