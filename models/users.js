var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    iterations: Number,
    salt: String,
    hash: String
  }
});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
