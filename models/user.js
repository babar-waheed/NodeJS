const monogodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = monogodb.ObjectId;

class User{
    constructor(username, email, cart, id){
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
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

    addToCart(product){

        const db = getDb();
        console.log("MODEL [USER] addToCart(product) product =>", product);
        const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: 1}]}
        console.log("MODEL [USER] addToCart(product) Updated Cart =>", updatedCart);

        return db.collection('users')
            .updateOne(
                {_id: new ObjectId(this._id)},
                {$set: { cart: updatedCart} }
            )
            .then(result => {
                console.log("MODEL [USER] addToCart(product) result =>", result)
            })
            .catch(err => {
                console.log("MODEL [USER] addToCart(product) err =>", err)
            })
      
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product.id
        // });
        
        // const updatedCart = {items: []}

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