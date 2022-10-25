const dateFooter = document.getElementById('date');
const date = new Date();

//booklist
const booksContainer = document.querySelector('.books-to-read');
const completedContainer = document.querySelector('.completed');
const titleBar = document.querySelector('.book-title-bar');
const btn = document.querySelector('.book-toggle-btn');
const newbookTitle = document.getElementById('newbook-title');

//modal dropdown window -- event bubbling
booksContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-title'))
    e.target.parentNode.nextElementSibling.classList.toggle('book-desc-hidden');
});

completedContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-title'))
    e.target.parentNode.nextElementSibling.classList.toggle('book-desc-hidden');
});

//book toggle button
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

booksContainer.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('book-toggle-btn') &&
    e.target.parentNode.parentNode.classList.contains('to-read')
  ) {
    var content =
      e.target.parentNode.parentNode.children[1].children[0].innerHTML;
    var booktitle =
      e.target.parentNode.parentNode.children[0].children[1].innerHTML;

    let bookContent = document.createElement('li');
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
  }
});

//add a book to the booklist
newbookTitle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let title = e.target.value;
    let booklist = document.createElement('li');
    booklist.classList.add('to-read');
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
  }
});

// footer
window.addEventListener(
  'load',
  () => (dateFooter.innerHTML = date.getFullYear())
);
