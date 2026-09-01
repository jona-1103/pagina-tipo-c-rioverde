/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, X, RefreshCw, Lock, ShieldCheck, CheckCircle2, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { DOCTOR_RESULTS_IMAGE } from '../data';

export default function LaboratoryWidget() {
  const [isOpenViewer, setIsOpenViewer] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenViewer = () => {
    setIsLoading(true);
    setIsOpenViewer(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <section className="pt-2 pb-6 bg-white" id="seccion-resultados-laboratorio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LIGHT GREEN GRADIENT BANNER PANEL */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 rounded-3xl overflow-hidden shadow-sm border border-emerald-100 grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
          
          {/* Doctor on the left */}
          <div className="lg:col-span-5 relative min-h-[250px] lg:min-h-full overflow-hidden">
            <img
              src={DOCTOR_RESULTS_IMAGE}
              alt="Doctora mostrando resultados de laboratorio digitales"
              className="absolute inset-0 w-full h-full object-cover object-center translate-x-1 hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Soft overlay gradient to melt doctor image with layout */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-emerald-950/20 via-transparent to-transparent"></div>
          </div>

          {/* Interactive checking system on the right */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-800 tracking-wider bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                TECNOLOGÍA AL SERVICIO DE TU SALUD
              </span>
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-emerald-950 tracking-tight">
                Consulta los resultados de laboratorio
              </h3>
              <p className="text-sm text-gray-650 max-w-xl leading-relaxed">
                Acceda de manera directa a nuestro visor clínico oficial para consultar y descargar sus exámenes y análisis de laboratorio.
              </p>
            </div>

            {/* In-Page Viewer Trigger Button */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <button
                type="button"
                onClick={handleOpenViewer}
                className="px-8 py-4 bg-emerald-800 hover:bg-emerald-950 text-white font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-emerald-900/20 w-full sm:w-auto text-center"
                id="btn-consultar-resultados-lab"
              >
                <FlaskConical className="w-5 h-5 text-emerald-100" />
                Consultar Resultados
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* IN-APP LABORATORY VIEWER MODAL */}
      <AnimatePresence>
        {isOpenViewer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`relative w-full bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-emerald-800/50 ${
                isFullscreen ? 'h-full max-w-full rounded-none md:rounded-none' : 'h-[92vh] max-w-6xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white px-4 py-3 border-b border-emerald-900/80 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-800/60 rounded-xl text-emerald-300">
                    <FlaskConical className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-300 uppercase">
                        Visor de Laboratorio Clínico
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <h2 className="font-sans font-bold text-xs sm:text-sm text-white leading-tight">
                      Consulta de Resultados | Centro de Salud Tipo C Rioverde
                    </h2>
                  </div>
                </div>

                {/* Masked/Secured indicator */}
                <div className="hidden md:flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/50 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Conexión Institucional Segura</span>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    title="Recargar visor"
                    className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-800/40 hover:bg-emerald-800/80 text-emerald-200 hover:text-white border border-emerald-700/50 transition-colors text-xs flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline text-xs">Recargar</span>
                  </button>

                  <a
                    href="https://laboratorio.tipocrioverde.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Abrir en pestaña nueva"
                    className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-800/40 hover:bg-emerald-800/80 text-emerald-200 hover:text-white border border-emerald-700/50 transition-colors text-xs flex items-center gap-1.5 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-xs">Nueva pestaña</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    title={isFullscreen ? "Reducir tamaño" : "Pantalla completa"}
                    className="hidden sm:flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpenViewer(false)}
                    title="Cerrar visor"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/70 hover:border-red-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notice strip */}
              <div className="bg-emerald-950/90 border-b border-emerald-900/40 px-4 py-1.5 flex items-center justify-between text-[11px] text-emerald-200 font-mono shrink-0">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Ingrese su usuario o cédula y clave facilitada en ventanilla de laboratorio.</span>
                </div>
                <span className="hidden sm:inline text-emerald-400/80 text-[10px]">Red MSP Ecuador</span>
              </div>

              {/* Embedded Frame Container */}
              <div className="flex-1 bg-white relative overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center z-10 text-white gap-3">
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                    <p className="font-mono text-xs text-emerald-200 tracking-wider">
                      Cargando portal de laboratorio...
                    </p>
                  </div>
                )}
                
                <iframe
                  key={iframeKey}
                  src="/portal-laboratorio/"
                  title="Portal Oficial de Resultados de Laboratorio Clínico"
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              {/* Footer */}
              <div className="bg-slate-950 border-t border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono shrink-0">
                <span className="text-[11px]">Centro de Salud Tipo C Rioverde • Ministerio de Salud Pública</span>
                <button
                  type="button"
                  onClick={() => setIsOpenViewer(false)}
                  className="text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer font-sans font-semibold text-xs"
                >
                  Cerrar Visor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
