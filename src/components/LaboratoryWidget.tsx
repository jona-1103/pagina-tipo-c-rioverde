/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FlaskConical, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  Shield, 
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { DOCTOR_RESULTS_IMAGE } from '../data';

export default function LaboratoryWidget() {
  const handleOpenPortal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetUrl = 'https://laboratorio.tipocrioverde.com/';
    
    // Check if running inside an iframe
    const isFramed = window.self !== window.top;

    if (isFramed) {
      try {
        // Attempt top-level navigation to avoid X-Frame-Options rejection
        window.top!.location.href = targetUrl;
      } catch {
        // If iframe sandbox prevents top navigation, open in direct clean window
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      // Direct navigation in the same browser window/tab
      window.location.href = targetUrl;
    }
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 tracking-wider bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-700" />
                  SISTEMA OFICIAL DE LABORATORIO
                </span>
                <span className="text-[11px] font-mono text-emerald-800/80 bg-emerald-200/50 px-2 py-0.5 rounded-md border border-emerald-300/40">
                  MSP ECUADOR
                </span>
              </div>
              
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-emerald-950 tracking-tight">
                Consulta los resultados de laboratorio
              </h3>
              <p className="text-sm text-gray-650 max-w-xl leading-relaxed">
                Acceda directamente al portal institucional de resultados del <strong>Centro de Salud Tipo C Rioverde</strong> para consultar, verificar y descargar sus exámenes y análisis clínicos.
              </p>
            </div>

            {/* Information security badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg text-xs text-emerald-900">
              <div className="flex items-center gap-2 bg-white/80 border border-emerald-200/80 px-3 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Conexión directa y confidencial</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-emerald-200/80 px-3 py-2 rounded-xl">
                <KeyRound className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Acceso con cédula y contraseña</span>
              </div>
            </div>

            {/* Action Button to https://laboratorio.tipocrioverde.com/ */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg pt-1">
              <a
                href="https://laboratorio.tipocrioverde.com/"
                target="_top"
                onClick={handleOpenPortal}
                className="px-8 py-4 bg-emerald-800 hover:bg-emerald-950 active:scale-[0.99] text-white font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-emerald-900/20 w-full sm:w-auto text-center text-decoration-none"
                id="btn-consultar-resultados-lab"
              >
                <FlaskConical className="w-5 h-5 text-emerald-100" />
                <span>Consultar Resultados</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </a>
            </div>

            {/* Help instructions note */}
            <p className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
              <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Para ingresar digite su número de cédula o usuario y la contraseña facilitada en el laboratorio.</span>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
