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
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-3 p-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackClick}
            className="flex-shrink-0 hover:bg-primary/10 active:scale-95 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
        
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img 
            src={daleelLogo} 
            alt="دليل" 
            className="h-9 w-auto"
          />
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            size={16} 
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pr-9 h-9 bg-muted/50 border-border focus:bg-background focus:border-primary/50 transition-all duration-200 rounded-xl text-sm"
            dir="rtl"
          />
        </div>
      </div>
    </header>
  );
};
