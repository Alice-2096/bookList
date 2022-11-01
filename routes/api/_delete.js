import { deleteBook } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const bookId = req.params.id;
    deleteBook(bookId);
  } catch (error) {
    console.log(error);
  }
};
