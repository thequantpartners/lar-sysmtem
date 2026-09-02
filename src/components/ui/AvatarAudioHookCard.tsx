import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AvatarAudioHookCardProps {
  onAudioComplete: () => void;
}

export const AvatarAudioHookCard: React.FC<AvatarAudioHookCardProps> = ({ onAudioComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio-section-1.mp3');
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.ceil(audio.duration));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsCompleted(true);
      onAudioComplete();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onAudioComplete]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (isCompleted || currentTime >= duration) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setIsCompleted(false);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (sec: number) => {
    const s = Math.floor(sec) % 60;
    const m = Math.floor(sec / 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Waveform bars
  const bars = [18, 35, 60, 85, 45, 95, 70, 40, 80, 100, 75, 50, 90, 65, 40, 85, 95, 55, 75, 40, 60, 30];

  return (
    <div className="w-full max-w-[340px] aspect-[9/12] sm:aspect-[9/12.5] max-h-[370px] rounded-[28px] relative overflow-hidden border border-[#D4AF37]/35 shadow-[0_0_35px_rgba(212,175,55,0.18)] flex flex-col justify-between p-3.5 select-none group">
      {/* Background Avatar Image with luxury filter (Ultra-optimized WebP) */}
      <img
        src="/avatar-kenneth.webp"
        alt="Quant Partners"
        width={720}
        height={960}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
      />

      {/* Cinematic Obsidian Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-[#030407]/40 to-[#030407]/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[#D4AF37]/[0.03] mix-blend-overlay pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030407]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[9.5px] font-mono text-[#F3E5AB] shadow-lg">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#D4AF37] animate-ping' : 'bg-emerald-400'}`} />
          <span>Quant Partners</span>
        </div>

        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#030407]/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
          <Volume2 className="w-3 h-3 text-[#D4AF37]" />
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
      </div>

      {/* Center Voice Play Button */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        {!isPlaying && currentTime === 0 && (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={togglePlay}
            aria-label="Reproducir mensaje de audio de Quant Partners"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#997A15] flex items-center justify-center text-[#030407] shadow-[0_0_25px_rgba(212,175,55,0.6)] cursor-pointer"
          >
            <Play className="w-7 h-7 fill-[#030407] ml-1" />
          </motion.button>
        )}
      </div>

      {/* Bottom Voice Recorder Box */}
      <div className="relative z-10 w-full backdrop-blur-xl bg-[#0A0C14]/85 rounded-2xl p-3 border border-white/[0.12] shadow-2xl flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-[#F3E5AB]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-semibold text-white tracking-tight">
                Diagnóstico de Retención
              </span>
              <span className="text-[9.5px] text-slate-400 font-mono">
                {isPlaying ? 'Reproduciendo audio...' : isCompleted ? 'Completado ✓' : 'Toca para escuchar'}
              </span>
            </div>
          </div>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar audio de diagnóstico' : 'Reproducir audio de diagnóstico'}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] flex items-center justify-center text-[#030407] shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-[#030407]" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-[#030407] ml-0.5" />
            )}
          </button>
        </div>

        {/* Dynamic Equalizer Bars */}
        <div
          onClick={togglePlay}
          className="w-full h-6 flex items-center justify-between gap-[2px] cursor-pointer pt-1 px-1"
        >
          {bars.map((height, i) => {
            const barProgress = (i / bars.length) * 100;
            const isPassed = barProgress <= progressPercent;

            return (
              <div
                key={i}
                style={{
                  height: `${
                    isPlaying
                      ? Math.max(20, height * (0.5 + Math.sin(currentTime * 8 + i) * 0.5))
                      : isPassed
                      ? height * 0.7
                      : 25
                  }%`,
                }}
                className={`w-[3px] rounded-full transition-all duration-150 ${
                  isPassed
                    ? 'bg-gradient-to-t from-[#D4AF37] to-[#F3E5AB]'
                    : 'bg-white/20'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
