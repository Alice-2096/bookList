const dateFooter = document.getElementById('date');
const date = new Date();

//booklist
const booksContainer = document.querySelector('.books-to-read');
const completedContainer = document.querySelector('.completed');
const titleBar = document.querySelector('.book-title-bar');
const btn = document.querySelector('.book-toggle-btn');
const bookDes = document.querySelector('.book-desc');
const list = document.querySelector('.to-read');

//modal window
booksContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-title-bar'))
    e.target.nextElementSibling.classList.toggle('book-desc-hidden');
});

completedContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-title-bar'))
    e.target.nextElementSibling.classList.toggle('book-desc-hidden');
});

//book toggle button -- event bubbling
booksContainer.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('book-toggle-btn') &&
    e.target.parentNode.parentNode.classList.contains('to-read')
  ) {
    var content =
      e.target.parentNode.parentNode.children[1].children[0].innerHTML;
    var booktitle =
      e.target.parentNode.parentNode.children[0].children[1].innerHTML;
  }
  //create a new li element and fill in content
  let bookContent = document.createElement('li');
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
  completedContainer.children[1].appendChild(bookContent);
});

// footer
window.addEventListener(
  'load',
  () => (dateFooter.innerHTML = date.getFullYear())
);
