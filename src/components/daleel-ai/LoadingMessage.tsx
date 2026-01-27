import { Sparkles } from "lucide-react";
import daleelLogo from "@/assets/daleel-logo.png";

export const LoadingMessage = () => {
  return (
    <div className="py-6 px-4 md:px-8 bg-muted/20">
      <div className="max-w-3xl mx-auto flex gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden border border-primary/20 shadow-sm">
            <img src={daleelLogo} alt="Daleel AI" className="w-8 h-8 object-contain" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-md flex items-center justify-center">
            <Sparkles className="text-primary-foreground" size={10} />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-sm text-primary">Daleel AI</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              يكتب...
            </span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-3 w-fit">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-sm text-muted-foreground mr-2">جاري التفكير...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
