
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const GameAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // File input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Form submission handler (mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    
    // Mock analysis
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${file.name}`,
      });
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-10">
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
                  <Upload className="w-4 h-4 text-primary" />
                  <span className="font-medium">{file.name}</span>
                </div>
              )}
              
              <Button
                type="submit"
                disabled={!file || loading}
                className="mt-6 w-full py-6 text-lg font-medium"
              >
                {loading ? "Analyzing..." : "Analyze Game"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GameAnalysisPage;
