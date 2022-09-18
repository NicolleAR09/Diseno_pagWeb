module.exports = io => {
    io.on('connection', (socket) => {
        console.log('New User Connected');

        socket.on('userCoordinates', coords =>{
            socket.broadcast.emit('newUserCoordinates', coords);
        })
    });
}