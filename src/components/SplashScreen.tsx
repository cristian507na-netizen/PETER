'use client';

import { motion } from 'framer-motion';

interface Props {
  onSkip: () => void;
}

export default function SplashScreen({ onSkip }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 38%, #ffffff 0%, #F4EFE6 100%)',
      }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } }}
    >
      <div className="mascot-wrap">
        <div
          className="logo-badge"
          style={{
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'white',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.jpg"
            alt="Peter Barber"
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="splash-text">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#C9A26B',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}
        >
          Barbería Premium
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 6vw, 3rem)',
            fontWeight: 700,
            color: '#0E0E0E',
            lineHeight: 1,
          }}
        >
          Peter Barber
        </p>
        <div
          style={{
            width: '2.5rem',
            height: '1px',
            background: '#C9A26B',
            margin: '0.75rem auto',
          }}
        />
        <p
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.15em',
            color: 'rgba(14,14,14,0.38)',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Panamá · Desde &apos;97
        </p>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        onClick={onSkip}
        className="mt-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-200"
        style={{ color: 'rgba(14,14,14,0.28)', fontFamily: "'Inter', sans-serif" }}
        onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)')}
        onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(14,14,14,0.28)')}
      >
        Entrar al sitio →
      </motion.button>
    </motion.div>
  );
}
