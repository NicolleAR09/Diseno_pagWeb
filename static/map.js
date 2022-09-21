const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

let myMap = L.map('myMap'). setView([10.9886091, -74.7922088], 13)

L.tileLayer(tilesProvider,{
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(myMap)

let marker = L.marker([10.9886091, -74.7922088]).addTo(myMap)



// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

//var  ppopup = L.popup();

function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(myMap);
}

myMap.on('click', onMapClick);

var polyline = [];
var LatLong = [Number(lat),Number(lng)];
marker.setLatLng(latlong);
map.setView(latlong);

polyline.push(latlong);
line = L.polyline(polyline, {color: 'red'}).addTo(myMap);


