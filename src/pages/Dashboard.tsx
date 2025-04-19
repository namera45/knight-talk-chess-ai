
import { ChartBarIcon, TrophyIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentMatchesList from '@/components/dashboard/RecentMatchesList';
import UserRatingChart from '@/components/dashboard/UserRatingChart';
import ChessboardContainer from '@/components/chess/ChessboardContainer';
import MainLayout from '@/layouts/MainLayout';
import { ChessGame } from '@/types';

// Mock data for demo purposes
const recentMatches: ChessGame[] = [
  {
    id: '1',
    whitePlayer: 'You',
    blackPlayer: 'Stockfish_Level5',
    result: '1-0',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O'],
    date: '2025-04-18',
    accuracy: { white: 92, black: 87 }
  },
  {
    id: '2',
    whitePlayer: 'GrandMaster42',
    blackPlayer: 'You',
    result: '0-1',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'e3', 'O-O'],
    date: '2025-04-15',
    accuracy: { white: 85, black: 89 }
  },
  {
    id: '3',
    whitePlayer: 'You',
    blackPlayer: 'ChessWizard',
    result: '1/2-1/2',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6'],
    date: '2025-04-12',
    accuracy: { white: 78, black: 80 }
  },
  {
    id: '4',
    whitePlayer: 'KnightRider',
    blackPlayer: 'You',
    result: '1-0',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7'],
    date: '2025-04-10',
    accuracy: { white: 94, black: 75 }
  },
  {
    id: '5',
    whitePlayer: 'You',
    blackPlayer: 'QueenGambit',
    result: '1-0',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6'],
    date: '2025-04-07',
    accuracy: { white: 88, black: 82 }
  }
];

const ratingData = [
  { date: 'Mar 10', rating: 1240 },
  { date: 'Mar 15', rating: 1255 },
  { date: 'Mar 20', rating: 1248 },
  { date: 'Mar 25', rating: 1270 },
  { date: 'Mar 30', rating: 1262 },
  { date: 'Apr 05', rating: 1285 },
  { date: 'Apr 10', rating: 1290 },
  { date: 'Apr 15', rating: 1310 },
];

const Dashboard = () => {
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
            Dashboard
          </motion.h1>
        </div>
        
        {/* Stats cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatsCard 
            title="Total Games" 
            value="247" 
            icon={<ChartBarIcon className="h-5 w-5" />} 
          />
          <StatsCard 
            title="Win Rate" 
            value="64%" 
            icon={<TrophyIcon className="h-5 w-5" />}
            trend={{ value: 7, isPositive: true }} 
          />
          <StatsCard 
            title="Average Time" 
            value="12:35" 
            icon={<ClockIcon className="h-5 w-5" />} 
          />
          <StatsCard 
            title="Current Rating" 
            value="1310" 
            icon={<UserIcon className="h-5 w-5" />}
            trend={{ value: 25, isPositive: true }} 
          />
        </motion.div>
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Recent matches */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            {/* Recent matches */}
            <RecentMatchesList matches={recentMatches} />
          </motion.div>

          {/* Right column - Rating chart and Daily Puzzle */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Rating chart */}
            <UserRatingChart data={ratingData} currentRating={1310} />
            
            {/* Daily Chess Puzzle */}
            <motion.div variants={itemVariants}>
              <Card className="neo-blur">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-glow">Daily Chess Puzzle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ChessboardContainer 
                    startingFen="r2qk2r/ppp1bppp/2n5/3pP3/3P4/2P5/PP4PP/RNBQK2R w KQkq - 0 1"
                    showControls={false}
                  />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mt-2">
                      White to move and gain advantage. Find the best move!
                    </p>
                    <Button variant="outline" className="mt-4 w-full bg-black/20 border-white/10">
                      Show Solution
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;
