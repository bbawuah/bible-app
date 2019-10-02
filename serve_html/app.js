console.log(process.env);

const path = require('path');
const express = require('express');
const hbs = require('hbs');


/*
Voor deployment redenen heb ik een logical operator geplaatst in mijn port variabel.
*/
const port = process.env.PORT || 3000;

/*
De volgende javascript files laad ik in om ze te gebruiken in deze file. Zo heb ik meer overzicht en verdeel ik code voor verschillende functies.

*/
const getBook = require('./utils/getBook');
const getChapter = require('./utils/getChapter');
const getVerse = require('./utils/getVerse');

//Hiermee maak ik een Express applicatie
const app = express();


/*
Met de volgende code geef ik de paths naar mijn template files. Deze ga ik nodig hebben voor mijn template engine 

*/
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/*
app.use wordt gebruikt bij middleware functions. Wanneer er een request binnen komt zal deze functie worden afgevuurd voordat request is voltooid. 

In dit geval wordt na elk request ee html file opgeslagen in mijn public file.
*/
app.use(express.static(publicDirectoryPath));

/*
Dit is code die ik later nodig ga hebben in de functies onderaan. De reden dat ik deze code hier heb geplaatst is omdat ik deze niet wilde dupliceren. 

Ik geef ze nu telkens mee met in de paramaters van de functies

*/

const url = `https://api.scripture.api.bible/v1/bibles/`;
const bibleId = '06125adad2d5898a-01';

/*

BibleApiEndpoints 
  bible: `https://api.scripture.api.bible/v1/bibles/${bibleId}`,
  books: `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${input2}`,
  chapters: `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${input2}/chapters`,
  chapter: `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${input2}`,
  verses: `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${input2}/verses`,
  verse: `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${input2}`
  
*/

app.get('', (req, res) => {
  res.render('index', {
    title: 'My bible',
    name: 'Brian Bawuah'
  });
});

/*
Met de onderstaande route haal ik data uit de bible API. Ik heb conditions gebruikt om te bepalen wat de gebruiker precies terug moet krijgen. 

De gebruiker kan Chapters en Verses terug krijgen. Als de gebruiker niet benodigde data meegeeft moet hij de juiste foutmelding terug krijgen.


*/

app.get('/bible', (req, res) => {
  if (!req.query.book && !req.query.chapter && !req.query.verse) {
    getBook(url, bibleId, req.query.book, (err, bookData) => {
      if (err) {
        return res.status(404).send({ err });
      }
    });

  } else if (req.query.book && req.query.chapter && req.query.verse) {

    /*
    Hier gebruik de functies getBook en getVerse om verschillende data naar de gebruiker te sturen. De subtitle die te zien is op de page die komt bijvoorbeeld van de getbook function. Ik vond dit mooi om te displayen.
    
    */
    getBook(url, bibleId, req.query.book, (err, bookData) => {
      if (err) {
        return res.status(404).send({ err });
      }

      getVerse(url, bibleId, req.query.book, req.query.chapter, req.query.verse, (err, verseData) => {
        if (err) {
          return res.status(404).send({ err });
        }
        return res.status(200).send({
          bookData,
          verseData
        });
      })
    })
  } else if (req.query.book && req.query.chapter && !req.query.verse) {

    getBook(url, bibleId, req.query.book, (err, bookData) => {
      if (err) {
        return res.status(404).send({ err });
      }

      getChapter(url, bibleId, req.query.book, req.query.chapter, (err, chapterData) => {
        if (err) {
          return res.status(404).send({ err });
        }
        return res.status(200).send({
          bookData,
          chapterData
        });
      })
    });
  }
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'My bible',
    name: 'Brian Bawuah'
  });
})

/*
Hiermee luitert de app naar connecties en stuurt hij een server terug.
*/
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));


















            // yargs.command({
            //   command: 'add',
            //   describe: 'Add a new note',
            //   builder: {
            //     title: {
            //       describe: 'Note title',
            //       demandOption: true,
            //       type: 'string'
            //     },
            //     body: {
            //       describe: 'Note body',
            //       demandOption: true,
            //       type: 'string'
            //     }
            //   },
            //   handler(argv) {
            //     notes.addNote(argv.title, argv.body);

            //   }
            // });