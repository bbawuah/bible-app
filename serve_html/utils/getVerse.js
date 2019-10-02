require('dotenv').config();
const request = require('request');

/*
BELANGRIJK IS OM EEN LOGICA TE BEDENKEN DIE CHECKT HOEVEEL CHAPTERS
ELK BOEK HEEFT...

BIJVOORBEELD PSALM 23.20 (BESTAAT NIET) -> MOET EEN ERROR TERUG KOPPELEN
*/

const getVerse = (url, bibleId, book, chapter, verse, callback) => {

const API_KEY = process.env.API_KEY;
  const verseId = `${book}.${chapter}.${verse}`;

  const options = {
    /*
    Hier maak ik the endpoint van de api
    */
    uri: `${url}${bibleId}/verses/${verseId}`,
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
      callback('Oops.. Fill in an existing verse', undefined);
    }
  });
}

module.exports = getVerse;