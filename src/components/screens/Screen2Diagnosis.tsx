import React, { useState } from 'react';
import { Flame, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IncomingCallCard } from '../ui/IncomingCallCard';
import { SwipeButton } from '../ui/SwipeButton';

interface Screen2Props {
  onAdvance: () => void;
}

export const Screen2Diagnosis: React.FC<Screen2Props> = ({ onAdvance }) => {
  const [isCallCompleted, setIsCallCompleted] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-5 pt-8 pb-6 select-none h-full">
      {/* Top Header */}
      <div className="flex flex-col items-center gap-1.5 max-w-[360px]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-widest text-[#F3E5AB] border border-[#D4AF37]/40 rounded-full uppercase bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Auditoría Estratégica 1:1</span>
        </div>

        <h2 className="font-serif text-[23px] leading-[1.2] font-medium text-white tracking-tight mt-1">
          El scroll infinito dispersa el valor. <br />
          La experiencia LAR <span className="text-gold-gradient italic font-semibold">gobierna la decisión</span>.
        </h2>

        <p className="text-[12px] text-slate-300 font-light leading-relaxed max-w-[330px]">
          Escucha el diagnóstico de Quant Partners sobre cómo estructurar la atención de tu oferta de alto ticket:
        </p>
      </div>

      {/* Center Interactive Incoming Call */}
      <div className="my-auto w-full flex justify-center py-2">
        <IncomingCallCard onCallCompleted={() => setIsCallCompleted(true)} />
      </div>

      {/* Bottom Gateway: ONLY visible once the incoming call finishes */}
      <div className="w-full min-h-[58px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isCallCompleted ? (
            <motion.div
              key="swipe-btn"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="w-full"
            >
              <SwipeButton
                label="Desliza para conocer el mecanismo LAR"
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
              <span>Atiende la llamada para desbloquear</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
