const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')
const {SEND_GRID_API_KEY} = require('../utils/password');
const User = require('../models/user');

const transporter = nodemailer.createTransport(sendGridTransport({
  auth: { 
    api_key: SEND_GRID_API_KEY
  }
}));

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: req.flash("error")
  });
};

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
    .then(user => {
      if(user){
        console.log("CONTROLLER [AUTH]: USER EXISTS", user);
         bcrypt.compare(password, user.password)
          .then(doMatch => {
            if(doMatch){
              console.log("CONTROLLER [AUTH]: PASSWORD DID MATCH", doMatch);
              req.session.user = user;
              req.session.isLoggedIn = true;
              return req.session.save(err => {
                console.log("CONTROLLER [AUTH]: ERROR SAVING SESSION???", err);
                res.redirect('/');
              })
            }else{
              console.log("CONTROLLER [AUTH]: PASSWORD DIDN'T MATCH");
              req.flash("error", "Invalid email / password");
              return res.redirect("/login");
            }
          })
          .catch(err => {
            console.log("CONTROLLER [AUTH]: postLogin ERROR", err);
          })
      }else{
        req.flash("error", "Invalid email / password");
        return res.redirect("/login")
      }    
    })
    .catch(err => console.log(err));
};

exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: req.flash('error')
  });
}

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({email: email})
    .then(user => {
      if(user){
        req.flash('error', 'Email Already Exists');
        return res.redirect('/signup');
      }else{

        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              email: email,
              password: hashedPassword,
              cart: { items : []}
            })
            return user.save();
          })
          .then(result => {
            res.redirect('/login');

            transporter.sendMail({
              to: email,
              from: "shop@nodeJS.com",
              subject: "Sign up",
              html: "<h1>Sign up successfull</h1>"
            })
            .catch(err => {
              console.log(err);
            })
           
          })
          .catch(err => {
            console.log(err);
          })

      }
    })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: req.flash("error")
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'shop@nodeJS.com',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: req.flash("error"),
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {

  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};

