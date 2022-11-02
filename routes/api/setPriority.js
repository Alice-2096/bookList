import { setBookPriority } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const bookId = req.params.id;
    const { priority } = req.body;
    setBookPriority(bookId, priority);
  } catch (error) {
    console.log(error);
  }
};
