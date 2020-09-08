const { LOGGER, dataprocessor: { dataCleanser } } = require('../utils');
const { databaseUtils, databaseConstants } = require('./database-utils');

const addUsersToRoom = async ({ from, room, to }) => {
    LOGGER.INFO('Adding users to a room');
    // Clean the Data
    from = dataCleanser.trimAndCleanseData(from);
    room = dataCleanser.trimAndCleanseData(room);
    to = dataCleanser.trimAndCleanseData(to);

    const reverseRoom = room.split('_');
    const temp = reverseRoom[2];
    reverseRoom[2] = reverseRoom[1];
    reverseRoom[1] = temp;
    const reversedString = reverseRoom.join('_');

    // validate fields
    if (dataCleanser.checkValidity([from, room, to, reversedString])) {
        // get Database Connection
        const conn = await databaseUtils.getConnection();
        const db = conn.db(databaseConstants.CHAT_DATABASE);
        try {

            // Check if the reversed string is a valid room
            const results = await db.collection(databaseConstants.CHAT_ROOMS_COLLECTION).findOne(
                { _id: reversedString }
            );
            // In case the reversed string is valid, proceed with reversed string. 
            if (results && results.length > 0) {
                LOGGER.INFO('Room already exists with a Different Name');
                return "Room already exists";
            }
            
            // Use the room string from socket. 
            const result = await db.collection(databaseConstants.CHAT_ROOMS_COLLECTION).updateOne(
                { _id: room },
                // add if it is not already there - upsert
                { $setOnInsert: { _id: room, from, to } },
                { upsert: true },
            );

            // validate results
            if (!dataCleanser.checkValidity([results.id])) {
                return { error: results };
            }
            if (results.result.ok === 1) {
                LOGGER.INFO('New room created');
                return { results };
            }
            LOGGER.INFO('Room already exists');
            return { results };
        }
        catch (err) {
            LOGGER.ERROR(err);
            return { error: err }
        }

        finally {
            // always release your connection
            await databaseUtils.closeConnection(conn);
            LOGGER.INFO('Database connection closed');
        }
    }
}

module.exports = { addUsersToRoom }