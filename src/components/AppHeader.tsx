import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import daleelLogo from "@/assets/daleel-logo-new.png";

interface AppHeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const AppHeader = ({ 
  title, 
  onSearch, 
  searchPlaceholder = "البحث...", 
  showBackButton = false,
  onBackClick 
}: AppHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-2xl border-b border-border/40">
      <div className="flex items-center gap-3 px-4 py-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackClick}
            className="flex-shrink-0 hover:bg-muted active:scale-95 transition-all h-9 w-9 p-0"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
        
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 gap-2">
          <img 
            src={daleelLogo} 
            alt="دليل" 
            className="h-7 w-7 object-contain"
          />
          {title && (
            <span className="text-sm font-semibold text-foreground">{title}</span>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            size={15} 
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pr-9 h-9 bg-muted/40 border-0 focus:bg-muted/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200 rounded-lg text-sm placeholder:text-muted-foreground/60"
            dir="rtl"
          />
        </div>
      </div>
    </header>
  );
};
