const LOGGER = require('../utils/logger/Logger');
const { dataCleanser } = require('../utils/data-processor');
const { databaseUtils, databaseConstants } = require('./database-utils');

/**
 * To do in User Repository
 * 1. addUser
 * 2. removeUser
 * 3. getUser
 * 4. getUsersInRoom
 */
const findUser = async (db, username) => await db.collection(databaseConstants.CHAT_USERS_COLLECTION).findOne({ _id: username });

const addUser = async ({ id = 12312, username, room }) => {

    // Clean the data 
    username = dataCleanser.trimAndCleanseData(username);
    room = dataCleanser.trimAndCleanseData(room);

    // Validate the data
    if (dataCleanser.checkValidity([username, room]))
        return { error: 'Username and room are required' };

    // get Database Connection
    const conn = await databaseUtils.getConnection();
    const db = conn.db(databaseConstants.CHAT_DATABASE);

    try {

        // Check for existing user; if user does not exist, create
        await db.collection(databaseConstants.CHAT_USERS_COLLECTION).updateOne(
            { _id: username },
            { $setOnInsert: { _id: username, username: username, password: 'test', isActive: true } },
            { upsert: true },
        );

        // Get the user details for username
        const results = findUser(db, username);
        LOGGER.INFO(results);
        return results;
    }
    catch (err) { LOGGER.ERROR(err); }
    finally {
        // always release your connection
        await databaseUtils.closeConnection(conn);
        LOGGER.INFO('Database connection closed');
    }
}

const removeUser = async (username) => {

}

const getUsersInRoom = async () => {

}

const getUser = async (username) => {
    // Clean the Data
    username = dataCleanser.trimAndCleanseData(username);

    // validate fields
    if (dataCleanser.checkValidity([username])) {

        // get Database Connection
        const conn = await databaseUtils.getConnection();
        const db = conn.db(databaseConstants.CHAT_DATABASE);
        try {
            // get User details from database with username
            const results = findUser(db, username);
            LOGGER.INFO(results);
            return results;
        }
        catch (err) { LOGGER.ERROR(err); }

        finally {
            // always release your connection
            await databaseUtils.closeConnection(conn);
            LOGGER.INFO('Database connection closed');
        }
    }
}

const addUsersToRoom = async ({ buyer, room, seller }) => {
    // Clean the Data
    buyer = dataCleanser.trimAndCleanseData(buyer);
    room = dataCleanser.trimAndCleanseData(room);
    seller = dataCleanser.trimAndCleanseData(seller);

    // validate fields
    if (dataCleanser.checkValidity([buyer, room, seller])) {
        // get Database Connection
        const conn = await databaseUtils.getConnection();
        const db = conn.db(databaseConstants.CHAT_DATABASE);

        await db.collection(databaseConstants.CHAT_ROOMS_COLLECTION).updateOne(
            { _id: room },
            { $setOnInsert: { _id: room, buyer, seller } },
            { upsert: true },
        );


    }

}


module.exports = {
    addUser, removeUser, getUser, getUsersInRoom, addUsersToRoom
}