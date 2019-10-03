require('dotenv').config();
const request = require('request');

/*
BELANGRIJK IS OM EEN LOGICA TE BEDENKEN DIE CHECKT HOEVEEL CHAPTERS
ELK BOEK HEEFT...

BIJVOORBEELD PSALM 500 (BESTAAT NIET) -> MOET EEN ERROR TERUG KOPPELEN
*/

const getChapter = (url, bibleId, book, chapter, callback) => {
  
  const API_KEY = process.env.API_KEY;
  const chapterId = `${book}.${chapter}`;

  const options = {
    /*
    Hier maak ik the endpoint van de api
    */
    uri: `${url}${bibleId}/chapters/${chapterId}`,
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
      callback('Oops.. Fill in an existing chapter', undefined);
    }
  });
}

module.exports = getChapter;