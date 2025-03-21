'use client';

import dynamic from 'next/dynamic';

// Importar el componente de mapa con carga dinámica (sin SSR)
const NZMap = dynamic(() => import('./NZMap'), { 
  ssr: false 
});

export default function ClientNZMap() {
  return <NZMap />;
} 