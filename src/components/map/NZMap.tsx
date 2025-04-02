'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Feature, GeoJSON } from 'geojson';

interface GeoJSONData {
  features: Feature[];
}

export default function NZMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear any existing content
    mapRef.current.innerHTML = '';

    const width = mapRef.current.clientWidth;
    const height = 600;

    // Create the SVG
    const svg = d3
      .select(mapRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create a group for the map
    const mapGroup = svg.append('g');

    // Create a tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none');

    // Load the GeoJSON data
    fetch('/data/nzreg.json')
      .then(response => response.json())
      .then((data: GeoJSONData) => {
        // Configure projection for New Zealand
        const projection = d3
          .geoMercator()
          .center([174, -41])
          .scale(1900)
          .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Draw regions
        mapGroup
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('class', 'region')
          .attr('d', d => path(d as any) || '')
          .attr('fill', 'transparent')
          .attr('stroke', '#fff')
          .attr('stroke-width', 2)
          .on('mouseover', function (event, d: any) {
            d3.select(this)
              .attr('fill', '#27ae60')
              .attr('stroke', '#000')
              .attr('stroke-width', 1);

            tooltip
              .style('opacity', 0.9)
              .html(`<strong>Región:</strong> ${d.properties.name}`)
              .style('left', event.pageX + 10 + 'px')
              .style('top', event.pageY - 28 + 'px');
          })
          .on('mouseout', function () {
            d3.select(this)
              .attr('fill', '#2ecc71')
              .attr('stroke', '#fff')
              .attr('stroke-width', 0.5);

            tooltip.style('opacity', 0);
          });

        // Add zoom and pan
        // const zoom = d3
        //   .zoom<SVGSVGElement, unknown>()
        //   .scaleExtent([0.5, 8])
        //   .on('zoom', event => {
        //     mapGroup.attr('transform', event.transform);
        //   });

        // svg.call(zoom as any);
      })
      .catch(error => {
        console.error('Error loading map:', error);
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="text-align: center; padding: 20px;">
              <p>Error loading map. Please try again later.</p>
              <p>Error: ${error.message}</p>
            </div>
          `;
        }
      });

    // Cleanup function
    return () => {
      tooltip.remove();
    };
  }, []);

  return <div ref={mapRef} className="w-full h-[600px]" />;
}
