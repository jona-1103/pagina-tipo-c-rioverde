/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, FileText, Phone, Mail, CheckCircle2, Ticket, Printer, ShieldAlert } from 'lucide-react';
import { specialtiesList, timeSlotsList } from '../data';
import { AppointmentInput } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpecialtyId?: string;
}

export default function AppointmentModal({ isOpen, onClose, initialSpecialtyId }: AppointmentModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<AppointmentInput>({
    fullName: '',
    dni: '',
    email: '',
    phone: '',
    specialty: initialSpecialtyId || 'general',
    date: new Date().toISOString().split('T')[0],
    timeSlot: timeSlotsList[0],
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentInput, string>>>({});
  const [ticketCode, setTicketCode] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const doctorsBySpecialty: Record<string, string> = {
    general: 'Dr. Fernando Quintero (Medicina Familiar)',
    pediatria: 'Dra. Mercedes Ortiz (Pediatra)',
    ginecologia: 'Dra. Elena Caicedo (Obstetra - Ginecóloga)',
    odontologia: 'Dr. Mateo Rosero (Odontólogo)',
    psicologia: 'Psic. Viviana Estupiñán (Psicóloga Clínica)',
    nutricion: 'Nut. Carlos Angulo (Nutricionista)',
  };

  const validateForm = (): boolean => {
    const tempErrors: Partial<Record<keyof AppointmentInput, string>> = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'El nombre completo es requerido';
    if (!formData.dni.trim()) {
      tempErrors.dni = 'La cédula de identidad es requerida';
    } else if (!/^\d{10}$/.test(formData.dni)) {
      tempErrors.dni = 'La cédula ecuatoriana debe tener exactamente 10 dígitos numéricos';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Ingrese un correo electrónico válido';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'El teléfono de contacto es requerido';
    } else if (!/^(09|\+593)\d{8,9}$/.test(formData.phone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Ingrese un número telefónico ecuatoriano válido (Ej: 0991234567)';
    }
    if (!formData.date) tempErrors.date = 'Seleccione una fecha para su cita';
    
    // Ensure date is not in the past
    const selectedDate = new Date(formData.date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      tempErrors.date = 'La fecha de la cita no puede ser anterior al día de hoy';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Generate a realistic ticket code
      const code = `TRV-${Math.floor(100000 + Math.random() * 900000)}`;
      const selectedDoc = doctorsBySpecialty[formData.specialty] || 'Médico General de Turno';
      setTicketCode(code);
      setDoctorName(selectedDoc);
      setStep(2);

      // Save appointment in localStorage for persistence demo
      const existing = localStorage.getItem('rioverde_appointments');
      const list = existing ? JSON.parse(existing) : [];
      list.push({ ...formData, code, doc: selectedDoc, timestamp: new Date().toISOString() });
      localStorage.setItem('rioverde_appointments', JSON.stringify(list));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      fullName: '',
      dni: '',
      email: '',
      phone: '',
      specialty: 'general',
      date: new Date().toISOString().split('T')[0],
      timeSlot: timeSlotsList[0],
      notes: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100"
        id="appointment-modal-container"
      >
        {/* Banner header inside modal */}
        <div className="bg-emerald-950 px-6 py-4 flex items-center justify-between text-white border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-lg">Agendamiento de Cita Médica</h3>
              <p className="text-xs text-emerald-300 font-mono">Centro de Salud Tipo C Rioverde - MSP</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-emerald-200 hover:text-white"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-5" id="appointment-form">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed flex gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Información Importante:</strong> El agendamiento por este canal digital es totalmente gratuito y personal. Por favor, asegúrese de ingresar sus datos correctamente. Preséntese 20 minutos antes de su cita asignada en el área de Admisión con su cédula de identidad original.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-700" /> NOMBRE COMPLETO DEL PACIENTE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Apellidos y Nombres"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300"
                  />
                  {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                </div>

                {/* Cedula */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-700" /> CÉDULA DE IDENTIDAD (10 DÍGITOS) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value.replace(/\D/g, '') })}
                    placeholder="Ej: 0801234567"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300 font-mono"
                  />
                  {errors.dni && <p className="text-red-500 text-[11px] mt-1">{errors.dni}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-700" /> CORREO ELECTRÓNICO *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="paciente@correo.com"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300"
                  />
                  {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" /> TELÉFONO DE CONTACTO *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej: 0991234567"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300 font-mono"
                  />
                  {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                {/* Specialty */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">ESPECIALIDAD MÉDICA *</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300"
                  >
                    {specialtiesList.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor predicted */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">PROFESIONAL ASIGNADO</label>
                  <div className="w-full px-3 py-2 text-sm bg-emerald-50/50 text-emerald-900 border border-emerald-100 rounded-lg select-none">
                    {doctorsBySpecialty[formData.specialty]}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" /> FECHA DE CITA *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300 font-mono"
                  />
                  {errors.date && <p className="text-red-500 text-[11px] mt-1">{errors.date}</p>}
                </div>

                {/* Time slot */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" /> HORARIOS DISPONIBLES *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300 font-mono"
                  >
                    {timeSlotsList.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-emerald-950 mb-1">MOTIVO DE CONSULTA / SÍNTOMAS (OPCIONAL)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describa brevemente su malestar o requerimiento (ej. Control rutinario, dolor estomacal, renovación de receta, etc.)"
                  rows={2}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-300"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm shadow-emerald-700/10 cursor-pointer"
                >
                  Confirmar Agendamiento
                </button>
              </div>
            </form>
          ) : (
            /* PRINTABLE TICKET STEP */
            <div className="space-y-6" id="appointment-ticket-step">
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-full text-emerald-600 mb-2">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="font-sans font-bold text-xl text-emerald-950">¡Cita Médica Agendada Exitosamente!</h4>
                <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
                  Se ha generado su ticket de cita institucional. Guarde este código o descargue/imprima este documento para presentarlo el día de su consulta.
                </p>
              </div>

              {/* TICKET BACKGROUND CARD */}
              <div className="border border-emerald-200 bg-emerald-50/20 rounded-xl p-6 relative overflow-hidden font-sans border-dashed border-2">
                <div className="absolute top-0 right-0 p-3 bg-emerald-900 text-white text-[10px] font-mono rounded-bl-lg tracking-wider font-bold">
                  MSP OFICIAL
                </div>

                <div className="border-b border-dashed border-emerald-200 pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <h5 className="font-sans font-bold text-emerald-900 text-base flex items-center gap-1.5 uppercase">
                      <Ticket className="w-4 h-4 text-emerald-700" /> TICKET DE ATENCIÓN
                    </h5>
                    <p className="text-xs text-gray-500 font-mono">TIPO C RIOVERDE - SERVICIO RED PÚBLICA</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Código de Registro:</span>
                    <p className="font-mono font-extrabold text-emerald-950 text-base">{ticketCode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <span className="text-xs text-cool-gray-400 block font-semibold text-teal-800 uppercase">Paciente:</span>
                    <span className="font-semibold text-gray-900">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-cool-gray-400 block font-semibold text-teal-800 uppercase">Cédula:</span>
                    <span className="font-mono text-gray-900">{formData.dni}</span>
                  </div>
                  <div>
                    <span className="text-xs text-cool-gray-400 block font-semibold text-teal-800 uppercase">Especialidad:</span>
                    <span className="font-semibold text-gray-900">
                      {specialtiesList.find((s) => s.id === formData.specialty)?.name || formData.specialty}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-cool-gray-400 block font-semibold text-teal-800 uppercase">Profesional Asignado:</span>
                    <span className="text-emerald-950 font-semibold">{doctorName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-cool-gray-400 block font-semibold text-teal-800 uppercase">Fecha de Cita:</span>
                    <span className="font-mono text-gray-900 font-bold">{formData.date}</span>
                  </div>
                  <div>
                    <span className="text-xs text-cool-gray-400 block font-semibold text-teal-800 uppercase">Rango de Hora:</span>
                    <span className="font-mono text-emerald-700 font-bold">{formData.timeSlot}</span>
                  </div>
                </div>

                {/* Additional simulated details like Barcode for supreme realism */}
                <div className="mt-6 pt-4 border-t border-emerald-100 flex flex-col items-center justify-center text-center">
                  <div className="font-mono text-xs text-gray-400 tracking-[1em] select-none text-center bg-white px-4 py-1.5 rounded border border-gray-100 dark:border-none shadow-sm font-semibold mb-1">
                    ||||| | |||| ||| |||| || ||| | |||
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 uppercase">No válido como receta ni diagnóstico médico</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-gray-300"
                >
                  <Printer className="w-4 h-4" /> Imprimir o Guardar PDF
                </button>
                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950/10 cursor-pointer"
                >
                  Terminar y Salir
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
