
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartBarIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { ChessGame } from '@/types';

interface RecentMatchesListProps {
  matches: ChessGame[];
}

const RecentMatchesList = ({ matches }: RecentMatchesListProps) => {
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedMatch === id) {
      setExpandedMatch(null);
    } else {
      setExpandedMatch(id);
    }
  };

  const getResultText = (result: string, isUserWhite: boolean) => {
    if (result === '1-0') return isUserWhite ? 'Win' : 'Loss';
    if (result === '0-1') return isUserWhite ? 'Loss' : 'Win';
    if (result === '1/2-1/2') return 'Draw';
    return 'Ongoing';
  };

  const getResultClass = (result: string, isUserWhite: boolean) => {
    if ((result === '1-0' && isUserWhite) || (result === '0-1' && !isUserWhite)) 
      return 'text-green-500';
    if ((result === '1-0' && !isUserWhite) || (result === '0-1' && isUserWhite)) 
      return 'text-red-500';
    if (result === '1/2-1/2') 
      return 'text-amber-500';
    return 'text-blue-500';
  };

  return (
    <Card className="neo-blur w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-glow">Recent Matches</CardTitle>
        <CardDescription>Your last 5 matches with analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {matches.map((match) => {
            // For demo purpose, assume the current user is white
            const isUserWhite = true;
            const opponent = isUserWhite ? match.blackPlayer : match.whitePlayer;
            const userAccuracy = isUserWhite ? match.accuracy?.white : match.accuracy?.black;
            const resultText = getResultText(match.result, isUserWhite);
            const resultClass = getResultClass(match.result, isUserWhite);

            return (
              <motion.li 
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Card className="bg-black/20 hover:bg-black/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{opponent}</span>
                          <span className={`${resultClass} font-semibold`}>{resultText}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <span className="block text-sm">Accuracy</span>
                          <span className="text-lg font-semibold">
                            {userAccuracy ? `${userAccuracy}%` : 'N/A'}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleExpand(match.id)}
                          className="hover:bg-primary/20"
                        >
                          {expandedMatch === match.id ? (
                            <ArrowsPointingOutIcon className="w-4 h-4 mr-1" />
                          ) : (
                            <ChartBarIcon className="w-4 h-4 mr-1" />
                          )}
                          {expandedMatch === match.id ? 'Hide' : 'Analysis'}
                        </Button>
                      </div>
                    </div>

                    {expandedMatch === match.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{match.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Moves:</span>
                            <span>{match.moves.length}</span>
                          </div>
                          <div className="bg-black/30 p-3 rounded-md mt-2">
                            <h4 className="font-medium mb-1">Key insights:</h4>
                            <p className="text-muted-foreground">
                              {userAccuracy && userAccuracy > 80
                                ? "Excellent game! Your accuracy was high throughout."
                                : "Several inaccuracies in the middle game. Consider analyzing key positions."}
                            </p>
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-2 hover:bg-primary/20">
                            Deep Dive Analysis
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentMatchesList;
