/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Search, FileText, Download, Check, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { mspManualsList, downloadableDocumentsList } from '../data';

interface DownloadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'descargas' | 'manuales';
}

export default function DownloadsModal({ isOpen, onClose, initialTab }: DownloadsModalProps) {
  const [activeTab, setActiveTab] = useState<'descargas' | 'manuales'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedList, setDownloadedList] = useState<string[]>([]);

  if (!isOpen) return null;

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
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedList((prev) => [...prev, id]);
      
      // We can also trigger a simple client-side dummy text file dowload to make it actually download something!
      try {
        const element = document.createElement("a");
        const file = new Blob([`Tipo C Rioverde - Simulación de Descarga Oficial del Documento: ${fileName}\nCódigo de Control: MSP-RV-${id.toUpperCase()}-2026\nEste es un archivo de prueba.`], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${fileName}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } catch (e) {
        console.error("Downloader simulation error:", e);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 flex flex-col max-h-[85vh]"
        id="downloads-modal-container"
      >
        {/* Banner header */}
        <div className="bg-emerald-950 px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-lg">Portal Documental Digital</h3>
              <p className="text-xs text-emerald-300 font-mono">Repositorio oficial para usuarios y profesionales del MSP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-emerald-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation & search */}
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
          <div className="flex gap-2 p-1 bg-gray-200 rounded-lg self-start md:self-auto w-full md:w-auto">
            <button
              onClick={() => {
                setActiveTab('descargas');
                setSearchQuery('');
              }}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'descargas'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Documentos y Formularios
            </button>
            <button
              onClick={() => {
                setActiveTab('manuales');
                setSearchQuery('');
              }}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'manuales'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Manuales y Clínicas MSP
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === 'descargas' ? "Buscar formularios..." : "Buscar manuales MSP..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        {/* List scrollbox */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          {activeTab === 'descargas' ? (
            /* DOWNLOADS LIST */
            filteredDownloads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDownloads.map((doc) => {
                  const isDownloading = downloadingId === doc.id;
                  const isDownloaded = downloadedList.includes(doc.id);
                  return (
                    <div
                      key={doc.id}
                      className="bg-white border border-gray-100 hover:border-emerald-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-100">
                            {doc.category}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">
                            {doc.format} ({doc.size})
                          </span>
                        </div>
                        <h4 className="font-sans font-semibold text-sm text-emerald-950 mb-1 leading-snug">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-normal">
                          {doc.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <FileText className="w-3 h-3 text-emerald-600" /> Formato oficial MSP
                        </span>
                        <button
                          onClick={() => handleDownload(doc.id, doc.title)}
                          disabled={isDownloading}
                          className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isDownloaded
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isDownloading
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                              Buscando...
                            </>
                          ) : isDownloaded ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Descargado
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" /> Descargar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-6">
                <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">No se encontraron formularios</p>
                <p className="text-xs text-gray-400 mt-1">Intente buscar con términos más amplios o generales.</p>
              </div>
            )
          ) : (
            /* MANUALES LIST */
            filteredManuals.length > 0 ? (
              <div className="space-y-4">
                {filteredManuals.map((man) => {
                  const isDownloading = downloadingId === man.id;
                  const isDownloaded = downloadedList.includes(man.id);
                  return (
                    <div
                      key={man.id}
                      className="bg-white border border-gray-100 hover:border-emerald-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-100">
                            {man.category}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 rounded">
                            Cod: {man.code}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            Año: {man.year}
                          </span>
                        </div>
                        <h4 className="font-sans font-semibold text-sm text-emerald-950">
                          {man.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-normal">
                          {man.description}
                        </p>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-50">
                        <span className="text-[10px] font-mono text-gray-400 md:mb-1">{man.size} (PDF)</span>
                        <button
                          onClick={() => handleDownload(man.id, man.title)}
                          disabled={isDownloading}
                          className={`px-4 py-1.5 text-xs rounded-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer w-full sm:w-auto text-center justify-center ${
                            isDownloaded
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isDownloading
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-emerald-800 text-white hover:bg-emerald-950'
                          }`}
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                              Buscando...
                            </>
                          ) : isDownloaded ? (
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
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-6">
                <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">No se encontraron manuales oficiales</p>
                <p className="text-xs text-gray-400 mt-1">Intente buscar por "GPC", "Diabetes", "Vacunación" o "Código Rojo".</p>
              </div>
            )
          )}
        </div>

        {/* Decorative footer inside modal */}
        <div className="bg-emerald-50 px-6 py-3 border-t border-emerald-100 flex items-center gap-2 shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-[11px] text-emerald-900 leading-normal">
            Todos los manuales y formularios son provistos por el <strong>Ministerio de Salud Pública del Ecuador</strong> en su versión oficial de libre distribución.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
