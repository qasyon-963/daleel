import { Copy, Check, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Message } from "./types";
import daleelLogo from "@/assets/daleel-logo.png";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === 'assistant';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group py-6 px-4 md:px-8 transition-colors duration-200",
        isAssistant ? "bg-muted/20" : "bg-background"
      )}
    >
      <div className="max-w-3xl mx-auto flex gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-sm",
              isAssistant 
                ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20" 
                : "bg-muted border border-border"
            )}
          >
            {isAssistant ? (
              <img src={daleelLogo} alt="Daleel AI" className="w-8 h-8 object-contain" />
            ) : (
              <User className="text-foreground" size={20} />
            )}
          </div>
          {isAssistant && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-md flex items-center justify-center">
              <Sparkles className="text-primary-foreground" size={10} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "font-bold text-sm",
              isAssistant ? "text-primary" : "text-foreground"
            )}>
              {isAssistant ? "Daleel AI" : "أنت"}
            </span>
            {isAssistant && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                مساعد ذكي
              </span>
            )}
          </div>
          
          <div className={cn(
            "prose prose-sm dark:prose-invert max-w-none leading-relaxed",
            isAssistant ? "text-foreground" : "text-foreground/90"
          )}>
            {isAssistant ? (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-4 last:mb-0 leading-7">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 mr-4 list-disc space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 mr-4 list-decimal space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="leading-7">{children}</li>,
                  h1: ({ children }) => <h1 className="text-xl font-bold mb-4 mt-6 text-foreground border-b border-border pb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold mb-3 mt-5 text-foreground">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-4 text-foreground">{children}</h3>,
                  code: ({ children }) => (
                    <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono border border-border">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-muted p-4 rounded-xl overflow-x-auto mb-4 border border-border">{children}</pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-r-4 border-primary pr-4 my-4 italic text-muted-foreground bg-muted/30 py-2 rounded-l-lg">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                  a: ({ children, href }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <p className="whitespace-pre-wrap leading-7">{message.content}</p>
            )}
          </div>

          {/* Actions */}
          {isAssistant && (
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
              >
                {copied ? (
                  <>
                    <Check size={14} className="ml-1.5 text-green-500" />
                    <span className="text-xs font-medium">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="ml-1.5" />
                    <span className="text-xs font-medium">نسخ الرد</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
