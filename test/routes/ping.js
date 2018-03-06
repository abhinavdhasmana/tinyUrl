const Chai = require('chai');
const Lab = require('lab');

exports.lab = Lab.script();
const { lab } = exports;
const Server = require('../../src/server');

const { expect } = Chai;

lab.experiment('ping route', () => {
  lab.test('should return pong', (done) => {
    const options = {
      method: 'GET',
      url: '/ping',
    };
    Server.inject(options, (response) => {
      expect(response.result).to.equal('pong');
      done();
    });
  });
});

