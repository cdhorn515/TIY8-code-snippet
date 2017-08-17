var snippetController = require('./controllers/snippets');
var userController = require('./controllers/users');
var passport = require("passport");


module.exports = function(app) {
  app.get('/api/sanity', snippetController.sanityCheck);

  app.get('/api/snippets', passport.authenticate('basic', {session: false}), snippetController.getSnippets);

  app.get('/api/language/:language', passport.authenticate('basic', {session: false}), snippetController.getSnippetsByLanguage);

  app.get('/api/tags/:tag', passport.authenticate('basic', {session: false}), snippetController.getSnippetsByTag);

  app.get('/api/snippets/:id', passport.authenticate('basic', {session: false}), snippetController.getSnippetById);

  app.post('/api/createSnippet', passport.authenticate('basic', {session: false}), snippetController.createSnippet);

  app.get('/sanity', snippetController.endpointSanityCheck);

  app.get('/snippets', snippetController.displayAllSnippets);

  app.get('/language', snippetController.displaySnippetsByLanguage);

  app.get('/tags', snippetController.displaySnippetsByTag);

  app.get('/snippets/:id', snippetController.displaySnippetById);

  app.get('/createSnippet', snippetController.createSnippetLandingPage);

  app.post('/createSnippet', snippetController.createSnippetEndpoint);

  app.get('/', userController.landing);

  app.get('/signup', userController.signupLanding);

  app.post('/signup', userController.userSignup);

  app.get('/login', userController.loginLanding);

  app.post('/login', userController.loginUser);

};
