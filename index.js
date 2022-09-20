const express = require('express');    

 const app = express();

 const data = {
    Latitud: 0,
    Longitud: 0,
    Date: "00/00/00",
    Time: "00:00:00"
 };

 app.get("/data", (req, res) => {
    const json = JSON.stringify(data)
    return res.status(200).send(json);
});

const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  socket.close();
});

socket.on('message', async (msg, senderInfo) => {
  console.log('Messages received ' + msg)
  const infoMensaje = String(msg).split(" ")
  insertData(infoMensaje);
  socket.send(msg, senderInfo.port, senderInfo.address, () => {
    console.log(`Message sent to ${senderInfo.address}:${senderInfo.port}`)
  })
});
socket.on('listening', (req, res) => {
  const address =   socket.address();
  console.log(`UDP server listening on: ${address.address}:${address.port}`);
});
//Salto de linea
//app.listen(8000);
//console.log('Server on port 8000')
const insertData = (info) => {
    data.Latitud = info[0];
    data.Longitud = info[1];
    data.Date = info[2];
    data.Time = info[3];

    console.log("Received: ", data);
};

app.use(express.static(__dirname+'/static'));
app.listen(8000, ()=>console.log('Mi servidor está corriendo sobre el puerto 8000'));
socket.bind(8050);

// Contenido estático

 /*
app.get('/', (req, res) =>{    
    res.sendFile(__dirname+'/index2.html')
})



//----------------------------------------------------------------

const insertData = async (info) => {
  const lat = info[0];
  const long = info[1];
  const date = info[2];
  const hour = info[3];
  const query = `INSERT INTO gpsdata (lat, long, date, hour) VALUES (${lat}, ${long}, "${date}","${hour}")`;
  connection.query(query, function(err, result){
    if(err)throw err;
    console.log("Registro guardado exitosamente.")
  })
};

//Llamado HTML
app.get('/index2',(req,res)=>{    
    res.sendFile(__dirname+'/index2.html')
})

app.get("/data", (req, res) => {
    const json = JSON.stringify(data)
    return res.status(200).send(json);
})

//app.listen(8000);
//console.log('Server on port 8000')

app.listen(8000, ()=>console.log('Mi servidor está corriendo sobre el puerto 8000'))
// Contenido estático
app.use(express.static(__dirname+'/index2.html'));
*/
