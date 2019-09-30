
const book = document.querySelector('#books');
const number = document.querySelector('.number');
const verse = document.querySelector('.verse');
const text = document.querySelector('.text');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const nav = document.querySelectorAll('.nav');
const prevBtn = document.querySelectorAll('.prev');
const nextBtn = document.querySelectorAll('.next');
const loader = document.querySelector('.gooey');

const btn = document.querySelector('button');


btn.addEventListener('click', (e) => {
  e.preventDefault();

  title.textContent = '';
  subtitle.textContent = '';
  text.innerHTML = '';
  nav.forEach((btn) => {
    btn.style.visibility = 'hidden';
    btn.style.opacity = '0';
  })
  loader.style.visibility = 'visible';

  if (book.value && number.value && !verse.value) {
    fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          title.textContent = data.err;
        }


        title.textContent = data.chapterData.data.reference;
        subtitle.textContent = data.bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', data.chapterData.data.content);

        //buttons
        nav.forEach((btn) => {
          btn.style.visibility = 'visible';
          btn.style.opacity = '1';
        })

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

        nav.forEach((btn) => {
          btn.style.visibility = 'visible';
          btn.style.opacity = '1';
        })


      })
    });
  }
  // console.log(bool.value);
})


prevBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    title.textContent = '';
    subtitle.textContent = '';
    text.innerHTML = '';

    nav.forEach((btn) => {
      btn.style.visibility = 'hidden';
      btn.style.opacity = '0';
    })

    loader.style.visibility = 'visible';

    if (!verse.value) {
      number.value = parseInt(number.value) - 1;
      fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
        response.json().then((data) => {
          if (data.err) {
            title.textContent = data.err;
          }


          title.textContent = data.chapterData.data.reference;
          subtitle.textContent = data.bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', data.chapterData.data.content);

          //buttons
          

          nav.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })

        });
      })
    } else {
      verse.value = parseInt(verse.value) - 1;

      fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
        response.json().then((data) => {
          if (data.err) {
            title.textContent = data.err;
          }



          title.textContent = data.verseData.data.reference;
          subtitle.textContent = data.bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', data.verseData.data.content);

          //buttons
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

    title.textContent = '';
    subtitle.textContent = '';
    text.innerHTML = '';
    nav.forEach((btn) => {
      btn.style.visibility = 'hidden';
      btn.style.opacity = '0';
    })
    loader.style.visibility = 'visible';


    if (!verse.value) {
      number.value = parseInt(number.value) + 1;
      fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
        response.json().then((data) => {
          if (data.err) {
            title.textContent = data.err;
          }



          title.textContent = data.chapterData.data.reference;
          subtitle.textContent = data.bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', data.chapterData.data.content);

          //buttons
          nav.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })

        })
      })
    } else {

      verse.value = parseInt(verse.value) + 1;

      fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
        response.json().then((data) => {
          if (data.err) {
            title.textContent = data.err;
          }



          title.textContent = data.verseData.data.reference;
          subtitle.textContent = data.bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', data.verseData.data.content);

          //buttons
          nav.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })

        })
      })
    }
  });
})
