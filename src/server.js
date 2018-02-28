const Hapi = require('hapi');
const Routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });
server.route(Routes);

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});