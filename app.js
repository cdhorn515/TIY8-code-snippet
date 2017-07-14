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

var app = express();

var crypto = require('crypto');
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/cdc_code_snippet_db');

var env = process.env.NODE_ENV || "development";
var mongoURL = require('./config.json')[env].mongoURL;

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
middleware.passportInitiate();

app.use(middleware.validateUser());

// router(app);

app.listen(3000, (req, res) => {
  console.log('I\'m listening');
});
