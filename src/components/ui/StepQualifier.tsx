import React, { useState } from 'react';
import { ArrowRight, Zap, MessageCircle, Tag, Sparkles, Lock, Unlock } from 'lucide-react';
import { trackPixelEvent } from '../../utils/pixel';

interface StepQualifierProps {
  isUnlocked?: boolean;
  audioProgress?: number;
}

export const StepQualifier: React.FC<StepQualifierProps> = ({
  isUnlocked = false,
  audioProgress = 0,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [urgency, setUrgency] = useState<string>('');
  const [pricingPlan, setPricingPlan] = useState<string>('');

  const urgencyOptions = [
    {
      id: 'urgent',
      title: '🔥 Inmediato: En los próximos 7 a 14 días',
      desc: 'Tengo pauta activa o lanzamiento en puerta (Prioridad 1)',
    },
    {
      id: 'this_month',
      title: '⚡ Este Mes: Próximos 15 a 21 días',
      desc: 'Quiero asegurar mi desarrollo antes de que termine el mes',
    },
  ];

  const pricingOptions = [
    {
      id: 'full',
      title: 'Pago Único: S/ 1,000 PEN ($300 USD)',
      desc: 'Ahorras S/ 2,000 PEN del precio regular de S/ 3,000 PEN',
      highlight: true,
    },
    {
      id: 'split',
      title: 'Separar con 50%: S/ 500 PEN hoy + S/ 500 al entregar',
      desc: 'Congela la tarifa promocional y abona el saldo al recibir el sistema',
      highlight: false,
    },
  ];

  const handleSelectUrgency = (selected: string) => {
    if (!isUnlocked) return;
    setUrgency(selected);
    setTimeout(() => {
      setStep(2);
      import('canvas-confetti').then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3E5AB', '#FFFFFF'],
        });
      });
    }, 200);
  };

  const handleSelectPricing = (selected: string) => {
    setPricingPlan(selected);
    setTimeout(() => {
      setStep(3);
      import('canvas-confetti').then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#D4AF37', '#F3E5AB', '#10B981', '#FFFFFF'],
        });
      });
    }, 200);
  };

  const handleOpenWhatsApp = () => {
    // Fire high-priority Meta Pixel conversion events
    trackPixelEvent('Lead', {
      content_name: 'Reserva WhatsApp LAR',
      currency: 'USD',
      value: 300,
      timeframe: urgency,
      plan: pricingPlan,
    });
    trackPixelEvent('Contact', {
      currency: 'USD',
      value: 300,
    });

    const isSplit = pricingPlan.includes('Separar');
    const text = isSplit
      ? `Hola Kenneth! Acabo de activar la oferta de lanzamiento para mi sistema LAR.\n\n• Plazo de Entrega: ${urgency}\n• Modalidad: ${pricingPlan}\n• Tarifa Congelada: S/ 1,000 PEN ($300 USD) en lugar de S/ 3,000 PEN\n\nQuiero separar mi cupo hoy con S/ 500 PEN para asegurar la tarifa promocional.`
      : `Hola Kenneth! Acabo de activar la oferta de lanzamiento para mi sistema LAR.\n\n• Plazo de Entrega: ${urgency}\n• Modalidad Seleccionada: ${pricingPlan}\n• Precio Promocional: S/ 1,000 PEN ($300 USD) en lugar de S/ 3,000 PEN\n\nQuiero asegurar mi cupo y coordinar la sesión de arquitectura privada.`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      {/* PASO 1: URGENCIA FORZADA DE ACCIÓN PRESENTE */}
      {step === 1 && (
        <div className="flex flex-col gap-1.5 animate-fadeIn">
          {/* Progress / Unlock Gateway Header */}
          {!isUnlocked ? (
            <div className="w-full bg-[#030407]/90 border border-[#D4AF37]/35 rounded-xl p-2 flex flex-col gap-1 shadow-[0_0_18px_rgba(212,175,55,0.12)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F3E5AB] font-semibold">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  <span>Desbloqueando formulario...</span>
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
                Escucha el audio de cierre para habilitar tus opciones
              </span>
            </div>
          ) : (
            <div className="w-full bg-emerald-950/40 border border-emerald-500/40 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-emerald-400 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold">
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>¡Cupo y Opciones Desbloqueadas! ✓</span>
              </div>
              <span className="text-[8.5px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase">
                Activo
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9.5px] font-mono tracking-widest text-[#D4AF37] uppercase">Paso 1 de 2: Plazo de Entrega</span>
            <span className="text-[9.5px] font-mono text-slate-500">50%</span>
          </div>

          <p className="text-[11px] text-slate-300 font-light text-left leading-tight">
            ¿En qué plazo necesitas tener activo tu sistema LAR para captar clientes?
          </p>

          <div className="flex flex-col gap-1.5 mt-0.5">
            {urgencyOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectUrgency(item.title)}
                disabled={!isUnlocked}
                aria-label={`Seleccionar plazo de entrega: ${item.title}`}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                  isUnlocked
                    ? 'bg-white/[0.04] hover:bg-[#D4AF37]/15 border-white/[0.1] hover:border-[#D4AF37]/50 active:scale-[0.98] cursor-pointer shadow-md'
                    : 'bg-white/[0.01] border-white/[0.05] opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              >
                <div>
                  <div className={`text-xs font-semibold ${isUnlocked ? 'text-white group-hover:text-[#F3E5AB]' : 'text-slate-400'}`}>
                    {item.title}
                  </div>
                  <div className="text-[9.5px] text-slate-400 font-light mt-0.5">
                    {item.desc}
                  </div>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 transition-all shrink-0 ml-2 ${isUnlocked ? 'text-slate-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>
        </div>
      )}


      {/* PASO 2: OFERTA ACTIVADA CON ANCLAJE DE PRECIO */}
      {step === 2 && (
        <div className="flex flex-col gap-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold uppercase bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-400" /> ¡Oferta Especial Activada!
            </div>
            <span className="text-[10px] font-mono text-slate-500">100%</span>
          </div>

          {/* Anclaje de Precio Box */}
          <div className="bg-gradient-to-br from-[#D4AF37]/15 to-[#0A0C14] border border-[#D4AF37]/40 rounded-xl p-2.5 text-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Precio Regular:</span>
                <div className="text-xs font-mono text-slate-500 line-through">S/ 3,000 PEN ($850 USD)</div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-[#F3E5AB] font-semibold uppercase bg-[#D4AF37]/20 px-2 py-0.5 rounded-full">
                  Acción Rápida
                </span>
                <div className="text-base font-mono font-bold text-[#F3E5AB] mt-0.5">
                  S/ 1,000 PEN <span className="text-xs font-normal text-slate-300">($300 USD)</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 font-light text-left">
            Selecciona tu modalidad preferida para asegurar tu cupo:
          </p>

          <div className="flex flex-col gap-1.5 mt-0.5">
            {pricingOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectPricing(item.title)}
                aria-label={`Seleccionar modalidad de pago: ${item.title}`}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer ${
                  item.highlight
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50 hover:bg-[#D4AF37]/20'
                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#F3E5AB]">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-light mt-0.5">
                    {item.desc}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASO 3: CIERRE INMEDIATO A WHATSAPP CON ICONO DE OFERTA */}
      {step === 3 && (
        <div className="flex flex-col items-center text-center justify-between h-full py-1 animate-fadeIn">
          <div className="flex flex-col items-center">
            {/* OFFER BADGE ICON INSTEAD OF PHONE */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] via-emerald-400 to-[#0A0C14] p-[1.5px] mb-2 shadow-[0_0_25px_rgba(212,175,55,0.45)]">
              <div className="w-full h-full rounded-full bg-[#0A0C14] flex items-center justify-center text-[#F3E5AB]">
                <Tag className="w-6 h-6 text-[#F3E5AB] animate-pulse" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1 text-[9px] font-mono uppercase text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-2.5 py-0.5 rounded-full mb-1">
              <Zap className="w-2.5 h-2.5 fill-[#D4AF37]" /> Cupo Promocional Bloqueado ✓
            </div>

            <h3 className="font-serif text-base font-semibold text-white tracking-tight">
              Oferta Asegurada a S/ 1,000 PEN
            </h3>

            <p className="text-[10.5px] text-slate-400 font-light mt-0.5 max-w-[280px]">
              Toca el botón para abrir WhatsApp con Quant Partners y confirmar tu fecha de entrega.
            </p>

            {/* Application Data Summary */}
            <div className="w-full bg-[#030407]/90 border border-white/[0.08] rounded-xl p-2 mt-2 text-left space-y-0.5">
              <div className="text-[9px] font-mono text-slate-500 uppercase">Resumen del Cupo:</div>
              <div className="text-[10.5px] text-slate-300 font-medium truncate">✓ Entrega: {urgency}</div>
              <div className="text-[10.5px] text-[#F3E5AB] font-semibold truncate">✓ Modalidad: {pricingPlan}</div>
            </div>
          </div>

          {/* Direct WhatsApp CTA Button with Pre-filled Message */}
          <div className="w-full mt-2.5">
            <button
              onClick={handleOpenWhatsApp}
              aria-label="Reclamar oferta y abrir chat de WhatsApp con Quant Partners"
              className="w-full h-12 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 hover:from-emerald-400 hover:to-teal-600 text-white font-semibold flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.6)] active:scale-98 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Reclamar Oferta en WhatsApp</span>
            </button>
            <p className="text-[8.5px] font-mono text-slate-500 mt-1">
              Mensaje prellenado • Reserva inmediata por orden de llegada
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

