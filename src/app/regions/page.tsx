'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NZMap from '@/components/map/NZMap';

interface RegionItem {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
}

// Datos de muestra para las regiones
const regionsData: RegionItem[] = [
  {
    name: 'Northland',
    id: 'NZNTL',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/northland.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Auckland',
    id: 'NZAUK',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/auckland.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Waikato',
    id: 'NZWKO',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/waikato.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Bay of Plenty',
    id: 'NZBOP',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/bay-of-plenty.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Tasman District',
    id: 'NZTAS',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/tasman.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Marlborough District',
    id: 'NZMBH',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/marlborough.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Otago',
    id: 'NZOTA',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/otago.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Canterbury',
    id: 'NZCAN',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/canterbury.jpg',
    location: 'Manawatū-Whanganui',
  },
  {
    name: 'Southland',
    id: 'NZSTH',
    description: 'Lorem ipsum dole role sufe sier vanu',
    image: '/img/regions/southland.jpg',
    location: 'Manawatū-Whanganui',
  },
];

export default function RegionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRegions, setFilteredRegions] =
    useState<RegionItem[]>(regionsData);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (searchTerm) {
      const filtered = regionsData.filter(
        region =>
          region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          region.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRegions(filtered);
    } else {
      setFilteredRegions(regionsData);
    }
  }, [searchTerm]);

  const filterTags = [
    { id: 'lorem', name: 'Lorem' },
    { id: 'ipsum', name: 'Ipsum' },
    { id: '10k', name: '10k' },
  ];

  const titles = ['Title', 'Title', 'Title', 'Title', 'Title', 'Title'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner con Auckland */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/img/regions/auckland.jpg"
          alt="Auckland"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75"
        />
        <div className="absolute bottom-0 left-0 p-10">
          <h1 className="text-6xl font-bold text-white font-raleway">
            Auckland
          </h1>
        </div>
      </div>

      <div className="flex flex-1 px-8 pt-8">
        {/* Sidebar */}
        <div className="hidden md:block w-60 mr-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Title</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <p className="text-gray-500 mt-2">Lorem Ipsum</p>
            </div>

            {titles.map((title, index) => (
              <div key={index} className="border-b py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">{title}</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Barra de búsqueda */}
          <div className="mb-8">
            <div className="bg-[#F6F6F6] rounded-[40px] flex items-center justify-between px-5 py-4">
              <input
                type="text"
                placeholder="SEARCH"
                className="bg-transparent outline-none text-gray-500 w-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <div className="flex items-center">
                <div className="w-6 h-6 relative">
                  <div className="rounded-full w-4 h-4 border-2 border-gray-500"></div>
                  <div className="w-2 h-0.5 bg-gray-500 absolute -bottom-1 -right-1 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filterTags.map(tag => (
              <button
                key={tag.id}
                onClick={() => setActiveFilter(tag.id)}
                className={`${
                  activeFilter === tag.id
                    ? 'bg-gradient-to-r from-[#FF9B05] to-[#FF5005] text-white'
                    : 'bg-[#F6F6F6] text-gray-500'
                } py-2 px-4 rounded-full text-sm transition-colors duration-200`}
              >
                {tag.name}
              </button>
            ))}
          </div>

          {/* Tarjetas de regiones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredRegions.length > 0 ? (
              filteredRegions.map(region => (
                <Link
                  href={`/regions/${region.name}`}
                  key={region.id}
                  className="bg-white rounded-[15px] shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-white"
                >
                  {/* Imagen de la región */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={region.image}
                      alt={region.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/img/placeholder-region.jpg';
                      }}
                      className="rounded-t-[15px]"
                    />
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-4 bg-[#F6F6F6] rounded-b-[15px]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-medium line-clamp-2">
                          {region.description}
                        </h3>
                      </div>

                      {/* Fecha del evento */}
                      <div className="bg-gradient-to-b from-[#FF9B05] to-[#FF5005] text-white text-center px-3 py-2 rounded-lg">
                        <div className="font-bold text-xs">26</div>
                        <div className="text-xs">MAY</div>
                      </div>
                    </div>

                    {/* Footer de la tarjeta */}
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-500 text-xs">
                        {region.location}
                      </span>
                      <span className="text-gray-500 text-xs">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 mb-2">
                  No se encontraron regiones que coincidan con tu búsqueda.
                </p>
                <button
                  className="text-primary hover:underline"
                  onClick={() => setSearchTerm('')}
                >
                  Mostrar todas las regiones
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
