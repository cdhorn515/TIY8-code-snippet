var passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

module.exports = {
//   passportInitiate: () => {
//     passport.use(new BasicStrategy(function(username, password, done){
//       Users.findOne({username: username, password: password}).then(function(user) {
//         if (!user) {
//           return done(null ,false);
//         } else {
//           return done(null, username);
//         }
//       });
//     })
//   );
// },
// validateUser: () => {
//   return passport.authenticate('basic', {session: false});
// }
};
