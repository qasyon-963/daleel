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
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-4 p-4">
        {/* Back Button */}
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackClick}
            className="flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
        
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img 
            src={daleelLogo} 
            alt="دليل" 
            className="h-10 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            size={18} 
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pr-10 bg-muted/50 border-border focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 rounded-xl"
            dir="rtl"
          />
        </div>
      </div>
    </header>
  );
};
