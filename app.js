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
// mongoose.connect('mongodb://localhost:27017/cdc_code_snippet_dev');

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cats',
  resave: false,
  saveUninitialized: true
}));
// middleware.passportInitiate();
// app.use(middleware.validateUser());

// routes(app);
//api endpoints
app.get('/api/sanity', (req, res) => {
  res.json({hello: "christina"});
});

app.get('/api/snippets', (req, res) => {
  Snippets.find({}).then((snippets) => {
    // console.log("ALL",snippets);
    res.json(snippets);
  });
});

app.get('/api/snippets/language/:javascript', (req, res) => {
var language = req.params.language;
// var language = "javascript";
  Snippets.find({language: language}).then((result) => {
    // console.log("LANGUAGE ", req.query.language);
    res.json({result});
  });
});
app.get('/api/snippets/tags/:database', (req, res) => {
  // req.params.tags = 'database';
  // console.log(req.query.name);
  var search = req.params.tag;
  // var search = "database";
  // console.log("SEARCH", req);
  Snippets.find({ tags: search }).then((result) => {
    console.log("HERE", result);
    // console.log("HERE", result[0].tags[0].name);
    res.json({result});
  });
});

app.get('/api/snippets/:happiness', (req, res) => {
  // var id = "happiness";
  var id = req.params.id;
  Snippets.find({language: id}).then((result) => {
    res.json({result});
  });
});

app.post('/api/snippets', (req, res) => {
  var newSnippet = new Snippets(req.body).save().then((newSnippet) => {
    // var addedTags = {tag: req.body.tags[0].name};
    // result.tags.push(addedTags);
      res.status(201).json({});
    });
});

/*
app.get('/api/snippets', (req, res) => {
  Snippets.find({}).then((snippets) => {
    // console.log("ALL",snippets);
    res.json(snippets);
  });
});

app.get('/api/snippets/language/', (req, res) => {
  Snippets.find({language: "javascript"}).then((result) => {
    // console.log("LANGUAGE ", req.query.language);
    res.json(result);
  });
});
app.get('/api/snippets/tags/', (req, res) => {
  // req.params.tags = 'database';
  // console.log(req.query.name);
  var search = req.query.name;
  // console.log("SEARCH", req);
  Snippets.find({ tags: { $elemMatch: { name: search} } }).then((result) => {
    // console.log("HERE", result[0].tags[0].name);
    res.json(result);
  });
});

app.get('/api/snippets/', (req, res) => {
  var id = req.query.id;
  Snippets.find({language: id}).then((result) => {
    res.json(result);
  });
});

app.post('/api/snippets', (req, res) => {
  var newSnippet = new Snippets.create({title: req.body.title}).save().then((result)=> {
    var addedTags = {tag: req.body.tags[0].name};
    result.tags.push(addedTags);
      res.json(newSnippet);
    });
});
*/
// app.listen(3000, (req, res) => {
//   console.log('I\'m listening');
// });
module.exports = app;
