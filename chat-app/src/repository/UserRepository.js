// const { getConnection } = require('./index');
const LOGGER = require('../utils/logger/Logger');

const databaseName = 'chat-users';

const findUser = async ({ username }) => {
    const { getConnection } = require('./index');
    const conn = await getConnection();
    const db = conn.databaseName;
    console.log(db);
    try {
        const results = await db.collection('users').findOne({ username });
        LOGGER.INFO(results);
    }
    catch (err) {
        LOGGER.INFO(err);
    }
    finally {
        await conn.close();
        LOGGER.INFO('Database connection closed');
    }

}

module.exports = {
    findUser
}