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
app.get('/api/sanity', (req, res) => {
  res.json({hello: "christina"});
});
//working in postman and test
app.get('/api/snippets', (req, res) => {
  Snippets.find({}).then((snippets) => {
    // console.log("ALL",snippets);
    res.json(snippets);
  });
});
//working in postman and test if change test to query and remove :language from get
app.get('/api/snippets/language/:language', (req, res) => {
  Snippets.find({language: req.params.language}).then((result) => {
    // console.log("LANGUAGE ", req.query.language);
    res.json(result);
  });
});
//working in postman and test if change test to query  remove :tag from get and change req.params to req.query
app.get('/api/snippets/tags/:tag', (req, res) => {
  var search = req.params.tag;
  // console.log("SEARCH", req);
  Snippets.find({ tags: { $elemMatch: { name: search} } }).then((result) => {
    // console.log("HERE", result[0].tags[0].name);
    res.json(result);
  });
});
//working in postman and test if change test to query  remove :id from get and change req.params to req.query
app.get('/api/snippets/:id', (req, res) => {
  var id = req.query.id;
  Snippets.find({_id: id}).then((result) => {

    res.json(result);
  });
});
//works in postman
app.post('/api/snippets', (req, res) => {
  var newSnippet = new Snippets({title: req.body.title, code: req.body.code, language: req.body.language, $set: {tags: [{name: req.body.name}]}}).save().then((newSnippet)=> {
    console.log("!!!! ", newSnippet.tags);
  res.json(newSnippet);
    });
});

app.listen(3000, (req, res) => {
  console.log('I\'m listening');
});
module.exports = app;
