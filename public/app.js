
const book = document.querySelector('#books');
const number = document.querySelector('.number');
const verse = document.querySelector('.verse');
const text = document.querySelector('.text');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const nav = document.querySelector('.nav');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const loader = document.querySelector('.gooey');

const btn = document.querySelector('button');


btn.addEventListener('click', (e) => {
  e.preventDefault();

  title.textContent = '';
  subtitle.textContent = '';
  text.innerHTML = '';
  nav.style.visibility = 'hidden';
  loader.style.visibility = 'visible';

  if (book.value && number.value && !verse.value) {
    fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          title.textContent = data.err;
        }


        loader.style.visibility = 'hidden';
        title.textContent = data.chapterData.data.reference;
        subtitle.textContent = data.bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', data.chapterData.data.content);

        //buttons
        nav.style.visibility = 'visible';

      })
    });
  } else {
    fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          title.textContent = data.err;
        }

        loader.style.visibility = 'hidden';
        title.textContent = data.verseData.data.reference;
        subtitle.textContent = data.bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', data.verseData.data.content);

        nav.style.visibility = 'visible';

      })
    });
  }
  // console.log(bool.value);
})


prevBtn.addEventListener('click', (e) => {
  e.preventDefault();

  title.textContent = '';
  subtitle.textContent = '';
  text.innerHTML = '';
  nav.style.visibility = 'hidden';
  loader.style.visibility = 'visible';

  if (!verse.value) {
    number.value = parseInt(number.value) - 1;
    fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          title.textContent = data.err;
        }

        loader.style.visibility = 'hidden';
        title.textContent = data.chapterData.data.reference;
        subtitle.textContent = data.bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', data.chapterData.data.content);

        //buttons
        nav.style.visibility = 'visible';
      });
    })
  } else {
    verse.value = parseInt(verse.value) - 1;

    fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          title.textContent = data.err;
        }
        

        loader.style.visibility = 'hidden';
        title.textContent = data.verseData.data.reference;
        subtitle.textContent = data.bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', data.verseData.data.content);

        //buttons
        nav.style.visibility = 'visible';

      })
    })


  }
})


nextBtn.addEventListener('click', (e) => {


  e.preventDefault();

  title.textContent = '';
  subtitle.textContent = '';
  text.innerHTML = '';
  nav.style.visibility = 'hidden';
  loader.style.visibility = 'visible';


  if (!verse.value) {
    number.value = parseInt(number.value) + 1;
    fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          title.textContent = data.err;
        }
        
        loader.style.visibility = 'hidden';

        title.textContent = data.chapterData.data.reference;
        subtitle.textContent = data.bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', data.chapterData.data.content);

        //buttons
        nav.style.visibility = 'visible';

      })
    })
  } else {

    verse.value = parseInt(verse.value) + 1;

    fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          title.textContent = data.err;
        }
        

        loader.style.visibility = 'hidden';
        title.textContent = data.verseData.data.reference;
        subtitle.textContent = data.bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', data.verseData.data.content);

        //buttons
        nav.style.visibility = 'visible';

      })
    })

  }
});
