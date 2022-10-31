import Book from '../models/book.js';
import User from '../models/user.js';

// !buggy
export const getBooksToRead = (email) => {
  return (
    Book.find({ finishedReading: false }).populate('user', 'name _id') ?? []
  );

  // return Book.aggregate([
  //   { $unwind: '$user' },
  //   {
  //     $lookup: {
  //       from: 'user',
  //       localField: 'user',
  //       foreignField: '_id',
  //       as: 'user',
  //     },
  //   },
  //   {
  //     $match: { 'user.email': email },
  //   },
  // ]);
};

// !buggy
export const getFinishedBooks = (email) => {
  return (
    Book.find({ finishedReading: true }).populate('user', 'name _id') ?? []
  );
  //   return Book.aggregate([
  //     { $unwind: '$user' },
  //     {
  //       $lookup: {
  //         from: 'user',
  //         localField: 'user',
  //         foreignField: '_id',
  //         as: 'user',
  //       },
  //     },
  //     {
  //       $match: {
  //         'user.email': email,
  //         finishedReading: true,
  //       },
  //     },
  //   ]);
};

export const addBookToRead = (title, user) => {
  return Book.create({ title: title, user: user });
};

export const deleteBook = (id) => {
  return Book.findByIdAndDelete(id);
};

//Toggle book as to-read or finished-reading
export const changeBookCategory = (id) => {
  console.log('🚀 ~ file: book.js ~ line 60 ~ changeBookCategory ~ id', id);

  Book.findByIdAndUpdate(id, [
    { $set: { finishedReading: { $not: '$finishedReading' } } },
  ]);
};
