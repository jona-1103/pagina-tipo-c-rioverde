/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Stethoscope, Activity, Users, FlaskConical, ShieldPlus, ChevronRight } from 'lucide-react';
import { servicesList } from '../data';
import { motion } from 'motion/react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Stethoscope: Stethoscope,
  Activity: Activity,
  Users: Users,
  FlaskConical: FlaskConical,
  ShieldPlus: ShieldPlus,
};

interface ServicesProps {
  onBookSpecialty: (specialtyId: string) => void;
  onNavigateToServices?: () => void;
}

export default function Services({ onBookSpecialty, onNavigateToServices }: ServicesProps) {
  return (
    <section className="py-20 bg-slate-50/50" id="seccion-servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
            Cartera de Servicios Clínicos
          </span>
          <h3 className="font-sans font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight leading-none" id="services-title">
            Nuestros Servicios Médicos
          </h3>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded"></div>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pt-1">
            Como un centro de salud de primer nivel y emergencias de respuesta inmediata, unificamos servicios especializados para brindar un cuidado de excelencia, humano, equitativo e integral a cada familia de Rioverde.
          </p>
        </motion.div>

        {/* Grid cards like the Actualidad/Blog section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" id="services-grid-container">
          {servicesList.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Stethoscope;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
                key={service.id}
                onClick={onNavigateToServices}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Icon & title head block */}
                  <div className="flex flex-col items-start gap-3 mb-4">
                    <div className="inline-flex p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-sans font-black text-[15px] sm:text-[16px] text-emerald-950 leading-tight group-hover:text-emerald-700 transition-colors">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  {/* General description */}
                  <p className="text-[11px] text-gray-500 leading-normal mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Bullet list of assistential sub-services */}
                  <div className="border-t border-gray-100 pt-4">
                    <span className="text-[9px] font-bold text-emerald-800 tracking-wider block mb-2 uppercase font-sans">
                      Servicios Asistenciales
                    </span>
                    <ul className="space-y-1.5">
                      {service.details.slice(0, 3).map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs text-gray-600 flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                          <span className="leading-tight text-gray-700 line-clamp-1">{detail}</span>
                        </li>
                      ))}
                      {service.details.length > 3 && (
                        <li className="text-[10px] text-emerald-600 font-semibold pl-5">
                          +{service.details.length - 3} más...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-emerald-700 group-hover:text-emerald-950">
                  <span>Saber más</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

              </motion.div>
            );
          })}
        </div>

        {onNavigateToServices && (
          <div className="mt-12 text-center">
            <button
              onClick={onNavigateToServices}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
            >
              Ver Cartera de Servicios Completa →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

