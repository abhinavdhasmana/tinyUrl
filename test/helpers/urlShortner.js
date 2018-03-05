const Chai = require('chai');
const Lab = require('lab');

exports.lab = Lab.script();
const { lab } = exports;

const { expect } = Chai;

const UrlShortner = require('../../src/helpers/urlShortner');

lab.experiment('should return the first 5 characters of the hash', () => {
  lab.test('should return the correct string length', (done) => {
    const longUrl = 'some random string';
    const shortUrl = UrlShortner(longUrl, 0, 5);
    expect(shortUrl.length).to.equal(6);
    done();
  });

  lab.test('should return the same short url for same string', (done) => {
    const longUrl = 'some random string';
    const shortUrlOne = UrlShortner(longUrl, 0, 10);
    const shortUrlTwo = UrlShortner(longUrl, 0, 10);
    expect(shortUrlOne).to.equal(shortUrlTwo);
    done();
  });
});
