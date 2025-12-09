import React, { useEffect, useState, useRef } from 'react';

interface MagicalCircle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  opacity: number;
}

export const ParallaxBackground: React.FC = () => {
  const [circles, setCircles] = useState<MagicalCircle[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialCircles: MagicalCircle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 80,
      speed: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.08 + 0.02,
    }));
    setCircles(initialCircles);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    let animationId: number;
    const updateCircles = () => {
      setCircles(prev => prev.map(circle => ({
        ...circle,
        rotation: circle.rotation + circle.speed,
        y: (circle.y + circle.speed * 0.05) % 100
      })));
      animationId = requestAnimationFrame(updateCircles);
    };
    animationId = requestAnimationFrame(updateCircles);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-iron-950"
    >
      {/* Animated gradient layers */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(220, 38, 38, 0.3) 50%, transparent 70%)'
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(-45deg, transparent 30%, rgba(127, 29, 29, 0.2) 50%, transparent 70%)'
        }}
      />

      {/* Magical Circles */}
      {circles.map(circle => {
        const parallaxOffset = scrollY * 0.15 * circle.speed;
        return (
          <div
            key={circle.id}
            className="absolute"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y + parallaxOffset * 0.01}%`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              opacity: circle.opacity,
              transform: `translate(-50%, -50%) rotate(${circle.rotation}deg)`,
            }}
          >
            <div 
              className="absolute inset-0 rounded-full border border-blood-600"
              style={{
                borderWidth: '2px',
                filter: `blur(${circle.size * 0.02}px)`,
                boxShadow: 'inset 0 0 15px rgba(220, 38, 38, 0.3), 0 0 20px rgba(220, 38, 38, 0.2)'
              }}
            />
          </div>
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 7) % 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            backgroundColor: i % 3 === 0 ? '#dc2626' : '#7f1d1d',
            opacity: Math.random() * 0.2 + 0.05,
          }}
        />
      ))}
    </div>
  );
};