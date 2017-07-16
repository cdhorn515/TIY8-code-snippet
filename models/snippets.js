var mongoose = require('mongoose');

var snippetsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true
  },
  notes: String,
  language: {
    type: String,
    required: true
  },
  tags: [{
    name: {
      type: String,
      required: true
    }

  }]
});

var Snippets = mongoose.model('Snippets', snippetsSchema);

module.exports = Snippets;
