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
    let day = today.getDate().toString().padStart(2, '0');

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

document.getElementById("leaflet-version").textContent = `Leaflet v${L.version}`;

const customMarkerIcon = L.icon({
    iconUrl: '../assets/icons/location-pin.png',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

// Function for drawing anything on map
function drawControls() {
    // Create a FeatureGroup to store drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Add the drawn control
    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems    // allows editing, deleting
        },
        draw: {
            polygon: {
                shapeOptions: {
                    color: 'yellow'
                }
            },
            polyline: {
                shapeOptions: {
                    color: 'blue'
                }
            },
            rectangle: {
                shapeOptions: {
                    color: 'green'
                }
            },
            circle: {
                shapeOptions: {
                    color: 'orange'
                }
            },
            marker: {
                icon: customMarkerIcon
            }
        }
    });

    map.addControl(drawControl);

    // Handle the event when a shape is created
    map.on(L.Draw.Event.CREATED, function(e) {
        const layer = e.layer;
        drawnItems.addLayer(layer);
    });
}

function scaleBar() {
    L.control.scale().addTo(map);
}

function legendControl() {
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `
        <h4>Legend</h4>
        <!--<i style="background: red"></i> Cities <br>
        <i style="background: blue"></i> Rivers <br>-->
        <img src="../assets/icons/location-pin.png" style="width:15px;height:15px;"> Landmarks <br>
        `;
      return div;
    };

    legend.addTo(map);
}

function addFullScreen() {
    L.control.fullscreen({
        position: 'topleft',
        title: 'Show me fullscreen'
    }).addTo(map)
}

function addLocateControl() {
  L.control
    .locate({
      position: "topright",
      strings: {
        title: "Show your location",
      },
    })
    .addTo(map);
}

function addPolylineMeasureScale() {
    L.control.polylineMeasure({
        position: 'topright',
        unit: 'metres',
        // showBearings: true,
        clearMeasurementsOnStop: true,
        showClearControl: true,
        showUnitControl: true,
        measureControlClasses: ['my-measure-btn']   // It is for associating a custom class name with leaflet button to give custom css styling
    }).addTo(map);
}

// function to update position of zoom controls and lat lng info 
function updateControlPosition(isMinimized) {
    const zoomDiv = document.getElementById('custom_zoom');
    const latlngDiv = document.getElementById('lat_lng_info');

    if (isMinimized) {
      zoomDiv.classList.remove("shift-up");
      latlngDiv.classList.remove("shift-up");
    } else {
      zoomDiv.classList.add("shift-up");
      latlngDiv.classList.add("shift-up");
    }
}

// function to add mini map on the map
function addMiniMap() {
    
    const miniMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 0, maxZoom: 13 });
    
    const miniMap =  new L.Control.MiniMap(miniMapLayer, { position: 'bottomright', toggleDisplay: true }).addTo(map);

    // checks initial stage of minimap and update position of other divs accordingly
    updateControlPosition(miniMap._minimized);

    // listens for minimize, restore events of mini map
    miniMap.on("minimize", () => updateControlPosition(true));
    miniMap.on("restore", () => updateControlPosition(false));
}

let downloadPanel = document.getElementById("downloadPanel");
let downloadPanelBtn = document.getElementById("downloadPanelBtn");
let downloadMapCloseBtn = document.getElementById("closeDownloadPanel");
let downloadImgBtn = document.getElementById("downloadImg");
let downloadPdfBtn = document.getElementById("downloadPdf");

// Function to perform download of map as an Image or PDF
function downloadMapOptions() {

    // Event to open download panel
    downloadPanelBtn.addEventListener('click', (e) => {
        downloadPanel.style.display = 'block';
    });

    // Event to close download panel
    downloadMapCloseBtn.addEventListener('click', (e) => {
        downloadPanel.style.display = 'none';
    })

    const mapContainer = document.getElementById("map"); // your map div

    // Event to download map as Image
    downloadImgBtn.addEventListener('click', (e) => {
        downloadPanel.style.display = 'none';

        html2canvas(mapContainer, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          ignoreElements: (el) => {
            // Exclude only your custom download panel, but capture controls
            return el.id === "downloadPanel";
          },
        })
          .then((canvas) => {
            // Create link element
            const link = document.createElement("a");
            link.download = "geo_explorer.png";
            link.href = canvas.toDataURL("image/png");
            // Append to DOM (needed for Firefox sometimes)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((err) => {
            console.error("Screenshot failed:", err);
          });
    })

    // Event to download map as PDF
    downloadPdfBtn.addEventListener('click', (e) => {
        downloadPanel.style.display = 'none';

        html2canvas(mapContainer, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          ignoreElements: (el) => {
            // Exclude only your custom download panel, but capture controls
            return el.id === "downloadPanel";
          },
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            // Create PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("landscape", "pt", "a4");

            // Get PDF page width and height
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // calculate image dimensions to fit to PDF
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            pdf.save("geoExplorer.pdf");
          })
          .catch((err) => {
            console.error("PDF generation failed:", err);
          });
    })
}

export {
    attachMapEvents,
    displayLatLongOfCursor,
    zoomControls,
    addDateAndTime,
    drawControls,
    scaleBar,
    legendControl,
    addFullScreen,
    addLocateControl,
    addPolylineMeasureScale,
    addMiniMap,
    downloadMapOptions
}