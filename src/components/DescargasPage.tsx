/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileText, Download, Check, Sparkles, BookOpen, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { mspManualsList, downloadableDocumentsList } from '../data';

export default function DescargasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'todos' | 'formularios' | 'manuales'>('todos');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadedList, setDownloadedList] = useState<string[]>([]);

  // Filter downloads based on query
  const filteredDownloads = downloadableDocumentsList.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter MSP manuals
  const filteredManuals = mspManualsList.filter((man) =>
    man.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    man.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    man.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    man.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (id: string, fileName: string) => {
    setDownloadingId(id);
    setDownloadProgress(0);
    
    // Animate custom progress bar steps
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedList((prev) => [...prev, id]);
      
      // Trigger a clean sample text file download representing the clinical document
      try {
        const element = document.createElement("a");
        const fileContent = `========================================================\n` +
                            `   MINISTERIO DE SALUD PÚBLICA DEL ECUADOR\n` +
                            `   CENTRO DE SALUD TIPO C RIOVERDE - PORTAL DIGITAL\n` +
                            `========================================================\n\n` +
                            `Documento Solicitado: ${fileName}\n` +
                            `Identificador Único: MSP-RV-${id.toUpperCase()}-2026\n` +
                            `Estado de Descarga: Certificado de Autenticidad Validado\n` +
                            `Fecha de Servidor Central: ${new Date().toLocaleDateString()}\n\n` +
                            `--------------------------------------------------------\n` +
                            `Este documento ha sido procesado mediante la pasarela de\n` +
                            `descargas del Centro de Salud Rioverde de forma segura.\n` +
                            `--------------------------------------------------------\n`;
                            
        const file = new Blob([fileContent], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${fileName.replace(/\s+/g, '_')}_Oficial.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } catch (e) {
        console.error("Downloader simulation error:", e);
      }
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-16 bg-slate-50 min-h-screen"
      id="pagina-descargas-completa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase font-mono bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
            Portal Documental Digital
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-emerald-950 tracking-tight leading-none">
            Descargas de Documentos y Manuales
          </h2>
          <div className="w-16 h-1 w-24 bg-emerald-600 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-500 leading-relaxed pt-2">
            Acceda de manera directa a los formularios administrativos oficiales de admisión para agilizar su cita presencial o consulte las guías clínicas nacionales oficiales aprobadas por el MSP.
          </p>
        </div>

        {/* Dashboard filter & Search Row */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-10 flex flex-col lg:flex-row gap-6 items-center justify-between">
          
          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl w-full lg:w-auto">
            {[
              { id: 'todos', label: 'Todos los recursos' },
              { id: 'formularios', label: 'Documentos y Formularios' },
              { id: 'manuales', label: 'Manuales y Guías MSP' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  setFilterCategory(pill.id as any);
                  setSearchQuery('');
                }}
                className={`flex-1 sm:flex-none px-5 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-wider cursor-pointer ${
                  filterCategory === pill.id
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-slate-200/50'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Search bar input with icon */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder={filterCategory === 'todos' ? "Buscar por palabra clave..." : filterCategory === 'formularios' ? "Buscar formularios..." : "Buscar guías clínicas..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-xs border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white text-emerald-950 font-medium transition-all"
            />
          </div>

        </div>

        {/* Global Progress Overlay for downloads */}
        <AnimatePresence>
          {downloadingId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-emerald-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg border border-emerald-800"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-emerald-300 animate-spin shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold font-mono">Descargando archivo del Sistema Central MSP ({downloadProgress}%)</span>
                  <p className="text-[11px] text-emerald-200">Por favor, espere un instante mientras preparamos su paquete PDF certificado...</p>
                </div>
              </div>
              <div className="w-full md:w-64 bg-emerald-950 rounded-full h-2.5 overflow-hidden border border-white/5">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-250 rounded-full" 
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Display Grid */}
        <div className="space-y-10">
          
          {/* 1. SECTOR: FORMULARIOS Y SOLICITUDES */}
          {(filterCategory === 'todos' || filterCategory === 'formularios') && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="font-sans font-black text-lg sm:text-xl text-emerald-950">Documentos y Formularios Administrativos</h3>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5 ml-1">Formato PDF</span>
              </div>
              
              {filteredDownloads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredDownloads.map((doc) => {
                    const isDownloading = downloadingId === doc.id;
                    const isDownloaded = downloadedList.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-emerald-200 cursor-pointer group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-100">
                              {doc.category}
                            </span>
                            <span className="text-[9px] font-mono text-gray-400">
                              {doc.format} ({doc.size})
                            </span>
                          </div>
                          <h4 className="font-sans font-black text-[14px] sm:text-[15px] text-emerald-950 leading-snug group-hover:text-emerald-800 transition-colors">
                            {doc.title}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-3">
                            {doc.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-emerald-600" /> Documento MSP Oficial
                          </span>
                          <button
                            onClick={() => handleDownload(doc.id, doc.title)}
                            disabled={isDownloading}
                            className={`px-3.5 py-2 text-xs rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isDownloaded
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : isDownloading
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                            }`}
                          >
                            {isDownloaded ? (
                              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Descargado</span>
                            ) : (
                              <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Obtener PDF</span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-700">No se encontraron formularios o solicitudes con ese nombre.</p>
                </div>
              )}
            </div>
          )}

          {/* 2. SECTOR: MANUALES Y GUÍAS CLÍNICAS */}
          {(filterCategory === 'todos' || filterCategory === 'manuales') && (
            <div className="space-y-5 pt-4">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                <BookOpen className="w-5 h-5 text-emerald-750" />
                <h3 className="font-sans font-black text-lg sm:text-xl text-emerald-950">Manuales de Aplicación y Guías de Práctica Clínica</h3>
                <span className="text-[10px] font-mono text-white bg-emerald-700 rounded-full px-2.5 py-0.5 ml-1">MSP Ecuador</span>
              </div>

              {filteredManuals.length > 0 ? (
                <div className="space-y-4">
                  {filteredManuals.map((man) => {
                    const isDownloading = downloadingId === man.id;
                    const isDownloaded = downloadedList.includes(man.id);
                    return (
                      <div
                        key={man.id}
                        className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-200 group"
                      >
                        <div className="space-y-2 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-100">
                              {man.category}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              Cod: {man.code}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              Publicación: {man.year}
                            </span>
                          </div>
                          <h4 className="font-sans font-black text-[15px] sm:text-[16px] text-emerald-950 group-hover:text-emerald-700 transition-colors">
                            {man.title}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed leading-normal">
                            {man.description}
                          </p>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                          <span className="text-[10px] font-mono font-bold text-gray-400">{man.size} (PDF)</span>
                          <button
                            onClick={() => handleDownload(man.id, man.title)}
                            disabled={isDownloading}
                            className={`px-4.5 py-2 text-xs rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer w-full sm:w-auto text-center justify-center flex items-center gap-1.5 ${
                              isDownloaded
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : isDownloading
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-emerald-800 hover:bg-emerald-950 text-white'
                            }`}
                          >
                            {isDownloaded ? (
                              <>
                                <Check className="w-3.5 h-3.5" /> Descargado
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" /> Descargar PDF
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-700">No se encontraron manuales clínicos con ese término.</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Legal Disclaimer block inside frame */}
        <div className="mt-16 bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs text-emerald-900 leading-normal">
            <strong>Información Importante:</strong> Todos los documentos, formularios, guías de práctica clínica y protocolos listados son provistos directamente por el <strong>Ministerio de Salud Pública de la República del Ecuador</strong>. El Centro de Salud Tipo C Rioverde actúa únicamente como puente de enlace libre y gratuito para facilitar este material a médicos internos y ciudadanos.
          </p>
        </div>

      </div>
    </motion.div>
  );
}
