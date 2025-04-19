
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  PuzzlePieceIcon, 
  ChartBarIcon, 
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OpeningsSection from '@/components/learn/OpeningsSection';
import PuzzlesSection from '@/components/learn/PuzzlesSection';
import MistakesSection from '@/components/learn/MistakesSection';
import CoachSection from '@/components/learn/CoachSection';

const LearnPage = () => {
  const [currentTab, setCurrentTab] = useState("openings");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-bold text-glow"
          >
            Learn &amp; Improve
          </motion.h1>
          
          <motion.div 
            variants={itemVariants} 
            className="flex items-center space-x-2"
          >
            <Button variant="outline" size="sm" className="space-x-1">
              <AcademicCapIcon className="h-4 w-4" />
              <span>Learning Progress</span>
            </Button>
          </motion.div>
        </div>
        
        {/* Learning stats overview */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <BookOpenIcon className="h-4 w-4 mr-2" />
                Openings Mastered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-glow">5 / 24</div>
              <div className="h-2 bg-black/20 rounded-full mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: "20%" }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <PuzzlePieceIcon className="h-4 w-4 mr-2" />
                Puzzles Solved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-glow">137</div>
              <p className="text-xs text-green-500 mt-1">
                +12 puzzles from last week
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Learning Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-glow">7 days</div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AcademicCapIcon className="h-4 w-4 mr-2" />
                Study Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-glow">24.5 hrs</div>
              <p className="text-xs text-green-500 mt-1">
                +3.2 hours this week
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Learning content tabs */}
        <motion.div variants={itemVariants}>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="openings" className="flex items-center space-x-2">
                <BookOpenIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Openings</span>
              </TabsTrigger>
              <TabsTrigger value="puzzles" className="flex items-center space-x-2">
                <PuzzlePieceIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Puzzles</span>
              </TabsTrigger>
              <TabsTrigger value="mistakes" className="flex items-center space-x-2">
                <ChartBarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Learn from Mistakes</span>
              </TabsTrigger>
              <TabsTrigger value="coach" className="flex items-center space-x-2">
                <AcademicCapIcon className="h-4 w-4" />
                <span className="hidden sm:inline">AI Coach</span>
                <Badge className="ml-1 bg-primary/80 text-xs" variant="outline">NEW</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="openings" className="mt-0">
              <OpeningsSection />
            </TabsContent>
            
            <TabsContent value="puzzles" className="mt-0">
              <PuzzlesSection />
            </TabsContent>
            
            <TabsContent value="mistakes" className="mt-0">
              <MistakesSection />
            </TabsContent>
            
            <TabsContent value="coach" className="mt-0">
              <CoachSection />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default LearnPage;
