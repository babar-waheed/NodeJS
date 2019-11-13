const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'products.json');
const Cart = require('../models/cart');

const getProductsFromFile = cb =>{

    fs.readFile(p, (err, fileContent) => {
        // console.log("fileContent: " + fileContent)
        // console.log("JSON.parse(fileContent): " + JSON.parse(fileContent))
        if(err){
            return cb([]);
        }
        return cb(JSON.parse(fileContent)); 
    });

}
module.exports = class Product {

    constructor(id, title, image, price, desc){
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.desc = desc;
    }

    save(){
        getProductsFromFile(products => {
            if(this.id){
                const productIndex = products.findIndex(product => product.id === this.id)
                const updatedProducts = [...products];
                updatedProducts[productIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log("save():" + err);
                })
            }else{
                this.id = Math.random().toString();
                console.log("save(): products " + products);
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log("save():" + err);
                })
            }       
        }) 
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            const updatedProducts = products.filter(p => p.id !== id)
            
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
               if(!err){
                    console.log("Deleting:", product);
                    Cart.deleteProduct(id, product.price);
               }
            })
        })
    }

    static fetchAll(cb){
        getProductsFromFile(cb)
    }

    static findById(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product);
        })

    }
}