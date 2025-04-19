
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingChessPieces from '@/components/chess/FloatingChessPieces';
import { Button } from '@/components/ui/button';
import AuthPage from './AuthPage';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulating a loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Logo animation variants
  const logoVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center knight-gradient">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.img 
            src="/lovable-uploads/55d3a5c9-2dfb-42a3-a1d4-de16ea2c7b2c.png" 
            alt="KnightSpeak Logo" 
            className="w-24 h-24 mb-4 mx-auto"
            variants={logoVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="w-48 h-1 bg-gradient-to-r from-knight-DEFAULT to-knight-light rounded-full mx-auto my-4"
          />
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // This component will now render the Auth page
  // In a real app, we'd check if the user is already authenticated
  return <AuthPage />;
};

export default Index;
