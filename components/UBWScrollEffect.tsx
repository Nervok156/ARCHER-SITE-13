// UBWScrollEffect.tsx
import React, { useEffect, useState, useRef } from 'react';

interface FlyingSword {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  size: number;
  opacity: number;
  type: 'katana' | 'longsword' | 'dagger';
}

export const UBWScrollEffect: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [flyingSwords, setFlyingSwords] = useState<FlyingSword[]>([]);
  const [isUBWActive, setIsUBWActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollY / (maxScroll * 0.7), 1);
      
      setScrollProgress(progress);
      setIsUBWActive(progress > 0.3);

      // Генерация мечей при активном UBW
      if (progress > 0.3 && Math.random() > 0.9) {
        const newSword: FlyingSword = {
          id: Date.now(),
          x: Math.random() * 100,
          y: -10,
          rotation: Math.random() * 360,
          speed: 0.5 + Math.random() * 1,
          size: 20 + Math.random() * 40,
          opacity: 0.1 + Math.random() * 0.3,
          type: ['katana', 'longsword', 'dagger'][Math.floor(Math.random() * 3)] as any
        };
        
        setFlyingSwords(prev => [...prev.slice(-15), newSword]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // Анимация летающих мечей
    let animationId: number;
    const updateSwords = () => {
      setFlyingSwords(prev => 
        prev
          .map(sword => ({
            ...sword,
            y: sword.y + sword.speed,
            rotation: sword.rotation + sword.speed * 2
          }))
          .filter(sword => sword.y < 110)
      );
      animationId = requestAnimationFrame(updateSwords);
    };
    animationId = requestAnimationFrame(updateSwords);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Цвета для UBW эффекта
  const ubwColors = {
    primary: `rgb(${220 + scrollProgress * 35}, ${38 - scrollProgress * 10}, ${38 - scrollProgress * 10})`,
    background: `rgb(${74 + scrollProgress * 30}, ${18 + scrollProgress * 10}, ${18 + scrollProgress * 5})`,
    overlay: `rgba(0, 0, 0, ${0.3 + scrollProgress * 0.4})`,
    glow: `rgba(220, 38, 38, ${0.2 + scrollProgress * 0.3})`
  };

  return (
    <>
      {/* UBW Overlay Effect */}
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-1000"
        style={{
          opacity: scrollProgress * 0.7,
          mixBlendMode: 'overlay'
        }}
      >
        {/* Color Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, transparent 30%, ${ubwColors.overlay} 70%)`,
          }}
        />
        
        {/* Glowing Rings */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${100 + scrollProgress * 200}vh`,
            height: `${100 + scrollProgress * 200}vh`,
            background: `radial-gradient(circle, transparent 40%, ${ubwColors.glow} 70%, transparent 90%)`,
            animation: 'pulse-ring 8s ease-in-out infinite',
            opacity: 0.1 + scrollProgress * 0.2
          }}
        />
      </div>

      {/* Flying Swords */}
      {isUBWActive && flyingSwords.map(sword => (
        <div
          key={sword.id}
          className="absolute pointer-events-none z-30"
          style={{
            left: `${sword.x}%`,
            top: `${sword.y}%`,
            width: `${sword.size}px`,
            height: `${sword.size * 3}px`,
            opacity: sword.opacity,
            transform: `translate(-50%, -50%) rotate(${sword.rotation}deg)`,
            filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.5))'
          }}
        >
          <div className="relative w-full h-full">
            {/* Sword Blade */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/5 h-3/4"
              style={{
                background: 'linear-gradient(to bottom, #ccc 0%, #999 30%, #666 70%, #444 100%)',
                clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)'
              }}
            />
            
            {/* Sword Hilt */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/4"
              style={{
                background: 'linear-gradient(to right, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
                borderRadius: '2px'
              }}
            />
            
            {/* Sword Guard */}
            <div 
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-2/3 h-1"
              style={{
                background: 'linear-gradient(to right, #C0C0C0 0%, #E0E0E0 50%, #C0C0C0 100%)',
                borderRadius: '1px'
              }}
            />
          </div>
        </div>
      ))}

      {/* Dynamic CSS Variables for UBW Effect */}
      <style jsx global>{`
        :root {
          --ubw-intensity: ${scrollProgress};
          --ubw-primary: ${ubwColors.primary};
          --ubw-background: ${ubwColors.background};
        }
        
        .ubw-active {
          --text-glow: 0 0 10px rgba(220, 38, 38, 0.5);
          --border-glow: 0 0 5px rgba(220, 38, 38, 0.3);
        }
        
        @keyframes pulse-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.2; }
        }
        
        @keyframes float-sword {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateY(0); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateY(-20px); }
        }
        
        /* Apply UBW effect to elements */
        .ubw-text {
          text-shadow: 0 0 calc(10px * var(--ubw-intensity)) var(--ubw-primary);
          transition: text-shadow 0.5s ease;
        }
        
        .ubw-border {
          box-shadow: inset 0 0 calc(10px * var(--ubw-intensity)) var(--ubw-primary),
                      0 0 calc(5px * var(--ubw-intensity)) var(--ubw-primary);
          transition: box-shadow 0.5s ease;
        }
        
        .ubw-bg {
          background-color: color-mix(in srgb, var(--ubw-background) calc(100% * var(--ubw-intensity)), transparent calc(100% * (1 - var(--ubw-intensity))));
          transition: background-color 0.5s ease;
        }
      `}</style>
    </>
  );
};