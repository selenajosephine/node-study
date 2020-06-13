// CRUD - Create, Read, Update and Delete
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://localhost :27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log(err);
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);

    db.collection('task').findOne({ _id: new ObjectID('5ed3c003ecb9483eb00c9b91') }, (err, task) => {
        if (err) {
            return console.log(err);
        }
        console.log(task);
    });

    db.collection('task').find({ completed: false }).toArray((err, tasks) => {
        if (err) {
            return console.log(err);
        }
        console.log(tasks);
    });
});



