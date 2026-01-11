import { useRef, useState, useEffect } from 'react';

// Varied rain windows per hour (daytime only: 8 AM - 10 PM)
// Format: hour -> [startMinute, endMinute]
const RAIN_SCHEDULE = {
  8: [5, 15],
  9: [42, 52],
  10: [18, 28],
  11: [33, 43],
  12: [7, 17],
  13: [50, 60],
  14: [22, 32],
  15: [38, 48],
  16: [12, 22],
  17: [45, 55],
  18: [3, 13],
  19: [28, 38],
  20: [55, 65],
  21: [15, 25],
};

// Rain configuration
const RAIN_CONFIG = {
  dropCount: 200,
  speedMin: 12,
  speedMax: 20,
  lengthMin: 15,
  lengthMax: 25,
  angle: 15, // degrees from vertical
  color: 'rgba(174, 194, 224, 0.5)',
  thickness: 1.5,
};

// Raindrop class
class Raindrop {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  reset() {
    // Random position across the canvas (start above visible area)
    this.x = Math.random() * (this.width + 100) - 50;
    this.y = Math.random() * -this.height;

    // Random speed and length
    this.speed = RAIN_CONFIG.speedMin + Math.random() * (RAIN_CONFIG.speedMax - RAIN_CONFIG.speedMin);
    this.length = RAIN_CONFIG.lengthMin + Math.random() * (RAIN_CONFIG.lengthMax - RAIN_CONFIG.lengthMin);

    // Opacity variation
    this.opacity = 0.3 + Math.random() * 0.5;
  }

  update() {
    // Calculate movement based on angle
    const angleRad = (RAIN_CONFIG.angle * Math.PI) / 180;
    this.x += Math.sin(angleRad) * this.speed;
    this.y += Math.cos(angleRad) * this.speed;

    // Reset when off screen
    if (this.y > this.height || this.x > this.width + 50) {
      this.reset();
      this.y = Math.random() * -50;
    }
  }

  draw(ctx) {
    const angleRad = (RAIN_CONFIG.angle * Math.PI) / 180;
    const endX = this.x + Math.sin(angleRad) * this.length;
    const endY = this.y + Math.cos(angleRad) * this.length;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
    ctx.lineWidth = RAIN_CONFIG.thickness;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}

export default function RainEffect() {
  const canvasRef = useRef(null);
  const [isRaining, setIsRaining] = useState(false);
  const dropsRef = useRef([]);
  const animationRef = useRef(null);

  // Check time every minute to toggle rain
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      const schedule = RAIN_SCHEDULE[hour];
      if (!schedule) {
        setIsRaining(false);
        return;
      }

      const [start, end] = schedule;
      // Handle wrap-around (e.g., 55-65 means 55-59 this hour)
      const isInWindow = end <= 60
        ? minute >= start && minute < end
        : minute >= start;

      setIsRaining(isInWindow);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Canvas rain animation
  useEffect(() => {
    if (!isRaining || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Resize existing drops
      dropsRef.current.forEach(drop => {
        drop.resize(canvas.width, canvas.height);
      });
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize raindrops
    dropsRef.current = [];
    for (let i = 0; i < RAIN_CONFIG.dropCount; i++) {
      dropsRef.current.push(new Raindrop(canvas.width, canvas.height));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dropsRef.current.forEach(drop => {
        drop.update();
        drop.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      dropsRef.current = [];
    };
  }, [isRaining]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000 ${
        isRaining ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
