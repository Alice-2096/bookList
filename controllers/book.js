import Book from '../models/book';

export const getBooksToRead = (email) => {
  return Book.find({ finishedReading: false }).populate('user');
  //! need to fix this logic

  //fetch all the to-read-books based on Book's reference to the User model -- specifically the user's email address

  // Book.findById(id) ??
};

export const getFinishedBooks = (email) => {
  return Book.find({ finishedReading: true }).populate('user');
  //! need to fix this logic
};

export const addBookToRead = ({ title, user }) => {
  return Book.create({ title, user });
};

export const deleteBook = (id) => {
  return Book.findByIdAndDelete(id);
};

export const changeBookCategory = (id) => {
  const book = Book.findOne({ id });
  book.changeCategory();
};
