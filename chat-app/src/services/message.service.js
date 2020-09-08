const { messageRepository } = require("../repository");

const addNewMessageInRoom = async (message) => await messageRepository.addNewMessage(message);

module.exports = {
    addNewMessageInRoom
}