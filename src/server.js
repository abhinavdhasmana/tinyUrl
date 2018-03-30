const Hapi = require('hapi');
const Routes = require('./routes');
const Good = require('good');
const redis = require('redis');

const redisClient = redis.createClient({ host: '127.0.0.1' });

redisClient.on('error', (error) => {
  console.log('failed to connect to redis', error); // eslint-disable-line no-console
});

const server = new Hapi.Server({
});
server.connection({ port: 8080, host: '0.0.0.0' });
server.route(Routes(redisClient));

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
});

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
  });
}

module.exports = server;
