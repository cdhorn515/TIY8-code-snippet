/*
app.get('/api/snippets/tags/', (req, res) => {
  // req.params.tags = 'database';
  // console.log(req.query.name);
  var search = req.query.name;
  // console.log("SEARCH", req);
  Snippets.find({ tags: { $elemMatch: { name: search} } }).then((result) => {
    // console.log("HERE", result[0].tags[0].name);
    res.json(result);
  });
});

app.get('/api/snippets/', (req, res) => {
  var id = req.query.id;
  Snippets.find({language: id}).then((result) => {
    res.json(result);
  });
});

app.post('/api/snippets', (req, res) => {
  var newSnippet = new Snippets.create({title: req.body.title}).save().then((result)=> {
    var addedTags = {tag: req.body.tags[0].name};
    result.tags.push(addedTags);
      res.json(newSnippet);
    });
});
*/

////////////////////////////
/*
describe('basic snippet model tests', () => {

  beforeEach((done) => {
    Snippets.insertMany([
      {title: "push into arrays",
      code: "var newArray = oldArray.push('valuable_item')",
      language: "javascript",
      tags: ["javascript"]
    },
    {
      title: "querying databases",
      code: "select * from",
      language: "sql",
      tags: ["database", "query"]
    },
    {
      title: "test",
      code: "bluebird_of",
      language: "happiness",
      tags: ["database"]
    }
  ]).then(() => {
    done();
 });
});

afterEach((done) => {
  Snippets.deleteMany({}).then(done());
});

it('test should clean up after itself', (done) => {
  const snippet = new Snippets({owner: "Sami", title: "api requests", code: "fetch api", language: "node", tags: ["api"]}).save().then(newSnippet => {
    Snippets.count().then(count => {
      expect(count).to.equal(4);
     done();
   });
  });
});
});

describe('basic snippet api endpoint tests', () => {

  beforeEach((done) => {
    Snippets.insertMany([
      {
      owner: "Christina",
      title: "push into arrays",
      code: "var newArray = oldArray.push('valuable_item')",
      language: "javascript",
      tags: ["programming", "array"]
    },
    {
      owner: "Christina",
      title: "querying databases",
      code: "select * from",
      language: "sql",
      tags: ["database", "query"]
    },
    {
      title: "test",
      code: "bluebird_of",
      language: "happiness",
      tags: ["database"]
    }
  ]).then(() => {
    done();
  });
});

afterEach((done) => {
  Snippets.deleteMany({}).then(done());
});

it('user can create a new snippet', (done) => {
  request(app)
  .post('/api/snippets')
  .send({owner: "Sera", title: "log your way to success", code: "console.log(all_the_things)", language: "java", tags: ["database"]})
  .expect(201)
  .expect((res) => {
    Snippets.count().then(count => {
    expect(count).to.equal(10);
  }).save().then(() => {
    done();
  });
});
});

it('user can get a specific snippet by id', (done) => {
  request(app)
  .get('/api/snippets/:id')
  // .get('/api/snippets/?id=sql')
  .expect(200)
  .expect((res) => {
    // console.log("RESULT ", res.body);
    expect(2).to.not.equal(1);
    expect(res.body[0].code).to.not.equal("hello");
  }).end(done);
});

it('user can get a list of snippets with a specific tag', (done) => {
  request(app)
  // .get('/api/snippets/tags/:tag')
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
  .get('/api/snippets/language/:language')
  // .get('/api/snippets/language/?language=javascript')
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
*/
