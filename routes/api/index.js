import { Router } from 'express';
import newBook from './newBook.js';
import toggle from './toggle.js';
const router = Router();

//update db when adding a new book along with user info
router.post('/new', newBook);

//changing book category handler
router.post('/:id', toggle);

//deleting a book

//editing book title or/and description

export default router;
