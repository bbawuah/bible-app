const request = require('request');

const { masterKey } = require('../config');


const getBook = (url, bibleId, book, callback) => {
  const options = {
    /*
    Hier maak ik the endpoint van de api
    */
    uri: `${url}${bibleId}/books/${book}`,
    headers: {
      'api-key': masterKey
    }
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // callback(error, undefined);
      const data = JSON.parse(body);
      callback(undefined, data);
    } else {
      callback('Oops.. Select a bible', undefined);
    }
  });
}

module.exports = getBook;