const { messageutils, LOGGER } = require("../utils");
const { userservice } = require("../services");
const SOCKETCONSTANTS = require("./socket.constants");

const addUserToARoom = async ({ from, room, to }, socket) => {
    LOGGER.INFO('join event identified');
    const { results } = await userservice.addUsersToRoom({ from, room, to });
    socket.join(room);

    // Send message from Admin
    socket.broadcast.to(room).emit(SOCKETCONSTANTS.MESSAGE, {
        from: SOCKETCONSTANTS.ADMIN, to, message: messageutils.generateMessage(`${from} has joined`)
    });
    LOGGER.INFO('message broadcast event emitted');
}

const disconnectUser = (io) => {
    LOGGER.INFO('disconnect event identified');
    io.emit(SOCKETCONSTANTS.MESSAGE, {
        from: SOCKETCONSTANTS.ADMIN, message: messageutils.generateMessage(`A user left`)
    })

    LOGGER.INFO('message event emitted');
}


module.exports = { addUserToARoom, disconnectUser }