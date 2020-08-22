const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

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
    socket.emit('message', 'welcome');
    socket.broadcast.emit('message', 'New User has joined');
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }

        io.emit('message', message);
        callback();
    });
    socket.on('sendLocation', ({ latitude, longitude }, callback) => {
        socket.broadcast.emit('message', `https://google.com/maps?q=${latitude},${longitude}`);
        callback();
    });
    socket.on('disconnect', () => {
        io.emit('message', 'A use has left');
    })
});


server.listen(port, () => {
    console.log('express server has started');
});
