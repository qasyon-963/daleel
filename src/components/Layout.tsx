import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};