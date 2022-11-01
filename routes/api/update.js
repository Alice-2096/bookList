import { updateBook } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const { bookTitle, bookContent } = req.body;
    const bookId = req.params.id;
    updateBook(bookId, bookTitle, bookContent);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};
