import Book from '../models/book.js';

// !buggy
export const getBooksToRead = (email) => {
  return (
    Book.find({ finishedReading: false }).populate('user', 'name _id') ?? []
  );
};

// !buggy
export const getFinishedBooks = (email) => {
  return (
    Book.find({ finishedReading: true }).populate('user', 'name _id') ?? []
  );
  // return Book.aggregate([
  //   { $unwind: '$users' },
  //   {
  //     $lookup: {
  //       from: 'user',
  //       localField: 'users',
  //       foreignField: '_id',
  //       as: 'user',
  //     },
  //   },
  //   {
  //     $match: {
  //       'user.email': email,
  //     },
  //   },
  // ]);
};

export const addBookToRead = (title, user) => {
  return Book.create({ title: title, user: user });
};

export const deleteBook = (id) => {
  return Book.findByIdAndDelete(id);
};

//Toggle book as to-read or finished-reading
export const changeBookCategory = (id) => {
  Book.findByIdAndUpdate(id, [
    { $set: { finishedReading: { $not: '$finishedReading' } } },
  ]);
};
