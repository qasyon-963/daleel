import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, isLoading, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading || disabled) return;
    
    onSend(trimmed);
    setInput("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4">
      <div className="relative flex items-end gap-3 bg-card rounded-2xl border border-border shadow-sm p-3 focus-within:border-primary/50 focus-within:shadow-md transition-all duration-300">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اسأل Daleel AI عن الجامعات والتخصصات..."
          disabled={isLoading || disabled}
          className={cn(
            "flex-1 min-h-[48px] max-h-[200px] resize-none border-0 bg-transparent",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "placeholder:text-muted-foreground/60 text-foreground text-base",
            "py-3 px-3"
          )}
          dir="rtl"
          rows={1}
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading || disabled}
          size="icon"
          className={cn(
            "h-11 w-11 rounded-xl flex-shrink-0 transition-all duration-300",
            input.trim() && !isLoading
              ? "bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg hover:scale-105"
              : "bg-muted text-muted-foreground hover:bg-muted"
          )}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Send size={20} />
          )}
        </Button>
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
        <Sparkles size={12} className="text-primary" />
        <span>Daleel AI - مساعدك الذكي للجامعات والتخصصات في سوريا</span>
      </div>
    </div>
  );
};
