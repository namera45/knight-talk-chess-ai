
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Gamepad2, 
  BookOpen, 
  Users, 
  UserRound, 
  Settings2, 
  LogOut,
  MessageSquare,
  FileText,
  ChevronDown
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider 
} from '@/components/ui/sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  // Updated nav items with proper icon components
  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Play',
      path: '/play',
      icon: Gamepad2,
    },
    {
      name: 'Learn',
      path: '/learn',
      icon: BookOpen,
    },
    {
      name: 'Community',
      path: '/community',
      icon: Users,
    },
    {
      name: 'Game Analysis',
      path: '/game-analysis',
      icon: FileText, // Changed to available icon
    },
    {
      name: 'Game Commentary',
      path: '/game-commentary',
      icon: ChevronDown, // Changed to available icon
    },
    {
      name: 'Chatbot',
      path: '/chatbot',
      icon: MessageSquare,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: UserRound,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings2,
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden chess-grid-bg">
        {/* Sidebar Navigation */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-center mb-4">
              <Link to="/dashboard" className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/55d3a5c9-2dfb-42a3-a1d4-de16ea2c7b2c.png" 
                  alt="KnightSpeak" 
                  className="h-12 w-12" 
                />
                <h1 className="text-xl font-bold mt-2 text-white text-glow">Knight<span className="text-primary">Speak</span></h1>
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
                      {React.createElement(item.icon, { className: "mr-2" })}
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
                <SidebarMenuButton
                  asChild
                  tooltip="Logout"
                >
                  <Link to="/" className="flex items-center text-gray-300">
                    <LogOut className="mr-2" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        {/* Mobile navigation bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-sidebar neo-blur">
          <nav className="flex justify-around">
            {navItems.slice(0, 7).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex flex-col items-center py-3 px-2",
                  isActivePath(item.path)
                    ? "text-primary"
                    : "text-gray-400"
                )}
              >
                {React.createElement(item.icon, { 
                  className: "h-6 w-6", 
                  color: isActivePath(item.path) ? undefined : "currentColor" 
                })}
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 h-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
