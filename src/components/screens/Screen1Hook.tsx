import React, { useState } from 'react';
import { Sparkles, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AvatarAudioHookCard } from '../ui/AvatarAudioHookCard';
import { SwipeButton } from '../ui/SwipeButton';

interface Screen1Props {
  onAdvance: () => void;
}

export const Screen1Hook: React.FC<Screen1Props> = ({ onAdvance }) => {
  const [isAudioEnded, setIsAudioEnded] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-5 pt-8 pb-6 select-none h-full">
      {/* Top Header / Disruptive ICP Callout */}
      <div className="flex flex-col items-center gap-1.5 max-w-[360px]">
        {/* Category Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[9.5px] font-mono tracking-widest text-[#F3E5AB] border border-[#D4AF37]/40 rounded-full uppercase bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>Exclusivo: Coaches & Infoproductores</span>
        </div>

        {/* High-Impact Centered Headline mentioning ICP directly */}
        <h1 className="font-serif text-[22px] sm:text-[23.5px] leading-[1.2] font-medium text-white tracking-tight mt-1">
          Si eres Coach o Infoproductor, este sistema <br />
          retiene el valor que tus <span className="text-gold-gradient italic font-semibold">landings tradicionales pierden</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-[11.5px] text-slate-300 font-light leading-relaxed max-w-[330px]">
          Los embudos de scroll infinito saturan a tus prospectos. La <strong className="text-[#F3E5AB] font-medium">Arquitectura LAR</strong> gobierna la atención por compuertas para convertir visitas en clientes de alto valor.
        </p>
      </div>

      {/* Center Avatar Image with Audio Recorder Hook */}
      <div className="my-auto py-2 w-full flex justify-center">
        <AvatarAudioHookCard onAudioComplete={() => setIsAudioEnded(true)} />
      </div>

      {/* Bottom Gateway: ONLY visible once the audio finishes */}
      <div className="w-full min-h-[58px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isAudioEnded ? (
            <motion.div
              key="swipe-btn"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="w-full"
            >
              <SwipeButton
                label="Desliza para auditar tu sistema"
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
              <span>Escucha el audio para desbloquear</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

