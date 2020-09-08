const { userRepository } = require("../repository");

const addUsersToRoom = async (roomObj) => await userRepository.addUsersToRoom(roomObj);

module.exports = {
    addUsersToRoom
}