
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
