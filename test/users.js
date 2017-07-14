
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Users = require('../models/users');

describe('sanity test', () => {
  it('should run test', () => {
    expect(1).to.not.equal(5);
  });
});
