import React, { useState } from 'react';
import { X, Shield, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LegalModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'disclaimer' | 'privacy' | 'terms'>('disclaimer');

  return (
    <>
      {/* Discreet Footer Trigger Button */}
      <div className="w-full flex items-center justify-center py-1 select-none">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Ver privacidad, términos y deslinde legal de Quant Partners"
          className="text-[8.5px] font-mono text-slate-500 hover:text-[#F3E5AB] transition-colors flex items-center gap-1 opacity-70 hover:opacity-100 cursor-pointer"
        >
          <Scale className="w-2.5 h-2.5 text-[#D4AF37]" />
          <span>Privacidad, Términos & Deslinde Legal · Quant Partners</span>
        </button>
      </div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-[460px] max-h-[85vh] bg-[#0A0C14] border border-[#D4AF37]/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden text-left"
            >
              {/* Top Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F3E5AB]">
                    <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white tracking-tight">
                      Información Legal & Cumplimiento
                    </h3>
                    <p className="text-[9px] font-mono text-slate-400">Quant Partners · Infraestructura B2B</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar ventana de información legal"
                  className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 py-2 border-b border-white/[0.04]">
                <button
                  onClick={() => setActiveTab('disclaimer')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    activeTab === 'disclaimer'
                      ? 'bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Deslinde Publicitario
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    activeTab === 'privacy'
                      ? 'bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Privacidad
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    activeTab === 'terms'
                      ? 'bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Términos
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto py-3 pr-1 text-[11px] text-slate-300 font-light leading-relaxed space-y-3 max-h-[50vh]">
                {activeTab === 'disclaimer' && (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-[10.5px]">
                      <strong>Aviso Legal de Meta Platforms Inc.:</strong>
                      <p className="mt-1">
                        Este sitio web no es parte del sitio web de Meta o Meta Platforms, Inc. Adicionalmente, este sitio NO está respaldado por Meta de ninguna manera. FACEBOOK e INSTAGRAM son marcas registradas de META PLATFORMS, INC.
                      </p>
                    </div>
                    <p>
                      <strong>Descargo de Responsabilidad de Resultados:</strong> Quant Partners diseña e implementa infraestructura tecnológica y arquitecturas de conversión (Sistema LAR). No garantizamos resultados financieros específicos, ya que el éxito depende del modelo de negocio, la oferta y la ejecución comercial de cada cliente.
                    </p>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-2">
                    <p>
                      <strong>Política de Privacidad y Protección de Datos:</strong>
                    </p>
                    <p>
                      En Quant Partners nos comprometemos a proteger tu privacidad. Los datos recopilados (como respuestas del calificador o mensajes de WhatsApp) se utilizan únicamente para coordinar tu sesión de arquitectura y diseñar tu propuesta personalizada.
                    </p>
                    <p>
                      No vendemos, alquilamos ni compartimos tu información personal con terceros. Puedes solicitar la eliminación de tus datos en cualquier momento escribiendo a nuestro canal de soporte.
                    </p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-2">
                    <p>
                      <strong>Términos del Servicio:</strong>
                    </p>
                    <p>
                      1. <strong>Servicio:</strong> Diseño, desarrollo y despliegue de landing pages de alta retención (Sistema LAR) bajo la modalidad acordada.
                    </p>
                    <p>
                      2. <strong>Plazos y Entrega:</strong> Los tiempos de entrega (7 a 14 días / 15 a 21 días) comienzan a regir tras la entrega completa de activos por parte del cliente.
                    </p>
                    <p>
                      3. <strong>Tarifa Promocional:</strong> Las condiciones de oferta especial (S/ 1,000 PEN / $300 USD) aplican únicamente para los cupos vigentes del mes y se congelan con la confirmación de la reserva.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Close Action */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500">© 2026 Quant Partners. Todos los derechos reservados.</span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar modal legal"
                  className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-[10.5px] font-mono transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
