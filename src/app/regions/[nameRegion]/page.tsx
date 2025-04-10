'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AppButton from '@/components/AppButton';
import AppContainer from '@/components/AppContainer';

interface RegionData {
  name: string;
  id: string;
  description: string;
  image: string;
  facts: { title: string; content: string }[];
  events: {
    date: { day: string; month: string };
    title: string;
    location: string;
  }[];
}

// Datos de muestra para las regiones
const regionsData: Record<string, RegionData> = {
  Northland: {
    name: 'Northland',
    id: 'NZNTL',
    description:
      'Northland es la región más septentrional de Nueva Zelanda, conocida por sus hermosas playas, bosques de kauri y rica historia maorí. El clima subtropical de la región la convierte en un destino turístico popular. Aquí podrás disfrutar de actividades como el surf, la pesca y paseos por la naturaleza. Las bahías de las islas ofrecen paisajes impresionantes y actividades náuticas.',
    image: '/img/regions/northland.jpg',
    facts: [
      { title: 'Población', content: '194,600 habitantes' },
      { title: 'Área', content: '13,789 km²' },
      { title: 'Ciudad principal', content: 'Whangarei' },
      { title: 'Clima', content: 'Subtropical' },
    ],
    events: [
      {
        date: { day: '26', month: 'MAY' },
        title: 'Marathon Bay of Islands',
        location: 'Paihia',
      },
      {
        date: { day: '15', month: '  JUN' },
        title: 'Festival Cultural Maorí',
        location: 'Waitangi',
      },
      {
        date: { day: '02', month: 'JUL' },
        title: 'Regata Russell-Paihia',
        location: 'Bay of Islands',
      },
    ],
  },
  Auckland: {
    name: 'Auckland',
    id: 'NZAUK',
    description:
      'Auckland es la ciudad más grande de Nueva Zelanda y un importante centro económico. Situada entre dos puertos, ofrece una mezcla de vida urbana, naturaleza y actividades acuáticas. Conocida como la "Ciudad de las Velas", Auckland tiene más barcos per cápita que cualquier otra ciudad del mundo. Disfruta de su torre Sky, volcanes, playas y vibrante vida cultural.',
    image: '/img/regions/auckland.jpg',
    facts: [
      { title: 'Población', content: '1,7 millones de habitantes' },
      { title: 'Área', content: '1,086 km²' },
      { title: 'Clima', content: 'Templado oceánico' },
      { title: 'Fundación', content: '1840' },
    ],
    events: [
      {
        date: { day: '26', month: 'MAY' },
        title: 'Auckland Marathon',
        location: 'Auckland CBD',
      },
      {
        date: { day: '15', month: 'JUN' },
        title: 'Festival de Invierno',
        location: 'Aotea Square',
      },
      {
        date: { day: '02', month: 'JUL' },
        title: 'Competencia de Triatlón',
        location: 'Mission Bay',
      },
    ],
  },
  Waikato: {
    name: 'Waikato',
    id: 'NZWKO',
    description:
      'Waikato es conocida por sus exuberantes paisajes verdes, el poderoso río Waikato y la ciudad de Hamilton. La región es importante para la agricultura y la industria láctea de Nueva Zelanda. Las cuevas de Waitomo con sus gusanos luminosos son una de las principales atracciones turísticas, junto con Hobbiton, el set de filmación de El Señor de los Anillos.',
    image: '/img/regions/waikato.jpg',
    facts: [
      { title: 'Población', content: '496,700 habitantes' },
      { title: 'Área', content: '25,000 km²' },
      { title: 'Ciudad principal', content: 'Hamilton' },
      { title: 'Río', content: '425 km de longitud' },
    ],
    events: [
      {
        date: { day: '26', month: 'MAY' },
        title: 'Carrera del Río Waikato',
        location: 'Hamilton',
      },
      {
        date: { day: '15', month: 'JUN' },
        title: 'Festival Agropecuario',
        location: 'Cambridge',
      },
      {
        date: { day: '02', month: 'JUL' },
        title: 'Tour de Hobbiton',
        location: 'Matamata',
      },
    ],
  },
  'Bay of Plenty': {
    name: 'Bay of Plenty',
    id: 'NZBOP',
    description:
      'Bay of Plenty es una región costera conocida por sus hermosas playas, horticultura y actividad geotérmica. Tauranga es su ciudad principal y un importante puerto. La región ofrece numerosas actividades al aire libre, incluyendo surf, pesca y senderismo. Las islas cercanas como White Island (un volcán activo) atraen a turistas de todo el mundo.',
    image: '/img/regions/bay-of-plenty.jpg',
    facts: [
      { title: 'Población', content: '340,000 habitantes' },
      { title: 'Área', content: '12,230 km²' },
      { title: 'Ciudad principal', content: 'Tauranga' },
      { title: 'Clima', content: 'Templado y soleado' },
    ],
    events: [
      {
        date: { day: '26', month: 'MAY' },
        title: 'Mount Maunganui Beach Run',
        location: 'Tauranga',
      },
      {
        date: { day: '15', month: 'JUN' },
        title: 'Festival de Kiwi',
        location: 'Te Puke',
      },
      {
        date: { day: '02', month: 'JUL' },
        title: 'Tour al volcán White Island',
        location: 'Whakatane',
      },
    ],
  },
  'Tasman District': {
    name: 'Tasman District',
    id: 'NZTAS',
    description:
      'La región de Tasman ofrece impresionantes paisajes naturales, incluyendo el Parque Nacional Abel Tasman con sus playas de arena dorada y aguas cristalinas, perfecto para kayak y senderismo. Esta región tiene algunos de los paisajes más diversos de Nueva Zelanda, desde montañas hasta playas vírgenes y bosques nativos.',
    image: '/img/regions/tasman.jpg',
    facts: [
      { title: 'Población', content: '56,400 habitantes' },
      { title: 'Área', content: '9,786 km²' },
      { title: 'Ciudad principal', content: 'Richmond' },
      { title: 'Clima', content: 'Mediterráneo' },
    ],
    events: [
      {
        date: { day: '26', month: 'MAY' },
        title: 'Abel Tasman Coastal Run',
        location: 'Abel Tasman',
      },
      {
        date: { day: '15', month: 'JUN' },
        title: 'Festival de Vino',
        location: 'Richmond',
      },
      {
        date: { day: '02', month: 'JUL' },
        title: 'Kayak Tour',
        location: 'Golden Bay',
      },
    ],
  },
  'Marlborough District': {
    name: 'Marlborough District',
    id: 'NZMBH',
    description:
      'Marlborough es famosa por sus viñedos y producción de vino, especialmente el Sauvignon Blanc. La región también cuenta con los pintorescos Marlborough Sounds. Los amantes del vino pueden disfrutar de numerosas bodegas y catas, mientras que los entusiastas de las actividades al aire libre apreciarán los senderos costeros y las oportunidades para la observación de vida silvestre.',
    image: '/img/regions/marlborough.jpg',
    facts: [
      { title: 'Población', content: '51,200 habitantes' },
      { title: 'Área', content: '10,458 km²' },
      { title: 'Ciudad principal', content: 'Blenheim' },
      { title: 'Viñedos', content: 'Más de 150 bodegas' },
    ],
    events: [
      {
        date: { day: '26', month: 'MAY' },
        title: 'Marlborough Wine Run',
        location: 'Blenheim',
      },
      {
        date: { day: '15', month: 'JUN' },
        title: 'Festival de Vino y Gastronomía',
        location: 'Renwick',
      },
      {
        date: { day: '02', month: 'JUL' },
        title: 'Sounds Winter Festival',
        location: 'Picton',
      },
    ],
  },
  Otago: {
    name: 'Otago',
    id: 'NZOTA',
    description:
      'Otago es una región diversa con paisajes alpinos, lagos y la histórica ciudad de Dunedin. Es un destino popular para actividades al aire libre y deportes de invierno. Queenstown, la "capital mundial de la aventura", se encuentra en esta región y ofrece bungee jumping, esquí, y otras actividades de adrenalina. Los fiordos de Milford Sound también son una atracción imprescindible.',
    image: '/img/regions/otago.jpg',
    facts: [
      { title: 'Población', content: '245,300 habitantes' },
      { title: 'Área', content: '31,186 km²' },
      { title: 'Ciudad principal', content: 'Dunedin' },
      { title: 'Punto más alto', content: 'Monte Aspiring (3,033 m)' },
    ],
    events: [
      {
        date: { day: '26', month: 'MAY' },
        title: 'Queenstown Marathon',
        location: 'Queenstown',
      },
      {
        date: { day: '15', month: 'JUN' },
        title: 'Dunedin Mid-Winter Festival',
        location: 'Dunedin',
      },
      {
        date: { day: '02', month: 'JUL' },
        title: 'Winter Games NZ',
        location: 'Wanaka',
      },
    ],
  },
};

