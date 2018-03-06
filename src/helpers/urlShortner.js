const crypto = require('crypto');

module.exports = {
  generateShortURL: (longURL, startIndex, endIndex) => {
    const hash = crypto.createHash('md5').update(longURL).digest('hex');
    return hash.substring(startIndex, endIndex + 1);
  },
};

// const generateShortURL = (longURL, startIndex, endIndex) => {
//   const hash = crypto.createHash('md5').update(longURL).digest('hex');
//   return hash.substring(startIndex, endIndex + 1);
// };

// module.exports = generateShortURL;

