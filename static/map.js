const tilesProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

let myMap = L.map("myMap").setView([10.9886091, -74.7922088], 13);

L.tileLayer(tilesProvider, {
    maxZoom: 18,
    attribution: "© OpenStreetMap"
}).addTo(myMap);
// Inicializacion del marker y la linea que dibuja la polylinea
let marker = L.marker([10.9886091, -74.7922088]).addTo(myMap);
//let marker1 = L.marker([10.9786091, -74.792299]).addTo(myMap);
const line = L.polyline([], { color: "red" }).addTo(myMap);
const line2 = L.polyline([], { color: "blue" }).addTo(myMap); //adding second car 

onclick = "marker";

var southWest = new L.LatLng(10.928, -74.892),
    northEast = new L.LatLng(10.988, -74.792),
    bounds = new L.LatLngBounds(southWest, northEast);

//update all locations
// focus selected marker
myMap.fitBounds(bounds);
