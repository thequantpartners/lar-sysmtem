import React from 'react';

interface MobileViewportProps {
  children: React.ReactNode;
}

export const MobileViewport: React.FC<MobileViewportProps> = ({ children }) => {
  return (
    <div className="w-full h-[100dvh] bg-[#030407] flex items-center justify-center relative overflow-hidden">
      {/* Desktop Luxury Ambient Backdrop */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Gold Ambient Orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-[160px]" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Brand Title in desktop background */}
        <div className="absolute top-10 left-12 flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase">LAR Framework v2.0</span>
          <span className="font-serif text-slate-400 text-sm tracking-wide">High Retention Conversion Architecture</span>
        </div>
        
        <div className="absolute bottom-10 right-12 text-right">
          <span className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">Architecture: Kenneth Ryzen</span>
        </div>
      </div>

      {/* 100% Mobile Viewport Container (App-Like Canvas) */}
      <main className="w-full h-full md:w-[420px] md:h-[92dvh] md:max-h-[890px] md:rounded-[40px] md:border md:border-white/[0.08] md:shadow-[0_0_60px_-15px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(212,175,55,0.06)] bg-[#030407] relative overflow-hidden flex flex-col justify-between">
        {/* Subtle inner top glow inside mobile canvas */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#D4AF37]/[0.04] to-transparent pointer-events-none z-10" />

        {/* Device frame speaker/camera aesthetic on desktop */}
        <div className="hidden md:flex justify-center pt-2.5 pb-1 relative z-30">
          <div className="w-20 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Children content area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden relative z-20">
          {children}
        </div>

        {/* Device home bar indicator on desktop/mobile */}
        <div className="w-full flex justify-center pb-2 pt-1 relative z-30 pointer-events-none">
          <div className="w-32 h-1 bg-white/15 rounded-full" />
        </div>
      </main>
    </div>
  );
};
