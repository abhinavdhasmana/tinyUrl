const crypto = require('crypto');

module.exports = {
  generateShortURL: (longURL, startIndex, endIndex) => {
    const hash = crypto.createHash('md5').update(longURL).digest('base64').replace(/\//g, '_')
      .replace(/\+/g, '-');
    return hash.substring(startIndex, endIndex + 1);
  },
  generateShortURLOld: (longURL, startIndex, endIndex) => {
    const hash = crypto.createHash('md5').update(longURL).digest('hex');
    // console.log('new hash', hash);
    return hash.substring(startIndex, endIndex + 1);
  },
};

