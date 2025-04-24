
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { Chess } from 'https://esm.sh/chess.js@1.0.0-beta.6';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pgn, fen } = await req.json();
    const input = pgn || fen;
    const format = pgn ? 'PGN' : 'FEN';

    if (!input) {
      throw new Error('No PGN or FEN provided');
    }

    // Parse game with chess.js
    const chess = new Chess();
    try {
      format === 'PGN' ? chess.loadPgn(pgn) : chess.load(fen);
    } catch (error) {
      throw new Error(`Invalid ${format} format: ${error.message}`);
    }

    // Initialize analysis results
    const gameId = crypto.randomUUID();
    
    // Extract metadata
    const metadata = extractMetadata(chess);

    // Analyze moves and generate position timeline
    const analysis = await analyzeGame(chess);

    // Store results in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Generate AI commentary based on the analysis
    const commentary = await generateCommentary(chess, analysis, metadata);

    const [analysisResult, commentaryResult] = await Promise.all([
      supabase.from('games_analysis').insert({
        gameid: gameId,
        format,
        metadata,
        analysis
      }),
      supabase.from('games_commentary').insert({
        gameid: gameId,
        commentary
      })
    ]);

    if (analysisResult.error || commentaryResult.error) {
      return new Response(
        JSON.stringify({
          status: 'partial_error',
          gameId,
          analysisStored: !analysisResult.error,
          commentaryStored: !commentaryResult.error,
          message: analysisResult.error?.message || commentaryResult.error?.message
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'ok',
        gameId,
        metadata,
        analysis: analysis.slice(0, 5), // Send just a preview of analysis
        commentary: commentary[0], // Send just the first commentary entry
        analysisStored: true,
        commentaryStored: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-chess-game:', error);
    return new Response(
      JSON.stringify({ 
        status: 'error', 
        message: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function extractMetadata(chess: Chess) {
  const headers = chess.header();
  
  return {
    white: headers.White || 'Unknown Player',
    black: headers.Black || 'Unknown Player',
    date: headers.Date || new Date().toISOString().split('T')[0],
    result: headers.Result || '*',
    event: headers.Event || 'Unknown Event',
    site: headers.Site || 'Unknown Site',
    round: headers.Round || '-',
    eco: headers.ECO || '-', // Chess opening code
    timeControl: headers.TimeControl || '-',
    whiteElo: headers.WhiteElo || '-',
    blackElo: headers.BlackElo || '-'
  };
}

async function analyzeGame(chess: Chess) {
  // We'll simulate Stockfish analysis here
  // In a production environment, you'd integrate with Stockfish WASM or an external API
  const moves = chess.history({ verbose: true });
  const timeline = [];
  
  let currentChess = new Chess();
  
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    currentChess.move(move);
    
    // Generate FEN for this position
    const fen = currentChess.fen();
    
    // Simulate evaluation (would be done by Stockfish in production)
    const evalScore = simulateEvaluation(currentChess, i);
    
    // Classify the move
    const classification = classifyMove(evalScore);
    
    // Add to timeline
    timeline.push({
      moveNumber: Math.floor(i / 2) + 1,
      move: move.san,
      color: i % 2 === 0 ? 'w' : 'b',
      fen: fen,
      evalBefore: i > 0 ? timeline[i-1].evalAfter : 0,
      evalAfter: evalScore,
      classification,
      isCheck: currentChess.isCheck(),
      isCheckmate: currentChess.isCheckmate(),
      isStalemate: currentChess.isStalemate(),
      isDraw: currentChess.isDraw(),
      isGameOver: currentChess.isGameOver()
    });
  }
  
  return timeline;
}

function simulateEvaluation(chess: Chess, moveIndex: number) {
  // This is a placeholder for actual Stockfish evaluation
  // In production, you would use a real chess engine
  
  // Simple randomized evaluation that leans toward even positions
  // but can occasionally show advantage for one side
  const baseEval = (Math.random() - 0.5) * 0.3;
  
  // Add some bias based on material count to make it more realistic
  const board = chess.board();
  let materialBalance = 0;
  
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (!piece) continue;
      
      let value = 0;
      switch (piece.type) {
        case 'p': value = 1; break;
        case 'n': case 'b': value = 3; break;
        case 'r': value = 5; break;
        case 'q': value = 9; break;
      }
      
      materialBalance += piece.color === 'w' ? value : -value;
    }
  }
  
  // Combine base evaluation with material balance and some randomness
  return Number((baseEval + materialBalance * 0.1 + (Math.random() - 0.5) * 0.2).toFixed(2));
}

function classifyMove(evalDiff: number) {
  const absDiff = Math.abs(evalDiff);
  
  if (absDiff < 0.1) return 'accurate';
  if (absDiff < 0.3) return 'good';
  if (absDiff < 0.8) return 'inaccuracy';
  if (absDiff < 1.5) return 'mistake';
  return 'blunder';
}

async function generateCommentary(chess: Chess, analysis: any[], metadata: any) {
  // Get key positions based on evaluation changes
  const keyPositions = findKeyPositions(analysis);
  
  // Format timeline data for LLM
  const timelineData = formatTimelineForPrompt(analysis, keyPositions);
  
  // Call AI API - We'll use a simulated version for now
  // In production, you would replace this with a call to Gemini Flash
  const commentaries = await simulateGeminiFlash(timelineData, metadata);
  
  // Structure the commentary output
  return commentaries.map((commentary, index) => {
    const position = keyPositions[index];
    return {
      moveNumber: position?.moveNumber || 0,
      fenBefore: position?.fen || chess.fen(),
      coach: commentary.coach,
      commentator: commentary.commentator
    };
  });
}

function findKeyPositions(analysis: any[]) {
  const keyPositions = [];
  
  // Find significant evaluation changes
  for (let i = 1; i < analysis.length; i++) {
    const current = analysis[i];
    const prev = analysis[i-1];
    const evalDiff = current.evalAfter - prev.evalAfter;
    
    // Add positions where big eval changes happen
    if (Math.abs(evalDiff) >= 0.8) {
      keyPositions.push({
        index: i,
        moveNumber: current.moveNumber,
        fen: current.fen,
        evalDiff,
        move: current.move,
        classification: current.classification
      });
    }
    
    // Add checkmate or stalemate positions
    if (current.isCheckmate || current.isStalemate) {
      keyPositions.push({
        index: i,
        moveNumber: current.moveNumber,
        fen: current.fen,
        evalDiff,
        move: current.move,
        classification: 'gameEnd'
      });
    }
  }
  
  // Limit to top 5 most significant moments
  return keyPositions
    .sort((a, b) => Math.abs(b.evalDiff) - Math.abs(a.evalDiff))
    .slice(0, 5);
}

function formatTimelineForPrompt(analysis: any[], keyPositions: any[]) {
  return keyPositions.map(pos => {
    const move = analysis[pos.index];
    const prevMoves = analysis.slice(Math.max(0, pos.index - 3), pos.index);
    
    return {
      context: prevMoves.map(m => `${m.moveNumber}${m.color === 'w' ? '.' : '...'} ${m.move}`).join(' '),
      move: `${move.moveNumber}${move.color === 'w' ? '.' : '...'} ${move.move}`,
      evalBefore: analysis[pos.index - 1]?.evalAfter || 0,
      evalAfter: move.evalAfter,
      classification: move.classification,
      isCheck: move.isCheck,
      isCheckmate: move.isCheckmate,
      isStalemate: move.isStalemate
    };
  });
}

async function simulateGeminiFlash(timelineData: any[], metadata: any) {
  // This is a placeholder for the actual Gemini Flash API call
  // In production, you would replace this with a real API call
  
  // Create simulated commentaries
  return timelineData.map(position => {
    const isPositive = position.evalAfter > 0;
    const advantage = isPositive ? 'White' : 'Black';
    const playerWithAdvantage = isPositive ? metadata.white : metadata.black;
    
    const moveDesc = position.move;
    const evalChange = Math.abs(position.evalAfter - position.evalBefore).toFixed(1);
    const evalDirection = position.evalAfter > position.evalBefore ? 'gaining' : 'losing';
    
    // Coach commentary (educational)
    const coachCommentary = generateCoachCommentary(position, metadata, advantage, playerWithAdvantage, evalChange, evalDirection);
    
    // Commentator commentary (exciting)
    const commentatorCommentary = generateCommentatorCommentary(position, metadata, advantage, playerWithAdvantage, evalChange, evalDirection);
    
    return {
      coach: coachCommentary,
      commentator: commentatorCommentary
    };
  });
}

function generateCoachCommentary(position: any, metadata: any, advantage: string, playerWithAdvantage: string, evalChange: string, evalDirection: string) {
  const templates = [
    `This move shifts the evaluation by ${evalChange} pawns, ${evalDirection} advantage. The key principle at play here is control of the center.`,
    `Notice how this position creates weaknesses in the pawn structure. This ${position.classification} move changes the evaluation by ${evalChange}.`,
    `An instructive moment showing the importance of piece coordination. The evaluation shifts by ${evalChange} pawns in favor of ${advantage}.`,
    `This is a critical position that demonstrates tactical awareness. The move results in a ${evalChange} pawn shift, ${evalDirection} advantage.`,
    `Students of the game should pay close attention to this move. It affects the evaluation by ${evalChange} pawns and highlights the principle of piece activity.`
  ];
  
  // Handle special cases
  if (position.isCheckmate) {
    return `Checkmate! The game concludes with ${advantage} winning. Note how the final attack left no legal moves for the opponent's king.`;
  }
  
  if (position.isStalemate) {
    return `This position results in stalemate - an important drawing mechanism in chess where one side has no legal moves but isn't in check.`;
  }
  
  if (position.classification === 'blunder') {
    return `This is a serious mistake that changes the evaluation by ${evalChange} pawns. The better approach would be to maintain piece coordination and not weaken the king's position.`;
  }
  
  // Return a random template for variety
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateCommentatorCommentary(position: any, metadata: any, advantage: string, playerWithAdvantage: string, evalChange: string, evalDirection: string) {
  const templates = [
    `Wow! What a move! The engines are going crazy as ${playerWithAdvantage} gains a ${evalChange} pawn advantage with this brilliant find!`,
    `Unbelievable! The evaluation bar just jumped ${evalChange} pawns in favor of ${advantage}! This could be the turning point!`,
    `The tension is palpable as ${playerWithAdvantage} makes a move that shifts the evaluation by ${evalChange}. The crowd is on their feet!`,
    `A gasp from the audience! This ${position.classification} dramatically changes the position, with a ${evalChange} pawn swing!`,
    `The commentators are beside themselves! A ${evalChange} shift in evaluation after this move! That's going to leave a mark!`
  ];
  
  // Handle special cases
  if (position.isCheckmate) {
    return `CHECKMATE! IT'S ALL OVER! ${advantage} delivers the final blow in spectacular fashion! What an incredible finish to this game!`;
  }
  
  if (position.isStalemate) {
    return `STALEMATE! Unbelievable! Just when it looked like a win was inevitable, the game ends in a draw! The crowd is stunned!`;
  }
  
  if (position.classification === 'blunder') {
    return `OH NO! A DEVASTATING BLUNDER! The evaluation has swung by ${evalChange} pawns! This could cost the game right here!`;
  }
  
  // Return a random template for variety
  return templates[Math.floor(Math.random() * templates.length)];
}
