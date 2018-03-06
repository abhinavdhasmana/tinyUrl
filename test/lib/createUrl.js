const Chai = require('chai');
const Lab = require('lab');
const Sinon = require('sinon');

exports.lab = Lab.script();
const { lab } = exports;
const { expect } = Chai;

const Models = require('../../src/models');
const createUrl = require('../../src/lib/createUrl');
const urlShortnerHelper = require('../../src/helpers/urlShortner');

lab.experiment('createShortUrlAndInsert', () => {
  lab.beforeEach((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });
  lab.test('should create a new URL entry into the db', (done) => {
    createUrl.createShortUrlAndInsert('this is test string')
      .then((result) => {
        Models.urls.findAll({
          where: {
            code: result.code,
          },
        }).then((searchResult) => {
          expect(searchResult.length).to.eqls(1);
          done();
        });
      });
  });

  lab.test('should recurse and insert if there is a collision in MD5', (done) => {
    const url1 = 'this is string 1';
    const url2 = 'this is string 2';
    const stub = Sinon.stub(urlShortnerHelper, 'generateShortURL');
    stub.withArgs(url1, 0, 5).returns('123456');
    stub.withArgs(url2, 0, 5).returns('123456');
    stub.withArgs(url2, 6, 11).returns('ghijkl');

    createUrl.createShortUrlAndInsert(url1)
      .then(() => {
        createUrl.createShortUrlAndInsert(url2).then((result2) => {
          Models.urls.findAll({
            where: {
              code: result2.code,
            },
          }).then((searchResult) => {
            expect(searchResult.length).to.eqls(1);
            stub.restore();
            done();
          });
        });
      });
  });
});

