const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
//routes
// const shopRoutes = require('./routes/shop');
 const adminRoutes = require('./routes/admin');
//mongo 
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

//template engines
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use((req, res, next) => {
    // User.findByPk(1)
    // .then(user => { 
    //     req.user = user
    //     next();
    // })
    // .catch(err => {
    //     console.log(err);
    // })
    next();
});

//routes
 app.use('/admin', adminRoutes);
// app.use(shopRoutes);
// app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})