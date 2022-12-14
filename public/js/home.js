const dateFooter = document.getElementById('date');
const date = new Date();
const mainContainer = document.querySelector('.main-container');
const booksContainer = document.querySelector('.books-to-read');
const completedContainer = document.querySelector('.completed');
const newbookTitle = document.getElementById('newbook-title');
const logoutBtn = document.getElementById('logout');
const searchBar = document.querySelector('.search-bar-input');

var oldTitle = '';
var oldContent = '';

//header -- logout button -- redirect to the log out page onclick
logoutBtn.addEventListener('click', function () {
  location.href = './logout';
});

//search bar -- Link terms in the search bar to Google-Book articles in a new webpage
searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const keyword = e.target.value;
    window.open(`https://en.wikipedia.org/wiki/${keyword}`, '_blank');
    e.target.value = '';
  }
});

//modal dropdown window
mainContainer.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('book-title') &&
    !e.target.classList.contains('editing-mode')
  )
    e.target.parentNode.nextElementSibling.classList.toggle('book-desc-hidden');
});

//delete a book
booksContainer.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete')) {
    const parentList = e.target.parentNode.parentNode.parentNode;
    const id = parentList.dataset.id;
    parentList.remove();
    //AJAX DELETE -- update DB
    const response = await fetch('/home/api/books/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => console.log(error));
  }
});

completedContainer.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete')) {
    const parentList = e.target.parentNode.parentNode.parentNode;
    const id = parentList.dataset.id;
    parentList.remove();
    //AJAX DELETE -- update DB
    const response = await fetch('/home/api/books/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => console.log(error));
  }
});

//book toggle button: finished --> to read
completedContainer.addEventListener('click', async function (e) {
  if (
    e.target.classList.contains('book-toggle-btn') &&
    e.target.parentNode.parentNode.classList.contains('finished')
  ) {
    const content =
      e.target.parentNode.parentNode.children[1].children[0].innerHTML;
    const booktitle =
      e.target.parentNode.parentNode.children[0].children[1].innerHTML;
    const id = e.target.parentNode.parentNode.dataset.id;

    //create a new li element and fill in content
    const bookContent = document.createElement('li');
    bookContent.classList.add('to-read');
    bookContent.setAttribute('data-id', id);
    bookContent.innerHTML = `
    <div class="book-title-bar">
        <button class="book-toggle-btn"></button>
        <h4 class="book-title">${booktitle}</h4>
        <svg class="star-btn" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z" fill-rule="nonzero"/></svg>
                    </div>
                    <div class="book-desc-hidden">
                        <p id="content"> ${content}</p>
                        <div class="edit-and-delete-container">
                        <svg class="save-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                        
                        <svg class="cancel-button" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M24 21h-17l-7-7.972 7-8.028h17v16zm-16.09-14l-5.252 6.023 5.247 5.977h14.095v-12h-14.09zm6.09 4.586l2.586-2.586 1.414 1.414-2.586 2.586 2.586 2.586-1.414 1.414-2.586-2.586-2.586 2.586-1.414-1.414 2.586-2.586-2.586-2.586 1.414-1.414 2.586 2.586z"/>
                        </svg>

                        <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z"/></svg>

                        <svg class="delete" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/></svg>
                        </div>
                    </div>`;
    //remove the current li and add new li
    e.target.parentNode.parentNode.remove();
    booksContainer.children[1].appendChild(bookContent);

    //AJAX POST -- update DB
    const response = await fetch('/home/api/books/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
});

//book toggle button: to-read ---> finished
booksContainer.addEventListener('click', async function (e) {
  if (
    e.target.classList.contains('book-toggle-btn') &&
    e.target.parentNode.parentNode.classList.contains('to-read')
  ) {
    const content =
      e.target.parentNode.parentNode.children[1].children[0].innerHTML;
    const booktitle =
      e.target.parentNode.parentNode.children[0].children[1].innerHTML;
    const id = e.target.parentNode.parentNode.dataset.id;

    let bookContent = document.createElement('li');
    bookContent.setAttribute('data-id', id);
    bookContent.classList.add('finished');
    bookContent.innerHTML = `
    <div class="book-title-bar">
        <button class="book-toggle-btn"></button>
        <h4 class="book-title">${booktitle}</h4>
        <svg class="star-btn" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z" fill-rule="nonzero"/></svg>
                    </div>
                    <div class="book-desc-hidden">
                        <p id="content"> ${content}</p>
                        <div class="edit-and-delete-container">
                        <svg class="save-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                        
                        <svg class="cancel-button" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M24 21h-17l-7-7.972 7-8.028h17v16zm-16.09-14l-5.252 6.023 5.247 5.977h14.095v-12h-14.09zm6.09 4.586l2.586-2.586 1.414 1.414-2.586 2.586 2.586 2.586-1.414 1.414-2.586-2.586-2.586 2.586-1.414-1.414 2.586-2.586-2.586-2.586 1.414-1.414 2.586 2.586z"/>
                        </svg>

                        <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z"/></svg>

                        <svg class="delete" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/></svg>
                        </div>
                    </div>`;

    e.target.parentNode.parentNode.remove();
    completedContainer.children[1].appendChild(bookContent);

    //AJAX POST -- update DB
    const response = await fetch('/home/api/books/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
});

//add a new book to the booklist
newbookTitle.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const title = e.target.value;
    const booklist = document.createElement('li');
    booklist.classList.add('to-read');
    //using fetchAPI to post the new book title to backend API, and then send back the bookId

    const response = await fetch('/home/api/books/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookTitle: title,
      }),
    })
      .then((response) => response.json()) //parse response and return the parsed response to the next function
      .then((data) => {
        const id = data;
        //render HTML page using the fetched data
        booklist.setAttribute('data-id', id);
        booklist.innerHTML = `
      <div class="book-title-bar">
      <button class="book-toggle-btn"></button>
      <h4 class="book-title">${title}</h4>
      <svg class="star-btn" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z" fill-rule="nonzero"/></svg>
                    </div>
                    <div class="book-desc-hidden">
                        <p id="content"></p>
                        <div class="edit-and-delete-container">
                        <svg class="save-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                        
                        <svg class="cancel-button" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M24 21h-17l-7-7.972 7-8.028h17v16zm-16.09-14l-5.252 6.023 5.247 5.977h14.095v-12h-14.09zm6.09 4.586l2.586-2.586 1.414 1.414-2.586 2.586 2.586 2.586-1.414 1.414-2.586-2.586-2.586 2.586-1.414-1.414 2.586-2.586-2.586-2.586 1.414-1.414 2.586 2.586z"/>
                        </svg>

                        <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z"/></svg>

                        <svg class="delete" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/></svg>
                        </div>
                    </div>
      `;
        booksContainer.children[1].appendChild(booklist);
        e.target.value = '';
      })
      .catch(error);
  }
});

