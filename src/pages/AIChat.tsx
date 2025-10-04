import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppHeader } from "@/components/AppHeader";
import { Send, Bot, User, Loader2 } from "lucide-react";
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
        errorMessage = 'تم تجاوز حد الاستخدام، يرجى المحاولة لاحقاً';
      } else if (error.message?.includes('402')) {
        errorMessage = 'خدمة الذكاء الاصطناعي تتطلب إضافة رصيد';
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
    <div className="min-h-screen bg-background pb-20">
      <AppHeader searchPlaceholder="البحث..." />
      
      <div className="p-4 space-y-6">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <Bot className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            المساعد الذكي
          </h1>
          <p className="text-muted-foreground">
            اسأل أي سؤال عن الجامعات والتخصصات في سوريا
          </p>
        </div>

        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="text-lg gradient-text">المحادثة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[500px] overflow-y-auto space-y-4 p-4 bg-gradient-hero/5 rounded-lg">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="text-white" size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-primary text-white'
                        : 'bg-card border border-border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="text-white" size={16} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div className="max-w-[70%] p-4 rounded-lg bg-card border border-border">
                    <Loader2 className="animate-spin text-primary" size={20} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب سؤالك هنا..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-primary hover:bg-gradient-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">
              💡 نصيحة: اسأل عن أي جامعة، كلية، أو تخصص في سوريا
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};