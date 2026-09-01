import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScreenId } from '../../types/lar';

interface StoryHeaderProps {
  currentScreen: ScreenId;
  totalScreens?: number;
  onSelectScreen: (screen: ScreenId) => void;
  onPrevScreen?: () => void;
  onNextScreen?: () => void;
}

export const StoryHeader: React.FC<StoryHeaderProps> = ({
  currentScreen,
  totalScreens = 5,
  onSelectScreen,
  onPrevScreen,
  onNextScreen,
}) => {
  return (
    <header className="w-full px-4 pt-3 pb-1.5 flex flex-col gap-2 z-30 select-none bg-gradient-to-b from-[#030407] via-[#030407]/90 to-transparent">
      {/* 5 Segmented Interactive Micro-Bars */}
      <div className="w-full flex items-center gap-1.5 cursor-pointer">
        {Array.from({ length: totalScreens }).map((_, index) => {
          const stepNum = (index + 1) as ScreenId;
          const isCompleted = stepNum < currentScreen;
          const isActive = stepNum === currentScreen;

          return (
            <button
              key={index}
              onClick={() => onSelectScreen(stepNum)}
              className="h-1.5 flex-1 rounded-full bg-white/[0.08] hover:bg-white/[0.2] transition-all overflow-hidden relative group p-0 border-0"
              aria-label={`Ir a pantalla ${stepNum}`}
            >
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isCompleted
                    ? 'w-full bg-[#D4AF37]'
                    : isActive
                    ? 'w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                    : 'w-0'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Brand & HUD Control Row */}
      <div className="w-full flex items-center justify-between pt-0.5">
        {/* Left: Brand Identity / Back Button */}
        <div className="flex items-center gap-2">
          {currentScreen > 1 && onPrevScreen ? (
            <button
              onClick={onPrevScreen}
              className="flex items-center gap-1 text-slate-400 hover:text-[#F3E5AB] transition-colors py-0.5 pr-2 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] font-mono tracking-wider uppercase">Atrás</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
              <span className="text-[11px] font-medium tracking-wider text-slate-200 uppercase font-mono">
                Kenneth Ryzen <span className="text-slate-500 font-light">•</span> <span className="text-[#D4AF37]">LAR</span>
              </span>
            </div>
          )}
        </div>

        {/* Right: Step Indicator + Quick Next Chevron */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full text-[10px] font-mono">
            <span className="text-[#F3E5AB] font-bold">0{currentScreen}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">0{totalScreens}</span>
          </div>

          {currentScreen < totalScreens && onNextScreen && (
            <button
              onClick={onNextScreen}
              className="p-1 rounded-full bg-white/[0.04] hover:bg-[#D4AF37]/20 border border-white/[0.08] text-slate-400 hover:text-[#D4AF37] transition-all"
              aria-label="Siguiente pantalla"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
