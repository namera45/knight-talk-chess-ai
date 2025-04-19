
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface DataPoint {
  date: string;
  rating: number;
}

interface UserRatingChartProps {
  data: DataPoint[];
  currentRating: number;
}

const UserRatingChart = ({ data, currentRating }: UserRatingChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions based on parent container
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 180;
      }

      // Calculate min and max values for scaling
      const ratings = data.map(d => d.rating);
      const minRating = Math.min(...ratings) - 50;
      const maxRating = Math.max(...ratings) + 50;
      const range = maxRating - minRating;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      
      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = canvas.height * (1 - i / 4);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw rating line
      if (data.length > 1) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(30, 174, 219, 0.8)';

        // Calculate coordinates for first point
        const xStep = canvas.width / (data.length - 1);
        const firstPoint = data[0];
        const firstY = canvas.height - ((firstPoint.rating - minRating) / range) * canvas.height;
        
        ctx.moveTo(0, firstY);

        // Draw line connecting all points
        data.forEach((point, index) => {
          if (index === 0) return;
          
          const x = index * xStep;
          const y = canvas.height - ((point.rating - minRating) / range) * canvas.height;
          
          ctx.lineTo(x, y);
        });
        
        ctx.stroke();

        // Draw gradient fill below the line
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(30, 174, 219, 0.4)');
        gradient.addColorStop(1, 'rgba(30, 174, 219, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, firstY);
        
        data.forEach((point, index) => {
          if (index === 0) return;
          
          const x = index * xStep;
          const y = canvas.height - ((point.rating - minRating) / range) * canvas.height;
          
          ctx.lineTo(x, y);
        });
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Draw dots at each data point
        data.forEach((point, index) => {
          const x = index * xStep;
          const y = canvas.height - ((point.rating - minRating) / range) * canvas.height;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(30, 174, 219, 1)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // Draw date labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      
      if (data.length > 1) {
        const xStep = canvas.width / (data.length - 1);
        const labelsToShow = data.length > 5 ? [0, Math.floor(data.length / 2), data.length - 1] : [...Array(data.length).keys()];
        
        labelsToShow.forEach(index => {
          const x = index * xStep;
          ctx.fillText(data[index].date, x, canvas.height - 5);
        });
      }
    };

    renderChart();
    
    // Re-render chart on window resize
    const handleResize = () => renderChart();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  // Calculate progress for level
  const currentLevel = Math.floor(currentRating / 100);
  const nextLevel = currentLevel + 1;
  const progress = (currentRating % 100) / 100 * 100;

  return (
    <Card className="neo-blur w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-glow">Rating Progress</CardTitle>
        <CardDescription>Your ELO rating over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">
                Level {currentLevel}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium">
                Level {nextLevel}
              </span>
            </div>
          </div>
          <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-knight-DEFAULT to-knight-light"
            />
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">
              {currentRating} points
            </span>
          </div>
        </div>

        <div className="relative h-[180px] w-full">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRatingChart;
