/* eslint-disable */
const helper = require('../src/helpers/urlShortner');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const allData = [];
    const allCodes = {};
    const url = 'http://www.thisissomereallylongurl';
    for (let i = 0; i < 1000000; i += 1) {
      const code = helper.generateShortURL(`url${i}`, 0, 5);
      if (!allCodes[code]) {
        allCodes[code] = true;
        const temp = {
          code,
          originalUrl: `${url}${i}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        allData.push(temp);
      }
    }
    console.log(allData.length);

    return queryInterface.bulkInsert('urls', allData);
  },

  down: (queryInterface, Sequelize) => {
  },
};
