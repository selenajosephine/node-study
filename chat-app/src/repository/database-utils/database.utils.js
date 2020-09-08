const Logger = require('../../utils/logger/Logger');

const getConnection = async () => {
    const { getConnection } = require('../index');
    return await getConnection();
}

const closeConnection = async (conn) => conn.close()

module.exports = {
    getConnection, closeConnection
}