//---------------------------------------------------

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