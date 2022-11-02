import { Router } from 'express';
import newBook from './newBook.js';
import toggle from './toggle.js';
import _delete from './_delete.js';
import update from './update.js';
import setPriority from './setPriority.js';
const router = Router();

//update db when adding a new book along with user info
router.post('/new', newBook);

//handlers for deleting a book, changing book category, and editing a book
router.route('/:id').delete(_delete).post(toggle).put(update);

//handler for setting book priority
router.put('/priority/:id', setPriority);

export default router;
