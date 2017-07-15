var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
var expressValidator = require('express-validator');
var parseurl = require('parseurl');
var express = require('express');
var session = require('express-session');
var middleware = require('./middleware');
var path = require('path');
var mongoose = require('mongoose');
var routes = require('./routes');
var Snippets = require('./models/snippets');
var Users = require('./models/users');

var app = express();

var crypto = require('crypto');
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;

var nodeEnv = process.env.NODE_ENV || "development";
var config = require('./config.json')[nodeEnv];

mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoURL);
// mongoose.connect('mongodb://localhost:27017/cdc_code_snippet');


app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cats',
  resave: false,
  saveUninitialized: true
}));
// middleware.passportInitiate();
//
// app.use(middleware.validateUser());

// router(app);

app.get('/api/sanity', (req, res) => {
  res.json({hello: "christina"});
});

app.get('/api/snippets', (req, res) => {
  Snippets.find({}).then((snippets) => {
    // console.log(snippets);
    res.json(snippets);
  });
});

app.get('/api/snippets/:language', (req, res) => {
  Snippets.find({language: "javascript"}).then((result) => {
    console.log('RESULT',result);
    res.json(result);
  });
});
//still need to fix, result is undefined
app.get('/api/snippets/:tag', (req, res) => {
  Snippets.find({tags: [{name: "database"}]}).then((result) => {
    console.log("HERE", result);
    res.json(result);
  });
});
//still need to fix, result is undefined
app.get('/api/snippets/:id', (req, res) => {
  var id = "";
  Snippets.find({_id: id}).then((result) => {
    console.log("RESULT2", result);
    res.json(result);
  });
});

app.post('/api/snippets', (req, res) => {
  var newSnippet = new Snippets.create({title: req.body.title}).then((result)=> {
    var addedTags = {tag: req.body.tags[0].name};
    result.tags.push(addedTags);
    result.save().then(() => {
      res.json(newSnippet);
    });
  });
  res.json();
});

// app.listen(3000, (req, res) => {
//   console.log('I\'m listening');
// });
module.exports = app;
