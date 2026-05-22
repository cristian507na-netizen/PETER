'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  MessageCircle,
  Calendar,
  Clock,
  CalendarDays,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

function scrollToBooking() {
  document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' });
}

const InstagramIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const SocialBtn = ({ children }: { children: React.ReactNode }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
    style={{
      backgroundColor: 'rgba(14,14,14,0.06)',
      color: 'var(--primary)',
    }}
    onMouseOver={(e) => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent)';
      (e.currentTarget as HTMLButtonElement).style.color = 'white';
    }}
    onMouseOut={(e) => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(14,14,14,0.06)';
      (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
    }}
  >
    {children}
  </motion.button>
);

export default function BookingFooter() {
  return (
    <footer
      className="pt-24 pb-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.5, 0, 0, 1] as [number, number, number, number] }}
          className="mb-24 rounded-[30px] md:rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-premium relative overflow-hidden"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(135deg, rgba(14,14,14,1) 0%, rgba(30,20,10,1) 100%)',
            }}
          />

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              ¿Listo para tu próximo ritual?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => window.open('https://wa.me/50760000000', '_blank')}
                className="btn-gold flex items-center justify-center gap-2 px-8 py-4 rounded-full uppercase tracking-widest text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Reservar por WhatsApp
              </button>
              <button
                onClick={scrollToBooking}
                className="flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase tracking-widest text-sm rounded-full border transition-all duration-300 hover:bg-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}
              >
                <Calendar className="w-4 h-4" />
                Agendar Online
              </button>
            </div>
          </div>

          <div
            className="relative z-10 glassmorphism-dark p-8 rounded-3xl w-full max-w-sm shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h4
              className="font-serif text-xl pb-4 mb-6"
              style={{
                color: 'var(--accent)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Horarios de Atención
            </h4>
            <ul className="space-y-4 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                <div>
                  <strong className="block text-white">Lunes a Viernes</strong>
                  9:00 AM – 8:00 PM con cita o walk-in.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CalendarDays className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                <div>
                  <strong className="block text-white">Sábados</strong>
                  8:00 AM – 7:00 PM. Día de mayor demanda, reserva con anticipación.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                <div>
                  <strong className="block text-white">Domingos &amp; Citas Premium</strong>
                  Sólo bajo reserva privada vía WhatsApp.
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-16"
          style={{
            borderTop: '1px solid rgba(14,14,14,0.1)',
            color: 'rgba(14,14,14,0.65)',
          }}
        >
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-premium">
                <Image
                  src="/images/logo.jpg"
                  alt="Peter Barber"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl" style={{ color: 'var(--primary)' }}>
                Peter Barber
              </h3>
            </div>
            <p className="text-sm mb-6 max-w-xs leading-relaxed">
              El club del caballero panameño. Tres sucursales, una sola obsesión: que
              salgas de la silla mejor de lo que entraste.
            </p>
            <div className="flex gap-3">
              <SocialBtn><InstagramIcon /></SocialBtn>
              <SocialBtn><TikTokIcon /></SocialBtn>
            </div>
          </div>

          <div>
            <h4
              className="font-bold uppercase tracking-widest text-xs mb-6"
              style={{ color: 'var(--primary)' }}
            >
              Servicios
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                'Cortes Caballero',
                'Afeitado Clásico',
                'Diseño de Barba',
                'Tratamientos Capilares',
                'Ritual Completo',
              ].map((item) => (
                <li key={item}>
                  <button
                    className="transition-colors duration-200 text-left"
                    style={{ color: 'rgba(14,14,14,0.65)' }}
                    onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)')}
                    onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(14,14,14,0.65)')}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-bold uppercase tracking-widest text-xs mb-6"
              style={{ color: 'var(--primary)' }}
            >
              La Casa
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                'Sucursales',
                'Nuestros Barberos',
                'Reservas Privadas',
                'Eventos & Bodas',
                'Tarjeta de Regalo',
              ].map((item) => (
                <li key={item}>
                  <button
                    className="transition-colors duration-200 text-left"
                    style={{ color: 'rgba(14,14,14,0.65)' }}
                    onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)')}
                    onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(14,14,14,0.65)')}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-bold uppercase tracking-widest text-xs mb-6"
              style={{ color: 'var(--primary)' }}
            >
              Contacto
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                <span>+507 6000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                <span>reservas@peterbarber.pa</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                <span>Costa del Este · Obarrio · Casco Viejo</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{
            borderTop: '1px solid rgba(14,14,14,0.1)',
            color: 'rgba(14,14,14,0.45)',
          }}
        >
          <p>
            © {new Date().getFullYear()} Peter Barber Panamá. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {['Términos & Condiciones', 'Privacidad'].map((label) => (
              <button
                key={label}
                className="transition-colors duration-200"
                style={{ color: 'rgba(14,14,14,0.45)' }}
                onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)')}
                onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(14,14,14,0.45)')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
