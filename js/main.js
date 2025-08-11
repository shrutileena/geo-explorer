import * as layers from "./layers.js";
import { loadMarkers } from "./markers.js";
import * as events from "./events.js";

// Initialize map
const map = L.map('map').setView([28.6139, 77.2090], 13); // Delhi Coordinates

// Different map tiles 
const osm = layers.getOpenStreetMapTileLayer();   // Open Street view
// const baseLayer = layers.getHumanitarianOpenStreetMapTileLayer();
// const baseLayer = layers.getOpenStreetMapBlackAndWhiteTileLayer();
// const baseLayer = getMapboxTileLayer();
const satellite = layers.getSatelliteTileLayer();   // Satellite view
// const baseLayer = layers.getTopoTileLayer();
const light = layers.getCartoLightTileLayer();   // Carto light
const dark = layers.getCartoDarkTileLayer();   // Carto dark
// const baseLayer = layers.getStamenTonerTileLayer();
// const baseLayer = layers.getStamenWatercolorTileLayer();

osm.addTo(map); // Adding Open street map as default tile layer

let baseLayers = {
    "OpenStreetMap": osm,
    "Carto Dark": dark,
    "Carto Light": light,
    "Satellite": satellite
}

// Provides different options for tile layers 
L.control.layers(baseLayers).addTo(map);

// To load the markers
loadMarkers(map);

// To attach the event associated with maps
// events.attachMapEvents(map);

// To show latitude and longitude values of cursor on the map
events.displayLatLongOfCursor(map);