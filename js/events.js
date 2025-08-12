import * as layers from './layers.js';
import { map } from './main.js';
import * as markers from './markers.js';

function attachMapEvents(map) {
    map.on('click', function(e){
        console.log(`Clicked at: ${e.latlng.lat}, ${e.latlng.lng}`);
    })
}

// Converts Lat and Long values in DMS format
function convertToDMS(value, isLat) {
    const absVal = Math.abs(value);
    const deg = Math.floor(absVal);
    const minFloat = (absVal - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = ((minFloat - min) * 60).toFixed(2);

    const dir = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W'); 

    return `${deg}\u00B0 ${min}' ${sec} ${dir}`;
}

let latInfo = document.getElementById('lat_info');
let lngInfo = document.getElementById('lng_info');
let latLngCombined = document.getElementById('lat_lng_combined');

// Display Lat and Long values wherever cursor points
function displayLatLongOfCursor(map) {
    map.on('mousemove', function(e){
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        latInfo.innerHTML = convertToDMS(lat, true);
        lngInfo.innerHTML = convertToDMS(lng, false);
        latLngCombined.innerHTML = `(${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    })
}

let zoomInBtn = document.getElementById('zoom-in');
let zoomOutBtn = document.getElementById('zoom-out');

// Zoom controls
function zoomControls(map) {
    zoomInBtn.addEventListener('click' , function(e) {
        // console.log('inside zoom in btn')
        map.zoomIn();
    })

    zoomOutBtn.addEventListener('click', function(e) {
        // console.log('inside zoom out btn')
        map.zoomOut();
    })
}

let baseLayers = {
    osm: layers.getOpenStreetMapTileLayer(),
    satellite: layers.getSatelliteTileLayer(),
    cartoDark: layers.getCartoDarkTileLayer(),
    cartoLight: layers.getCartoLightTileLayer()
}

// To open map type dialog box
let mapTypeBtn = document.getElementById('map_type');
mapTypeBtn.addEventListener('click', function(e){
    mapTypeBtn.style.background = 'rgb(28, 101, 217)';

    let mapTypeModal = document.getElementById('map_type_modal');
    mapTypeModal.style.display = 'block';
    
});

// To close map type dialog box
document.getElementById('map_type_close_btn')
.addEventListener('click', function(e){
    let mapTypeModal = document.getElementById('map_type_modal');
    mapTypeModal.style.display = 'none';

    document.getElementById('map_type').style.background = '#333';
})

// Listen for radio buttons
document.querySelectorAll('input[name="mapType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const selectedLayer = e.target.value;
        // remove all existing layers
        map.eachLayer(layer => {
            map.removeLayer(layer);
        });
        // add selected layer
        baseLayers[selectedLayer].addTo(map);
        markers.loadMarkers(map);
    })
});

function getCurrentDate() {
    let today = new Date();

    let year = today.getFullYear();
    let mon = String(today.getMonth()+1).padStart(2,'0');  // months are 0-based
    let day = today.getDate();

    return `${day}-${mon}-${year}`;
}

function getCurrentTime() {
    let today = new Date();
    
    let hours = String(today.getHours()).padStart(2, '0');
    let mins = String(today.getMinutes()).padStart(2, '0');
    let secs = String(today.getSeconds()).padStart(2, '0');

    return `${hours}:${mins}:${secs}`;
}

function addDateAndTime() {

    let date = document.getElementById('date');
    date.innerHTML = getCurrentDate();
    let time = document.getElementById('time');
    time.innerHTML = getCurrentTime();
}

function getLeafletVersion() {
    return `Leaflet version:, ${L.version}`;
}

// document.getElementById('info_icon').addEventListener('click', function(e){
//     document.getElementById('leaflet_version').style.display = 'block';
// })

export {
    attachMapEvents,
    displayLatLongOfCursor,
    zoomControls,
    addDateAndTime,
    getLeafletVersion
}