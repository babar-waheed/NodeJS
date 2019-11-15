const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const USER_PASSWORD = require('./utils/password');
//routes
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
//mongoose
const mongoose = require('mongoose')
//const User = require('./models/user');

const app = express();

//template engines
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use((req, res, next) => {
    // User.findById('5dce52b6acbd4d254fdbf6d6')
    // .then(user => { 
    //     req.user = new User(user.username, user.email, user.cart, user._id);
    //     console.log("APPJS [USER] req.user: ", req.user); 
    //     console.log("APPJS [USER]: ", user); 
    //     next();
    // })
    // .catch(err => {
    //     console.log("APPJS [USER]: ", err); 
    // })
    next();
});

//routes
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
 app.use(errorController.get404);

mongoose.connect(`mongodb+srv://${USER_PASSWORD}@nodejs-47ykt.mongodb.net/shop?retryWrites=true&w=majority`)
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})