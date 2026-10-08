/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Services from './components/Services';
import AcercaDeNosotros from './components/AcercaDeNosotros';
import LaboratoryWidget from './components/LaboratoryWidget';
import Statistics from './components/Statistics';
import Blog from './components/Blog';
import Ubicacion from './components/Ubicacion';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import AIAssistantWidget from './components/AIAssistantWidget';

// PAGE VIEWS
import ServiciosPage from './components/ServiciosPage';
import AcercaPage from './components/AcercaPage';
import NormasProtocolosPage from './components/NormasProtocolosPage';
import ContactoPage from './components/ContactoPage';
import SecureClinicalPortal from './components/SecureClinicalPortal';

export default function App() {
  // Enforce secure rendering when initiated from parent click
  const isClinicalPortalView = typeof window !== 'undefined' && window.location.search.includes('clinical_portal=true');

  if (isClinicalPortalView) {
    return <SecureClinicalPortal />;
  }

  const [currentPage, setCurrentPage] = useState<'inicio' | 'servicios' | 'nosotros' | 'protocolos' | 'contacto'>('inicio');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [preselectedSpecialty, setPreselectedSpecialty] = useState<string | undefined>(undefined);

  // Clear any stale cached banner images from older sessions
  useEffect(() => {
    try {
      const staleKeys = [
        'rioverde_fachada_banner_url_v3',
        'rioverde_fachada_banner_url_v2',
        'rioverde_fachada_banner_url',
        'rioverde_banner_url',
      ];
      staleKeys.forEach((k) => localStorage.removeItem(k));
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.includes('fachada_banner') || key.includes('rioverde_banner'))) {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const handleOpenAppointment = (specialtyId?: string) => {
    window.open('https://api.whatsapp.com/send/?phone=593961171171&text=Hola&app_absent=0', '_blank', 'noreferrer,noopener');
  };

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
    setPreselectedSpecialty(undefined);
  };

  const handlePageNavigation = (page: 'inicio' | 'servicios' | 'nosotros' | 'protocolos' | 'contacto') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased text-slate-800 flex flex-col justify-between" id="application-root">
      
      <div>
        {/* 1. HEADER SUPERIOR - SYSTEM CONTROL */}
        <Header
          onOpenAppointment={() => handleOpenAppointment()}
          currentPage={currentPage}
          onNavigate={handlePageNavigation}
        />

        {/* 2. DYNAMIC CONTENT VIEWS SYSTEM */}
        <AnimatePresence mode="wait">
          
          {currentPage === 'inicio' && (
            <motion.div
              key="inicio-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              id="main-home-views"
            >
              {/* BANNER PRINCIPAL */}
              <Hero onOpenAppointment={() => handleOpenAppointment()} />

              {/* BARRA DE BENEFICIOS */}
              <Benefits />

              {/* SECCIÓN "NUESTROS SERVICIOS" - 5 COLUMNS */}
              <Services 
                onBookSpecialty={(id) => handleOpenAppointment(id)} 
                onNavigateToServices={() => handlePageNavigation('servicios')}
              />

              {/* TEASER INSTITUTIONAL: ACERCA DE NOSOTROS */}
              <AcercaDeNosotros onNavigateToAbout={() => handlePageNavigation('nosotros')} />

              {/* CONSULTAS EN LÍNEA: LABORATORIO Y ECOGRAFÍA */}
              <LaboratoryWidget />

              {/* ESTADÍSTICAS */}
              <Statistics />

              {/* NOTICIAS / BLOG */}
              <Blog />

              {/* UBICACIÓN Y MAPA */}
              <Ubicacion />
            </motion.div>
          )}

          {currentPage === 'servicios' && (
            <motion.div
              key="servicios-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <ServiciosPage onBookSpecialty={(id) => handleOpenAppointment(id)} />
            </motion.div>
          )}

          {currentPage === 'nosotros' && (
            <motion.div
              key="nosotros-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <AcercaPage />
            </motion.div>
          )}

          {currentPage === 'protocolos' && (
            <motion.div
              key="protocolos-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <NormasProtocolosPage onNavigate={handlePageNavigation} />
            </motion.div>
          )}

          {currentPage === 'contacto' && (
            <motion.div
              key="contacto-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <ContactoPage />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 3. FOOTER INSTITUCIONAL */}
      <Footer
        onNavigate={handlePageNavigation}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* FLOATING ACTION OVERLAYS (MODALS) */}
      <AIAssistantWidget />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={handleCloseAppointment}
        initialSpecialtyId={preselectedSpecialty}
      />

    </div>
  );
}
