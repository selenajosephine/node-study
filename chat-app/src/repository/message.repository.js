const { LOGGER, dataprocessor: { dataCleanser } } = require('../utils');
const { databaseUtils, databaseConstants } = require('./database-utils');

const addNewMessage = async ({ from, room, to, message }) => {
    LOGGER.INFO('Adding a new message to Database');

    // Clean the Data
    from = dataCleanser.trimAndCleanseData(from);
    room = dataCleanser.trimAndCleanseData(room);
    to = dataCleanser.trimAndCleanseData(to);
    message = dataCleanser.trimAndCleanseData(message.url);

    // validate fields
    if (dataCleanser.checkValidity([from, room, to, message])) {
        // get Database Connection
        const conn = await databaseUtils.getConnection();
        const db = conn.db(databaseConstants.CHAT_DATABASE);

        try {
            // Add database with message
            const results = await db.collection(databaseConstants.CHAT_MESSAGES).insertOne({
                room, from, to,
                message, createdDate: new Date()
            });
            LOGGER.INFO(`message insertion status is ${!!(results.result.ok === 1)}`);
            return !!(results.result.ok === 1);
        }
        catch (err) { LOGGER.ERROR(err); }
        finally {
            // always release your connection
            await databaseUtils.closeConnection(conn);
            LOGGER.INFO('Database connection closed');
        }
    }
}

module.exports = {
    addNewMessage
}