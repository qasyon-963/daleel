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
      <div className="flex items-center justify-around py-2 px-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon 
                size={22} 
                className={`mb-1 ${active ? "text-primary" : ""}`}
              />
              <span className={`text-xs font-medium ${active ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};