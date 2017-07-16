
var Users = require('../models/users');
var crypto = require('crypto');

var createUser = (username, password) => {
  // console.log(username, password);
  return Users.create({username: username, password: createPasswordHashObj(password)});
};

var createPasswordHashObj = function(password){
 var hash = crypto.pbkdf2Sync(password, 'asdf', 100, 512, 'sha512');
 var hashString = hash.toString('base64');
 // console.log("hashString: ", hashString);
 return {salt: 'asdf', iterations: 100, hash: hashString};
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
  createUser: createUser,
  createPasswordHashObj: createPasswordHashObj,

  login: login
};
