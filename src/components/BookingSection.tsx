'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors,
  Sparkles,
  Droplets,
  Crown,
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CalendarCheck,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Mail,
  Clock,
  Phone,
} from 'lucide-react';

const services = [
  {
    id: 'corte-clasico',
    icon: Scissors,
    title: 'Corte Clásico',
    duration: '30 min',
    price: '$18',
    desc: 'Corte a tijera y máquina con acabados a navaja.',
  },
  {
    id: 'corte-barba',
    icon: Sparkles,
    title: 'Corte + Barba',
    duration: '45 min',
    price: '$28',
    desc: 'Corte completo más perfilado y diseño de barba.',
  },
  {
    id: 'afeitado',
    icon: Droplets,
    title: 'Afeitado Clásico',
    duration: '30 min',
    price: '$20',
    desc: 'Afeitado a navaja con toalla caliente y bálsamo.',
  },
  {
    id: 'ritual-completo',
    icon: Crown,
    title: 'Ritual Caballero',
    duration: '75 min',
    price: '$45',
    desc: 'Corte + afeitado + tratamiento + bourbon. La experiencia firma.',
  },
];

const barbers = [
  {
    id: 'cualquiera',
    name: 'Cualquier disponible',
    specialty: 'El primer slot libre',
    initial: '★',
    isAny: true,
    years: '',
  },
  {
    id: 'luis',
    name: 'Luis Domínguez',
    specialty: 'Fades & barba',
    initial: 'LD',
    isAny: false,
    years: '12 años',
  },
  {
    id: 'rafael',
    name: 'Rafael Cortés',
    specialty: 'Clásicos & navaja',
    initial: 'RC',
    isAny: false,
    years: '18 años',
  },
  {
    id: 'andres',
    name: 'Andrés Villa',
    specialty: 'Diseño moderno',
    initial: 'AV',
    isAny: false,
    years: '8 años',
  },
];

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const DAYS_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 9; h < 20; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    if (h < 19) slots.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

interface FormData {
  service: string;
  barber: string;
  date: Date | null;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const steps = ['Servicio', 'Barbero', 'Fecha & Hora', 'Tus Datos'];

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [formData, setFormData] = useState<FormData>({
    service: '',
    barber: '',
    date: null,
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const selectedService = services.find((s) => s.id === formData.service);
  const selectedBarber = barbers.find((b) => b.id === formData.barber);

  function canAdvance(): boolean {
    if (step === 1) return !!formData.service;
    if (step === 2) return !!formData.barber;
    if (step === 3) return !!(formData.date && formData.time);
    if (step === 4) return !!(formData.name && formData.phone);
    return false;
  }

  function handleNext() {
    if (!canAdvance()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  }

  function handleBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleConfirm() {
    setIsConfirmed(true);
  }

  function handleReset() {
    setIsConfirmed(false);
    setStep(1);
    setFormData({
      service: '',
      barber: '',
      date: null,
      time: '',
      name: '',
      phone: '',
      email: '',
      notes: '',
    });
  }

  function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayBtns: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function formatDateLabel(d: Date): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${days[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
  }

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 20 : -20,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -20 : 20,
    }),
  };

  return (
    <section
      id="reservar"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <span
        className="absolute -top-10 -left-10 pointer-events-none select-none z-0 leading-none tracking-tighter font-serif"
        style={{
          color: 'rgba(14,14,14,0.03)',
          fontSize: 'clamp(8rem, 20vw, 20rem)',
        }}
        aria-hidden="true"
      >
        NAVAJA
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p
            className="uppercase tracking-widest text-sm font-semibold mb-2"
            style={{ color: 'var(--accent)' }}
          >
            Reserva en 4 pasos
          </p>
          <h2
            className="text-4xl md:text-5xl font-serif mb-4"
            style={{ color: 'var(--primary)' }}
          >
            Agenda tu silla, vive el ritual
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: 'rgba(14,14,14,0.6)' }}
          >
            Elige tu servicio, tu barbero de confianza y el horario que mejor te quede.
            La confirmación llega directo a tu WhatsApp.
          </p>
        </div>

