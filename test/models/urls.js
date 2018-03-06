const Chai = require('chai');
const Lab = require('lab');

exports.lab = Lab.script();
const { lab } = exports;

const { expect } = Chai;

const Models = require('../../src/models');

lab.experiment('url createObject', () => {
  lab.beforeEach((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });
  lab.test('should create the entry with the code if the entry does not exists', (done) => {
    Models.urls.createObject('abcdeg', 'http://thisislocalurl123.com')
      .spread((createdObject, created) => {
        expect(created).to.eq(true);
        done();
      });
  });
  lab.test('should not create a new entry if entry already exists', (done) => {
    Models.urls.createObject('abcdeg', 'http://thisislocalurl123.com')
      .then(() => {
        Models.urls.createObject('abcdeg', 'http://thisislocalurl123456.com')
          .spread((newCreatedObject, newCreated) => {
            expect(newCreated).to.eq(false);
            expect(newCreatedObject.originalUrl).to.eq('http://thisislocalurl123.com');
            done();
          });
      });
  });
});

lab.experiment('validations', () => {
  lab.beforeEach((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });
  lab.test('should not allow more than 6 characters in the code', (done) => {
    const createPromise = Models.urls.createObject('abcdefg', 'http://thisislocalurl123.com');
    createPromise.catch((error) => {
      expect(error.message).to.eq('value too long for type character varying(6)');
      done();
    });
  });
});
