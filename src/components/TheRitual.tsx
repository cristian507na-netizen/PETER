'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Scissors, Coffee, SprayCan, Clock } from 'lucide-react';

const rituals = [
  {
    icon: ShieldCheck,
    title: 'Barberos Certificados',
    desc: 'Cada miembro del equipo cuenta con formación en barbería clásica y técnicas internacionales contemporáneas.',
  },
  {
    icon: Flame,
    title: 'Toalla Caliente & Vapor',
    desc: 'Apertura de poros previa al afeitado para una pasada de navaja sin irritación ni vellos enterrados.',
  },
  {
    icon: Scissors,
    title: 'Acero Esterilizado',
    desc: 'Herramientas higienizadas con autoclave entre cada cliente. Cero compromisos en bioseguridad.',
  },
  {
    icon: Coffee,
    title: 'Hospitalidad de Club',
    desc: 'Bourbon, espresso o agua de coco fría mientras esperas. El tiempo en la silla es un placer.',
  },
  {
    icon: SprayCan,
    title: 'Productos Importados',
    desc: 'Pomadas, tónicos y colonias de Proraso, Reuzel y Layrite. Sin imitaciones ni rebajes.',
  },
  {
    icon: Clock,
    title: 'Puntualidad Británica',
    desc: 'Respetamos tu agenda. Si tu cita es a las 4:00 PM, la silla está lista a las 4:00 PM.',
  },
];

export default function TheRitual() {
  return (
    <section
      id="el-club"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <span
        className="absolute -bottom-10 -right-10 pointer-events-none select-none z-0 leading-none tracking-tighter font-serif"
        style={{
          color: 'rgba(255,255,255,0.03)',
          fontSize: 'clamp(8rem, 20vw, 20rem)',
        }}
        aria-hidden="true"
      >
        CABALLERO
      </span>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-serif text-white mb-6"
          >
            El Ritual del Caballero
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            La confianza se gana en los detalles. Cada visita es un ritual cuidado al
            milímetro para que salgas no solo mejor cortado, sino transformado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rituals.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.5, 0, 0, 1] as [number, number, number, number], delay: i * 0.1 }}
                className="flex items-start gap-5 group"
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(201,162,107,0.2)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h3
                    className="text-xl font-serif text-white mb-2"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
