
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, UserIcon, CogIcon, TrophyIcon,
  ChartBarIcon, MicrophoneIcon, ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

interface NavItem {
  name: string;
  path: string;
  icon: (className: string) => JSX.Element;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (className) => <HomeIcon className={className} />,
    },
    {
      name: 'Play',
      path: '/play',
      icon: (className) => <MicrophoneIcon className={className} />,
    },
    {
      name: 'Learn',
      path: '/learn',
      icon: (className) => <ChartBarIcon className={className} />,
    },
    {
      name: 'Community',
      path: '/community',
      icon: (className) => <TrophyIcon className={className} />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: (className) => <UserIcon className={className} />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: (className) => <CogIcon className={className} />,
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen overflow-hidden chess-grid-bg">
      {/* Sidebar Navigation */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col w-64 bg-sidebar neo-blur py-4 px-2"
      >
        <div className="flex items-center justify-center mb-8">
          <Link to="/dashboard">
            <img 
              src="/lovable-uploads/55d3a5c9-2dfb-42a3-a1d4-de16ea2c7b2c.png" 
              alt="KnightSpeak" 
              className="h-12 w-12" 
            />
            <h1 className="text-xl font-bold mt-2 text-white text-glow">Knight<span className="text-primary">Speak</span></h1>
          </Link>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg hover-glow",
                    isActivePath(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "text-gray-300 hover:bg-black/20"
                  )}
                >
                  {item.icon(cn("h-5 w-5 mr-3", 
                    isActivePath(item.path) ? "text-primary-foreground" : "text-gray-400"
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
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="pt-2 mt-2 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-black/20 hover-glow"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-gray-400" />
            <span>Logout</span>
          </Link>
        </div>
      </motion.div>
      
      {/* Mobile navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-sidebar neo-blur">
        <nav className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
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
              {item.icon(cn("h-6 w-6", isActivePath(item.path) ? "text-primary" : ""))}
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
  );
};

export default MainLayout;
