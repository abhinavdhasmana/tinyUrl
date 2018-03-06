const createUrlLib = require('../lib/createUrl');

module.exports = {
  method: 'POST',
  path: '/create',
  handler: (request, response) => {
    const longUrl = request.payload.url;
    createUrlLib.createShortUrlandInsert(longUrl)
      .then((result) => {
        response(result);
      });
  },
};
