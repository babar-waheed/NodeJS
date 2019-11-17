const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const csrf = require('csurf');
const errorController = require('./controllers/error');
const User = require('./models/user');
const {USER_PASSWORD} = require('./utils/password'); 

const MONGODB_URI = `mongodb+srv://${USER_PASSWORD}@nodejs-47ykt.mongodb.net/shop`

const app = express();
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const fileStroage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  }, 
  filename: (req, file, cb) => {
    console.log("[APPJS] => FILE: ", file);
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png'
  || file.mimetype === 'image/jpg'
  || file.mimetype === 'image/jpeg'){
    cb(null, true)
  }else{
    cb(null, false);
  }
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: fileStroage}).single('image')); 
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use(
  session({
    secret: 'my secret', 
    resave: false,  
    saveUninitialized: false,  
    store: store
  }) 
);
app.use(csrf())
app.use(flash());

app.use((req, res, next) => {
  console.log("[USER LOGGED IN]??", req.session.isLoggedIn);
  res.locals.isAuthenticated = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken()
  next();
})

app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500'
  });
});

mongoose
.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
