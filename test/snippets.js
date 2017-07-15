var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Snippets = require('../models/snippets');

describe('basic snippet model tests', () => {

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
  ]).then(() => {
    done();
 });
});

afterEach((done) => {
  Snippets.deleteMany({}).then(done());
});

it('test should clean up after itself', (done) => {
  const snippet = new Snippets({title: "api requests", code: "fetch api", language: "node", tags: [{name: "api"}]}).save().then(newSnippet => {
    Snippets.count().then(count => {
      expect(count).to.equal(3);
     done();
   });
  });
});
});

// it('user can create a snippet', (done) => {
//   request(app)
//   .post('/api/snippets', )
// });

describe('basic snippet api endpoint tests', () => {

  beforeEach((done) => {
    Snippets.insertMany([
      {title: "push into arrays",
      code: "var newArray = oldArray.push('valuable_item')",
      language: "javascript",
      tags: [{name: "programming"}]
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

it('user can get a specific snippet by id', (done) => {
  request(app)
  .get('/api/snippets/?id=sql')
  .expect(200)
  .expect((res) => {
    // console.log("RESULT ", res.body);
    expect(2).to.not.equal(1);
    expect(res.body[0].code).to.not.equal("hello");
  }).end(done);
});

it('user can get a list of snippets with a specific tag', (done) => {
  request(app)
  .get('/api/snippets/tags/?name=database')
  .expect(200)
  .expect((res) => {
    // console.log("RESULT", res.body);
    expect(2).to.not.equal(1);
    expect(res.body[0].tags[0].name).to.equal("database");
  }).end(done);
});

it('user can get a list of snippets in a specific language', (done) => {
  request(app)
  .get('/api/snippets/language/?language=javascript')
  .expect(200)
  .expect((res) => {
    expect(res.body[0].title).to.equal("push into arrays");
  }).end(done);
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
