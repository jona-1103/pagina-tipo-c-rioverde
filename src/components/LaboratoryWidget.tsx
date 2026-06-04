/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FlaskConical } from 'lucide-react';
import { DOCTOR_RESULTS_IMAGE } from '../data';

export default function LaboratoryWidget() {
  const handleOpenSecurePortal = () => {
    // Generate validation pass for physical handshaking security
    const token = 'MSP-GATEWAY-' + Math.random().toString(36).substring(2).toUpperCase();
    const expiresAt = Date.now() + 10000; // 10 seconds validity window for startup trigger
    
    localStorage.setItem('allow_clinical_portal_access', JSON.stringify({
      token,
      expiresAt
    }));

    // Open clinical portal in windowed popup without browser navigation features to mask external URL
    const width = 1200;
    const height = 900;
    
    // Exact center positioning on desktop
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    
    window.open(
      '/?clinical_portal=true',
      'ClinicalPortalSecure',
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
    );
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
                Acceda de manera directa a nuestro visor clínico oficial. Por su seguridad, el ingreso se realiza a través de un canal seguro encriptado que resguarda la privacidad de sus diagnósticos y oculta su dirección en el navegador.
              </p>
            </div>

            {/* Secure Trigger Button */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <button
                type="button"
                onClick={handleOpenSecurePortal}
                className="px-8 py-4 bg-emerald-800 hover:bg-emerald-950 text-white font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-emerald-900/20 w-full sm:w-auto text-center"
              >
                <FlaskConical className="w-5 h-5 text-emerald-100" />
                Consultar Resultados
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
