var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Snippets = require('../models/snippets');



describe('basic snippet model api endpoint tests', () => {

  beforeEach((done) => {
    Snippets.insertMany([
      {title: "push into arrays",
      code: "var newArray = oldArray.push('valuable_item')",
      language: "javascript",
      tags: [{name: "javascript"}]
    },
    {
      title: "querying databases",
      code: "select * from",
      language: "sql",
      tags: [{name: "database"}]
    }
  ]).then(done());
});

afterEach((done) => {
  Snippets.deleteMany({}).then(done());
});

it('user can get a list of snippets in a specific language', (done) =>{
  request(app)
  .get('/api/snippets/:lang')
  .expect(200, {hello: 'christina'}, done);
});

  it('user can get a list of all of their snippets', (done) => {
    request(app)
    .get('/api/snippets')
    .expect(200)
    .expect((res) => {
      expect(2).to.not.equal(3);
        expect(res.body[0].language).to.equal("javascript");
      }).end(done);

    });
});

describe('basic api endpoint tests', () => {
  it('can access api endpoint and get success back', (done) => {
    request(app)
      .get('/api/sanity')
      //done is a function used in web request tests
       .expect(200, {hello: "christina"}, done);
  });
});


describe('sanity test', () => {
  it('should run test', () => {
    expect(1).to.not.equal(5);
  });
});
