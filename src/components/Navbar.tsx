'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, Star } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'El Club',   href: '#el-club' },
  { label: 'Reservar',  href: '#reservar' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    closeMenu();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="glass-nav fixed z-50 left-0 right-0 mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between"
        style={{
          top:          scrolled ? '0'       : '1rem',
          width:        scrolled ? '100%'    : '94%',
          maxWidth:     scrolled ? '100%'    : '80rem',
          borderRadius: scrolled ? '0 0 1.25rem 1.25rem' : '9999px',
          transition:   'top .35s ease, border-radius .35s ease, width .35s ease, max-width .35s ease, box-shadow .35s ease',
          boxShadow: scrolled
            ? 'rgba(14,63,126,.06) 0 0 0 1px, rgba(42,51,70,.07) 0 6px 16px -4px, rgba(14,63,126,.05) 0 24px 32px -12px'
            : 'none',
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 flex-shrink-0 group"
          aria-label="Peter Barber — inicio"
        >
          <div
            className="h-10 w-10 overflow-hidden flex-shrink-0 rounded-full transition-all duration-300"
            style={{ border: '2px solid rgba(201,162,107,0.35)' }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Peter Barber logo"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="leading-none hidden sm:block">
            <span
              className="block text-[8px] font-bold tracking-[0.25em] uppercase"
              style={{ color: 'rgba(14,14,14,0.38)' }}
            >
              Barbería Premium
            </span>
            <span className="font-serif text-lg font-bold" style={{ color: 'var(--primary)' }}>
              Peter Barber
            </span>
          </div>
        </button>

        <div
          className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-sm font-medium"
          style={{ color: 'rgba(14,14,14,0.7)' }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLink(link.href)}
              className="transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="hidden lg:flex items-center gap-1.5 border px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'rgba(201,162,107,0.3)',
              color: 'var(--primary)',
            }}
          >
            <Star className="w-3 h-3 fill-current" style={{ color: 'var(--accent)' }} />
            5/5 Google
          </div>

          <button
            onClick={() => handleLink('#reservar')}
            className="btn-gold px-4 py-2 md:px-5 rounded-full text-xs md:text-sm flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Agendar</span>
            <span className="sm:hidden">Cita</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={menuOpen ? closeMenu : openMenu}
            className="md:hidden p-1.5 rounded-lg transition-colors duration-200"
            style={{ color: 'var(--primary)' }}
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <button
              onClick={closeMenu}
              className="absolute top-8 right-8 p-2 transition-colors duration-200 hover:text-[var(--accent)]"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              aria-label="Cerrar menú"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="mb-10 text-center">
              <span
                className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-1"
                style={{ color: 'var(--accent)' }}
              >
                Barbería Premium
              </span>
              <span className="font-serif text-4xl font-bold text-white tracking-tight">
                Peter Barber
              </span>
              <div
                className="w-12 h-px mx-auto mt-3"
                style={{ backgroundColor: 'var(--accent)' }}
              />
            </div>

            <nav className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.38 }}
                  onClick={() => handleLink(link.href)}
                  className="font-serif text-3xl text-white transition-all duration-300 hover:text-[var(--accent)] hover:scale-105"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-12 flex flex-col gap-3 w-full max-w-xs px-6"
            >
              <button
                onClick={() => handleLink('#reservar')}
                className="btn-gold px-8 py-4 rounded-full text-base font-bold text-center"
              >
                Agendar Cita
              </button>
              <a
                href="tel:+50760000000"
                className="border-2 text-white px-8 py-4 rounded-full text-base font-bold text-center transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ borderColor: 'rgba(255,255,255,0.25)' }}
                onClick={closeMenu}
              >
                Llamar ahora
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
