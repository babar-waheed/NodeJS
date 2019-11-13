const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'products.json');

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

    constructor(title, image, price, desc){
        this.title = title;
        this.image = image;
        this.price = price;
        this.desc = desc;
    }

    save(){
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            console.log("save(): products " + products);
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log("save():" + err);
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