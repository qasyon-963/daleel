import { useState, useRef, useEffect } from "react";
import { Menu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/daleel-ai/ChatMessage";
import { ChatInput } from "@/components/daleel-ai/ChatInput";
import { ChatSidebar } from "@/components/daleel-ai/ChatSidebar";
import { WelcomeScreen } from "@/components/daleel-ai/WelcomeScreen";
import { LoadingMessage } from "@/components/daleel-ai/LoadingMessage";
import { useDaleelChat } from "@/components/daleel-ai/useDaleelChat";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import daleelLogo from "@/assets/daleel-logo-new.png";

export const DaleelAI = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    conversations,
    currentConversation,
    messages,
    isLoading,
    sendMessage,
    selectConversation,
    deleteConversation,
    startNewConversation,
  } = useDaleelChat(userId);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        toast({
          title: "يجب تسجيل الدخول",
          description: "يرجى تسجيل الدخول لاستخدام Daleel AI",
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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
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
      {/* Enhanced Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden hover:bg-primary/10"
            >
              <Menu size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <img src={daleelLogo} alt="Daleel AI" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Daleel AI</h1>
                {currentConversation && (
                  <span className="text-xs text-muted-foreground hidden sm:block line-clamp-1 max-w-[200px]">
                    {currentConversation.title}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={startNewConversation}
            className="text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            <span className="hidden sm:inline">محادثة جديدة</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversation?.id || null}
          onSelectConversation={selectConversation}
          onNewConversation={startNewConversation}
          onDeleteConversation={deleteConversation}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1">
            {messages.length === 0 ? (
              <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
            ) : (
              <div className="min-h-full pb-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && <LoadingMessage />}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            )}
          </ScrollArea>

          {/* Enhanced Input Area */}
          <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto w-full">
              <ChatInput
                onSend={sendMessage}
                isLoading={isLoading}
                disabled={!userId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