//edit a book
mainContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    //enter into the editing mode
    const saveBtn = e.target.previousElementSibling.previousElementSibling;
    const cancelBtn = e.target.previousElementSibling;
    //1. show buttons
    e.target.classList.add('editing-mode');
    e.target.nextElementSibling.classList.add('editing-mode');
    cancelBtn.classList.add('editing-mode');
    saveBtn.classList.add('editing-mode');
    //2. make text area editable
    const desc = e.target.parentNode.previousElementSibling;
    const title =
      e.target.parentNode.parentNode.previousElementSibling.children[1];
    //store old values in case the user wants to revert the change
    oldContent = desc.innerText;
    oldTitle = title.innerText;

    desc.contentEditable = true;
    title.contentEditable = true;
    title.classList.add('editing-mode');
  }
});

//Save the edited text
mainContainer.addEventListener('click', async (e) => {
  if (e.target.classList.contains('save-button')) {
    const content = e.target.parentNode.previousElementSibling;
    const title =
      e.target.parentNode.parentNode.previousElementSibling.children[1];
    const id = e.target.parentNode.parentNode.parentNode.dataset.id;

    //exit the editing mode
    content.contentEditable = false;
    title.contentEditable = false;
    title.classList.remove('editing-mode');
    e.target.nextElementSibling.classList.remove('editing-mode');
    e.target.nextElementSibling.nextElementSibling.classList.remove(
      'editing-mode'
    );
    e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
      'editing-mode'
    );
    e.target.classList.remove('editing-mode');

    //send data to server
    const response = await fetch('/home/api/books/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookTitle: title.innerText,
        bookContent: content.innerText,
      }),
    }).catch((error) => console.log(error));
  }
});

//Cancel any changes made to the text
mainContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('cancel-button')) {
    const content = e.target.parentNode.previousElementSibling;
    const title =
      e.target.parentNode.parentNode.previousElementSibling.children[1];

    //exit the editing mode
    content.contentEditable = false;
    title.contentEditable = false;
    title.classList.remove('editing-mode');
    e.target.nextElementSibling.classList.remove('editing-mode');
    e.target.nextElementSibling.nextElementSibling.classList.remove(
      'editing-mode'
    );
    e.target.previousElementSibling.classList.remove('editing-mode');
    e.target.classList.remove('editing-mode');
    //display old content
    content.innerText = oldContent;
    title.innerText = oldTitle;
  }
});

//set priority for to-read books
booksContainer.addEventListener('click', async (e) => {
  if (
    e.target.classList.contains('star-btn') &&
    !e.target.previousElementSibling.classList.contains('editing-mode')
  ) {
    console.log('star clicked');
    e.target.classList.toggle('priority');
    const important = e.target.classList.contains('priority') ? true : false;

    //adjust target position if ul contains more than one li
    const booklist = booksContainer.children[1];
    const book = e.target.parentNode.parentNode;
    const id = book.dataset.id;

    const num = booklist.childElementCount;

    if (num > 1) {
      const clone = book.cloneNode(true);
      if (important) {
        booklist.prepend(clone);
      } else {
        booklist.append(clone);
      }
      book.remove();
    }

    //send PUT request to server
    const response = await fetch('/home/api/books/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priority: important,
      }),
    }).catch((error) => console.log(error));
  }
});

// footer
window.addEventListener(
  'load',
  () => (dateFooter.innerHTML = date.getFullYear())
);
