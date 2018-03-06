const createUrlLib = require('../lib/createUrl');

module.exports = {
  method: 'POST',
  path: '/create',
  handler: (request, response) => {
    const longUrl = request.payload.url;
    createUrlLib.createShortUrlAndInsert(longUrl)
      .then((result) => {
        response(result);
      });
  },
};
