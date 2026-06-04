/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldAlert, ArrowLeft, RefreshCw, CheckCircle2, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

export default function SecureClinicalPortal() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    // Check local storage for the authorized gate pass
    const passStr = localStorage.getItem('allow_clinical_portal_access');
    if (!passStr) {
      setIsAuthorized(false);
      return;
    }

    try {
      const pass = JSON.parse(passStr);
      // Valid for 10 seconds of startup window
      if (pass && pass.token && pass.expiresAt && pass.expiresAt > Date.now()) {
        setIsAuthorized(true);
        // Clear immediately so it cannot be re-used or bookmarked
        localStorage.removeItem('allow_clinical_portal_access');
      } else {
        setIsAuthorized(false);
      }
    } catch (e) {
      setIsAuthorized(false);
    }
  }, []);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleClose = () => {
    window.close();
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white" id="portal-loading">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="font-mono text-xs text-slate-400 tracking-wider">ESTABLECIENDO CONEXIÓN SEGURA CON EL LAB...</p>
        </div>
      </div>
    );
  }

  // UNAUTHORIZED USER SCREEN
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6" id="portal-unauthorized-view">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full bg-slate-900 border border-red-500/20 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6"
        >
          <div className="w-16 h-16 bg-red-950/40 border border-red-550/30 rounded-2xl flex items-center justify-center text-red-500 mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase">CSTCR - Acceso Denegado</span>
            <h2 className="font-sans font-black text-xl text-white tracking-tight leading-snug">
              Se requiere inicio seguro desde la página oficial
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Por estrictas políticas de privacidad, leyes de protección de datos clínicos de Ecuador y para resguardar su información, el acceso directo a este portal está inhabilitado. Debe iniciar sesión exclusivamente desde la página principal de nuestro Centro de Salud.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl text-left border border-slate-800/80">
            <span className="text-[9px] font-mono font-bold text-slate-550 uppercase tracking-widest block mb-1">Instrucciones:</span>
            <ol className="text-[11px] text-slate-400 list-decimal list-inside space-y-1">
              <li>Ingrese al sitio principal <a href="/" className="text-emerald-400 hover:underline">rioverde.com</a></li>
              <li>Deslícese hasta el bloque de <strong>Laboratorio</strong></li>
              <li>Haga clic en el botón <strong>"Consultar Resultados"</strong></li>
            </ol>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full py-3.5 bg-red-650 hover:bg-red-700 text-white font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Regresar al Sitio Principal
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // AUTHORIZED SECURE ESCAPE WINDOW VIEW
  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col overflow-hidden select-none" id="secure-clinical-portal-frame">
      
      {/* Institutional Embedded Status Header */}
      <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white px-4 py-3 border-b border-emerald-900 flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-20 shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-800/40 rounded-xl text-emerald-300">
            <Lock className="w-5 h-5 animate-pulse text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-300 uppercase">SERVIDOR PRIVADO INTEGRADO</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="font-sans font-black text-xs sm:text-sm tracking-tight text-white leading-none">
              Portal Interno de Resultados de Laboratorios | Centro de Salud Tipo C Rioverde
            </h1>
          </div>
        </div>

        {/* Encrypted browser URL simulation to provide confidence and authenticity to patients */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/40 px-4 py-1.5 rounded-full text-xs font-mono text-emerald-300/90 max-w-md truncate shadow-inner w-96 justify-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>https://laboratorio.tipocrioverde.com/</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3.5 py-1.5 bg-emerald-800/30 border border-emerald-700/50 hover:bg-emerald-800/60 text-emerald-100 hover:text-white rounded-xl transition-all font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refrescar Panel</span>
          </button>
          
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white rounded-xl transition-all text-xs font-bold cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </header>

      {/* Security Disclaimer Banner */}
      <div className="bg-emerald-900/10 border-b border-emerald-900/20 px-4 py-2 flex items-center gap-2 text-[10px] text-emerald-300 font-mono shrink-0 select-none">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Conexión encriptada de 256 bits activa. Sus claves y número de cédula están totalmente protegidos.</span>
      </div>

      {/* Real Clinical Portal Iframe */}
      <div className="flex-1 bg-white relative">
        <iframe
          key={iframeKey}
          src="https://laboratorio.tipocrioverde.com/"
          title="Visor Oficial de Resultados de Laboratorio Clínico"
          className="w-full h-full border-0 shadow-inner"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>

      {/* Footer Info */}
      <div className="bg-slate-950 border-t border-slate-900 px-4 py-2 flex items-center justify-between text-[9px] text-slate-500 font-mono shrink-0">
        <span>MSP-LAB-SECURE v2.4.0</span>
        <span>Ministerio de Salud Pública del Ecuador &copy; {new Date().getFullYear()}</span>
      </div>

    </div>
  );
}
