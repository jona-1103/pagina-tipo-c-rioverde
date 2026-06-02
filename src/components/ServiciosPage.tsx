/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Activity, Users, FlaskConical, ShieldPlus, Clock, CheckCircle2 } from 'lucide-react';
import { servicesList } from '../data';

const iconMap: Record<string, React.ComponentType<any>> = {
  Stethoscope: Stethoscope,
  Activity: Activity,
  Users: Users,
  FlaskConical: FlaskConical,
  ShieldPlus: ShieldPlus,
};

interface ServiciosPageProps {
  onBookSpecialty: (specialtyId: string) => void;
}

export default function ServiciosPage({ onBookSpecialty }: ServiciosPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-16 bg-slate-50 min-h-screen"
      id="pagina-servicios-completa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase font-mono bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
            Cartera de Servicios Autorizada
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-emerald-950 tracking-tight leading-none">
            Especialidades y Servicios Clínicos
          </h2>
          <div className="w-16 h-1 w-24 bg-emerald-600 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-500 leading-relaxed pt-2">
            El Centro de Salud Tipo C Rioverde opera bajo altos estándares del Ministerio de Salud Pública de Ecuador. Contamos con equipamiento moderno y un equipo multidisciplinario para ofrecer atención 100% gratuita y de calidad.
          </p>
        </div>

        {/* Detailed list display of each of the 5 main services */}
        <div className="space-y-12">
          {servicesList.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Stethoscope;
            const isAlternate = idx % 2 === 1;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={service.id}
                className={`bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row ${
                  isAlternate ? 'lg:flex-row-reverse' : ''
                }`}
                id={`detail-service-card-${service.id}`}
              >
                
                {/* Left side visually solid bar background with icon */}
                <div className="lg:w-1/3 bg-gradient-to-br from-emerald-900 to-emerald-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
                  <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
                    <IconComponent className="w-64 h-64" />
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="p-3 bg-white/10 border border-white/15 rounded-2xl w-fit text-white">
                      <IconComponent className="w-8 h-8 text-emerald-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-emerald-50 leading-tight">
                        {service.title}
                      </h3>
                      <div className="w-10 h-1 bg-emerald-400 rounded"></div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-10 sm:pt-16">
                    {/* Ministerio de Salud Pública */}
                  </div>
                </div>

                {/* Right side content detail block */}
                <div className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-white">
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[11px] font-mono font-bold text-emerald-800 tracking-wider uppercase mb-1.5">Descripción de la Unidad</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description} Esta unidad cumple funciones asistenciales, preventivas o curativas integrales lideradas por{' '}
                        {service.id === 'diagnostico-apoyo' ? (
                          <>Licenciados/as y </>
                        ) : service.id === 'programas-prevencion' ? (
                          <>Licenciadas y </>
                        ) : null}
                        médicos debidamente autorizados por el Senescyt y el Ministerio de Salud Pública de Ecuador.
                      </p>
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                      <h4 className="text-[11px] font-mono font-bold text-emerald-800 tracking-wider uppercase mb-3">Servicios Asistenciales en Detalle</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 font-medium leading-tight">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Assistance timelines and notes block */}
                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>
                          <strong>Horario de atención:</strong>{' '}
                          {service.id.includes('emergencia') 
                            ? '24 horas los 7 días de la semana' 
                            : 'Lunes a Viernes | 8:00 AM a 16:30 PM'}
                        </span>
                      </div>
                    </div>
                  </div>



                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Info card block */}
        <div className="mt-16 p-8 bg-emerald-50 border border-emerald-100 rounded-3xl text-center max-w-4xl mx-auto space-y-4">
          <h3 className="font-sans font-black text-xl text-emerald-900">¿Necesita asistencia inmediata fuera de horarios programados?</h3>
          <p className="text-xs text-emerald-800 max-w-2xl mx-auto leading-relaxed">
            Nuestros servicios de emergencia y sala de observación funcionan de manera ininterrumpida las 24 horas del día, los 7 días de la semana, incluyendo fines de semana y feriados. Recuerde reportar cualquier eventualidad de alto riesgo llamando inmediatamente al ECU 911.
          </p>
        </div>

      </div>
    </motion.div>
  );
}
