import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronsRight, Check } from 'lucide-react';

interface SwipeButtonProps {
  label: string;
  onSwipeComplete: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  highlightEntrance?: boolean;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({
  label,
  onSwipeComplete,
  icon,
  disabled = false,
  highlightEntrance = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(220);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const x = useMotionValue(0);

  const THUMB_WIDTH = 50;

  useEffect(() => {
    // Reset state on remount
    setIsUnlocked(false);
    x.set(0);

    const updateMaxDrag = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setMaxDrag(Math.max(60, width - THUMB_WIDTH - 8));
      }
    };

    updateMaxDrag();
    window.addEventListener('resize', updateMaxDrag);

    // Initial nudge animation to show it's swipeable / clickable!
    if (highlightEntrance) {
      const timeout = setTimeout(() => {
        animate(x, [0, 22, 0, 14, 0], {
          duration: 1.2,
          ease: 'easeInOut',
          times: [0, 0.3, 0.6, 0.8, 1],
        });
      }, 400);
      return () => clearTimeout(timeout);
    }

    return () => window.removeEventListener('resize', updateMaxDrag);
  }, [label, highlightEntrance]);

  const textOpacity = useTransform(x, [0, maxDrag * 0.6], [1, 0.1]);
  const fillProgress = useTransform(x, [0, maxDrag], ['0%', '100%']);

  const triggerComplete = () => {
    if (disabled || isUnlocked) return;
    setIsUnlocked(true);
    setTimeout(() => {
      onSwipeComplete();
    }, 150);
  };

  const handleDragEnd = () => {
    if (disabled || isUnlocked) return;

    const currentX = x.get();
    if (currentX >= maxDrag * 0.55) {
      animate(x, maxDrag, {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      });
      triggerComplete();
    } else {
      animate(x, 0, {
        type: 'spring',
        stiffness: 500,
        damping: 35,
      });
    }
  };

  const handleTrackClick = () => {
    if (disabled || isUnlocked) return;
    animate(x, maxDrag, {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    });
    triggerComplete();
  };

  return (
    <motion.div
      ref={containerRef}
      onClick={handleTrackClick}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`w-full h-14 rounded-full relative overflow-hidden flex items-center p-1 select-none transition-all cursor-pointer ${
        disabled
          ? 'opacity-40 pointer-events-none bg-white/[0.02] border border-white/[0.05]'
          : 'bg-[#0A0C14] border border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]'
      }`}
    >
      {/* Moving Shimmer Light Sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        <div 
          className="absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shimmer pointer-events-none" 
        />
      </div>

      {/* Background Gold Drag Fill */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#D4AF37]/25 via-[#D4AF37]/40 to-[#D4AF37]/60 pointer-events-none rounded-full"
        style={{ width: fillProgress }}
      />

      {/* Shimmering Centered Text Label */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none pl-12 pr-4"
      >
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-slate-100 font-semibold drop-shadow-md">
          <span className="truncate">{label}</span>
          <div className="flex items-center -space-x-1 text-[#F3E5AB]">
            <ChevronsRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Draggable Gold Pill Thumb with Aura Ring */}
      <motion.div
        drag={disabled || isUnlocked ? false : 'x'}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        onClick={(e) => {
          e.stopPropagation();
          handleTrackClick();
        }}
        className="w-[48px] h-[46px] rounded-full bg-gradient-to-br from-[#FFF2B2] via-[#D4AF37] to-[#8C6D0D] flex items-center justify-center text-[#030407] font-bold shadow-[0_0_20px_rgba(212,175,55,0.7),inset_0_2px_2px_rgba(255,255,255,0.7)] cursor-grab active:cursor-grabbing z-20 shrink-0 relative"
      >
        {/* Pulsing ring around thumb */}
        <span className="absolute -inset-1 rounded-full bg-[#D4AF37]/30 blur-xs animate-ping pointer-events-none opacity-60" />

        {isUnlocked ? (
          <Check className="w-5 h-5 text-[#030407] stroke-[3]" />
        ) : icon ? (
          icon
        ) : (
          <ChevronsRight className="w-5 h-5 text-[#030407] stroke-[2.8]" />
        )}
      </motion.div>
    </motion.div>
  );
};
