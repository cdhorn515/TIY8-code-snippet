var snippetController = require('./controllers/snippets');

module.exports = function(app) {
  // app.get('/api/sanity', snippetController.sanityCheck);
  // //working in postman and test
  // app.get('/api/snippets', snippetController.getSnippets);
  // //working in postman and test if change test to query and remove :language from get
  // app.get('/api/snippets/language/:language', snippetController.getSnippetsByLanguage);
  // //working in postman and test if change test to query  remove :tag from get and change req.params to req.query
  // app.get('/api/snippets/tags/:tag', snippetController.getSnippetByTags);
  // //working in postman and test if change test to query  remove :id from get and change req.params to req.query
  // app.get('/api/snippets/:id', snippetController.getSnippetById);
  // //works in postman
  // app.post('/api/snippets', snippetController.createSnippet);
};
