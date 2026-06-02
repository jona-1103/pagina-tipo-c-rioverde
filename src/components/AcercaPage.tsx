/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { HERO_IMAGE } from '../data';
import { HeartPulse, ShieldCheck, Award, Eye, Compass, Target, Sparkles, Building2, BookOpen, Users } from 'lucide-react';

export default function AcercaPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-16 bg-slate-50 min-h-screen"
      id="pagina-nosotros-completa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Majestic main banner block */}
        <div className="relative rounded-3xl h-[280px] sm:h-[400px] overflow-hidden mb-12 shadow-md">
          <img 
            src={HERO_IMAGE} 
            alt="Centro de Salud Tipo C Rioverde Banner Principal" 
            className="w-full h-full object-cover object-right saturate-100 brightness-100 opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
            <div className="max-w-3xl space-y-3">
              <h2 className="font-sans font-black text-3xl sm:text-5xl text-emerald-50 tracking-tight leading-none drop-shadow-md">
                Acerca de Nuestra Institución
              </h2>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed max-w-2xl drop-shadow">
                Conozca la historia, misión y valores de nuestro complejo clínico principal en Rioverde, Esmeraldas, constituyendo el bastion de salud gratuito del norte de la provincia.
              </p>
            </div>
          </div>
        </div>

        {/* Core content references side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main article content on left */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
            
            {/* History section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5.5 h-5.5 text-emerald-600" />
                <h3 className="font-sans font-black text-xl text-emerald-950">Referencia de Fundación e Impacto</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Los centros de salud Tipo C son en realidad pequeños hospitales, con todo lo necesario para atender y resolver 8 de cada 10 casos. Los 2 restantes son destinados a hospitales más grandes o de especialización.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                La obra se enmarca en el Proyecto de Fortalecimiento de la Red de Mejoramiento de la Calidad y la aplicación del Modelo de Atención Integral de Salud (MAIS). Y cumple los objetivos de Plan Nacional del Buen Vivir.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                El nuevo modelo se basa en la promoción de la salud and en la prevención de enfermedades, con calidad en la atención y respeto a la diversidad cultural.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-bold text-emerald-900 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                El Centro de Salud Rioverde beneficiará a más de 32.800 mil habitantes de las parroquias Rioverde, Rocafuerte, Montalvo, Lagarto, Chontaduro, Chumundé entre otras más.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                La obra tardó 30 meses (desde enero del 2013- junio 2015) y tuvo una inversión de 3,6 millones de dólares (Infraestructura 2’704.745; Equipamiento 908.509). • La construcción es de 2.646 m2 y está en un predio de 7.225 m2 donado por el GAD de Rioverde, que colaboró además con algunas obras de saneamiento.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                El Centro dispone de 95 profesionales en las áreas de medicina familiar, promoción y prevención, salud oral y ocupacional, ginecología, rehabilitación, rayos X, ecografía, consulta externa, farmacia, 2 unidades de parto, emergencias. Atenderá de lunes a viernes  de 8:00 a 16:30, y en emergencias las 24 horas.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                El Centro de salud ejecuta programas como Ecuador sin muertes maternas, detección oportuna de cáncer de mama y cérvico uterino, prevención e identificación de pacientes con discapacidad, tamizajes neonatal, planificación familiar, atención integral del adulto mayor y del adolescente, tuberculosis, VIH, nutrición, entre otros.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                Además dispone de personal para trabajar fuera del Centro en la atención integral de salud; políticas de captación y seguimiento de madres embarazadas y posparto; equipamiento para diagnóstico oportuno; y servicios para que los pacientes no tengan que acudir al segundo nivel de atención en hospitales más grandes.
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Mission & Vision blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3 p-5 bg-emerald-50/50 border border-emerald-100/60 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Target className="w-5 h-5" />
                  <h4 className="font-sans font-extrabold text-[15px]">Nuestra Misión</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Brindar servicios integrales de salud de primer nivel y de emergencias con calidad, equidad, gratuidad y calidez intercultural, integrando activamente a la comunidad de Rioverde en la promoción y prevención de la salud.
                </p>
              </div>

              <div className="space-y-3 p-5 bg-emerald-50/50 border border-emerald-100/60 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Eye className="w-5 h-5 flex-shrink-0" />
                  <h4 className="font-sans font-extrabold text-[15px]">Nuestra Visión</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ser el centro de salud de referencia líder en la provincia de Esmeraldas, reconocido por su excelencia en emergencias, resolución clínica preventiva de alto impacto, participación social y calidez humana.
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Values bullet points layout */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5.5 h-5.5 text-emerald-600" />
                <h3 className="font-sans font-black text-xl text-emerald-900">Valores Institucionales</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: "Interculturalidad", desc: "Respeto a saberes ancestrales locales." },
                  { title: "Gratuidad", desc: "Sin cuotas de co-pago ni servicios privados." },
                  { title: "Calidez Humana", desc: "Empatía con respeto mutuo permanente." },
                  { title: "Calidad Técnica", desc: "Equipos automatizados y médicos idóneos." },
                  { title: "Transparencia", desc: "Gestión ética, cuentas y recursos públicos públicos." },
                  { title: "Ética Asistencial", desc: "Vocación de auxilio en beneficio del prójimo." }
                ].map((val, idx) => (
                  <div key={idx} className="p-4 border border-gray-100 rounded-xl space-y-1">
                    <strong className="text-xs text-emerald-950 font-sans font-black block">{val.title}</strong>
                    <span className="text-[11px] text-gray-500 leading-tight block">{val.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar cards with metadata on right */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Stat indicators cards */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest font-mono text-emerald-700">MARCO DE OPERACIÓN MSP</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-gray-900 block font-sans">Acreditación Oficial</strong>
                    <span className="text-[11px] text-gray-500 leading-normal block">SIS-REPS código institucional nacional asignado por el MSP de la República del Ecuador.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-gray-900 block font-sans">Clasificación de Establecimiento</strong>
                    <span className="text-[11px] text-gray-500 leading-normal block">Primer Nivel de Atención - Tipología C (Centro Materno Infantil y Emergencia 24H).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-gray-900 block font-sans">Población Protegida</strong>
                    <span className="text-[11px] text-gray-500 leading-normal block">Más de 32,800 habitantes permanentes en el territorio de Rioverde y la costa esmeraldeña.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Statement Box */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 shadow-sm space-y-4">
              <HeartPulse className="w-8 h-8 text-emerald-400" />
              <h4 className="font-sans font-extrabold text-white text-md">Nuestro Compromiso de Salud</h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                "Promover el acceso equitativo and oportuno a los servicios de salud del Ecuador, erradicando barreras geográficas o económicas de nuestra colectividad mediante la entrega constante de medicamentos y atenciones 100% financiadas por el Estado."
              </p>
              <div className="border-t border-white/10 pt-3 text-[10px] text-emerald-300 font-mono">
                — Comité Técnico de Salud Tipo C Rioverde
              </div>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
