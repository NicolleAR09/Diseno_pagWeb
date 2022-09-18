const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

//initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//settings 
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use(require('./routes/routes'));

//sockets
require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//initializing server
server.listen(8000, () => {
    console.log('Server on port 8000');
});