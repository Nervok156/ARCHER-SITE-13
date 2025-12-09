import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Unlock, ChevronRight, Zap, Sword, Shield, Eye, Target, Sparkles, Star } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  description: string;
  icon?: keyof typeof IconMap;
  specialNote?: string;
}

interface SkillCategory {
  category: string;
  description: string;
  skills: Skill[];
  icon: keyof typeof IconMap;
}

const SKILLS_TREE: SkillCategory[] = [
  {
    category: "Благородные Фантазмы",
    description: "Высшие тайные техники, доступные лишь избранным героям",
    icon: "Sparkles",
    skills: [
      { 
        name: "Неограниченные Клинки", 
        level: "EX", 
        description: "Внутренний мир, содержащий все увиденные клинки. Реальность Мрака, где время застыло. Пространство бесконечных мечей, простирающееся до горизонта",
        icon: "Sword",
        specialNote: "Истинная Реальность Мрака"
      },
      { 
        name: "Рхо Айас", 
        level: "A++", 
        description: "Семислойный барьер, защищающий от любого оружия. Копия Ковчега Ноя. Каждый слой равен крепостной стене древнего города",
        icon: "Shield",
        specialNote: "Абсолютная Защита"
      },
      { 
        name: "Калодболг", 
        level: "B+", 
        description: "Проекция Меча-Молнии. При активации поворачивает пространство вокруг себя, обеспечивая гарантированное попадание",
        icon: "Target",
        specialNote: "Искривление Реальности"
      },
      { 
        name: "Хвурстига", 
        level: "B", 
        description: "Проекция оружия, используемого другим Слугой. Имитация благородных фантазмов с сохранением 80% исходной силы",
        icon: "Target",
        specialNote: "Совершенная Имитация"
      },
    ]
  },
  {
    category: "Боевые Навыки",
    description: "Техники ближнего и дальнего боя, отточенные в тысячах сражений",
    icon: "Zap",
    skills: [
      { 
        name: "Клаирвованс", 
        level: "A", 
        description: "Воспроизведение оружия через анализ структуры и истории. Мгновенное понимание происхождения, состава и слабых точек любого оружия",
        icon: "Eye",
        specialNote: "Глаза Анализа"
      },
      { 
        name: "Боевой Предел", 
        level: "B+", 
        description: "Мгновенное переключение между стилями боя различных героев. Адаптация к любому противнику за 3 секунды наблюдения",
        icon: "Zap",
        specialNote: "Бесконечная Адаптация"
      },
      { 
        name: "Предвидение Стрельбы", 
        level: "C", 
        description: "Расчет траектории атаки противника за 0.5 секунды. Предсказание движения цели на 5 шагов вперед",
        icon: "Target",
        specialNote: "Точность 99.8%"
      },
      { 
        name: "Совершенная Мимикрия", 
        level: "A++", 
        description: "Полное копирование боевого стиля и техник противника после 3 минут наблюдения. Включает мышечную память и инстинктивные реакции",
        icon: "Sparkles",
        specialNote: "Рефлекторное Копирование"
      },
    ]
  },
  {
    category: "Магические Способности",
    description: "Внутренняя магия, усиленная связью с Мастером",
    icon: "Star",
    skills: [
      { 
        name: "Проекция Магии", 
        level: "B", 
        description: "Создание временных магических структур. Поддержание до 12 проекций одновременно с полным контролем",
        icon: "Sparkles",
        specialNote: "Многопоточная Концентрация"
      },
      { 
        name: "Усиление Маны", 
        level: "C", 
        description: "Увеличение эффективности использования магической энергии на 300%. Оптимизация расхода праны через внутренние каналы",
        icon: "Zap",
        specialNote: "Энергетическая Эффективность"
      },
      { 
        name: "Телепатическая Связь", 
        level: "A", 
        description: "Мгновенная передача мыслей с Мастером на расстоянии до 50 км. Полная синхронизация тактического мышления",
        icon: "Eye",
        specialNote: "Беспроводная Связь"
      },
      { 
        name: "Скрытие Маны", 
        level: "B-", 
        description: "Маскировка магического присутствия. Снижение заметности для других магов на 90%",
        icon: "Eye",
        specialNote: "Магическая Невидимость"
      },
    ]
  },
  {
    category: "Скрытые Техники",
    description: "Предельные приёмы, доступные лишь в крайних обстоятельствах",
    icon: "Zap",
    skills: [
      { 
        name: "Броек Барид", 
        level: "EX", 
        description: "Техника временной остановки в локальной области. Замедляет время на 3 секунды в радиусе 10 метров",
        icon: "Zap",
        specialNote: "Контроль Времени"
      },
      { 
        name: "Перегрузка Проекций", 
        level: "A+++", 
        description: "Массовый призыв оружия. Создание до 100 проекций одновременно с последующим их направленным взрывом",
        icon: "Sparkles",
        specialNote: "Оружейный Потоп"
      },
      { 
        name: "Слияние с Реальностью", 
        level: "EX", 
        description: "Временное слияние с Реальностью Мрака. Полная неуязвимость на 1 секунду за счет существования в параллельном измерении",
        icon: "Star",
        specialNote: "Фазовая Переход"
      },
    ]
  }
];

