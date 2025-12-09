import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from './SectionTitle';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Массив изображений с путями к файлам в папке images
const GALLERY_IMAGES = [
  { id: 1, caption: '3 стиля персонажа', filename: 'photo1.jpg' },
  { id: 2, caption: 'Арчер на чиле', filename: 'photo2.jpg' },
  { id: 3, caption: 'Использование способности Арчера', filename: 'photo3.jpg' },
  { id: 4, caption: 'Глюпи вумен', filename: 'photo4.jpg' },
  { id: 5, caption: 'Unlimited Blade Works', filename: 'photo5.jpg' },
  { id: 6, caption: 'Ночь схватки', filename: 'photo6.jpg' },
  { id: 7, caption: 'Слуга со своим мастером', filename: 'photo7.jpg' },
  { id: 8, caption: 'Финальное противостояние', filename: 'photo8.jpg' }
];

export const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Обработка свайпа/drag
  const handlePointerDown = (x: number) => {
    startXRef.current = x;
  };

  const handlePointerUp = (x: number) => {
    if (startXRef.current === null) return;
    const delta = x - startXRef.current;
    startXRef.current = null;

    if (delta > 50) {
      prevSlide();
    } else if (delta < -50) {
      nextSlide();
    }
  };

  // Получаем текущее изображение
  const currentImage = GALLERY_IMAGES[currentIndex];

  // Функция для получения пути к изображению
  const getImagePath = (filename: string) => {
    return `/images/${filename}`;
  };

  return (
    <section id="gallery" className="py-16 relative"> {/* Убрал bg-iron-900 и border-y */}
      <div className="container mx-auto px-4">
        <SectionTitle title="Видения Битв" subtitle="Осколки Памяти" />

        <div
          className="relative max-w-4xl mx-auto"
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => handlePointerUp(e.changedTouches[0].clientX)}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseUp={(e) => handlePointerUp(e.clientX)}
        >
          {/* Ornamental Frame */}
          <div className="relative p-1 md:p-2 bg-iron-900/40 border-2 border-iron-700/50 shadow-xl rounded-sm transition-all duration-700 hover:shadow-[0_15px_40px_-8px_rgba(127,29,29,0.3)] hover:scale-[1.005] group backdrop-blur-sm"> {/* Добавил прозрачность и blur */}
            <div className="absolute inset-0 border border-gold-600/20 m-1 pointer-events-none z-30"></div>
            
            <div className="relative aspect-[16/9] bg-black overflow-hidden">
              {/* Все изображения для плавного перехода */}
              {GALLERY_IMAGES.map((image, index) => (
                <div
                  key={`img-${image.id}`}
                  className={`absolute inset-0 w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
                    index === currentIndex
                      ? 'opacity-100 z-10 scale-100'
                      : 'opacity-0 z-0 scale-105'
                  }`}
                >
                  <img 
                    src={getImagePath(image.filename)}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-90" /* Увеличил opacity */
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      console.error(`Не удалось загрузить изображение: /images/${image.filename}`);
                      e.currentTarget.src = 'https://via.placeholder.com/1200x675/000000/666666?text=Изображение+не+найдено';
                      e.currentTarget.alt = `Изображение ${image.id} не доступно`;
                    }}
                  />
                </div>
              ))}
              
              {/* Overlay Vignette - сделаем менее темным */}
              <div className="absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.4))] pointer-events-none z-20"></div>

              {/* Caption для текущего изображения */}
              <div 
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 border-t border-blood-600/50 px-6 py-3 backdrop-blur-sm text-center min-w-[250px] z-30 transition-all duration-700 ${
                  'opacity-100 translate-y-0'
                } group-hover:-translate-y-1`}
              >
                <h3 className="font-display text-lg md:text-xl text-parchment-100 uppercase tracking-wider">
                  {currentImage.caption}
                </h3>
                <p className="text-parchment-300 text-xs mt-0.5">
                  Изображение {currentIndex + 1} из {GALLERY_IMAGES.length}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blood-500 transition-colors z-20 group"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft size={40} strokeWidth={1} className="drop-shadow-lg group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blood-500 transition-colors z-20 group"
            aria-label="Следующее изображение"
          >
            <ChevronRight size={40} strokeWidth={1} className="drop-shadow-lg group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rotate-45 border transition-all duration-300 ${
                  idx === currentIndex ? 'bg-blood-600 border-blood-600 scale-110' : 'bg-transparent border-gray-600 hover:border-parchment-100'
                }`}
                aria-label={`Перейти к изображению ${idx + 1}: ${img.caption}`}
                aria-current={idx === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Миниатюры */}
          <div className="mt-6 grid grid-cols-4 sm:grid-cols-8 gap-2">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={`thumb-${img.id}`}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-[4/3] overflow-hidden border transition-all duration-300 backdrop-blur-sm ${
                  idx === currentIndex
                    ? 'border-blood-500 shadow-[0_0_0_2px_rgba(248,113,113,0.35)] bg-black/20'
                    : 'border-iron-700/50 hover:border-parchment-200/70 bg-black/10'
                }`}
                aria-label={`Открыть миниатюру ${idx + 1}`}
              >
                <img
                  src={getImagePath(img.filename)}
                  alt={img.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {idx === currentIndex && (
                  <span className="absolute inset-0 bg-black/40" aria-hidden />
                )}
              </button>
            ))}
          </div>

          {/* Keyboard Navigation Hint */}
          <p className="text-center text-gray-500 text-xs mt-3">
            Используйте ← → для навигации
          </p>
        </div>
      </div>
    </section>
  );
};