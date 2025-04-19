
import { useState } from 'react';
import { motion } from 'framer-motion';
import ChessboardContainer from '@/components/chess/ChessboardContainer';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MicrophoneIcon, SpeakerWaveIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

const LiveGamePage = () => {
  const [commentaryEnabled, setCommentaryEnabled] = useState(false);
  const [analysisMode, setAnalysisMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const toggleCommentary = () => {
    setCommentaryEnabled(!commentaryEnabled);
  };
  
  const toggleAnalysisMode = () => {
    setAnalysisMode(!analysisMode);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Sample evaluation data points for the graph
  const evaluationData = [0.2, 0.5, 0.3, 0.7, 0.6, 0.9, 0.8, 1.2, 0.7, 0.5, 0.3];
  
  // Calculate max evaluation value for scaling the graph
  const maxEval = Math.max(...evaluationData.map(v => Math.abs(v))) || 1;
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-glow">Live Game</h1>
          <div className="flex space-x-3">
            <Button 
              variant={commentaryEnabled ? "default" : "outline"}
              size="sm"
              onClick={toggleCommentary}
              className={commentaryEnabled ? "bg-primary text-primary-foreground" : ""}
            >
              <SpeakerWaveIcon className="w-4 h-4 mr-2" />
              Commentary
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAnalysisMode}
            >
              {analysisMode ? "Normal Mode" : "Analysis Mode"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chess board - takes up more space on larger screens */}
          <div className="lg:col-span-2">
            <ChessboardContainer />
          </div>
          
          {/* Game info and controls */}
          <div className="space-y-5">
            {/* Game info */}
            <Card className="neo-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Game Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-white mr-2"></div>
                    <span>You (1310)</span>
                  </div>
                  <span>03:42</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-black border border-white/20 mr-2"></div>
                    <span>Opponent (1325)</span>
                  </div>
                  <span>04:15</span>
                </div>
                
                <div className="flex justify-center my-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={togglePlayPause}
                    className="rounded-full hover:bg-primary/20"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-5 w-5" />
                    ) : (
                      <PlayIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Engine evaluation */}
            <Card className="neo-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Engine Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center mb-4">
                  +0.7
                </div>
                
                {/* Simple evaluation bar graph */}
                <div className="h-24 flex items-center">
                  <div className="w-full h-20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-gray-600 z-10"></div>
                    </div>
                    <div className="absolute left-0 top-0 w-full h-full flex items-end justify-between">
                      {evaluationData.map((value, i) => {
                        // Calculate height based on value relative to maxEval
                        // Positive values go up, negative go down
                        const height = Math.abs(value) / maxEval * 50;
                        const isPositive = value >= 0;
                        
                        return (
                          <div 
                            key={i} 
                            className="w-1 bg-primary"
                            style={{ 
                              height: `${height}%`, 
                              alignSelf: isPositive ? 'flex-start' : 'flex-end'
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Best move suggestion */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Best move:</div>
                  <div className="flex items-center bg-black/30 p-2 rounded-md">
                    <span className="bg-primary/20 px-2 py-1 rounded mr-2 font-mono">Qh6+</span>
                    <span className="text-sm text-muted-foreground">Threatening checkmate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Commentary interface */}
            <Card className="neo-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <MicrophoneIcon className="w-5 h-5 mr-2" />
                  AI Commentary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-black/30 p-3 rounded-md">
                  {commentaryEnabled ? (
                    <p className="text-sm animate-pulse-glow">
                      "White's queen move puts black in a difficult position. The bishop on e7 is now 
                      pinned against the king, limiting black's defensive options..."
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Enable commentary to hear real-time analysis of your game.
                    </p>
                  )}
                </div>
                
                <Button 
                  onClick={toggleCommentary} 
                  variant={commentaryEnabled ? "default" : "outline"}
                  className="w-full"
                >
                  {commentaryEnabled ? "Disable Commentary" : "Enable Commentary"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default LiveGamePage;
