const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Instance of Socket.io
const io = socketio(server);

app.use(router);

io.on('connect', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        const { error, newUser } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(newUser.room);

        // Show message that user is welcome to the room
        socket.emit('message', { user: 'admin', text: `${newUser.name}, welcome to room ${newUser.room}.` });

        // Upgrade users array in room
        io.to(newUser.room).emit('roomData', { room: newUser.room, users: getUsersInRoom(newUser.room) });

        // Notify to all users in the room that current user has joined
        socket.broadcast.to(newUser.room).emit('message', { user: 'admin', text: `${newUser.name} has joined!` });

        callback();
    });


    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left!');

        // Remove user, update user's quanty and notify to all users at room
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));