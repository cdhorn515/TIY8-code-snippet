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
      Snippets.find({title: id}).then((result) => {
        res.json(result);
      });
  },

  createSnippet: (req, res) => {
    var newSnippet = new Snippets({title: req.body.title, code: req.body.code, language: req.body.language, $set: {tags: [{name: req.body.name}]}}).save().then((newSnippet)=> {
      console.log("!!!! ", newSnippet.tags);
    res.json(newSnippet);
      });
  },
  endpointSanityCheck: (req, res) => {
    res.send({hello: "christina"});
  },

  displayAllSnippets: (req, res) => {
      // console.log("ALL",snippets);
      var context = {
        loggedIn: true,
        username: req.session.username,
      };
      Snippets.find({}).then((snippets) => {
        context.model = snippets;
console.log("HERE", snippets);
      res.render('home', context);
    });
  },

  displaySnippetsByLanguage: (req, res) => {
    var context = {
      loggedIn: true,
      username: req.session.username,
    };
    Snippets.find({language: req.params.language}).then((result) => {
      console.log("LANGUAGE ", req.params.language);
      res.render('home', context);
    });
  },

  displaySnippetsByTag: (req, res) => {
    var search = req.params.tag;
    // console.log("SEARCH", req);
    Snippets.find({ tags: { $elemMatch: { name: search} } }).then((result) => {
      console.log("HERE", result[0].tags[0].name);
      res.render('home');
    });
  },

  displaySnippetById: (req, res) => {
      var id = req.params.id;
      Snippets.find({title: id}).then((result) => {
        res.render('home');
      });
  },

  // createSnippet: (req, res) => {
  //   var newSnippet = new Snippets({title: req.body.title, code: req.body.code, language: req.body.language, $set: {tags: [{name: req.body.name}]}}).save().then((newSnippet)=> {
  //   res.json(newSnippet);
  //     });
  // }

};
