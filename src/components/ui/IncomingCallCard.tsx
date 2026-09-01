import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mic, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface IncomingCallCardProps {
  onCallCompleted: () => void;
}

export const IncomingCallCard: React.FC<IncomingCallCardProps> = ({ onCallCompleted }) => {
  const [callState, setCallState] = useState<'incoming' | 'connected' | 'ended'>('incoming');
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(25);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ringtoneIntervalRef = useRef<any>(null);

  // Play realistic synthesized phone ringtone using Web Audio API
  const playRingtoneBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(480, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } catch (e) {
      // Audio fallback
    }
  };

  const startRingtoneLoop = () => {
    playRingtoneBeep();
    ringtoneIntervalRef.current = setInterval(() => {
      playRingtoneBeep();
      setTimeout(() => playRingtoneBeep(), 200);
    }, 1800);
  };

  const stopRingtone = () => {
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (callState === 'incoming') {
      startRingtoneLoop();
    } else {
      stopRingtone();
    }
    return () => stopRingtone();
  }, [callState]);

  // Initialize audio element for section 2
  useEffect(() => {
    const audio = new Audio('/audio-section-2.mp3');
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setTotalDuration(Math.ceil(audio.duration));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setCallState('ended');
      onCallCompleted();
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
  }, [onCallCompleted]);

  const handleAnswer = () => {
    stopRingtone();
    setCallState('connected');

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error('Call audio playback error:', err);
      });
    }
  };

  const formatTimer = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `0${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const bars = [25, 60, 90, 45, 80, 100, 75, 40, 85, 95, 60, 30];

  return (
    <div className="w-full card-luxury rounded-3xl p-5 flex flex-col justify-between border border-white/[0.12] shadow-2xl relative overflow-hidden aspect-[9/10] max-h-[320px]">
      {/* Background Ambient Gold Glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

      {/* CALL HEADER */}
      <div className="flex flex-col items-center text-center pt-1">
        {/* Caller Avatar with Quant Partners Logo */}
        <div className="relative mb-3">
          {callState === 'incoming' && (
            <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/30 blur-md animate-ping pointer-events-none" />
          )}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#0A0C14] p-[2px] shadow-[0_0_25px_rgba(212,175,55,0.4)] overflow-hidden">
            <img
              src="/quant-logo.png"
              alt="Quant Partners"
              className="w-full h-full object-cover rounded-full bg-[#0A0C14]"
            />
          </div>
        </div>

        <h3 className="text-base font-semibold text-white tracking-tight">Quant Partners</h3>
        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
          {callState === 'incoming' && 'Llamada Estratégica Entrante...'}
          {callState === 'connected' && `En llamada privada • ${formatTimer(currentTime)} / ${formatTimer(totalDuration)}`}
          {callState === 'ended' && 'Diagnóstico Completado ✓'}
        </p>
      </div>

      {/* CENTER INTERACTIVE CONTENT */}
      <div className="my-auto w-full flex flex-col items-center justify-center py-1">
        {callState === 'incoming' && (
          <div className="text-[11px] text-[#F3E5AB] font-mono bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-3.5 py-1.5 rounded-full shadow-lg animate-pulse">
            Toca Contestar para escuchar la auditoría
          </div>
        )}

        {callState === 'connected' && (
          <div className="w-full flex flex-col items-center gap-2">
            {/* Live Audio Equalizer */}
            <div className="flex items-center justify-center gap-1.5 h-8 w-full max-w-[200px]">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: `${Math.max(20, h * (0.4 + Math.sin(currentTime * 8 + i) * 0.6))}%`,
                  }}
                  className="w-1.5 bg-gradient-to-t from-[#D4AF37] to-[#F3E5AB] rounded-full transition-all duration-150"
                />
              ))}
            </div>

            <p className="text-[11px] text-slate-300 font-light italic text-center max-w-[260px] line-clamp-2">
              "El scroll infinito destruye tu tasa de cierre. Reemplázalo por compuertas."
            </p>
          </div>
        )}

        {callState === 'ended' && (
          <div className="text-[11px] text-emerald-400 font-mono bg-emerald-950/50 border border-emerald-500/40 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            ✓ Diagnóstico Asimilado. Desbloqueado.
          </div>
        )}
      </div>

      {/* BOTTOM ACTION BUTTON: PULSING GLOW CALL BUTTON */}
      <div className="w-full flex items-center justify-center pb-1 pt-2 border-t border-white/[0.06]">
        {callState === 'incoming' ? (
          <div className="relative">
            {/* Outer expanding radar pulsing rings */}
            <span className="absolute -inset-2 rounded-full bg-emerald-500/40 blur-sm animate-ping pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-pulse pointer-events-none" />

            <motion.button
              onClick={handleAnswer}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.6)',
                  '0 0 35px rgba(16, 185, 129, 0.95)',
                  '0 0 20px rgba(16, 185, 129, 0.6)',
                ],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-[#030407] font-bold text-xs uppercase tracking-wider overflow-hidden group cursor-pointer"
            >
              {/* Shimmer light effect inside button */}
              <div className="absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 animate-shimmer pointer-events-none" />

              <motion.div
                animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Phone className="w-4 h-4 fill-[#030407]" />
              </motion.div>
              <span>Contestar Llamada</span>
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-5 text-slate-400 text-xs py-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F3E5AB]">
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Audio Activo</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <Mic className="w-4 h-4" />
              <span>Auditoría 1:1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
