import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, AlertCircle, Play, VolumeX, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ChessboardContainer from "@/components/chess/ChessboardContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GameCommentary } from "@/types";

const GameCommentaryPage = () => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");

  const [gameText, setGameText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentary, setCommentary] = useState<GameCommentary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [activeTab, setActiveTab] = useState<"coach" | "commentator">("commentator");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Load commentary if gameId is provided
  useEffect(() => {
    if (gameId) {
      fetchGameCommentary(gameId);
    }
  }, [gameId]);

  // Fetch game commentary from Supabase
  const fetchGameCommentary = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("games_commentary")
        .select("commentary")
        .eq("gameid", id)
        .maybeSingle();
        
      if (error) throw error;
      
      if (data?.commentary) {
        // Add proper type casting here
        const parsedCommentary = data.commentary as unknown as GameCommentary[];
        setCommentary(parsedCommentary);
        
        // Also fetch the game analysis to get the PGN/FEN
        const { data: analysisData, error: analysisError } = await supabase
          .from("games_analysis")
          .select("format, metadata")
          .eq("gameid", id)
          .maybeSingle();
        
      if (analysisError) throw analysisError;
      
      if (analysisData?.metadata) {
        const metadata = analysisData.metadata as { white: string; black: string; date: string };
        setGameText(`Game between ${metadata.white} and ${metadata.black} (${metadata.date})`);
      }
    } else {
      setError("No commentary found for this game.");
    }
  } catch (err: any) {
    console.error("Error fetching commentary:", err);
    setError(err.message || "Failed to load commentary");
    toast({
      title: "Error",
      description: "Failed to load game commentary",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  // Generate new commentary from text input
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gameText.trim()) return;
    
    setGenerating(true);
    setCommentary(null);
    
    // Call the edge function to analyze the game
    supabase.functions
      .invoke("analyze-chess-game", {
        body: { pgn: gameText },
      })
      .then((response) => {
        if (response.error) {
          throw new Error(response.error.message || "Failed to generate commentary");
        }
        
        // Set the first commentary item
        if (response.data?.commentary) {
          // Fetch the full commentary
          fetchGameCommentary(response.data.gameId);
        } else {
          throw new Error("No commentary was generated");
        }
        
        toast({
          title: "Commentary Generated",
          description: "AI commentary has been created for your game.",
        });
      })
      .catch((error) => {
        console.error("Error generating commentary:", error);
        setError(error.message || "Failed to generate commentary");
        toast({
          title: "Generation Failed",
          description: error.message || "Failed to generate commentary",
          variant: "destructive",
        });
      })
      .finally(() => {
        setGenerating(false);
      });
  };

  // Toggle audio narration
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    if (!audioEnabled && commentary) {
      // Start speech when turning on audio
      speakCommentary(commentary[currentPosition][activeTab]);
    } else {
      // Stop speech when turning off audio
      window.speechSynthesis.cancel();
    }
  };

  // Speak commentary using browser's Speech Synthesis
  const speakCommentary = (text: string) => {
    if (!audioEnabled) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on the commentary type
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      // Use a deeper voice for commentator, more neutral for coach
      if (activeTab === "commentator") {
        const maleVoices = voices.filter(v => v.name.includes("Male") || v.name.includes("David"));
        if (maleVoices.length) utterance.voice = maleVoices[0];
      } else {
        const femaleVoices = voices.filter(v => v.name.includes("Female") || v.name.includes("Samantha"));
        if (femaleVoices.length) utterance.voice = femaleVoices[0];
      }
    }
    
    // Set properties
    utterance.rate = activeTab === "commentator" ? 1.1 : 0.9;
    utterance.pitch = activeTab === "commentator" ? 1.2 : 1.0;
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  // Navigate to the next position
  const nextPosition = () => {
    if (!commentary) return;
    
    if (currentPosition < commentary.length - 1) {
      setCurrentPosition(currentPosition + 1);
      
      // Speak the new commentary if audio is enabled
      if (audioEnabled) {
        speakCommentary(commentary[currentPosition + 1][activeTab]);
      }
    }
  };

  // Navigate to the previous position
  const prevPosition = () => {
    if (!commentary) return;
    
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
      
      // Speak the new commentary if audio is enabled
      if (audioEnabled) {
        speakCommentary(commentary[currentPosition - 1][activeTab]);
      }
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "coach" | "commentator");
    
    // If audio is enabled, speak the new commentary
    if (audioEnabled && commentary) {
      speakCommentary(commentary[currentPosition][value as "coach" | "commentator"]);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-10">
        <Card className="neo-blur shadow-lg border-primary/20">
          <CardHeader className="bg-muted/50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-glow">
              <MessageSquare className="h-5 w-5 text-primary" />
              AI Commentary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!gameId && !commentary ? (
              <>
                <p className="mb-6 text-muted-foreground">
                  Paste a PGN or FEN to generate rich commentary from our AI chess commentator. Get insights and analysis in a professional commentator style.
                </p>
                
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <Textarea
                      className="resize-y min-h-[150px] w-full font-mono"
                      placeholder="Paste PGN or FEN here... (e.g. 1.e4 e5 2.Nf3 Nc6...)"
                      value={gameText}
                      onChange={(e) => setGameText(e.target.value)}
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                      {gameText.length} characters
                    </span>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={!gameText.trim() || generating}
                    className="mt-6 w-full py-6 text-lg font-medium"
                  >
                    {generating ? "Generating Commentary..." : "Generate Commentary"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-[400px] w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-3/4" />
                    </div>
                  </div>
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : commentary ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">{gameText}</h3>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={toggleAudio}
                          className={audioEnabled ? "bg-primary/20" : ""}
                        >
                          {audioEnabled ? (
                            <>
                              <Volume2 className="mr-2 h-4 w-4" />
                              Audio On
                            </>
                          ) : (
                            <>
                              <VolumeX className="mr-2 h-4 w-4" />
                              Audio Off
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        {/* Chess board for position */}
                        <ChessboardContainer 
                          startingFen={commentary[currentPosition].fenBefore} 
                          showControls={false} 
                        />
                        
                        <div className="flex justify-between mt-4">
                          <Button
                            onClick={prevPosition}
                            disabled={currentPosition === 0}
                            variant="outline"
                          >
                            Previous Position
                          </Button>
                          
                          <Button
                            onClick={nextPosition}
                            disabled={currentPosition === commentary.length - 1}
                            variant="outline"
                          >
                            Next Position
                          </Button>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <Badge variant="outline" className="text-sm">
                            Position {currentPosition + 1} of {commentary.length}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Tabs 
                          defaultValue="commentator" 
                          value={activeTab}
                          onValueChange={handleTabChange}
                        >
                          <TabsList className="w-full">
                            <TabsTrigger value="commentator" className="flex-1">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                Commentator
                              </span>
                            </TabsTrigger>
                            <TabsTrigger value="coach" className="flex-1">
                              <span className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                Coach
                              </span>
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="commentator">
                            <motion.div
                              key={`commentator-${currentPosition}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="bg-black/30 p-4 rounded-lg leading-relaxed"
                            >
                              {commentary[currentPosition].commentator}
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-4 w-full"
                                onClick={() => speakCommentary(commentary[currentPosition].commentator)}
                                disabled={!audioEnabled}
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Play Audio
                              </Button>
                            </motion.div>
                          </TabsContent>
                          
                          <TabsContent value="coach">
                            <motion.div
                              key={`coach-${currentPosition}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="bg-black/30 p-4 rounded-lg leading-relaxed"
                            >
                              {commentary[currentPosition].coach}
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-4 w-full"
                                onClick={() => speakCommentary(commentary[currentPosition].coach)}
                                disabled={!audioEnabled}
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Play Audio
                              </Button>
                            </motion.div>
                          </TabsContent>
                        </Tabs>
                        
                        <div className="mt-8">
                          <h4 className="text-lg font-medium mb-2">Auto-Play Commentary</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Listen to the commentary while watching the game positions change automatically.
                          </p>
                          <Button 
                            variant="default" 
                            className="w-full"
                            onClick={() => {
                              setIsPlaying(!isPlaying);
                              setAudioEnabled(true);
                              if (!isPlaying) {
                                speakCommentary(commentary[currentPosition][activeTab]);
                                // TODO: Implement auto-advance logic based on speech end events
                              } else {
                                window.speechSynthesis.cancel();
                              }
                            }}
                          >
                            {isPlaying ? "Pause Auto-Play" : "Start Auto-Play"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GameCommentaryPage;
