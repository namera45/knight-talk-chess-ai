
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import FloatingChessPieces from "@/components/chess/FloatingChessPieces";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 knight-gradient relative">
      {/* Background chess pieces animation */}
      <FloatingChessPieces />
      
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-center relative z-10"
      >
        <img 
          src="/lovable-uploads/55d3a5c9-2dfb-42a3-a1d4-de16ea2c7b2c.png" 
          alt="KnightSpeak" 
          className="w-24 h-24 mb-2 mx-auto"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">Knight<span className="text-primary">Speak</span></h1>
        <p className="text-muted-foreground mt-2">AI-Powered Chess Commentary</p>
      </motion.div>
      
      {/* Auth container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Tabs 
          defaultValue="login" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4 neo-blur">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ 
                opacity: 0, 
                x: activeTab === 'login' ? -40 : 40,
                rotateY: activeTab === 'login' ? -10 : 10 
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                rotateY: 0 
              }}
              exit={{ 
                opacity: 0, 
                x: activeTab === 'login' ? 40 : -40,
                rotateY: activeTab === 'login' ? 10 : -10 
              }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 100
              }}
            >
              <TabsContent value="login" className="mt-0">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register" className="mt-0">
                <RegisterForm />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
        
        {/* Demo access button */}
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/dashboard'}
            className="bg-black/30 border-white/10 hover:bg-black/40"
          >
            Continue as Guest
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
