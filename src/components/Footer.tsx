/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartPulse, Facebook, Twitter, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'inicio' | 'servicios' | 'nosotros' | 'descargas' | 'contacto') => void;
  onOpenAppointment: () => void;
}

export default function Footer({ onNavigate, onOpenAppointment }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, pageId: 'inicio' | 'servicios' | 'nosotros' | 'descargas' | 'contacto') => {
    e.preventDefault();
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900" id="app-main-footer">
      
      {/* Top Directory block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand details (span 4/12) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500 rounded-lg text-white">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black text-sm text-white tracking-tight uppercase leading-none">
                  Centro de Salud
                </span>
                <span className="text-[11px] sm:text-xs font-semibold font-sans tracking-wide text-emerald-400 leading-none mt-1">
                  Tipo C Rioverde
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-200/70 leading-relaxed max-w-sm">
              Establecimiento de salud gubernamental enfocado en proveer atención médica con gratuidad, calidad y calidez intercultural. Equipado con triage de urgencia operativa 24/7 y laboratorios automatizados.
            </p>
            {/* Minimalist social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 transition-colors text-emerald-300 hover:text-white"
                title="Siga al MSP en Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 transition-colors text-emerald-300 hover:text-white"
                title="Siga al MSP en Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:oficina.tecnica.08ot06@08d01.saludzona1.gob.ec,correogeneralcstcr@gmail.com"
                className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 transition-colors text-emerald-300 hover:text-white"
                title="Envíenos un Correo Electrónico"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick links (span 2/12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold font-mono text-white tracking-widest uppercase pb-2 border-b border-emerald-900">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/80">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, 'inicio')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, 'servicios')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  Servicios Clínicos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, 'nosotros')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  Acerca de Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, 'descargas')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  Descargas de PDF
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, 'contacto')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  Contacto y Ubicación
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services categories (span 3/12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold font-mono text-white tracking-widest uppercase pb-2 border-b border-emerald-900">
              Servicios Destacados
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/80">
              <li>Consulta Externa Integral</li>
              <li>Emergencia y Observación 24/7</li>
              <li>Laboratorio Clínico Automatizado</li>
              <li>Farmacia de Dispensación Gratuita</li>
              <li>Inmunización y Control Infantil</li>
              <li>Rehabilitación y Terapia Física</li>
            </ul>
          </div>

          {/* Col 4: Quick Assist contact (span 3/12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold font-mono text-white tracking-widest uppercase pb-2 border-b border-emerald-900">
              Emergencias y Dudas
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-emerald-300 block font-semibold">Toma de Turnos / Citas:</span>
                  <button
                    onClick={onOpenAppointment}
                    className="hover:text-emerald-300 text-emerald-100 font-bold hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-none text-[11px]"
                  >
                    Agendar Turno Digital <ExternalLink className="w-3 h-3 text-emerald-400" />
                  </button>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-emerald-300 block font-semibold">Línea de Urgencias:</span>
                  <a
                    href="tel:911"
                    className="text-red-400 font-bold hover:underline font-mono"
                  >
                    Marcar 911 (Ecuador)
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Extreme bottom: copyright notice */}
      <div className="bg-emerald-990 border-t border-emerald-900 text-emerald-300/60 py-6 text-center text-[10px] uppercase tracking-wider font-mono bg-emerald-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-emerald-300/60">
          <span>
            © {currentYear} Centro de Salud Tipo C Rioverde. Ministerio de Salud Pública de la República del Ecuador.
          </span>
        </div>
      </div>

    </footer>
  );
}
