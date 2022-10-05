var historic = new Array();
var info = new Array();
var histPolyline = new Array();

//Crear fecha con el dia de hoy
const today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //enero es 0!
let yyyy = today.getFullYear();
let hora1 = today.getHours();
let minutes = today.getMinutes();

dd < 10 ? (dd = "0" + dd) : (dd = dd);
mm < 10 ? (mm = "0" + mm) : (mm = mm);
hora1 < 10 ? (hora1 = "0" + hora1) : (hora1 = hora1);
minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);

const hora = hora1 + ":" + minutes;

const currentDate = yyyy + "-" + mm + "-" + dd + "T" + hora;

//Obtener los inputs donde se van a colocar la fechas
const startDate = document.getElementById("stime");
const endDate = document.getElementById("ftime");

//Definir que la fecha maxima por defecto sea la del dia de hoy
console.log(startDate);
startDate.max = currentDate;
endDate.max = currentDate;

// Seleccionar maximo y minimo para los calendarios segun las fechas seleccionadas.
// Al hacer click en el calendario de fecha inicial, se obtiene el valor del calendario de fecha final
// y se coloca que sea el maximo posible, para que la fecha inicial no sea nunca posterior a la final
startDate.addEventListener("click", async () => {
    endDate.value == ""
        ? (startDate.max = currentDate)
        : (startDate.max = endDate.value);
});
// Al hacer click en el calendario de fecha final, se obtiene el valor del calendario de fecha inicial
// y se coloca que sea el minimo posible, para que la fecha final no sea nunca anterior a la inicial
endDate.addEventListener("click", async () => {
    endDate.min = startDate.value;
});

// se crea funcion para trazar la polilinea
const showRecordInfo = async () => {
    // Se obtienen los valores de fecha en los calendarios y se formatean para poder hacer la consulta.
    // Se tienen que formatear porque por defecto traen la siguiente estructura, YYYY/MM/DDThh:mm:ss,
    // Entonces se elimina la T que separa la fecha y la hora, y se coloca un espacio, obteniendo
    // la siguiente estructura YYYY/MM/DD hh:mm:ss
    console.log("Botton pushed");
    const stime = document.getElementById("stime").value; //.value.split('T').join(' ');
    const ftime = document.getElementById("ftime").value; //.value.split('T').join(' ');

    // Implementacion temporal
    try {
        const validatedStartDate = new Date(stime)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        const validatedEndDate = new Date(ftime)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        // Se hace el fetch a la api con las fechas para obtener la informacion de la base de datos
        const request = await fetch(
            `/record?stime=${validatedStartDate}&ftime=${validatedEndDate}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }
        );

        if (!request.ok)
            return console.log(
                "Unable to fetch data with given dates, plase check parsing or request"
            );

        const historic = [];
        for (var poly of histPolyline) {
            myMap.removeLayer(poly);
        }
        request.json().then((json) => {
            const info = json;

            // Se rellena el vector con la informacion obtenida de la base de datos
            for (let item of info) {
                if (item) {
                    if (
                        item.Longitud !== undefined &&
                        item.Latitud !== undefined
                    ) {
                        historic.push([item.Longitud, item.Latitud]);
                        info.push(item.Timestamp);
                    }
                }
            }

            console.log(historic);
            // Se traza la polilinea
            if (historic == 0) {
                pathway ="<b> No hay datos, por favor seleccione otro intervalo </b>";
            } else {
                const poly = L.polyline(historic, { color: "red" }).addTo(myMap);
                histPolyline.push(poly);
                console.log("Historic done");
            }

        });
    } catch (e) {
        console.error(e);
    }

    //Historic 2
    myMap.on("click", (e) => {
        console.log(histPolyline);

        marker.setLatLng([e.latlng.lat, e.latlng.lng]).addTo(myMap);

        L.marker([e.latlng.lat, e.latlng.lng]).addTo(myMap);

        fetch(`/pathg?latd=${e.latlng.lat}&longd=${e.latlng.lng}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) => {
            response.json().then((json) => {
                const distances = json.map((item) => {
                    // item has the form of
                    // {ID: 1173, Latitud: -74.837, Longitud: 11.0151, Timestamp: "2022-09-29T11:02:56.000Z"}
                    // we need to find the closest point to the current location by comparing each distance e.latlng.lat, e.latlng.lng with item.Latitud, item.Longitud and finding the minimum

                    return Math.sqrt(
                        Math.pow(e.latlng.lat - item.Longitud, 2) +
                        Math.pow(e.latlng.lng - item.Latitud, 2)
                    );
                });

                // find the minimum distance
                const minDistance = Math.min(...distances);

                // find the index of the minimum distance
                const minDistanceIndex = distances.indexOf(minDistance);

                // get the closest point
                const closestPoint = json[minDistanceIndex];

                // get the closest point's timestamp
                const closestPointTimestamp = closestPoint.Timestamp;

                if (closestPointTimestamp) {
                    pathway = "<b>" + closestPointTimestamp + "</b>";
                } else {
                    pathway =
                        "<b> No hay datos, por favor seleccione otro punto </b>";
                }

                document.getElementById("pathway").innerHTML = pathway;
            });
        });
    });
};
