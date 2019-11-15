const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
//routes
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
//sequelize
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

//template engines
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => { 
        req.user = user
        next();
    })
    .catch(err => {
        console.log(err);
    })
});

//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//sequelize relations.

Product.belongsTo(User, {
    constrains: true,
    onDelete: 'CASCADE'
}); 
User.hasMany(Product); 

User.hasOne(Cart); 
Cart.belongsTo(User)

Cart.belongsToMany(Product, {
    through: CartItem
});

Product.belongsToMany(Cart, {
    through: CartItem
});



sequelize
  //.sync({force: true})
  .sync()
  .then(result => {
      return User.findByPk(1)   
  })
  .then(user => {
      if(!user){
          return User.create({name: 'Babar', email: 'babar.waheed@gmail.com'})
      }
      return user;
  })
  .then(user => {
    //console.log("USER!!!", user);
    app.listen(3000);
  })
  .catch(err => {
      console.log(err); 
  }) 
