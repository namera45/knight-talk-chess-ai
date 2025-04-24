
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
      <div className="flex h-screen overflow-hidden chess-grid-bg w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Floating chess pieces background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="chess-piece king absolute top-[10%] left-[5%] w-16 h-16 animate-float-slow"></div>
          <div className="chess-piece queen absolute top-[30%] right-[15%] w-12 h-12 animate-float-medium"></div>
          <div className="chess-piece knight absolute bottom-[20%] left-[25%] w-10 h-10 animate-float-fast"></div>
          <div className="chess-piece rook absolute top-[15%] right-[30%] w-8 h-8 animate-float-medium"></div>
          <div className="chess-piece bishop absolute bottom-[10%] right-[10%] w-10 h-10 animate-float-slow"></div>
          <div className="chess-piece pawn absolute top-[50%] left-[10%] w-6 h-6 animate-float-fast"></div>
        </div>
        
        {/* Sidebar */}
        <SidebarNavigation />

        {/* Mobile navigation bar */}
        <MobileNavBar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <main className="p-4 md:p-6 lg:p-8 h-full max-w-7xl mx-auto">
            {children}
          </main>
        </div>
        
        {/* Chess-themed grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      </div>
      
      {/* Global styles for chess pieces and animations */}
      <style jsx global>{`
        .chess-grid-bg {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .chess-piece {
          opacity: 0.6;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        
        .chess-piece.king {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22.5 11.63V6M20 8h5' stroke-linejoin='miter'/%3E%3Cpath d='M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5' fill='%23ffffff' stroke-linecap='butt' stroke-linejoin='miter'/%3E%3Cpath d='M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7' fill='%23ffffff'/%3E%3Cpath d='M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0' stroke-linecap='butt'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .chess-piece.queen {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='%23ffffff' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z'/%3E%3Cpath d='M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z' stroke-linecap='butt'/%3E%3Cpath d='M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0' fill='none'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .chess-piece.knight {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21' fill='%23ffffff'/%3E%3Cpath d='M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3' fill='%23ffffff'/%3E%3Cpath d='M9.5 25.5A.5.5 0 1 1 9 25a.5.5 0 0 1 .5.5z' fill='%23ffffff' stroke='none'/%3E%3Cpath d='M15 15.5A.5 1.5 0 1 1 14 14a.5 1.5 0 0 1 1 1.5z' fill='%23ffffff' stroke='none' transform='rotate(30 14.5 15)'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .chess-piece.bishop {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg fill='%23ffffff' stroke-linecap='butt'%3E%3Cpath d='M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z'/%3E%3Cpath d='M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z'/%3E%3Cpath d='M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z'/%3E%3C/g%3E%3Cpath d='M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5' stroke-linejoin='miter'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .chess-piece.rook {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='%23ffffff' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5' stroke-linecap='butt'/%3E%3Cpath d='M34 14l-3 3H14l-3-3'/%3E%3Cpath d='M31 17v12.5H14V17' stroke-linecap='butt' stroke-linejoin='miter'/%3E%3Cpath d='M31 29.5l1.5 2.5h-20l1.5-2.5'/%3E%3Cpath d='M11 14h23' fill='none' stroke-linejoin='miter'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .chess-piece.pawn {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cpath d='M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z' fill='%23ffffff' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-8deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(12deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 15s infinite ease-in-out;
        }
        
        .animate-float-medium {
          animation: float-medium 11s infinite ease-in-out;
        }
        
        .animate-float-fast {
          animation: float-fast 8s infinite ease-in-out;
        }
        
        /* Glow effect for text */
        .text-glow {
          text-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
        }
        
        /* Neo blur effect for cards */
        .neo-blur {
          background: rgba(10, 25, 50, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(100, 150, 255, 0.1);
        }
        
        /* Pulse glow animation */
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; filter: brightness(1.5); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </SidebarProvider>
  );
};

export default MainLayout;
