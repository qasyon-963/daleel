import { useLocation, useNavigate } from "react-router-dom";
import { School, BookOpen, Sparkles, FileCheck, UserCircle } from "lucide-react";

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
    id: "admissions",
    label: "المفاضلات",
    icon: FileCheck,
    path: "/admissions",
  },
  {
    id: "daleel-ai",
    label: "Daleel AI",
    icon: Sparkles,
    path: "/daleel-ai",
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

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 min-w-[52px] active:scale-95 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                active ? "bg-primary/12" : ""
              }`}>
                <Icon 
                  size={19} 
                  strokeWidth={active ? 2.2 : 1.7}
                />
              </div>
              <span className={`text-[10px] leading-tight ${active ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
