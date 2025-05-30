
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Gamepad2,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  Settings,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Play",
    path: "/play",
    icon: Gamepad2,
  },
  {
    name: "Analysis",
    path: "/game-analysis",
    icon: FileText,
  },
  {
    name: "Commentary",
    path: "/game-commentary",
    icon: MessageSquare,
  },
  {
    name: "Learn",
    path: "/learn",
    icon: BookOpen,
  },
  {
    name: "Community",
    path: "/community",
    icon: Users,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const MobileNavBar = () => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-sidebar neo-blur">
      <nav className="flex justify-around overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-3 px-2 min-w-[60px]",
              isActivePath(item.path) 
                ? "text-primary border-t-2 border-primary" 
                : "text-gray-400"
            )}
          >
            {item.icon && (
              // @ts-ignore
              <item.icon
                className="h-5 w-5"
                color={isActivePath(item.path) ? undefined : "currentColor"}
              />
            )}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavBar;
