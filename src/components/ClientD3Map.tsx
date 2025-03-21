'use client';

import dynamic from 'next/dynamic';

// Importar el componente de mapa con carga dinámica (sin SSR)
const D3Map = dynamic(() => import('./D3Map'), { 
  ssr: false 
});

export default function ClientD3Map() {
  return <D3Map />;
} 