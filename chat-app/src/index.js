const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {
    generateMessage, generateLocationMessage
} = require('./utils/messageutils');

const { userservice: { findOneUser } } = require('./services');

const app = express();
// express library does it behind the scenes anyway. 
const server = http.createServer(app);
// to pass the native server, we do the previous line, and pass it to io
const io = socketio(server)
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('new web socket connection established');

    socket.on('join', ({ username, room }) => {
        console.log('username::', username);
        findOneUser(username);
        console.log('inside room');
        socket.join(room);
        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit

        socket.emit('message', generateMessage('Welcome'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`));

    });

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }
        io.to('Sel').emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', ({ latitude, longitude }, callback) => {
        socket.broadcast.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${latitude},${longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A User left'));
    })
});


server.listen(port, () => console.log('express server running on port 3000'));

