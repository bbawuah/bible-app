
const book = document.querySelector('#books');
const number = document.querySelector('.number');
const verse = document.querySelector('.verse');
const text = document.querySelector('.text');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const nav = document.querySelectorAll('nav');
const prevBtn = document.querySelectorAll('.prev');
const nextBtn = document.querySelectorAll('.next');
const loading = document.querySelector('.loading');


const btn = document.querySelector('button');


btn.addEventListener('click', (e) => {
  e.preventDefault();

  console.log(number.value === number);

  title.textContent = '';
  subtitle.textContent = '';
  text.innerHTML = '';
  loading.style.visibility = 'visible';
  loading.style.opacity = 1;
  book.style.background = '#edf2f7';
  number.style.background = '#edf2f7';
  verse.style.background = '#edf2f7';
  nav.forEach((btn) => {
    btn.style.visibility = 'hidden';
    btn.style.opacity = '0';
  })


  if (book.value && number.value && !verse.value) {
    fetch(`/bible?book=${book.value}&chapter=${number.value}`).then((response) => {
      response.json().then(({ err, chapterData, bookData }) => {
        if (err || number.value !== number) {
          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;
          title.textContent = err;
          number.style.background = '#FEB2B2';

        }


        title.textContent = chapterData.data.reference;
        subtitle.textContent = bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', chapterData.data.content);
        number.style.background = '#edf2f7';
        


        //loading

        loading.style.visibility = 'hidden';
        loading.style.opacity = 0;

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
          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;
          title.textContent = err;
          book.style.background = '#FEB2B2';
        }
      })
    });


  } else {
    fetch(`/bible?book=${book.value}&chapter=${number.value}&verse=${verse.value}`).then((response) => {
      response.json().then(({ err, verseData, bookData }) => {
        if ({ err }) {
          title.textContent = err;
          //loading
          verse.style.background = '#FEB2B2';
          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;
        }

        loading.style.visibility = 'hidden';
        loading.style.opacity = 0;

        title.textContent = verseData.data.reference;
        subtitle.textContent = bookData.data.nameLong;
        text.insertAdjacentHTML('beforeend', verseData.data.content);
        verse.style.background = '#edf2f7';

        const arr = Array.from(nav);
        const navArr = arr.splice(1);
        navArr.forEach((btn) => {
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

    title.textContent = '';
    subtitle.textContent = '';
    text.innerHTML = '';
    loading.style.visibility = 'visible';
    loading.style.opacity = 1;

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
            //loading
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
          }

          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;

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
            //loading
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
          }

          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;

          title.textContent = verseData.data.reference;
          subtitle.textContent = bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', verseData.data.content);



          const arr = Array.from(nav);
          const navArr = arr.splice(1);

          navArr.forEach((btn) => {
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
    loading.style.visibility = 'visible';
    loading.style.opacity = 1;
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
            //loading
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
          }

          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;

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
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
          }

          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;

          title.textContent = verseData.data.reference;
          subtitle.textContent = bookData.data.nameLong;
          text.insertAdjacentHTML('beforeend', verseData.data.content);


          const arr = Array.from(nav);
          const navArr = arr.splice(1);
          navArr.forEach((btn) => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
          })

        })
      })
    }
  });
})