const IconMap = {
  Sword: Sword,
  Shield: Shield,
  Eye: Eye,
  Zap: Zap,
  Target: Target,
  Sparkles: Sparkles,
  Star: Star,
};

export const SkillsTree: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(SKILLS_TREE[0].category);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const selectedCategoryData = SKILLS_TREE.find(cat => cat.category === selectedCategory);

  const handleSkillClick = (skillName: string) => {
    setActiveSkill(activeSkill === skillName ? null : skillName);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="Небесные Ключи" 
          subtitle="Полное Древо Навыков Слуги" 
        />

        <div className="max-w-6xl mx-auto">
          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {SKILLS_TREE.map((category) => {
              const Icon = IconMap[category.icon];
              const isSelected = selectedCategory === category.category;
              const totalSkills = category.skills.length;
              
              return (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`
                    flex items-center gap-3 px-6 py-4 rounded-sm border-2 transition-all duration-300
                    group relative overflow-hidden
                    ${isSelected 
                      ? 'border-blood-600 bg-blood-900/30 shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                      : 'border-iron-700 bg-iron-900/50 hover:border-blood-500/50 hover:bg-iron-800/30'
                    }
                  `}
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blood-600/0 via-blood-500/10 to-blood-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Icon size={20} className={`relative z-10 ${isSelected ? 'text-blood-500' : 'text-gray-500 group-hover:text-blood-400'}`} />
                  <span className={`font-display font-bold tracking-wider relative z-10 ${isSelected ? 'text-parchment-100' : 'text-gray-400 group-hover:text-parchment-200'}`}>
                    {category.category}
                  </span>
                  <span className="text-xs text-gray-500 relative z-10 group-hover:text-gray-400">
                    ({totalSkills} навыков)
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          {selectedCategoryData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Category Description */}
              <div className="space-y-8">
                <div className="bg-iron-900/50 border border-iron-700 p-8 rounded-sm backdrop-blur-sm group hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] transition-shadow duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blood-900/30 border border-blood-600/50 rounded-full group-hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-shadow duration-500">
                      {(() => {
                        const Icon = IconMap[selectedCategoryData.icon];
                        return <Icon size={24} className="text-blood-500" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-parchment-100 mb-2">
                        {selectedCategoryData.category}
                      </h3>
                      <p className="text-gray-400 font-serif text-lg">
                        {selectedCategoryData.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-iron-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 font-display uppercase tracking-wider text-sm">
                        Мастерство категории
                      </span>
                      <span className="text-blood-500 font-display font-bold">
                        100%
                      </span>
                    </div>
                    <div className="h-2 bg-iron-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blood-600 to-gold-600 rounded-full animate-pulse"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="bg-iron-900/30 border border-iron-700/50 p-6 rounded-sm hover:shadow-[0_0_20px_rgba(127,29,29,0.1)] transition-shadow duration-500">
                  <h4 className="font-display text-xl text-parchment-100 mb-4">Ранги Навыков</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-gold-600 to-orange-600 rounded-sm flex items-center justify-center">
                        <Star size={12} className="text-parchment-100" />
                      </div>
                      <span className="text-gold-500 font-display font-bold">EX —</span>
                      <span className="text-gray-300">Вне шкалы, уникальные способности</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-blood-600 rounded-sm"></div>
                      <span className="text-blood-500 font-display font-bold">A+++ —</span>
                      <span className="text-gray-300">Предельные навыки</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blood-600 to-red-500 rounded-sm"></div>
                      <span className="text-red-400 font-display font-bold">A —</span>
                      <span className="text-gray-300">Высший уровень</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-600 to-amber-500 rounded-sm"></div>
                      <span className="text-amber-500 font-display font-bold">B —</span>
                      <span className="text-gray-300">Выше среднего</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-iron-500 rounded-sm"></div>
                      <span className="text-gray-400 font-display font-bold">C —</span>
                      <span className="text-gray-300">Средний уровень</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Skills List */}
              <div className="space-y-6">
                {selectedCategoryData.skills.map((skill) => {
                  const SkillIcon = skill.icon ? IconMap[skill.icon] : Sword;
                  const isActive = activeSkill === skill.name;
                  const isEX = skill.level === 'EX';
                  const isHighRank = skill.level.includes('A') || skill.level.includes('+');
                  
                  return (
                    <div
                      key={skill.name}
                      onClick={() => handleSkillClick(skill.name)}
                      className={`
                        relative group cursor-pointer transition-all duration-500
                        hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(220,38,38,0.15)]
                        ${isActive ? 'shadow-[0_0_30px_rgba(220,38,38,0.2)]' : ''}
                      `}
                    >
                      <div className={`
                        border-2 p-6 bg-iron-900/80 backdrop-blur-sm
                        transition-all duration-300
                        ${isEX 
                          ? 'border-gold-600/50 bg-gradient-to-r from-iron-900/90 via-iron-900/80 to-gold-900/20 hover:border-gold-500/70' 
                          : isHighRank
                          ? 'border-blood-600/50 hover:border-blood-500/70' 
                          : 'border-iron-700/50 hover:border-blood-500/30'
                        }
                        ${isActive ? 'scale-[1.02]' : ''}
                      `}>
                        {/* Skill Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`
                              p-3 rounded-full border-2 flex items-center justify-center
                              transition-all duration-300
                              ${isEX 
                                ? 'bg-gradient-to-br from-gold-900/40 to-orange-900/30 border-gold-600/50 text-gold-400 group-hover:shadow-[0_0_15px_rgba(234,88,12,0.3)]' 
                                : isHighRank
                                ? 'bg-blood-900/30 border-blood-600/50 text-blood-500 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
                                : 'bg-iron-800/50 border-iron-600/50 text-gray-400 group-hover:border-blood-500/50 group-hover:text-blood-400'
                              }
                            `}>
                              <SkillIcon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                              <h4 className={`
                                text-2xl font-display font-bold mb-1
                                ${isEX 
                                  ? 'text-gold-500' 
                                  : isHighRank
                                  ? 'text-parchment-100' 
                                  : 'text-gray-300'
                                }
                                group-hover:text-parchment-100
                              `}>
                                {skill.name}
                              </h4>
                              <div className="flex items-center gap-3">
                                <span className={`
                                  px-3 py-1 text-xs font-display font-bold tracking-widest
                                  transition-all duration-300
                                  ${isEX 
                                    ? 'bg-gold-900/40 text-gold-400 border-gold-600/50' 
                                    : isHighRank
                                    ? 'bg-blood-900/50 text-blood-400 border border-blood-600/30' 
                                    : 'bg-iron-800 text-gray-400 border border-iron-600'
                                  }
                                  group-hover:scale-105
                                `}>
                                  РАНГ {skill.level}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Unlock size={14} className="text-green-500" />
                                  <span className="text-xs text-green-500">АКТИВИРОВАН</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Special Note Badge */}
                          {skill.specialNote && (
                            <div className="hidden sm:block">
                              <span className={`
                                px-2 py-1 text-xs font-display font-bold tracking-wider rounded-sm
                                ${isEX 
                                  ? 'bg-gold-900/20 text-gold-400 border border-gold-600/30' 
                                  : 'bg-blood-900/20 text-blood-400 border border-blood-600/30'
                                }
                              `}>
                                {skill.specialNote}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Skill Description */}
                        <p className="font-serif text-gray-400 text-lg leading-relaxed mb-3">
                          {skill.description}
                        </p>

                        {/* Special Note (mobile) */}
                        {skill.specialNote && (
                          <div className="sm:hidden mt-3">
                            <div className="flex items-center gap-2">
                              <ChevronRight size={16} className={isEX ? 'text-gold-500' : 'text-blood-500'} />
                              <span className={`text-sm font-display font-bold ${isEX ? 'text-gold-500' : 'text-blood-400'}`}>
                                {skill.specialNote}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Corner Decorations */}
                        <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l ${isEX ? 'border-gold-600/70' : 'border-blood-600/70'}`}></div>
                        <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r ${isEX ? 'border-gold-600/70' : 'border-blood-600/70'}`}></div>
                        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l ${isEX ? 'border-gold-600/70' : 'border-blood-600/70'}`}></div>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r ${isEX ? 'border-gold-600/70' : 'border-blood-600/70'}`}></div>

                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isEX ? 'bg-gradient-to-r from-gold-900/5 via-transparent to-gold-900/5' : 'bg-gradient-to-r from-blood-900/5 via-transparent to-blood-900/5'}`}></div>
                      </div>

                      {/* Active State Glow */}
                      {isActive && (
                        <div className={`absolute -inset-1 rounded-sm blur-xl opacity-50 pointer-events-none ${isEX ? 'bg-gold-600/30' : 'bg-blood-600/30'}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Total Stats */}
          <div className="mt-12 pt-8 border-t border-iron-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-2xl font-display text-parchment-100 mb-2">
                  Полный Арсенал Слуги
                </h4>
                <p className="text-gray-400 font-serif">
                  Все навыки Арчера активированы и доступны для использования в любой момент
                </p>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-blood-500">
                    {SKILLS_TREE.flatMap(cat => cat.skills).length}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    Всего навыков
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gold-500">
                    {SKILLS_TREE.flatMap(cat => cat.skills).filter(s => s.level === 'EX').length}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    EX-ранга
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-parchment-100">
                    100%
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    Мастерство
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8">
              <div className="h-3 bg-iron-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blood-600 via-gold-600 to-blood-600 rounded-full animate-pulse"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Новичок</span>
                <span className="text-blood-500 font-bold">СОВЕРШЕННОЕ ВЛАДЕНИЕ</span>
                <span>Мастер</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles for this component */}
      <style jsx global>{`
        @keyframes skill-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .skill-card {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .skill-card:hover {
          transform: translateY(-3px);
        }
        
        .skill-card.ex-rank {
          animation: skill-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

