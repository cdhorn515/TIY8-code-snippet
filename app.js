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
// var config = require('./config.json')[nodeEnv];

mongoose.Promise = require('bluebird');
let mongoURL;

if (nodeEnv === "production") {
  mongoURL = process.env.MONGODB_URI;
} else {
  mongoURL = require("./config.json")[environment].mongoURL;
}

// mongoose.connect(config.mongoURL);
mongoose.connect(mongoURL);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
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

routes(app);



app.listen(process.env.PORT || 3000, function(req, res) {
  console.log('I\'m listening');
});

module.exports = app;
