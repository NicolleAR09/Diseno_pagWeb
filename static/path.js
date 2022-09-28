const { range } = require("express/lib/request");

const rangeRed = document.getElementById('rangeRed');

var rangeMarkersRed = new Array();
var circleArrayRed = new Array();

const searchRange = () => {
    circleArrayRed = [];


var circleCenterPoint = circle.getLatLng(); //gets the circle´s center latlng

var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo(point)) <= 1000

if (isInCircleRadius){
    circleArrayRed.push({lat: point[0], lng: point[1], fecha: infoRed.fecha, hora: infoRed.hora});
}

rangeRed.max = circleArrayRed.length -1;
rangeRed.value = 0;

}

const setRangeRed = (input) => {
    const range2 = input.value;
    console.log(range2);
    for (var marker of rangeMarkersRed){
        if(marker){
            map.removeLayer(marker);

        }
    }

    const marcador = L.marker([circleArrayRed[range2].lat, circleArrayRed[range2].lng]).addTo(map);
    rangeMarkersRed.push(marcador);
    marcador.bindPopup(`
        fecha: ${infoRed[range2].fecha} <br>
        hora: ${infoRed[range].hora} <br>
        
    `).openPopup();

}

const setRange = () => {
    metersRange = 1000;
    circle.setRadius(metersRange);
}

const listener = function(e){
    circle.setLatLng(e.latlng);
    setRange();
}

const reSizeCircle = (input) =>{
    const value = input.value;
    if(circle){
        circle.setRadius(value*200);
    }
}

const circle = L.circle([10.976029412029105, -74.80355101913315], {radius: 1000}).addTo(map);
let clicker = false;
circle.on({
    click: function (){
        if (clicker){
            clicker =  false;
            map.removeEventListener('mousemove', listener);
            console.log("click1");
        }else{
            clicker = true;
            map.on('mousemove', listener)
            console.log(click2);
        }
    }
});