/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Check, Upload } from 'lucide-react';
import { useBannerImage } from '../utils/bannerImage';

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  const [heroImage, uploadBannerFile] = useBannerImage();
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          src={heroImage || '/images/banner-rioverde.png'}
          alt="Fachada Principal Centro de Salud Tipo C Rioverde"
          className="w-full h-full object-cover object-center md:object-[center_35%] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.endsWith('/images/banner-rioverde.png')) {
              target.src = '/images/banner-rioverde.jpg';
            } else if (target.src.endsWith('/images/banner-rioverde.jpg')) {
              target.src = '/fachada-principal.png';
            }
          }}
        />
        {/* Softened white translucent overlay for optimal contrast and text legibility */}
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-white/85 via-white/45 via-30% md:via-45% to-transparent pointer-events-none"></div>
        {/* Extra height-based fade for mobile layouts at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent lg:hidden pointer-events-none"></div>
      </div>

      {/* Floating control to load/update the exact official facade image */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
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
            <span>Foto de fachada colocada exitosamente</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg hover:shadow-xl border border-emerald-500/70 transition-all duration-200 cursor-pointer"
            title="Haz clic para seleccionar la imagen 'fachada principal tipo c rioverde.png' o arrástrala sobre este banner"
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera className="w-4 h-4 text-emerald-200 shrink-0" />
            )}
            <span>
              {isUploading ? 'Colocando imagen...' : 'Colocar foto oficial de fachada'}
            </span>
          </button>
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
