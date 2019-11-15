// const monogodb = require('mongodb');
// const getDb = require('../utils/database').getDb;

// const ObjectId = monogodb.ObjectId;

// class User{
//     constructor(username, email, cart, id){
//         this.username = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }

//     save(){

//         const db = getDb(); 
//         return db.collection('user')
//             .insertOne(this)
//             .then(user => {
//                 console.log("MODEL User: save()", user);
//             })
//             .catch(err => {
//                 console.log("MODEL User ERROR: save()", err);
//             })

//     }

//     addToCart(product){
        
//         const db = getDb();

//         let updatedQty = 1;
//         let updatedItems = [...this.cart.items];

//         const cartProductIndex = updatedItems.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         });

//         if(cartProductIndex >= 0){
//             updatedItems[cartProductIndex].quantity = updatedItems[cartProductIndex].quantity + 1;
//         }else{
            
//             updatedItems.push({
//                 productId: new ObjectId(product._id), 
//                 quantity: updatedQty
//             })
        
//         }

//         console.log("MODEL [USER] **** UPDATED CART ITEMS **** =>", updatedItems)

//         const updatedCart = { items: updatedItems }

//         return db.collection('users')
//             .updateOne(
//                 {_id: new ObjectId(this._id)},
//                 {$set: { cart: updatedCart} }
//             )
//             .then(result => {
//                 return result;
//                 //console.log("MODEL [USER] addToCart(product) result =>", result)
//             })
//             .catch(err => {
//                 console.log("MODEL [USER] addToCart(product) err =>", err)
//             })

//     }

//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })

//         return db.collection('products').find({_id: {
//             $in: productIds
//         }})
//         .toArray()
//         .then(products => {
//             return products.map(p => {
//                 return {...p, quantity: this.cart.items.find(i => {
//                         return i.productId.toString() === p._id.toString()
//                     }).quantity
//                 }
//             })
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }

//     deleteItemFromCart(productId){
//         const db = getDb(); 
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString()
//         });

//         return db.collection('users')
//             .updateOne(
//                 {_id: new ObjectId(this._id)},
//                 {$set: { cart: {items: updatedCartItems } } }
//             )
//     }

//     addOrder(){
        
//         const db = getDb();

//         return this.getCart()
//             .then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new ObjectId(this._id),
//                     email: this.email,
//                     username: this.username
//                 }
//             }; 

//             return db.collection('orders').insertOne(order);
//         })
//         .then(result => {
//             this.cart = { items : []}
//             return db.collection('users')
//             .updateOne(
//                 {_id: new ObjectId(this._id)},
//                 {$set: { cart: {items: [] } } }
//             )
//         })
//     }

//     getOrders(){
//         const db = getDb();  
//         return db.collection('orders')
//             .find({'user._id': new ObjectId(this._id)})
//             .toArray()

//     }

//     static findById(userId){

//         console.log("MODEL [USER-ID]:", userId);
//         const db = getDb(); 
//         return db.collection('users')
//             .findOne({_id: new ObjectId(userId)})
//             .then(user => {
//                 console.log("MODEL [USER]: findById()", user);
//                 return user;
//             })
//             .catch(err => {
//                 console.log("MODEL [USER] ERROR: findById()", err);
//             })
//     }
// }

// module.exports = User;