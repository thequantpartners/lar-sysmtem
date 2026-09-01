import React from 'react';
import { CalendarCheck, ShieldCheck } from 'lucide-react';
import { StepQualifier } from '../ui/StepQualifier';

export const Screen5Booking: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-5 pt-8 pb-6 select-none h-full">
      {/* Top Header */}
      <div className="flex flex-col items-center gap-2 max-w-[360px]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-widest text-[#F3E5AB] border border-[#D4AF37]/40 rounded-full uppercase bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <CalendarCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Fase Final: Diagnóstico Privado</span>
        </div>

        <h2 className="font-serif text-[23px] leading-[1.2] font-medium text-white tracking-tight mt-1">
          Auditoría de Conversión con <br />
          <span className="text-gold-gradient italic font-semibold">Kenneth Ryzen</span>
        </h2>

        <p className="text-[12px] text-slate-300 font-light leading-relaxed max-w-[320px]">
          Precalifica en 2 pasos para acceder a la agenda estratégica de implementación:
        </p>
      </div>

      {/* Main Qualifier Container */}
      <div className="card-luxury rounded-3xl p-4 my-auto w-full flex-1 max-h-[370px] flex flex-col border border-white/[0.1] shadow-2xl">
        <StepQualifier />
      </div>

      {/* Footer Security Badges */}
      <div className="w-full pt-2 flex items-center justify-center text-[10px] font-mono text-slate-500 border-t border-white/[0.05]">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          Sesión 1 a 1 sin compromiso de compra
        </span>
      </div>
    </div>
  );
};
