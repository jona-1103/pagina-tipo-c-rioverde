/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Folder,
  Download,
  ExternalLink,
  Eye,
  Search,
  BookOpen,
  ShieldCheck,
  Filter,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
  X,
  FileCheck,
  Share2,
  HelpCircle,
  FileCode,
  LayoutGrid,
  List
} from 'lucide-react';
import {
  DRIVE_ITEMS,
  GOOGLE_DRIVE_FOLDER_URL,
  GOOGLE_DRIVE_FOLDER_ID,
  DriveItem
} from '../data/normasProtocolosData';

interface NormasProtocolosPageProps {
  onNavigate?: (page: 'inicio' | 'servicios' | 'nosotros' | 'protocolos' | 'contacto') => void;
}

export default function NormasProtocolosPage({ onNavigate }: NormasProtocolosPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeViewMode, setActiveViewMode] = useState<'grid' | 'list'>('grid');
  const [previewItem, setPreviewItem] = useState<DriveItem | null>(null);
  const [showDriveEmbed, setShowDriveEmbed] = useState<boolean>(false);

  // Filtered drive items
  const filteredItems = useMemo(() => {
    return DRIVE_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory === 'carpetas') {
        if (!item.isFolder) return false;
      } else if (selectedCategory !== 'all') {
        if (item.folderCategory !== selectedCategory) return false;
      }

      // Search match
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query) ?? false;
        const matchesSubfolder = item.subfolder?.toLowerCase().includes(query) ?? false;
        return matchesName || matchesDesc || matchesSubfolder;
      }

      return true;
    });
  }, [searchTerm, selectedCategory]);

  const folders = useMemo(() => DRIVE_ITEMS.filter(item => item.isFolder), []);
  const totalFilesCount = useMemo(() => DRIVE_ITEMS.filter(item => !item.isFolder).length, []);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen text-slate-800" id="pagina-normas-protocolos">
      
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
          <button
            onClick={() => onNavigate?.('inicio')}
            className="hover:text-emerald-700 hover:underline cursor-pointer"
          >
            Inicio
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-bold">Normas y protocolos</span>
        </nav>

        {/* Hero banner card */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-8 border border-emerald-800/40">
          
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-emerald-200 text-xs font-mono font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ministerio de Salud Pública del Ecuador</span>
            </span>

            <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white">
              Normas y Protocolos de Salud
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
              Repositorio institucional oficial con las guías de práctica clínica (GPC), normas técnicas de atención, protocolos hospitalarios y marco legal de derechos del paciente aplicados en el Centro de Salud Tipo C Rioverde.
            </p>

            {/* Direct Google Drive Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={GOOGLE_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                title="Abrir carpeta compartida directamente en Google Drive"
              >
                <FolderOpen className="w-4 h-4 text-emerald-950" />
                <span>Abrir carpeta en Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => setShowDriveEmbed(!showDriveEmbed)}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>{showDriveEmbed ? 'Ocultar Visor Integrado de Drive' : 'Ver Visor de Google Drive'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. OPTIONAL EMBEDDED GOOGLE DRIVE IFRAME VIEWER */}
        <AnimatePresence>
          {showDriveEmbed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white"
            >
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-800">
                    Explorador de Google Drive embebido (ID: {GOOGLE_DRIVE_FOLDER_ID})
                  </span>
                </div>
                <button
                  onClick={() => setShowDriveEmbed(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Cerrar visor
                </button>
              </div>
              <div className="w-full h-[520px] bg-slate-50">
                <iframe
                  src={`https://drive.google.com/embeddedfolderview?id=${GOOGLE_DRIVE_FOLDER_ID}#grid`}
                  className="w-full h-full border-0"
                  title="Google Drive Folder Embed"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. THREE MAIN FOLDER CARDS (QUICK SHORTCUTS) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Folder className="w-5 h-5 text-emerald-700" />
              <span>Carpetas Principales del Repositorio</span>
            </h2>
            <span className="text-xs text-slate-500">
              3 Carpetas temáticas oficiales
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {folders.map((folder) => {
              const isSelected = selectedCategory === folder.name;
              return (
                <div
                  key={folder.id}
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 text-left flex flex-col justify-between group shadow-sm hover:shadow-md ${
                    isSelected ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200/90 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                        <Folder className="w-6 h-6 fill-emerald-100" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        Carpeta MSP
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-base text-emerald-950 group-hover:text-emerald-700 transition-colors">
                      {folder.name}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {folder.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(isSelected ? 'all' : folder.name);
                        setSearchTerm('');
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-700 text-white'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      {isSelected ? 'Ver Todos' : 'Ver Archivos'}
                    </button>

                    <a
                      href={folder.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-semibold transition-colors"
                      title="Abrir esta carpeta en Google Drive"
                    >
                      <span>Drive</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. SEARCH, CATEGORY TABS & CONTROLS */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm mb-6 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre (ej. Parto, Control Prenatal, Derechos, Adulto Mayor, VIH)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500 font-medium">Vista:</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeViewMode === 'grid' ? 'bg-white shadow-xs text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Vista en tarjetas cuadrícula"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeViewMode === 'list' ? 'bg-white shadow-xs text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Vista en lista detallada"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-mono text-[11px] uppercase shrink-0">Filtrar:</span>
            
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos los Documentos ({totalFilesCount})
            </button>

            <button
              onClick={() => setSelectedCategory('Raíz')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'Raíz'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Carpeta Principal (10)
            </button>

            <button
              onClick={() => setSelectedCategory('DERECHOS MSP')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'DERECHOS MSP'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              DERECHOS MSP (4)
            </button>

            <button
              onClick={() => setSelectedCategory('NORMA DE VIOLENCIA')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'NORMA DE VIOLENCIA'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              NORMA DE VIOLENCIA / ZONA 1 (8)
            </button>

            <button
              onClick={() => setSelectedCategory('PROTOCOLOS DE ATENCION')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'PROTOCOLOS DE ATENCION'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              PROTOCOLOS DE ATENCIÓN (6)
            </button>
          </div>

        </div>

        {/* 5. FILES LISTING (GRID OR LIST) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-500 font-semibold">
              Mostrando {filteredItems.length} elemento(s)
              {searchTerm && ` para "${searchTerm}"`}
            </span>

            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-emerald-700 hover:underline font-semibold cursor-pointer"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No se encontraron archivos con ese criterio</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Prueba buscando con palabras clave como «parto», «prenatal», «VIH», «adulto», o selecciona otra categoría.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 cursor-pointer mt-2"
              >
                Ver todos los archivos
              </button>
            </div>
          ) : activeViewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-3">
                    {/* Header icon and metadata */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-105 transition-transform">
                        {item.isFolder ? (
                          <Folder className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {item.isFolder ? 'Carpeta' : 'PDF Oficial'}
                        </span>
                        {item.size && (
                          <span className="text-[10px] font-semibold text-slate-400">
                            {item.size}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Document title */}
                    <div>
                      <h4 className="font-sans font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </h4>
                      {item.subfolder && (
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                          Subcarpeta: {item.subfolder}
                        </span>
                      )}
                    </div>

                    {/* Brief description */}
                    {item.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewItem(item)}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Previsualizar documento"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visualizar</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {item.downloadUrl && (
                        <a
                          href={item.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Descargar archivo PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}

                      <a
                        href={item.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Ver en Google Drive"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* DETAILED LIST VIEW */
            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 mt-0.5">
                      {item.isFolder ? (
                        <Folder className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900 hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-100">
                          {item.folderCategory}
                        </span>
                        {item.size && <span>· Tamaño: {item.size}</span>}
                        {item.date && <span>· Fecha: {item.date}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setPreviewItem(item)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visualizar</span>
                    </button>

                    {item.downloadUrl && (
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Descargar archivo"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Descargar</span>
                      </a>
                    )}

                    <a
                      href={item.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                      title="Abrir en Google Drive"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. BOTTOM NOTICE & GOOGLE DRIVE FOLDER LINK */}
        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-100 text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="font-sans font-bold text-base text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Acceso Abierto a la Información Pública en Salud</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Todos los documentos provienen de la carpeta oficial compartida del Ministerio de Salud Pública de Ecuador para el Distrito 08D02 Rioverde. Si necesitas un documento clínico adicional, puedes acceder al directorio central completo en Google Drive.
            </p>
          </div>

          <a
            href={GOOGLE_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 shadow-sm transition-all"
          >
            <span>Ir a la Carpeta Central en Google Drive</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* 7. DOCUMENT PREVIEW MODAL */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal header */}
              <div className="p-4 sm:p-5 bg-emerald-950 text-white flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-emerald-800/80 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden text-left">
                    <h3 className="font-bold text-xs sm:text-sm truncate">
                      {previewItem.name}
                    </h3>
                    <span className="text-[10px] text-emerald-300 font-mono block">
                      {previewItem.folderCategory} {previewItem.size ? `· ${previewItem.size}` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {previewItem.downloadUrl && (
                    <a
                      href={previewItem.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                      title="Descargar archivo"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Descargar</span>
                    </a>
                  )}

                  <a
                    href={previewItem.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-white/20 transition-colors"
                    title="Abrir en pestaña nueva de Google Drive"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Abrir en Drive</span>
                  </a>

                  <button
                    onClick={() => setPreviewItem(null)}
                    className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Cerrar vista previa"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal body: Embedded Google Drive Preview iframe */}
              <div className="flex-1 bg-slate-100 relative">
                {previewItem.previewUrl ? (
                  <iframe
                    src={previewItem.previewUrl}
                    className="w-full h-full border-0"
                    title={previewItem.name}
                    allow="autoplay"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
                    <Folder className="w-16 h-16 text-emerald-600" />
                    <h4 className="text-lg font-bold text-slate-800">{previewItem.name}</h4>
                    <p className="text-xs text-slate-500 max-w-md">
                      Esta es una carpeta de Google Drive. Puedes explorar todos sus archivos directamente en Google Drive.
                    </p>
                    <a
                      href={previewItem.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-2"
                    >
                      <span>Abrir carpeta en Google Drive</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
