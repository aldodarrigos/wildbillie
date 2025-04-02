// Configuración del mapa
const width = document.getElementById('map-container').clientWidth;
const height = 600;

// Crear el SVG
const svg = d3.select('#map-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Crear un grupo para el mapa
const mapGroup = svg.append('g');

// Crear un tooltip
const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

// Cargar los datos GeoJSON de Nueva Zelanda (archivo local)
d3.json('nzreg.json')
    .then(data => {
        console.log("Datos cargados:", data);
        
        try {
            if (!data || !data.features || !data.features.length) {
                throw new Error("No se pudieron procesar los datos GeoJSON correctamente");
            }
            
            // Configurar una proyección para Nueva Zelanda
            const projection = d3.geoMercator()
                .center([174, -41]) // Centrado en Nueva Zelanda
                .scale(2500)
                .translate([width / 2, height / 2]);
            
            const path = d3.geoPath().projection(projection);
            
            // Dibujar las regiones
            mapGroup.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('class', 'region')
                .attr('d', path)
                .attr('fill', '#2ecc71')
                .attr('stroke', '#fff')
                .attr('stroke-width', 0.5)
                .on('mouseover', function(event, d) {
                    d3.select(this)
                        .attr('fill', '#27ae60')
                        .attr('stroke', '#000')
                        .attr('stroke-width', 1);
                    
                    tooltip.style('opacity', 0.9)
                        .html(`<strong>Región:</strong> ${d.properties.name}`)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .attr('fill', '#2ecc71')
                        .attr('stroke', '#fff')
                        .attr('stroke-width', 0.5);
                    
                    tooltip.style('opacity', 0);
                });

            // Añadir título al mapa
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', 30)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .style('font-weight', 'bold')
                .text('Regiones de Nueva Zelanda');
                
            // Añadir zoom y pan
            const zoom = d3.zoom()
                .scaleExtent([0.5, 8])
                .on('zoom', (event) => {
                    mapGroup.attr('transform', event.transform);
                });

            svg.call(zoom);
            
        } catch (error) {
            console.error("Error al procesar los datos:", error);
            document.getElementById('map-container').innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p>Error al procesar los datos del mapa.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Error al cargar el mapa:', error);
        document.getElementById('map-container').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>Error al cargar el mapa. Por favor, intenta de nuevo más tarde.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    });

// Función para hacer el mapa responsive
window.addEventListener('resize', () => {
    const newWidth = document.getElementById('map-container').clientWidth;
    svg.attr('width', newWidth);
    
    // Actualizar la proyección al cambiar el tamaño
    const projection = d3.geoMercator()
        .center([174, -41])
        .scale(2500)
        .translate([newWidth / 2, height / 2]);
    
    const path = d3.geoPath().projection(projection);
    
    // Redibujar los paths
    mapGroup.selectAll('path').attr('d', path);
}); 