Snippets = require('../models/snippets');


module.exports = {
  sanityCheck: (req, res) => {
    res.json({hello: "christina"});
  },

  getSnippets: (req, res) => {
    Snippets.find({}).then((snippets) => {
      // console.log("ALL",snippets);
      res.json(snippets);
    });
  },

  getSnippetsByLanguage: (req, res) => {
    Snippets.find({language: req.params.language}).then((result) => {
      // console.log("LANGUAGE ", req.query.language);
      res.json(result);
    });
  },

  getSnippetsByTag: (req, res) => {
    var search = req.params.tag;
    // console.log("SEARCH", req);
    Snippets.find({ tags: { $elemMatch: { name: search} } }).then((result) => {
      // console.log("HERE", result[0].tags[0].name);
      res.json(result);
    });
  },

  getSnippetById: (req, res) => {
      var id = req.params.id;
      Snippets.find({_id: id}).then((result) => {
        res.json(result);
      });
  },

  createSnippet: (req, res) => {

      var tags = req.body.tags;
      console.log("TAGS HERE",tags);
      var tagsArray = req.body.tags.split(" ");
      console.log("TAGS ARRAY",tagsArray);
      var newSnippet = new Snippets({username: req.body.username, title: req.body.title, code: req.body.code, language: req.body.language, notes: req.body.notes});

      tagsArray.forEach(function(tag) {
        newSnippet.tags.push({name: tag});
      });

      newSnippet.save();

    res.json(newSnippet);
      // });
  },
  endpointSanityCheck: (req, res) => {
    res.send({hello: "christina"});
  },

  displayAllSnippets: (req, res) => {
      // console.log("ALL",snippets);
      var context = {
        signedIn: true,
        username: req.session.username,
      };
      Snippets.find({}).then((snippets) => {
        context.model = snippets;
// console.log("HERE", snippets);
      res.render('home', context);
    });
  },

  displaySnippetsByLanguage: (req, res) => {
    var context = {
      signedIn: true,
      username: req.session.username,
    };
    Snippets.find({language: req.query.language}).then((result) => {
      // console.log("LANGUAGE ", req.params.language);
      context.model = result;
      res.render('search', context);
    });
  },

  displaySnippetsByTag: (req, res) => {
    var search = req.query.tag;
    var context = {
      signedIn: true,
      username: req.session.username,
    };
    Snippets.find({ tags: { $elemMatch: { name: search} } }).then((result) => {
    var model = [];
    for (var i = 0; i < result.length; i++) {

          console.log(result[i]);
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
      Snippets.find({_id: id}).then((result) => {
        console.log("ID ", result);
        context.model = result;
        res.render('search');
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
    console.log("TAGS HERE",tags);
    var tagsArray = req.body.tags.split(" ");
    console.log("TAGS ARRAY",tagsArray);
    var newSnippet = new Snippets({username: req.body.username, title: req.body.title, code: req.body.code, language: req.body.language});

    tagsArray.forEach(function(tag) {
      newSnippet.tags.push({name: tag});
    });

    newSnippet.save();

    res.redirect('/snippets');
      // }
    // );
  }

};
