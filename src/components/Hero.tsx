/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Check, Upload, Globe, RefreshCw } from 'lucide-react';
import { useBannerImage } from '../utils/bannerImage';
import defaultFallbackImg from '../assets/images/hero_health_center_1779982013572.png';

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  const [heroImage, uploadBannerFile, { isLocalDataImage, syncToServer }] = useBannerImage();
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);
  const [isSyncingServer, setIsSyncingServer] = useState(false);
  const [syncSuccessBadge, setSyncSuccessBadge] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSyncToServer = async () => {
    try {
      setIsSyncingServer(true);
      const ok = await syncToServer();
      if (ok) {
        setSyncSuccessBadge(true);
        setTimeout(() => setSyncSuccessBadge(false), 5000);
      }
    } finally {
      setIsSyncingServer(false);
    }
  };

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            try {
              setIsUploading(true);
              await uploadBannerFile(file);
              setShowSuccessBadge(true);
              setTimeout(() => setShowSuccessBadge(false), 3500);
            } catch (err) {
              console.error('Error al pegar imagen:', err);
            } finally {
              setIsUploading(false);
            }
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [uploadBannerFile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      await uploadBannerFile(file);
      setShowSuccessBadge(true);
      setTimeout(() => setShowSuccessBadge(false), 3500);
    } catch (err) {
      console.error('Error al cargar imagen del banner:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    try {
      setIsUploading(true);
      await uploadBannerFile(file);
      setShowSuccessBadge(true);
      setTimeout(() => setShowSuccessBadge(false), 3500);
    } catch (err) {
      console.error('Error al soltar imagen en banner:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section
      id="banner-hero"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
      }}
      onDrop={handleDrop}
      className="relative w-full max-w-[1960px] mx-auto h-[420px] sm:h-[480px] md:h-[520px] lg:h-[620px] flex items-start overflow-hidden bg-emerald-950 mt-[60px] md:mt-0 group"
    >
      {/* Visual drop indicator when dragging image over the banner */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-30 bg-emerald-950/85 backdrop-blur-sm border-4 border-dashed border-emerald-400 flex flex-col items-center justify-center text-white p-6 pointer-events-none">
          <Upload className="w-14 h-14 mb-3 text-emerald-300 animate-bounce" />
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-center">
            Suelta aquí la foto de la fachada
          </h3>
          <p className="text-sm text-emerald-200 mt-1 font-mono">
            fachada principal tipo c rioverde.png
          </p>
        </div>
      )}

      {/* Background Image of the Modern Health Center Facade */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImage || '/api/banner-image'}
          alt="Fachada Principal Centro de Salud Tipo C Rioverde"
          className="w-full h-full object-cover object-center md:object-[center_35%] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== defaultFallbackImg) {
              target.src = defaultFallbackImg;
            }
          }}
        />
        {/* Softened white translucent overlay for optimal contrast and text legibility */}
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-white/85 via-white/45 via-30% md:via-45% to-transparent pointer-events-none"></div>
        {/* Extra height-based fade for mobile layouts at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent lg:hidden pointer-events-none"></div>
      </div>

      {/* Floating control to load/update the exact official facade image */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex flex-col items-end gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
          id="input-cargar-fachada"
        />

        {showSuccessBadge ? (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-full shadow-xl border border-emerald-400 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Foto de fachada actualizada y sincronizada</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-emerald-900/90 hover:bg-emerald-950 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg hover:shadow-xl border border-emerald-400/80 backdrop-blur-md transition-all duration-200 cursor-pointer"
              title="Selecciona la foto oficial de la fachada de tu computadora o dispositivo"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera className="w-4 h-4 text-emerald-300 shrink-0" />
              )}
              <span>
                {isUploading ? 'Guardando foto...' : 'Colocar foto oficial de fachada'}
              </span>
            </button>
          </div>
        )}

        {/* Sync button for browser where image is stored locally */}
        {isLocalDataImage && (
          <div>
            {syncSuccessBadge ? (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded-full shadow-lg border border-emerald-300 animate-fadeIn">
                <Check className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                <span>¡Sincronizada con el servidor para todos los navegadores!</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSyncToServer}
                disabled={isSyncingServer}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-emerald-100 hover:text-white text-xs font-semibold rounded-full shadow-md border border-emerald-400 transition-all cursor-pointer animate-pulse"
                title="Sincronizar esta imagen con el servidor para que se vea en cualquier otro navegador, pestaña o dispositivo"
              >
                {isSyncingServer ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Globe className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                )}
                <span>
                  {isSyncingServer ? 'Sincronizando...' : '🌐 Sincronizar con otros navegadores'}
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-md md:max-w-xl lg:max-w-2xl space-y-4 text-left p-2 pt-28 sm:pt-40 md:pt-48 lg:pt-56">
          
          {/* Slogan */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-emerald-950 tracking-tight leading-tight drop-shadow-sm"
            id="hero-main-title"
          >
            Tu salud, <br className="hidden sm:inline" />
            <span className="text-emerald-700">nuestra misión diaria</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed max-w-lg"
          >
            Brindamos atención médica integral, accesible y de calidad a toda la comunidad. Conoce nuestros servicios, accede a tus resultados y encuentra cómo llegar hasta nosotros.
          </motion.p>
          
        </div>
      </div>
    </section>
  );
}
