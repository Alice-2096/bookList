import { updateBook } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const { bookTitle, bookContent } = req.body;
    console.log('🚀 ~ file: update.js ~ line 6 ~ bookContent', bookContent);
    console.log('🚀 ~ file: update.js ~ line 6 ~ bookTitle', bookTitle);

    const bookId = req.params.id;
    updateBook(bookId, bookTitle, bookContent);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};
