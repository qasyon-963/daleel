import { useState, useEffect } from "react";
import { ArrowRight, Brain, History, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentInput } from "@/components/mind-maps/ContentInput";
import { PurposeSelector } from "@/components/mind-maps/PurposeSelector";
import { MindMapResult } from "@/components/mind-maps/MindMapResult";
import { MindMapsHistory } from "@/components/mind-maps/MindMapsHistory";
import { GeneratingState } from "@/components/mind-maps/GeneratingState";
import { useMindMapGenerator } from "@/components/mind-maps/useMindMapGenerator";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import daleelLogo from "@/assets/daleel-logo.png";

export const MindMaps = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<'text' | 'pdf'>('text');
  const [purpose, setPurpose] = useState('understanding');
  const [result, setResult] = useState<{ imageUrl: string; title: string } | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [activeTab, setActiveTab] = useState('create');

  const navigate = useNavigate();
  const { toast } = useToast();
  const { generate, isGenerating } = useMindMapGenerator();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        toast({
          title: "يجب تسجيل الدخول",
          description: "يرجى تسجيل الدخول لاستخدام الخرائط الذهنية",
          variant: "destructive",
        });
        navigate('/auth');
      }
      setIsAuthChecking(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUserId(session.user.id);
        } else {
          setUserId(null);
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleContentChange = (newContent: string, type: 'text' | 'pdf') => {
    setContent(newContent);
    setContentType(type);
  };

  const handleGenerate = async () => {
    if (!userId) return;

    const generatedResult = await generate({
      content,
      contentType,
      purpose,
      userId,
    });

    if (generatedResult) {
      setResult(generatedResult);
      setRefreshHistory((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setResult(null);
    setContent('');
    setPurpose('understanding');
  };

  const handleSelectFromHistory = (imageUrl: string, title: string) => {
    setResult({ imageUrl, title });
    setActiveTab('create');
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/daleel-ai')}
              className="hover:bg-primary/10"
            >
              <ArrowRight size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <img src={daleelLogo} alt="Daleel AI" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Brain size={18} className="text-primary" />
                  الخرائط الذهنية
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto w-full p-4 pb-24">
          {/* Result View */}
          {result && !isGenerating && (
            <MindMapResult
              imageUrl={result.imageUrl}
              title={result.title}
              onReset={handleReset}
            />
          )}

          {/* Generating State */}
          {isGenerating && <GeneratingState />}

          {/* Creation View */}
          {!result && !isGenerating && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create" className="gap-2">
                  <Sparkles size={16} />
                  إنشاء خريطة
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <History size={16} />
                  السجل
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-1">
                        حوّل محتواك إلى خريطة ذهنية
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        أدخل النص أو ارفع ملف PDF وسيقوم الذكاء الاصطناعي بتحويله إلى خريطة ذهنية احترافية تساعدك في الدراسة والفهم.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Purpose Selection */}
                <PurposeSelector value={purpose} onChange={setPurpose} />

                {/* Content Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    المحتوى
                  </label>
                  <ContentInput
                    onContentChange={handleContentChange}
                    isLoading={isGenerating}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!content || content.length < 50 || isGenerating}
                  className="w-full h-12 text-base gap-2"
                  size="lg"
                >
                  <Sparkles size={20} />
                  إنشاء الخريطة الذهنية
                </Button>
              </TabsContent>

              <TabsContent value="history">
                <MindMapsHistory
                  userId={userId}
                  onSelectMap={handleSelectFromHistory}
                  refreshTrigger={refreshHistory}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
