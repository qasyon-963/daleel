import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, FileCheck, Sparkles, ArrowLeft, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import daleelLogo from '@/assets/daleel-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const slides = [
    {
      icon: GraduationCap,
      title: 'مرحباً بك في دليل',
      description: 'دليلك الشامل للجامعات والتخصصات الأكاديمية في سوريا',
      color: 'from-primary to-primary/80',
    },
    {
      icon: FileCheck,
      title: 'اكتشف المفاضلات',
      description: 'تعرف على شروط القبول والحدود الدنيا لكل تخصص وجامعة حسب نوع شهادتك',
      color: 'from-primary/90 to-primary/70',
    },
    {
      icon: Sparkles,
      title: 'مساعدك الذكي',
      description: 'استخدم Daleel AI للإجابة على جميع استفساراتك حول الجامعات والتخصصات',
      color: 'from-primary/80 to-primary/60',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    localStorage.setItem('daleel_splash_seen', 'true');
    onComplete();
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setSlideDirection('next');
      setCurrentSlide(currentSlide + 1);
    } else {
      handleSkip();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setSlideDirection('prev');
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo with animation */}
        <div 
          className={`mb-6 transition-all duration-500 ease-out ${
            isAnimating ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
          }`}
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl overflow-hidden">
              <img 
                src={daleelLogo} 
                alt="Daleel" 
                className="w-24 h-24 object-contain"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-2 rounded-[1.75rem] border-2 border-primary/20 animate-pulse" />
          </div>
        </div>

        {/* Slide Content with Animation */}
        <div 
          key={currentSlide}
          className={`transition-all duration-500 ease-out ${
            slideDirection === 'next' 
              ? 'animate-fade-in' 
              : 'animate-fade-in'
          }`}
        >
          {/* Icon Badge */}
          <div className="mb-6 flex justify-center">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} shadow-lg`}>
              <CurrentIcon className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {slides[currentSlide].title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Feature Cards - Only on first slide */}
        {currentSlide === 0 && (
          <div 
            className={`mt-10 grid grid-cols-3 gap-3 max-w-sm transition-all duration-700 delay-500 ease-out ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            {[
              { icon: GraduationCap, label: 'الجامعات' },
              { icon: BookOpen, label: 'التخصصات' },
              { icon: FileCheck, label: 'المفاضلات' },
            ].map((feature, i) => (
              <div 
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/50 border border-border"
              >
                <feature.icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="relative px-6 pb-10 pt-6 space-y-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSlideDirection(index > currentSlide ? 'next' : 'prev');
                setCurrentSlide(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-10 bg-primary' 
                  : index < currentSlide
                    ? 'w-1.5 bg-primary/40'
                    : 'w-1.5 bg-muted-foreground/20'
              }`}
              aria-label={`الانتقال للشريحة ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <Button 
              onClick={handlePrev}
              variant="outline"
              className="h-14 w-14 rounded-2xl"
              size="icon"
            >
              <ChevronLeft className="h-5 w-5 rotate-180" />
            </Button>
          )}
          
          <Button 
            onClick={handleNext}
            className="flex-1 h-14 text-lg font-semibold rounded-2xl gap-2"
            size="lg"
          >
            {currentSlide < slides.length - 1 ? (
              <>
                <span>التالي</span>
                <ArrowLeft className="h-5 w-5" />
              </>
            ) : (
              'ابدأ الاستكشاف'
            )}
          </Button>
        </div>

        {/* Skip Button */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="w-full text-muted-foreground hover:text-foreground transition-colors py-2 text-sm"
          >
            تخطي المقدمة
          </button>
        )}
      </div>
    </div>
  );
}
