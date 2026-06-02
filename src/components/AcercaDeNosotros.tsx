/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Eye, HeartHandshake, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface AcercaProps {
  onNavigateToAbout?: () => void;
}

export default function AcercaDeNosotros({ onNavigateToAbout }: AcercaProps) {
  const values = [
    {
      title: 'Misión Institucional',
      description: 'Garantizar el acceso equitativo y gratuito a servicios de salud integral, preventiva y de emergencia, con enfoque intercultural y de género para toda la comunidad de Rioverde y la provincia de Esmeraldas.',
      icon: Compass,
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      title: 'Visión de Excelencia',
      description: 'Ser reconocidos a nivel provincial como el centro de salud Tipo C modelo del Ministerio de Salud Pública de Ecuador, destacando por nuestra tecnología de diagnóstico, calidez del personal y prevención epidemiológica.',
      icon: Eye,
      bgColor: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      title: 'Valores y Calidez',
      description: 'Basamos nuestro actuar clínico en la ética profesional, empatía comunitaria, vocación de servicio, transparencia administrativa y un profundo respeto a las cosmovisiones interculturales de nuestros pacientes.',
      icon: HeartHandshake,
      bgColor: 'bg-teal-50 text-teal-700 border-teal-100',
    }
  ];

  return (
    <section className="pt-16 pb-4 bg-white" id="seccion-nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text introductions */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
              NUESTRA IDENTIDAD
            </span>
            <h3 className="font-sans font-black text-3xl text-emerald-950 tracking-tight leading-none">
              Comprometidos con el desarrollo integral y el buen vivir de la zona norte
            </h3>
            <div className="w-12 h-1 bg-emerald-500 rounded"></div>
            <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
              <p>
                El Centro de Salud Tipo C Rioverde fue concebido en el marco de la planificación nacional de salud de Ecuador, con el firme propósito de descongestionar los hospitales distritales brindando servicios especializados y respuesta a emergencias médicas inmediatas a nivel cantonal.
              </p>
              <p>
                Nuestro contingente incluye un laboratorio totalmente automatizado que opera de forma continua, farmacia de acceso público de recetas gratuitas expedidas por el MSP, y un dispensario consultivo de ginecología, obstetricia, pediatría, odontología y salud mental familiar.
              </p>
            </div>
            {/* Short highlight quote */}
            <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl">
              <span className="text-xs text-emerald-900 font-semibold italic">
                "La salud es un derecho fundamental tutelado por el Estado ecuatoriano. Trabajamos diariamente bajo la política nacional del Ministerio de Salud Pública de Ecuador para llevar bienestar integral a cada rincón."
              </span>
            </div>
            
            {onNavigateToAbout && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToAbout}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Conocer más de Nosotros →
                </button>
              </div>
            )}
          </motion.div>

          {/* Right: Mission, Vision, Values layout (span 7/12) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    key={idx}
                    className="bg-white border border-gray-100 hover:border-emerald-100 hover:shadow-sm p-6 rounded-2xl transition-all duration-300 flex flex-col md:flex-row items-start gap-4 cursor-pointer"
                  >
                    <div className={`p-3 rounded-xl border shrink-0 ${v.bgColor}`}>
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-black text-sm text-emerald-950 leading-relaxed">
                        {v.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed pt-1">
                        {v.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

