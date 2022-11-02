import Book from '../models/book.js';

// ? I filtered data both on server and client side. This might not be the most efficient way, though. Can Mongoose do all the work?

export const getBooksToRead = async (email) => {
  const books = await Book.find().populate({
    path: 'user',
    match: { email: email },
  });

  let result = [];
  books.forEach(function (book) {
    if (book.finishedReading == false && book.user != null) {
      result.push(book);
    }
  });
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

//sort by priority
export const sortByPriority = async () => {
  return Book.find().sort({ priority: -1 });
};