        <div
          className="bg-white rounded-[30px] md:rounded-[40px] shadow-premium overflow-hidden"
          style={{ border: '1px solid rgba(14,14,14,0.05)' }}
        >
          <div
            className="flex items-center justify-between px-8 md:px-12 py-6"
            style={{ borderBottom: '1px solid rgba(14,14,14,0.05)', backgroundColor: 'rgba(14,14,14,0.02)' }}
          >
            {steps.map((label, i) => {
              const num = i + 1;
              const isActive = num === step;
              const isCompleted = num < step;
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                      style={{
                        backgroundColor: isCompleted
                          ? 'var(--accent)'
                          : isActive
                          ? 'var(--primary)'
                          : 'rgba(14,14,14,0.05)',
                        color: isCompleted
                          ? 'var(--primary)'
                          : isActive
                          ? 'var(--accent)'
                          : 'rgba(14,14,14,0.3)',
                      }}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : num}
                    </div>
                    <span
                      className={`uppercase tracking-widest text-xs font-bold hidden md:block ${
                        isActive ? '' : 'opacity-40'
                      }`}
                      style={{ color: 'var(--primary)' }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 h-px mx-4 transition-all duration-500"
                      style={{
                        backgroundColor:
                          isCompleted ? 'var(--accent)' : 'rgba(14,14,14,0.1)',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-8 md:p-12 min-h-[500px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {step === 1 && (
                  <div>
                    <h3
                      className="text-2xl font-serif mb-2"
                      style={{ color: 'var(--primary)' }}
                    >
                      ¿Qué ritual te traemos hoy?
                    </h3>
                    <p
                      className="text-sm mb-8"
                      style={{ color: 'rgba(14,14,14,0.5)' }}
                    >
                      Selecciona el servicio. Podrás añadir extras al confirmar.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map((svc) => {
                        const Icon = svc.icon;
                        const selected = formData.service === svc.id;
                        return (
                          <button
                            key={svc.id}
                            onClick={() =>
                              setFormData((f) => ({ ...f, service: svc.id }))
                            }
                            className="group relative p-6 rounded-2xl text-left cursor-pointer transition-all duration-300"
                            style={{
                              border: selected
                                ? '2px solid var(--accent)'
                                : '2px solid rgba(14,14,14,0.1)',
                              backgroundColor: selected
                                ? 'rgba(201,162,107,0.1)'
                                : 'white',
                              boxShadow: selected
                                ? '0 4px 20px rgba(201,162,107,0.15)'
                                : 'none',
                            }}
                          >
                            {selected && (
                              <div
                                className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)' }}
                              >
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'rgba(201,162,107,0.15)' }}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color: 'var(--accent)' }}
                                />
                              </div>
                              <span
                                className="text-2xl font-serif"
                                style={{ color: 'var(--primary)' }}
                              >
                                {svc.price}
                              </span>
                            </div>
                            <h4
                              className="text-xl font-serif mb-1"
                              style={{ color: 'var(--primary)' }}
                            >
                              {svc.title}
                            </h4>
                            <p
                              className="uppercase tracking-widest text-[10px] font-bold mb-3"
                              style={{ color: 'var(--accent)' }}
                            >
                              {svc.duration}
                            </p>
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: 'rgba(14,14,14,0.6)' }}
                            >
                              {svc.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3
                      className="text-2xl font-serif mb-2"
                      style={{ color: 'var(--primary)' }}
                    >
                      ¿Con quién quieres sentarte?
                    </h3>
                    <p
                      className="text-sm mb-8"
                      style={{ color: 'rgba(14,14,14,0.5)' }}
                    >
                      Todos nuestros maestros dominan los servicios. Elige tu favorito o
                      cualquiera disponible.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {barbers.map((barber) => {
                        const selected = formData.barber === barber.id;
                        return (
                          <button
                            key={barber.id}
                            onClick={() =>
                              setFormData((f) => ({ ...f, barber: barber.id }))
                            }
                            className="p-6 rounded-2xl text-center cursor-pointer transition-all duration-300"
                            style={{
                              border: selected
                                ? '2px solid var(--accent)'
                                : '2px solid rgba(14,14,14,0.1)',
                              backgroundColor: selected
                                ? 'var(--primary)'
                                : 'white',
                              boxShadow: selected
                                ? '0 4px 20px rgba(14,14,14,0.2)'
                                : 'none',
                            }}
                          >
                            <div
                              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                              style={{
                                background: barber.isAny
                                  ? 'rgba(14,14,14,0.1)'
                                  : 'linear-gradient(135deg, var(--accent), rgba(201,162,107,0.6))',
                              }}
                            >
                              {barber.isAny ? (
                                <Sparkles
                                  className="w-8 h-8"
                                  style={{ color: 'var(--accent)' }}
                                />
                              ) : (
                                <span
                                  className="font-serif text-xl"
                                  style={{
                                    color: selected ? 'var(--primary)' : 'var(--primary)',
                                  }}
                                >
                                  {barber.initial}
                                </span>
                              )}
                            </div>
                            <p
                              className="font-serif text-lg mb-1"
                              style={{ color: selected ? 'white' : 'var(--primary)' }}
                            >
                              {barber.name}
                            </p>
                            <p
                              className="uppercase tracking-widest text-xs mb-2"
                              style={{ color: 'var(--accent)' }}
                            >
                              {barber.specialty}
                            </p>
                            {barber.years && (
                              <p
                                className="text-[10px]"
                                style={{
                                  color: selected
                                    ? 'rgba(255,255,255,0.5)'
                                    : 'rgba(14,14,14,0.4)',
                                }}
                              >
                                {barber.years} en la silla
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3
                      className="text-2xl font-serif mb-2"
                      style={{ color: 'var(--primary)' }}
                    >
                      ¿Cuándo te esperamos?
                    </h3>
                    <p
                      className="text-sm mb-8"
                      style={{ color: 'rgba(14,14,14,0.5)' }}
                    >
                      Domingos solo bajo reserva privada. Horario regular: Lun-Vie 9 AM –
                      8 PM, Sáb 8 AM – 7 PM.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div
                        className="rounded-2xl p-6"
                        style={{ backgroundColor: 'rgba(14,14,14,0.02)' }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <span
                            className="font-serif text-xl"
                            style={{ color: 'var(--primary)' }}
                          >
                            {MONTHS[month]} {year}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setCalendarMonth(
                                  new Date(year, month - 1, 1)
                                )
                              }
                              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:bg-[var(--accent)] hover:text-[var(--primary)] hover:border-[var(--accent)]"
                              style={{
                                backgroundColor: 'white',
                                borderColor: 'rgba(14,14,14,0.1)',
                                color: 'var(--primary)',
                              }}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setCalendarMonth(
                                  new Date(year, month + 1, 1)
                                )
                              }
                              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:bg-[var(--accent)] hover:text-[var(--primary)] hover:border-[var(--accent)]"
                              style={{
                                backgroundColor: 'white',
                                borderColor: 'rgba(14,14,14,0.1)',
                                color: 'var(--primary)',
                              }}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 mb-2">
                          {DAYS_LABELS.map((d, i) => (
                            <div
                              key={i}
                              className="text-center uppercase tracking-widest text-[10px] pb-2"
                              style={{ color: 'rgba(14,14,14,0.4)' }}
                            >
                              {d}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {dayBtns.map((day, i) => {
                            if (!day) return <div key={`empty-${i}`} />;
                            const date = new Date(year, month, day);
                            date.setHours(0, 0, 0, 0);
                            const isPast = date < today;
                            const isSunday = date.getDay() === 0;
                            const isDisabled = isPast || isSunday;
                            const isSelected =
                              formData.date?.toDateString() ===
                              date.toDateString();
                            const isToday =
                              date.toDateString() === today.toDateString();

                            return (
                              <button
                                key={day}
                                disabled={isDisabled}
                                onClick={() => {
                                  setFormData((f) => ({
                                    ...f,
                                    date,
                                    time: '',
                                  }));
                                }}
                                className="aspect-square rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center"
                                style={{
                                  backgroundColor: isSelected
                                    ? 'var(--primary)'
                                    : isToday && !isSelected
                                    ? 'transparent'
                                    : 'transparent',
                                  color: isDisabled
                                    ? 'rgba(14,14,14,0.2)'
                                    : isSelected
                                    ? 'var(--accent)'
                                    : isToday
                                    ? 'var(--accent)'
                                    : 'var(--primary)',
                                  border: isToday && !isSelected
                                    ? '1px solid var(--accent)'
                                    : 'none',
                                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                                  boxShadow: isSelected
                                    ? '0 2px 8px rgba(14,14,14,0.2)'
                                    : 'none',
                                }}
                                onMouseOver={(e) => {
                                  if (!isDisabled && !isSelected) {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                      'rgba(201,162,107,0.15)';
                                  }
                                }}
                                onMouseOut={(e) => {
                                  if (!isDisabled && !isSelected) {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                      'transparent';
                                  }
                                }}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>

                        <p
                          className="text-xs mt-4"
                          style={{ color: 'rgba(14,14,14,0.4)' }}
                        >
                          Los domingos están reservados para citas privadas. Contáctanos
                          por WhatsApp.
                        </p>
                      </div>

                      <div className="flex flex-col">
                        <p
                          className="uppercase tracking-widest text-xs font-bold mb-4"
                          style={{ color: 'rgba(14,14,14,0.5)' }}
                        >
                          Horarios disponibles
                        </p>
                        {!formData.date ? (
                          <div
                            className="flex-1 flex flex-col items-center justify-center text-center"
                            style={{ color: 'rgba(14,14,14,0.4)' }}
                          >
                            <CalendarDays className="w-12 h-12 mb-4 opacity-40" />
                            <p className="text-sm">
                              Selecciona una fecha para ver los horarios
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="grid grid-cols-3 gap-2">
                              {TIME_SLOTS.map((slot, idx) => {
                                const isOccupied = idx % 4 === 0;
                                const isSelected = formData.time === slot;
                                return (
                                  <button
                                    key={slot}
                                    disabled={isOccupied}
                                    onClick={() =>
                                      setFormData((f) => ({ ...f, time: slot }))
                                    }
                                    className="py-3 px-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                      border: isOccupied
                                        ? '1px solid rgba(14,14,14,0.05)'
                                        : isSelected
                                        ? '1px solid var(--accent)'
                                        : '1px solid rgba(14,14,14,0.1)',
                                      backgroundColor: isOccupied
                                        ? 'rgba(14,14,14,0.03)'
                                        : isSelected
                                        ? 'var(--accent)'
                                        : 'white',
                                      color: isOccupied
                                        ? 'rgba(14,14,14,0.25)'
                                        : isSelected
                                        ? 'var(--primary)'
                                        : 'var(--primary)',
                                      textDecoration: isOccupied
                                        ? 'line-through'
                                        : 'none',
                                      cursor: isOccupied ? 'not-allowed' : 'pointer',
                                      fontWeight: isSelected ? '700' : '500',
                                    }}
                                  >
                                    {slot}
                                  </button>
                                );
                              })}
                            </div>

                            {formData.date && formData.time && (
                              <div
                                className="mt-6 p-4 rounded-xl flex items-center gap-3"
                                style={{
                                  backgroundColor: 'rgba(201,162,107,0.1)',
                                  border: '1px solid rgba(201,162,107,0.3)',
                                }}
                              >
                                <CalendarCheck
                                  className="w-5 h-5 flex-shrink-0"
                                  style={{ color: 'var(--accent)' }}
                                />
                                <p
                                  className="font-serif text-base"
                                  style={{ color: 'var(--primary)' }}
                                >
                                  Confirmado para {formatDateLabel(formData.date)} a las{' '}
                                  {formData.time}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3
                      className="text-2xl font-serif mb-2"
                      style={{ color: 'var(--primary)' }}
                    >
                      Último paso, caballero
                    </h3>
                    <p
                      className="text-sm mb-8"
                      style={{ color: 'rgba(14,14,14,0.5)' }}
                    >
                      Necesitamos cómo contactarte para confirmar tu reserva.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label
                          className="uppercase tracking-widest text-[10px] font-bold"
                          style={{ color: 'rgba(14,14,14,0.6)' }}
                        >
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          placeholder="Tu nombre y apellido"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((f) => ({ ...f, name: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                          style={{
                            backgroundColor: 'rgba(14,14,14,0.02)',
                            border: '1px solid rgba(14,14,14,0.1)',
                            color: 'var(--primary)',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--accent)';
                            e.target.style.backgroundColor = 'white';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(14,14,14,0.1)';
                            e.target.style.backgroundColor = 'rgba(14,14,14,0.02)';
                          }}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          className="uppercase tracking-widest text-[10px] font-bold"
                          style={{ color: 'rgba(14,14,14,0.6)' }}
                        >
                          WhatsApp *
                        </label>
                        <div className="relative">
                          <MessageCircle
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: 'var(--accent)' }}
                          />
                          <input
                            type="tel"
                            placeholder="+507 0000-0000"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((f) => ({ ...f, phone: e.target.value }))
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                            style={{
                              backgroundColor: 'rgba(14,14,14,0.02)',
                              border: '1px solid rgba(14,14,14,0.1)',
                              color: 'var(--primary)',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--accent)';
                              e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(14,14,14,0.1)';
                              e.target.style.backgroundColor = 'rgba(14,14,14,0.02)';
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          className="uppercase tracking-widest text-[10px] font-bold"
                          style={{ color: 'rgba(14,14,14,0.6)' }}
                        >
                          Correo electrónico (opcional)
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: 'var(--accent)' }}
                          />
                          <input
                            type="email"
                            placeholder="caballero@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((f) => ({ ...f, email: e.target.value }))
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                            style={{
                              backgroundColor: 'rgba(14,14,14,0.02)',
                              border: '1px solid rgba(14,14,14,0.1)',
                              color: 'var(--primary)',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--accent)';
                              e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(14,14,14,0.1)';
                              e.target.style.backgroundColor = 'rgba(14,14,14,0.02)';
                            }}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label
                          className="uppercase tracking-widest text-[10px] font-bold"
                          style={{ color: 'rgba(14,14,14,0.6)' }}
                        >
                          Notas para el barbero (opcional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="¿Alguna referencia, alergia o preferencia que debamos saber?"
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData((f) => ({ ...f, notes: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none resize-none"
                          style={{
                            backgroundColor: 'rgba(14,14,14,0.02)',
                            border: '1px solid rgba(14,14,14,0.1)',
                            color: 'var(--primary)',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--accent)';
                            e.target.style.backgroundColor = 'white';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(14,14,14,0.1)';
                            e.target.style.backgroundColor = 'rgba(14,14,14,0.02)';
                          }}
                        />
                      </div>

                      <div
                        className="md:col-span-2 mt-4 p-6 rounded-2xl"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        <p
                          className="uppercase tracking-widest text-[10px] font-bold mb-3"
                          style={{ color: 'var(--accent)' }}
                        >
                          Resumen de tu cita
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {[
                            {
                              label: 'Servicio',
                              value: selectedService?.title || '—',
                            },
                            {
                              label: 'Barbero',
                              value: selectedBarber?.name || '—',
                            },
                            {
                              label: 'Fecha',
                              value: formData.date
                                ? `${formData.date.getDate()} ${MONTHS[formData.date.getMonth()]}`
                                : '—',
                            },
                            { label: 'Hora', value: formData.time || '—' },
                          ].map((item) => (
                            <div key={item.label}>
                              <p
                                className="uppercase tracking-widest text-[10px] mb-1"
                                style={{ color: 'rgba(255,255,255,0.4)' }}
                              >
                                {item.label}
                              </p>
                              <p
                                className="font-serif text-lg text-white truncate"
                              >
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                        {selectedService && (
                          <p
                            className="font-serif text-3xl"
                            style={{ color: 'var(--accent)' }}
                          >
                            {selectedService.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="px-8 md:px-12 py-6 flex items-center justify-between gap-4"
            style={{
              borderTop: '1px solid rgba(14,14,14,0.05)',
              backgroundColor: 'rgba(14,14,14,0.02)',
            }}
          >
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors duration-200 ${
                step === 1 ? 'invisible' : ''
              }`}
              style={{ color: 'rgba(14,14,14,0.6)' }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(14,14,14,0.6)';
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canAdvance()}
                className="flex items-center gap-2 px-8 py-3 uppercase tracking-widest text-xs font-bold rounded-full shadow-premium transition-colors duration-200"
                style={{
                  backgroundColor: canAdvance()
                    ? 'var(--primary)'
                    : 'rgba(14,14,14,0.3)',
                  color: 'var(--accent)',
                  cursor: canAdvance() ? 'pointer' : 'not-allowed',
                }}
                onMouseOver={(e) => {
                  if (canAdvance()) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      'var(--accent)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
                  }
                }}
                onMouseOut={(e) => {
                  if (canAdvance()) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      'var(--primary)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
                  }
                }}
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                className="flex items-center gap-2 px-8 py-3 uppercase tracking-widest text-xs font-bold rounded-full shadow-premium transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--primary)',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--primary)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--accent)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
                }}
              >
                <Check className="w-4 h-4" />
                Confirmar Reserva
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(14,14,14,0.9)', backdropFilter: 'blur(12px' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glassmorphism-dark p-12 rounded-3xl max-w-md w-full text-center"
              style={{ border: '1px solid rgba(201,162,107,0.3)' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,162,107,0.2)' }}
              >
                <Check className="w-10 h-10" style={{ color: 'var(--accent)' }} />
              </motion.div>
              <h3
                className="text-3xl font-serif mb-4"
                style={{ color: 'var(--accent)' }}
              >
                Reserva enviada
              </h3>
              <p
                className="mb-8 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Recibirás tu confirmación por WhatsApp en los próximos minutos. Te
                esperamos en la silla, caballero.
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold transition-colors duration-200"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)' }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'white';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--accent)';
                }}
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
