import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Message } from "./types";

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
        "group py-6 px-4 md:px-8",
        isAssistant ? "bg-muted/30" : "bg-background"
      )}
    >
      <div className="max-w-3xl mx-auto flex gap-4">
        {/* Avatar */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            isAssistant ? "bg-primary" : "bg-muted"
          )}
        >
          {isAssistant ? (
            <Bot className="text-primary-foreground" size={18} />
          ) : (
            <User className="text-foreground" size={18} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-foreground">
              {isAssistant ? "Daleel AI" : "أنت"}
            </span>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed">
            {isAssistant ? (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 mr-4 list-disc">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 mr-4 list-decimal">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  h1: ({ children }) => <h1 className="text-xl font-bold mb-3 mt-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-3">{children}</h3>,
                  code: ({ children }) => (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-muted p-3 rounded-lg overflow-x-auto mb-3">{children}</pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-r-4 border-primary pr-4 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>

          {/* Actions */}
          {isAssistant && (
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check size={14} className="ml-1" />
                    <span className="text-xs">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="ml-1" />
                    <span className="text-xs">نسخ</span>
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
