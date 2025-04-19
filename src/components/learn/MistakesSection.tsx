
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import ChessboardContainer from '@/components/chess/ChessboardContainer';

// Mock data for mistakes analysis
const mistakesData = [
  {
    id: 1,
    title: "Missed Tactic in Middlegame",
    date: "Apr 18, 2025",
    opponent: "GrandMaster42",
    gameResult: "0-1",
    position: "r4rk1/pp1n1ppp/2p1p3/3pP3/3P4/2PB1N2/PP3PPP/R4RK1 b - - 0 1",
    mistakeMove: "Nf6",
    correctMove: "Nc5",
    explanation: "Instead of defending passively with Nf6, you could have launched a powerful counterattack with Nc5, threatening both the bishop and creating pressure on the queenside.",
    category: "Tactics",
    improvementAreas: ["Knight mobility", "Counter-attacking", "Tactical vision"]
  },
  {
    id: 2,
    title: "Endgame Calculation Error",
    date: "Apr 15, 2025",
    opponent: "ChessWizard",
    gameResult: "½-½",
    position: "8/5pk1/7p/1p1K4/1P6/8/8/8 w - - 0 1",
    mistakeMove: "Ke5",
    correctMove: "Kc5",
    explanation: "With Ke5, you allowed black to reach the opposition. The correct approach was Kc5, heading directly to stop the b-pawn, which would have secured a win instead of a draw.",
    category: "Endgame",
    improvementAreas: ["King opposition", "Pawn endgames", "Calculation"]
  },
  {
    id: 3,
    title: "Opening Principle Violation",
    date: "Apr 10, 2025",
    opponent: "KnightRider",
    gameResult: "0-1",
    position: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPKPPP/RNBQ1BNR b kq - 0 2",
    mistakeMove: "Ke2",
    correctMove: "Nf3",
    explanation: "Moving the king early in the opening violates fundamental principles. Development with Nf3 would have maintained king safety while controlling the center.",
    category: "Opening",
    improvementAreas: ["Development", "King safety", "Opening principles"]
  }
];

const MistakesSection = () => {
  const [activeMistake, setActiveMistake] = useState(mistakesData[0]);
  const [categoryTab, setCategoryTab] = useState("all");
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const filteredMistakes = categoryTab === "all" 
    ? mistakesData 
    : mistakesData.filter(m => m.category.toLowerCase() === categoryTab);

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Learn from Your Mistakes</h2>
          <p className="text-sm text-muted-foreground">
            Review and practice positions where you made critical errors
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tabs value={categoryTab} onValueChange={setCategoryTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tactics">Tactics</TabsTrigger>
              <TabsTrigger value="endgame">Endgame</TabsTrigger>
              <TabsTrigger value="opening">Opening</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main mistake analysis display */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="neo-blur overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{activeMistake.title}</CardTitle>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <span>{activeMistake.date}</span>
                    <span className="mx-2">•</span>
                    <span>vs {activeMistake.opponent}</span>
                    <span className="mx-2">•</span>
                    <span>Result: {activeMistake.gameResult}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-black/30">
                  {activeMistake.category}
                </Badge>
              </div>
            </CardHeader>
            
            <div className="p-6 border-t border-white/10">
              <ChessboardContainer 
                startingFen={activeMistake.position} 
                showControls={true}
              />
            </div>
            
            <div className="p-6 border-t border-white/10">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                  <h3 className="font-medium text-red-400 mb-1 flex items-center">
                    <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                    Your move: {activeMistake.mistakeMove}
                  </h3>
                  <div className="w-full h-1 bg-red-500/30 rounded-full"></div>
                </div>
                <div className="flex-1 p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                  <h3 className="font-medium text-green-400 mb-1">Better move: {activeMistake.correctMove}</h3>
                  <div className="w-full h-1 bg-green-500/30 rounded-full"></div>
                </div>
              </div>
              
              <h3 className="font-medium mb-2">Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {activeMistake.explanation}
              </p>
              
              <h3 className="font-medium mb-2">Areas to improve</h3>
              <div className="flex flex-wrap gap-2">
                {activeMistake.improvementAreas.map((area, index) => (
                  <Badge key={index} variant="outline">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
            
            <CardFooter className="px-6 py-4 bg-black/30 flex justify-between flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Practice This Position
              </Button>
              <Button>
                Add To Custom Study
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Mistake list and stats */}
        <div className="space-y-4">
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle>Mistake Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tactical Errors</span>
                  <span>38%</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Endgame Mistakes</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Opening Errors</span>
                  <span>22%</span>
                </div>
                <Progress value={22} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Positional Misjudgments</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle>Recent Mistakes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 -mx-2 px-2" style={{ maxHeight: '240px', overflowY: 'auto' }}>
              {filteredMistakes.map((mistake) => (
                <div 
                  key={mistake.id}
                  className={`p-3 rounded-md cursor-pointer transition-all ${
                    activeMistake.id === mistake.id ? 'bg-primary/20 border border-primary/30' : 'bg-black/20 hover:bg-black/30'
                  }`}
                  onClick={() => setActiveMistake(mistake)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{mistake.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        vs {mistake.opponent} • {mistake.date}
                      </p>
                    </div>
                    <Badge variant={activeMistake.id === mistake.id ? "default" : "outline"} className="text-xs">
                      {mistake.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="neo-blur bg-gradient-to-r from-primary/20 to-transparent">
            <CardContent className="p-4">
              <h4 className="font-medium">Personalized Fix</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Get personalized exercises to fix your most common mistakes
              </p>
              <Button size="sm" variant="default" className="w-full">
                Create Training Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default MistakesSection;
