function loadMarkers(map) {
    // Load from json file
    fetch('data/locations.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(loc => {
            L.marker([loc.lat, loc.lng])
            .addTo(map)
            .bindPopup(`<b>${loc.name}</b><br>${loc.description}`);
        });
    })
    .catch(err => console.error("Error loading markers: ", err));
//   L.marker([28.6139, 77.209])
//     .addTo(map)
//     .bindPopup("<b>Hello Delhi!</b><br>My first Leaflet map")
//     .openPopup();
}

export { loadMarkers };
