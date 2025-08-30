// Add OpenStreetMap tiles
function getOpenStreetMapTileLayer() {
    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
        noWrap: true    // prevent world map from repeating
    });
    return baseLayer;
}

// Add Humanitarian OpenStreetMap tiles
function getHumanitarianOpenStreetMapTileLayer() {
    const baseLayer = L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors, Humanitarian OpenStreetMap Team'
    });
    return baseLayer;
}

// OpenStreetMap Black & White
function getOpenStreetMapBlackAndWhiteTileLayer() {
    const baseLayer = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  });
  return baseLayer
}
// Add Mapbox tile layer
function getMapboxTileLayer() {
    const baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=YOUR_KEY', {
        attribution: '© Mapbox © OpenStreetMap',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    });
    return baseLayer;
}

// World Imagery
function getSatelliteTileLayer() {
    const baseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 20,
        noWrap: true    // prevent world map from repeating
    })
    return baseLayer;
}

// World Topo Map
function getTopoTileLayer() {
    const baseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 20
    })
    return baseLayer;
}

// Carto Light
function getCartoLightTileLayer() {
    const baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 20,
        noWrap: true    // prevent world map from repeating
    })
    return baseLayer;
}

// Carto Dark
function getCartoDarkTileLayer() {
    const baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 20,
        noWrap: true    // prevent world map from repeating
    })
    return baseLayer;
}

// Stamen Toner
function getStamenTonerTileLayer() {
    const baseLayer = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design &copy; OpenStreetMap contributors',
        maxZoom: 20
    })
    return baseLayer;
}

// Stamen Watercolor
function getStamenWatercolorTileLayer() {
    const baseLayer = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
        attribution: 'Map tiles by Stamen Design &copy; OpenStreetMap contributors',
        maxZoom: 16
    })
    return baseLayer;
}

export { 
    getOpenStreetMapTileLayer,
    getHumanitarianOpenStreetMapTileLayer,
    getOpenStreetMapBlackAndWhiteTileLayer,
    getMapboxTileLayer,
    getSatelliteTileLayer,
    getTopoTileLayer,
    getCartoLightTileLayer,
    getCartoDarkTileLayer,
    getStamenTonerTileLayer,
    getStamenWatercolorTileLayer
}