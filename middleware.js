var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Users = require('./models/users');

module.exports = {

 passportInitiate: () => {
       passport.use(new BasicStrategy(function(username, password, done){
         Users.findOne({username: username, password: password}).then(function(user) {
        if (!user) {
          return done(null ,false);
       } else {
           return done(null, username);
         }
       });
     })
   );
 },

 validateUser: () => {
   return passport.authenticate('basic', {session: false});
 }
};
