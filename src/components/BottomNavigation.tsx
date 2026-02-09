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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around py-1.5 px-1 max-w-lg mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-300 min-w-[56px] active:scale-95 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                active ? "bg-primary/15" : ""
              }`}>
                <Icon 
                  size={20} 
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </div>
              <span className={`text-[10px] leading-tight ${active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
