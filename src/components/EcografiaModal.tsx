/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  Waves, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Calendar, 
  Info, 
  QrCode, 
  AlertCircle,
  FileScan,
  Activity,
  ScanLine
} from 'lucide-react';

interface EcografiaReport {
  id: string;
  orderNumber: string;
  dni: string;
  patientName: string;
  age: number;
  gender: string;
  examDate: string;
  examType: string;
  referringDoctor: string;
  sonographer: string;
  equipment: string;
  indication: string;
  findings: string[];
  biometry?: { label: string; value: string }[];
  conclusion: string;
  recommendations: string;
}

const SAMPLE_REPORTS: EcografiaReport[] = [
  {
    id: 'eco-01',
    orderNumber: 'ECO-2026-08912',
    dni: '0802456789',
    patientName: 'Rosa María Estupiñán Quiñónez',
    age: 32,
    gender: 'Femenino',
    examDate: '12 de Agosto, 2026',
    examType: 'Ecografía Obstétrica del Segundo/Tercer Trimestre (2D/Doppler)',
    referringDoctor: 'Dra. Gabriela Ortiz (Ginecología y Obstetricia)',
    sonographer: 'Dr. Ramiro Cedeño (Especialista en Imagenología MSP - Reg. 4521)',
    equipment: 'Ecógrafo Digital Color Doppler Multifrecuencial (Transductor 3.5 - 5.0 MHz)',
    indication: 'Control de bienestar fetal y valoración anatómica en gestación de 28 semanas.',
    findings: [
      'Feto único en situación longitudinal, presentación cefálica, dorso anterior izquierdo.',
      'Actividad cardíaca fetal rítmica y regular (FCF: 144 lpm). Movimientos fetales somáticos y respiratorios activos.',
      'Placenta: Fúndica y de inserción posterior, Grado I según clasificación de Grannum, sin desprendimientos retroplacentarios.',
      'Líquido Amniótico: Volumen normal adecuado para la edad gestacional (Índice de Líquido Amniótico ILA: 14.2 cm).',
      'Morfología: Cráneo con calota íntegra, línea media centrada, ventrículos laterales y fosa posterior normales. Estómago y vejiga urinaria visualizados con repleción adecuada. Columna vertebral continua y regular.'
    ],
    biometry: [
      { label: 'Diámetro Biparietal (DBP)', value: '72.4 mm (28.3 sem)' },
      { label: 'Circunferencia Cefálica (CC)', value: '264.0 mm (28.4 sem)' },
      { label: 'Circunferencia Abdominal (CA)', value: '243.2 mm (28.5 sem)' },
      { label: 'Longitud Femoral (LF)', value: '54.1 mm (28.2 sem)' },
      { label: 'Peso Fetal Estimado (PFE)', value: '1,285 g ± 150 g (Percentil 50)' },
      { label: 'Edad Gestacional Promedio', value: '28.4 semanas ± 1 sem' }
    ],
    conclusion: 'Gestación intrauterina única activa de 28.4 semanas por biometría fetal. Crecimiento y desarrollo acorde a la cronología amenorréica. No se aprecian anomalías estructurales groseras al momento de la exploración.',
    recommendations: 'Continuar controles prenatales regulares con gineco-obstetra. Control ecográfico de tercer trimestre según evolución clínica.'
  },
  {
    id: 'eco-02',
    orderNumber: 'ECO-2026-07441',
    dni: '0801934521',
    patientName: 'Don Carlos Julio Mina Angulo',
    age: 66,
    gender: 'Masculino',
    examDate: '15 de Julio, 2026',
    examType: 'Ecografía Abdominal Total (Hígado, Vías Biliares, Páncreas, Bazo y Riñones)',
    referringDoctor: 'Dr. Leonardo Caicedo (Medicina Familiar MSP)',
    sonographer: 'Dra. Silvia Montaño (Médica Radióloga Imagenóloga MSP - Reg. 3318)',
    equipment: 'Ecógrafo Ultrasonido Convexo Digital 3.5 MHz de Alta Resolución',
    indication: 'Control de rutina en paciente con hipertensión y diabetes tipo 2. Descarte de esteatosis o litiasis.',
    findings: [
      'Hígado: Tamaño conservado, contornos regulares. Parénquima con discreto incremento difuso de la ecogenicidad compatible con esteatosis hepática leve (Grado I). No se identifican lesiones nodulares focales ni quísticas.',
      'Vesícula Biliar: Adecuadamente distendida en ayunas, pared delgada y regular (< 3 mm). Luz completamente anecoica, sin imágenes de litiasis ni barro biliar.',
      'Vía Biliar: Colédoco de calibre normal (4.1 mm), vías biliares intrahepáticas no dilatadas.',
      'Páncreas: Porción visible de cuerpo y cabeza con tamaño y ecogenicidad habitual, conducto de Wirsung no dilatado.',
      'Bazo: Parénquima homogéneo, de tamaño normal (longitud longitudinal 10.2 cm).',
      'Riñones: Ambos riñones en situación anatómica normal. Riñón derecho mide 108 x 48 mm, riñón izquierdo mide 110 x 50 mm. Relación córtico-medular conservada, sin signos de ectasia pielocalicial ni imágenes de microlitiasis.'
    ],
    conclusion: '1. Esteatosis hepática difusa leve (Grado I).\n2. Vesícula biliar alitiásica sin signos de colecistopatía.\n3. Resto de vísceras macizas del abdomen superior ecográficamente normales.',
    recommendations: 'Control metabólico y nutricional. Mantener pautas dietéticas bajas en grasas saturadas.'
  },
  {
    id: 'eco-03',
    orderNumber: 'ECO-2026-09043',
    dni: '0850123984',
    patientName: 'Elena Tenorio Valencia',
    age: 27,
    gender: 'Femenino',
    examDate: '04 de Septiembre, 2026',
    examType: 'Ecografía Pélvica Ginecológica Suprapúbica',
    referringDoctor: 'Dra. Gabriela Ortiz (Ginecología MSP)',
    sonographer: 'Dr. Ramiro Cedeño (Especialista en Imagenología MSP)',
    equipment: 'Ecógrafo Multifrecuencial Suprapúbico con Vejiga Llena',
    indication: 'Evaluación ginecológica preventiva y dolor en fosa ilíaca leve cíclico.',
    findings: [
      'Vejiga: Bien replecionada, de paredes lisas y regulares, contenido completamente anecoico.',
      'Útero: En anteversoflexión (AVF), de morfología piriforme normal, contornos definidos y regulares. Miometrio homogéneo sin evidencia de miomas o adenomiosis. Mide: 74 x 42 x 38 mm.',
      'Endometrio: Centrado, regular, de aspecto trilaminar proliferativo tardío, con grosor de 7.8 mm, acorde a la fase del ciclo menstrual.',
      'Ovario Derecho: Situación normal, mide 32 x 20 mm, volumen 6.5 cc. Presencia de pequeños folículos fisiológicos periféricos en maduración.',
      'Ovario Izquierdo: Situación normal, mide 30 x 19 mm, volumen 5.8 cc. Ecoestructura folicular normal.',
      'Fondo de Saco de Douglas: Libre de colecciones líquidas o masas anexiales.'
    ],
    conclusion: 'Estudio ecográfico pélvico ginecológico dentro de parámetros normales. Sin lesiones uterinas ni ováricas al momento del examen.',
    recommendations: 'Correlacionar con consulta ginecológica y examen clínico.'
  }
];

