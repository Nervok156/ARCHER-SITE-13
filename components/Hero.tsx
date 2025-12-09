import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  // Generate random embers
  const embers = useMemo(() => Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 3}s`,
    size: Math.random() * 5 + 2,
    opacity: Math.random() * 0.7 + 0.3,
    color: Math.random() > 0.7 ? '#f97316' : Math.random() > 0.4 ? '#dc2626' : '#fbbf24',
  })), []);

  // Generate fire particles
  const fireParticles = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 30}%`,
    animationDuration: `${Math.random() * 2 + 1}s`,
    animationDelay: `${Math.random() * 2}s`,
    size: Math.random() * 40 + 20,
    opacity: Math.random() * 0.4 + 0.1,
  })), []);

  // Generate floating sparks
  const sparks = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 4 + 2}s`,
    animationDelay: `${Math.random() * 3}s`,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
  })), []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Обновлено на photo9.jpg */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105 transition-transform duration-[20s] hover:scale-110"
        style={{ 
          backgroundImage: 'url(/images/photo9.jpg)',
          filter: 'brightness(0.6) contrast(1.2) sepia(0.4) hue-rotate(-10deg) saturate(1.3)'
        }}
      ></div>
      
      {/* Flame overlay effect */}
      <div className="absolute inset-0 z-10 flame-overlay opacity-30"></div>
      
      {/* Animated fire particles */}
      {fireParticles.map((particle) => (
        <div
          key={`fire-${particle.id}`}
          className="absolute rounded-full blur-xl pointer-events-none z-10"
          style={{
            left: particle.left,
            bottom: particle.bottom,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(220,38,38,0.4) 50%, transparent 100%)',
            animation: `flicker ${particle.animationDuration} ease-in-out infinite ${particle.animationDelay}`,
          }}
        />
      ))}

      {/* Texture Overlays */}
      <div className="absolute inset-0 z-10 bg-grunge opacity-15 mix-blend-overlay"></div>
      
      {/* Enhanced Heat Haze / Torch Flicker Effects */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-blood-600/15 via-transparent to-transparent opacity-40 animate-[pulse_3s_ease-in-out_infinite] mix-blend-overlay"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-gold-600/10 via-transparent to-blood-600/5 torch-flicker mix-blend-screen"></div>

      {/* Fire glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-10 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent"></div>

      {/* Floating Embers */}
      {embers.map((ember) => (
        <div
          key={`ember-${ember.id}`}
          className="absolute bottom-0 rounded-full blur-[1px] mix-blend-screen pointer-events-none z-20"
          style={{
            left: ember.left,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            backgroundColor: ember.color,
            opacity: ember.opacity,
            animation: `floatUp ${ember.animationDuration} ease-out infinite ${ember.animationDelay}`,
            boxShadow: `0 0 ${ember.size * 3}px ${ember.size}px ${ember.color}`,
          }}
        />
      ))}

      {/* Floating Sparks */}
      {sparks.map((spark) => (
        <div
          key={`spark-${spark.id}`}
          className="absolute rounded-full blur-[1px] pointer-events-none z-20"
          style={{
            left: spark.left,
            top: spark.top,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: '#fbbf24',
            opacity: spark.opacity,
            animation: `sparkle ${spark.animationDuration} ease-in-out infinite ${spark.animationDelay}, floatSide ${spark.animationDuration * 1.5} linear infinite ${spark.animationDelay}`,
            boxShadow: `0 0 ${spark.size * 4}px #fbbf24`,
          }}
        />
      ))}

      {/* Enhanced gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-iron-950/60 via-transparent to-iron-950/60"></div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blood-600/15 via-transparent to-transparent"></div>
      
      {/* Light rays */}
      <div className="absolute inset-0 z-10 light-rays opacity-20"></div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Main Title Block */}
        <div className="border-y-2 border-blood-600/40 py-12 md:py-20 px-4 md:px-16 relative backdrop-blur-sm bg-iron-900/30 w-full animate-fade-in-up shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:shadow-[0_0_80px_rgba(220,38,38,0.4)] transition-shadow duration-500">
           {/* Decorative Swords with glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blood-500 rotate-45 shadow-[0_0_25px_rgba(239,68,68,0.9)] animate-pulse"></div>
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-blood-500 rotate-45 shadow-[0_0_25px_rgba(239,68,68,0.9)] animate-pulse"></div>

          <h1 className="text-6xl md:text-9xl font-display font-bold text-parchment-100 mb-2 tracking-tighter text-shadow-lg leading-none glow-text">
            EMIYA
          </h1>
          <h2 className="text-xl md:text-3xl font-serif text-blood-500/90 tracking-[0.5em] uppercase border-t border-blood-900/30 pt-4 mt-4 text-glow">
            The Wrought Iron Hero
          </h2>
        </div>

        <div className="mt-12 opacity-0 animate-[slideUp_1s_ease-out_1s_forwards]">
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-parchment-200/90 font-serif leading-relaxed mb-8">
              Слуга класса Лучник, призванный для участия в Пятой Священной Войне за Грааль. 
              Герой, создавший более тысячи клинков. Воин, чье имя забыто, но чья легенда живет вечно.
            </p>

            <button 
              onClick={() => document.getElementById('dossier')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-4 bg-transparent border-2 border-blood-500/40 text-parchment-100 font-display font-bold tracking-widest uppercase overflow-hidden hover:border-blood-400 transition-all duration-500 shadow-[0_0_25px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] flame-button"
            >
              <span className="relative z-20 group-hover:text-iron-950 transition-colors duration-300">Раскрыть Истину</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blood-600 via-orange-600 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blood-600/30 to-gold-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </button>
        </div>
      </div>

      {/* Scroll Indicator with glow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-blood-400 opacity-90 z-30">
        <ChevronDown size={40} className="drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]" />
      </div>

      {/* Добавляем стили для анимаций */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
          75% {
            opacity: 0.2;
            transform: scale(0.9);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }

        @keyframes floatSide {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(20px);
          }
          50% {
            transform: translateX(0);
          }
          75% {
            transform: translateX(-20px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .flame-overlay {
          background: radial-gradient(ellipse at center, 
            rgba(251, 191, 36, 0.1) 0%, 
            rgba(220, 38, 38, 0.05) 40%, 
            transparent 70%);
          animation: flame-pulse 4s ease-in-out infinite;
        }

        @keyframes flame-pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .light-rays {
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(251, 191, 36, 0.05) 50%,
            transparent 70%
          );
          animation: ray-move 20s linear infinite;
        }

        @keyframes ray-move {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .glow-text {
          text-shadow: 
            0 0 10px rgba(220, 38, 38, 0.5),
            0 0 20px rgba(220, 38, 38, 0.3),
            0 0 30px rgba(220, 38, 38, 0.2);
        }

        .torch-flicker {
          animation: torch-flicker 3s ease-in-out infinite;
        }

        @keyframes torch-flicker {
          0%, 100% {
            opacity: 0.1;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.2;
          }
          75% {
            opacity: 0.25;
          }
        }

        .flame-button:hover {
          animation: button-flame 0.5s ease-in-out infinite alternate;
        }

        @keyframes button-flame {
          from {
            box-shadow: 
              0 0 20px rgba(220, 38, 38, 0.4),
              0 0 40px rgba(220, 38, 38, 0.2),
              inset 0 0 10px rgba(251, 191, 36, 0.3);
          }
          to {
            box-shadow: 
              0 0 25px rgba(220, 38, 38, 0.6),
              0 0 50px rgba(220, 38, 38, 0.3),
              inset 0 0 15px rgba(251, 191, 36, 0.5);
          }
        }
      `}</style>
    </section>
  );
};