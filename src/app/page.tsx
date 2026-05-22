'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import ServicesBento from '@/components/ServicesBento';
import TheRitual from '@/components/TheRitual';
import TraditionPhilosophy from '@/components/TraditionPhilosophy';
import BookingSection from '@/components/BookingSection';
import ClientReviews from '@/components/ClientReviews';
import BookingFooter from '@/components/BookingFooter';

const EASE = [0.16, 1, 0.3, 1] as const;
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80';

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [mainReady, setMainReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('pb_splash_shown');
    if (seen) {
      setMainReady(true);
    } else {
      sessionStorage.setItem('pb_splash_shown', '1');
      setShowSplash(true);
      const t = setTimeout(() => {
        setShowSplash(false);
        setMainReady(true);
      }, 3300);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSkip = () => {
    setShowSplash(false);
    setMainReady(true);
  };

  const scrollToBooking = () => {
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen key="splash" onSkip={handleSkip} />}</AnimatePresence>

      {mainReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Navbar />

          <section
            id="inicio"
            className="relative h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Foto a plena presencia */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${HERO_IMAGE}')`,
                opacity: 0.78,
              }}
            />

            {/* Vignette oscuro suave en bordes para profundidad */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 30%, rgba(14,14,14,0.28) 100%)',
              }}
            />

            {/* Halo crema radial detrás del texto — solo donde están las letras */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 58% at 50% 46%, rgba(244,239,230,0.82) 0%, rgba(244,239,230,0.22) 60%, transparent 100%)',
              }}
            />

            {/* Difuminado suave hacia la sección siguiente */}
            <div
              className="absolute bottom-0 left-0 right-0 h-36"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, var(--background))',
              }}
            />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.16 } },
                }}
                className="flex flex-col items-center gap-7"
              >
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                  }}
                  className="uppercase tracking-[0.3em] text-[11px] font-semibold"
                  style={{ color: 'var(--accent)' }}
                >
                  Peter Barber · Panamá · Desde &apos;97
                </motion.p>

                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 1.1, ease: EASE },
                    },
                  }}
                  className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.05] tracking-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  Define tu estilo con
                  <br />
                  <span className="italic" style={{ color: 'var(--accent)' }}>
                    tradición &amp; navaja
                  </span>
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                  }}
                  className="text-base md:text-lg max-w-xl leading-relaxed"
                  style={{ color: 'rgba(14,14,14,0.62)' }}
                >
                  El ritual clásico del caballero, reinventado. Cortes de precisión,
                  afeitados con toalla caliente y la elegancia de la vieja escuela en
                  pleno corazón de Panamá.
                </motion.p>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={scrollToBooking}
                    className="btn-dark px-10 py-4 rounded-full text-sm uppercase tracking-widest"
                  >
                    Reservar mi Corte
                  </button>
                  <button
                    onClick={() =>
                      document.getElementById('el-club')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="px-10 py-4 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-300 hover:bg-[var(--primary)] hover:text-[var(--accent)]"
                    style={{
                      border: '2px solid rgba(14,14,14,0.18)',
                      color: 'rgba(14,14,14,0.7)',
                    }}
                  >
                    Conocer el Club
                  </button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
              onClick={() =>
                document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span
                className="uppercase tracking-widest text-[9px]"
                style={{ color: 'rgba(14,14,14,0.3)' }}
              >
                Descubrir
              </span>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="w-px h-8"
                style={{ backgroundColor: 'rgba(201,162,107,0.45)' }}
              />
            </motion.div>
          </section>

          <ServicesBento />
          <TheRitual />
          <TraditionPhilosophy />
          <BookingSection />
          <ClientReviews />
          <BookingFooter />
        </motion.div>
      )}
    </>
  );
}
