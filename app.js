const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    app.listen(3000); 
  }) 
