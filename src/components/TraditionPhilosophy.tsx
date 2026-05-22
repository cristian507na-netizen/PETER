'use client';

import { motion } from 'framer-motion';
import { Calendar, Award, MapPin } from 'lucide-react';
import Image from 'next/image';

const EASE = [0.5, 0, 0, 1] as [number, number, number, number];

const BARBER_IMAGE =
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80';

function scrollToBooking() {
  document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' });
}

const trustItems = [
  { icon: Calendar, title: 'Reserva Online',         desc: 'Confirmación inmediata' },
  { icon: Award,    title: 'Productos Originales',   desc: 'Importación directa' },
  { icon: MapPin,   title: '3 Sucursales en Panamá', desc: 'Costa del Este · Obarrio · Casco Viejo' },
];

export default function TraditionPhilosophy() {
  return (
    <section className="py-24 px-6 md:px-12" style={{ overflowX: 'clip' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          {/* ── Columna izquierda ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-xl"
          >
            <p
              className="uppercase tracking-widest text-xs font-semibold mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Nuestra historia
            </p>
            <h2
              className="text-4xl md:text-5xl font-serif mb-8 leading-tight"
              style={{ color: 'var(--primary)' }}
            >
              La tradición barberil, reinventada para el caballero moderno
            </h2>
            <div className="space-y-5">
              <p className="text-base leading-relaxed" style={{ color: 'rgba(14,14,14,0.65)' }}>
                La barbería es más que un corte; es la pausa semanal donde el caballero
                recupera su porte. Heredamos las técnicas de la vieja escuela italiana y
                las afilamos con la precisión del oficio contemporáneo.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(14,14,14,0.65)' }}>
                En cada visita encontrarás la silla de cuero, el aroma del aftershave, la
                conversación franca y el ritual de un afeitado a navaja que parece sacado
                de otra época. Porque verse bien nunca pasa de moda.
              </p>
            </div>

            {/* Botón siempre redondeado */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToBooking}
              className="mt-10 btn-dark px-8 py-4 rounded-full uppercase tracking-wider text-sm"
            >
              Conocer la Barbería
            </motion.button>
          </motion.div>

          {/* ── Columna derecha — SIN x offset para evitar desbordamiento en mobile ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative pb-16 lg:pb-0"
          >
            <div
              className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-2xl"
              style={{
                maskImage:
                  'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse at center, black 50%, transparent 100%)',
              }}
            >
              <Image
                src={BARBER_IMAGE}
                alt="Barbero trabajando con precisión en Peter Barber"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Badge — posicionado dentro del flujo en mobile para no desbordar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
              className="glassmorphism-dark mx-4 mt-4 lg:mt-0 lg:mx-0 lg:absolute lg:-bottom-10 lg:-left-10 p-6 rounded-2xl shadow-premium"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p
                className="uppercase tracking-widest text-[9px] font-bold mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Duración del Servicio
              </p>
              <p className="font-serif text-2xl text-white mb-2 flex items-center gap-2 flex-wrap">
                <span>30min</span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
                <span>45min</span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
                <span>75min</span>
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Corte rápido, corte + barba, o ritual completo. Reserva el formato que
                mejor se ajuste a tu agenda.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Trust banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-around items-center gap-8 text-center"
          style={{
            backgroundColor: 'rgba(201,162,107,0.1)',
            border: '1px solid rgba(201,162,107,0.2)',
          }}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center gap-3 flex-1">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: -3 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Icon className="w-9 h-9" style={{ color: 'var(--accent)' }} />
                </motion.div>
                <h4 className="text-lg font-serif" style={{ color: 'var(--primary)' }}>
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: 'rgba(14,14,14,0.55)' }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
