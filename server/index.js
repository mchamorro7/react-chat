const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Instance of Socket.io
const io = socketio(server);

app.use(router);



io.on('connect', (socket) => {
    console.log('New Connection!');

    socket.on('disconnect', () => {
        console.log('User had left!');
    })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));