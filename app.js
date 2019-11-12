const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const rootDir = require('./utils/path');
//const expressHB = require('express-handlebars');
const errorController = require('./controllers/error');

const app = express();
//setting template engine.
app.set('view engine', 'ejs');
//setting view folder. 
//Default is alway view but still added it here as an example.
app.set('views', 'views');

//getting shop & admin route.
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: false}));

//setting public static folder for assets
app.use(express.static('public'));

//using routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//Setting up 404 route at the end
app.use(errorController.get404);

app.listen(3000); 