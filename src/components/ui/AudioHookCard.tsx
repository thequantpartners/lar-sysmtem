import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioHookCardProps {
  onAudioComplete?: () => void;
}

export const AudioHookCard: React.FC<AudioHookCardProps> = ({ onAudioComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const DURATION = 38; // 38s voice note hook

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= DURATION) {
            setIsPlaying(false);
            if (onAudioComplete) onAudioComplete();
            return DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onAudioComplete]);

  const togglePlay = () => {
    if (seconds >= DURATION) {
      setSeconds(0);
    }
    setIsPlaying(!isPlaying);
  };

  const progressPercent = (seconds / DURATION) * 100;
  const formatTime = (sec: number) => {
    const s = sec % 60;
    return `0:${s < 10 ? '0' : ''}${s}`;
  };

  // Waveform heights
  const bars = [14, 28, 45, 60, 35, 80, 50, 90, 70, 40, 85, 95, 65, 45, 80, 55, 90, 40, 75, 50, 30, 60, 40, 20];

  return (
    <div className="w-full card-luxury rounded-2xl p-3.5 flex flex-col gap-3 relative overflow-hidden border border-white/[0.08] group hover:border-[#D4AF37]/30 transition-all">
      {/* Background subtle audio pulse */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-30'}`} />

      {/* Header with Creator Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#0A0C14] p-[1px] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0A0C14] flex items-center justify-center text-[11px] font-mono font-bold text-[#F3E5AB]">
                KR
              </div>
            </div>
            {isPlaying && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-2 ring-[#030407] animate-ping" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white tracking-tight">Kenneth Ryzen</span>
              <span className="text-[9px] font-mono uppercase bg-[#D4AF37]/15 text-[#F3E5AB] px-1.5 py-0.2 rounded border border-[#D4AF37]/30">
                Audio Hook
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-light">
              Por qué el scroll tradicional quema tu ROAS
            </span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-full">
          {formatTime(seconds)} / 0:{DURATION}
        </div>
      </div>

      {/* Waveform Player & Play Button */}
      <div className="flex items-center gap-3 bg-black/40 rounded-xl p-2 px-2.5 border border-white/[0.04]">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#997A15] flex items-center justify-center text-[#030407] shadow-[0_2px_12px_rgba(212,175,55,0.35)] shrink-0 hover:scale-105 active:scale-95 transition-transform"
          aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-[#030407] text-[#030407]" />
          ) : (
            <Play className="w-4 h-4 fill-[#030407] text-[#030407] ml-0.5" />
          )}
        </button>

        {/* Dynamic Waveform Bars */}
        <div 
          onClick={togglePlay}
          className="flex-1 h-8 flex items-center justify-between gap-[2px] cursor-pointer py-1"
        >
          {bars.map((height, i) => {
            const barProgress = (i / bars.length) * 100;
            const isPassed = barProgress <= progressPercent;

            return (
              <div
                key={i}
                style={{
                  height: `${isPlaying ? Math.max(15, (height * (0.6 + Math.sin((seconds * 4) + i) * 0.4))) : height * 0.5}%`,
                }}
                className={`w-[3px] rounded-full transition-all duration-150 ${
                  isPassed
                    ? 'bg-gradient-to-t from-[#D4AF37] to-[#F3E5AB]'
                    : 'bg-white/15'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
