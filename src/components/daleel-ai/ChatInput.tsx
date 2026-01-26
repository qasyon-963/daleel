import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
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
    <div className="border-t border-border bg-background p-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-muted/50 rounded-2xl border border-border p-2 focus-within:border-primary transition-colors">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اسأل Daleel AI عن الجامعات والتخصصات..."
            disabled={isLoading || disabled}
            className={cn(
              "flex-1 min-h-[44px] max-h-[200px] resize-none border-0 bg-transparent",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-muted-foreground/70 text-foreground",
              "py-3 px-2"
            )}
            dir="rtl"
            rows={1}
          />
          
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading || disabled}
            size="icon"
            className={cn(
              "h-10 w-10 rounded-xl flex-shrink-0 transition-all",
              input.trim() && !isLoading
                ? "bg-primary hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          Daleel AI - مساعدك الذكي للجامعات والتخصصات في سوريا
        </p>
      </div>
    </div>
  );
};
