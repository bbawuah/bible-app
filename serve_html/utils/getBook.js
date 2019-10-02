require('dotenv').config();
const request = require('request');

const API_KEY = process.env.API_KEY;


const getBook = (url, bibleId, book, callback) => {
  const options = {
    /*
    Hier maak ik the endpoint van de api
    */
    uri: `${url}${bibleId}/books/${book}`,
    headers: {
      'api-key': API_KEY
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