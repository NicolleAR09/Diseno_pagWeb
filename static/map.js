const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

let myMap = L.map('myMap'). setView([10.9886091, -74.7922088], 13)

L.tileLayer(tilesProvider,{
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(myMap)

let marker = L.marker([10.9886091, -74.7922088]).addTo(myMap)

marker.setLatLng([data.Longitud, data.Latitud]);
                                
          //marker.setLatLng(latlong);
         //map.setView(latlong);
          //poliline:
          var latlong = [Number(data.Latitud),Number(data.Longitud)];
          poly.push(latlong);
          line = L.polyline(poly, {color: 'red'}).addTo(myMap);



// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

//var  ppopup = L.popup();

//function onMapClick(e) {
//popup
  //  .setLatLng(e.latlng)
    //.setContent("You clicked the map at " + e.latlng.toString())
    //.openOn(myMap);
//}

//myMap.on('click', onMapClick);


// var polyline = [];
// application = new function(){
//     this.leer = async function(){
//         var latlong = [Number(document.getElementById("lat").value),Number(document.getElementById("lng").value)];
//         marker.setLatLng(latlong);
//         map.setView(latlong);

//         polyline.push(latlong);
//         line = L.polyline(polyline, {color: 'red'}).addTo(myMap);


    
//     }
//     setInterval(this.leer,5000);
// }

// application.leer();




