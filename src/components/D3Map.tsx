'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useInView } from 'react-intersection-observer';
import { Feature, FeatureCollection, Geometry } from 'geojson';

// Ruta al archivo GeoJSON de Nueva Zelanda
const NZ_GEO_JSON = '/data/nz_regions.geojson';

// Colores para las regiones
const defaultColor = "#D6D6DA";
const highlightColor = "#F53";
const activeRegionColor = "#f5a742"; // Color naranja para la región activa
const backgroundColor = "#FFFFFF"; // Fondo blanco

// Lista de regiones de Nueva Zelanda de norte a sur
const regions = [
  "Northland", 
  "Auckland", 
  "Waikato", 
  "Bay of Plenty", 
  "Gisborne", 
  "Hawke's Bay", 
  "Taranaki", 
  "Manawatu-Wanganui", 
  "Wellington", 
  "Tasman", 
  "Nelson", 
  "Marlborough", 
  "West Coast", 
  "Canterbury", 
  "Otago", 
  "Southland",
  "Chatham Islands"
];

// Interfaz para las propiedades de las características GeoJSON
interface RegionProperties {
  name?: string;
  NAME?: string;
  REGION?: string;
  region?: string;
  density?: number;
  path?: string;
  [key: string]: any;
}

const D3Map = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, RegionProperties> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [regionInfo, setRegionInfo] = useState<{name: string, isActive: boolean, isHovered: boolean}[]>([]);
  
  // Configuración para detectar cuando el mapa está en el viewport
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Combinar refs
  const setRefs = (node: HTMLDivElement) => {
    // Asignar el ref al elemento
    mapContainerRef.current = node;
    // Asignar el ref para InView
    inViewRef(node);
  };

  // Cargar datos GeoJSON
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch(NZ_GEO_JSON);
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo GeoJSON: ${response.status}`);
        }
        const data = await response.json();
        console.log("GeoJSON cargado:", data);
        setGeoData(data as FeatureCollection<Geometry, RegionProperties>);
      } catch (error) {
        console.error("Error loading GeoJSON data:", error);
        setError(`Error al cargar los datos: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    fetchGeoData();
  }, []);

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!mapContainerRef.current || !inView) return;
      
      const mapRect = mapContainerRef.current.getBoundingClientRect();
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

  // Actualizar la información de las regiones
  useEffect(() => {
    if (!geoData) return;
    
    const newRegionInfo = regions.map(region => ({
      name: region,
      isActive: region === activeRegion,
      isHovered: region === hoveredRegion
    }));
    
    setRegionInfo(newRegionInfo);
  }, [geoData, activeRegion, hoveredRegion]);

  // Función para obtener el nombre de la región
  const getRegionName = (feature: Feature<Geometry, RegionProperties>): string => {
    if (!feature || !feature.properties) return "Unknown";
    
    // Intentar obtener el nombre de diferentes propiedades posibles
    return feature.properties.NAME || 
           feature.properties.name || 
           feature.properties.REGION || 
           feature.properties.region || 
           "Unknown";
  };

  // Renderizar el mapa con D3
  useEffect(() => {
    if (!svgRef.current || !geoData || !geoData.features || geoData.features.length === 0) return;

    console.log("Renderizando mapa con", geoData.features.length, "regiones");
    
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth || 800;
    const height = svgRef.current.clientHeight || 600;
    
    // Limpiar SVG
    svg.selectAll("*").remove();
    
    // Añadir un rectángulo de fondo
    svg.append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", backgroundColor);
    
    // Crear proyección
    // Nota: Ajustamos la proyección para mostrar mejor las islas principales de Nueva Zelanda
    // Las islas Chatham están muy al este y requieren un manejo especial
    const projection = d3.geoMercator()
      .center([172, -41]) // Centrar en Nueva Zelanda
      .scale(3200)        // Ajustar escala para ver todo el país
      .translate([width / 2, height / 2]);
    
    // Crear generador de path
    const pathGenerator = d3.geoPath().projection(projection);
    
    // Crear grupo para el mapa
    const g = svg.append("g");
    
    // Añadir zoom y pan
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });
    
    svg.call(zoom);
    
    // Dibujar regiones
    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", (feature) => {
        try {
          return pathGenerator(feature as any);
        } catch (error) {
          console.error("Error al generar path:", error, feature);
          return "";
        }
      })
      .attr("fill", (feature) => {
        const regionName = getRegionName(feature);
        if (regionName === activeRegion) {
          return activeRegionColor;
        } else if (regionName === hoveredRegion) {
          return highlightColor;
        } else {
          return defaultColor;
        }
      })
      .attr("stroke", "#333333")
      .attr("stroke-width", 0.5)
      .on("mouseenter", (event, feature) => {
        const regionName = getRegionName(feature);
        setHoveredRegion(regionName);
        
        // Resaltar la región
        d3.select(event.currentTarget)
          .attr("fill", regionName === activeRegion ? activeRegionColor : highlightColor);
      })
      .on("mouseleave", (event, feature) => {
        setHoveredRegion(null);
        
        // Restaurar el color original
        const regionName = getRegionName(feature);
        d3.select(event.currentTarget)
          .attr("fill", regionName === activeRegion ? activeRegionColor : defaultColor);
      });
    
    // Añadir etiquetas para las regiones principales
    g.selectAll("text")
      .data(geoData.features)
      .enter()
      .append("text")
      .attr("transform", (feature) => {
        try {
          // Calcular el centroide de la región para colocar la etiqueta
          const centroid = pathGenerator.centroid(feature as any);
          return `translate(${centroid[0]},${centroid[1]})`;
        } catch (error) {
          return "translate(0,0)";
        }
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .attr("pointer-events", "none") // Evitar que las etiquetas interfieran con los eventos del mouse
      .text((feature) => {
        const name = getRegionName(feature);
        // Solo mostrar etiquetas para regiones grandes o importantes
        if (["Auckland", "Wellington", "Canterbury", "Otago", "Southland", "Waikato"].includes(name)) {
          return name;
        }
        return "";
      });
    
  }, [geoData, activeRegion, hoveredRegion]);

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

  // Si no hay datos, mostrar un mensaje de carga
  if (!geoData) {
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
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid meet"
        style={{ background: backgroundColor }}
      />
      
      {/* Panel de información de la región */}
      {(activeRegion || hoveredRegion) && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-lg text-lg font-bold">
          {hoveredRegion || activeRegion}
        </div>
      )}
      
      {/* Leyenda */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded shadow-lg text-sm">
        <h4 className="font-bold mb-2">Regiones de Nueva Zelanda</h4>
        <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto">
          {regionInfo.map((region) => (
            <div 
              key={region.name} 
              className="flex items-center gap-2"
              onMouseEnter={() => setHoveredRegion(region.name)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ 
                  backgroundColor: region.isActive 
                    ? activeRegionColor 
                    : region.isHovered 
                      ? highlightColor 
                      : defaultColor 
                }}
              />
              <span className={region.isActive || region.isHovered ? "font-bold" : ""}>{region.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <p>Desplázate para cambiar la región activa</p>
          <p>Pasa el cursor sobre una región para resaltarla</p>
        </div>
      </div>
    </div>
  );
};

export default D3Map; 