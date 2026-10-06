/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, HeartPulse, Clock, ShieldCheck, MapPin, Stethoscope, ChevronRight } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  const [imgSrc, setImgSrc] = useState(HERO_IMAGE);

  // Fallback chain for 100% universal browser compatibility (Chrome, Safari, Firefox, Edge)
  const handleImageError = () => {
    if (imgSrc !== '/banner-rioverde.png') {
      setImgSrc('/banner-rioverde.png');
    } else if (imgSrc !== '/images/banner-rioverde.png') {
      setImgSrc('/images/banner-rioverde.png');
    } else if (imgSrc !== '/fachada-principal.png') {
      setImgSrc('/fachada-principal.png');
    }
  };

  return (
    <section
      id="banner-hero"
      aria-label="Banner Principal Centro de Salud Tipo C Rioverde"
      className="w-full bg-slate-50 pt-[62px] sm:pt-[70px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* 1. AUTHENTIC PHOTOGRAPH BANNER FRAME */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-emerald-950 group">
          
          {/* Panoramic aspect ratio displaying the full building, signage, hill and lawn */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[21/9] lg:aspect-[2.4/1] min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px]">
            <picture className="w-full h-full block">
              <source srcSet={HERO_IMAGE} type="image/png" />
              <source srcSet="/banner-rioverde.png" type="image/png" />
              <source srcSet="/images/banner-rioverde.png" type="image/png" />
              <source srcSet="/fachada-principal.png" type="image/png" />
              <img
                src={imgSrc}
                alt="Fachada Oficial del Centro de Salud Rio Verde Tipo C - Ministerio de Salud Pública del Ecuador"
                className="w-full h-full object-cover object-center md:object-[center_40%] select-none transition-transform duration-700 ease-out"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
            </picture>

            {/* Subtle natural vignette only at extreme top and bottom edges - leaves 90% of the building 100% clear */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

            {/* Official Institutional Pill (Top Left) */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-md text-emerald-950 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <HeartPulse className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Centro de Salud Tipo C Rioverde · MSP</span>
              </div>
            </div>

            {/* Emergency Status Pill (Top Right) */}
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-400/40 text-white text-[11px] sm:text-xs font-semibold shadow-md">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span>Emergencias 24/7</span>
              </div>
            </div>

            {/* In-photo caption strip at bottom showing full institution name */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 z-10 text-white drop-shadow-md">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-emerald-300 block">
                Fotografía Oficial de la Sede Institucional
              </span>
              <span className="text-sm sm:text-base md:text-lg font-black text-white">
                Palestina · Cantón Rioverde, Provincia de Esmeraldas
              </span>
            </div>

          </div>

        </div>

        {/* 2. INSTITUTIONAL CALLOUT & ACTIONS DIRECTLY BELOW THE BANNER */}
        <div className="mt-4 sm:mt-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left">
          
          {/* Headlines & Motto */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                MSP Distrito 08D02 Rioverde
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Atención 100% Gratuita
              </span>
            </div>

            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-emerald-950 tracking-tight leading-tight">
              Tu salud, nuestra misión diaria
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
              Infraestructura médica moderna y de vanguardia para toda la comunidad Rioverdeña y sus parroquias. Medicina familiar, emergencias 24h, parto intercultural humanizado, laboratorio clínico y farmacia gratuita.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-5 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="hero-btn-citas"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Cita Médica</span>
            </button>

            <a
              href="#seccion-servicios"
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              <Stethoscope className="w-4 h-4 text-emerald-700" />
              <span>Ver Servicios Clínicos</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
