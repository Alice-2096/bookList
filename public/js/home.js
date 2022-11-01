const dateFooter = document.getElementById('date');
const date = new Date();
const booksContainer = document.querySelector('.books-to-read');
const mainContainer = document.querySelector('.main-container');
const completedContainer = document.querySelector('.completed');
const titleBar = document.querySelector('.book-title-bar');
const btn = document.querySelector('.book-toggle-btn');
const newbookTitle = document.getElementById('newbook-title');
const logoutBtn = document.getElementById('logout');
const deleteBtn = document.getElementById('delete');
const editBtn = document.getElementById('edit');

//header -- logout button -- redirect to the log out page onclick
logoutBtn.addEventListener('click', function () {
  location.href = './logout';
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
        <svg class="star-btn" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z" fill-rule="nonzero"/></svg>
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
        <svg class="star-btn" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z" fill-rule="nonzero"/></svg>
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
      <svg class="star-btn" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z" fill-rule="nonzero"/></svg>
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
editBtn.addEventListener('click', async (e) => {
  if (e.target.id == 'edit') {
    /**start editing:
     * 1. display modal window with the selected book title and content at the center of the page
     * 2. user action (write, edit, delete, etc.)
     * 3. SAVE or CANCEL any changes made
     * 4. update DB
     * 5. close the modal window
     * 6. update user interface
     */
  }
});

// footer
window.addEventListener(
  'load',
  () => (dateFooter.innerHTML = date.getFullYear())
);
