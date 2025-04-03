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

    // Create a tooltip with indicator line and circle
    const tooltipGroup = svg
      .append('g')
      .attr('class', 'tooltip-group')
      .style('opacity', 0);

    // Add line from region to tooltip
    const tooltipLine = tooltipGroup
      .append('line')
      .attr('class', 'tooltip-line')
      .attr('stroke', '#FF9B05')
      .attr('stroke-width', 2);

    // Add circle at the end of the line
    const tooltipCircle = tooltipGroup
      .append('circle')
      .attr('class', 'tooltip-circle')
      .attr('r', 6)
      .attr('fill', '#FF9B05');

    // Text tooltip element
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
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
            const [x, y] = path.centroid(d as any);

            // Position tooltip elements
            tooltipGroup.style('opacity', 1);
            tooltipCircle.attr('cx', x - 200).attr('cy', y);
            tooltipLine
              .attr('x1', x - 18)
              .attr('y1', y)
              .attr('x2', x - 200)
              .attr('y2', y);

            d3.select(this)
              .attr('fill', '#FF9B05')
              .attr('stroke', '#FFF')
              .attr('stroke-width', 1);

            tooltip
              .style('opacity', 1)
              .html(`${d.properties.name}`)
              .style('left', x + 470 + 'px')
              .style('top', y + 35+ 'px');
          })
          .on('mouseout', function () {
            tooltipGroup.style('opacity', 0);

            d3.select(this)
              .attr('fill', 'transparent')
              .attr('stroke', '#fff')
              .attr('stroke-width', 2);

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
