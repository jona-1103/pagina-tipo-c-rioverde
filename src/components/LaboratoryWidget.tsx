/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, FlaskConical, AlertCircle, CheckCircle, FileText, Download, Printer } from 'lucide-react';
import { DOCTOR_RESULTS_IMAGE } from '../data';

export default function LaboratoryWidget() {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    setLoading(true);
    setChecked(false);

    // Simulate clinical database lookup instantly
    setTimeout(() => {
      setLoading(false);
      setChecked(true);
      
      const namesList = [
        'Ayoví Caicedo Jefferson David',
        'Estupiñán Valencia Martha Sofía',
        'Quiñónez Hurtado Carmen Elena',
        'Tenorio Arroyo Luis Humberto',
        'Angulo Nazareno Shirley Patricia',
        'Batalla Bone Roberto Carlos',
        'Mina Castro Dolores Altagracia',
        'Preciado Torres Julio César',
        'Rosero Castillo Carmen Yolanda',
        'Vivas Solórzano Franklin Vicente'
      ];
      
      const randomIdx = Math.floor(Math.random() * namesList.length);
      const selectedName = namesList[randomIdx];
      const mockDni = '0803144825';
      
      setResultData({
        patientName: selectedName,
        dni: mockDni,
        sampleDate: '28 Mayo 2026',
        validationDate: '28 Mayo 2026',
        laboratoryId: 'MSP-LAB-RV-2026-649',
        chemist: 'Dra. Gabriela Arroyo, Bioquímica Farmacéutica',
        tests: [
          {
            category: 'HEMOGRAMA COMPLETO',
            items: [
              { name: 'Glóbulos Rojos (Eritrocitos)', value: '4.78 x10^12/L', reference: '4.20 - 5.40', status: 'Normal' },
              { name: 'Hemoglobina', value: '13.9 g/dL', reference: '12.0 - 16.0', status: 'Normal' },
              { name: 'Hematocrito', value: '41.2 %', reference: '37.0 - 47.0', status: 'Normal' },
              { name: 'Glóbulos Blancos (Leucocitos)', value: '6.45 x10^9/L', reference: '4.50 - 11.00', status: 'Normal' },
              { name: 'Plaquetas', value: '258 x10^9/L', reference: '150 - 450', status: 'Normal' }
            ]
          },
          {
            category: 'QUÍMICA SANGUÍNEA y FUNCIÓN METABÓLICA',
            items: [
              { name: 'Glucosa Basal en Ayunas', value: '88 mg/dL', reference: '70 - 100', status: 'Normal' },
              { name: 'Colesterol Total', value: '174 mg/dL', reference: '< 200', status: 'Normal' },
              { name: 'Triglicéridos', value: '128 mg/dL', reference: '< 150', status: 'Normal' },
              { name: 'Urea', value: '26 mg/dL', reference: '15 - 45', status: 'Normal' },
              { name: 'Creatinina sérica', value: '0.82 mg/dL', reference: '0.60 - 1.20', status: 'Normal' }
            ]
          },
          {
            category: 'INMUNOLOGÍA / SEROLOGÍA RÁPIDA',
            items: [
              { name: 'Dengue Antígeno NS1', value: 'NEGATIVO (-)', reference: 'NEGATIVO', status: 'Normal' },
              { name: 'Covid-19 Antígeno rápido', value: 'NEGATIVO (-)', reference: 'NEGATIVO', status: 'Normal' }
            ]
          }
        ]
      });
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    try {
      const element = document.createElement("a");
      const text = `========================================================\n` +
                   `        RESULTADOS DE LABORATORIO CLÍNICO - MSP         \n` +
                   `          Centro de Salud Tipo C Rioverde - Esmeraldas  \n` +
                   `========================================================\n\n` +
                   `Id Examen:    ${resultData.laboratoryId}\n` +
                   `Paciente:     ${resultData.patientName}\n` +
                   `Cédula:       ${resultData.dni}\n` +
                   `Fecha Toma:   ${resultData.sampleDate}\n` +
                   `Validado por: ${resultData.chemist}\n\n` +
                   `--- RESULTADOS INDIVIDUALES ---\n` +
                   resultData.tests.map((cat: any) => {
                     return `\n[${cat.category}]\n` +
                       cat.items.map((i: any) => {
                         return `  - ${i.name.padEnd(30)}: ${i.value.padEnd(15)} (Rango ref: ${i.reference})`;
                       }).join('\n');
                   }).join('\n') +
                   `\n\n========================================================\n` +
                   `Firma Digital Certificada por el MSP. Documento oficial.\n` +
                   `========================================================`;
      const file = new Blob([text], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `Resultado_Laboratorio_RV_${resultData.dni}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="pt-2 pb-6 bg-white" id="seccion-resultados-laboratorio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LIGHT GREEN GRADIENT BANNER PANEL */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 rounded-3xl overflow-hidden shadow-sm border border-emerald-100 grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
          
          {/* Doctor on the left */}
          <div className="lg:col-span-5 relative min-h-[250px] lg:min-h-full overflow-hidden">
            <img
              src={DOCTOR_RESULTS_IMAGE}
              alt="Doctora mostrando resultados de laboratorio digitales"
              className="absolute inset-0 w-full h-full object-cover object-center translate-x-1 hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Soft overlay gradient to melt doctor image with layout */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-emerald-950/20 via-transparent to-transparent"></div>
          </div>

          {/* Interactive checking system on the right */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-800 tracking-wider bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                TECNOLOGÍA AL SERVICIO DE TU SALUD
              </span>
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-emerald-950 tracking-tight">
                Consulta los resultados de laboratorio
              </h3>
              <p className="text-sm text-gray-600 max-w-xl leading-relaxed">
                Acceda instantáneamente a nuestro visor clínico digital institucional. Consulte de manera segura el estado de sus exámenes.
              </p>
            </div>

            {/* Direct Link to Laboratory Portal */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <a
                href="https://laboratorio.tipocrioverde.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-800 hover:bg-emerald-950 text-white font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-emerald-900/20 w-full sm:w-auto text-center"
              >
                <FlaskConical className="w-5 h-5 text-emerald-100" />
                Consultar Resultados
              </a>
            </div>

            {/* Error messaging */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-700 text-xs flex items-center gap-1.5 p-3 rounded-lg bg-red-50 border border-red-100 max-w-lg"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* LAB RESULTS REPORT CONTAINER */}
            <AnimatePresence>
              {checked && resultData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-emerald-200/60 rounded-2xl p-5 shadow-sm max-w-xl overflow-hidden"
                  id="clinical-report-output"
                >
                  {/* Report header */}
                  <div className="border-b border-emerald-100 pb-3 mb-3 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase mb-0.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> EXAMEN DISPONIBLE
                      </div>
                      <p className="font-sans font-bold text-gray-900 text-sm">{resultData.patientName}</p>
                      <span className="text-[11px] text-gray-400 font-mono">Cédula: {resultData.dni} | Código: {resultData.laboratoryId}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleDownloadReport}
                        className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Descargar Reporte"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Imprimir"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Summary of tests */}
                  <div className="space-y-3.5 text-xs">
                    {resultData.tests.map((cat: any, cIdx: number) => (
                      <div key={cIdx} className="space-y-1.5">
                        <span className="text-[10px] font-bold tracking-wider text-emerald-800 block uppercase font-mono bg-emerald-50/50 px-2 py-0.5 rounded">
                          {cat.category}
                        </span>
                        <div className="divide-y divide-gray-100 bg-gray-50/50 rounded-lg px-2.5">
                          {cat.items.map((item: any, iIdx: number) => (
                            <div key={iIdx} className="py-1.5 flex justify-between gap-2">
                              <span className="text-gray-600 font-medium">{item.name}</span>
                              <div className="text-right flex items-center gap-3">
                                <span className="font-mono text-gray-900 font-bold">{item.value}</span>
                                <span className="text-[10px] text-gray-400 font-mono w-20 text-center inline-block">Ref: {item.reference}</span>
                                <span className="text-[10px] text-emerald-700 bg-emerald-100/65 font-bold rounded px-1.5 select-none">{item.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chemistry signature */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                    <span>Validado por: {resultData.chemist}</span>
                    <button
                      type="button"
                      onClick={handleDownloadReport}
                      className="sm:hidden text-emerald-700 font-bold flex items-center gap-0.5"
                    >
                      <Download className="w-3 h-3" /> Reporte
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
