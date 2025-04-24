
// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  rating: number;
  level: number;
  statistics: UserStatistics;
}

export interface UserStatistics {
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  averageAccuracy: number;
}

// Game related types
export interface ChessGame {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  result: GameResult;
  moves: string[]; // PGN moves
  date: string;
  accuracy?: {
    white: number;
    black: number;
  };
}

export type GameResult = "1-0" | "0-1" | "1/2-1/2" | "*"; // White wins, Black wins, Draw, Ongoing

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Chessboard types
export interface ChessboardProps {
  position?: string; // FEN string
  orientation?: "white" | "black";
  onPieceDrop?: (source: string, target: string) => boolean;
  showNotation?: boolean;
  customDarkSquareStyle?: React.CSSProperties;
  customLightSquareStyle?: React.CSSProperties;
  customDropSquareStyle?: React.CSSProperties;
  customPremoveDarkSquareStyle?: React.CSSProperties;
  customPremoveLightSquareStyle?: React.CSSProperties;
  customActiveSquareStyle?: React.CSSProperties;
}

// Commentary types
export interface CommentarySettings {
  voice: string;
  speed: number;
  language: string;
  enabled: boolean;
}

// Analysis and commentary types
export interface AnalysisResult {
  status: string;
  gameId: string;
  metadata: GameMetadata;
  analysis: MoveAnalysis[];
  commentary: GameCommentary;
  analysisStored: boolean;
  commentaryStored: boolean;
}

export interface GameMetadata {
  white: string;
  black: string;
  date: string;
  result: GameResult;
  event?: string;
  site?: string;
  round?: string;
  eco?: string;
  whiteElo?: string;
  blackElo?: string;
  timeControl?: string;
}

export interface MoveAnalysis {
  moveNumber: number;
  move: string;
  color: 'w' | 'b';
  fen: string;
  evalBefore: number;
  evalAfter: number;
  classification: 'accurate' | 'good' | 'inaccuracy' | 'mistake' | 'blunder' | 'gameEnd';
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
}

export interface GameCommentary {
  moveNumber: number;
  fenBefore: string;
  coach: string;
  commentator: string;
}
