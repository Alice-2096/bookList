import Book from '../models/book.js';

//sort by priority
// aggregation such as sorting is done on the server side, only the result will be passed back to the client. 
// but sorting is client-side....
// !this does not seem to work...but sorting on server will take care of the problem
export const sortByPriority = async () => {
  Book.find().sort({ priority: -1 });
};


export const getBooksToRead = async (email) => {
  const books = await Book.find().populate({
    path: 'user',
    match: { email: email },
  });

  let resultStar = [];
  let resultNoStar = [];
  books.forEach(function (book) {
    if (book.finishedReading == false && book.user != null) {
      if (book.priority) {
        resultStar.push(book);
      } else {
        resultNoStar.push(book);
      }
    }
  });
  let result = resultStar.concat(resultNoStar);
  return result;
};

export const getFinishedBooks = async (email) => {
  const books = await Book.find().populate({
    path: 'user',
    match: { email: email },
  });

  let result = [];
  books.forEach(function (book) {
    if (book.finishedReading == true && book.user != null) {
      result.push(book);
    }
  });
  return result;
};

export const addBookToRead = (title, user) => {
  return Book.create({ title: title, user: user, content: '' });
};

export const deleteBook = async (id) => {
  return Book.deleteOne({ _id: id });
};

//Toggle book as to-read or finished-reading
export const changeBookCategory = async (id) => {
  const book = await Book.findById(id); // find
  book.changeCategory(); // change category
  book.save(); // save changes to DB
};

//update book title and description
export const updateBook = async (id, title, content) => {
  const book = await Book.findById(id);
  book.title = title;
  book.content = content;
  book.save();
};

//setting book priority
export const setBookPriority = async (id, priority) => {
  const book = await Book.findById(id);
  book.priority = priority;
  book.save();
};
