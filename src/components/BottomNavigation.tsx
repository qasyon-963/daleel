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
    id: "ai-chat",
    label: "المساعد",
    icon: Sparkles,
    path: "/ai-chat",
  },
  {
    id: "news",
    label: "الأخبار",
    icon: Newspaper,
    path: "/news",
  },
  {
    id: "profile",
    label: "الملف الشخصي",
    icon: UserCircle,
    path: "/profile",
  },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = async (path: string) => {
    if (path === '/profile' || path === '/majors') {
      // These pages require authentication, let them handle auth check
      navigate(path);
    } else {
      // Public pages
      navigate(path);
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="nav-bottom z-50">
      <div className="flex items-center justify-around py-3 px-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 relative group ${
                active
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-primary/10 rounded-2xl animate-pulse-glow" />
              )}
              <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${
                active 
                  ? "bg-gradient-primary shadow-lg" 
                  : "group-hover:bg-muted/50"
              }`}>
                <Icon 
                  size={22} 
                  className={`transition-all duration-300 ${active ? "text-white" : ""}`}
                  strokeWidth={active ? 2.5 : 2}
                />
              </div>
              <span className={`relative z-10 text-[10px] font-semibold transition-all duration-300 ${active ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};