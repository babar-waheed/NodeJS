const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({

    title: {
        type: String, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    },
    imageUrl: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }

})

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;

// class Product {

//     constructor(title, price, description, imageUrl, id, userId){

//         console.log("MODEL [Product]: userID", userId)
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id =  id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save(){

//         const db = getDb();
//         let dbOp;
//         if(this._id) {
//             dbOp = db.collection('products').updateOne({
//                     _id: this._id,
//                 },
//                 {
//                     $set: this
//                 }
//             );  
//         }else{
//             dbOp = db.collection('products').insertOne(this);  
//         } 

//         return dbOp
//         .then(result =>{
//             console.log("MODEL Product: save()", "Saved!!!!", " For ID: ", this._id);
//             return result;
//         })
//         .catch(err => {
//             console.log("MODEL Product: save()", err)
//         })

//     }

//     static fetchAll(){

//         console.log("MODEL Product: fetchAll()");
//         const db = getDb();
//         return db.collection('products')
//         .find()
//         .toArray()
//         .then(products => {
//             console.log("MODEL Product: fetchAll()", products)
//             return products;
//         })
//         .catch(err => {
//             console.log("MODEL Product: fetchAll()", err);
//         })
//     }

//     static findById(prodId){

//         console.log("MODEL: findById(prodId)", prodId);

//         const db = getDb();
//         return db.collection('products')
//         .find({_id: new mongodb.ObjectId(prodId)})
//         .next()
//         .then(product => {
//             console.log("MODEL: findById(prodId) ", product);
//             return product;
//         })
//         .catch(err => {
//             console.log("MODEL: findById(prodId)", err);
//         })

//     }

//     static deleteById(prodId){

//         console.log("MODEL Product: deleteById(prodId)", prodId);

//         const db = getDb();
//         return db.collection('products')
//         .deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result => {
//             console.log("MODEL Product: deleteById(prodId) ", result);
//         })
//         .catch(err => {
//             console.log("MODEL Product: deleteById(prodId)", err);
//         })

//     }
// }

// module.exports = Product;