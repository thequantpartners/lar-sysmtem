import React, { useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { StepQualifier } from '../ui/StepQualifier';
import { ClosingAudioPlayer } from '../ui/ClosingAudioPlayer';

export const Screen4Booking: React.FC = () => {
  const [audioProgress, setAudioProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleAudioProgress = (percent: number, completed: boolean) => {
    setAudioProgress(percent);
    if (completed && !isUnlocked) {
      setIsUnlocked(true);
    }
  };

  const handleAudioComplete = () => {
    setAudioProgress(100);
    setIsUnlocked(true);
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-4 pt-5 pb-3 select-none h-full overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col items-center gap-0.5 max-w-[360px] shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 text-[9px] font-mono tracking-widest text-[#F3E5AB] border border-[#D4AF37]/40 rounded-full uppercase bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
          <span>Sesión de Arquitectura Privada</span>
        </div>

        <h2 className="font-serif text-[19px] sm:text-[20.5px] leading-[1.2] font-medium text-white tracking-tight mt-0.5">
          Diseñemos el Sistema LAR <br />
          para <span className="text-gold-gradient italic font-semibold">tu Oferta de Alto Valor</span>.
        </h2>
      </div>

      {/* Audio Player for Closing / Booking */}
      <div className="w-full my-1 shrink-0">
        <ClosingAudioPlayer
          onProgress={handleAudioProgress}
          onAudioComplete={handleAudioComplete}
        />
      </div>

      {/* Main Qualifier Container */}
      <div className="card-luxury rounded-2xl p-3 w-full flex-1 max-h-[360px] flex flex-col justify-between border border-white/[0.1] shadow-2xl overflow-hidden relative">
        <StepQualifier isUnlocked={isUnlocked} audioProgress={audioProgress} />
      </div>

      {/* Footer Security Badges */}
      <div className="w-full pt-1 flex items-center justify-center text-[9px] font-mono text-slate-500 border-t border-white/[0.05] shrink-0">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
          Sesión de Consultoría Técnica 1 a 1 · Quant Partners
        </span>
      </div>
    </div>
  );
};

