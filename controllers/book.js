import Book from '../models/book.js';

export const getBooksToRead = () => {
  return (
    Book.find({ finishedReading: false }).populate('user', 'name _id') ?? []
  );
  //! need to fix this logic

  //fetch all the to-read-books based on Book's reference to the User model -- specifically the user's email address

  // Book.findById(id) ??
};

export const getFinishedBooks = (email) => {
  return (
    Book.find({ finishedReading: true }).populate('user', 'name _id') ?? []
  );
  //! need to fix this logic
};

export const addBookToRead = (title) => {
  return Book.create({ title: title });
};

export const deleteBook = (id) => {
  return Book.findByIdAndDelete(id);
};

export const changeBookCategory = (id) => {
  const book = Book.findOne({ id });
  book.changeCategory();
};
