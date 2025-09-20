import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import daleelLogo from "@/assets/daleel-logo.png";

interface AppHeaderProps {
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export const AppHeader = ({ onSearch, searchPlaceholder = "البحث..." }: AppHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/30">
      <div className="flex items-center gap-4 p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <img 
              src={daleelLogo} 
              alt="دليل" 
              className="h-12 w-12 rounded-lg interactive-hover"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-primary rounded-full animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">دليل</h1>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-colors duration-200" 
            size={18} 
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pr-10 bg-muted/30 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-300 rounded-lg"
            dir="rtl"
          />
        </div>
      </div>
    </header>
  );
};