
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon, FireIcon, TrophyIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ChessboardContainer from '@/components/chess/ChessboardContainer';

// Mock data for puzzles
const puzzles = [
  {
    id: 1,
    title: "Queen Sacrifice",
    fen: "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4",
    difficulty: "Hard",
    rating: 1800,
    category: "Tactics"
  },
  {
    id: 2,
    title: "Fork Opportunity",
    fen: "r4rk1/pp1n1ppp/2p1p3/3pP3/3P4/2PB1N2/PP3PPP/R4RK1 w - - 0 13",
    difficulty: "Medium",
    rating: 1500,
    category: "Tactics"
  },
  {
    id: 3,
    title: "Checkmate in 2",
    fen: "r1b2rk1/ppp2ppp/2n5/3q4/3Pn1b1/2P2N2/PP3PPP/RNBQR1K1 b - - 0 1",
    difficulty: "Easy",
    rating: 1200,
    category: "Mate"
  }
];

const PuzzlesSection = () => {
  const [activePuzzle, setActivePuzzle] = useState(puzzles[0]);
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showHint, setShowHint] = useState(false);
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Daily Puzzles</h2>
          <p className="text-sm text-muted-foreground">
            Solve puzzles to improve your tactical vision and calculation
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <ToggleGroup type="single" value={difficultyFilter} onValueChange={(val) => val && setDifficultyFilter(val)}>
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="easy">Easy</ToggleGroupItem>
            <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
            <ToggleGroupItem value="hard">Hard</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main puzzle display */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="neo-blur overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{activePuzzle.title}</CardTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge variant="outline" className="bg-black/30">
                      {activePuzzle.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-black/30">
                      Rating: {activePuzzle.rating}
                    </Badge>
                    <Badge variant="outline" className="bg-black/30">
                      {activePuzzle.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="p-4 bg-black/20 border-y border-white/10 text-center">
                <p className="font-medium">Find the best move for {activePuzzle.fen.includes(" b ") ? "black" : "white"}</p>
              </div>
              <div className="p-6">
                <ChessboardContainer 
                  startingFen={activePuzzle.fen} 
                  showControls={false}
                />
              </div>
              
              {showHint && (
                <div className="px-6 py-3 bg-primary/10 border-y border-primary/30">
                  <p className="text-sm font-medium">Hint:</p>
                  <p className="text-sm">Look for a forcing move that creates multiple threats.</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="px-6 py-4 bg-black/30 flex justify-between flex-wrap gap-2">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowHint(!showHint)}
                >
                  <LightBulbIcon className="h-4 w-4 mr-1" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowPathIcon className="h-4 w-4 mr-1" />
                  Skip Puzzle
                </Button>
              </div>
              <Button>
                Submit Solution
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Puzzle selection and streak */}
        <div className="space-y-4">
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FireIcon className="h-5 w-5 mr-2 text-amber-500" />
                Your Puzzle Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center text-glow my-3">7</div>
              <div className="flex justify-center space-x-1 my-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-primary rounded-full"></div>
                ))}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i + 7} className="w-3 h-3 bg-white/20 rounded-full"></div>
                ))}
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Keep solving daily puzzles to maintain your streak!
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrophyIcon className="h-5 w-5 mr-2 text-amber-500" />
                Daily Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Solve 5 more puzzles today to earn:
              </p>
              <div className="flex items-center space-x-3 bg-black/20 p-3 rounded-md">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-300 rounded-full flex items-center justify-center text-black font-bold">
                  10
                </div>
                <div>
                  <div className="font-medium text-sm">Tactical Vision Points</div>
                  <div className="text-xs text-muted-foreground">
                    Use these to unlock special lessons
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Start Challenge
              </Button>
            </CardContent>
          </Card>
          
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle>More Puzzles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {puzzles.map((puzzle) => (
                <div 
                  key={puzzle.id}
                  className={`p-3 rounded-md cursor-pointer transition-all ${
                    activePuzzle.id === puzzle.id ? 'bg-primary/20 border border-primary/30' : 'bg-black/20 hover:bg-black/30'
                  }`}
                  onClick={() => setActivePuzzle(puzzle)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{puzzle.title}</h4>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <span>{puzzle.difficulty}</span>
                        <span className="mx-1">•</span>
                        <span>Rating: {puzzle.rating}</span>
                      </div>
                    </div>
                    <Badge variant={activePuzzle.id === puzzle.id ? "default" : "outline"}>
                      {puzzle.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="px-4 pt-0">
              <Button variant="link" className="w-full">
                Browse All Puzzles
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default PuzzlesSection;
