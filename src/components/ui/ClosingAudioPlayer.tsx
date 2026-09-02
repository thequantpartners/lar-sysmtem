import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';

interface ClosingAudioPlayerProps {
  onAudioComplete?: () => void;
}

export const ClosingAudioPlayer: React.FC<ClosingAudioPlayerProps> = ({ onAudioComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio-section-4.mp3');
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
      if (onAudioComplete) onAudioComplete();
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
      if (currentTime >= duration) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback speech synthesis if audio file is still being produced
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(
              "Llegaste al paso final. Para este mes solo abrimos cinco cupos de desarrollo con Quant Partners. Selecciona tu plazo y modalidad de pago para congelar tu tarifa y coordinar conmigo en WhatsApp."
            );
            utterance.lang = 'es-ES';
            utterance.rate = 1.05;
            utterance.onend = () => {
              setIsPlaying(false);
              if (onAudioComplete) onAudioComplete();
            };
            setIsPlaying(true);
            window.speechSynthesis.speak(utterance);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (sec: number) => {
    const s = Math.floor(sec) % 60;
    return `0:${s < 10 ? '0' : ''}${s}`;
  };

  const bars = [25, 60, 90, 45, 80, 100, 75, 40, 85, 95, 60, 30, 70, 45, 85, 90];

  return (
    <div className="w-full card-luxury rounded-2xl p-2.5 px-3 border border-[#D4AF37]/30 flex items-center justify-between gap-2.5 shadow-lg bg-[#0A0C14]/90">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar nota de cierre' : 'Reproducir nota de cierre'}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#997A15] flex items-center justify-center text-[#030407] shadow-[0_0_12px_rgba(212,175,55,0.4)] shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-[#030407]" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-[#030407] ml-0.5" />
        )}
      </button>

      <div className="flex-1 flex flex-col gap-0.5 text-left cursor-pointer" onClick={togglePlay}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#F3E5AB] flex items-center gap-1 font-semibold">
            <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
            Quant Partners · Cierre
          </span>
          <span className="text-[9px] font-mono text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Mini waveform bars */}
        <div className="h-3 flex items-center justify-between gap-[2px] w-full pt-0.5">
          {bars.map((h, i) => {
            const isPassed = ((i / bars.length) * 100) <= progressPercent;
            return (
              <div
                key={i}
                style={{
                  height: `${isPlaying ? Math.max(25, h * (0.5 + Math.sin(currentTime * 8 + i) * 0.5)) : isPassed ? h * 0.7 : 30}%`,
                }}
                className={`w-[2.5px] rounded-full transition-all duration-150 ${
                  isPassed ? 'bg-gradient-to-t from-[#D4AF37] to-[#F3E5AB]' : 'bg-white/15'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
