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
            className="relative h-screen flex flex-col overflow-hidden"
            style={{ backgroundColor: '#111009' }}
          >
            {/* ── Foto arranca en top:84px (bajo el navbar pill) ── */}
            <div
              className="absolute left-0 right-0 bottom-0 bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url('${HERO_IMAGE}')`,
                backgroundPosition: '50% 20%',
                top: '84px',
              }}
            />

            {/* ── Overlay oscuro cinematográfico ── */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)',
              }}
            />

            {/* ── Difuminado inferior hacia la siguiente sección ── */}
            <div
              className="absolute bottom-0 left-0 right-0 h-40"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, var(--background) 100%)`,
              }}
            />

            {/* ── Contenido anclado al fondo ── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-16 md:pb-20">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
                  className="flex flex-col items-start gap-4 max-w-2xl"
                >
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                    }}
                    className="uppercase tracking-[0.28em] text-[10px] font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    Peter Barber · Panamá · Desde &apos;97
                  </motion.p>

                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
                      visible: {
                        opacity: 1, y: 0, filter: 'blur(0px)',
                        transition: { duration: 1.0, ease: EASE },
                      },
                    }}
                    className="font-serif leading-[1.05] tracking-tight text-white"
                    style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}
                  >
                    Define tu estilo con
                    <br />
                    <span className="italic" style={{ color: 'var(--accent)' }}>
                      tradición &amp; navaja
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                    }}
                    className="text-sm md:text-base leading-relaxed max-w-md"
                    style={{ color: 'rgba(255,255,255,0.62)' }}
                  >
                    El ritual clásico del caballero, reinventado. Cortes de precisión
                    y afeitados con toalla caliente en pleno corazón de Panamá.
                  </motion.p>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                    }}
                    className="flex flex-col sm:flex-row gap-3 pt-1"
                  >
                    <button
                      onClick={scrollToBooking}
                      className="btn-gold px-8 py-3.5 rounded-full text-sm uppercase tracking-widest"
                    >
                      Reservar mi Corte
                    </button>
                    <button
                      onClick={() =>
                        document.getElementById('el-club')?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="px-8 py-3.5 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-300 hover:bg-white/10"
                      style={{ border: '1.5px solid rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.82)' }}
                    >
                      Conocer el Club
                    </button>
                  </motion.div>
                </motion.div>

                {/* ── Stats strip ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
                  className="mt-7 flex flex-wrap gap-x-7 gap-y-3 pt-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.11)' }}
                >
                  {[
                    { n: '500+', label: 'Clientes satisfechos' },
                    { n: '25+',  label: 'Años de experiencia' },
                    { n: '3',    label: 'Sucursales en Panamá' },
                    { n: '5/5',  label: 'Google Reviews' },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5">
                      <span className="font-serif text-xl font-bold text-white leading-none">
                        {s.n}
                      </span>
                      <span
                        className="text-[9px] uppercase tracking-widest"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
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
