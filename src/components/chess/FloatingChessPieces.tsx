import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Chess pieces in SVG format
const pieces = [
  // Knight (simplified)
  <path d="M22,10C32.5,11 38.5,18 38,39L44,39C45,33.5 40,26 46,22C52,18 53,16 54,13C55,10 55,8 54,6C53,3 50,2 52,0C48.5,1 46,4 46,7C46,9 49,12 40,18C38,19 37,20 36,20C33,20 32,16 33,13C34,10 36,7 39,5C31,8 26,19 26,19L24,19C24,19 18,8 10,5C13,7 15,10 16,13C17,16 16,20 13,20C12,20 11,19 9,18C0,12 3,9 3,7C3,4 0.5,1 -3,0C-1,2 0,3 -1,6C-2,8 -2,10 -1,13C0,16 1,18 7,22C13,26 8,33.5 9,39L15,39C14.5,18 20.5,11 31,10L31,15C31,17 27,21 27,26C27,31 29,34 30,36C33,40 30,44 28,45C33,46 40,46 44,46L44,44C44,44 43,42 42,41C40,39 38,37 38,34C38,31 40,29 42,26C43,24 44,21 44,18L44,10L22,10z" fill="rgba(30, 174, 219, 0.7)" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1" />,
  
  // Pawn (simplified) 
  <path d="M22 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-2.78-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="rgba(155, 135, 245, 0.5)" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1" />,
  
  // Rook (simplified)
  <path d="M9,39L36,39L36,36L9,36L9,39L9,39zM12,36L12,32L15,32L15,36L12,36L12,36zM18,36L18,32L21,32L21,36L18,36L18,36zM24,36L24,32L27,32L27,36L24,36L24,36zM30,36L30,32L33,32L33,36L30,36L30,36zM12,16L12,9L15,9L15,16L12,16L12,16zM18,16L18,9L21,9L21,16L18,16L18,16zM24,16L24,9L27,9L27,16L24,16L24,16zM30,16L30,9L33,9L33,16L30,16L30,16zM9,16L9,19L36,19L36,16L9,16L9,16zM9,23L9,26L36,26L36,23L9,23L9,23zM9,29L9,32L36,32L36,29L9,29L9,29z" fill="rgba(51, 195, 240, 0.5)" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1" />,
  
  // Bishop (simplified)
  <path d="M9,36L12,35L14,35L15,36L15,37L14,38L12,38L9,37L9,36zM26,36L29,35L31,35L32,36L32,37L31,38L29,38L26,37L26,36zM22,9C19.5,9 18,11 18,14C18,17 19.5,21 22,21C24.5,21 26,17 26,14C26,11 24.5,9 22,9zM19,15L19,31L25,31L25,15L19,15zM16,37L20,35L24,35L28,37L28,38L16,38L16,37z" fill="rgba(126, 105, 171, 0.5)" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1" />,
]

const FloatingChessPieces = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random positions for the pieces
  const generatePieces = (count: number, containerWidth: number, containerHeight: number) => {
    return Array.from({ length: count }).map((_, i) => {
      // Get random piece index
      const pieceIndex = Math.floor(Math.random() * pieces.length);
      
      // Generate random positions, ensuring they're not too close to the edges
      const x = Math.random() * (containerWidth * 0.8) + containerWidth * 0.1;
      const y = Math.random() * (containerHeight * 0.8) + containerHeight * 0.1;
      
      // Random rotation
      const rotate = Math.random() * 360;
      
      // Random sizes (keeping them reasonably sized)
      const scale = 0.5 + Math.random() * 1;
      
      // Random animation duration
      const duration = 15 + Math.random() * 25;
      
      // Random delay for each piece
      const delay = Math.random() * 10;
      
      return {
        id: i,
        pieceIndex,
        x,
        y,
        rotate,
        scale,
        duration,
        delay
      };
    });
  };

  const [pieces1, setPieces1] = useState<any[]>([]);
  const [pieces2, setPieces2] = useState<any[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Create two sets of pieces for a layered effect
    setPieces1(generatePieces(6, width, height));
    setPieces2(generatePieces(5, width, height));
    
    // Re-generate on resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setPieces1(generatePieces(6, width, height));
      setPieces2(generatePieces(5, width, height));
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background layer pieces (slower) */}
      {pieces1.map((piece) => (
        <motion.div
          key={`bg-${piece.id}`}
          className="absolute opacity-20"
          initial={{ 
            x: piece.x, 
            y: piece.y, 
            rotate: piece.rotate, 
            scale: piece.scale 
          }}
          animate={{ 
            x: [piece.x, piece.x + 50, piece.x - 30, piece.x],
            y: [piece.y, piece.y - 50, piece.y + 70, piece.y],
            rotate: [piece.rotate, piece.rotate + 180, piece.rotate],
          }}
          transition={{ 
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="50" height="50" viewBox="-7 -7 45 45">
            {pieces[piece.pieceIndex]}
          </svg>
        </motion.div>
      ))}
      
      {/* Foreground layer pieces (faster) */}
      {pieces2.map((piece) => (
        <motion.div
          key={`fg-${piece.id}`}
          className="absolute opacity-30"
          initial={{ 
            x: piece.x, 
            y: piece.y, 
            rotate: piece.rotate, 
            scale: piece.scale * 1.2
          }}
          animate={{ 
            x: [piece.x, piece.x - 80, piece.x + 40, piece.x],
            y: [piece.y, piece.y + 80, piece.y - 40, piece.y],
            rotate: [piece.rotate, piece.rotate - 180, piece.rotate],
          }}
          transition={{ 
            duration: piece.duration * 0.7,
            delay: piece.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="50" height="50" viewBox="-7 -7 45 45">
            {pieces[piece.pieceIndex]}
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingChessPieces;
