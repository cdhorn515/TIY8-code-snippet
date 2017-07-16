
var expect = require('chai').expect;
var createUser = require('../controllers/users').createUser;
var request = require('supertest');
var app = require('../app');
var Users = require('../models/users');
var createPasswordHashObj = require('../controllers/users').createPasswordHashObj;
var hashString = require('../controllers/users').hashString;
var login = require('../controllers/users').login;

describe('user model tests', () => {
  afterEach(function(done){
  Users.deleteMany({}).then(function(){
    done();
  });
});

it('will not login if invalid user', function(done){
  createUser('sami', 'treats').then(function(user){
  login('sera', 'treats').then(function(result) {
    expect(result).to.equal(false);
    done();
  });
});
});

  it('will not log in if invalid password', function(done) {
    createUser('sami', 'treats').then(function(user){
      login('sami', 'peanutbutter').then(function(result) {
        expect(result).to.equal(false);
        done();
      });
    });
  });

  it('can log in and return true if valid login', function(done) {
    createUser('sami', 'treats').then(function(user){
      login('sami', 'treats').then(function(result) {
        expect(result).to.equal(true);
        done();
      });
    });
  });

  it('can generate a password hash from a string', function(done) {
    var passwordObj = createPasswordHashObj('sami', 'asdf');
    var expectedHashObj = {salt: 'asdf', iterations: 100, hash: "9QUx7N1CVVQ27Hrh/lTTRR4n+14IZn9v2INfNIRIha/wS5UHXZ9Nf8pJpjqFcWMfhcy6vPlOjzUe+uaQL78eKqYdHeygglzRivuq44AsH6NgUAP/TuXMIs9VEpMl3jxuzTrfusyOWc9meiB2sclDDNSulo01HzhaTeIbj6HNy1Z4mgP4fetNMhdIDit3kltfuLL6ZxVBLfWCdtlgwVuzhUZU+j1bnLLaExKBJPNdH3KwSQUZeI5XBLUMGxfLZbY3IpkZ3NUJPVVODCjx1tMdSkzZJ7L34hcBYtgxE7I08cZEQFxf0kO4deErZM0HPgjjM82ETlODjoyzNAb7EW4rNhWliOgIyNwvzZW0YLXs9tEGvmbYmWuFMC3h8ReYbxKAtpWZT48s3oBK29uts4WTQLBBGPmFe4Ns0sqSNTjYe0blPGZpygcu3jRVjdx3rt5wo8ONPr22FSRrG5NbJj+w/+VO/oYzvzMMSosQVhHGbasekqAx1Kw1hHBrkbh/jZgffLCmlkQA7nFX5V3FZ8IPXXpP1EpyasRC5gJLifeFzdHDgj+MwQgCuuLSAjDBhha7asYn+4b5F1fvCuqU6yzeHWXmL33B6JIOKnOEqfAoj4CiOLBROThLj4kwp5PI6Vd1KGwQurzGgPqWhELoh2HvvAiEeGrchLyTrYevsCNu47c="};
    expect(passwordObj).to.not.equal(null);
    expect(passwordObj).to.deep.equal(expectedHashObj);
    done();
  });


  it('can create a user in mongo', (done) => {
    createUser('username', 'password').then((user) => {
      expect(user.username).to.equal('username');
      expect(user.password).to.be.an('object');
      expect(user.password.hash.length).to.equal(684);
    done();
    });
  });
});