export default function RegionPage() {
  const params = useParams();
  const [regionData, setRegionData] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    // Obtener el nombre de la región desde los parámetros de la URL
    const regionName = params.nameRegion as string;

    // Simular una carga de datos
    setLoading(true);

    // Esperar un poco para simular la carga desde un backend
    setTimeout(() => {
      if (regionName && regionsData[regionName]) {
        setRegionData(regionsData[regionName]);
        setError('');
      } else {
        setError('Región no encontrada');
        setRegionData(null);
      }
      setLoading(false);
    }, 500);
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg">Cargando información de la región...</p>
        </div>
      </div>
    );
  }

  if (error || !regionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-lg">
            {error || 'Ocurrió un error al cargar la información de la región'}
          </p>
          <Link href="/regions">
            <AppButton variant="solid" color="primary" className="mt-6">
              Volver a regiones
            </AppButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" -mx-8">
        {/* Banner de la región con efecto de blur */}
        <div className="relative h-[600px] w-full">
          <Image
            src="/img/regions/region-placeholder.jpg"
            alt={regionData.name}
            fill
            className="w-full h-full object-cover "
          />
          <div className="absolute bottom-10  left-10  lg:left-20 flex items-center justify-center ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6  bg-gray-100/2 px-4 py-4 backdrop-blur-sm rounded-2xl">
              {regionData.name}
            </h1>
          </div>
        </div>
        {/* Contenido superpuesto */}
      </div>
    </>
  );
}
