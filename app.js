// Módulos requeridos
const express = require('express');
const http = require('http');
var compression = require('compression');
require('dotenv').config();
const {v4: uuidv4} = require('uuid');
const cors = require('cors');

const app = express();
app.use(compression());
app.use(cors());

// Servidor HTTP
const serverHttp = http.createServer(app);
serverHttp.listen(process.env.HTTP_PORT, process.env.IP);
serverHttp.on('listening', () => console.info(`Notes App running at http://${process.env.IP}:${process.env.HTTP_PORT}`));

// Contenido estático
app.use(express.static(__dirname));

//Comprobar estado del puerto
//app.listen(80, ()=>console.log('Mi servidor está corriendo sobre el puerto 80'))

// API
app.get('/api/get-uuid', function (req, res) {
    res.send(uuidv4());
});

//Llamado HTML yes
//app.get('/',(req,res)=>{    
  //  res.sendFile(__dirname+'/indexint.html')
//})

// 404
app.get('*', function (req, res) {
    res.status(404).send('Error 404 - Recurso no encontrado');
});

