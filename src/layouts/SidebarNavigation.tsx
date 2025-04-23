
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Gamepad2,
  BookOpen,
  Users,
  FileText,
  ChevronDown,
  MessageSquare,
  UserRound,
  Settings2,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
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
    name: "Game Analysis",
    path: "/game-analysis",
    icon: FileText,
  },
  {
    name: "Game Commentary",
    path: "/game-commentary",
    icon: ChevronDown,
  },
  {
    name: "Chatbot",
    path: "/chatbot",
    icon: MessageSquare,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: UserRound,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings2,
  },
];

const SidebarNavigation = () => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center mb-4">
          <Link to="/dashboard" className="flex flex-col items-center">
            <img
              src="/lovable-uploads/55d3a5c9-2dfb-42a3-a1d4-de16ea2c7b2c.png"
              alt="KnightSpeak"
              className="h-12 w-12"
            />
            <h1 className="text-xl font-bold mt-2 text-white text-glow">
              Knight<span className="text-primary">Speak</span>
            </h1>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={isActivePath(item.path)}
                tooltip={item.name}
              >
                <Link to={item.path} className="flex items-center">
                  {item.icon &&
                    // @ts-ignore
                    (item.icon && ( // fix for ts bug, lucide icon typing
                      <item.icon className="mr-2" />
                    ))}
                  <span>{item.name}</span>
                  {isActivePath(item.path) && (
                    <motion.div
                      className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-md"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link to="/" className="flex items-center text-gray-300">
                <LogOut className="mr-2" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNavigation;
