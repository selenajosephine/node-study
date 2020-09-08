const Filter = require('bad-words');
const { messageutils, LOGGER } = require("../utils");
const { messageservice } = require('../services');
const SOCKETCONSTANTS = require('./socket.constants');

const saveMessage = async (message, { from, room, to }, callback, io) => {
    LOGGER.INFO('sendMessage event identified')
    const filter = new Filter();
    if (filter.isProfane(message)) {
        LOGGER.INFO('Profanity detected');
        return callback('Profanity is not allowed');
    }

    // service to inser message in db
    await messageservice.addNewMessageInRoom({ from, room, to, message });

    // share message to other user in this room
    io.to(room).emit(SOCKETCONSTANTS.MESSAGE, { from, to, message: messageutils.generateMessage(message) });
    LOGGER.INFO('message event emitted');
    callback();
}

const saveLocation = async ({ latitude, longitude, from, room, to }, callback, io) => {
    LOGGER.INFO('sendLocation event identified');
    const url = messageutils.generateLocationMessage(`https://google.com/maps?q=${latitude},${longitude}`);

    // service to inser message with location in db 
    await messageservice.addNewMessageInRoom({ from, room, to, message: url });

    // share message to other user in this room
    io.to(room).emit(SOCKETCONSTANTS.LOCATION, { from, to, url });
    LOGGER.INFO('location event emitted');
    callback();
}

module.exports = {
    saveMessage, saveLocation
}