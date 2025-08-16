import * as layers from "./layers.js";
import { loadMarkers } from "./markers.js";
import * as events from "./events.js";

// Initialize map
const map = L.map('map', {
    center: [28.6635, 77.3632], // Delhi Coordinates
    zoom: 13,
    zoomControl: false  //disable default zoom controls
})

// Different map tiles 
const osm = layers.getOpenStreetMapTileLayer();   // Open Street view
// const satellite = layers.getSatelliteTileLayer();   // Satellite view
// const light = layers.getCartoLightTileLayer();   // Carto light
// const dark = layers.getCartoDarkTileLayer();   // Carto dark

osm.addTo(map); // Adding Open street map as default tile layer

// let baseLayers = {
//     "OpenStreetMap": osm,
//     "Carto Dark": dark,
//     "Carto Light": light,
//     "Satellite": satellite
// }

// Provides different options for tile layers 
// L.control.layers(baseLayers).addTo(map); // default layer control

// To load the markers
loadMarkers(map);

// To attach the event associated with maps
// events.attachMapEvents(map);

// To show latitude and longitude values of cursor on the map
events.displayLatLongOfCursor(map);

// Zoom controls
events.zoomControls(map);

// Current Date and Time
events.addDateAndTime();

// Add date and time every seconds
setInterval(events.addDateAndTime, 1000);

// Draw controls
events.drawControls();

// Scale Bar
events.scaleBar();

// Legend control
events.legendControl();

// leaflet version
let leafletVersion = events.getLeafletVersion();

export {
    map
}