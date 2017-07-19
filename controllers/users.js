
var Users = require('../models/users');
var crypto = require('crypto');

var createUser = function(username, password) {
  // console.log(username, password);
  return Users.create({username: username, password: createPasswordHashObj(password)});
};

var createPasswordHashObj = function(password, salt=""){
  salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 8);

 var hash = crypto.pbkdf2Sync(password, salt, 100, 512, 'sha512');
 var hashString = hash.toString('base64');
 // console.log("hashString: ", hashString);
 return {salt: salt, iterations: 100, hash: hashString};
};

var login = function(username, password) {
  return Users.findOne({username: username}).then(function(user) {
    if(!user) {
      return false;
    }
    var pwObject = user.password;
    var newPWObject = createPasswordHashObj(password, pwObject.salt);
    return pwObject.hash === newPWObject.hash;
  });
};

module.exports = {
  landing: function(req, res) {
    req.session.user='';
    // var context = {
    //   loggedIn: false,
    //   signedIn: false
    // };
    res.render('signup');
  },

  signupLanding: function(req, res) {
    req.session.user = '';
    // var context = {
    //   loggedIn: false,
    //   signedIn: false
    // };
    res.render('signup');
  },

  loginLanding: function(req, res) {
    req.session.username = '';
    res.render('login');
  },
  //FIX this to use encrypted pw
  createUser: function(req, res) {
      users.create({
        username: req.body.username,
        password: req.body.password
      }).then(function(newUser){
        // console.log('validating');
        req.session.name = req.body.name;
        res.redirect('/home');
        // FIX THIS LINE
      }).catch(function(){
        // console.log('UNIQUE----------- ', error.message);
        var context = {
          msg: "Someone's using that name already, please choose another"
        };
        res.render('signup', context);
// FIX THIS LINE
      }).catch(function () {
        // console.log('VALIDATE----------- ', error.message);
        var context = {
          msg: "Oops, something went wrong, please check your information and try again"
        };
        res.render('signup', context);
      });
    },
//
//   loginLanding: function(req, res) {
//     var context = {
//       loggedIn: false,
//       signedIn: false,
//       loginPage: true
//     };
//     res.render('login', context);
//   },
//   login: function(req, res) {
//     var context = {
//       loggedIn: false,
//       signedIn: false,
//       loginPage: true
//     };
//     //pull data from page entry
//     //findOne in database that matches username
//     var username = req.body.username;
//
//     users.findOne({
//       where: {
//         username: username
//       }
//     }).then(function(user) {
//       var password = req.body.password;
//       if(!user){
//         context = {
//           loggedIn: false,
//           signedIn: false,
//           msg: "Oops! You are not in our database, please complete the sign up form in order to create your account"
//        };
//        res.render('signup', context);
//      } else {
//       //if match then pull database info and store in session
//       if (password === password) {
//         req.session.username = username;
//         req.session.password = password;
//         //returns entire object of user created
//         console.log('user name is: ', req.session.user.name);
//         res.redirect('/home');
// }
// }
};
