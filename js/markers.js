const icon = L.icon({
  iconUrl: "../assets/icons/location-pin.png", // replace with your image path
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function loadMarkers(map) {
  // Load from json file
  fetch("data/locations.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((loc) => {
        L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.description}`);
        // const marker = L.canvasMarker([loc.lat, loc.lng], { icon }).addTo(map);
      });
    })
    .catch((err) => console.error("Error loading markers: ", err));
}

export { loadMarkers };
