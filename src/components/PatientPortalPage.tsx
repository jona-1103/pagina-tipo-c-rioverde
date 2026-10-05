/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Calendar, 
  Syringe, 
  FileText, 
  Pill, 
  LogOut, 
  CheckCircle2, 
  Download, 
  Printer, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Activity, 
  Stethoscope, 
  ChevronRight, 
  QrCode, 
  Info,
  ArrowRight
} from 'lucide-react';
import { DEMO_PATIENTS } from '../data/patientPortalData';
import { PatientProfile, VaccineRecord, MedicalConsultation } from '../types';

interface PatientPortalPageProps {
  onOpenAppointment?: () => void;
}

export default function PatientPortalPage({ onOpenAppointment }: PatientPortalPageProps) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<PatientProfile | null>(null);
  const [dniInput, setDniInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'vacunas' | 'historial' | 'recetas' | 'citas'>('vacunas');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanDni = dniInput.trim();
    const found = DEMO_PATIENTS.find(
      (p) => p.dni === cleanDni || p.dni.endsWith(cleanDni)
    );

    if (found) {
      setCurrentUser(found);
      setDniInput('');
      setPasswordInput('');
    } else {
      setLoginError('No se encontró un registro con la cédula ingresada. Puedes probar una de las cuentas demo disponibles a continuación.');
    }
  };

  // One-click quick demo login
  const handleQuickLogin = (patient: PatientProfile) => {
    setLoginError('');
    setCurrentUser(patient);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('vacunas');
    setShowCertificateModal(false);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50/70" id="portal-del-paciente">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIEW 1: LOGIN INTERFACE (WHEN NOT AUTHENTICATED) */}
        {!currentUser ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header Title */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Portal Digital del Paciente</span>
              </div>
              <h1 className="font-sans font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight">
                Consulta tu Historial Médico y Carnet de Vacunación
              </h1>
              <div className="w-16 h-1 bg-emerald-600 mx-auto rounded"></div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Accede de forma segura y confidencial a tus atenciones médicas, certificados de vacunas aplicadas y recetas en el Centro de Salud Tipo C Rioverde.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Login Form Box */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm text-left">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="p-2.5 bg-emerald-100/70 text-emerald-800 rounded-2xl">
                    <Lock className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Ingreso con Cédula de Identidad
                    </h2>
                    <div className="text-xs text-slate-500">
                      Autenticación oficial de usuarios MSP
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="login-dni" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Número de Cédula (DNI) *
                    </label>
                    <div className="relative">
                      <input
                        id="login-dni"
                        type="text"
                        maxLength={10}
                        value={dniInput}
                        onChange={(e) => setDniInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="Ejemplo: 0802456789"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Ingresa los 10 dígitos de tu cédula ecuatoriana sin guiones.
                    </span>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Fecha de Nacimiento o Contraseña
                    </label>
                    <div className="relative">
                      <input
                        id="login-password"
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <span>Recordar en este equipo</span>
                    </label>
                    <span className="text-emerald-700 font-medium">¿Olvidaste tus datos?</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ingresar a mi Historial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Conexión cifrada y protegida por la Ley Orgánica de Salud del Ecuador.</span>
                </div>
              </div>

              {/* Demo Accounts Panel */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-emerald-800 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                      <Info className="w-4 h-4" />
                      <span>Acceso Rápido de Prueba (Demo)</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Explora el Portal con Pacientes Modelo
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-5">
                      Haz clic en cualquiera de las siguientes cuentas para acceder instantáneamente sin necesidad de tipear credenciales:
                    </p>

                    <div className="space-y-3">
                      {DEMO_PATIENTS.map((patient) => (
                        <button
                          key={patient.id}
                          type="button"
                          onClick={() => handleQuickLogin(patient)}
                          className="w-full flex items-center justify-between p-3.5 bg-emerald-900/70 hover:bg-emerald-800/90 text-white rounded-2xl border border-emerald-700/60 transition-all text-left cursor-pointer group hover:border-emerald-400"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-700 border border-emerald-400/60 flex items-center justify-center font-bold text-emerald-100 text-xs shrink-0">
                              {patient.fullName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-200 transition-colors">
                                {patient.fullName}
                              </div>
                              <div className="text-[11px] text-emerald-200/80 flex items-center gap-1.5 mt-0.5">
                                <span>Cédula: {patient.dni}</span>
                                <span aria-hidden="true">·</span>
                                <span>{patient.parish}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
                            <span className="hidden sm:inline">Entrar</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-xs text-slate-600 leading-relaxed space-y-2">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-emerald-600" />
                    <span>¿Eres paciente nuevo en el cantón Rioverde?</span>
                  </div>
                  <p>
                    Para abrir tu Historia Clínica Única (HCU) en el sistema MSP, acude presencialmente al módulo de Admisión del Centro de Salud con tu documento de identidad original.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (

          /* VIEW 2: AUTHENTICATED PATIENT PORTAL DASHBOARD */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Top Patient ID Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md border-2 border-emerald-600">
                  {currentUser.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {currentUser.fullName}
                    </h2>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-2 py-0.5">
                      Paciente Activo MSP
                    </span>
                  </div>

                  {/* Patient unboxed metadata (Zero-Pill discipline) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                    <span className="font-mono font-medium text-slate-700">C.I.: {currentUser.dni}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>HCU: {currentUser.hcuNumber}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>{currentUser.age} años ({currentUser.gender})</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {currentUser.parish}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 flex-wrap">
                    <span>Grupo Sanguíneo: <strong className="text-slate-800 font-semibold">{currentUser.bloodType}</strong></span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>Alergias: <strong className="text-rose-700 font-semibold">{currentUser.allergies}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Carnet de Vacunas</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  title="Cerrar sesión segura"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Interactive Functional Tabs) */}
            <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-left">
              <button
                type="button"
                onClick={() => setActiveTab('vacunas')}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'vacunas'
                    ? 'border-emerald-600 text-emerald-800 bg-white shadow-2xs rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Syringe className="w-4 h-4 text-emerald-600" />
                <span>Registro de Vacunación ({currentUser.vaccines.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('historial')}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'historial'
                    ? 'border-emerald-600 text-emerald-800 bg-white shadow-2xs rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Historial de Consultas ({currentUser.consultations.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('recetas')}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'recetas'
                    ? 'border-emerald-600 text-emerald-800 bg-white shadow-2xs rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Pill className="w-4 h-4 text-emerald-600" />
                <span>Recetas y Medicamentos ({currentUser.prescriptions.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('citas')}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'citas'
                    ? 'border-emerald-600 text-emerald-800 bg-white shadow-2xs rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Próximas Citas ({currentUser.appointments.length})</span>
              </button>
            </div>

            {/* TAB CONTENT: 1. REGISTRO DE VACUNACIÓN */}
            {activeTab === 'vacunas' && (
              <div className="space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Carnet Digital Oficial de Inmunización MSP
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Registro informatizado de vacunas aplicadas en el Centro de Salud Tipo C Rioverde y brigadas cantonales.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCertificateModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Download className="w-4 h-4" />
                    <span>Ver Certificado Completo</span>
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200/80 uppercase text-[11px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 sm:px-6">Vacuna / Inmunógeno</th>
                          <th className="py-3.5 px-4">Dosis</th>
                          <th className="py-3.5 px-4">Fecha Aplicación</th>
                          <th className="py-3.5 px-4">Lote</th>
                          <th className="py-3.5 px-4">Establecimiento</th>
                          <th className="py-3.5 px-4 text-right">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {currentUser.vaccines.map((v) => (
                          <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-4 sm:px-6">
                              <div className="font-bold text-slate-900">{v.vaccineName}</div>
                              <div className="text-xs text-slate-500 mt-0.5">Protege contra: {v.targetDisease}</div>
                            </td>
                            <td className="py-4 px-4 font-medium text-slate-700">
                              {v.dose}
                            </td>
                            <td className="py-4 px-4 font-mono text-slate-700 text-xs">
                              {v.appliedDate}
                            </td>
                            <td className="py-4 px-4 font-mono text-slate-500 text-xs">
                              {v.batchNumber}
                            </td>
                            <td className="py-4 px-4 text-xs text-slate-600">
                              {v.facility}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="inline-flex items-center gap-1 font-bold text-xs text-emerald-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                {v.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. HISTORIAL CLÍNICO */}
            {activeTab === 'historial' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                  <h3 className="text-base font-black text-slate-900">
                    Historial de Consultas Médicas y Atenciones
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cronología clínica de atenciones en consulta externa, triage de urgencia y salas especializadas.
                  </p>
                </div>

                <div className="space-y-4">
                  {currentUser.consultations.map((consult) => (
                    <div 
                      key={consult.id}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-emerald-800 text-sm sm:text-base">
                              {consult.specialty}
                            </span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-xs text-slate-500 font-medium">
                              {consult.doctorName}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Motivo: <strong className="text-slate-700 font-medium">{consult.reason}</strong>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 font-mono self-start sm:self-auto">
                          {consult.date}
                        </div>
                      </div>

                      {/* Vital signs block */}
                      {consult.vitalSigns && Object.keys(consult.vitalSigns).length > 0 && (
                        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/60">
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Signos Vitales y Somatometría</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            {consult.vitalSigns.bloodPressure && (
                              <div>
                                <span className="text-slate-400 block text-[10px]">Presión Arterial</span>
                                <span className="font-bold text-slate-800">{consult.vitalSigns.bloodPressure}</span>
                              </div>
                            )}
                            {consult.vitalSigns.heartRate && (
                              <div>
                                <span className="text-slate-400 block text-[10px]">Frecuencia Cardíaca</span>
                                <span className="font-bold text-slate-800">{consult.vitalSigns.heartRate}</span>
                              </div>
                            )}
                            {consult.vitalSigns.weight && (
                              <div>
                                <span className="text-slate-400 block text-[10px]">Peso / Talla</span>
                                <span className="font-bold text-slate-800">{consult.vitalSigns.weight} {consult.vitalSigns.height ? `/ ${consult.vitalSigns.height}` : ''}</span>
                              </div>
                            )}
                            {consult.vitalSigns.bmi && (
                              <div>
                                <span className="text-slate-400 block text-[10px]">Índice Masa Corporal</span>
                                <span className="font-bold text-slate-800">{consult.vitalSigns.bmi}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Diagnóstico CIE-10 */}
                      <div className="text-xs space-y-1">
                        <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                          Diagnóstico Principal (CIE-10):
                        </div>
                        <div className="font-bold text-slate-900 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                          {consult.diagnosisCie10}
                        </div>
                      </div>

                      {/* Notes and Treatment Plan */}
                      <div className="text-xs text-slate-600 space-y-2 leading-relaxed pt-1">
                        <div>
                          <strong className="text-slate-800">Evolución Clínica:</strong> {consult.notes}
                        </div>
                        <div>
                          <strong className="text-emerald-800">Plan de Tratamiento / Indicaciones:</strong> {consult.treatmentPlan}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. RECETAS Y MEDICAMENTOS */}
            {activeTab === 'recetas' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                  <h3 className="text-base font-black text-slate-900">
                    Recetas Médicas y Fármacos Dispensados
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Medicamentos recetados por los médicos tratantes y despachados de forma 100% gratuita por la Farmacia Institucional del MSP.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentUser.prescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="p-2 bg-emerald-100/70 text-emerald-800 rounded-xl">
                            <Pill className="w-4 h-4 text-emerald-700" />
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {rx.prescribedDate}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900">
                          {rx.medication}
                        </h4>
                        <div className="text-xs text-slate-600 mt-2 space-y-1">
                          <p><strong>Dosis:</strong> {rx.dosage}</p>
                          <p><strong>Frecuencia:</strong> {rx.frequency}</p>
                          <p><strong>Duración:</strong> {rx.duration}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {rx.dispensedStatus}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          Gratuito MSP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. PRÓXIMAS CITAS */}
            {activeTab === 'citas' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Citas Médicas Programadas en Agenda
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verifica la fecha, hora y consultorio asignado para tus controles preventivos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenAppointment) onOpenAppointment();
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    Agendar Nueva Cita
                  </button>
                </div>

                <div className="space-y-3">
                  {currentUser.appointments.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200/80">
                          <Calendar className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                            {app.specialty}
                          </h4>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-slate-700">{app.doctorName}</span>
                            <span aria-hidden="true">·</span>
                            <span>{app.room}</span>
                          </div>
                          <div className="text-xs text-emerald-700 font-bold mt-1">
                            Estado: {app.status}
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
                        <div className="font-mono font-bold text-slate-900 text-sm">
                          {app.date}
                        </div>
                        <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1 sm:justify-end mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{app.timeSlot}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODAL: CARNET OFICIAL DE VACUNACIÓN IMPRIMIBLE */}
            <AnimatePresence>
              {showCertificateModal && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
                  onClick={() => setShowCertificateModal(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 text-left"
                  >
                    {/* Official Certificate Header */}
                    <div className="bg-emerald-950 text-white p-6 sm:p-7 relative border-b-4 border-emerald-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-800 rounded-xl">
                            <ShieldCheck className="w-6 h-6 text-emerald-200" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block">
                              República del Ecuador · Ministerio de Salud Pública
                            </span>
                            <h3 className="text-lg sm:text-xl font-black text-white">
                              Certificado Digital de Vacunación
                            </h3>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Imprimir</span>
                        </button>
                      </div>
                    </div>

                    {/* Certificate Body */}
                    <div className="p-6 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto">
                      {/* Patient details */}
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Paciente</span>
                          <span className="font-bold text-slate-800 text-sm">{currentUser.fullName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Cédula de Identidad</span>
                          <span className="font-mono font-bold text-slate-800">{currentUser.dni}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Historia Clínica (HCU)</span>
                          <span className="font-mono text-slate-700">{currentUser.hcuNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Establecimiento</span>
                          <span className="font-medium text-slate-700">Centro de Salud Tipo C Rioverde</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Cantón / Provincia</span>
                          <span className="font-medium text-slate-700">Rioverde, Esmeraldas</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Fecha de Emisión</span>
                          <span className="font-mono text-slate-700">{new Date().toLocaleDateString('es-EC')}</span>
                        </div>
                      </div>

                      {/* Vaccines Table in Certificate */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                          Esquema de Vacunas Registradas
                        </h4>
                        <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                          <table className="w-full text-left">
                            <thead className="bg-slate-100 font-bold text-slate-700 text-[11px] border-b border-slate-200">
                              <tr>
                                <th className="p-3">Biológico / Vacuna</th>
                                <th className="p-3">Dosis</th>
                                <th className="p-3">Fecha</th>
                                <th className="p-3">Lote</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {currentUser.vaccines.map((vac) => (
                                <tr key={vac.id}>
                                  <td className="p-3 font-semibold text-slate-800">{vac.vaccineName}</td>
                                  <td className="p-3 text-slate-600">{vac.dose}</td>
                                  <td className="p-3 font-mono text-slate-600">{vac.appliedDate}</td>
                                  <td className="p-3 font-mono text-slate-500">{vac.batchNumber}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Verification QR / Signature Section */}
                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <div className="p-2 border border-slate-300 rounded-xl bg-white shadow-2xs">
                            <QrCode className="w-12 h-12 text-slate-800" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block">Validación Electrónica MSP</span>
                            <span className="text-[11px]">Código de verificación: VERIF-RV-{currentUser.dni}-2026</span>
                            <span className="text-[10px] text-emerald-700 font-medium block">Válido para trámites escolares, laborales y viajes.</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowCertificateModal(false)}
                          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition-colors"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
