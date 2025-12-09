import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Scroll, Sword, Shield, Zap, Mail, MessageSquare, User } from 'lucide-react';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Сбросить статус через 5 секунд
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Ошибка отправки формы');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <SectionTitle title="Заключить Контракт" subtitle="Призвать Связь с Творцом" />

        {/* Magical contract scroll */}
        <div className="relative">
          {/* Main contract scroll */}
          <div className="relative bg-parchment-100 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] p-8 md:p-12 shadow-[0_25px_50px_rgba(127,29,29,0.3)] transform rotate-[0.3deg] overflow-hidden">
            
            {/* Crumpled paper texture overlay */}
            <div 
              className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/crumpled-paper.png")',
                backgroundSize: '500px'
              }}
            ></div>

            {/* Magical border */}
            <div className="absolute inset-0 border-2 border-double border-blood-600/20 m-2 pointer-events-none"></div>
            
            {/* Corner magical seals */}
            <div className="absolute top-4 left-4 w-8 h-8 border border-blood-600/40 rotate-45 opacity-50"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border border-blood-600/40 rotate-45 opacity-50"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border border-blood-600/40 rotate-45 opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border border-blood-600/40 rotate-45 opacity-50"></div>

            {/* Blood stains and magical residues */}
            <div className="absolute top-10 left-16 w-20 h-12 bg-blood-900/10 rounded-full blur-sm transform rotate-[15deg] opacity-60"></div>
            <div className="absolute bottom-14 right-20 w-24 h-10 bg-gold-900/10 rounded-full blur-sm -rotate-[8deg] opacity-40"></div>
            <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-blood-800/15 rounded-full blur-sm"></div>

            {/* Content area */}
            <div className="relative">
              {/* Contract header */}
              <div className="relative mb-10 pb-8 border-b border-iron-400/30 text-center">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <Sword className="text-blood-600/60" size={24} />
                  <Shield className="text-gold-600/60" size={24} />
                  <Zap className="text-blood-600/60" size={24} />
                </div>
                
                <h3 className="font-display text-3xl md:text-4xl text-iron-900 mb-3 tracking-widest uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                  МАГИЧЕСКИЙ КОНТРАКТ
                </h3>
                <p className="font-serif text-iron-700 text-lg italic">
                  о призыве духовной связи с Творцом Проекта
                </p>
                
                {/* Magical seal */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blood-700 to-blood-900 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(127,29,29,0.5)] border-2 border-blood-800/60 text-parchment-100 font-display font-bold text-xs rotate-12">
                    ⚔️
                  </div>
                </div>
              </div>

              {/* Contract text */}
              <div className="font-serif text-iron-800 text-base md:text-lg leading-relaxed mb-8 text-justify">
                <p className="mb-4">
                  <span className="font-bold text-blood-700">СИМ СЕЙ КОНТРАКТ</span> удостоверяет волю Призывателя вступить 
                  в магическую связь с Творцом проекта "Бесконечный Край", подобно связи Мастера и Слуги.
                </p>
                
                <p className="mb-6 italic border-l-4 border-blood-600/40 pl-4 py-2 bg-parchment-200/30">
                  "Как три кольца Магии сплетаются воедино, так и наши воли соединятся через сей договор. 
                  Да будут мысли переданы, а ответ получен в час назначенный."
                </p>
              </div>

              {/* Form as contract terms */}
              <form
                action="https://formspree.io/f/mnnebpkz"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Hidden honeypot field for spam protection (optional) */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name field - True Name */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <User size={18} className="text-blood-600" />
                      <label htmlFor="name" className="font-display text-iron-900 text-lg font-bold tracking-wider uppercase">
                        Истинное Имя Призывателя
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-parchment-200/70 border-2 border-iron-400/60 text-iron-900 p-4 focus:outline-none focus:border-blood-600 focus:shadow-[0_0_10px_rgba(127,29,29,0.2)] transition-all font-serif text-lg placeholder-iron-500/60 rounded-sm"
                        placeholder="Введите ваше подлинное имя"
                      />
                      <div className="absolute -bottom-2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blood-600/30 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Email field - Magical Connection */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail size={18} className="text-blood-600" />
                      <label htmlFor="email" className="font-display text-iron-900 text-lg font-bold tracking-wider uppercase">
                        Канал Магической Связи
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-parchment-200/70 border-2 border-iron-400/60 text-iron-900 p-4 focus:outline-none focus:border-blood-600 focus:shadow-[0_0_10px_rgba(127,29,29,0.2)] transition-all font-serif text-lg placeholder-iron-500/60 rounded-sm"
                        placeholder="example@chaldea.org"
                      />
                      <div className="absolute -bottom-2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blood-600/30 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Message field - Command Seal */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare size={18} className="text-blood-600" />
                    <label htmlFor="message" className="font-display text-iron-900 text-lg font-bold tracking-wider uppercase">
                      Текст Командного Заклинания
                    </label>
                  </div>
                  <div className="relative">
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="w-full bg-parchment-200/70 border-2 border-iron-400/60 text-iron-900 p-4 focus:outline-none focus:border-blood-600 focus:shadow-[0_0_10px_rgba(127,29,29,0.2)] transition-all font-serif text-lg placeholder-iron-500/60 resize-none rounded-sm"
                      placeholder="Изложите ваши мысли, вопросы или приказы... Пусть слова ваши будут подобны заклинанию, призывающему ответ..."
                    ></textarea>
                    <div className="absolute -bottom-2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blood-600/30 to-transparent"></div>
                  </div>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-sm text-center animate-pulse">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="font-display text-green-300 text-lg">
                        Контракт скреплён! Магическая связь установлена.
                      </p>
                    </div>
                    <p className="font-serif text-green-400/80 text-sm mt-2">
                      Ваше послание успешно доставлено Творцу проекта.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-sm text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <p className="font-display text-red-300 text-lg">
                        Ошибка магической связи!
                      </p>
                    </div>
                    <p className="font-serif text-red-400/80 text-sm mt-2">
                      Попробуйте заключить контракт снова.
                    </p>
                  </div>
                )}

                {/* Submit button - Seal Contract */}
                <div className="flex justify-center pt-6">
                  <button 
                    type="submit" 
                    disabled={status === 'sending' || status === 'success'}
                    className={`
                      relative px-16 py-5 font-display text-xl font-bold tracking-widest uppercase flex items-center gap-4 transition-all duration-500
                      overflow-hidden group
                      ${status === 'sending' 
                        ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-parchment-100 cursor-wait' 
                        : status === 'success'
                        ? 'bg-gradient-to-r from-green-800 to-green-900 text-parchment-100 cursor-default shadow-[0_0_30px_rgba(34,197,94,0.4)]' 
                        : 'bg-gradient-to-r from-iron-900 via-blood-900 to-iron-900 text-parchment-100 hover:shadow-[0_0_30px_rgba(127,29,29,0.5)] hover:scale-[1.02]'}
                    `}
                  >
                    {/* Magical glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blood-600/0 via-blood-500/20 to-blood-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow"></div>
                    
                    {/* Button content */}
                    <div className="relative z-10 flex items-center gap-4">
                      {status === 'sending' ? (
                        <>
                          <div className="w-6 h-6 border-2 border-parchment-100/50 border-t-parchment-100 rounded-full animate-spin"></div>
                          <span>Активация магической связи...</span>
                        </>
                      ) : status === 'success' ? (
                        <>
                          <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
                          <span className="flex items-center gap-3">
                            <span>Контракт скреплён!</span>
                            <span className="text-2xl">⚡</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <Scroll size={24} className="transform group-hover:rotate-12 transition-transform duration-300" />
                          <span>Скрепить Контракт Кровью</span>
                          <Sword size={20} className="opacity-70" />
                        </>
                      )}
                    </div>
                    
                    {/* Particle effects */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blood-500/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-1 -left-1 w-5 h-3 bg-blood-500/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Privacy notice */}
                <div className="text-center pt-4 border-t border-iron-400/20">
                </div>
              </form>

              {/* Signatures area */}
              <div className="flex items-center justify-between pt-10 mt-8 border-t border-iron-400/40">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-[2px] bg-gradient-to-r from-iron-700 via-blood-600 to-transparent mb-3"></div>
                  <span className="font-display text-iron-900 text-sm uppercase tracking-widest">Подпись Призывателя</span>
                  <span className="font-serif text-iron-600 text-xs italic">(Мастер)</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-2 border-blood-600/50 rounded-full bg-gradient-to-br from-blood-600/10 to-blood-800/10 flex items-center justify-center mb-3 shadow-inner">
                  </div>
                  <span className="font-display text-iron-900 text-sm uppercase tracking-widest">Печать Творца</span>
                </div>
              </div>
            </div>
          </div>

          {/* Magical aura around scroll */}
          <div className="absolute inset-0 -z-10 translate-y-6 translate-x-3 scale-[1.04] rotate-[3deg]"></div>
        </div>

        {/* Add CSS for animations */}
        <style jsx global>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-slow-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 40s linear infinite;
          }
          .animate-spin-slow.reverse {
            animation: spin-slow-reverse 50s linear infinite;
          }
          @keyframes glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </section>
  );
};