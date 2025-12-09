import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-iron-900/95 border-b border-blood-600/50 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
          <Shield className="w-8 h-8 text-blood-600 group-hover:text-parchment-100 transition-colors duration-500" />
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-[0.15em] text-parchment-100 group-hover:text-blood-500 transition-colors">
              ARCHER
            </span>
            <span className="text-xs font-serif tracking-[0.3em] text-gray-500 uppercase">Class Servant</span>
          </div>
        </div>

        {/* Desktop Nav - Уменьшил gap */}
        <nav className="hidden md:flex gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-display text-base font-bold text-gray-400 hover:text-blood-500 transition-colors relative group tracking-widest py-1"
            >
              <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-blood-600 transition-all duration-300 group-hover:w-2"></span>
              {item.label}
              <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-blood-600 transition-all duration-300 group-hover:w-2"></span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-parchment-200 hover:text-blood-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav Overlay - Уменьшил gap */}
      <div 
        className={`fixed inset-0 bg-iron-900 z-40 transform transition-transform duration-500 md:hidden flex flex-col items-center justify-center gap-6 border-r-4 border-blood-600 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
         <div className="absolute inset-0 bg-grunge opacity-10 pointer-events-none"></div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="font-display text-3xl text-parchment-200 hover:text-blood-500 tracking-widest transition-all"
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};