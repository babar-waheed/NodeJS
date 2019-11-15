const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
//routes
 const shopRoutes = require('./routes/shop');
 const adminRoutes = require('./routes/admin');
//mongo 
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

const app = express();

//template engines
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use((req, res, next) => {
    User.findById('5dce52b6acbd4d254fdbf6d6')
    .then(user => { 
        req.user = new User(user.username, user.email, user.cart, user._id);
        console.log("APPJS [USER] req.user: ", req.user); 
        console.log("APPJS [USER]: ", user); 
        next();
    })
    .catch(err => {
        console.log("APPJS [USER]: ", err); 
    })
});

//routes
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
 app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})