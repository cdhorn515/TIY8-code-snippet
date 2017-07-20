var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Snippets = require('../models/snippets');



//------------------------
describe('basic snippet model tests', function() {

  beforeEach(function(done) {
    Snippets.deleteMany({}).then(done());
  });

  beforeEach(function(done) {
    Snippets.insertMany([
      {username: "Christina",
      title: "push into arrays",
      code: "var newArray = oldArray.push('valuable_item')",
      language: "javascript",
      tags: [{name: "javascript"}]
    },
    {
      username: "Sami",
      title: "querying databases",
      code: "select * from",
      language: "sql",
      tags: [{name: "database"}]
    },
    {
      username: "Sera",
      title: "test",
      code: "bluebird_of",
      language: "happiness",
      tags: [{name: "database"}]
    }
  ]).then(function(){
    done();
 });
});

afterEach(function(done) {
  Snippets.deleteMany({}).then(done());
});

it('test should clean up after itself', function(done) {
  const snippet = new Snippets({username: "Sami", title: "api requests", code: "fetch api", language: "node", tags: [{name: "api"}]}).save().then(function(newSnippet) {
    Snippets.count().then(function(count) {
      expect(count).to.equal(4);
  }).then(done());
  });
});

it('user can create a new snippet in the db and find with mongoose syntax', function(done) {

  var tags = "database coding";
  console.log("TAGS HERE",tags);
  var tagsArray = tags.split(" ");
  console.log("TAGS ARRAY",tagsArray);

  var newSnippet = new Snippets({username: "Christina", title: "log your way to success", code: "console.log(all_the_things)", language: "java"});

  tagsArray.forEach(function(tag) {
    newSnippet.tags.push({name: tag});
  });
  newSnippet.save().then(function(newSnippet)

  {
    expect(newSnippet.title).to.equal("log your way to success");
    expect(newSnippet.tags[0].name).to.equal("database");
  }).then(done());
 });
});

//api endpoint tests
describe('basic snippet api endpoint tests', function() {
  beforeEach(function(done) {
    Snippets.deleteMany({}).then(done());
  });

  beforeEach(function(done) {
    Snippets.insertMany([
    {
      username: "Christina",
      title: "push into arrays",
      code: "var newArray = oldArray.push('valuable_item')",
      language: "javascript",
      tags: [{name: "javascript"}]
    },
    {
      username: "Sami",
      title: "querying databases",
      code: "select * from",
      language: "sql",
      tags: [{name: "database"}]
    },
    {
      username: "Sera",
      title: "test",
      code: "bluebird_of",
      language: "happiness",
      tags: [{name: "database"}]
    }
  ]).then(function() {
    done();
  });
});

afterEach(function(done) {
  Snippets.deleteMany({}).then(done());
});

it('snippets api endpoint alllows creation of snippet', function(done) {
  var newSnippet = {
    username: "Christina",
    title: "test 2",
    code: "CODING",
    language: "CODE",
    tags: [{name: "database misc"}]
  };
  request(app)
  .post('/api/createSnippet');

  expect(200);
  expect(function(res) {
    Snippets.count().then((count) => {
      expect(count).to.equal(4);
    });
  }).then(done());
});

it('user can get a specific snippet by id', function(done) {
  request(app)
  .get('/api/snippets/:id')
  .expect(200)
  .expect(function(res) {
    // console.log("RESULT ", res.body);
    expect(2).to.not.equal(1);
    expect(res.body[0].code).to.equal("select * from");
  }).then(done());
});

it('user can get a list of snippets with a specific tag', function(done) {
  request(app)
  .get('/api/tags/database')
  .expect(200)
  .expect(function(res) {
    // console.log("RESULT", res.body);
    expect(2).to.not.equal(1);
    expect(res.body[0].tags[0].name).to.not.equal("happiness");
  }).end(done);
});

it('user can get a list of snippets in a specific language', function(done) {
  request(app)
  .get('/api/language/javascript')
  .expect(200)
  .expect(function(res) {
    expect(res.body[0].title).to.equal("push into arrays");
  }).end(done);
});

it('user can get a list of all of their snippets', function(done) {
  request(app)
  .get('/api/snippets')
  .expect(200)
  .expect(function(res) {
    expect(2).to.not.equal(3);
      expect(res.body[0].language).to.equal("javascript");
    }).end(done);
  });
});

//----------------------------------

// basic access api test
describe('basic api endpoint tests', function() {
  it('can access api endpoint and get success back', function(done) {
    request(app)
      .get('/api/sanity')
      //done is a function used in web request tests
       .expect(200, {hello: "christina"}, done);
  });
});
//basic sanity test
describe('sanity test', function() {
  it('should run test', function() {
    expect(1).to.not.equal(5);
  });
});
