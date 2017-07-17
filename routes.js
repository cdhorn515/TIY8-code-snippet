var snippetController = require('./controllers/snippets');

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
  app.post('/api/snippets', snippetController.createSnippet);

  app.get('/snippets', snippetController.getSnippets);
  //working in postman and test
  app.get('/snippets/language/:language', snippetController.getSnippetsByLanguage);
  //working in postman and test
  app.get('/snippets/tags/:tag', snippetController.getSnippetsByTag);
  //working in postman and test
  app.get('/snippets/:id', snippetController.getSnippetById);
  //works in postman
  app.post('/snippets', snippetController.createSnippet);

};
