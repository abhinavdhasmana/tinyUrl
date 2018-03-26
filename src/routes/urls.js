const createUrlLib = require('../lib/createUrl');
const Models = require('../models');

module.exports = redisClient => [{
  method: 'POST',
  path: '/shorten',
  handler: (request, response) => {
    const longUrl = request.payload.url;
    createUrlLib.createShortUrlAndInsert(longUrl)
      .then((result) => {
        response(result);
      });
  },
}, {
  method: 'GET',
  path: '/longUrl',
  handler: (request, response) => {
    const hashObject = 'shortUrls';
    const shortUrl = request.query.code;
    let originalUrl = null;
    redisClient.hget(hashObject, shortUrl, (err, redisResult) => {
      if (redisResult === null) {
        Models.urls.getLongUrl(shortUrl).then((result) => {
          if (result !== null) {
            ({ originalUrl } = result);
            redisClient.hset(hashObject, shortUrl, originalUrl);
            response({ originalUrl });
          } else {
            response({ originalUrl: 'Not found' });
          }
        });
      } else {
        originalUrl = redisResult;
        response({ originalUrl });
      }
    });
  },
}];
