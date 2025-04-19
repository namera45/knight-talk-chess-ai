
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SpeakerWaveIcon, MicrophoneIcon, VideoCameraIcon, PauseIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import ChessboardContainer from '@/components/chess/ChessboardContainer';

const CoachSection = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const toggleSession = () => {
    setIsSessionActive(!isSessionActive);
    if (!isSessionActive) {
      // Simulate coach starting to speak after a short delay
      setTimeout(() => setIsSpeaking(true), 1500);
    } else {
      setIsSpeaking(false);
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">AI Chess Coach</h2>
            <Badge className="ml-2" variant="outline">BETA</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Interactive coaching sessions with voice commentary and personalized feedback
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main coaching area */}
        <div className="lg:col-span-2">
          <Card className="neo-blur overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Interactive Coaching Session</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Audio Commentary</span>
                  <Switch 
                    checked={audioEnabled}
                    onCheckedChange={setAudioEnabled}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="p-4 bg-black/20 border-y border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isSessionActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="font-medium">{isSessionActive ? 'Session Active' : 'Session Inactive'}</span>
                  </div>
                  
                  {isSpeaking && (
                    <div className="flex items-center">
                      <SpeakerWaveIcon className="h-5 w-5 mr-1 text-primary animate-pulse" />
                      <span className="text-sm">Coach is speaking...</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <ChessboardContainer showControls={true} />
              </div>
              
              <div className="p-6 border-t border-white/10">
                <h3 className="font-medium mb-3">Coach Commentary</h3>
                <div className="bg-black/30 rounded-md p-4 min-h-[100px] relative">
                  {isSpeaking ? (
                    <>
                      <p className="text-sm">
                        "In this position, notice how your knight is positioned on e5. This is a strong outpost, supported by your pawn structure. 
                        However, your opponent's bishop pair could become dangerous if the position opens up.
                        I would recommend developing your queenside pieces and considering castling kingside soon for safety."
                      </p>
                      <div className="mt-3 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">
                      {isSessionActive ? 
                        "Analyzing the position... Coach will begin speaking shortly." :
                        "Start a session to receive real-time coaching commentary."
                      }
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 py-4 bg-black/30 flex justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  disabled={!isSessionActive}
                  className={`${isSpeaking ? 'bg-primary/20' : ''}`}
                >
                  <MicrophoneIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  disabled={!isSessionActive}
                >
                  <VideoCameraIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={toggleSession}
                variant={isSessionActive ? "destructive" : "default"}
                className={isSessionActive ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {isSessionActive ? (
                  <>
                    <PauseIcon className="h-4 w-4 mr-2" />
                    End Session
                  </>
                ) : (
                  "Start Coaching Session"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Coaching sidebar */}
        <div className="space-y-4">
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle>Coaching Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Opening Repertoire</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Tactical Vision</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Endgame Technique</label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Positional Understanding</label>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-2 border-t border-white/10">
                <h3 className="text-sm font-medium mb-2">Commentary Detail Level</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="bg-primary/20">
                    Basic
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary">
                    Intermediate
                  </Button>
                  <Button variant="outline" size="sm">
                    Advanced
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="neo-blur">
            <CardHeader className="pb-2">
              <CardTitle>Session History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-black/20 p-3 rounded-md">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">Sicilian Defense Analysis</h4>
                  <Badge variant="outline" className="text-xs">35 min</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Apr 18, 2025</p>
              </div>
              
              <div className="bg-black/20 p-3 rounded-md">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">Endgame Principles</h4>
                  <Badge variant="outline" className="text-xs">42 min</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Apr 15, 2025</p>
              </div>
              
              <div className="bg-black/20 p-3 rounded-md">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">Tactical Pattern Recognition</h4>
                  <Badge variant="outline" className="text-xs">28 min</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Apr 10, 2025</p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" size="sm" className="w-full">
                View All Sessions
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="neo-blur bg-gradient-to-br from-primary/30 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <SpeakerWaveIcon className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-medium">Voice Preferences</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Customize your AI coach's voice and speaking style
              </p>
              <Button size="sm" className="w-full">
                Voice Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default CoachSection;
