
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const GameCommentaryPage = () => {
  const [gameText, setGameText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [commentary, setCommentary] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gameText.trim()) return;
    
    setGenerating(true);
    setCommentary(null);
    
    // Mock generation delay
    setTimeout(() => {
      const mockCommentary = "This chess game showcases an excellent example of the Sicilian Defense. White's early kingside development created pressure, while Black responded with a solid pawn structure. The turning point came at move 15 when Black sacrificed a knight to gain positional advantage. Overall, a well-played strategic battle with creative tactical opportunities.";
      
      setCommentary(mockCommentary);
      setGenerating(false);
      
      toast({
        title: "Commentary Generated",
        description: "AI commentary has been created for your game.",
      });
    }, 2000);
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
            <p className="mb-6 text-muted-foreground">
              Paste a PGN or FEN to generate rich commentary from our AI chess commentator. Get insights and analysis in a professional commentator style.
            </p>
            
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="relative">
                <textarea
                  className="resize-y min-h-[150px] w-full rounded-md border border-primary/30 bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Paste PGN or FEN here... (e.g. 1.e4 e5 2.Nf3 Nc6...)"
                  value={gameText}
                  onChange={(e) => setGameText(e.target.value)}
                />
                <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {gameText.length} characters
                </span>
              </div>

              {commentary && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-medium border-b pb-2">AI Commentary:</h3>
                  <div className="p-4 bg-muted/30 rounded-md leading-relaxed">
                    {commentary}
                  </div>
                </div>
              )}
              
              <Button
                type="submit"
                disabled={!gameText.trim() || generating}
                className="mt-6 w-full py-6 text-lg font-medium"
              >
                {generating ? "Generating Commentary..." : "Generate Commentary"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GameCommentaryPage;
