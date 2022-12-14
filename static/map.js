const tilesProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

let myMap = L.map("myMap").setView([10.9886091, -74.7922088], 13);

L.tileLayer(tilesProvider, {
    maxZoom: 18,
    attribution: "© OpenStreetMap"
}).addTo(myMap);

var rmarker = L.icon({
    iconUrl: 'redmarker.png',

    iconSize:     [15, 55], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
// Inicializacion del marker y la linea que dibuja la polylinea
var marker1 = L.marker([0, 0], {icon : rmarker}).addTo(myMap);

let marker = L.marker([0, 0]).addTo(myMap);

const line = L.polyline([], { color: "red" }).addTo(myMap);
const line2 = L.polyline([], { color: "blue" }).addTo(myMap); //adding second car 

onclick = "marker";

/*
var southWest = new L.LatLng(10.928, -74.892),
    northEast = new L.LatLng(10.988, -74.792),
    bounds = new L.LatLngBounds(southWest, northEast);

//update all locations
// focus selected marker
myMap.fitBounds(bounds);
*/