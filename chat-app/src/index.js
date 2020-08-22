const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
// express library does it behind the scenes anyway. 
const server = http.createServer(app);
// to pass the native server, we do the previous line, and pass it to io
const io = socketio(server)
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// let count = 0;

io.on('connection', (socket) => {
    console.log('new web socket connection established');
    socket.emit('message', 'welcome');
    socket.on('sendMessage', (message) => io.emit('message', message));
});


server.listen(port, () => {
    console.log('express server has started');
});
