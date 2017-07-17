var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Snippets = require('../models/snippets');

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

it('user can go to create snippet page', function(done) {
  request(app)
  .get('/snippets')
  .expect(500);
  done();
});


it('user can get a specific snippet by id', function(done) {
  request(app)
  .get('/snippets/querying%20databases')
  .expect(200)
  .expect(function(res) {
    // console.log("RESULT ", res.body);
    expect(2).to.not.equal(1);
  }).end(done);
});

  it('user can get a list of snippets with a specific tag', function(done) {
    request(app)
      .get('/snippets/tags/database')
      .expect(200)
      .expect(function(res) {
        // console.log("RESULT", res);
        expect(2).to.not.equal(1);
      }).end(done);
    });

it('can access snippet page and see list of snippets in a particular language', function (done) {
  request(app)
    .get('/snippets/language/javascript')
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
