// CRUD - Create, Read, Update and Delete
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost :27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log(err);
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Selena',
    //     age: 24
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

    db.collection('task').insertMany([
        {
            description: 'Driving lessons',
            completed: true
        },
        {
            description: 'Clean the house',
            completed: false
        },
        {
            description: 'Mop the floor',
            completed: true
        }
    ], (err, result) => {
        if (err) {
            return console.log('error encountered');
        }
        console.log(result.ops);
        
    })
});



