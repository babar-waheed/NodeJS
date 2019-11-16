const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const USER_PASSWORD = require('./utils/password');
//routes
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
//mongoose
const mongoose = require('mongoose')
const User = require('./models/user');

const app = express();

//template engines
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use((req, res, next) => {
    User.findById('5dcf5bf1b913434254ac3787')
    .then(user => { 
        req.user = user
        console.log("APPJS [USER] req.user: ", req.user); 
        next();
    })
    .catch(err => {
        console.log("APPJS [USER]: ", err); 
    })
    //next();
});

//routes
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
 app.use(errorController.get404);

mongoose.connect(`mongodb+srv://${USER_PASSWORD}@nodejs-47ykt.mongodb.net/shop?retryWrites=true&w=majority`)
.then(result => {

    User.findOne().then(user => {
        if(!user){
            const user = new User({
                username: "Babs",
                email: 'babar.waheed@gmail.com',
                cart: { 
                    items: []
                }
            })
            user.save(); 
        }
    })
    
    app.listen(3000);
}) 
.catch(err => {
    console.log(err);
})