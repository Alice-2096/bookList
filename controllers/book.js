import Book from '../models/book';

export const getBooksToRead = () => {
  return Book.find({ finishedReading: false }).populate('user');
};

export const getFinishedBooks = () => {
  return Book.find({ finishedReading: true }).populate('user');
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
