/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, X, Heart, BadgeAlert, FileText, CheckCircle } from 'lucide-react';

export default function HealthAnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this specific announcement
    const isDismissed = localStorage.getItem('rioverde_announcement_dismissed_v1');
    if (!isDismissed) {
      // Small timeout to let the page load first for great UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (dontShowAgain) {
      localStorage.setItem('rioverde_announcement_dismissed_v1', 'true');
    }
  };

  const handleDismissForever = () => {
    localStorage.setItem('rioverde_announcement_dismissed_v1', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="health-announcement-popup-overlay">
          {/* Backdrop interaction closes too but button is preferred */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default"
            onClick={handleClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-red-100 flex flex-col z-10"
            id="health-popup-card"
          >
            {/* Header medical high-contrast stripe */}
            <div className="bg-gradient-to-r from-red-600 via-rose-500 to-red-700 text-white p-5 relative flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl text-white">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-red-100 uppercase block">AVISO OFICIAL DE SALUD PÚBLICA</span>
                <h3 className="font-sans font-black text-base sm:text-lg leading-tight">Campaña de Prevención y Vacunación</h3>
              </div>
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                  <BadgeAlert className="w-4 h-4 text-red-500 shrink-0" />
                  Alerta Ambiental de Invierno: Control del Dengue y Vacunas
                </h4>
                <p className="text-xs text-slate-500 font-mono">Actualizado: Esmeraldas, Ecuador - Mayo 2026</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Debido al incremento estacional de lluvias en el cantón Rioverde, el Ministerio de Salud Pública de Ecuador recuerda a la comunidad civil tomar precauciones urgentes contra el mosquito transmisor del dengue, así como participar de la inoculación nacional.
              </p>

              {/* Core Health Actions / Tips */}
              <div className="bg-rose-50/60 border border-rose-100/70 rounded-2xl p-4 space-y-3">
                <span className="text-[9px] font-bold text-red-800 tracking-wider uppercase block font-mono">RECOMENDACIONES OBLIGATORIAS:</span>
                
                <div className="space-y-2.5">
                  <div className="flex gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-tight">
                      <strong className="text-slate-900">Elimine Criaderos:</strong> Voltee botellas, elimine tarrinas y tape recipientes con agua estancada.
                    </p>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-tight">
                      <strong className="text-slate-900">Vacunación Activa:</strong> Acuda al área de vacunas del <span className="font-bold text-emerald-800">CS. Tipo C Rioverde</span> para dosis gratuitas de Influenza estacional y refuerzos.
                    </p>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-tight">
                      <strong className="text-slate-900">Atención Directa:</strong> Si presenta fiebre alta, dolor articular intenso o sarpullido, <span className="font-bold text-red-700">no se automedique</span>; acuda a Emergencias de inmediato.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist option to not show again */}
              <label className="flex items-center gap-2 cursor-pointer select-none py-1 w-fit group">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span className="text-[11px] text-slate-500 group-hover:text-slate-700 transition-colors font-medium">No volver a mostrar en este dispositivo</span>
              </label>
            </div>

            {/* Footer buttons */}
            <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <p className="text-[10px] text-slate-400 font-mono leading-none flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500" />
                Rioverde Saludable
              </p>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDismissForever}
                  className="w-1/2 sm:w-auto px-4 py-2 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  Entendido
                </button>
                <button
                  onClick={handleClose}
                  className="w-1/2 sm:w-auto px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md shadow-red-200"
                >
                  Seguir al Sitio
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
