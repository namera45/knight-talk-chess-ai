
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, BookmarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ChessboardContainer from '@/components/chess/ChessboardContainer';
import { Progress } from '@/components/ui/progress';

// Mock data for openings
const openings = [
  {
    id: 1,
    name: "Sicilian Defense",
    description: "A popular defense against 1.e4, seeking counterplay rather than symmetry.",
    progress: 85,
    mastered: true,
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
    difficulty: "Advanced"
  },
  {
    id: 2,
    name: "Queen's Gambit",
    description: "White offers a pawn to gain control of the center.",
    progress: 60,
    mastered: false,
    fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    name: "Ruy Lopez",
    description: "Also called the Spanish Opening, one of the oldest and most classic chess openings.",
    progress: 40,
    mastered: false,
    fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    name: "French Defense",
    description: "A solid defense against 1.e4 that leads to closed positions.",
    progress: 25,
    mastered: false,
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    difficulty: "Beginner"
  }
];

const OpeningsSection = () => {
  const [activeOpening, setActiveOpening] = useState(openings[0]);

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
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Left column - Opening details */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="neo-blur overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{activeOpening.name}</h2>
                <div className="flex items-center mt-1 space-x-2">
                  <Badge variant={activeOpening.mastered ? "default" : "outline"}>
                    {activeOpening.mastered ? "Mastered" : "In Progress"}
                  </Badge>
                  <Badge variant="outline" className="bg-black/30">
                    {activeOpening.difficulty}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <BookmarkIcon className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {activeOpening.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Learning Progress</span>
                <span>{activeOpening.progress}%</span>
              </div>
              <Progress value={activeOpening.progress} className="h-2" />
            </div>
          </div>

          <div className="p-6 border-t border-white/10">
            <ChessboardContainer 
              startingFen={activeOpening.fen} 
              showControls={true}
            />
          </div>

          <CardFooter className="px-6 py-4 bg-black/30 flex justify-between">
            <Button variant="outline" size="sm">
              View Variations
            </Button>
            <Button className="flex items-center space-x-2">
              <PlayIcon className="h-4 w-4" />
              <span>Interactive Lesson</span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Right column - Opening list */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Opening Library</h3>
          <Button variant="link" size="sm" className="flex items-center space-x-1">
            <span>View All</span>
            <ArrowRightIcon className="h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-3">
          {openings.map((opening) => (
            <Card 
              key={opening.id} 
              className={`neo-blur cursor-pointer transition-all ${
                activeOpening.id === opening.id ? 'ring-1 ring-primary' : ''
              }`}
              onClick={() => setActiveOpening(opening)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{opening.name}</h4>
                    <Progress value={opening.progress} className="h-1 mt-2" />
                  </div>
                  {opening.mastered && (
                    <Badge variant="default" className="ml-2">
                      ✓
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="neo-blur bg-gradient-to-r from-primary/20 to-transparent">
          <CardContent className="p-4">
            <h4 className="font-medium">Need Recommendations?</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Let our AI coach suggest openings based on your play style
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Get Personalized Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default OpeningsSection;
