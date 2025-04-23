
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Analysis } from "lucide-react";
import { useState } from "react";

const GameAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);

  // File input handler not yet implemented
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-10">
        <Card className="neo-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-glow">
              <Analysis className="h-5 w-5" />
              Game Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Upload your chess game in PGN or FEN format to receive a full analysis powered by our chess AI.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="file"
                accept=".pgn,.fen,.txt"
                className="file-input"
                onChange={handleFileChange}
              />
              {file && (
                <div className="flex items-center space-x-2 text-sm">
                  <Upload className="w-4 h-4" />
                  <span>{file.name}</span>
                </div>
              )}
              {/* In production, show analysis results here after upload */}
              <button
                type="submit"
                disabled={!file}
                className="mt-4 bg-primary text-white rounded-md px-4 py-2 disabled:opacity-50"
              >
                Analyze Game
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GameAnalysisPage;
