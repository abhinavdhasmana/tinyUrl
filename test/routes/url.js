const Chai = require('chai');
const Lab = require('lab');
const Models = require('../../src/models');

exports.lab = Lab.script();
const { lab } = exports;
const Server = require('../../src/server');

const { expect } = Chai;

lab.experiment('shorten', () => {
  lab.test('should create the short URL and return the code', (done) => {
    const options = {
      method: 'POST',
      url: '/shorten',
      payload: {
        url: 'http://thisIsDummy',
      },
    };
    Server.inject(options, (response) => {
      const expectedObject = {
        code: 'eGs0Qj',
        longUrl: 'http://thisIsDummy',
      };
      expect(response.result).to.deep.equal(expectedObject);
      done();
    });
  });
});

lab.experiment('longUrl', () => {
  lab.beforeEach((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });

  lab.test('should return not found when longURL is not found', (done) => {
    const options = {
      method: 'GET',
      url: '/longUrl?code=eGs0Qj',
    };
    Server.inject(options, (response) => {
      const expectedObject = {
        originalUrl: 'Not found',
      };
      expect(response.result).to.deep.equals(expectedObject);
      done();
    });
  });

  lab.test('should fetch data from database', (done) => {
    Models.urls.createObject('abcdeg', 'http://thisislocalurl123.com').then(() => {
      const options = {
        method: 'GET',
        url: '/longUrl?code=abcdeg',
      };
      Server.inject(options, (response) => {
        const expectedObject = {
          originalUrl: 'http://thisislocalurl123.com',
        };
        expect(response.result).to.deep.equals(expectedObject);
        done();
      });
    });
  });
});

