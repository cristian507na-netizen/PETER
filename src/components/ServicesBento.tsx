'use client';

import { motion } from 'framer-motion';
import { Crown, Scissors, Sparkles, Droplets } from 'lucide-react';

const EASE = [0.5, 0, 0, 1] as const;

const FEATURED_IMAGE =
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80';

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  },
});

export default function ServicesBento() {
  return (
    <section id="servicios" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 text-center"
        >
          <p
            className="uppercase tracking-widest text-xs font-semibold mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Carta del Caballero
          </p>
          <h2
            className="text-4xl md:text-5xl font-serif"
            style={{ color: 'var(--primary)' }}
          >
            Servicios firmados a tu medida
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5" style={{ gridAutoRows: '300px' }}>
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 } as object}
            className="service-card md:col-span-2 rounded-3xl flex flex-col justify-end relative overflow-hidden group cursor-pointer"
            style={{ gridRow: 'span 2', backgroundColor: 'var(--primary)' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('${FEATURED_IMAGE}')`,
                opacity: 0.35,
              }}
            />
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  'linear-gradient(to top, rgba(14,14,14,0.97) 35%, rgba(14,14,14,0.5) 70%, transparent 100%)',
              }}
            />
            <div
              className="absolute top-8 left-8 w-11 h-11 rounded-full flex items-center justify-center z-10"
              style={{ backgroundColor: 'rgba(201,162,107,0.15)' }}
            >
              <Crown className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </div>

            <div className="relative z-10 p-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 leading-tight">
                Ritual Caballero Completo
              </h3>
              <p className="max-w-md text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Corte de precisión + afeitado clásico con toalla caliente, masaje capilar
                y bourbon de cortesía. 75 minutos de absoluta indulgencia.
              </p>
              <button
                className="uppercase tracking-widest text-xs font-semibold transition-colors duration-300 hover:text-white"
                style={{ color: 'var(--accent)' }}
              >
                Reservar Experiencia →
              </button>
            </div>
          </motion.div>

          {[
            {
              icon: Scissors,
              title: 'Cortes Clásicos & Modernos',
              desc: 'Fades, undercuts, pompadours, texturas. Cada corte ejecutado a tijera y navaja según el rostro y estilo del cliente.',
              cta: 'Ver técnicas →',
            },
            {
              icon: Sparkles,
              title: 'Diseño de Barba',
              desc: 'Perfilado, contornos a navaja, mantenimiento y tratamientos con aceites importados. Tu barba como firma personal.',
              cta: 'Conocer estilos →',
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeUp(0.2 + i * 0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(14,14,14,0.1)' }}
                className="service-card bg-white rounded-3xl p-8 flex flex-col justify-between cursor-pointer"
                style={{ border: '1px solid rgba(201,162,107,0.18)' }}
              >
                <div>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'rgba(201,162,107,0.1)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="text-lg font-serif mb-2" style={{ color: 'var(--primary)' }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(14,14,14,0.65)' }}>
                    {card.desc}
                  </p>
                </div>
                <button
                  className="uppercase tracking-widest text-xs font-semibold mt-5 self-start transition-colors duration-200 hover:text-[var(--accent)]"
                  style={{ color: 'var(--primary)' }}
                >
                  {card.cta}
                </button>
              </motion.div>
            );
          })}

          <motion.div
            variants={fadeUp(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="service-card md:col-span-2 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer"
            style={{
              backgroundColor: 'rgba(201,162,107,0.12)',
              border: '1px solid rgba(201,162,107,0.28)',
            }}
          >
            <div className="flex items-start gap-5 flex-1">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: 'rgba(14,14,14,0.12)' }}
              >
                <Droplets className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h3
                  className="text-2xl md:text-3xl font-serif mb-2 leading-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  Tratamientos Capilares Premium
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-lg"
                  style={{ color: 'rgba(14,14,14,0.65)' }}
                >
                  Hidratación profunda, anti-caída, despigmentación de canas y tonificación
                  con productos italianos. La salud del cabello es la base del estilo.
                </p>
              </div>
            </div>
            <button
              className="uppercase tracking-widest text-xs font-semibold flex-shrink-0 transition-colors duration-200 hover:text-[var(--accent)]"
              style={{ color: 'var(--primary)' }}
            >
              Descubrir Ritual →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
