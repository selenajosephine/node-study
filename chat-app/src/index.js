const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const LOGGER = require('./utils/logger/Logger');
const { userOperations, messageOperations, SOCKETCONSTANTS } = require('./socket-operations');

const app = express();

// express library does it behind the scenes anyway. 
const server = http.createServer(app);

// to pass the native server, we do the previous line, and pass it to io
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

io.on(SOCKETCONSTANTS.CONNECT, (socket) => {
    LOGGER.INFO('New Socket Connection Established');

    socket.on(SOCKETCONSTANTS.JOIN, async (data) => await userOperations.addUserToARoom(data, socket));

    socket.on(SOCKETCONSTANTS.SEND_MESSAGE, async (message, data, callback) => await messageOperations.saveMessage(message, data, callback, io));

    socket.on(SOCKETCONSTANTS.SEND_LOCATION, async (data, callback) => await messageOperations.saveLocation(data, callback, io))

    socket.on(SOCKETCONSTANTS.DISCONNECT, () => userOperations.disconnectUser(io));
});


server.listen(port, () => LOGGER.INFO('express server running on port 3000'));

