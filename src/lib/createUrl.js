const Models = require('../models');
const urlShortnerHelper = require('../helpers/urlShortner');
// TODO: move this to config later
const incrementSize = 6;

const recursiveInsert = (longUrl, startIndex, endIndex) => {
  const shortCode = urlShortnerHelper.generateShortURL(longUrl, startIndex, endIndex);
  return Models.urls.createObject(shortCode, longUrl)
    .spread((createdObject, created) => {
      if ((!created) && (createdObject.originalUrl !== longUrl)) {
        return recursiveInsert(longUrl, endIndex + 1, endIndex + incrementSize);
      }
      return { longUrl: createdObject.originalUrl, code: createdObject.code };
    });
};

module.exports = {
  createShortUrlAndInsert: (longUrl) => {
    const p = recursiveInsert(longUrl, 0, 5);
    return p.then(result => result);
  },


};
