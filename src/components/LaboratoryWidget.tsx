/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FlaskConical, 
  Waves,
  ArrowRight
} from 'lucide-react';
import { DOCTOR_RESULTS_IMAGE, ECOGRAFIA_IMAGE } from '../data';

export default function LaboratoryWidget() {

  const handleOpenLabPortal = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetUrl = 'https://laboratorio.tipocrioverde.com/';
    
    // Check if running inside an iframe
    const isFramed = typeof window !== 'undefined' && window.self !== window.top;

    if (isFramed) {
      try {
        window.top!.location.href = targetUrl;
      } catch {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      window.location.href = targetUrl;
    }
  };

  return (
    <>
      <section className="pt-8 pb-10 bg-white" id="seccion-resultados-laboratorio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header styled identically to "Actualidad en salud" */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
              SERVICIOS DE DIAGNÓSTICO DIGITAL
            </span>
            <h3 className="font-sans font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight leading-none">
              Consulta de exámenes médicos
            </h3>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded"></div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pt-1">
              Consulte, verifique y descargue de forma inmediata y confidencial sus resultados clínicos de laboratorio e informes de ecografía del Centro de Salud Tipo C Rioverde.
            </p>
          </div>

          {/* 2 HORIZONTAL-STYLED RESPONSIVE GRID CARDS (ONE NEXT TO THE OTHER LIKE ACTUALIDAD EN SALUD) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* CARD 1: CONSULTA DE RESULTADOS DE LABORATORIO */}
            <div
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left"
              id="card-consulta-laboratorio"
            >
              <div>
                {/* Post/Card image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={DOCTOR_RESULTS_IMAGE}
                    alt="Consulta de resultados de laboratorio clínico"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent"></div>
                  
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider text-emerald-950 bg-white px-3 py-1 rounded-full uppercase shadow-sm flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Laboratorio Clínico</span>
                  </span>
                </div>

                {/* Card detail contents */}
                <div className="p-6 sm:p-7 space-y-3">
                  <h4 className="font-sans font-bold text-lg sm:text-xl text-emerald-950 group-hover:text-emerald-700 transition-colors leading-snug">
                    Consulta de Resultados de Laboratorio
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Acceda al portal institucional para consultar y descargar sus exámenes de sangre, química clínica, coprológicos y uroanálisis.
                  </p>
                </div>
              </div>

              {/* Action button footer */}
              <div className="p-6 pt-0 border-t border-gray-50 mt-4">
                <a
                  href="https://laboratorio.tipocrioverde.com/"
                  target="_top"
                  onClick={handleOpenLabPortal}
                  className="w-full py-3.5 px-5 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                  id="btn-acceder-laboratorio"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-200" />
                  <span>Consultar Resultados de Laboratorio</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* CARD 2: CONSULTA DE EXÁMENES DE ECOGRAFÍA */}
            <div
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left"
              id="seccion-consulta-ecografia"
            >
              <div>
                {/* Post/Card image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={ECOGRAFIA_IMAGE}
                    alt="Especialista realizando ecografía médica digital"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent"></div>
                  
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider text-emerald-950 bg-white px-3 py-1 rounded-full uppercase shadow-sm flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Imagenología y Ecografía</span>
                  </span>
                </div>

                {/* Card detail contents */}
                <div className="p-6 sm:p-7 space-y-3">
                  <h4 className="font-sans font-bold text-lg sm:text-xl text-emerald-950 group-hover:text-emerald-700 transition-colors leading-snug">
                    Consulta de Exámenes de Ecografía
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Visualice y descargue los informes médicos de ecografías obstétricas (embarazo), abdominales, pélvicas y renales con biometría completa y conclusiones.
                  </p>
                </div>
              </div>

              {/* Action button footer */}
              <div className="p-6 pt-0 border-t border-gray-50 mt-4">
                <a
                  href="https://ecografias.tipocrioverde.com/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                  id="btn-acceder-ecografia"
                >
                  <Waves className="w-4 h-4 text-emerald-200" />
                  <span>Consultar Exámenes de Ecografía</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
