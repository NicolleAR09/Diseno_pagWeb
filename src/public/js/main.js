
const map = L.map('map-template'). setView([10.9886091, -74.7922088], 16);
const socket = io();

const tilesProvider = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png';

L.tileLayer(tilesProvider).addTo(map);

map.locate({enableHighAccuracy: true});
map.on('locationfound', e => {
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('You are here');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng);
});

socket.on('newUserCoordinates', (coords) => {
    console.log('New user is connected');
    const marker = L.marker([coords.lat + 1, cords.lng + 1]);
    marker.bindPopup('i am been tracked');
    map.addLayer(marker);
})
