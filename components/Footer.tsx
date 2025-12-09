import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-iron-950 py-12 border-t border-iron-800 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 bg-iron-900 border border-iron-700"></div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-4 mb-6 text-gray-300">
           <Github size={20} className="hover:text-blood-500 transition-colors" />
           <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blood-500 transition-colors font-display text-sm tracking-widest">
             ARCHIVE_REPOSITORY
           </a>
        </div>
        <p className="text-gray-300 font-serif text-sm opacity-80">
          © 2025 ПРОЕКТ "БЕСКОНЕЧНЫЙ КРАЙ". РАЗРАБОТЧИК: КОПЫЛ ИЛЬЯ (ИСП-33).
          <br />
          FATE/STAY NIGHT IS A TRADEMARK OF TYPE-MOON.
        </p>
      </div>
    </footer>
  );
};