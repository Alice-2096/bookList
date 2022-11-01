import Book from '../models/book.js';

// !buggy
export const getBooksToRead = (email) => {
  return (
    Book.find({ finishedReading: false }).populate('user', 'name _id') ?? []
  );
  // return Book.aggregate([
  //   { $unwind: '$user' },
  //   {
  //     $lookup: {
  //       from: 'User',
  //       localField: 'user',
  //       foreignField: '_id',
  //       as: 'users',
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
