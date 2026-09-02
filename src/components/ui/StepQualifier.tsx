import React, { useState } from 'react';
import { ArrowRight, Zap, MessageCircle, Tag, Lock, Unlock } from 'lucide-react';
import { trackPixelEvent } from '../../utils/pixel';

interface StepQualifierProps {
  isUnlocked?: boolean;
  audioProgress?: number;
}

export const StepQualifier: React.FC<StepQualifierProps> = ({
  isUnlocked = false,
  audioProgress = 0,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const pricingOptions = [
    {
      id: 'full',
      title: '🔥 Pago Único: S/ 1,000 PEN ($300 USD)',
      desc: 'Ahorras S/ 2,000 PEN del precio regular de S/ 3,000 PEN',
      badge: 'Mayor Ahorro',
      highlight: true,
    },
    {
      id: 'split',
      title: '⚡ Separar con 50%: S/ 500 PEN hoy',
      desc: 'Congela la tarifa y abona los S/ 500 restantes al recibir el sistema',
      badge: 'Flexibilidad',
      highlight: false,
    },
  ];

  const handleSelectPricing = (planTitle: string) => {
    if (!isUnlocked) return;
    setSelectedPlan(planTitle);

    // Track Meta Pixel Conversion Events
    trackPixelEvent('InitiateCheckout', {
      content_name: 'Seleccion de Oferta LAR',
      currency: 'USD',
      value: 300,
      plan: planTitle,
    });

    // Confetti effect
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#F3E5AB', '#10B981', '#FFFFFF'],
      });
    });

    setIsConfirmed(true);
  };

  const handleOpenWhatsApp = () => {
    trackPixelEvent('Lead', {
      content_name: 'Reserva WhatsApp LAR',
      currency: 'USD',
      value: 300,
      plan: selectedPlan,
    });
    trackPixelEvent('Contact', {
      currency: 'USD',
      value: 300,
    });

    const isSplit = selectedPlan.includes('50%');
    const text = isSplit
      ? `Hola Kenneth! Acabo de escuchar la auditoría y quiero congelar mi cupo para el Sistema LAR con la modalidad del 50% (S/ 500 PEN hoy + S/ 500 al entregar).\n\n• Tarifa Promocional: S/ 1,000 PEN ($300 USD) en lugar de S/ 3,000 PEN.\n\n¿Cómo coordinamos los detalles para iniciar el desarrollo?`
      : `Hola Kenneth! Acabo de escuchar la auditoría y quiero asegurar mi cupo para el Sistema LAR con Pago Único promocional de S/ 1,000 PEN ($300 USD).\n\n• Descuento Aplicado: Ahorro de S/ 2,000 PEN del precio regular.\n\n¿Cuáles son los pasos para agendar la sesión de arquitectura privada?`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      {!isConfirmed ? (
        /* PANTALLA DE SELECCIÓN DIRECTA (1 SOLO CLIC) */
        <div className="flex flex-col gap-2 animate-fadeIn h-full justify-between">
          <div>
            {/* Header: Estado de Desbloqueo */}
            {!isUnlocked ? (
              <div className="w-full bg-[#030407]/90 border border-[#D4AF37]/35 rounded-xl p-2 flex flex-col gap-1 shadow-[0_0_18px_rgba(212,175,55,0.12)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F3E5AB] font-semibold">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                    <span>Desbloqueando tarifa oficial...</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#D4AF37] font-bold">{audioProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${Math.max(5, audioProgress)}%` }}
                  />
                </div>
                <span className="text-[8.5px] text-slate-400 font-mono text-left">
                  Escucha el audio de cierre para habilitar tu tarifa promocional
                </span>
              </div>
            ) : (
              <div className="w-full bg-emerald-950/40 border border-emerald-500/40 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-emerald-400 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold">
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Tarifa Especial y Cupos Desbloqueados! ✓</span>
                </div>
                <span className="text-[8.5px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase">
                  Activo
                </span>
              </div>
            )}

            {/* Anclaje de Precio Visual */}
            <div className="bg-gradient-to-br from-[#D4AF37]/15 via-[#0A0C14] to-[#0A0C14] border border-[#D4AF37]/40 rounded-xl p-2.5 text-left mt-2 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] font-mono text-slate-400 uppercase">Tarifa Regular:</span>
                  <div className="text-xs font-mono text-slate-500 line-through">S/ 3,000 PEN ($850 USD)</div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-[#F3E5AB] font-semibold uppercase bg-[#D4AF37]/20 px-2 py-0.5 rounded-full">
                    Lanzamiento
                  </span>
                  <div className="text-base font-mono font-bold text-[#F3E5AB] mt-0.5">
                    S/ 1,000 PEN <span className="text-xs font-normal text-slate-300">($300 USD)</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 font-light text-left mt-2">
              Toca tu modalidad preferida para congelar tu cupo:
            </p>
          </div>

          {/* Opciones de Selección Directa (1 Clic) */}
          <div className="flex flex-col gap-2 pb-1">
            {pricingOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectPricing(item.title)}
                disabled={!isUnlocked}
                aria-label={`Seleccionar modalidad: ${item.title}`}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                  isUnlocked
                    ? item.highlight
                      ? 'bg-gradient-to-r from-[#D4AF37]/15 to-[#0A0C14] border-[#D4AF37]/50 hover:border-[#D4AF37] hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-lg'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] hover:border-white/20 active:scale-[0.98] cursor-pointer shadow-md'
                    : 'bg-white/[0.01] border-white/[0.05] opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${isUnlocked ? 'text-white group-hover:text-[#F3E5AB]' : 'text-slate-400'}`}>
                      {item.title}
                    </span>
                  </div>
                  <div className="text-[9.5px] text-slate-400 font-light mt-0.5">
                    {item.desc}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="text-[8.5px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded-full uppercase hidden sm:inline-block">
                    {item.badge}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-all ${isUnlocked ? 'text-slate-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5' : 'text-slate-600'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* PANTALLA DE ÉXITO Y CONFIRMACIÓN A WHATSAPP */
        <div className="flex flex-col items-center text-center justify-between h-full py-1 animate-fadeIn">
          <div className="flex flex-col items-center">
            {/* Offer Confirmed Badge */}
            <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#D4AF37] via-emerald-400 to-[#0A0C14] p-[1.5px] mb-1.5 shadow-[0_0_25px_rgba(212,175,55,0.45)]">
              <div className="w-full h-full rounded-full bg-[#0A0C14] flex items-center justify-center text-[#F3E5AB]">
                <Tag className="w-6 h-6 text-[#F3E5AB] animate-pulse" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1 text-[9px] font-mono uppercase text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-2.5 py-0.5 rounded-full mb-1">
              <Zap className="w-2.5 h-2.5 fill-[#D4AF37]" /> Cupo Promocional Bloqueado ✓
            </div>

            <h3 className="font-serif text-[17px] font-semibold text-white tracking-tight">
              Oferta Asegurada a S/ 1,000 PEN
            </h3>

            <p className="text-[10.5px] text-slate-300 font-light mt-0.5 max-w-[290px] leading-tight">
              Toca el botón debajo para abrir WhatsApp con Quant Partners y coordinar tu entrega.
            </p>

            {/* Summary Box */}
            <div className="w-full bg-[#030407]/90 border border-[#D4AF37]/30 rounded-xl p-2.5 mt-2.5 text-left space-y-1 shadow-inner">
              <div className="text-[9px] font-mono text-slate-400 uppercase">Resumen de tu Elección:</div>
              <div className="text-[11px] text-[#F3E5AB] font-semibold truncate">✓ {selectedPlan}</div>
              <div className="text-[9.5px] text-slate-400 font-mono">✓ Tarifa promocional congelada por orden de llegada</div>
            </div>
          </div>

          {/* Giant WhatsApp Action Button */}
          <div className="w-full mt-2">
            <button
              onClick={handleOpenWhatsApp}
              aria-label="Reclamar oferta y abrir chat de WhatsApp con Quant Partners"
              className="w-full h-12 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 hover:from-emerald-400 hover:to-teal-600 text-white font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.7)] active:scale-98 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Reclamar Oferta en WhatsApp</span>
            </button>
            <p className="text-[8.5px] font-mono text-slate-400 mt-1">
              Mensaje prellenado • Confirmación inmediata 1 a 1 con Kenneth
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


