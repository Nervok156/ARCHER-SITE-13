import React, { useEffect, useRef, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Shield, ChevronRight } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { SERVANT_STATS, LORE_SECTIONS } from '../constants';
import { LoreSection } from '../types';

const LoreItem: React.FC<{ section: LoreSection; index: number }> = ({ section, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 last:mb-0 medieval-reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative pl-8 md:pl-12 border-l-2 border-iron-800 ml-2 md:ml-0">
        {/* Animated Line Overlay */}
        <div className={`absolute top-0 left-[-2px] w-[2px] bg-blood-600 transition-all duration-[2000ms] ease-in-out ${isVisible ? 'h-full' : 'h-0'}`}></div>

        {/* Subtle decorative marker */}
        <div className={`absolute -left-[7px] top-0 w-3 h-3 bg-blood-600 rotate-45 border border-iron-800 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>

        {/* Title - Staggered Slide In */}
        <h3 className={`text-2xl md:text-3xl font-display font-bold text-parchment-200 mb-4 tracking-wide transform transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {section.title}
        </h3>
        
        {/* Content - Staggered Fade Up - УБРАЛ ancient-scroll класс */}
        <p className={`font-serif text-xl md:text-2xl text-gray-300 leading-relaxed text-justify transform transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          {section.content}
        </p>
      </div>
    </div>
  );
};

export const Bio: React.FC = () => {
  const scrollToLore = () => {
    const element = document.getElementById('lore-content');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="dossier" className="py-24 relative">
      <div className="container mx-auto px-4">
        
        {/* SERVANT PROFILE HEADER */}
        <div className="mb-32 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start border-b border-iron-800/50 pb-20">
          
          {/* Left: Bio & Quote */}
          <div className="w-full lg:w-3/5 space-y-8">
            <div className="prose prose-invert max-w-none">
              {/* УБРАЛ ancient-scroll класс */}
              <p className="text-2xl md:text-2xl leading-relaxed text-gray-300 font-serif">
                Слуга класса Archer, призванный Тосакой Рин во время Пятой Священной Войны на Граале. 
                Загадочный герой, утверждающий, что не имеет имени, но известный под псевдонимом «Арчер». 
                Вооружён луком и может проецировать различные виды оружия.
              </p>
            </div>

            {/* Quote block */}
            <div className="relative bg-gradient-to-r from-iron-950 to-iron-900 p-10 md:p-12 rounded-sm border-l-2 border-blood-600 shadow-xl group floating-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20"></div>
              
              {/* УБРАЛ ancient-scroll класс */}
              <blockquote className="font-serif text-2xl md:text-2xl text-parchment-100 italic mb-8 leading-normal relative z-10">
                <span className="text-blood-600 text-5xl mr-3">"</span>
                Я — кость моего меча. Сталь — моё тело, огонь — моя кровь. Я создал более тысячи клинков...
                <span className="text-blood-600 text-5xl ml-3">"</span>
              </blockquote>

              <button 
                onClick={scrollToLore}
                className="flex items-center gap-3 px-10 py-4 bg-transparent border-2 border-blood-600 text-blood-500 font-display font-bold uppercase tracking-widest hover:bg-blood-600 hover:text-parchment-100 transition-all duration-300 group/btn text-lg ripple"
              >
                <span>Изучить Хроники</span>
                <ChevronRight size={20} className="transform group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Stats Card */}
          <div className="w-full lg:w-2/5 relative group">
            <div className="absolute inset-0 bg-blood-600 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
            <div className="bg-iron-950 border-2 border-iron-700 p-7 relative shadow-2xl overflow-hidden floating-card">
              {/* Decorative Background Icon */}
              <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none text-white">
                <Shield size={200} />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-6 border-b border-iron-800 pb-4">
                  <h4 className="text-blood-500 text-xs tracking-[0.3em] font-display uppercase mb-1 glowing-text">СЛУГА-КЛАСС «ЛУЧНИК»</h4>
                  <h2 className="text-4xl font-display font-bold text-parchment-100">ARCHER</h2>
                  <p className="text-gray-500 font-serif italic text-sm mt-0.5">Герой Справедливости</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  {/* First row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0">
                      <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase mb-0.5">МАСТЕР</span>
                      <span className="block text-parchment-200 font-display text-xl mt-0.5">Тосака Рин</span>
                    </div>
                    <div className="space-y-0">
                      <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase mb-0.5">ВЫСОТА ДУХА</span>
                      <span className="block text-blood-500 font-display text-2xl font-bold mt-0.5 glowing-text">A+</span>
                    </div>
                  </div>

                  {/* Second row */}
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="space-y-0">
                      <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase mb-0.5">КЛАСС</span>
                      <span className="block text-parchment-200 font-display text-xl mt-0.5">Archer (Лучник)</span>
                    </div>
                    <div className="space-y-0">
                      <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase mb-0.5">АЛЬТЕРНАТИВА</span>
                      <span className="block text-parchment-200 font-display text-xl mt-0.5">EMIYA</span>
                    </div>
                  </div>
                  
                  {/* Stats bars */}
                  <div className="pt-4 mt-4 border-t border-iron-800 grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase">СИЛА</span>
                        <span className="text-parchment-200 font-display text-xl">B</span>
                      </div>
                      <div className="h-2 flex-1 bg-iron-800 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-blood-600 w-[70%] rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase">ВЫНОСЛИВОСТЬ</span>
                        <span className="text-parchment-200 font-display text-xl">C</span>
                      </div>
                      <div className="h-2 flex-1 bg-iron-800 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-blood-600 w-[50%] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Additional stats */}
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div>
                      <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase mb-0.5">ЛОВКОСТЬ</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-1.5 flex-1 bg-iron-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blood-600 w-[80%] rounded-full"></div>
                        </div>
                        <span className="text-parchment-200 font-display text-lg">A</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-iron-500 text-xs font-bold tracking-widest uppercase mb-0.5">МАГИЯ</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-1.5 flex-1 bg-iron-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blood-600 w-[60%] rounded-full"></div>
                        </div>
                        <span className="text-parchment-200 font-display text-lg">B</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 bg-blood-600"></div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-blood-600"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-blood-600"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-blood-600"></div>
            </div>
          </div>
        </div>

        <SectionTitle title="Хроники Героя" subtitle="Путь Стали" />

        <div id="lore-content" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start scroll-mt-32">
          {/* Left Column: Lore */}
          <div className="space-y-8">
            {LORE_SECTIONS.map((section, index) => (
              <LoreItem key={index} section={section} index={index} />
            ))}
          </div>

          {/* Right Column: Stats Chart */}
          <div className="relative mt-12 lg:mt-0 flex flex-col items-center floating-section">
            <div className="bg-parchment-200/5 p-4 rounded-full border-2 border-dashed border-iron-500/60 backdrop-blur-sm relative w-full max-w-[450px] aspect-square shadow-[0_0_30px_rgba(0,0,0,0.3)]">
              {/* Decoration */}
              <div className="absolute inset-3 border border-dashed border-iron-600/30 rounded-full rotating-circle"></div>

              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={SERVANT_STATS}>
                    <PolarGrid stroke="#525252" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#e7e5e4', fontSize: 12, fontFamily: 'Cinzel' }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Archer"
                      dataKey="A"
                      stroke="#991b1b"
                      strokeWidth={3}
                      fill="#7f1d1d"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Stat Summary */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="text-blood-500 font-display font-bold text-4xl opacity-20 glowing-text">RANK</div>
              </div>
            </div>

            {/* УБРАЛ ancient-scroll класс */}
            <div className="mt-8 text-center max-w-md">
              <p className="font-serif italic text-gray-500">
                "Характеристики Слуги класса Арчер под воздействием Мастера Тосака Рин."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS для анимации вращения круга */}
      <style jsx global>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotating-circle {
          animation: rotate 60s linear infinite;
        }
      `}</style>
    </section>
  );
};