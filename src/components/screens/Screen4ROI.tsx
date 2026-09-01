import React, { useState } from 'react';
import { BarChart3, Lock, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeButton } from '../ui/SwipeButton';

interface Screen4Props {
  onAdvance: () => void;
}

export const Screen4ROI: React.FC<Screen4Props> = ({ onAdvance }) => {
  const [selectedSpend, setSelectedSpend] = useState<number | null>(null);

  const tiers = [
    { label: '$1K/mes', spend: 1000, waste: '$850', larAgendas: '+8 agendas', roas: '2.8x' },
    { label: '$3K/mes', spend: 3000, waste: '$2,550', larAgendas: '+24 agendas', roas: '3.4x' },
    { label: '$5K/mes', spend: 5000, waste: '$4,250', larAgendas: '+42 agendas', roas: '4.1x' },
    { label: '$10K+/mes', spend: 10000, waste: '$8,500', larAgendas: '+85 agendas', roas: '4.8x' },
  ];

  const currentTier = tiers.find((t) => t.spend === selectedSpend) || tiers[1];

  const handleSelect = (spend: number) => {
    setSelectedSpend(spend);
  };

  const hasInteracted = selectedSpend !== null;

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-5 pt-8 pb-6 select-none h-full">
      {/* Top Header */}
      <div className="flex flex-col items-center gap-2 max-w-[360px]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-widest text-[#F3E5AB] border border-[#D4AF37]/40 rounded-full uppercase bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Simulador de Retorno</span>
        </div>

        <h2 className="font-serif text-[23px] leading-[1.2] font-medium text-white tracking-tight mt-1">
          Simula el impacto en tu <br />
          <span className="text-gold-gradient italic font-semibold">Inversión Publicitaria</span>.
        </h2>

        <p className="text-[12px] text-slate-300 font-light leading-relaxed max-w-[320px]">
          Selecciona tu presupuesto mensual aproximado en Meta/YouTube Ads:
        </p>
      </div>

      {/* Simulator Interactive Buttons */}
      <div className="flex flex-col gap-3 my-auto w-full">
        {/* Tier Selector Buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {tiers.map((t) => {
            const isSelected = selectedSpend === t.spend;
            return (
              <button
                key={t.spend}
                onClick={() => handleSelect(t.spend)}
                className={`py-2 px-1 rounded-xl text-[10.5px] font-mono tracking-tight transition-all border ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#030407] font-bold border-[#F3E5AB] shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105'
                    : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:border-white/20'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Calculation Bento Display */}
        <div className="card-luxury rounded-2xl p-3.5 border border-white/[0.08] text-left">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase text-slate-400">Proyección Estimada:</span>
            <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
              Inversión: {currentTier.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2.5">
            {/* Waste with old funnels */}
            <div className="bg-red-950/30 border border-red-500/25 p-2 rounded-xl">
              <div className="flex items-center gap-1 text-[9px] font-mono text-red-400 uppercase">
                <AlertTriangle className="w-3 h-3 text-red-400" /> Fuga en Scroll
              </div>
              <div className="text-sm font-mono font-bold text-red-300 mt-1">
                {currentTier.waste}
              </div>
              <div className="text-[8.5px] text-slate-400 mt-0.5">quemados en rebotes</div>
            </div>

            {/* Gain with LAR */}
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/35 p-2 rounded-xl">
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#F3E5AB] uppercase">
                <TrendingUp className="w-3 h-3 text-[#D4AF37]" /> Con Sistema LAR
              </div>
              <div className="text-sm font-mono font-bold text-[#F3E5AB] mt-1">
                {currentTier.larAgendas}
              </div>
              <div className="text-[8.5px] text-slate-400 mt-0.5">calificadas por mes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gateway: ONLY visible once the user selects their tier */}
      <div className="w-full min-h-[58px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hasInteracted ? (
            <motion.div
              key="swipe-btn"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="w-full"
            >
              <SwipeButton
                label="Desliza para postular a sistema LAR"
                onSwipeComplete={onAdvance}
              />
            </motion.div>
          ) : (
            <motion.div
              key="locked-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 text-[11px] font-mono"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>Selecciona tu rango de inversión para desbloquear</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
