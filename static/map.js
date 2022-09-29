const tilesProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

let myMap = L.map("myMap").setView([10.9886091, -74.7922088], 13);

L.tileLayer(tilesProvider, {
    maxZoom: 18,
    attribution: "© OpenStreetMap"
}).addTo(myMap);
// Inicializacion del marker y la linea que dibuja la polylinea
let marker = L.marker([10.9886091, -74.7922088]).addTo(myMap);
const line = L.polyline([], { color: "red" }).addTo(myMap);

onclick = "marker";

//update all locations
// focus selected marker

window.onload = () => {
    const bounds = new L.LatLngBounds(
        L.LatLng(10.9876091, -74.7912088),
        L.LatLng(10.9886091, -74.7922088)
    );
    myMap.fitBounds(bounds);
};
