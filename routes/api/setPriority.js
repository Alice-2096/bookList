import { setBookPriority } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const bookId = req.params.id;
    const { priority } = req.body;

    await setBookPriority(bookId, priority);
    //sort books in DB
  } catch (error) {
    console.log(error);
  }
};
