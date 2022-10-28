import Book from '../models/book';

export const getBooksToRead = () => {
  return Book.find({ finishedReading: false }).populate('user', 'name _id');
};

export const getFinishedBooks = () => {
  return Book.find({ finishedReading: true }).populate('user', 'name _id');
};

export const addBookToRead = ({ title, user }) => {
  return Book.create({ title, user });
};

export const deleteBook = (id) => {
  return Book.findByIdAndDelete(id);
};

export const changeBookCategory = (id) => {
  const b = Book.findOne({ id });
  if (b.finishedReading) {
    b.finishedReading = false;
  } else {
    b.finishedReading = true;
  }
  return b;
};
