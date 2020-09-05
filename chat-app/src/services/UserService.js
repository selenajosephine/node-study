const { userRepository } = require("../repository");

const addUserIfUserDoesNotPreExist = async (userObject) => await userRepository.addUser(userObject);

const findUserWithUsername = async (username) => await userRepository.getUser(username);

const removeUserWithUsername = async (username) => await userRepository.removeUser(username);

const findUsersInARoom = async (room) => await userRepository.getUsersInRoom(room);

const addUsersToRoom = async (roomObj) => await userRepository.addUsersToRoom(roomObj);

module.exports = {
    addUserIfUserDoesNotPreExist, findUserWithUsername, removeUserWithUsername, findUsersInARoom, 
    addUsersToRoom
}