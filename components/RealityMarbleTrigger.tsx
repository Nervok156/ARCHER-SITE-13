import React from 'react';
import { Sword, X } from 'lucide-react';

interface RealityMarbleTriggerProps {
  isActive: boolean;
  onToggle: () => void;
}

export const RealityMarbleTrigger: React.FC<RealityMarbleTriggerProps> = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 left-6 z-[120] group p-4 rounded-full border-2 transition-all duration-500 ${
        isActive
          ? 'border-gold-600 bg-gold-900/30 shadow-[0_0_40px_rgba(234,88,12,0.6)]'
          : 'border-blood-600 bg-iron-900/80 hover:border-blood-500 hover:bg-iron-800/80 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
      } hover:scale-110 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]`}
      aria-label={isActive ? 'Выйти из Реальности Мрака' : 'Активировать Реальность Мрака'}
    >
      <div className="relative">
        {isActive ? <X size={24} className="text-gold-500" /> : <Sword size={24} className="text-blood-500 group-hover:text-blood-400" />}

        {isActive && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 rounded-full bg-gold-600/30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-gold-600/20 animate-pulse"></div>
          </div>
        )}
      </div>

      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-sm border backdrop-blur-sm whitespace-nowrap pointer-events-none transition-all duration-300 ${
          isActive
            ? 'border-gold-600 bg-gold-900/70 opacity-100 translate-y-0'
            : 'border-blood-600 bg-iron-900/90 opacity-0 group-hover:opacity-100 -translate-y-1'
        }`}
      >
        <span className={`text-sm font-display ${isActive ? 'text-gold-300' : 'text-parchment-100'}`}>
          {isActive ? 'Unlimited Blade Works' : 'Активировать UBW'}
        </span>
        <div
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b border-r rotate-45 ${
            isActive ? 'border-gold-600 bg-gold-900/70' : 'border-blood-600 bg-iron-900/90'
          }`}
        ></div>
      </div>
    </button>
  );
};

