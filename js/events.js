function attachMapEvents(map) {
    map.on('click', function(e){
        console.log(`Clicked at: ${e.latlng.lat}, ${e.latlng.lng}`);
    })
}

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

function displayLatLongOfCursor(map) {
    map.on('mousemove', function(e){
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        latInfo.innerHTML = convertToDMS(lat, true);
        lngInfo.innerHTML = convertToDMS(lng, false);
        latLngCombined.innerHTML = `(${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    })
}

export {
    attachMapEvents,
    displayLatLongOfCursor
}