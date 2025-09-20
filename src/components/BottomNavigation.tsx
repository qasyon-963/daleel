import { useLocation, useNavigate } from "react-router-dom";
import { Home, GraduationCap, Newspaper, User } from "lucide-react";

const navigationItems = [
  {
    id: "universities",
    label: "الجامعات",
    icon: Home,
    path: "/",
  },
  {
    id: "majors", 
    label: "التخصصات",
    icon: GraduationCap,
    path: "/majors",
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
    icon: User,
    path: "/profile",
  },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 relative ${
                active
                  ? "text-primary bg-gradient-primary/10 scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:scale-105"
              }`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-1 bg-gradient-primary rounded-full" />
              )}
              <Icon 
                size={24} 
                className={`mb-1 transition-all duration-300 ${active ? "text-primary" : ""}`}
              />
              <span className={`text-xs font-medium transition-all duration-300 ${active ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};