import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Peter Barber — Barbería Premium en Panamá',
  description:
    'El ritual clásico del caballero panameño. Cortes de precisión, afeitado a navaja con toalla caliente y la elegancia de la vieja escuela en Panamá desde 1997.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        {children}
      </body>
    </html>
  );
}
