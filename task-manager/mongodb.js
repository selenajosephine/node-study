// CRUD - Create, Read, Update and Delete
const { MongoClient, ObjectID } = require('mongodb');

const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString().length);
console.log(id.getTimestamp());
const connectionURL = 'mongodb://localhost :27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log(err);
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Selena Josephine Ponmani',
    //     age: 24,
    //     _id: id
    // },(err,data)=>{
    //     if(err){
    //         return console.log('err',err);
    //     }
    //     console.log(data.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ],(err, result)=>{
    //     if(err){
    //         return console.log(err,'Error Exists');
    //     }
    //     console.log(result.ops);
    // })

    // this inserts many tasks
    // db.collection('task').insertMany([
    //     {
    //         description: 'Driving lessons',
    //         completed: true
    //     },
    //     {
    //         description: 'Clean the house',
    //         completed: false
    //     },
    //     {
    //         description: 'Mop the floor',
    //         completed: true
    //     }
    // ], (err, result) => {
    //     if (err) {
    //         return console.log('error encountered');
    //     }
    //     console.log(result.ops);
    // })


});



