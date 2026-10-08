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
      className="w-full relative overflow-hidden bg-emerald-950 mt-[58px] sm:mt-[64px]"
    >
      {/* 1. FULL-WIDTH BANNER IMAGE (100% ANCHO DE LA PÁGINA CON ALTURA REDUCIDA Y VISTA PANORÁMICA) */}
      <div className="relative w-full h-[360px] sm:h-[400px] md:h-[460px] lg:h-[500px] xl:h-[540px] overflow-hidden bg-emerald-950">
        
        {/* The exact same high-resolution banner image as in Acerca de Nosotros */}
        <picture className="w-full h-full block">
          <source srcSet={HERO_IMAGE} type="image/png" />
          <source srcSet="/banner-rioverde.png" type="image/png" />
          <source srcSet="/images/banner-rioverde.png" type="image/png" />
          <source srcSet="/fachada-principal.png" type="image/png" />
          <img
            src={imgSrc}
            alt="Fachada Oficial del Centro de Salud Rio Verde Tipo C - Ministerio de Salud Pública del Ecuador"
            className="w-full h-full object-cover object-center md:object-[center_32%] select-none transition-transform duration-700 ease-out"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </picture>

        {/* Soft, narrow gradient overlay on the left so the wide photo is mostly untouched while text remains legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-950/45 via-30% md:via-25% to-transparent pointer-events-none" />

        {/* Minimal top shade for clean header separation */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

        {/* 2. TEXT & CALLOUT OVERLAY ON THE LEFT SIDE (ENCIMA DE LA IMAGEN) */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4 text-left text-white py-6 sm:py-8">

              {/* Main title */}
              <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight drop-shadow-lg leading-tight">
                Tu salud, <br />
                <span className="text-emerald-300">nuestra misión diaria</span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed drop-shadow-md max-w-xl">
                Estamos listos para atenderte en el momento en que lo necesites. Cuidamos la salud de cada familia rioverdeña y de sus parroquias con médicos siempre disponibles y emergencias las 24 horas. Estamos aquí, muy cerca de ti.
              </p>

              {/* Slogan highlight on single line below */}
              <p className="text-xs sm:text-sm md:text-base font-bold text-emerald-300 drop-shadow-md block sm:whitespace-nowrap">
                ¡Tu bienestar y el de tu familia es nuestra prioridad!
              </p>

              {/* Action buttons on the left */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-btn-citas"
                >
                  <Calendar className="w-4 h-4 text-emerald-950" />
                  <span>Agendar Cita Médica</span>
                </button>

                <a
                  href="#seccion-servicios"
                  className="px-5 py-3.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/25 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-300" />
                  <span>Ver Servicios Clínicos</span>
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 3. KEY SERVICE HIGHLIGHTS STRIP FULL WIDTH */}
      <div className="bg-emerald-900 border-t border-emerald-800/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-[11px] sm:text-xs text-emerald-100 font-medium">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <strong className="text-white">Emergencias:</strong> Abierto 24/7 los 365 días
          </div>
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <strong className="text-white">Consulta Externa:</strong> Lunes a Viernes 08:00 a 16:30
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <strong className="text-white">Gratuidad:</strong> 100% Sin costo (Atención y Medicamentos)
          </div>
          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cantón Rioverde, Esmeraldas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
