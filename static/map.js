    const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    let myMap = L.map('myMap'). setView([10.9886091, -74.7922088], 13)

    L.tileLayer(tilesProvider,{
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(myMap)

    let marker = L.marker([10.9886091, -74.7922088]).addTo(myMap)

    marker.bindPopup("<b>lat:10.9886091, long:-74.7922088 </b>").openPopup();

    const popup = L.popup();

    const latlngs = [
        [10.9896091, -74.7922088],
        [10.9906091, -74.7922088],
        [10.9916091, -74.7922088]
    ];
    
    const polyline = L.polyline(latlngs, {color: 'red'}).addTo(myMap);
    
    // zoom the map to the polyline
    myMap.fitBounds(polyline.getBounds());

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(myMap);
}

map.on('click', onMapClick);