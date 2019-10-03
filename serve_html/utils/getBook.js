const request = require('request');



const getBook = (url, bibleId, book, callback) => {
  const options = {
    /*
    Hier maak ik the endpoint van de api
    */
    uri: `${url}${bibleId}/books/${book}`,
    headers: {
      'api-key': '90219021be8ec41093e50f889350a668'
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