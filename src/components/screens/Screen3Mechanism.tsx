import React, { useState } from 'react';
import { Cpu, Lock, Unlock, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeButton } from '../ui/SwipeButton';

interface Screen3Props {
  onAdvance: () => void;
}

export const Screen3Mechanism: React.FC<Screen3Props> = ({ onAdvance }) => {
  const [unlockedPillars, setUnlockedPillars] = useState<number[]>([1]); // Start with 1st unlocked to teach mechanic

  const pillars = [
    {
      id: 1,
      num: '01',
      icon: <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />,
      title: 'Attention Gateways (Compuertas)',
      desc: 'El usuario avanza sólo tras interactuar físicamente, garantizando que el 100% del pitch sea asimilado.',
    },
    {
      id: 2,
      num: '02',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />,
      title: 'Obsidian Precision UX (Ultra-Lujo)',
      desc: 'Estética editorial oscura que destruye la percepción de plantilla barata y justifica tickets de $1,500 - $5,000+.',
    },
    {
      id: 3,
      num: '03',
      icon: <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />,
      title: 'Algorithmic Qualifier (Filtro)',
      desc: 'Enrutamiento dinámico que filtra curiosos y envía prospectos de alto presupuesto directo a tu calendario.',
    },
  ];

  const handleTogglePillar = (id: number) => {
    if (!unlockedPillars.includes(id)) {
      setUnlockedPillars((prev) => [...prev, id]);
    }
  };

  const isAllUnlocked = unlockedPillars.length === 3;

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-5 pt-8 pb-6 select-none h-full">
      {/* Top Header */}
      <div className="flex flex-col items-center gap-2 max-w-[360px]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-widest text-[#F3E5AB] border border-[#D4AF37]/40 rounded-full uppercase bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>El Mecanismo Único</span>
        </div>

        <h2 className="font-serif text-[23px] leading-[1.2] font-medium text-white tracking-tight mt-1">
          No es una web. Es un <br />
          <span className="text-gold-gradient italic font-semibold">Motor de Conversión</span>.
        </h2>

        <p className="text-[12px] text-slate-300 font-light leading-relaxed max-w-[320px]">
          Toca cada uno de los 3 pilares para auditar la arquitectura y desbloquear el siguiente paso:
        </p>
      </div>

      {/* 3 Pillars List with Unlock Micro-Commitment */}
      <div className="flex flex-col gap-2.5 my-auto w-full">
        {pillars.map((p) => {
          const isUnlocked = unlockedPillars.includes(p.id);

          return (
            <motion.div
              key={p.id}
              onClick={() => handleTogglePillar(p.id)}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl p-3 flex items-start gap-3 border transition-all cursor-pointer text-left relative overflow-hidden ${
                isUnlocked
                  ? 'bg-[#0A0C14] border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(212,175,55,0.1)]'
                  : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
              }`}
            >
              {/* Pillar Left Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isUnlocked
                    ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB]'
                    : 'bg-white/[0.04] border border-white/[0.08] text-slate-500'
                }`}
              >
                {isUnlocked ? <Unlock className="w-4 h-4 text-[#D4AF37]" /> : <Lock className="w-4 h-4" />}
              </div>

              {/* Pillar Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xs font-semibold tracking-tight transition-colors ${
                      isUnlocked ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {p.title}
                  </h3>
                  <span className="text-[10px] font-mono text-[#D4AF37]/80 font-semibold">{p.num}</span>
                </div>

                <p className="text-[11px] text-slate-400 font-light leading-relaxed mt-0.5">
                  {isUnlocked ? p.desc : '🔒 Toca para auditar este pilar...'}
                </p>
              </div>

              {isUnlocked && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Progress Tracker */}
        <div className="flex items-center justify-between px-2 pt-1 text-[10px] font-mono text-slate-400">
          <span>Pilares auditados:</span>
          <span className="text-[#F3E5AB] font-bold">
            {unlockedPillars.length} / 3 {isAllUnlocked ? '✓ Completo' : ''}
          </span>
        </div>
      </div>

      {/* Bottom Gateway: ONLY visible once all 3 pillars are audited */}
      <div className="w-full min-h-[58px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isAllUnlocked ? (
            <motion.div
              key="swipe-btn"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="w-full"
            >
              <SwipeButton
                label="Desliza para ver la matemática y ROI"
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
              <span>Audita los 3 pilares para desbloquear</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
