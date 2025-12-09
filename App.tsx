import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Bio } from './components/Bio';
import { Arsenal } from './components/Arsenal';
import { SkillsTree } from './components/SkillsTree';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ParallaxBackground } from './components/ParallaxBackground';
import { UBWScrollEffect } from './components/UBWScrollEffect';
import { FloatingElements } from './components/FloatingElements';

const App: React.FC = () => {
  const sparks = Array.from({ length: 30 }, (_, i) => {
    const isYellow = Math.random() > 0.7;
    return {
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      xOffset: (Math.random() - 0.5) * 100,
      size: 2 + Math.random() * 4,
      color: isYellow ? 'yellow' : 'red',
    };
  });

  return (
    <div className="min-h-screen bg-iron-950 text-parchment-200 selection:bg-blood-900 selection:text-white overflow-x-hidden relative">
      {/* UBW Scroll Effect */}
      <UBWScrollEffect />
      
      {/* Floating Elements Effects */}
      <FloatingElements />
      
      {/* Кастомный курсор */}
      <CustomCursor />
      
      {/* Параллакс-фон */}
      <ParallaxBackground />

      {/* Sparks Animation */}
      <div className="fixed inset-0 pointer-events-none z-[98] overflow-hidden">
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className={`spark spark-${spark.color}`}
            style={{
              '--spark-left': `${spark.left}%`,
              '--spark-delay': `${spark.delay}s`,
              '--spark-duration': `${spark.duration}s`,
              '--spark-x': `${spark.xOffset}px`,
              '--spark-size': `${spark.size}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iron-950/30 to-transparent"></div>
          <Bio />
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iron-950/40 to-transparent"></div>
          <Arsenal />
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iron-950/50 to-transparent"></div>
          <SkillsTree />
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iron-950/60 to-transparent"></div>
          <Gallery />
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iron-950/70 to-transparent"></div>
          <Contact />
        </div>
      </main>
      <Footer />
      
      {/* Global Vignette & Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-overlay opacity-20 bg-grunge"></div>
      <div className="fixed inset-0 pointer-events-none z-[99] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
    </div>
  );
};

export default App;