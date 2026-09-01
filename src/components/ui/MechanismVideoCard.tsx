import React, { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface MechanismVideoCardProps {
  videoSrc?: string;
  onVideoEnded?: () => void;
}

export const MechanismVideoCard: React.FC<MechanismVideoCardProps> = ({
  videoSrc = '/video-mechanism.mp4',
  onVideoEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStartedInteractive, setHasStartedInteractive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Initial ambient preview loop on mount (silent)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const handleStartPitch = () => {
    if (!videoRef.current) return;

    if (!hasStartedInteractive) {
      // Intentional user click: start pitch from 0:00 with audio!
      setHasStartedInteractive(true);
      setIsMuted(false);
      videoRef.current.muted = false;
      videoRef.current.loop = false; // Disable loop so it triggers onEnded!
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    if (hasStartedInteractive) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      const currentProgress = (current / total) * 100;
      setProgress(currentProgress);

      if (currentProgress >= 98 && onVideoEnded) {
        setTimeout(() => onVideoEnded(), 50);
      }
    }
  };

  const handleEnded = () => {
    if (hasStartedInteractive) {
      setProgress(100);
      if (onVideoEnded) {
        setTimeout(() => onVideoEnded(), 50);
      }
    }
  };

  return (
    <div
      onClick={handleStartPitch}
      className="w-full max-w-[320px] mx-auto relative rounded-3xl overflow-hidden bg-[#0A0C14] border border-[#D4AF37]/35 shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.15)] cursor-pointer group select-none aspect-[16/11] flex items-center justify-center"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/80 via-transparent to-[#030407]/40 pointer-events-none" />

      {/* Floating Audio Controls (visible after starting) */}
      {hasStartedInteractive && (
        <div className="absolute top-3 right-3 pointer-events-none z-10">
          <button
            onClick={toggleMute}
            className="pointer-events-auto p-2 rounded-full bg-[#030407]/85 backdrop-blur-md border border-white/[0.15] text-slate-200 hover:text-[#D4AF37] transition-all hover:scale-105 active:scale-95 shadow-lg"
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
            )}
          </button>
        </div>
      )}

      {/* INITIAL STATE OVERLAY: Click to start with audio */}
      {!hasStartedInteractive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] z-20 p-4 text-center">
          {/* Animated Gold Play Button */}
          <div className="relative mb-3 group-hover:scale-110 transition-transform">
            <div className="absolute -inset-2 rounded-full bg-[#D4AF37]/35 blur-md animate-ping pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#997A15] flex items-center justify-center text-[#030407] shadow-[0_0_35px_rgba(212,175,55,0.85)] border border-white/40">
              <Play className="w-7 h-7 fill-[#030407] text-[#030407] ml-1" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#030407]/90 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-mono font-medium shadow-lg">
            <span>Toca para ver mecanismo con audio</span>
          </div>
        </div>
      )}

      {/* PAUSED STATE OVERLAY */}
      {hasStartedInteractive && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F3E5AB] to-[#D4AF37] flex items-center justify-center text-[#030407] shadow-[0_0_30px_rgba(212,175,55,0.7)]">
            <Play className="w-6 h-6 fill-[#030407] text-[#030407] ml-0.5" />
          </div>
        </div>
      )}

      {/* Real-time Video Bottom Progress Bar (Active once started) */}
      {hasStartedInteractive && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 pointer-events-none z-20 overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] transition-all duration-150 rounded-r-full shadow-[0_0_10px_#D4AF37]"
          />
        </div>
      )}
    </div>
  );
};
