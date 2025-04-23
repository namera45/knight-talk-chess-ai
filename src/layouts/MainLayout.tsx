
import React from "react";
import SidebarNavigation from "./SidebarNavigation";
import MobileNavBar from "./MobileNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden chess-grid-bg w-full">
        {/* Sidebar */}
        <SidebarNavigation />

        {/* Mobile navigation bar */}
        <MobileNavBar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 h-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
