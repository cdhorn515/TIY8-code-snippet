Snippets = require('../models/snippets');


module.exports = {
  sanityCheck: (req, res) => {
    res.json({
      hello: "christina"
    });
  },

  getSnippets: (req, res) => {
    Snippets.find({}).then((snippets) => {
      res.json(snippets);
    });
  },

  getSnippetsByLanguage: (req, res) => {
    Snippets.find({
      language: req.params.language
    }).then((result) => {
      res.json(result);
    });
  },

  getSnippetsByTag: (req, res) => {
    var search = req.params.tag;
    middleware.passportInitiate();
    app.use(middleware.validateUser());
    Snippets.find({
      tags: {
        $elemMatch: {
          name: search
        }
      }
    }).then((result) => {
      res.json(result);
    });
  },

  getSnippetById: (req, res) => {
    var id = req.params.id;
    Snippets.find({
      _id: id
    }).then((result) => {
      res.json(result);
    });
  },

  createSnippet: (req, res) => {
    var tags = req.body.tags;
    var tagsArray = req.body.tags.split(" ");
    var newSnippet = new Snippets({
      username: req.session.username,
      title: req.body.title,
      code: req.body.code,
      language: req.body.language,
      notes: req.body.notes
    });

    tagsArray.forEach(function(tag) {
      newSnippet.tags.push({
        name: tag
      });
    });

    newSnippet.save();

    res.json(newSnippet);
    // });
  },
  endpointSanityCheck: (req, res) => {
    res.send({
      hello: "christina"
    });
  },

  displayAllSnippets: (req, res) => {
    var context = {
      signedIn: true,
      username: req.session.username,
    };
    Snippets.find({username: req.session.username}).then((snippets) => {
      context.model = snippets;
      res.render('home', context);
    });
  },

  displaySnippetsByLanguage: (req, res) => {
    var context = {
      signedIn: true,
      username: req.session.username,
      model: [],
      languageSearch: req.query.language,
      searchBy: true,
    };
    Snippets.find({username: req.session.username,
      language: req.query.language
    }).then(function(result) {

      for (var i = 0; i < result.length; i++) {
        context.model.push(result[i]);
      }
      context.model = result;
      res.render('search', context);
    });
  },

  displaySnippetsByTag: (req, res) => {
    var search = req.query.tag;
    var context = {
      signedIn: true,
      username: req.session.username,
      model: [],
      tagSearch: req.query.tag,
      searchBy: true,
    };
    Snippets.find({username: req.session.username,
      tags: {
        $elemMatch: {
          name: search
        }
      }
    }).then((result) => {
      for (var i = 0; i < result.length; i++) {
        context.model.push(result[i]);
      }
      res.render('search', context);
    });
  },

  displaySnippetById: (req, res) => {
    var id = req.params.id;
    var context = {
      signedIn: true,
      username: req.session.username,
    };
    Snippets.find({
      _id: id
    }).then((result) => {
      context.model = result;
      res.render('search', context);
    });
  },

  createSnippetLandingPage: (req, res) => {
    var context = {
      signedIn: true,
      username: req.session.username,
    };
    res.render('createSnippet', context);
  },
  createSnippetEndpoint: (req, res) => {
    var context = {
      signedIn: true,
      username: req.session.username,
    };
    var tags = req.body.tags;
    var tagsArray = req.body.tags.split(" ");
    var newSnippet = new Snippets({
      username: req.session.username,
      title: req.body.title,
      code: req.body.code,
      language: req.body.language,
      notes: req.body.notes
    });

    tagsArray.forEach(function(tag) {
      newSnippet.tags.push({
        name: tag
      });
    });

    newSnippet.save();

    res.redirect('/snippets');
  }

};
