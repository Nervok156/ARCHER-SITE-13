// FloatingElements.tsx
import React, { useEffect, useState } from 'react';

export const FloatingElements: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Парящий эффект для карточек
  const getCardTransform = (elementRect?: DOMRect) => {
    if (!elementRect || !isHoveringCard) return '';
    
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;
    
    const distanceX = (mousePosition.x - elementCenterX) / window.innerWidth;
    const distanceY = (mousePosition.y - elementCenterY) / window.innerHeight;
    
    const rotateX = distanceY * 5; // Наклон по X
    const rotateY = -distanceX * 5; // Наклон по Y
    const translateZ = 20; // Подъем
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  return (
    <>
      {/* Global styles for floating effects */}
      <style jsx global>{`
        /* Ancient Scroll Text Effect */
        .ancient-scroll {
          position: relative;
          background: linear-gradient(to right, 
            rgba(127, 29, 29, 0.1) 0%,
            rgba(127, 29, 29, 0.05) 20%,
            transparent 50%,
            rgba(127, 29, 29, 0.05) 80%,
            rgba(127, 29, 29, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: scroll-shine 3s ease-in-out infinite;
          padding: 0.5rem 1rem;
          border-radius: 4px;
        }
        
        @keyframes scroll-shine {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }
        
        /* Floating Cards */
        .floating-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        .floating-card:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(-5deg) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(127, 29, 29, 0.3),
            0 0 30px rgba(220, 38, 38, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
        
        /* Animated Borders */
        .animated-border {
          position: relative;
          overflow: hidden;
        }
        
        .animated-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            var(--color-primary, #dc2626), 
            transparent
          );
          animation: border-flow 3s linear infinite;
        }
        
        .animated-border::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            var(--color-primary, #dc2626), 
            transparent
          );
          animation: border-flow 3s linear infinite reverse;
        }
        
        @keyframes border-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        /* Floating Separators */
        .floating-separator {
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(220, 38, 38, 0.3), 
            rgba(220, 38, 38, 0.6), 
            rgba(220, 38, 38, 0.3), 
            transparent
          );
          position: relative;
          overflow: hidden;
        }
        
        .floating-separator::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
          );
          animation: separator-glow 4s ease-in-out infinite;
        }
        
        @keyframes separator-glow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
        }
        
        /* Particle Effect */
        .particle-container {
          position: relative;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(220, 38, 38, 0.5);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-float 3s ease-out forwards;
        }
        
        @keyframes particle-float {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(var(--particle-x, 0) * 100px),
              calc(var(--particle-y, -100) * 1px)
            ) scale(1);
            opacity: 0;
          }
        }
        
        /* Glowing Text */
        .glowing-text {
          text-shadow: 
            0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 15px currentColor;
          animation: text-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes text-glow {
          from {
            text-shadow: 
              0 0 5px currentColor,
              0 0 10px currentColor,
              0 0 15px currentColor;
          }
          to {
            text-shadow: 
              0 0 10px currentColor,
              0 0 20px currentColor,
              0 0 30px currentColor;
          }
        }
        
        /* Floating Animation for Sections */
        @keyframes float-section {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .floating-section {
          animation: float-section 6s ease-in-out infinite;
        }
        
        /* Ripple Effect */
        .ripple {
          position: relative;
          overflow: hidden;
        }
        
        .ripple::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(220, 38, 38, 0.3);
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        
        .ripple:hover::after {
          animation: ripple-effect 0.6s ease-out;
        }
        
        @keyframes ripple-effect {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }   
      `}</style>
    </>
  );
};