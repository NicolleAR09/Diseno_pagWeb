 const express = require('express');    

 const app = express();

//app.get('/', (req, res) => res.send('Hello World from Express!'))

app.get("/TiempoReal", (req, res) => {
    return res.sendFile(path.join(__dirname + "/paginaweb.html"));
  });

const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
socket.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  socket.close();
});
socket.on('message', async (msg, senderInfo) => {
  console.log('Messages received ' + msg)
  const infoMensaje = String(msg).split(",")
  insertData(infoMensaje);
  socket.send(msg, senderInfo.port, senderInfo.address, () => {
    console.log(`Message sent to ${senderInfo.address}:${senderInfo.port}`)
  })
});
socket.on('listening', (req, res) => {
  const address =   socket.address();
  console.log(`UDP server listening on: ${address.address}:${address.port}`);
});

app.listen(8000);
console.log('Server on port 8000')