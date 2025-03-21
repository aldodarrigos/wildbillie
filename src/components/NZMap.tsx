'use client';

import { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useInView } from 'react-intersection-observer';

// Ruta al archivo GeoJSON de Nueva Zelanda
const NZ_GEO_JSON = '/data/nz_regions.geojson';

// Colores para las regiones
const defaultColor = "#D6D6DA";
const highlightColor = "#F53";
const activeRegionColor = "#f5a742"; // Color naranja para la región activa (como Tasman en la imagen)

const NZMap = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Configuración para detectar cuando el mapa está en el viewport
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Combinar refs
  const setRefs = (node: HTMLDivElement) => {
    // Asignar el ref al elemento
    mapRef.current = node;
    // Asignar el ref para InView
    inViewRef(node);
  };

  // Cargar datos GeoJSON
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(NZ_GEO_JSON);
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo GeoJSON: ${response.status}`);
        }
        const data = await response.json();
        console.log("GeoJSON cargado:", data);
        setGeoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading GeoJSON data:", error);
        setError(`Error al cargar los datos: ${error instanceof Error ? error.message : String(error)}`);
        setLoading(false);
      }
    };

    fetchGeoData();
  }, []);

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!mapRef.current || !inView) return;
      
      const mapRect = mapRef.current.getBoundingClientRect();
      const mapHeight = mapRect.height;
      const mapTop = mapRect.top;
      const viewportHeight = window.innerHeight;
      
      // Calcular la posición relativa del scroll dentro del mapa
      const relativePosition = (viewportHeight / 2 - mapTop) / mapHeight;
      setScrollPosition(relativePosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView]);

  // Efecto para cambiar la región activa basada en la posición del scroll
  useEffect(() => {
    if (!inView) return;
    
    // Definir las regiones de Nueva Zelanda en orden de norte a sur
    // Esto es un ejemplo, deberías ajustarlo según las regiones reales en tu GeoJSON
    const regions = [
      "Northland", 
      "Auckland", 
      "Waikato", 
      "Bay of Plenty", 
      "Gisborne", 
      "Hawke's Bay", 
      "Taranaki", 
      "Manawatu-Whanganui", 
      "Wellington", 
      "Tasman", 
      "Nelson", 
      "Marlborough", 
      "West Coast", 
      "Canterbury", 
      "Otago", 
      "Southland"
    ];
    
    // Determinar qué región debe estar activa basada en la posición del scroll
    if (scrollPosition < 0) {
      setActiveRegion(null);
    } else if (scrollPosition > 1) {
      setActiveRegion(regions[regions.length - 1]);
    } else {
      const index = Math.floor(scrollPosition * regions.length);
      const boundedIndex = Math.max(0, Math.min(regions.length - 1, index));
      setActiveRegion(regions[boundedIndex]);
    }
  }, [scrollPosition, inView]);

  // Si hay un error, mostrarlo
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 text-center p-4">
          <h3 className="text-xl font-bold mb-2">Error al cargar el mapa</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Si está cargando, mostrar un mensaje
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4">
          <h3 className="text-xl font-bold mb-2">Cargando mapa...</h3>
          <p>Por favor espera mientras se cargan los datos.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={setRefs} className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        width={800}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[172, -41]} zoom={6}>
          <Geographies geography={NZ_GEO_JSON}>
            {({ geographies }) => {
              console.log("Geographies:", geographies);
              return geographies.map(geo => {
                console.log("Geo properties:", geo.properties);
                // Intentar obtener el nombre de la región de diferentes propiedades posibles
                const regionName = 
                  geo.properties.NAME || 
                  geo.properties.name || 
                  geo.properties.REGION || 
                  geo.properties.region || 
                  "Unknown";
                
                const isActive = regionName === activeRegion;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      // Solo cambiar la región al pasar el mouse si no hay una región activa por scroll
                      if (!activeRegion) {
                        setActiveRegion(regionName);
                      }
                    }}
                    onMouseLeave={() => {
                      // Solo limpiar si no hay una región activa por scroll
                      if (!activeRegion) {
                        setActiveRegion(null);
                      }
                    }}
                    style={{
                      default: {
                        fill: isActive ? activeRegionColor : defaultColor,
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none"
                      },
                      hover: {
                        fill: isActive ? activeRegionColor : highlightColor,
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none"
                      }
                    }}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {activeRegion && (
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow text-lg font-bold">
          {activeRegion}
        </div>
      )}
    </div>
  );
};

export default NZMap; 