var snippetController = require('./controllers/snippets');
var userController = require('./controllers/users');

module.exports = function(app) {
  app.get('/api/sanity', snippetController.sanityCheck);

  app.get('/api/snippets', snippetController.getSnippets);

  app.get('/api/language/:language', snippetController.getSnippetsByLanguage);

  app.get('/api/tags/:tag', snippetController.getSnippetsByTag);

  app.get('/api/snippets/:id', snippetController.getSnippetById);

  app.post('/api/createSnippet', snippetController.createSnippet);

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
