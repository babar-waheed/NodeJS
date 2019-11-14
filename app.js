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

const app = express();

//template engines
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//sequelize relations.
Product.belongsTo(User, {
    constrains: true,
    onDelete: 'CASCADE'
}); 

//User.hasMany(Product); 

sequelize
  //.sync({force: true})
  .sync()
  .then(result => {
    app.listen(3000); 
  })
  .catch(err => {
      console.log(err);
  }) 
