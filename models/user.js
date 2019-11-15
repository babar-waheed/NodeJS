const monogodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = monogodb.ObjectId;

class User{
    constructor(username, email){
        this.username = username;
        this.email = email;
    }

    save(){

        const db = getDb(); 
        return db.collection('user')
            .insertOne(this)
            .then(user => {
                console.log("MODEL User: save()", user);
            })
            .catch(err => {
                console.log("MODEL User ERROR: save()", err);
            })

    }

    static findById(userId){

        console.log("MODEL [USER-ID]:", userId);
        const db = getDb(); 
        return db.collection('users')
            .findOne({_id: new ObjectId(userId)})
            .then(user => {
                console.log("MODEL [USER]: findById()", user);
                return user;
            })
            .catch(err => {
                console.log("MODEL [USER] ERROR: findById()", err);
            })
    }
}

module.exports = User;