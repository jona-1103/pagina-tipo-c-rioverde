/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Clock, Phone, Mail, Radio, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Ubicacion() {
  return (
    <section className="pt-2 pb-12 bg-slate-50" id="seccion-ubicacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CONTAINER VERDE OSCURO CON BORDES REDONDEADOS - SPLIT 50% INFO / 50% MAP */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-emerald-950 rounded-3xl overflow-hidden shadow-xl border border-emerald-900 grid grid-cols-1 lg:grid-cols-2 items-stretch"
        >
          
          {/* LEFT COLUMN: Title, Subtitle & Location details (1/2 of width on desktop) */}
          <div className="p-5 sm:p-6 lg:p-8 text-white flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <span className="text-emerald-400 font-mono text-[9px] font-bold tracking-widest uppercase flex items-center md:justify-start gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> CONTACTO Y ATENCIÓN
              </span>
              <h3 className="font-sans font-black text-xl sm:text-2xl text-emerald-50 tracking-tight leading-none mt-0.5">
                Ubicación
              </h3>
              <p className="text-[11px] text-emerald-200/85 max-w-xl leading-relaxed">
                Visítenos en nuestras instalaciones en Rioverde o contáctese de manera directa con nuestra área de atención ciudadana y canales oficiales MSP.
              </p>
            </div>

            {/* Grid of contact card items formatted in a 2x2 grid for optimal space utilization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-emerald-900/60 pt-4">
              
              {/* Address */}
              <motion.div 
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2.5"
              >
                <div className="p-1.5 h-fit bg-emerald-900/60 text-emerald-300 rounded-lg shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-emerald-300 uppercase tracking-wider block font-mono text-[8px]">DIRECCIÓN GEOGRÁFICA</strong>
                  <span className="text-emerald-50 leading-relaxed block text-[10.5px]">
                    Km 1/2 vía a San Lorenzo, parroquia y cantón Rioverde, provincia de Esmeraldas.
                  </span>
                </div>
              </motion.div>

              {/* Schedules */}
              <motion.div 
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2.5"
              >
                <div className="p-1.5 h-fit bg-emerald-900/60 text-emerald-300 rounded-lg shrink-0">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-emerald-300 uppercase tracking-wider block font-mono text-[8px]">HORARIOS ASISTENCIALES</strong>
                  <div className="text-emerald-50 leading-normal space-y-0.5 text-[10.5px]">
                    <p><span className="text-emerald-400 font-medium">Emergencia:</span> 24H / 7 Días</p>
                    <p><span className="text-emerald-400 font-medium">C. Externa:</span> Lun - Vie | 8 AM - 5 PM</p>
                  </div>
                </div>
              </motion.div>

              {/* Telephone */}
              <motion.div 
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2.5"
              >
                <div className="p-1.5 h-fit bg-emerald-900/60 text-emerald-300 rounded-lg shrink-0">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-emerald-300 uppercase tracking-wider block font-mono text-[8px]">CENTRAL TELEFÓNICA MSP</strong>
                  <span className="text-emerald-50 leading-relaxed block text-[10.5px]">
                    +593 (06) 276-8150 <br />
                    Emergencias: <span className="text-emerald-400 font-mono font-bold">Llamar al 911</span>
                  </span>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div 
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2.5"
              >
                <div className="p-1.5 h-fit bg-emerald-900/60 text-emerald-300 rounded-lg shrink-0">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-emerald-300 uppercase tracking-wider block font-mono text-[8px]">CORREO INSTITUCIONAL</strong>
                  <span className="text-emerald-50 block font-mono break-all leading-relaxed text-[10.5px]">
                    oficina.tecnica.08ot06@08d01.saludzona1.gob.ec <br />
                    correogeneralcstcr@gmail.com
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Referencia de Llegada bottom sub-card */}
            <div className="p-3 bg-emerald-900/40 border border-emerald-900/60 rounded-xl flex flex-col gap-1.5 justify-between">
              <div className="space-y-0.5">
                <span className="text-[8px] uppercase tracking-widest font-mono text-emerald-400 flex items-center gap-1 font-bold">
                  <Compass className="w-3 h-3 text-emerald-400" /> REFERENCIA DE LLEGADA
                </span>
                <p className="text-[10.5px] text-emerald-100/90 leading-relaxed">
                  Pasando el puente vía San Lorenzo frente a la camaronera Shimp Ecuador.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Google Maps taking exactly 50% width on desktop and matching container height, height reduced to half (180px dynamically/mobile and matching desktop container tightly) */}
          <div className="relative w-full h-[180px] lg:h-auto border-t lg:border-t-0 lg:border-l border-emerald-900/60 overflow-hidden min-h-[200px]">
            <iframe
              src="https://maps.google.com/maps?q=Centro%20de%20Salud%20Tipo%20C%20Rioverde&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-none opacity-90 transition-opacity hover:opacity-100"
              title="Mapa de Ubicación Tipo C Rioverde"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

