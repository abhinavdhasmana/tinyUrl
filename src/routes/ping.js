module.exports = {
  method: 'GET',
  path: '/ping',
  handler: (request, response) => {
    response('pong');

  }
}