interface EcografiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDni?: string;
}

export default function EcografiaModal({ isOpen, onClose, defaultDni = '' }: EcografiaModalProps) {
  const [searchDni, setSearchDni] = useState(defaultDni);
  const [currentReport, setCurrentReport] = useState<EcografiaReport | null>(SAMPLE_REPORTS[0]);
  const [activeTab, setActiveTab] = useState<'informe' | 'requisitos'>('informe');
  const [searchError, setSearchError] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const clean = searchDni.trim();

    if (!clean) {
      setSearchError('Por favor ingrese su número de cédula o número de orden.');
      return;
    }

    const found = SAMPLE_REPORTS.find(
      (r) => r.dni.includes(clean) || r.orderNumber.toLowerCase().includes(clean.toLowerCase())
    );

    if (found) {
      setCurrentReport(found);
      setActiveTab('informe');
    } else {
      setSearchError('No se encontró un examen con los datos ingresados. Puede consultar los exámenes de ejemplo disponibles.');
    }
  };

  const handleSelectSample = (report: EcografiaReport) => {
    setCurrentReport(report);
    setSearchDni(report.dni);
    setSearchError('');
    setActiveTab('informe');
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-ecografia-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 text-left flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-5 sm:p-6 shrink-0 relative border-b-4 border-emerald-500">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-800/80 rounded-2xl border border-emerald-400/40 text-emerald-200">
                <Waves className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block">
                  Servicio de Imagenología y Ultrasonido · MSP Ecuador
                </span>
                <h2 id="modal-ecografia-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Consulta de Exámenes de Ecografía
                </h2>
              </div>
            </div>
          </div>

          {/* Search Bar & Sample Pickers */}
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 shrink-0 space-y-3">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchDni}
                  onChange={(e) => setSearchDni(e.target.value)}
                  placeholder="Ingrese su número de Cédula o Código de Orden (ej: 0802456789)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
              >
                <ScanLine className="w-4 h-4" />
                <span>Buscar Examen</span>
              </button>
            </form>

            {searchError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {/* Quick Demo Exams */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                Exámenes de ejemplo:
              </span>
              {SAMPLE_REPORTS.map((rep) => (
                <button
                  key={rep.id}
                  type="button"
                  onClick={() => handleSelectSample(rep)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    currentReport?.id === rep.id
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {rep.patientName.split(' ')[0]} · {rep.examType.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-3 px-6 pt-3 border-b border-slate-200 bg-white shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('informe')}
              className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'informe'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileScan className="w-4 h-4" />
              <span>Informe de Ecografía</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('requisitos')}
              className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'requisitos'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Preparación y Requisitos</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
            {activeTab === 'informe' && currentReport && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                
                {/* Official Clinical Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Centro de Salud Tipo C Rioverde · Servicio de Imagenología
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {currentReport.examType}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>Orden: <strong className="font-mono text-slate-800">{currentReport.orderNumber}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Fecha: <strong className="text-slate-800">{currentReport.examDate}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Descargando informe oficial de ecografía: ${currentReport.orderNumber}.pdf`)}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar PDF</span>
                    </button>
                  </div>
                </div>

                {/* Patient Information Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Paciente</span>
                    <span className="font-bold text-slate-900">{currentReport.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Cédula de Identidad</span>
                    <span className="font-mono font-bold text-slate-900">{currentReport.dni}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Edad / Sexo</span>
                    <span className="text-slate-700 font-medium">{currentReport.age} años ({currentReport.gender})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Médico Solicitante</span>
                    <span className="text-slate-700 font-medium">{currentReport.referringDoctor}</span>
                  </div>
                </div>

                {/* Indication & Equipment */}
                <div className="text-xs space-y-1 text-slate-600 bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
                  <p><strong>Indicación Clínica:</strong> {currentReport.indication}</p>
                  <p><strong>Equipamiento Utilizado:</strong> {currentReport.equipment}</p>
                </div>

                {/* Biometry Table if applicable */}
                {currentReport.biometry && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Parámetros Biométricos Fetales</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {currentReport.biometry.map((bio, idx) => (
                        <div key={idx} className="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                          <span className="text-slate-600">{bio.label}:</span>
                          <span className="font-bold text-slate-900">{bio.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Findings List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hallazgos Ecográficos</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc list-inside bg-slate-50/60 p-4 rounded-xl border border-slate-200/70">
                    {currentReport.findings.map((finding, idx) => (
                      <li key={idx} className="pl-1">
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conclusion Box */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Conclusión Diagnóstica:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed whitespace-pre-line">
                    {currentReport.conclusion}
                  </p>
                  <p className="text-xs text-emerald-800/80 pt-1">
                    <strong>Recomendación:</strong> {currentReport.recommendations}
                  </p>
                </div>

                {/* Signature and Electronic Validation */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-slate-300 rounded-xl bg-white shadow-2xs">
                      <QrCode className="w-10 h-10 text-slate-800" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">{currentReport.sonographer}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Informe con Firma Electrónica Certificada MSP
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Verif: ECO-{currentReport.dni}-MSP-2026
                  </span>
                </div>

              </div>
            )}

            {/* Preparation Requirements Tab */}
            {activeTab === 'requisitos' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="text-base font-black text-slate-900 mb-1">
                    Instrucciones de Preparación para Exámenes de Ecografía
                  </h3>
                  <p className="text-xs text-slate-500">
                    Siga estas indicaciones para garantizar una óptima visualización diagnóstica el día de su cita en el Centro de Salud Tipo C Rioverde.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                      <Waves className="w-4 h-4 text-emerald-700" />
                      <span>Ecografía Abdominal Total o Superior</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                      <li>Ayuno estricto de 6 a 8 horas (no ingerir alimentos sólidos ni lácteos).</li>
                      <li>Puede beber agua pura en sorbos pequeños si tiene sed.</li>
                      <li>Evitar bebidas gaseosas o masticar chicle el día del examen para no acumular gases.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                      <Waves className="w-4 h-4 text-emerald-700" />
                      <span>Ecografía Pélvica / Ginecológica / Renal</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                      <li>Beber 4 a 6 vasos de agua (1 litro aproximadamente) 1 hora antes del examen.</li>
                      <li>No orinar hasta después de realizado el procedimiento (vejiga confortablemente llena).</li>
                      <li>No requiere ayuno de alimentos.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                      <Waves className="w-4 h-4 text-emerald-700" />
                      <span>Ecografía Obstétrica (Embarazo)</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                      <li><strong>Menor a 14 semanas:</strong> Vejiga moderadamente llena (beber 2 vasos de agua).</li>
                      <li><strong>Mayor a 14 semanas:</strong> No requiere preparación especial ni retención de orina.</li>
                      <li>Traer carnet de control prenatal o ecografías previas.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                      <Waves className="w-4 h-4 text-emerald-700" />
                      <span>Partes Blandas, Tiroides y Musculoesquelética</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                      <li>No requiere ayuno ni preparación hídrica.</li>
                      <li>Ropa cómoda de dos piezas para facilitar el acceso a la zona anatómica a explorar.</li>
                      <li>Evitar cremas, polvos o lociones sobre la piel del área a evaluar.</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Todos los exámenes de ecografía son 100% gratuitos bajo prescripción de los médicos del Centro de Salud.</span>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-500 font-medium">
              Centro de Salud Tipo C Rioverde · Cantón Rioverde, Esmeraldas
            </span>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
