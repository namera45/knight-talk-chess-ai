
import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VolumeX, Volume2, Play, Pause, RotateCw } from 'lucide-react';

interface ChessboardContainerProps {
  startingFen?: string;
  showControls?: boolean;
}

const ChessboardContainer = ({ 
  startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", 
  showControls = true 
}: ChessboardContainerProps) => {
  const [game, setGame] = useState(new Chess());
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [isCommenting, setIsCommenting] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  
  useEffect(() => {
    try {
      const chess = new Chess();
      chess.load(startingFen);
      setGame(chess);
      // Reset move history when FEN changes
      setMoveHistory([]);
    } catch (e) {
      console.error("Invalid FEN string:", e);
      setGame(new Chess());
    }
  }, [startingFen]);

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });

      if (move === null) return false;
      
      setGame(new Chess(game.fen()));
      setMoveHistory(prev => [...prev, `${move.piece.toUpperCase()}${move.from}-${move.to}`]);
      
      // If audio is enabled, trigger commentary
      if (audioEnabled) {
        simulateCommentary(move);
      }
      
      return true;
    } catch (e) {
      return false;
    }
  };

  const simulateCommentary = (move: any) => {
    // This would connect to an AI commentary API in a real implementation
    setIsCommenting(true);
    setTimeout(() => setIsCommenting(false), 3000);
  };

  const flipBoard = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
  };

  const resetGame = () => {
    try {
      const chess = new Chess(startingFen);
      setGame(chess);
      setMoveHistory([]);
    } catch (e) {
      console.error("Error resetting game:", e);
      setGame(new Chess());
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  // Custom chess board styles
  const boardStyles = {
    borderRadius: '0.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  };

  const darkSquareStyle = {
    backgroundColor: 'rgba(49, 63, 84, 0.9)',
  };
  
  const lightSquareStyle = {
    backgroundColor: 'rgba(109, 128, 153, 0.8)',
  };

  return (
    <div className="w-full">
      <Card className="neo-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold flex justify-between items-center">
            <span className="text-glow">Chess Board</span>
            {isCommenting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center text-sm bg-primary/20 px-3 py-1 rounded-full"
              >
                <Volume2 className="w-4 h-4 mr-1 animate-pulse-glow" />
                <span>AI Commentary...</span>
              </motion.div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-square max-w-[600px] mx-auto" style={boardStyles}>
            <Chessboard
              position={game.fen()}
              onPieceDrop={handlePieceDrop}
              boardOrientation={orientation}
              customDarkSquareStyle={darkSquareStyle}
              customLightSquareStyle={lightSquareStyle}
              boardWidth={600}
              animationDuration={200}
            />
          </div>
          
          {showControls && (
            <div className="flex flex-wrap gap-2 mt-4 justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={flipBoard}>
                  Flip Board
                </Button>
              </div>
              <Button
                variant={audioEnabled ? "default" : "outline"}
                size="sm"
                onClick={toggleAudio}
                className={audioEnabled ? "bg-primary text-primary-foreground" : ""}
              >
                {audioEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Commentary On
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    Commentary Off
                  </>
                )}
              </Button>
            </div>
          )}
          
          {moveHistory.length > 0 && (
            <div className="mt-4 p-3 bg-black/20 rounded-md max-h-24 overflow-y-auto">
              <h4 className="text-sm font-medium mb-1">Move History</h4>
              <div className="flex flex-wrap gap-1 text-xs">
                {moveHistory.map((move, index) => (
                  <span key={index} className="px-1.5 py-0.5 bg-black/30 rounded">
                    {move}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChessboardContainer;
