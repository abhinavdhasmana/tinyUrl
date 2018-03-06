// const helper = require('../helpers/urlShortner');

module.exports = {
  method: 'GET',
  path: '/ping',
  handler: (request, response) => {
    // let conflictsInOld = 0;
    // const allCodesInOld = {};
    // const url = 'http://www.thisissomereallylongurl';

    // for (let i = 0; i < 1000000; i += 1) {
    //   const code = helper.generateShortURLOld(`url${i}`, 0, 5);
    //   if (!allCodesInOld[code]) {
    //     allCodesInOld[code] = true;
    //   } else {
    //     conflictsInOld += 1;
    //   }
    // }

    // const allCodesInNew = {};
    // let conflictsInNew = 0;

    // for (let i = 0; i < 1000000; i += 1) {
    //   const code = helper.generateShortURL(`url${i}`, 0, 5);
    //   if (!allCodesInNew[code]) {
    //     allCodesInNew[code] = true;
    //   } else {
    //     conflictsInNew += 1;
    //   }
    // }
    // console.log('total conflict in old way', conflictsInOld);
    // response({ conflictsInOld, conflictsInNew });

    //
    response('pong');
  },
};

