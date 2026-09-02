import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, ShieldCheck, Cpu, Sparkles, Filter } from 'lucide-react';

interface MechanismAudioCardProps {
  onAudioComplete: () => void;
}

export const MechanismAudioCard: React.FC<MechanismAudioCardProps> = ({ onAudioComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(26);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio-section-3.mp3');
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
        console.error('Mechanism audio play error:', err);
      });
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (sec: number) => {
    const s = Math.floor(sec) % 60;
    const m = Math.floor(sec / 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const pillars = [
    {
      num: '01',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />,
      title: 'Compuertas Táctiles (Gateways)',
      desc: 'Micro-compromisos obligatorios que eliminan el 85% de rebote.',
    },
    {
      num: '02',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />,
      title: 'Obsidian UX (Ultra-Lujo)',
      desc: 'Estética editorial oscura que eleva el valor percibido.',
    },
    {
      num: '03',
      icon: <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />,
      title: 'Filtro a WhatsApp',
      desc: 'Canalización directa de prospectos listos para cerrar.',
    },
  ];

  // Equalizer bars
  const bars = [20, 45, 75, 90, 60, 100, 85, 40, 95, 70, 50, 85, 95, 65, 40, 80, 55, 90, 40, 70];

  return (
    <div className="w-full max-w-[340px] rounded-3xl bg-[#0A0C14] border border-[#D4AF37]/35 p-4 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden select-none group">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Audio Player Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#997A15] p-[1px] flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-xl bg-[#0A0C14] flex items-center justify-center text-[#F3E5AB]">
              <Cpu className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white tracking-tight">Quant Partners</span>
            <span className="text-[9.5px] text-[#F3E5AB] font-mono">El Vehículo LAR (Audio)</span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-full flex items-center gap-1">
          <Volume2 className="w-3 h-3 text-[#D4AF37]" />
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
      </div>

      {/* Audio Waveform & Big Play Button */}
      <div className="py-3 flex items-center gap-3 bg-black/40 rounded-2xl px-3 my-2 border border-white/[0.04]">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar explicación del mecanismo' : 'Reproducir explicación del mecanismo'}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#997A15] flex items-center justify-center text-[#030407] shadow-[0_0_20px_rgba(212,175,55,0.4)] shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-[#030407]" />
          ) : (
            <Play className="w-4 h-4 fill-[#030407] ml-0.5" />
          )}
        </button>

        <div
          onClick={togglePlay}
          className="flex-1 h-7 flex items-center justify-between gap-[2px] cursor-pointer"
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
                      ? Math.max(15, height * (0.5 + Math.sin(currentTime * 8 + i) * 0.5))
                      : isPassed
                      ? height * 0.65
                      : 25
                  }%`,
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

      {/* 3 Pillars List */}
      <div className="flex flex-col gap-1.5 pt-1 text-left">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]"
          >
            <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
              {p.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10.5px] font-semibold text-white tracking-tight">
                {p.title}
              </span>
              <span className="text-[9px] text-slate-400 font-light leading-tight">
                {p.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
