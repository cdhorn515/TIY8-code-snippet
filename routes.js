var snippetController = require('./controllers/snippets');
var userController = require('./controllers/users');

module.exports = function(app) {
  app.get('/api/sanity', snippetController.sanityCheck);
  //working in postman and test
  app.get('/api/snippets', snippetController.getSnippets);
  //working in postman and test
  app.get('/api/snippets/language/:language', snippetController.getSnippetsByLanguage);
  //working in postman and test
  app.get('/api/snippets/tags/:tag', snippetController.getSnippetsByTag);
  //working in postman and test
  app.get('/api/snippets/:id', snippetController.getSnippetById);
  //works in postman
  app.post('/api/snippets/create', snippetController.createSnippet);

  app.get('/sanity', snippetController.endpointSanityCheck);

  app.get('/snippets', snippetController.displayAllSnippets);
  app.get('/snippets/language/:language', snippetController.displaySnippetsByLanguage);

  app.get('/snippets/tags/:tag', snippetController.displaySnippetsByTag);

  app.get('/snippets/:id', snippetController.displaySnippetById);

  app.get('/snippets/create', snippetController.createSnippetLandingPage);

  app.post('/snippets/create', snippetController.createSnippetEndpoint);

  app.get('/', userController.landing);

  app.get('/signup', userController.signupLanding);

  // app.post('/signup', userController.createUser);
  // //
  app.get('/login', userController.loginLanding);
  //
  // app.post('/login', userController.login);


};
