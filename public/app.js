
const book = document.querySelector('#books');
const number = document.querySelector('.number');
const verse = document.querySelector('.verse');
const text = document.querySelector('.text');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const nav = document.querySelectorAll('.nav');
const prevBtn = document.querySelectorAll('.prev');
const nextBtn = document.querySelectorAll('.next');



const btn = document.querySelector('button');


btn.addEventListener('click', (e) => {
  e.preventDefault();

  title.textContent = 'Loading..';
  subtitle.textContent = '';
  text.innerHTML = '';
  nav.forEach((btn) => {
    btn.style.visibility = 'hidden';
    btn.style.opacity = '0';
  })


  if (book.value && number.value && !verse.value) {
    fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
      response.json().then(({ err, chapterData, bookData }) => {
        if (err) {
          title.textContent = err;
        }


        title.textContent = chapterData.data.reference;
        subtitle.textContent = bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', chapterData.data.content);

        //buttons
        nav.forEach((btn) => {
          btn.style.visibility = 'visible';
          btn.style.opacity = '1';
        })

      })
    });
  } else if (!book.value) {

    fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
      response.json().then(({ err }) => {
        if (err) {
          title.textContent = err;
        }
      })
    });


  } else {
    fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
      response.json().then(({ err, verseData, bookData }) => {
        if ({ err }) {
          title.textContent = err;
        }

        title.textContent = verseData.data.reference;
        subtitle.textContent = bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', verseData.data.content);

        nav.forEach((btn) => {
          btn.style.visibility = 'visible';
          btn.style.opacity = '1';
        })
      })
    });
  }
})


prevBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    title.textContent = 'Loading..';
    subtitle.textContent = '';
    text.innerHTML = '';

    nav.forEach((btn) => {
      btn.style.visibility = 'hidden';
      btn.style.opacity = '0';
    })



    if (!verse.value) {
      number.value = parseInt(number.value) - 1;
      fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
        response.json().then(({ err, chapterData, bookData }) => {
          if ({ err }) {
            title.textContent = err;
          }


          title.textContent = chapterData.data.reference;
          subtitle.textContent = bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', chapterData.data.content);

          


          nav.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })

        });
      })
    } else {
      verse.value = parseInt(verse.value) - 1;

      fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
        response.json().then(({ err, verseData, bookData }) => {
          if (err) {
            title.textContent = err;
          }



          title.textContent = verseData.data.reference;
          subtitle.textContent = bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', verseData.data.content);

          
          nav.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })
        })
      })


    }
  })
});


nextBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {


    e.preventDefault();

    title.textContent = 'Loading..';
    subtitle.textContent = '';
    text.innerHTML = '';
    nav.forEach((btn) => {
      btn.style.visibility = 'hidden';
      btn.style.opacity = '0';
    })



    if (!verse.value) {
      number.value = parseInt(number.value) + 1;
      fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
        response.json().then(({ err, chapterData, bookData }) => {
          if (err) {
            title.textContent = err;
          }



          title.textContent = chapterData.data.reference;
          subtitle.textContent = bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', chapterData.data.content);

        
          nav.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })

        })
      })
    } else {

      verse.value = parseInt(verse.value) + 1;

      fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
        response.json().then(({ err, verseData, bookData }) => {
          if (err) {
            title.textContent = err;
          }



          title.textContent = verseData.data.reference;
          subtitle.textContent = bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', verseData.data.content);

      
          nav.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })

        })
      })
    }
  });
})
