import { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const slides = [
    {
      title: 'اكتشف الجامعات السورية',
      description: 'دليلك الشامل لاستكشاف مختلف الجامعات والتخصصات في سوريا',
    },
    {
      title: 'اعرف شروط القبول',
      description: 'تعرف على الحدود الدنيا وشروط التسجيل لكل تخصص وجامعة',
    },
  ];

  useEffect(() => {
    // Add animation on mount
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    localStorage.setItem('daleel_splash_seen', 'true');
    onComplete();
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleSkip();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo Icon */}
        <div 
          className={`mb-8 transition-all duration-700 ease-out ${
            isAnimating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}
        >
          <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
            <GraduationCap className="h-12 w-12 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <h1 
          className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-200 ease-out ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {slides[currentSlide].title}
        </h1>

        {/* Description */}
        <p 
          className={`text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed transition-all duration-700 delay-300 ease-out ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Bottom Section */}
      <div 
        className={`relative px-6 pb-12 pt-8 transition-all duration-700 delay-500 ease-out ${
          isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Action Button */}
        <Button 
          onClick={handleNext}
          className="w-full h-14 text-lg font-semibold rounded-2xl"
          size="lg"
        >
          {currentSlide < slides.length - 1 ? 'التالي' : 'ابدأ الآن'}
        </Button>

        {/* Skip Button */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="w-full mt-4 text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            تخطي
          </button>
        )}

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`الانتقال للشريحة ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
