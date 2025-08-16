const icon = L.icon({
  iconUrl: "../assets/icons/location-pin.png", // replace with your image path
  iconSize: [35, 35],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// const canvasLayer = L.canvasIconLayer({}).addTo(map);

function loadMarkers(map) {

  const markerCluster = L.markerClusterGroup();

  // Load from json file
  fetch("data/locations.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: icon
        }).bindPopup(`<b>${loc.name}</b>`);
        // .bindPopup(`<b>${loc.name}</b><br>${loc.description}`);
        
        markerCluster.addLayer(marker);

        marker.on("mouseover", function() {
          this.openPopup();
        })

        marker.on("mouseout", function() {
          this.closePopup();
        })
        
      });

      map.addLayer(markerCluster);

    })
    .catch((err) => console.error("Error loading markers: ", err));
}

export { loadMarkers };
