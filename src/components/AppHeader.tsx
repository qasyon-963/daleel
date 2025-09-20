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
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center gap-4 p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <img 
            src={daleelLogo} 
            alt="دليل" 
            className="h-10 w-10 rounded-lg"
          />
          <h1 className="text-xl font-bold text-primary">دليل</h1>
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
            className="pr-10 bg-muted/50 border-border focus:bg-background"
            dir="rtl"
          />
        </div>
      </div>
    </header>
  );
};