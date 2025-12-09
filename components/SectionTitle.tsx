import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-16 text-center relative">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-blood-600 to-transparent"></div>
        <div className="w-3 h-3 rotate-45 border-2 border-blood-600"></div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-parchment-200 uppercase tracking-widest text-shadow">
          {title}
        </h2>
        <div className="w-3 h-3 rotate-45 border-2 border-blood-600"></div>
        <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-blood-600 to-transparent"></div>
      </div>
      
      {subtitle && (
        <span className="block font-serif text-gold-600 text-xl md:text-3xl italic tracking-wide opacity-80">
          — {subtitle} —
        </span>
      )}
    </div>
  );
};