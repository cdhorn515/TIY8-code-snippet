var Users = require('../models/users');
var crypto = require('crypto');

var createUser = function(username, password) {
  return Users.create({
    username: username,
    password: createPasswordHashObj(password)
  });
};

var createPasswordHashObj = function(password, salt = "") {
  salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 8);
  var hash = crypto.pbkdf2Sync(password, salt, 100, 512, 'sha512');
  var hashString = hash.toString('base64');
  return {
    salt: salt,
    iterations: 100,
    hash: hashString
  };
};

var login = function(username, password) {
  return Users.findOne({
    username: username
  }).then(function(user) {
    if (!user) {
      return false;
    }
    var pwObject = user.password;
    var newPWObject = createPasswordHashObj(password, pwObject.salt);
    return pwObject.hash === newPWObject.hash;
  });
};

module.exports = {
  landing: function(req, res) {
    req.session.username = '';
    var context = {
      loggedIn: false,
      signedIn: false
    };
    res.render('signup', context);
  },

  signupLanding: function(req, res) {
    req.session.username = '';
    var context = {
      loggedIn: false,
      signedIn: false
    };
    res.render('signup', context);
  },

  loginLanding: function(req, res) {
    req.session.username = '';
    var context = {
      loggedIn: false,
      signedIn: false,
      loginPage: true
    };
    res.render('login', context);
  },
  userSignup: function(req, res) {
    if (req.body.password && req.body.username) {
      createUser(req.body.username, req.body.password).then(function(newUser) {
        req.session.username = req.body.username;
        res.redirect('/snippets');
      }).catch(function(error) {
        if (error) {
          var context = {
            msg: "Oops, something went wrong, please check your information and try again"
          };
          res.render('signup', context);
        }
      });
    }
  },

  loginUser: function(req, res) {
    var context = {
      loggedIn: false,
      signedIn: false,
      loginPage: true
    };
    var username = req.body.username;
    login(req.body.username, req.body.password).then(function(result) {
      console.log("LOGGING IN ", result);
      if (result === false) {
        context = {
          loggedIn: false,
          signedIn: false,
          msg: "Oops! You are not in our database, please complete the sign up form in order to create your account"
        };
        res.render('signup', context);
      } else {
        req.session.username = username;
        res.redirect('/snippets');
      }

    });
  }
};
