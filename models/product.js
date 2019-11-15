const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Product {

    constructor(title, price, description, imageUrl, id){

        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id =  id ? new mongodb.ObjectId(id) : null;
    }

    save(){

        const db = getDb();
        let dbOp;
        if(this._id) {
            dbOp = db.collection('products').updateOne({
                    _id: this._id,
                },
                {
                    $set: this
                }
            );  
        }else{
            dbOp = db.collection('products').insertOne(this);  
        } 

        return dbOp
        .then(result =>{
            console.log("MODEL: save()", "Saved!!!!", " For ID: ", this._id);
        })
        .catch(err => {
            console.log("MODEL: save()", err)
        })

    }

    static fetchAll(){

        console.log("MODEL: fetchAll()");
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products => {
            console.log("MODEL: fetchAll()", products)
            return products;
        })
        .catch(err => {
            console.log("MODEL: fetchAll()", err);
        })
    }

    static findById(prodId){

        console.log("MODEL: findById(prodId)", prodId);

        const db = getDb();
        return db.collection('products')
        .find({_id: new mongodb.ObjectId(prodId)})
        .next()
        .then(product => {
            console.log("MODEL: findById(prodId) ", product);
            return product;
        })
        .catch(err => {
            console.log("MODEL: findById(prodId)", err);
        })

    }

    static deleteById(prodId){

        console.log("MODEL: deleteById(prodId)", prodId);

        const db = getDb();
        return db.collection('products')
        .deleteOne({_id: new mongodb.ObjectId(prodId)})
        .then(result => {
            console.log("MODEL: deleteById(prodId) ", result);
        })
        .catch(err => {
            console.log("MODEL: deleteById(prodId)", err);
        })

    }
}

module.exports = Product;