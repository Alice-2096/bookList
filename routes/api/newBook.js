import { findUser } from '../../controllers/user.js';
import { addBookToRead } from '../../controllers/book.js';

export default async (req, res) => {
  try {
    const { bookTitle } = req.body;
    const user = await findUser(req.session.user.email);
    const newbook = await addBookToRead(bookTitle, user);
    res.send(newbook._id);
    Promise.resolve(newbook._id);
  } catch (error) {
    Promise.reject(error);
  }
};
