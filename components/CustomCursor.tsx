import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [trail, setTrail] = useState<Array<{id: number, x: number, y: number, size: number, life: number}>>([]);

  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                        (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
    
    setIsMobile(checkMobile);
    
    if (checkMobile) {
      return;
    }

    let animationFrameId: number;
    let lastTime = 0;
    const trailLife = 0.5;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const now = Date.now();
      if (now - lastTime > 30) {
        lastTime = now;
        const newTrailPoint = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2,
          life: 1.0
        };
        
        setTrail(prev => [...prev.slice(-10), newTrailPoint]);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTrail(prev => [...prev, {
        id: Date.now(),
        x: position.x,
        y: position.y,
        size: 20,
        life: 1.0
      }]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.style.cursor === 'pointer' ||
        target.hasAttribute('onclick');
      
      setIsHovering(isInteractive);
    };

    const updateTrail = () => {
      setTrail(prev => 
        prev
          .map(point => ({
            ...point,
            life: point.life - 0.016
          }))
          .filter(point => point.life > 0)
      );
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousemove', checkInteractive);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousemove', checkInteractive);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position.x, position.y]);

  if (isMobile || !isVisible) {
    return null;
  }

  return (
    <>
      {trail.map((point) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            opacity: point.life * 0.3,
            transform: `translate(-50%, -50%) scale(${point.life})`,
          }}
        />
      ))}

      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%) rotate(-120deg)',
        }}
      >
        <div className="cursor-ring">
          <div className="ring-segment ring-segment-1"></div>
          <div className="ring-segment ring-segment-2"></div>
          <div className="ring-segment ring-segment-3"></div>
          <div className="ring-segment ring-segment-4"></div>
        </div>

        <div className="cursor-arrow">
          <div className="arrow-shaft"></div>
          <div className="arrow-head">
            <div className="arrow-tip"></div>
            <div className="arrow-blade-left"></div>
            <div className="arrow-blade-right"></div>
          </div>
          <div className="arrow-fletching">
            <div className="fletching-feather feather-1"></div>
            <div className="fletching-feather feather-2"></div>
            <div className="fletching-feather feather-3"></div>
          </div>
        </div>

        <div className="cursor-inner-circle"></div>

        <div className="cursor-particle particle-1"></div>
        <div className="cursor-particle particle-2"></div>
        <div className="cursor-particle particle-3"></div>
      </div>

      <style jsx global>{`
        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 60px;
          height: 60px;
          transition: 
            transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.2s ease;
          filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.6));
        }
        
        .custom-cursor.hover {
          transform: translate(-50%, -50%) scale(1.4) rotate(-105deg);
          filter: drop-shadow(0 0 15px rgba(255, 193, 7, 0.8));
        }
        
        .custom-cursor.click {
          transform: translate(-50%, -50%) scale(0.8) rotate(-135deg);
          filter: drop-shadow(0 0 20px rgba(220, 38, 38, 1));
          animation: cursor-click 0.2s ease-out;
        }
        
        @keyframes cursor-click {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(-120deg); }
          50% { transform: translate(-50%, -50%) scale(0.7) rotate(-130deg); }
        }
        
        .cursor-trail {
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(220, 38, 38, 0.8) 0%,
            rgba(220, 38, 38, 0.4) 50%,
            transparent 100%
          );
          transition: opacity 0.1s ease;
        }
        
        .cursor-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 48px;
          height: 48px;
        }
        
        .ring-segment {
          position: absolute;
          width: 8px;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(220, 38, 38, 0.8) 20%,
            rgba(255, 193, 7, 0.9) 50%,
            rgba(220, 38, 38, 0.8) 80%,
            transparent 100%
          );
          top: 50%;
          left: 50%;
          transform-origin: 0 50%;
          transform: translateY(-50%);
          animation: ring-rotate 4s linear infinite;
        }
        
        .ring-segment-1 { transform: translateY(-50%) rotate(0deg); animation-delay: 0s; }
        .ring-segment-2 { transform: translateY(-50%) rotate(90deg); animation-delay: -1s; }
        .ring-segment-3 { transform: translateY(-50%) rotate(180deg); animation-delay: -2s; }
        .ring-segment-4 { transform: translateY(-50%) rotate(270deg); animation-delay: -3s; }
        
        @keyframes ring-rotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
        
        .custom-cursor.hover .ring-segment {
          animation-duration: 2s;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(255, 193, 7, 0.9) 20%,
            rgba(255, 235, 59, 1) 50%,
            rgba(255, 193, 7, 0.9) 80%,
            transparent 100%
          );
        }
        
        .cursor-arrow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          transition: transform 0.3s ease;
        }
        
        .custom-cursor.hover .cursor-arrow {
          transform: translate(-50%, -50%) scale(1.2);
        }
        
        .arrow-shaft {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(234, 88, 12, 0.9) 0%,
            rgba(220, 38, 38, 1) 20%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(220, 38, 38, 1) 80%,
            rgba(234, 88, 12, 0.9) 100%
          );
          border-radius: 1px;
          box-shadow: 0 0 5px rgba(220, 38, 38, 0.5);
        }
        
        .arrow-head {
          position: absolute;
          top: 50%;
          left: calc(50% + 10px);
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
        }
        
        .arrow-tip {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 8px solid rgba(255, 255, 255, 0.95);
          filter: drop-shadow(0 0 3px rgba(220, 38, 38, 0.8));
        }
        
        .arrow-blade-left,
        .arrow-blade-right {
          position: absolute;
          top: 50%;
          width: 6px;
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(220, 38, 38, 0.9) 100%
          );
          transform-origin: right center;
        }
        
        .arrow-blade-left {
          left: 4px;
          transform: translateY(-50%) rotate(45deg);
        }
        
        .arrow-blade-right {
          left: 4px;
          transform: translateY(-50%) rotate(-45deg);
        }
        
        .arrow-fletching {
          position: absolute;
          top: 50%;
          left: calc(50% - 10px);
          transform: translateY(-50%);
          width: 8px;
          height: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        
        .fletching-feather {
          width: 6px;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(127, 29, 29, 0.8) 0%,
            rgba(220, 38, 38, 0.9) 50%,
            rgba(127, 29, 29, 0.8) 100%
          );
          border-radius: 1px;
          transform-origin: center;
        }
        
        .feather-1 { transform: rotate(15deg); }
        .feather-2 { transform: rotate(0deg); }
        .feather-3 { transform: rotate(-15deg); }
        
        .custom-cursor.hover .fletching-feather {
          background: linear-gradient(90deg, 
            rgba(234, 88, 12, 0.8) 0%,
            rgba(255, 193, 7, 0.9) 50%,
            rgba(234, 88, 12, 0.8) 100%
          );
          animation: feather-flutter 0.5s ease-in-out infinite alternate;
        }
        
        @keyframes feather-flutter {
          from { transform: rotate(0deg); }
          to { transform: rotate(5deg); }
        }
        
        .cursor-inner-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(220, 38, 38, 0.9) 40%,
            rgba(127, 29, 29, 0.7) 70%,
            transparent 90%
          );
          box-shadow: 
            0 0 8px rgba(220, 38, 38, 0.7),
            0 0 16px rgba(220, 38, 38, 0.4),
            inset 0 0 4px rgba(255, 255, 255, 0.5);
          animation: inner-pulse 2s ease-in-out infinite;
        }
        
        @keyframes inner-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
        }
        
        .cursor-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 235, 59, 0.9) 0%,
            rgba(255, 193, 7, 0.7) 50%,
            rgba(220, 38, 38, 0.5) 80%,
            transparent 100%
          );
          animation: particle-float 3s ease-in-out infinite;
          filter: blur(1px);
        }
        
        .particle-1 {
          width: 4px;
          height: 4px;
          top: 20%;
          left: 20%;
          animation-delay: 0s;
          animation-duration: 4s;
        }
        
        .particle-2 {
          width: 3px;
          height: 3px;
          top: 70%;
          left: 70%;
          animation-delay: 1s;
          animation-duration: 5s;
        }
        
        .particle-3 {
          width: 2px;
          height: 2px;
          top: 30%;
          left: 80%;
          animation-delay: 2s;
          animation-duration: 3s;
        }
        
        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translate(5px, -5px) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translate(10px, 5px) scale(1);
            opacity: 0.7;
          }
          75% {
            transform: translate(-5px, 10px) scale(1.2);
            opacity: 1;
          }
        }
        
        .custom-cursor.hover .cursor-particle {
          animation-duration: 2s;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 235, 59, 0.9) 50%,
            rgba(255, 193, 7, 0.7) 80%,
            transparent 100%
          );
        }
        
        .custom-cursor.click .cursor-inner-circle {
          animation: click-expand 0.3s ease-out forwards;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 235, 59, 0.95) 30%,
            rgba(255, 193, 7, 0.8) 60%,
            transparent 90%
          );
        }
        
        @keyframes click-expand {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        .custom-cursor.click .cursor-particle {
          animation: click-particle 0.5s ease-out forwards;
        }
        
        @keyframes click-particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(var(--random-x, 20) * 1px),
              calc(var(--random-y, -20) * 1px)
            ) scale(0);
            opacity: 0;
          }
        }
        
        * {
          cursor: none !important;
        }
        
        input, textarea, [contenteditable="true"] {
          cursor: text !important;
        }
        
        @media (max-width: 768px), (hover: none) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
          .cursor-trail {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};