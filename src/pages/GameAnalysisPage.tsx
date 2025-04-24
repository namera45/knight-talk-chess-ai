
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Chess } from "chess.js";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ChessboardContainer from "@/components/chess/ChessboardContainer";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AnalysisResult } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const GameAnalysisPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<"file" | "text">("file");
  const [gameText, setGameText] = useState("");
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [isValidGame, setIsValidGame] = useState<boolean | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [startPosition, setStartPosition] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [showPreview, setShowPreview] = useState(false);
  const [gameType, setGameType] = useState<"pgn" | "fen">("pgn");
  const [error, setError] = useState<string | null>(null);

  // File input handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      try {
        setValidating(true);
        const text = await readFileAsText(selectedFile);
        validateGame(text);
        setGameText(text);
        setValidating(false);
      } catch (error) {
        console.error("Error reading file:", error);
        setValidating(false);
        setIsValidGame(false);
        setError("Could not read file. Please try again with a valid PGN or FEN file.");
      }
    }
  };

  // Text input handler
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setGameText(text);
    
    if (text.trim()) {
      validateGame(text);
    } else {
      setIsValidGame(null);
    }
  };

  // Read file as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  // Validate game
  const validateGame = (text: string) => {
    const chess = new Chess();
    
    // Try as PGN first
    try {
      chess.loadPgn(text);
      setGameType("pgn");
      setIsValidGame(true);
      setError(null);
      setStartPosition(chess.fen()); // Set the starting position
      return;
    } catch (e) {
      // Not a valid PGN, try as FEN
      try {
        chess.load(text);
        setGameType("fen");
        setIsValidGame(true);
        setError(null);
        setStartPosition(chess.fen());
        return;
      } catch (e) {
        // Neither a valid PGN nor FEN
        setIsValidGame(false);
        setError("Invalid PGN or FEN format. Please check your input.");
      }
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidGame) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const payload = gameType === "pgn" 
        ? { pgn: gameText } 
        : { fen: gameText };
      
      const response = await supabase.functions.invoke("analyze-chess-game", {
        body: payload,
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to analyze game");
      }
      
      setAnalysisResult(response.data as AnalysisResult);
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed chess game`,
      });
      
      // After successful analysis, navigate to the commentary page with the game ID
      if (response.data?.gameId) {
        navigate(`/game-commentary?gameId=${response.data.gameId}`);
      }
    } catch (error: any) {
      console.error("Analysis error:", error);
      setError(error.message || "An error occurred during analysis");
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze chess game",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-10">
        <Card className="neo-blur shadow-lg border-primary/20">
          <CardHeader className="bg-muted/50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-glow">
              <FileText className="h-5 w-5 text-primary" />
              Game Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-6 text-muted-foreground">
              Upload your chess game in PGN or FEN format to receive a full analysis powered by our chess AI.
            </p>
            
            <Tabs defaultValue="file" onValueChange={(v) => setInputMethod(v as "file" | "text")}>
              <TabsList className="w-full mb-6">
                <TabsTrigger value="file" className="flex-1">Upload File</TabsTrigger>
                <TabsTrigger value="text" className="flex-1">Paste Text</TabsTrigger>
              </TabsList>
              
              <TabsContent value="file">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/60 transition-colors">
                    <input
                      type="file"
                      accept=".pgn,.fen,.txt"
                      id="game-file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="game-file" 
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <Upload className="w-10 h-10 text-primary/70" />
                      <span className="font-medium">Click to upload game file</span>
                      <span className="text-sm text-muted-foreground">PGN, FEN or TXT up to 10MB</span>
                    </label>
                  </div>
                  
                  {file && (
                    <div className="flex items-center space-x-2 text-sm p-3 bg-muted/20 rounded-md mt-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="font-medium">{file.name}</span>
                      {validating && <Skeleton className="h-4 w-16" />}
                      {isValidGame === true && <span className="text-green-500">Valid {gameType.toUpperCase()}</span>}
                      {isValidGame === false && <span className="text-red-500">Invalid format</span>}
                    </div>
                  )}
                  
                  {error && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {isValidGame && !loading && (
                    <Button 
                      type="button" 
                      variant="outline"
                      className="mt-2"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? "Hide Preview" : "Show Preview"}
                      {showPreview ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                  )}
                  
                  {showPreview && isValidGame && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-4">Game Preview</h3>
                      <ChessboardContainer startingFen={startPosition} showControls={true} />
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={!isValidGame || loading}
                    className="mt-6 w-full py-6 text-lg font-medium"
                  >
                    {loading ? "Analyzing..." : "Analyze Game"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="text">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <Textarea
                    placeholder="Paste PGN or FEN here... (e.g. 1.e4 e5 2.Nf3 Nc6...)"
                    value={gameText}
                    onChange={handleTextChange}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  
                  {gameText && (
                    <div className="flex items-center space-x-2 text-sm p-3 bg-muted/20 rounded-md">
                      <FileText className="w-4 h-4 text-primary" />
                      {isValidGame === true && <span className="text-green-500">Valid {gameType.toUpperCase()}</span>}
                      {isValidGame === false && <span className="text-red-500">Invalid format</span>}
                    </div>
                  )}
                  
                  {error && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {isValidGame && !loading && (
                    <Button 
                      type="button" 
                      variant="outline"
                      className="mt-2"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? "Hide Preview" : "Show Preview"}
                      {showPreview ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                  )}
                  
                  {showPreview && isValidGame && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-4">Game Preview</h3>
                      <ChessboardContainer startingFen={startPosition} showControls={true} />
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={!isValidGame || loading}
                    className="mt-6 w-full py-6 text-lg font-medium"
                  >
                    {loading ? "Analyzing..." : "Analyze Game"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GameAnalysisPage;
