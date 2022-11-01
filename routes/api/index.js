import { Router } from 'express';
import newBook from './newBook.js';
import toggle from './toggle.js';
import _delete from './_delete.js';
const router = Router();

//update db when adding a new book along with user info
router.post('/new', newBook);

//handlers for changing book category, deleting a book, and editing a book
router.route('/:id').delete(_delete).post(toggle);

export default router;
