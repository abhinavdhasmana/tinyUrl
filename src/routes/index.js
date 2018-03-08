const ping = require('./ping');
const urls = require('./urls');

module.exports = redisClient => [].concat(ping, urls(redisClient));
