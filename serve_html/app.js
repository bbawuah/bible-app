const path = require('path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const getBook = require('./utils/getBook');
const getChapter = require('./utils/getChapter');
const getVerse = require('./utils/getVerse');

const app = express();


//configuration for hbs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

const url = `https://api.scripture.api.bible/v1/bibles/`;
const bibleId = '06125adad2d5898a-01';

// const bookId = 'MAT';
// const chapterId = 'MAT.5';
// const verseId = 'MAT.5.5';


//OBJECT OPTIONS
// const bibleApiEndpoints = {
//   bible: `https://api.scripture.api.bible/v1/bibles/${bibleId}`,
//   books: `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${input2}`,
//   chapters: `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${input2}/chapters`,
//   chapter: `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${input2}`,
//   verses: `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${input2}/verses`,
//   verse: `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${input2}`

// }

app.get('', (req, res) => {
  res.render('index', {
    title: 'My bible',
    name: 'Brian Bawuah'
  });
});

app.get('/bible', (req, res) => {

  if (!req.query.book && !req.query.chapter && !req.query.verse) {

    return res.status(404).send({ err: 'Fill in a request' });

  } else if (req.query.book && req.query.chapter && req.query.verse) {

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

//OPTIONS

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