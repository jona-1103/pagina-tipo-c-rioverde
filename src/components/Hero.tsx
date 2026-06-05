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
      className="relative w-full max-w-[1960px] mx-auto h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex items-start overflow-hidden bg-white mt-[60px] md:mt-0"
    >
      {/* Background Image of the Modern Health Center */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={HERO_IMAGE}
          alt="Centro de Salud Tipo C Rioverde"
          className="w-full h-full object-cover object-[right_20%]"
          referrerPolicy="no-referrer"
        />
        {/* Softened white translucent overlay for better visibility of the background image and high text legibility */}
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-white/80 via-white/40 via-30% md:via-40% to-white/0"></div>
        {/* Extra height-based fade for mobile layouts at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent lg:hidden"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-md md:max-w-xl lg:max-w-2xl space-y-4 text-left p-2 pt-24 sm:pt-32 md:pt-44 lg:pt-56">
          
          {/* Slogan */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-emerald-950 tracking-tight leading-tight"
            id="hero-main-title"
          >
            Tu salud, <br className="hidden sm:inline" />
            <span className="text-emerald-700">nuestra misión diaria</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed max-w-lg"
          >
            Brindamos atención médica integral, accesible y de calidad a toda la comunidad. Conoce nuestros servicios, accede a tus resultados y encuentra cómo llegar hasta nosotros.
          </motion.p>
          
        </div>
      </div>
    </section>
  );
}
