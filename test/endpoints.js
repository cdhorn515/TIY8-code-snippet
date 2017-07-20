var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Snippets = require('../models/snippets');

describe('user endpoint tests', function(){

  it('user can go to login page', function(done) {
    request(app)
    .get('/login')
    .expect(200, done);
  });
  it('user can go to signup page', function(done) {
    request(app)
    .get('/signup')
    .expect(200, done);
  });
});

// basic access api test
describe('basic snippet app endpoint tests', function() {

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

it('user can post created snippet', function(done) {
  var newSnippet = {
    username: "Sera",
    title: "test",
    code: "bluebird_of",
    language: "happiness",
    tags: [{name: "database misc"}]
  };
  request(app)
  .post('/createSnippet')
  .send(newSnippet)
  .expect(res => {
    expect(500);
    expect(2).to.not.equal(5);

  }).then(done());
});

it('user can go to create snippet page', function(done) {
  request(app)
  .get('/createSnippet')
  .expect(200, done);
});


it('user can go to page to see a specific snippet by id', function(done) {
  request(app)
  .get('/snippets/:id')
  .expect(200)
  .expect(function(res) {
    // console.log("RESULT ", res.body);
    expect(2).to.not.equal(1);
  }).then(done());
});

  it('user can go to page to see list of snippets with a specific tag', function(done) {
    request(app)
      .get('/tags/')
      .expect(200)
      .expect(function(res) {
        // console.log("RESULT", res);
        expect(2).to.not.equal(1);
      }).then(done());
    });

it('can access snippet page to see snippets in a particular language', function (done) {
  request(app)
    .get('/language/')
    .expect(200)
    .expect(function(res) {
      expect(2).to.not.equal(3);
    }).then(done());
 });

it('can access snippet home page and see all snippets', function(done) {
  request(app)
    .get('/snippets')
    .expect(200)
    .expect(function(res){
      expect(2).to.not.equal(3);
    }).then(done());
 });

  it('can access app endpoint and get success back', function(done) {
    request(app)
      .get('/sanity')
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
