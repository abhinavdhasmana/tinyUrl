const createUrlLib = require('../lib/createUrl');
const Models = require('../models');

module.exports = redisClient => [{
  method: 'POST',
  path: '/create',
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
        console.log('Did not find in Redis');
        Models.urls.getLongUrl(shortUrl).then((result) => {
          if (result !== null) {
            ({ originalUrl } = result);
            redisClient.hset(hashObject, shortUrl, originalUrl);
            response({ originalUrl });
          } else {
            response({ originalUrl: 'Not founds' });
          }
        });
      } else {
        console.log('Found in redis');
        originalUrl = redisResult;
        response({ originalUrl });
      }
    });
  },
}];
