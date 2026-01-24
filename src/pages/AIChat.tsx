import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppHeader } from "@/components/AppHeader";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'مرحباً! أنا مساعدك الذكي للإجابة على أسئلتك حول الجامعات والكليات والتخصصات في سوريا. كيف يمكنني مساعدتك؟'
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    if (userMessage.length < 3) {
      toast({
        title: "خطأ",
        description: "الرسالة قصيرة جداً (3 أحرف على الأقل)",
        variant: "destructive",
      });
      return;
    }

    if (userMessage.length > 1000) {
      toast({
        title: "خطأ",
        description: "الرسالة طويلة جداً (1000 حرف كحد أقصى)",
        variant: "destructive",
      });
      return;
    }

    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: userMessage }
      });

      if (error) {
        throw error;
      }

      if (data?.response) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response 
        }]);
      } else {
        throw new Error('لم يتم استلام رد من الذكاء الاصطناعي');
      }
    } catch (error: any) {
      console.error('Error calling AI:', error);
      
      let errorMessage = 'عذراً، حدث خطأ في معالجة طلبك';
      if (error.message?.includes('429')) {
        errorMessage = 'تم تجاوز عدد الطلبات المسموح، يرجى الانتظار قليلاً';
      } else if (error.message?.includes('402')) {
        errorMessage = 'خدمة الذكاء الاصطناعي تتطلب إضافة رصيد';
      } else if (error.message?.includes('401') || error.message?.includes('تسجيل الدخول')) {
        errorMessage = 'يجب تسجيل الدخول أولاً لاستخدام الشات';
      } else if (error.message?.includes('400')) {
        errorMessage = 'رسالة غير صالحة';
      }
      
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive"
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader searchPlaceholder="البحث..." />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center py-6 animate-fade-in">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-primary-foreground" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            المساعد الذكي
          </h1>
          <p className="text-muted-foreground text-sm">
            اسأل أي سؤال عن الجامعات والتخصصات في سوريا
          </p>
        </div>

        {/* Chat Card */}
        <Card className="border border-border bg-card">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-lg font-bold">المحادثة</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="text-primary-foreground" size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-xl text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="text-foreground" size={16} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start animate-fade-in">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="text-primary-foreground" size={16} />
                  </div>
                  <div className="p-3 rounded-xl bg-muted">
                    <Loader2 className="animate-spin text-primary" size={18} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب سؤالك هنا..."
                  disabled={isLoading}
                  className="flex-1 bg-muted/50 border-border focus:border-primary"
                  dir="rtl"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                💡 اسأل عن أي جامعة، كلية، أو تخصص في سوريا
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
