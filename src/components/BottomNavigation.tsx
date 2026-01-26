import { useLocation, useNavigate } from "react-router-dom";
import { School, BookOpen, Sparkles, Newspaper, UserCircle } from "lucide-react";

const navigationItems = [
  {
    id: "universities",
    label: "الجامعات",
    icon: School,
    path: "/",
  },
  {
    id: "majors", 
    label: "التخصصات",
    icon: BookOpen,
    path: "/majors",
  },
  {
    id: "daleel-ai",
    label: "Daleel AI",
    icon: Sparkles,
    path: "/daleel-ai",
  },
  {
    id: "news",
    label: "الأخبار",
    icon: Newspaper,
    path: "/news",
  },
  {
    id: "profile",
    label: "حسابي",
    icon: UserCircle,
    path: "/profile",
  },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = async (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 min-w-[60px] ${
                active
                  ? "text-primary-foreground bg-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon 
                size={20} 
                strokeWidth={active ? 2.5 : 2}
              />
              <span className="text-[10px] font-semibold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
