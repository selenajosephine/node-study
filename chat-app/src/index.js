const express = require('express');
const path = require('path');
const http = require('http');

const LOGGER = require('./utils/logger/Logger');

const socketio = require('socket.io');
const Filter = require('bad-words');
const {
    generateMessage, generateLocationMessage
} = require('./utils/messageutils');

const { userservice, messageservice } = require('./services');

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
    LOGGER.INFO('New Socket Connection Established');

    socket.on('join', async ({ from, room, to }) => {
        await userservice.addUsersToRoom({ from, room, to });
        socket.join(room);

        // socket.emit('message', generateMessage(`You have now connected with ${seller} `));
        socket.broadcast.to(room).emit('message', generateMessage(`${from} has joined`));

    });

    socket.on('sendMessage', async (message, { from, room, to }, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }
        await messageservice.addNewMessageInRoom({ from, room, to, message });
        io.to('eee_sel_josephine').emit('message', {from, to, message: generateMessage(message)});
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


server.listen(port, () => LOGGER.INFO('express server running on port 3000'));

