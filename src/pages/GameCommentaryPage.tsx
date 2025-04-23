
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Commentary } from "lucide-react";
import { useState } from "react";

const GameCommentaryPage = () => {
  const [gameText, setGameText] = useState("");
  // const [commentary, setCommentary] = useState<string | null>(null); // TODO: Hook up for real

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-10">
        <Card className="neo-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-glow">
              <Commentary className="h-5 w-5" />
              AI Commentary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Paste a PGN or FEN to generate rich commentary from the AI commentator.
            </p>
            <form className="flex flex-col gap-4">
              <textarea
                className="resize-y min-h-[100px] rounded-md border px-3 py-2"
                placeholder="Paste PGN or FEN here..."
                value={gameText}
                onChange={(e) => setGameText(e.target.value)}
              />
              {/* In production, show commentary after submission */}
              <button
                type="submit"
                disabled={!gameText.trim()}
                className="mt-4 bg-primary text-white rounded-md px-4 py-2 disabled:opacity-50"
              >
                Generate Commentary
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GameCommentaryPage;
