/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Waves, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Stethoscope, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { 
  HERO_IMAGE, 
  AGENDAMIENTO_INTERNO_IMAGE, 
  AGENDAMIENTO_ECOGRAFIA_IMAGE 
} from '../data';

interface AgendamientoPageProps {
  onNavigate?: (page: 'inicio' | 'servicios' | 'nosotros' | 'protocolos' | 'agendamiento' | 'contacto') => void;
}

export default function AgendamientoPage({ onNavigate }: AgendamientoPageProps) {
  const defaultFallbackImg = '/banner-rioverde.png';

  return (
    <div 
      className="pt-24 pb-20 bg-slate-50 min-h-screen text-slate-800"
      id="pagina-agendamiento-tipo-c"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
          <button
            onClick={() => onNavigate?.('inicio')}
            className="hover:text-emerald-700 hover:underline cursor-pointer"
          >
            Inicio
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-bold">Agendamiento Tipo C</span>
        </nav>

        {/* Page Header */}
        <div className="mb-6 space-y-2 text-left">
          <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            SISTEMA OFICIAL DE CITAS MÉDICAS · CENTRO DE SALUD TIPO C RIOVERDE
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            Agendamiento de Citas Médicas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Seleccione el tipo de agendamiento que desea realizar. Puede programar turnos para consultas médicas internas o agendar su estudio de ecografía diagnóstica.
          </p>
        </div>

        {/* 1. MAIN BANNER IMAGE (La misma imagen del banner principal, limpia y panorámica) */}
        <div className="relative rounded-3xl h-[260px] sm:h-[340px] md:h-[400px] overflow-hidden mb-12 shadow-md border border-slate-200 bg-emerald-950">
          <picture className="w-full h-full block">
            <source srcSet={HERO_IMAGE} type="image/png" />
            <source srcSet="/banner-rioverde.png" type="image/png" />
            <source srcSet="/images/banner-rioverde.png" type="image/png" />
            <source srcSet="/fachada-principal.png" type="image/png" />
            <img 
              src={HERO_IMAGE} 
              alt="Fachada Oficial del Centro de Salud Tipo C Rioverde" 
              className="w-full h-full object-cover object-center md:object-[center_35%]"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== defaultFallbackImg) {
                  target.src = defaultFallbackImg;
                }
              }}
            />
          </picture>
        </div>

        {/* 2. LAS 2 OPCIONES DE AGENDAMIENTO CON IMAGENES DEDICADAS */}
        <div className="mb-12">
          <div className="text-left mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
              Seleccione el Servicio de Agendamiento
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Haga clic sobre cualquiera de las dos opciones para acceder al portal correspondiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* CARD 1: AGENDAMIENTO INTERNO TIPO C */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group text-left"
            >
              <div>
                {/* Image header */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={AGENDAMIENTO_INTERNO_IMAGE}
                    alt="Agendamiento interno de citas médicas en Centro de Salud Tipo C"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-emerald-950 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full uppercase shadow-md flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Consulta Externa & Especialidades</span>
                  </span>

                  <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow-md">
                    Medicina Familiar · Odontología · Obstetricia · Pediatría
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-sans font-black text-2xl text-emerald-950 group-hover:text-emerald-700 transition-colors leading-tight">
                    Agendamiento Interno Tipo C
                  </h3>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Atención 100% gratuita financiada por el Ministerio de Salud Pública</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Asignación de fecha y hora según disponibilidad médica</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Acceso con número de cédula de identidad</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href="https://agendamiento.tipocrioverde.com/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:bg-emerald-800 cursor-pointer"
                  id="btn-ir-agendamiento-interno"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Acceder a Agendamiento Interno</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                </a>
              </div>
            </motion.div>

            {/* CARD 2: AGENDAMIENTO DE ECOGRAFÍA */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group text-left"
            >
              <div>
                {/* Image header */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={AGENDAMIENTO_ECOGRAFIA_IMAGE}
                    alt="Agendamiento de ecografías obstétricas y diagnósticas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-emerald-950 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full uppercase shadow-md flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Imagenología & Ecografía Digital</span>
                  </span>

                  <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow-md">
                    Ecografías Obstétricas · Abdominales · Pélvicas · Renales
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-sans font-black text-2xl text-emerald-950 group-hover:text-emerald-700 transition-colors leading-tight">
                    Agendamiento de Ecografía
                  </h3>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ecografías para control del embarazo y diagnósticos clínicos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Acceso directo al portal institucional de ecografías</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Descarga posterior de informes y resultados digitales</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href="https://agendamientoecografias.tipocrioverde.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:bg-emerald-800 cursor-pointer"
                  id="btn-ir-agendamiento-ecografia"
                >
                  <Waves className="w-4.5 h-4.5" />
                  <span>Acceder a Agendamiento de Ecografía</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 3. RECOMENDACIONES & HORARIOS */}
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 text-left shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Horarios de Atención Asistencial</span>
              </span>
              <h4 className="text-lg sm:text-xl font-bold">
                Consulta Externa: Lunes a Viernes de 08:00 AM a 16:30 PM
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Recuerde llegar 15 minutos antes de su turno asignado con su cédula de identidad original. En caso de requerir atención urgente fuera de estos horarios, el área de Emergencias atiende las 24 horas del día, los 365 días del año.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.('inicio')}
              className="px-5 py-3 bg-white hover:bg-emerald-50 active:scale-95 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm transition-all shrink-0 cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <span>Volver a la Página Principal</span>
              <ArrowRight className="w-4 h-4 text-emerald-800" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
