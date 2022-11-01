import { deleteBook } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log('🚀 ~ file: _delete.js ~ line 6 ~ bookId', bookId);

    deleteBook(bookId);
  } catch (error) {
    console.log(error);
  }
};
