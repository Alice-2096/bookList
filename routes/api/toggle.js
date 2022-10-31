import { changeBookCategory } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const bookId = req.params.id;
    changeBookCategory(bookId);
  } catch (error) {
    console.log(error);
  }
};
