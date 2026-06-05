/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Clock, MapPin, Compass, Send, CheckCircle2, User, HelpCircle, Loader2, Info } from 'lucide-react';

export default function ContactoPage() {
  // Form States
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    destinatario: 'oficina.tecnica.08ot06@08d01.saludzona1.gob.ec'
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (!formData.nombre.trim()) {
      setError('Por favor, ingrese su nombre completo.');
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    if (!formData.asunto.trim()) {
      setError('Por favor, ingrese el asunto de su mensaje.');
      return;
    }
    if (!formData.mensaje.trim() || formData.mensaje.length < 10) {
      setError('El mensaje es muy corto (mínimo 10 caracteres).');
      return;
    }

    setLoading(true);

    // Simulate server dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Generate a nice random tracking ticket number
      const randomTicket = 'MSP-RV-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(randomTicket);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: '',
      destinatario: 'oficina.tecnica.08ot06@08d01.saludzona1.gob.ec'
    });
    setSubmitted(false);
    setTicketId('');
    setError('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-16 bg-slate-50 min-h-screen"
      id="pagina-contacto-completa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase font-mono bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
            Atención Ciudadana Directa
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-emerald-950 tracking-tight leading-none">
            Contacto CS. Tipo C Rioverde
          </h2>
          <div className="w-16 h-1 w-24 bg-emerald-600 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-500 leading-relaxed pt-2">
            ¿Tienes alguna consulta o dudas? Háganos llegar su mensaje, su opinión nos interesa y nos ayudara a mejor nuestro servicio.
          </p>
        </div>

        {/* Two column split: Form on Left, Contact/Map sidebar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Interactive Contact Form Section (cols-span-7/12) */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-black text-xl text-emerald-950 mb-2">Formulario de Contacto</h3>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">Para nosotros es muy importante lo que usted tiene que decirnos acerca de nuestros servicios. Con sus ideas, comentarios y opiniones las tomaremos muy en cuenta para mejorar día a día nuestra atención hacia ustedes.</p>
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* THE ACTIVE FORM */
                  <motion.form 
                    key="contact-form-active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit} 
                    className="space-y-4"
                  >
                    
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl font-medium flex items-center gap-2">
                        <Info className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Nombre Completo *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Ejem: Jefferson David Ayoví Caicedo"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white text-xs text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Email and Phone side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Correo Electrónico *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Ejem: correo@dominio.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white text-xs text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Teléfono o Celular</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            placeholder="Ejem: 0987654321"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white text-xs text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Destination Email Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Enviar mensaje a (Destinatario) *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 text-gray-400 top-3.5 w-4 h-4 pointer-events-none" />
                        <select
                          name="destinatario"
                          required
                          value={formData.destinatario}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white text-xs text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]%20bg-[length:10px]_bg-[right_1rem_center]_bg-no-repeat"
                        >
                          <option value="oficina.tecnica.08ot06@08d01.saludzona1.gob.ec">Oficina Técnica (oficina.tecnica.08ot06@cstcr.gob.ec)</option>
                          <option value="correogeneralcstcr@gmail.com">Soporte/Correo General (correogeneralcstcr@gmail.com)</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Asunto de Mensaje *</label>
                      <div className="relative">
                        <HelpCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          name="asunto"
                          required
                          value={formData.asunto}
                          onChange={handleInputChange}
                          placeholder="Ejem: Consulta sobre horarios, especialidades, sugerencias..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white text-xs text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Message body */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Mensaje *</label>
                      <textarea
                        name="mensaje"
                        rows={4}
                        required
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Escriba aquí los detalles correspondientes..."
                        className="w-full p-4 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white text-xs text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-950 border-none text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-800/10"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                          Enviando Mensaje...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-white" />
                          Enviar mensaje
                        </>
                      )}
                    </button>

                  </motion.form>
                ) : (
                  /* FORM SUBMITTED SUCCESS BLOCK */
                  <motion.div
                    key="contact-form-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 bg-emerald-50 border border-emerald-150 rounded-2xl text-center space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-sans font-black text-xl text-emerald-950">¡Mensaje Enviado con Éxito!</h4>
                      <p className="text-xs text-gray-600 max-w-md mx-auto">
                        Su consulta ha ingresado a la bandeja interna de Atención Ciudadana del Ministerio de Salud de Rioverde.
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-emerald-100 rounded-xl max-w-sm mx-auto space-y-2 text-left">
                      <div className="flex justify-between text-[11px] border-b border-gray-55 pb-1.5 leading-none">
                        <span className="text-gray-400 font-mono">TICKET DE ATENCIÓN:</span>
                        <strong className="text-emerald-800 font-mono">{ticketId}</strong>
                      </div>
                      <div className="flex justify-between text-[11px] border-b border-gray-55 pb-1.5 leading-none">
                        <span className="text-gray-400 font-mono">ENVIADO A:</span>
                        <strong className="text-emerald-800 font-mono break-all text-xs text-right max-w-[180px]">{formData.destinatario}</strong>
                      </div>
                      <div className="flex justify-between text-[11px] border-b border-gray-55 pb-1.5 leading-none">
                        <span className="text-gray-400 font-mono">Remitente:</span>
                        <strong className="text-slate-800">{formData.nombre}</strong>
                      </div>
                      <div className="flex justify-between text-[11px] leading-none">
                        <span className="text-gray-400 font-mono">Asunto:</span>
                        <strong className="text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                          {formData.asunto}
                        </strong>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 italic">Un funcionario técnico responderá a su consulta en un lapso no mayor a 24 horas laborables.</p>

                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      Enviar otra consulta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="border-t border-slate-100 pt-5 mt-6 text-[10px] text-gray-400 leading-snug flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Sus datos se transmiten cifrados bajo los protocolos de protección del Ministerio de Salud de Ecuador.</span>
            </div>
          </div>

          {/* RIGHT: Direct lines and Geographical Address Sidebar (cols-span-5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Top Info box contact card list */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1">
                <span className="text-emerald-400 font-mono text-[9px] font-bold tracking-widest uppercase block">DATOS DE UBICACIÓN Y HORARIOS</span>
              </div>

              <div className="space-y-4 text-xs">
                
                {/* 1. Direccion */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-900 rounded-lg text-emerald-300 shrink-0 h-fit">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-emerald-300 uppercase tracking-widest font-mono text-[8px] block">Dirección Geográfica</strong>
                    <p className="text-emerald-100/90 leading-relaxed text-[11px]">
                      Km 1/2 vía a San Lorenzo, parroquia y cantón Rioverde, provincia de Esmeraldas.
                    </p>
                  </div>
                </div>

                {/* 2. Referencia */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-900 rounded-lg text-emerald-300 shrink-0 h-fit">
                    <Compass className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-emerald-300 uppercase tracking-widest font-mono text-[8px] block">Referencia de Llegada</strong>
                    <p className="text-emerald-100/90 leading-relaxed text-[11px]">
                      Pasando el puente vía San Lorenzo frente a la camaronera Shimp Ecuador.
                    </p>
                  </div>
                </div>

                {/* 3. Central Telefonica */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-900 rounded-lg text-emerald-300 shrink-0 h-fit">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-emerald-300 uppercase tracking-widest font-mono text-[8px] block">Central Telefónica</strong>
                    <p className="text-emerald-100/90 leading-relaxed text-[11px]">
                      +593 (06) 276-8150 <br />
                      Emergencias: <span className="text-emerald-400 font-bold">Llamar al 911</span>
                    </p>
                  </div>
                </div>

                {/* 4. Correo */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-900 rounded-lg text-emerald-300 shrink-0 h-fit">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-emerald-300 uppercase tracking-widest font-mono text-[8px] block">Correo Oficial</strong>
                    <p className="text-emerald-100/90 font-mono text-[10.5px] break-all leading-relaxed">
                      oficina.tecnica.08ot06@08d01.saludzona1.gob.ec <br />
                      correogeneralcstcr@gmail.com
                    </p>
                  </div>
                </div>

              </div>
              
            </div>

            {/* Bottom Google Maps iframe sidebar */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-[220px] lg:h-auto min-h-[225px] flex-1">
              <iframe
                src="https://maps.google.com/maps?q=Centro%20de%20Salud%20Tipo%20C%20Rioverde&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-none opacity-90 transition-opacity hover:opacity-100"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
                title="Georreferenciación Centro de Salud Tipo C Rioverde"
              ></iframe>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
