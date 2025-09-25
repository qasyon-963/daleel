import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Lock } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  message?: string;
}

export const AuthGuard = ({ children, requireAuth = false, message }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session && showAuthDialog) {
        setShowAuthDialog(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [showAuthDialog]);

  useEffect(() => {
    if (requireAuth && isAuthenticated === false) {
      setShowAuthDialog(true);
    }
  }, [requireAuth, isAuthenticated]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-muted-foreground">جاري التحقق من تسجيل الدخول...</div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <>
        {children}
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-md text-center">
            <DialogHeader className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Lock className="text-white" size={32} />
              </div>
              <DialogTitle className="text-xl">تسجيل الدخول مطلوب</DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                {message || "يرجى تسجيل الدخول للوصول إلى هذا المحتوى والاستفادة من جميع الميزات"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-6">
              <Button 
                onClick={() => navigate('/auth')}
                className="btn-primary w-full flex items-center gap-2"
              >
                <User size={18} />
                تسجيل الدخول
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAuthDialog(false)}
                className="w-full"
              >
                التصفح بدون تسجيل
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return <>{children}</>;
};