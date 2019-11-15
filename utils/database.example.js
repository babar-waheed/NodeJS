const monodb = require('mongodb');
const MongoClinet = monodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    MongoClinet.connect('mongodb+srv://<user>:<password>@<db>.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client =>{
        console.log('********* Connected ******** ');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err)
        throw err;
    })

}

const getDb = () => {
    if(_db){
        return _db
    }
    throw 'No Database connection';

}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
