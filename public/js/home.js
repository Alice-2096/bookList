const dateFooter = document.getElementById('date');
const date = new Date();
const booksContainer = document.querySelector('.books-to-read');
const completedContainer = document.querySelector('.completed');
const titleBar = document.querySelector('.book-title-bar');
const btn = document.querySelector('.book-toggle-btn');
const newbookTitle = document.getElementById('newbook-title');
const logoutBtn = document.getElementById('logout');

//header -- logout button -- redirect to the log out page onclick
logoutBtn.addEventListener('click', function () {
  location.href = './home/logout';
});

//modal dropdown window
booksContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-title'))
    e.target.parentNode.nextElementSibling.classList.toggle('book-desc-hidden');
});

completedContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-title'))
    e.target.parentNode.nextElementSibling.classList.toggle('book-desc-hidden');
});

//book toggle button: finished --> to read
completedContainer.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('book-toggle-btn') &&
    e.target.parentNode.parentNode.classList.contains('finished')
  ) {
    var content =
      e.target.parentNode.parentNode.children[1].children[0].innerHTML;
    var booktitle =
      e.target.parentNode.parentNode.children[0].children[1].innerHTML;
    //create a new li element and fill in content
    let bookContent = document.createElement('li');
    bookContent.classList.add('to-read');
    bookContent.innerHTML = `
    <div class="book-title-bar">
        <button class="book-toggle-btn"></button>
        <h4 class="book-title">${booktitle}</h4>
        <img class="star-btn" src="../public/imgs/star.svg"></img>
    </div>
    <div class="book-desc-hidden">
        <p>${content}</p>
    </div>`;
    //remove the current li and add new li
    e.target.parentNode.parentNode.remove();
    booksContainer.children[1].appendChild(bookContent);
  }
});

//book toggle button: to-read ---> finished
booksContainer.addEventListener('click', async function (e) {
  if (
    e.target.classList.contains('book-toggle-btn') &&
    e.target.parentNode.parentNode.classList.contains('to-read')
  ) {
    var content =
      e.target.parentNode.parentNode.children[1].children[0].innerHTML;
    var booktitle =
      e.target.parentNode.parentNode.children[0].children[1].innerHTML;
    var dataId = 0;
    // !FIX THIS

    let bookContent = document.createElement('li');
    //!specify dataId
    bookContent.classList.add('finished');
    bookContent.innerHTML = `
    <div class="book-title-bar">
        <button class="book-toggle-btn"></button>
        <h4 class="book-title">${booktitle}</h4>
        <img class="star-btn" src="../public/imgs/star.svg"></img>
    </div>
    <div class="book-desc-hidden">
        <p>${content}</p>
    </div>`;

    e.target.parentNode.parentNode.remove();
    completedContainer.children[1].appendChild(bookContent);

    //AJAX POST req --
    try {
      const bookId = dataId;
      const response = await fetch(`/home/api/books/change/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
});

//add a new book to the booklist
newbookTitle.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    var title = e.target.value;
    let booklist = document.createElement('li');
    booklist.classList.add('to-read');
    //const id = autogenerated string; li element add #data-id = id;
    booklist.innerHTML = `
    <div class="book-title-bar">
    <button class="book-toggle-btn"></button>
    <h4 class="book-title">${title}</h4>
    <img class="star-btn" src="../public/imgs/star.svg"></img>
    </div>
    <div class="book-desc-hidden">
    <p></p>
    </div>
    `;
    booksContainer.children[1].appendChild(booklist);
    e.target.value = '';

    //using fetchAPI to post the new book title to backend API
    try {
      const response = await fetch('/home/api/books/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookTitle: title,
          //dataId: id,
        }),
      });
      console.log('Completed!', response);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
});

// footer
window.addEventListener(
  'load',
  () => (dateFooter.innerHTML = date.getFullYear())
);
