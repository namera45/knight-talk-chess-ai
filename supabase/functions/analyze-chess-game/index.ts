
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

    // Initialize analysis results
    const gameId = crypto.randomUUID();
    const analysisData = {
      gameId,
      format,
      metadata: format === 'PGN' ? extractMetadata(pgn) : {},
      analysis: await analyzeGame(input, format)
    };

    // Generate AI commentary
    const commentary = await generateCommentary(input, format, analysisData.analysis);

    // Store results in Supabase
    const supabase = createClient(
      'https://ifyrkhzzfzdmbzbjwugg.supabase.co',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const [analysisResult, commentaryResult] = await Promise.all([
      supabase.from('games_analysis').insert(analysisData),
      supabase.from('games_commentary').insert({
        gameId,
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
        analysisStored: true,
        commentaryStored: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
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

async function analyzeGame(input: string, format: 'PGN' | 'FEN') {
  // Mock analysis for now - in a real app this would use a chess engine
  return [{
    moveNumber: 1,
    san: 'e4',
    evalBefore: 0.12,
    evalAfter: 0.35,
    classification: 'Best',
    recommendedMoves: null
  }];
}

async function generateCommentary(input: string, format: string, analysis: any[]) {
  const openai = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a chess expert providing analysis in two styles: as a coach and as a commentator.'
        },
        {
          role: 'user',
          content: `Analyze this chess game and provide commentary for key moments:\n${input}`
        }
      ]
    })
  });

  const response = await openai.json();
  const commentary = response.choices[0].message.content;

  // Mock commentary structure
  return [{
    moveNumber: 7,
    fenBefore: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
    coach: commentary,
    commentator: 'Wow—what a bold knight jump! That instantly flips the game!'
  }];
}

function extractMetadata(pgn: string) {
  // Mock metadata extraction - in a real app this would parse PGN headers
  return {
    white: 'Player 1',
    black: 'Player 2',
    date: new Date().toISOString(),
    result: '1-0'
  };
}
