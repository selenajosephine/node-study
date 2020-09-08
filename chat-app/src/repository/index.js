const { MongoClient, ObjectID } = require('mongodb');
const { LOGGER } = require('../utils/logger/Logger');

const connectionURL = 'mongodb://localhost:27017';

const getConnection = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(connectionURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10
        }, (err, client) => {
            if (err) {
                LOGGER.INFO('Unable to connect to Database');
                LOGGER.ERROR(err);
                reject(err);
            }
            LOGGER.INFO('Connected to Database');
            resolve(client);
        });
    })
}


module.exports = {
    getConnection,
    userRepository: require('./user.repository'),
    messageRepository: require('./message.repository')
}