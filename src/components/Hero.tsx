/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  return (
    <section
      id="banner-hero"
      className="relative w-full max-w-[1960px] mx-auto h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex items-center overflow-hidden bg-white mt-[60px] md:mt-0"
    >
      {/* Background Image of the Modern Health Center */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={HERO_IMAGE}
          alt="Centro de Salud Tipo C Rioverde"
          className="w-full h-full object-cover object-right"
          referrerPolicy="no-referrer"
        />
        {/* White translucent overlay from left to center for readability - fades out quickly to reveal the building on the center-right */}
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-white/95 via-white/85 via-35% md:via-45% to-white/0"></div>
        {/* Extra height-based fade for mobile layouts at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent lg:hidden"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-md md:max-w-xl lg:max-w-2xl space-y-4 text-left p-2">
          
          {/* Slogan */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-emerald-950 tracking-tight leading-none"
            id="hero-main-title"
          >
            Cuidamos tu salud, <br className="hidden sm:inline" />
            <span className="text-emerald-600">sin importar de dónde vengas</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-lg"
          >
            El Centro de Salud Tipo C Rioverde ofrece atención médica pública gratuita con altos estándares de calidad, modernos consultorios, laboratorio automatizado y un selecto grupo de especialistas listos para salvaguardar tu bienestar y el de toda tu familia.
          </motion.p>
          
        </div>
      </div>
    </section>
  );
}
