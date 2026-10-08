/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, HeartPulse, Sparkles, PhoneCall, Calendar, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onOpenAppointment: () => void;
  currentPage: 'inicio' | 'servicios' | 'nosotros' | 'protocolos' | 'contacto';
  onNavigate: (page: 'inicio' | 'servicios' | 'nosotros' | 'protocolos' | 'contacto') => void;
}

export default function Header({ onOpenAppointment, currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Monitor scroll state to apply polished styling to sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', pageId: 'inicio' as const },
    { label: 'Servicios', pageId: 'servicios' as const },
    { label: 'Acerca de Nosotros', pageId: 'nosotros' as const },
    { label: 'Normas y protocolos', pageId: 'protocolos' as const },
    { label: 'Contacto', pageId: 'contacto' as const },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: 'inicio' | 'servicios' | 'nosotros' | 'protocolos' | 'contacto') => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-emerald-950 border-b border-emerald-100'
            : 'bg-emerald-950/90 backdrop-blur-md py-4 text-white border-b border-emerald-800/30 shadow-lg'
        }`}
        id="app-main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* BRAND LOGO AND NAME */}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, 'inicio')}
              className="flex items-center gap-2.5 group cursor-pointer"
              id="header-brand-logo"
            >
              <div className="p-1.5 bg-emerald-500 text-white rounded-lg group-hover:scale-105 transition-transform">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className={`font-sans font-black text-xs sm:text-[13px] tracking-tight leading-none uppercase ${
                  isScrolled ? 'text-emerald-950' : 'text-white'
                }`}>
                  Centro de Salud
                </span>
                <span className={`text-[11px] sm:text-xs font-semibold font-sans tracking-wide mt-0.5 leading-none ${
                  isScrolled ? 'text-emerald-700' : 'text-emerald-300'
                }`}>
                  Tipo C Rioverde
                </span>
              </div>
            </a>

            {/* DESKTOP NAVIGATION MENU WITH INTERACTIVE DYNAMIC FLOATING TAB */}
            <nav 
              className={`hidden lg:flex items-center gap-1 p-1 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-slate-100/90 shadow-inner border border-slate-200/60' 
                  : 'bg-emerald-900/60 border border-white/5 shadow-md backdrop-blur-md'
              }`} 
              id="header-desktop-nav"
            >
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  onClick={(e) => handleLinkClick(e, item.pageId)}
                  className="relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer inline-flex items-center justify-center z-10"
                  style={{
                    color: isScrolled
                      ? (hoveredIndex === idx ? '#ffffff' : '#044e37')
                      : '#ffffff',
                    fontWeight: currentPage === item.pageId ? '900' : '700'
                  }}
                >
                  {(hoveredIndex === idx || currentPage === item.pageId) && (
                    <motion.div
                      layoutId="headerBubble"
                      className={`absolute inset-0 rounded-full -z-10 shadow ${
                        currentPage === item.pageId 
                          ? 'bg-emerald-800' 
                          : isScrolled ? 'bg-emerald-600' : 'bg-emerald-700'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* CALL TO ACTION BUTTONS */}
            <div className="hidden sm:flex items-center gap-2.5" id="header-actions">
              {/* AGENDAMIENTO TIPO C BUTTON (Direct link to https://agendamiento.tipocrioverde.com/) */}
              <a
                href="https://agendamiento.tipocrioverde.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3.5 py-2 font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isScrolled
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40'
                }`}
                title="Ir al sistema de Agendamiento Tipo C Rioverde"
                id="header-btn-agendamiento"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendamiento Tipo C</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <button
                onClick={onOpenAppointment}
                className="px-3 py-2 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 hover:text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-emerald-700/50 cursor-pointer"
                id="header-cta-appointment"
                title="Atención directa por WhatsApp oficial"
              >
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* MOBILE TRIGGER */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border focus:outline-none transition-colors cursor-pointer"
              style={{
                borderColor: isScrolled ? '#cbd5e1' : 'rgba(255,255,255,0.2)',
                color: isScrolled ? '#022c22' : '#ffffff'
              }}
              id="header-mobile-trigger"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER SCREEN OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-emerald-600" />
                    <div className="flex flex-col">
                      <span className="font-sans font-black text-xs text-emerald-950 leading-none uppercase">Centro de Salud</span>
                      <span className="text-[10px] sm:text-xs font-semibold font-sans tracking-wide text-emerald-600 leading-none mt-0.5">Tipo C Rioverde</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 cursor-pointer"
                    aria-label="Cerrar menú móvil"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Links list */}
                <nav className="flex flex-col gap-2.5">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href="#"
                      onClick={(e) => handleLinkClick(e, item.pageId)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                        currentPage === item.pageId
                          ? 'bg-emerald-700 text-white font-black'
                          : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
                      }`}
                    >
                      {item.label}
                      <span className={`${currentPage === item.pageId ? 'text-white' : 'text-gray-300'} font-mono text-[10px]`}>&gt;</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <a
                  href="https://agendamiento.tipocrioverde.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendamiento Tipo C</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAppointment();
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Citas</span>
                </button>
                <div className="flex justify-center text-[10px] text-gray-400 font-mono">
                  MSP ATENCIÓN GRATUITA EN ECUADOR
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

