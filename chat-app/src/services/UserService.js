const { userRepository: { findUser } } = require("../repository");

const findOneUser = (userObject) => findUser(userObject);

module.exports = {
    findOneUser
}