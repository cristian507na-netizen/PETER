'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    text: 'Pedí un fade con diseño de barba y salí sintiéndome otra persona. El maestro Luis sabe exactamente lo que cada rostro necesita.',
    service: 'FADE + BARBA - 45 MIN',
  },
  {
    text: 'El afeitado clásico con toalla caliente es una experiencia obligatoria. Nunca había sentido la piel tan suave.',
    service: 'AFEITADO CLÁSICO - 30 MIN',
  },
  {
    text: 'Reservé online a las 11 PM y a la mañana siguiente ya estaba en la silla. Eficiencia total.',
    service: 'CORTE EJECUTIVO - 30 MIN',
  },
  {
    text: 'Llevo 8 meses viniendo cada quincena y nunca un corte ha sido inconsistente. Profesionalismo puro.',
    service: 'CORTE CLÁSICO - 30 MIN',
  },
  {
    text: 'El bourbon de cortesía fue el detalle inesperado. Sentí que entré a un club privado, no a una barbería común.',
    service: 'RITUAL COMPLETO - 75 MIN',
  },
  {
    text: 'Mi barba tenía un problema de simetría hace años. Aquí en una sola visita me la diseñaron perfecta.',
    service: 'DISEÑO DE BARBA - 30 MIN',
  },
  {
    text: 'El tratamiento anti-caída me devolvió densidad en las entradas. Producto italiano de verdad, no marketing.',
    service: 'TRATAMIENTO CAPILAR - 45 MIN',
  },
  {
    text: 'Vine antes de mi boda y me asesoraron sobre el estilo más fotogénico. Las fotos hablan por sí solas.',
    service: 'RITUAL COMPLETO - 75 MIN',
  },
  {
    text: 'La sucursal del Casco Viejo es una obra de arte. El ambiente solo ya vale la pena la visita.',
    service: 'CORTE + BARBA - 45 MIN',
  },
];

const StarIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ color: 'var(--accent)' }}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

function TestimonialCard({ text, service }: { text: string; service: string }) {
  return (
    <div
      className="rounded-2xl p-6 backdrop-blur-sm flex-shrink-0"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p
        className="font-serif italic text-sm leading-relaxed mb-6"
        style={{ color: 'rgba(255,255,255,0.8)' }}
      >
        &ldquo;{text}&rdquo;
      </p>
      <span
        className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest"
        style={{
          backgroundColor: 'rgba(201,162,107,0.2)',
          border: '1px solid rgba(201,162,107,0.3)',
          color: 'var(--accent)',
        }}
      >
        {service}
      </span>
    </div>
  );
}

const col1 = [...reviews.slice(0, 3), ...reviews.slice(0, 3)];
const col2 = [...reviews.slice(3, 6), ...reviews.slice(3, 6)];
const col3 = [...reviews.slice(6, 9), ...reviews.slice(6, 9)];

export default function ClientReviews() {
  return (
    <section
      className="py-24 px-6 overflow-hidden relative"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.5, 0, 0, 1] as [number, number, number, number] }}
        >
          <p
            className="uppercase tracking-widest text-sm font-semibold mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Caballeros de la Casa
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>
      </div>

      <div className="relative h-[600px] max-w-6xl mx-auto overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--primary), transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, var(--primary), transparent)',
          }}
        />

        <div className="grid md:grid-cols-3 gap-6 h-full">
          <div className="hidden md:flex flex-col gap-6 animate-scroller-down">
            {col1.map((review, i) => (
              <TestimonialCard key={`c1-${i}`} {...review} />
            ))}
          </div>

          <div className="flex flex-col gap-6 animate-scroller-up">
            {col2.map((review, i) => (
              <TestimonialCard key={`c2-${i}`} {...review} />
            ))}
          </div>

          <div className="hidden md:flex flex-col gap-6 animate-scroller-down">
            {col3.map((review, i) => (
              <TestimonialCard key={`c3-${i}`} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
