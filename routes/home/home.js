import { getBooksToRead } from '../../controllers/book.js';
import { getFinishedBooks } from '../../controllers/book.js';
import moment from 'moment';

export default async (req, res) => {
  const toReadList = await getBooksToRead(req.session.user.email);
  const finishedList = await getFinishedBooks(req.session.user.email);
  console.log(toReadList);

  res.render('home', {
    user: req.session.user.name,
    lastLoggedIn: moment(req.session.user.lastLoggedIn).format(
      'MMMM, Do YYYY, h:mm:ss a'
    ),
    email: req.session.user.email,
    booklist: toReadList,
    finishedBooklist: finishedList,
  });
};
