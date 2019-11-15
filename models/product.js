const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Product {

    constructor(title, price, description, imageUrl){

        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save(){
        const db = getDb();
        return db.collection('products').insertOne(this)
        .then(result =>{
            console.log("MODEL: save()", "Saved!!!!");
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
}

module.exports = Product;